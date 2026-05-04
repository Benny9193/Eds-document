# Procedure: `dbo.sp_BatchVerifyForce`

_Generated on 2026-05-04T13:07:57.354Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BatchVerifyForce` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-01-14 15:43:19 |
| Modified | 2014-10-07 17:53:25 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBatchId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BatchBook` | USER_TABLE |  |
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_BatchVerifyForce] @pBatchId int AS

-- Declare Local Variables
declare @BatchId int,
	@ErrorCount int,
	@TotalAmount decimal(11,2),
	@BatchBookId int,
	@Records int,
	@EnteredRecords int,
	@BudgetId int,
	@AccountId int,
	@BudgetAccountId int,
	@UserAccountId int,
	@DistrictId int,
	@UserId int,
	@CatalogId int,
	@ItemId int,
	@BatchDetailId int,
	@BidPrice money,
	@ItemCode varchar(50),
	@Location char(1),
	@StartDate varchar(32),
	@AccountCode varchar(32),
	@DuplicateDetected tinyint,
	@CategoryId int,
	@DuplicateCount int,
	@Desc varchar(255),
	@DistrictCode varchar(16),
	@CategoryCode varchar(16),
	@TodaysDate datetime,
	@DupCheckDate datetime,
	@ItemsToUpdate int

-- Get Date
select @TodaysDate = getdate()

-- Mark Batch in-Use
Update Batches
   set Started = getdate()
 where BatchId = @pBatchId

-- Validate Batch Id
select @BatchId = ISNULL(BatchId,0),
       @EnteredRecords = InputRecords
  from Batches
 where BatchId = @pBatchId

-- Bad Batch Id
if @BatchId = 0
begin
  -- Report Bad Batch Id
  RAISERROR('Bad Batch Id',16,1)
  return
end

-- Get Starting Date
if month(getdate()) >= 11
begin
  select @StartDate = '07/01/' + convert(char(4),year(getdate()) + 1)
  select @DupCheckDate = convert(datetime,'11/01/' + convert(char(4),year(getdate())))
end
else
begin
  select @StartDate = '07/01/' + convert(char(4),year(getdate()))
  select @DupCheckDate = convert(datetime,'11/01/' + convert(char(4),year(getdate()) - 1))
end

  select @Desc = '/'

  declare DistrictCur cursor fast_forward Read_only for
  select DistrictCode
    from BatchDetail
   where BatchDetail.BatchId = @BatchId
   group by DistrictCode
   Order by DistrictCode

  open DistrictCur

  fetch next from DistrictCur into @DistrictCode

  while @@fetch_Status = 0
  begin
    select @Desc = @Desc + @DistrictCode + ' ('

    declare CategoryCur cursor fast_forward read_only for
    select Category
      from BatchDetail
     where BatchDetail.BatchId = @BatchId
     group by Category
     order by Category

    open CategoryCur

    fetch next from CategoryCur into @CategoryCode

    while @@fetch_status = 0
    begin
      select @Desc = @Desc + ' ' + @CategoryCode

      fetch next from CategoryCur into @CategoryCode
    end

    select @Desc = @Desc + ' ) '

    close CategoryCur
    deallocate CategoryCur

    fetch next from DistrictCur into @DistrictCode
  end

  close DistrictCur
  deallocate DistrictCur

  Update Batches
     set Description = @Desc
   where BatchId = @BatchId

-- Reset Error Flag
update BatchDetail
   set ErrorField = null,
       DistrictId = null,
       CategoryId = null,
       UserId = null,
       Qty = 0,
       ItemId = null,
       PackComplete = 0
 where BatchId = @BatchId
   and Active = 1

-- Flag Inactives as Needing Recheck when Made Active
Update BatchDetail
   set ItemId = null
 where BatchId = @BatchId
   and isnull(Active,0) = 0

-- Validate Type Field
update BatchDetail
   set ErrorField = 0
 where BatchId = @BatchId
   and Type != 'Q'
   and BatchDetail.Active = 1

-- Validate District Code Field
update BatchDetail
   set BatchDetail.DistrictId = District.DistrictId
  from BatchDetail
  inner join District on District.DistrictCode = BatchDetail.DistrictCode
 where BatchId = @BatchId
   and BatchDetail.Active = 1

-- Mark Lines missing District Id as Bad
update BatchDetail
   set ErrorField = 1
 where BatchId = @BatchId
   and DistrictId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate Category
update BatchDetail
   set BatchDetail.CategoryId = Category.CategoryId
  from BatchDetail
  inner join Category on Category.EDSId = ascii(BatchDetail.Category)
 where BatchId = @BatchId
   and BatchDetail.Active = 1

-- Mark Lines missing Category Id
update BatchDetail
   set ErrorField = 2
 where BatchId = @BatchId
   and CategoryId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate User Id
update BatchDetail
   set BatchDetail.UserId = Users.UserId  from BatchDetail
  inner join School on School.DistrictId = BatchDetail.DistrictId
  inner join Users on Users.CometId = case isnumeric(BatchDetail.CometId) when 1 then BatchDetail.CometId else null end
                  and Users.Active = 1
                  and Users.SchoolId = School.SchoolId
 where BatchId = @BatchId
   and BatchDetail.Active = 1

-- Mark Lines missing User Id
update BatchDetail
   set ErrorField = 3
 where BatchId = @BatchId
   and UserId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate Quantity
update BatchDetail
   set Qty = isnull(convert(int,Quantity),0)
 where BatchId = @BatchId
   and BatchDetail.Active = 1
   and isnumeric(Quantity) = 1

-- Mark Lines with Bad Quantity
update BatchDetail
   set ErrorField = 4
 where BatchId = @BatchId
   and Qty = 0
   and Quantity != '000000'
   and ErrorField is null
   and BatchDetail.Active = 1
/*
-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCode(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode)),
       Location = null
  where BatchId = @BatchId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchDetail.BatchId = @BatchId
   and substring(BatchDetail.ItemCode,1,1) != '0'
*/
Update BatchDetail
   set BidHeaderId = (select top 1 bh.BidHeaderId
                        from BidHeaders bh
                        join Bids on Bids.BidHeaderId = bh.BidHeaderId
                                 and Bids.Active = 1
                        join DistrictCategories on DistrictCategories.DistrictId = BatchDetail.DistrictId
                                               and DistrictCategories.CategoryId = bh.CategoryId
                                               and DistrictCategories.Active = 1
--                                               and isnull(DistrictCategories.AllowAddenda,0) = 0
                        join Users on Users.UserId = BatchDetail.UserId
                        join Budgets on Budgets.DistrictId = BatchDetail.DistrictId
                                    and GETDATE() between case when (ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
/* 10/6/14 DCH Early Access                                   and Budgets.VisibleFrom <= getdate()
                                    and Budgets.VisibleUntil >= getdate()*/
                                    and Budgets.Active = 1
                        join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
                                       and PPCategory.CategoryId = bh.CategoryId
                        join Category on Category.CategoryId = bh.CategoryId
                        join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
                                       and DistrictPP.DistrictId = Budgets.DistrictId
                       where bh.CategoryId = BatchDetail.CategoryId
                         and bh.Active = 1 
                         and bh.EffectiveFrom between case when (ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
                         and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
                         and isnull(bh.DistrictId,0) = case isnull(Category.Type,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
                       order by bh.BidHeaderId desc)
  where BatchId = @BatchId
--   and BidHeaderId is null

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCode(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode)),
       Location = null
  where BatchId = @BatchId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
  join Bids on Bids.BidId = BidsCatalogList.BidId
           and Bids.BidHeaderId = BatchDetail.BidHeaderId
           and Bids.Active = 1
  where BatchId = @BatchId
    and substring(BatchDetail.ItemCode,1,1) != '0'
    and BatchDetail.BidHeaderId is not null

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchId = @BatchId
    and substring(BatchDetail.ItemCode,1,1) != '0'
    and BatchDetail.BidHeaderId is null

/*
-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCode(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode)),
       Location = null
  where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')
--   and isnull(CategoryId,0) != 2

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchId = @BatchId
    and BatchBookId = @BatchBookId
    and substring(BatchDetail.ItemCode,1,1) != '0'
--    and isnull(BatchDetail.CategoryId,0) != 2
*/
/*
-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),2,len(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),1,1)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchId = @BatchId
    and BatchBookId = @BatchBookId
    and isnull(BatchDetail.CategoryId,0) = 2
*/
/*
  update BatchDetail
     set BatchDetail.ItemId = li.ItemId,
         BatchDetail.BidPrice = isnull(li.BidPrice,0),
         BatchDetail.Total = isnull(li.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   inner join EDSIQWebUser.uf_LookupItemsForBatch1(@TodaysDate, @BatchId) li on li.BatchDetailId = BatchDetail.BatchDetailId
   where BatchId = @BatchId
     and BatchDetail.Active = 1
*/
/* Bad Lookup Code - Needs Reworking 
-- Validate Item Code using EDS Codes
  update BatchDetail
     set BatchDetail.ItemId = ( SELECT top 1 [ItemId] FROM dbo.Prices join DistrictPP on DistrictPP.PricePlanId = Prices.PricePlanId and DistrictPP.DistrictId = BatchDetail.DistrictId where Prices.ItemId = Items.ItemId order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CrossRefId ),
         BatchDetail.BidPrice = ( SELECT top 1 [BidPrice] FROM dbo.Prices join DistrictPP on DistrictPP.PricePlanId = Prices.PricePlanId and DistrictPP.DistrictId = BatchDetail.DistrictId where Prices.ItemId = Items.ItemId order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CrossRefId )
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = BatchDetail.PackedCode
                        and Items.Active = 1
   where BatchId = @BatchId
     and Location is null
     and BatchDetail.Active = 1

-- Validate Item Code using CrossRef Codes
  update BatchDetail
     set BatchDetail.ItemId = ( SELECT top 1 [ItemId] FROM dbo.Prices join DistrictPP on DistrictPP.PricePlanId = Prices.PricePlanId and DistrictPP.DistrictId = BatchDetail.DistrictId where Prices.ItemId = CrossRefs.ItemId order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CrossRefId ),
         BatchDetail.BidPrice = ( SELECT top 1 [BidPrice] FROM dbo.Prices join DistrictPP on DistrictPP.PricePlanId = Prices.PricePlanId and DistrictPP.DistrictId = BatchDetail.DistrictId where Prices.ItemId = CrossRefs.ItemId order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CrossRefId )
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
   where BatchId = @BatchId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
*/
-- Mark Lines with Bad Item Code
update BatchDetail
   set ErrorField = 5
 where BatchId = @BatchId
   and ItemId is null
   and ErrorField is null
   and Active = 1


/*
-- Validate Item Code using EDS Codes
  update BatchDetail
     set BatchDetail.ItemId = np.ItemId,
         BatchDetail.BidPrice = isnull(np.BidPrice,0),
         BatchDetail.Total = isnull(np.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   join DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
   join dbo.Prices np on np.CategoryId = BatchDetail.CategoryId
                     and np.PackedItemCode = BatchDetail.PackedCode
                     and np.PricePlanId = DistrictPP.PricePlanId
   where BatchId = @BatchId
     and Location is null
     and BatchDetail.Active = 1

-- Validate Item Code using CrossRef Codes
  update BatchDetail
     set BatchDetail.ItemId = np.ItemId,
         BatchDetail.BidPrice = isnull(np.BidPrice,0),
         BatchDetail.Total = isnull(np.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   join DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
   join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
               and Catalog.CategoryId = BatchDetail.CategoryId
               and Catalog.Active = 1
   join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                 and CrossRefs.CatalogId = Catalog.CatalogId
                 and Crossrefs.Active = 1
   join dbo.uf_LookupItems(@CategoryId, @Td, 0, @DistrictId) np on np.CategoryId = BatchDetail.CategoryId
                                                               and np.ItemId = CrossRefs.ItemId
                                                               and np.PricePlanId = DistrictPP.PricePlanId
   where BatchId = @BatchId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

-- Mark Lines with Bad Item Code
update BatchDetail
   set ErrorField = 5
 where BatchId = @BatchId
   and ItemId is null
   and ErrorField is null
   and Active = 1

*/
-- Redistribute into Books
update BatchDetail
   set BatchDetail.BatchBookId = BatchBook.BatchBookId
  from BatchDetail
  left outer join BatchBook on BatchBook.DistrictCode = BatchDetail.DistrictCode
                           and BatchBook.Category = BatchDetail.Category
                           and BatchBook.CometCode = BatchDetail.CometId
                           and BatchBook.BatchId = BatchDetail.BatchId
 where BatchDetail.BatchId = @BatchId
   and BatchDetail.Active = 1

-- Add New Book(s) if Needed
insert BatchBook (Active, BatchId, DistrictCode, Category, CometCode, DistrictId, CategoryId, UserId, BudgetId, InputAmount, DuplicateDetected, DuplicateOk)
          select 1, @BatchId, DistrictCode, Category, CometId, DistrictId, CategoryId, UserId, @BudgetId, 0, 0, 0
            from BatchDetail
           where BatchId = @BatchId
             and BatchBookId is null
             and Active = 1
           group by DistrictCode, Category, CometId, DistrictId, CategoryId, UserId

-- Attach New Books to Detail
update BatchDetail
   set BatchDetail.BatchBookId = BatchBook.BatchBookId
  from BatchDetail
  left outer join BatchBook on BatchBook.DistrictCode = BatchDetail.DistrictCode
                           and BatchBook.Category = BatchDetail.Category
                           and BatchBook.CometCode = BatchDetail.CometId
                           and BatchBook.BatchId = BatchDetail.BatchId
 where BatchDetail.BatchId = @BatchId
   and BatchDetail.BatchBookId is null
   and BatchDetail.Active = 1

-- Mark All Children of Deleted Books InActive
update BatchDetail
   set BatchDetail.Active = 0
  from BatchDetail
  join BatchBook on BatchBook.DistrictCode = BatchDetail.DistrictCode                and BatchBook.Category = BatchDetail.Category
                and BatchBook.CometCode = BatchDetail.CometId
                and BatchBook.BatchId = BatchDetail.BatchId
 where BatchDetail.BatchId = @BatchId
   and BatchDetail.Active = 1
   and BatchBook.Active = 0

-- Declare Cursor
declare BookCursor cursor FORWARD_ONLY READ_ONLY for
select BatchBookId, DistrictId, UserId, CategoryId,
       count(BatchDetailId) as Records,
       sum(ISNULL(Total,0)) as TotalAmount
  from BatchDetail
 where BatchId = @BatchId
   and BatchDetail.Active = 1
--   and BatchDetail.ItemId is null
 group by BatchBookId, DistrictId, CategoryId, UserId

-- Open Cursor
open BookCursor

-- Fetch Results
fetch next from BookCursor into @BatchBookId, @DistrictId, @UserId, @CategoryId, @Records, @TotalAmount

-- Process Results
while @@fetch_status = 0
begin
/*
  declare DetailCur cursor fast_forward read_only for
  select BatchDetailId, ItemCode, isnull(Location,'')
    from BatchDetail
   where BatchBookId = @BatchBookId
     and Active = 1

  open DetailCur

  fetch next from DetailCur into @BatchDetailId, @ItemCode, @Location
 
  while @@fetch_status = 0
  begin
    select @ItemId = null,
           @BidPrice = null,
           @CatalogId = 0

    if @Location = ''
    begin
      select @ItemId = ItemId, 
             @BidPrice = BidPrice
        from EDSIQWebUser.uf_LookupItemCode(@ItemCode, @CategoryId, 0, @TodaysDate, 0, @DistrictId)
    end
    else
    begin
      select @CatalogId = isnull(CatalogId,0)
        from Catalog
       where CategoryId = @CategoryId
         and CrossRefLetter = @Location
         and Active = 1

      select @ItemId = ItemId, 
             @BidPrice = BidPrice
        from EDSIQWebUser.uf_LookupItemCode(@ItemCode, @CategoryId, @CatalogId, @TodaysDate, 0, @DistrictId)
    end

    update BatchDetail
       set BatchDetail.ItemId = @ItemId,
           BatchDetail.BidPrice = isnull(@BidPrice,0),
           BatchDetail.Total = isnull(@BidPrice,0) * isnull(BatchDetail.Qty,0)
      from BatchDetail
     where BatchDetail.BatchDetailId = @BatchDetailId

    fetch next from DetailCur into @BatchDetailId, @ItemCode, @Location
  end

  close DetailCur
  deallocate DetailCur
*/

/*
  update BatchDetail
     set BatchDetail.ItemId = li.ItemId,
         BatchDetail.BidPrice = isnull(li.BidPrice,0),
         BatchDetail.Total = isnull(li.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   join DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
   inner join NewPrices on NewPrices.CategoryId = BatchDetail.CategoryId
                       and NewPrices.PackedItemCode = BatchDetail.PackedCode
                       and NewPrices.PricePlanId = DistrictPP.PricePlanId
   where BatchId = @BatchId
     and Location is null
     and BatchDetail.Active = 1

  update BatchDetail
     set BatchDetail.ItemId = li.ItemId,
         BatchDetail.BidPrice = isnull(li.BidPrice,0),
         BatchDetail.Total = isnull(li.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   join DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
   join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
               and Catalog.CategoryId = BatchDetail.CategoryId
               and Catalog.Active = 1
   inner join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                       and CrossRefs.CatalogId = Catalog.CatalogId
                       and Crossrefs.Active = 1
   inner join NewPrices on NewPrices.CategoryId = BatchDetail.CategoryId
                       and NewPrices.ItemId = CrossRefs.ItemId
                       and NewPrices.PricePlanId = DistrictPP.PricePlanId
   where BatchId = 2431
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

  update BatchDetail
     set BatchDetail.ItemId = li.ItemId,
         BatchDetail.BidPrice = isnull(li.BidPrice,0)
    from BatchDetail
   inner join EDSIQWebUser.uf_LookupItemsForBook1(@TodaysDate, @BatchBookId) li on li.BatchDetailId = BatchDetail.BatchDetailId
   where BatchBookId = @BatchBookId
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

  -- Mark Lines with Bad Item Code
  update BatchDetail
     set ErrorField = 5
   where BatchBookId = @BatchBookId
     and ItemId is null
     and ErrorField is null
     and Active = 1
*/
  -- Get ErrorCount
  select @ErrorCount = count(BatchDetailId)
    from BatchDetail
   where BatchBookId = @BatchBookId
     and ErrorField is not null
     and BatchDetail.Active = 1

  if @@rowcount = 0
  begin
    select @ErrorCount = 0
  end

  -- Update Totals
  update BatchDetail
     set BatchDetail.Total = isnull(BatchDetail.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   where BatchBookId = @BatchBookId
     and BatchDetail.Active = 1

  -- Get Budget Information
  select @BudgetId = BudgetId
    from Budgets
   where Budgets.DistrictId = @DistrictId
     and @StartDate between Budgets.StartDate and Budgets.EndDate
     and Budgets.Active = 1

  -- Get Account Information
  select @AccountId = Accounts.AccountId,
         @AccountCode = Accounts.Code,
         @BudgetAccountId = BudgetAccounts.BudgetAccountId,
         @UserAccountId = UserAccounts.UserAccountId
    from BatchBook
    join Accounts on Accounts.AccountId = BatchBook.AccountId
                 and Accounts.Active = 1
    join BudgetAccounts on BudgetAccounts.BudgetId = @BudgetId
                       and BudgetAccounts.AccountId = Accounts.AccountId
                       and BudgetAccounts.Active = 1
    join UserAccounts on UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
                     and UserAccounts.Active = 1
   where BatchBook.BatchBookId = @BatchBookId

  if @@rowcount = 0
  begin
    select @AccountId = null,
           @AccountCode = null,
           @BudgetAccountId = null,
           @UserAccountId = null

    -- Find New Match
    select @AccountId = Accounts.AccountId,
           @AccountCode = Accounts.Code,
           @BudgetAccountId = BudgetAccounts.BudgetAccountId,
           @UserAccountId = UserAccounts.UserAccountId
      from UserAccounts 
      join BudgetAccounts on BudgetAccounts.BudgetAccountId = UserAccounts.BudgetAccountId
                         and BudgetAccounts.Active = 1
      join Accounts on Accounts.AccountId = UserAccounts.AccountId
                   and Accounts.Active = 1
     where UserAccounts.UserId = @UserId
       and UserAccounts.BudgetId = @BudgetId
       and UserAccounts.Active = 1

    if @@rowcount > 1
    begin
      select @AccountId = null,
             @AccountCode = null,
             @BudgetAccountId = null,
             @UserAccountId = null
    end
  end

  -- Check for Duplicates
  select @DuplicateCount = count(BatchBookId)
    from BatchBook
    join Batches on Batches.BatchId = BatchBook.BatchId
   where BatchBook.DistrictId = @DistrictId
     and BatchBook.CategoryId = @CategoryId
     and BatchBook.UserId = @UserId
     and BatchBook.Active = 1
     and Batches.BatchDate >= @DupCheckDate

  if @DuplicateCount > 1
  begin
    select @DuplicateDetected = 1
  end
  else
  begin
    select @DuplicateDetected = 0
  end

  -- Update Record Counts
  update BatchBook
     set Records = @Records,
         CalcAmount = ss.TotalAmount,
         Errors = @ErrorCount,
         BudgetId = @BudgetId,
         AccountId = @AccountId,
         AccountCode = @AccountCode,
         BudgetAccountId = @BudgetAccountId,
         UserAccountId = @UserAccountId,
         UserId = @UserId,
         DuplicateDetected = @DuplicateDetected,
         AmountOk = 1
    from BatchBook
    left outer join (
      select BatchBookId, sum(Total) TotalAmount
        from BatchDetail
       where BatchBookId = @BatchBookId
       group by BatchBookId) ss on ss.BatchBookId = BatchBook.BatchBookId
   where BatchBook.BatchBookId = @BatchBookId

  -- Get Batch Book Amount
  select top 1 @TotalAmount = convert(Money,OrigBookAmount)
    from BatchDetail
   where OrigBookAmount is not null
     and isnumeric(OrigBookAmount) = 1
     and BatchBookId = @BatchBookId
   group by OrigBookAmount
   order by OrigBookAmount

  -- Update Book Amount
  update BatchBook
     set InputAmount = @TotalAmount
    from BatchBook
   where BatchBookId = @BatchBookId
     and isnull(InputAmount,0) = 0

  -- Fetch Results
  fetch next from BookCursor into @BatchBookId, @DistrictId, @UserId, @CategoryId, @Records, @TotalAmount
end

-- Free up Cursor
close BookCursor
deallocate BookCursor

-- Declare Cursor
declare BookCursor cursor FORWARD_ONLY READ_ONLY for
select BatchBook.BatchBookId
  from BatchBook
 where BatchBook.BatchId = @BatchId
 group by BatchBook.BatchBookId

-- Open Cursor
open BookCursor

-- Fetch Results
fetch next from BookCursor into @BatchBookId

-- Process Results
while @@fetch_status = 0
begin
  select @Records = count(BatchDetailId)
    from BatchDetail
   where BatchBookId = @BatchBookId
     and Active = 1

  -- Check for Book being Empty
  if @Records = 0
  begin
    delete BatchBook
     where BatchBookId = @BatchBookId
  end

  -- Fetch Results
  fetch next from BookCursor into @BatchBookId
end

-- Free up Cursor
close BookCursor
deallocate BookCursor

-- Increment Error Counters if Book Totals Don't Match
update BatchBook
   set Errors = Errors + 1,
       AmountOk = 0
 where BatchId = @BatchId
   and (   InputAmount < CalcAmount - (CalcAmount * .50)
        or InputAmount > CalcAmount + (CalcAmount * .50))

-- Increment Error Counters if Duplicate Detected and Not OKed
update BatchBook
   set Errors = Errors + 1
 where BatchId = @BatchId
   and DuplicateDetected = 1
   and DuplicateOk != 1
   and Active = 1

-- Get Number of Errors
select @ErrorCount = sum(Errors) 
  from BatchBook 
 where BatchId = @BatchId
   and Active = 1

-- Get Total Amount of Items
select @TotalAmount = sum(ISNULL(Total,0))
  from BatchDetail
 where BatchId = @BatchId
   and BatchDetail.Active = 1

-- Update Record Count
select @Records = count(BatchDetailId)
  from BatchDetail
 where BatchId = @BatchId
   and BatchDetail.Active = 1

-- Check Count Errors for Batch
if @EnteredRecords != @Records
begin
  Select @ErrorCount = @ErrorCount + 1
end

-- Update Batch Header
update Batches   set Batches.ErrorCount = @ErrorCount,
       Batches.Amount = @TotalAmount,
       Batches.Records = @Records
 where Batches.BatchId = @BatchId

-- Mark Batch Completed
Update Batches
   set Completed = getdate()
 where BatchId = @pBatchId
```
