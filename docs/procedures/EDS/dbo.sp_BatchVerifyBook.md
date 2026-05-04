# Procedure: `dbo.sp_BatchVerifyBook`

_Generated on 2026-05-04T13:43:18.708Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BatchVerifyBook` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-12-03 14:12:18 |
| Modified | 2014-10-07 17:53:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBatchId` | IN | int |  |
| 2 | `@pBatchBookId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BatchBook` | USER_TABLE |  |
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCategory` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_BatchVerifyBook] @pBatchId int, @pBatchBookId int AS

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
	@DupCheckDate datetime

-- Get Date
select @TodaysDate = getdate()
select @BatchBookId = isnull(@pBatchBookId,0)

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
       PackedCode = null,
       Qty = 0,
       PackComplete = 0
--       ItemId = null
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and Active = 1

-- Flag Inactives as Needing Recheck when Made Active
Update BatchDetail
   set ItemId = null
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and isnull(Active,0) = 0

-- Validate Type Field
update BatchDetail
   set ErrorField = 0
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and Type != 'Q'
   and BatchDetail.Active = 1

-- Validate District Code Field
update BatchDetail
   set BatchDetail.DistrictId = District.DistrictId
  from BatchDetail
  inner join District on District.DistrictCode = BatchDetail.DistrictCode
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and BatchDetail.Active = 1

-- Mark Lines missing District Id as Bad
update BatchDetail
   set ErrorField = 1
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and DistrictId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate Category
update BatchDetail
   set BatchDetail.CategoryId = Category.CategoryId
  from BatchDetail
  inner join Category on Category.EDSId = ascii(BatchDetail.Category)
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and BatchDetail.Active = 1

-- Mark Lines missing Category Id
update BatchDetail
   set ErrorField = 2
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and CategoryId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate User Id
update BatchDetail
   set BatchDetail.UserId = Users.UserId
  from BatchDetail
  inner join School on School.DistrictId = BatchDetail.DistrictId
  inner join Users on Users.CometId = BatchDetail.CometId
                  and Users.Active = 1
                  and Users.SchoolId = School.SchoolId
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and BatchDetail.Active = 1

-- Mark Lines missing User Id
update BatchDetail
   set ErrorField = 3
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and UserId is null
   and ErrorField is null
   and BatchDetail.Active = 1

-- Validate Quantity
update BatchDetail
   set Qty = isnull(convert(int,Quantity),0)
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and BatchDetail.Active = 1

-- Mark Lines with Bad Quantity
update BatchDetail
   set ErrorField = 4
 where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and Qty = 0
   and Quantity != '000000'
   and ErrorField is null
   and BatchDetail.Active = 1

Update BatchDetail
   set BidHeaderId = (select top 1 bh.BidHeaderId
                        from BidHeaders bh
                        join Bids on Bids.BidHeaderId = bh.BidHeaderId
                                 and Bids.Active = 1
                        join DistrictCategories on DistrictCategories.DistrictId = BatchDetail.DistrictId
                                               and DistrictCategories.CategoryId = bh.CategoryId
                                               and DistrictCategories.Active = 1
--                                               and isnull(DistrictCategories.AllowAddenda,0) = 0
                        left outer join Users on Users.UserId = BatchDetail.UserId
                        join Budgets on Budgets.DistrictId = BatchDetail.DistrictId
                                    and GETDATE() between case when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
                                    and Budgets.Active = 1
                        join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
                                       and PPCategory.CategoryId = bh.CategoryId
                        join Category on Category.CategoryId = bh.CategoryId
                        join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
                                       and DistrictPP.DistrictId = Budgets.DistrictId
                       where bh.CategoryId = BatchDetail.CategoryId
                         and bh.Active = 1 
                         and bh.EffectiveFrom between Budgets.VisibleFrom and Budgets.VisibleUntil
                         and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
                         and isnull(bh.DistrictId,0) = case isnull(Category.Type,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
                       order by bh.BidHeaderId desc)
  where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and BidHeaderId is null

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCode(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode))
  where BatchId = @BatchId
   and BatchBookId = @BatchBookId

-- Set Packed Code
Update BatchDetail
   set Location = null,
	   PackComplete = 1
  where BatchId = @BatchId
   and BatchBookId = @BatchBookId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')
--   and isnull(CategoryId,0) != 2
   and BatchDetail.PackComplete = 0
   
-- Set Packed Code
Update BatchDetail
   set PackedCode = CrossRefs.PackedCode,
       Location = Catalog.CrossRefLetter,
       PackComplete = 1
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = 'C' --substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  join CrossRefs on CrossRefs.PackedCode = substring(BatchDetail.PackedCode,2,LEN(BatchDetail.PackedCode)-1)
                and CrossRefs.CatalogId = Catalog.CatalogId
                and CrossRefs.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.CategoryId = BatchDetail.CategoryId
            and Items.Active = 1
  where BatchId = @BatchId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')
   and BatchDetail.CategoryId = 2
   and BatchDetail.PackComplete = 0
   
Update BatchDetail
   set PackedCode = CrossRefs.PackedCode,
       Location = null,
       PackComplete = 1
  from BatchDetail
  join CrossRefs on CrossRefs.PackedCode = substring(BatchDetail.PackedCode,2,LEN(BatchDetail.PackedCode)-1)
                and CrossRefs.CatalogId is null
                and CrossRefs.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.CategoryId = BatchDetail.CategoryId
            and Items.Active = 1
  where BatchId = @BatchId
   and substring(BatchDetail.ItemCode,1,1) in (' ','0')
   and BatchDetail.CategoryId = 2
   and BatchDetail.PackComplete = 0
   
-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1),
       PackComplete = 1
  from BatchDetail
  join Catalog on Catalog.CatalogId = 
    (select top 1 C.CatalogId
       from Catalog as C with (nolock)
       join BidsCatalogList on BidsCatalogList.CatalogId = C.CatalogId
       join Bids on Bids.BidId = BidsCatalogList.BidId
                and Bids.BidHeaderId = BatchDetail.BidHeaderId
                and Bids.Active = 1
      where C.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
        and C.CategoryId = BatchDetail.CategoryId
        and C.Active = 1
      order by C.CatalogYear, C.CatalogId)
  where BatchId = @BatchId
    and BatchBookId = @BatchBookId
    and substring(BatchDetail.ItemCode,1,1) != '0'
    and BatchDetail.BidHeaderId is not null
    and BatchDetail.PackComplete = 0

-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(BatchDetail.ItemCode,2,len(rtrim(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(BatchDetail.ItemCode,1,1),
       PackComplete = 1
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(BatchDetail.ItemCode,1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchId = @BatchId
    and BatchBookId = @BatchBookId
    and substring(BatchDetail.ItemCode,1,1) != '0'
    and BatchDetail.BidHeaderId is null
    and BatchDetail.PackComplete = 0
    
/*
-- Set Packed Code
Update BatchDetail
   set PackedCode = dbo.uf_PackCodeCatalog(substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),2,len(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode)) - 1), Catalog.CatalogId),
       Location = substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),1,1),
       BidHeaderId = (select top 1 bh.BidHeaderId
                        from BidHeaders bh
                        join Bids on Bids.BidHeaderId = bh.BidHeaderId
                                 and Bids.Active = 1
                        join DistrictCategories on DistrictCategories.DistrictId = BatchDetail.DistrictId
                                               and DistrictCategories.CategoryId = bh.CategoryId
                                               and DistrictCategories.Active = 1
--                                               and isnull(DistrictCategories.AllowAddenda,0) = 0
                        join Budgets on Budgets.DistrictId = BatchDetail.DistrictId
                                    and Budgets.VisibleFrom <= getdate()
                                    and Budgets.VisibleUntil >= getdate()
                                    and Budgets.Active = 1
                        join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
                                       and PPCategory.CategoryId = bh.CategoryId
                        join Category on Category.CategoryId = bh.CategoryId
                        join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
                                       and DistrictPP.DistrictId = Budgets.DistrictId
                       where bh.CategoryId = BatchDetail.CategoryId
                         and bh.Active = 1 
                         and bh.EffectiveFrom between Budgets.VisibleFrom and Budgets.VisibleUntil
                         and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
                         and isnull(bh.DistrictId,0) = case isnull(Category.Type,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
                       order by bh.BidHeaderId desc)
  from BatchDetail
  join Catalog on Catalog.CrossRefLetter = substring(dbo.uf_RemoveLeadingZeros(BatchDetail.ItemCode),1,1)
              and Catalog.CategoryId = BatchDetail.CategoryId
              and Catalog.Active = 1
  where BatchId = @BatchId
    and BatchBookId = @BatchBookId
    and isnull(BatchDetail.CategoryId,0) = 2
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
   and BatchDetail.BatchBookId = @BatchBookId
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
   and BatchDetail.BatchBookId = @BatchBookId
   and BatchDetail.Active = 1
   and BatchBook.Active = 0

-- Declare Cursor
declare BookCursor cursor FORWARD_ONLY READ_ONLY for
select BatchBookId, DistrictId, UserId, CategoryId,
       count(BatchDetailId) as Records,
       sum(ISNULL(Total,0)) as TotalAmount
  from BatchDetail
 where BatchId = @BatchId
   and BatchDetail.BatchBookId = @BatchBookId
   and BatchDetail.Active = 1
 group by BatchBookId, DistrictId, CategoryId, UserId

-- Open Cursor
open BookCursor

-- Fetch Results
fetch next from BookCursor into @BatchBookId, @DistrictId, @UserId, @CategoryId, @Records, @TotalAmount

-- Process Results
while @@fetch_status = 0
begin
/*  update BatchDetail
     set BatchDetail.ItemId = li.ItemId,
         BatchDetail.BidPrice = isnull(li.BidPrice,0),
         BatchDetail.Total = isnull(li.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   inner join EDSIQWebUser.uf_LookupItemsForBook1(@TodaysDate, @BatchBookId) li on li.BatchDetailId = BatchDetail.BatchDetailId
   where BatchBookId = @BatchBookId
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
*/
/*
-- Validate Item Code using EDS Codes
  update BatchDetail
     set BatchDetail.ItemId = np.ItemId,
         BatchDetail.BidPrice = isnull(np.BidPrice,0),
         BatchDetail.Total = isnull(np.BidPrice,0) * isnull(BatchDetail.Qty,0)
    from BatchDetail
   join DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
   join EDSIQWebUser.NewPrices np on np.CategoryId = BatchDetail.CategoryId
                     and np.PackedItemCode = BatchDetail.PackedCode
                     and np.PricePlanId = DistrictPP.PricePlanId
   where BatchBookId = @BatchBookId
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
   join NewPrices np on np.CategoryId = BatchDetail.CategoryId
                    and np.ItemId = CrossRefs.ItemId
                    and np.PricePlanId = DistrictPP.PricePlanId
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
*/
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = BatchDetail.PackedCode
                        and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

-- Validate Item Code using CrossRef Codes in BidItems
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join Bids on Bids.BidHeaderId = BatchDetail.BidHeaderId
             and Bids.Active = 1
    join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                        and BidsCatalogList.CatalogId = Catalog.CatalogId
    join BidItems on BidItems.BidId = Bids.BidId
                 and BidItems.PackedVendorItemCode = BatchDetail.PackedCode
    join Awards on Awards.BidId = Bids.BidId
               and Awards.Active = 1
    join Items on Items.ItemId = BidItems.ItemId
              and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

-- Validate Item Code using CrossRef Codes
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

-- Validate Item Code via EDS Item Code for Not Pre-Bid
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null --Items.ListPrice
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = BatchDetail.PackedCode
                        and Items.Active = 1
    join dbo.DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
    join dbo.PPCategory on PPCategory.CategoryId = BatchDetail.CategoryId
                       and PPCategory.PricePlanId = DistrictPP.PricePlanId
                       and PPCategory.AllowAddenda = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and BatchDetail.Location is null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null

-- Validate Item Code using CrossRef Codes for Not Pre-Bid
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null --Items.ListPrice
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
    join dbo.DistrictPP on DistrictPP.DistrictId = BatchDetail.DistrictId
    join dbo.PPCategory on PPCategory.CategoryId = BatchDetail.CategoryId
                       and PPCategory.PricePlanId = DistrictPP.PricePlanId
                       and PPCategory.AllowAddenda = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and BatchDetail.Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
/*
-- Special Tries for Office-Computer
Update BatchDetail
   set PackedCode = substring(BatchDetail.PackedCode,2,len(BatchDetail.PackedCode)-1),
       Location = substring(BatchDetail.PackedCode,1,1),
       ItemId = CrossRefs.ItemId,
       BidPrice = null
  from BatchDetail
  join Bids on Bids.BidHeaderId = BatchDetail.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId
                and CrossRefs.PackedCode = substring(BatchDetail.PackedCode,2,len(BatchDetail.PackedCode)-1)
 where BatchDetail.BatchBookId = @BatchBookId
   and BatchDetail.ItemId is null
   and substring(BatchDetail.ItemCode,1,1) = '0'
   and BatchDetail.CategoryId = 2

-- Validate Item Code using EDS Codes
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = substring(BatchDetail.PackedCode,2,len(BatchDetail.PackedCode)-1)
                        and Items.Active = 1
   where BatchDetail.BatchBookId = @BatchBookId
--     and Location is null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = BatchDetail.PackedCode
                        and Items.Active = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

-- Validate Item Code using EDS Codes
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join dbo.Items Items on Items.CategoryId = BatchDetail.CategoryId
                        and Items.PackedCode = BatchDetail.Location + BatchDetail.PackedCode
                        and Items.Active = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

-- Validate Item Code using CrossRef Codes in BidItems
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join Bids on Bids.BidHeaderId = BatchDetail.BidHeaderId
             and Bids.Active = 1
    join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                        and BidsCatalogList.CatalogId = Catalog.CatalogId
    join BidItems on BidItems.BidId = Bids.BidId
                 and BidItems.PackedVendorItemCode = 'C' + BatchDetail.PackedCode
    join Awards on Awards.BidId = Bids.BidId
               and Awards.Active = 1
    join Items on Items.ItemId = BidItems.ItemId
              and Items.Active = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

-- Validate Item Code using CrossRef Codes
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join CrossRefs on CrossRefs.PackedCode = 'C' + BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
   where BatchDetail.BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2
*/
/*
-- Special Validate Item Code using CrossRef Codes for Allied / Computer/Office in BidItems
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = case BatchDetail.BidHeaderId when 837 then 'A' when 846 then 'C' else BatchDetail.Location end
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join Bids on Bids.BidHeaderId = BatchDetail.BidHeaderId
             and Bids.Active = 1
    join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                        and BidsCatalogList.CatalogId = Catalog.CatalogId
    join BidItems on BidItems.BidId = Bids.BidId
                 and BidItems.PackedVendorItemCode = BatchDetail.PackedCode
    join Awards on Awards.BidId = Bids.BidId
               and Awards.Active = 1
    join Items on Items.ItemId = BidItems.ItemId
              and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

-- Special Validate Item Code using CrossRef Codes for Allied / Computer/Office
  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CrossRefLetter = case BatchDetail.BidHeaderId when 837 then 'A' when 846 then 'C' else BatchDetail.Location end
                and Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
    join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2

  update BatchDetail
     set BatchDetail.ItemId = Items.ItemId,
         BatchDetail.BidPrice = null
    from BatchDetail
    join Catalog on Catalog.CategoryId = BatchDetail.CategoryId
                and Catalog.Active = 1
                and Catalog.Name = 'EDS'
    join CrossRefs on CrossRefs.PackedCode = BatchDetail.PackedCode
                  and CrossRefs.CatalogId = Catalog.CatalogId
                  and Crossrefs.Active = 1
    join Items on Items.ItemId = CrossRefs.ItemId
              and Items.Active = 1
   where BatchBookId = @BatchBookId
     and Location is not null
     and BatchDetail.Active = 1
     and BatchDetail.ItemId is null
     and BatchDetail.CategoryId = 2
*/
  Update BatchDetail
     set BidPrice =
   (select top 1 BidPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = BatchDetail.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = BatchDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = BatchDetail.BidHeaderId
           where Items.ItemId = BatchDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = BatchDetail.ItemId
             and Items.Active = 1
             and DistrictCategories.AllowAddenda = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from BatchDetail
  join DistrictCategories on DistrictCategories.DistrictId = BatchDetail.DistrictId
                         and DistrictCategories.CategoryId = BatchDetail.CategoryId
                         and DistrictCategories.Active = 1
--                         and DistrictCategories.AllowAddenda = 1
 where BatchDetail.BatchBookId = @BatchBookId
   and isnull(BatchDetail.BidPrice,0) = 0

  -- Mark Lines with Bad Item Code
  update BatchDetail
     set ErrorField = 5
   where BatchBookId = @BatchBookId
     and ItemId is null
     and ErrorField is null
     and Active = 1

  -- Get ErrorCount
  select @ErrorCount = count(BatchDetailId)
    from BatchDetail
   where BatchBookId = @BatchBookId
     and ErrorField is not null
     and BatchDetail.Active = 1

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
