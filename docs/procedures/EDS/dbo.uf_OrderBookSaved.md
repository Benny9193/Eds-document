# Function: table-valued: `dbo.uf_OrderBookSaved`

_Generated on 2026-05-04T13:43:19.049Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_OrderBookSaved` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2009-09-25 15:29:38 |
| Modified | 2009-09-25 15:29:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOrderBookId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Control` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `OrderBookDetail` | USER_TABLE |  |
| `OrderBooks` | USER_TABLE |  |
| `OrderBookTypes` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.OrderBookAlwaysAdd` | USER_TABLE |  |
| `dbo.OrderBookDetail` | USER_TABLE |  |
| `dbo.OrderBooks` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.uf_CatalogRefs` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.vw_ItemDescription` | VIEW |  |
| `dbo.vw_ItemDescriptionNoExtra` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from OrderBooks where OrderBookId = 935

--1238 gen
--1232 - he
--select * from dbo.uf_OrderBook(1232,0,0) order by SortSeq

--select * from Items where ItemId = 561508
--sp_who2
--select * from OrderBookDetail where OrderBookId = 901
--select * from OrderBooks where Active = 1 and DistrictId = 322
--select * from uf_OrderBook(1007, 322, 199764) Order by Title, SortSeq
create function [dbo].[uf_OrderBookSaved](@pOrderBookId int, @pDistrictId int, @pUserId int)
returns @OrderBook table (
OBDWorkId		int identity(1,1) not null,
Title			varchar(255) null,
HeadingDescription	varchar(1024) null,
ItemCode		varchar(50) null,
ItemDescription		varchar(1024) null,
UnitCode		varchar(10) null,
BidPrice		money null,
PricePlanDescription	varchar(255) null,
CatalogPage		varchar(4) null,
CatalogYear		varchar(2) null,
VendorCode		varchar(16) null,
VendorName		varchar(255) null,
VendorItemCode		varchar(50) null,
Alternate		varchar(4096) null,
Category		varchar(255) null,
TotalQuantity		int null,
TotalRequisitions	int null,
DistrictUsed		int null,
ExpandAll		tinyint null,
ItemId			int not null primary key,
HeadingId		int null,
BidItemId		int null,
Weight			int null,
SortSeq			varchar(64) null,
LYQty			int null,
MustKeep		int null,
GrossPrice		money null,
BidDiscountRate		decimal(9,5) null,
CatalogDiscountRate	decimal(9,5) null,
Compliant		tinyint null,
AwardId			int null,
ParentAwardId		int null,
CatalogId		int null,
CatalogPrice		money null,
VendorId		int null,
CrossRefId		int null,
OrderBookDetailId	int null,
SortKey			varchar(512)
)
AS
begin
declare @BookDate datetime,
	@CategoryId int,
	@PricePlanId int,
	@ParentAwardId int,
	@OrderBookType char(1),
	@AddendaCategory int,
	@RecCount int,
	@ControlYear int,
	@BidHeaderId int,
	@PrintMode int,
	@OrderBookYear int,
	@UseParentCatalog int,
	@KeepZeroPages int,
	@BudgetId int
--	@CatalogYear char(2)

  select top 1 @ControlYear = isnull(ControlYear,0)
    from Control

  select @BidHeaderId = BidHeaderId,
         @UseParentCatalog = isnull(UseParentCatalog,0),
         @KeepZeroPages = isnull(KeepZeroPages,0),
         @OrderBookYear = isnull(OrderBookYear,0),
         @CategoryId = CategoryId
    from OrderBooks
   where OrderBookId = @pOrderBookId

  select @BudgetId = Budgets.BudgetId
    from Budgets with (nolock)
   where Budgets.DistrictId = @pDistrictId
     and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
     and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
     and Budgets.Active = 1

  -- Add Order Book Items
  insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, BidPrice, AwardId, Weight, CatalogPage, CatalogYear, VendorItemCode, VendorCode, VendorName, CatalogId, CrossRefId, OrderBookDetailId, ParentAwardId)
    select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, case isnull(OrderBookDetail.Weight,0) when 0 then 0 else sqrt(OrderBookDetail.Weight) - (convert(int,sqrt(OrderBookDetail.Weight)) ^ 2) end Quantity, case isnull(OrderBookDetail.Weight,0) when 0 then 0 else convert(int,sqrt(OrderBookDetail.Weight)) end RequisitionCount, OrderBookDetail.BidPrice, OrderBookDetail.AwardId, OrderBookdetail.Weight, OrderBookDetail.CatalogPage, OrderBookDetail.CatalogYear, OrderBookDetail.VendorItemCode, OrderBookDetail.VendorCode, OrderBookDetail.VendorName, OrderBookDetail.CatalogId, OrderBookDetail.CrossRefId, OrderBookDetail.OrderBookDetailId, OrderBooks.AwardId
      from dbo.OrderBooks OrderBooks with (nolock)
      join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
                                              and OrderBookDetail.Active = 1
      join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
                    and Items.Active = 1
      left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                                  and dbo.Headings.Active = 1
      left outer join @OrderBook obd on obd.ItemId = Items.ItemId
     where OrderBooks.OrderBookId = @pOrderBookId
       and obd.OBDWorkId is null
     group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, OrderBookDetail.Weight, OrderBookDetail.BidPrice, OrderBookDetail.AwardId, OrderBookDetail.CatalogPage, OrderBookDetail.CatalogYear, OrderBookDetail.VendorItemCode, OrderBookDetail.VendorCode, OrderBookDetail.VendorName, OrderBookDetail.CatalogId, OrderBookDetail.CrossRefId, OrderBookDetail.OrderBookDetailId, OrderBooks.AwardId

  if @pUserId != 0
  begin
    insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, LYQty, MustKeep)
      select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId), sum(dbo.Detail.Quantity), 1
        from dbo.OrderBooks OrderBooks with (nolock)
        join dbo.Requisitions on dbo.Requisitions.CategoryId = OrderBooks.CategoryId
                             and dbo.Requisitions.BudgetId = @BudgetId
--        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                        and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                        and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
        join dbo.Detail on dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
--        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.Budgets.DistrictId
--DCH 9/22/09        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = @pDistrictId
--DCH 9/22/09                           and dbo.DistrictPP.PricePlanId = OrderBooks.PricePlanId
        join dbo.Items on Items.ItemId = Detail.ItemId
                      and Items.Active = 1
        left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                                    and dbo.Headings.Active = 1
        left outer join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
                                                           and OrderBookDetail.ItemId = Items.ItemId
        left outer join @OrderBook obd on obd.ItemId = Items.ItemId
       where OrderBooks.OrderBookId = @pOrderBookId
         and dbo.Requisitions.UserId = @pUserId
         and obd.OBDWorkId is null
       group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll

/*    update @OrderBook
       set LYQty = (select sum(Detail.Quantity) 
                      from Detail
                      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                                       and Requisitions.UserId = @pUserId
                                       and Requisitions.BudgetId = @BudgetId
--                      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                                      and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                                      and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
                     where Detail.ItemId = ob.ItemId)
      from @OrderBook ob
*/
    update @OrderBook
       set LYQty = ss.Quantity
      from @OrderBook ob
      join (select Detail.ItemId, sum(Detail.Quantity) Quantity
              from Detail with (nolock)
              join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                               and Requisitions.UserId = @pUserId
                               and Requisitions.BudgetId = @BudgetId
             group by Detail.ItemId) ss on ss.ItemId = ob.ItemId              
  end

  if @pDistrictId != 0
  begin
    -- Add Items used by District
    insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, DistrictUsed)
      select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId), 1
        from dbo.OrderBooks OrderBooks with (nolock)
        join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
        join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
                      and Items.Active = 1
        join dbo.Detail on dbo.Detail.ItemId = dbo.Items.ItemId
        join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
                             and dbo.Requisitions.CategoryId = OrderBooks.CategoryId
                             and dbo.Requisitions.BudgetId = @BudgetId
--        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                        and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                        and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.Budgets.DistrictId
--DCH 9/22/09        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = @pDistrictId
--DCH 9/22/09                           and dbo.DistrictPP.PricePlanId = OrderBooks.PricePlanId
        left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                                    and dbo.Headings.Active = 1
        left outer join @OrderBook obd on obd.ItemId = Items.ItemId
       where OrderBooks.OrderBookId = @pOrderBookId
--         and dbo.Budgets.DistrictId = @pDistrictId
         and obd.OBDWorkId is null
       group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll

/*
    update @OrderBook
       set DistrictUsed = (select sum(Detail.Quantity) 
                      from Detail with (nolock)
                      join Requisitions on Requisitions.BudgetId = @BudgetId
--                                       and Requisitions.UserId = @pUserId
                                       and Requisitions.RequisitionId = Detail.RequisitionId
--                      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                                      and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                                      and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
                     where Detail.ItemId = ob.ItemId)
      from @OrderBook ob
*/
/*
    update @OrderBook
       set DistrictUsed = ss.Quantity
      from @OrderBook ob
      join (select Detail.ItemId, sum(Detail.Quantity) Quantity
              from Detail with (nolock)
              join Requisitions on Requisitions.BudgetId = @BudgetId
                               and Requisitions.RequisitionId = Detail.RequisitionId
             group by Detail.ItemId) ss on ss.ItemId = ob.ItemId              
*/
    update @OrderBook
       set DistrictUsed = ss.Quantity
      from @OrderBook ob
      join (select D1.ItemId, sum(D1.Quantity) Quantity
                      from dbo.Requisitions R1 with (nolock)
                      join dbo.Detail d1 on D1.RequisitionId = R1.RequisitionId
                     where R1.BudgetId = @BudgetId
                       and R1.CategoryId = @CategoryId
             group by D1.ItemId) ss on ss.ItemId = ob.ItemId              

  end

/*
  -- Add Items used by Price Plan
  insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions)
    select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, OrderBookDetail.Weight % 100000 Quantity, OrderBookDetail.Weight / 100000 RequisitionId
      from dbo.OrderBooks OrderBooks
      join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
      join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
                    and Items.Active = 1
      left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
      left outer join @OrderBook obd on obd.ItemId = Items.ItemId
     where OrderBooks.OrderBookId = @pOrderBookId
       and obd.OBDWorkId is null
     group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, OrderBookDetail.Weight
*/

  -- Add Always Add Items
  insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, LYQty, MustKeep)
    select dbo.Items.ItemId, dbo.Items.HeadingId, null, dbo.Headings.ExpandAll, 0, 0, 0, 1
      from dbo.OrderBooks OrderBooks with (nolock)
      join dbo.OrderBookAlwaysAdd OrderBookAlwaysAdd on OrderBookAlwaysAdd.CategoryId = OrderBooks.CategoryId
      join dbo.Items on Items.PackedCode = dbo.uf_PackCode(OrderBookAlwaysAdd.ItemCode)
                    and Items.CategoryId = OrderBookAlwaysAdd.CategoryId
                    and Items.Active = 1
      left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                                  and dbo.Headings.Active = 1
      left outer join @OrderBook obd on obd.ItemId = Items.ItemId
     where OrderBooks.OrderBookId = @pOrderBookId
       and obd.OBDWorkId is null
     group by dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll

  -- Add Expand All Heading Items that aren't already loaded
  insert @OrderBook (ItemId, HeadingId, ExpandAll, TotalQuantity, TotalRequisitions)
    select dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll, 0, 0
      from dbo.Items with (nolock)
      join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                       and dbo.Headings.Active = 1
      join (
        select HeadingId          from @OrderBook 
         where ExpandAll = 1
         group by HeadingId
           ) ss on ss.HeadingId = dbo.Headings.HeadingId
      left outer join @OrderBook ob on ob.ItemId = Items.ItemId
      where dbo.Items.Active = 1
        and ob.OBDWorkId is null

  -- Update Must Keep Items
  Update @OrderBook
     set MustKeep = 1,
         ExpandAll = 1
    from @OrderBook obd
    join (
        select HeadingId
          from @OrderBook 
         where ExpandAll = 1 and MustKeep = 1
         group by HeadingId
          ) ss on ss.HeadingId = obd.HeadingId

  update @OrderBook
     set MustKeep = 1
      from @OrderBook ob 
   where LyQty > 0

  select @BookDate = convert(datetime,'11/02/' + convert(char(4),@ControlYear)),
         @CategoryId = OrderBooks.CategoryId,
         @PricePlanId = OrderBooks.PricePlanId,
         @ParentAwardId = OrderBooks.AwardId,
         @OrderBookType = OrderBooks.Type
    from dbo.OrderBooks OrderBooks with (nolock)
   where OrderBookId = @pOrderBookId

  select @AddendaCategory = isnull(AllowAddenda,0)
    from Category with (nolock)
   where CategoryId = @CategoryId

  if @@rowcount = 0
  begin
    select @AddendaCategory = 0
  end

  select @PrintMode = case isnull((select top 1 Requisitions.RequisitionId
                                           from Requisitions with (nolock)
--                                           join Budgets on Budgets.BudgetId = Requisitions.BudgetId
--                                                       and Budgets.DistrictId = @pDistrictId
--                                                       and Budgets.StartDate <= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                                                       and Budgets.EndDate >= convert(datetime,'11/02/' + convert(char(4),@ControlYear))
--                                                       and Budgets.Active = 1
                                          where dbo.Requisitions.CategoryId = OrderBooks.CategoryId
                                            and dbo.Requisitions.BudgetId = @BudgetId
                                            and dbo.Requisitions.UserId = @pUserId),0)
                              when 0 then 
                                case isnull(@pUserId,0)
                                  when 0 then
                                    case isnull(@pDistrictId,0)
                                      when 0 then case when getdate() between cast('09/11/2009' as datetime) and cast('09/18/2009' as datetime) then 5 else 3 end -- Master Bid Book
                                      else
                                        case isnull(OrderBookTypes.PrintMode,0)
                                          when 3 then 3 -- Master Bid Book - Override
                                          else 2 -- District Book
                                        end
                                    end
                                  else
                                    case isnull(OrderBookTypes.PrintMode,0)
                                      when 0 then 1 -- Normal Book
                                      when 4 then 1 -- Normal Book - Override
                                      else isnull(OrderBookTypes.PrintMode,0)
                                    end
                                end
                              else
                                case isnull(@pUserId,0)
                                  when 0 then
                                    case isnull(@pDistrictId,0)
                                      when 0 then 3 -- Master Bid Book
                                      else
                                        case isnull(OrderBookTypes.PrintMode,0)
                                          when 3 then 3 -- Master Bid Book - Override
                                          else 2 -- District Book
                                        end
                                    end
                                  else
                                    case isnull(OrderBookTypes.PrintMode,0)
                                      when 0 then 1 -- Normal Book
                                      else isnull(OrderBookTypes.PrintMode,0)
                                    end
                                end
                            end
    from OrderBooks with (nolock)
    left outer join DistrictCategories on DistrictCategories.CategoryId = OrderBooks.CategoryId
                                      and DistrictCategories.DistrictId = @pDistrictId
    left outer join OrderBookTypes on OrderBookTypes.OrderBookTypeId = DistrictCategories.OrderBookTypeId
   where OrderBooks.OrderBookId = @pOrderBookId

  Update @OrderBook
     set HeadingId = null
   where HeadingId = 0

  if @OrderBookType != 'B'
  begin
  Update @OrderBook
     set BidPrice = 
   (select top 1 BidPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   GrossPrice = 
   (select top 1 GrossPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   BidDiscountRate = 
   (select top 1 DiscountRate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CrossRefId = 
   (select top 1 CrossRefId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and isnull(Catalog.NotValidForOB,0) = 0
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogPage = 
   (select top 1 CatalogPage
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, case isnull(CrossRefs.CatalogYear,'') when Catalog.CatalogYear then CrossRefs.Page else '' end CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
          left outer join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, case isnull(CrossRefs.CatalogYear,'') when Catalog.CatalogYear then CrossRefs.Page else '' end CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
                        and isnull(Catalog.NotValidForOB,0) = 0
-- Above Line of Code Added 9/17/2004 DCH
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogYear = 
   (select top 1 CatalogYear
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid, CrossRefs.CatalogYear
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid, CrossRefs.CatalogYear
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
                        and isnull(Catalog.NotValidForOB,0) = 0
-- Above Line of Code Added 9/17/2004 DCH
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, CrossRefs.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorId = 
   (select top 1 VendorId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorItemCode = 
   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   AwardId = 
   (select top 1 AwardId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogId = 
   (select top 1 CatalogId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = ob.ItemId
           and Items.Active = 1
           and @PrintMode != 5
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
                        and isnull(Catalog.NotValidForOB,0) = 0
-- Above Line of Code Added 9/17/2004 DCH
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from @OrderBook ob
 where isnull(ob.BidPrice,0) = 0
end
else
begin
  Update @OrderBook
     set BidPrice = 
   (select top 1 BidPrice
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   GrossPrice = 
   (select top 1 GrossPrice
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   BidDiscountRate = 
   (select top 1 DiscountRate
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   CatalogPage = 
   (select top 1 CatalogPage
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CatalogPage) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
-- Above Line of Code Added 9/17/2004 DCH
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   CatalogYear = 
   (select top 1 CatalogYear
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CatalogPage) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   VendorId = 
   (select top 1 VendorId
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   VendorItemCode = 
   (select top 1 VendorItemCode
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   AwardId = 
   (select top 1 AwardId
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
),
   CatalogId = 
   (select top 1 CatalogId
      from (
          select case isnull(Catalog.VendorId,0) when isnull(pc.VendorId,0) then case isnull(Catalog.CatalogId,0) when isnull(ob.CatalogId,0) then 1 else 0 end else -1 end IB, round(isnull(Items.ListPrice, CrossRefs.CatalogPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, Catalog.CatalogYear
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
--                          and case isnumeric(CrossRefs.Page) when 1 then convert(int,CrossRefs.Page) else 0 end != 0
-- Above Line Added to Solve Picking Zero Page # when multi-Catalog per vendor 11/06/07
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
--                        and Catalog.Name = 'EDS'
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
-- Above Line of Code Added 9/17/2004 DCH
            left outer join Catalog pc on pc.CatalogId = ob.ParentAwardId
           where Items.ItemId = ob.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, CatalogYear desc, isnull(case isnumeric(CatalogPage) when 1 then case convert(int,CatalogPage) when 0 then 9999 else convert(int,CatalogPage) end else 9999 end,9999), CatalogId desc, BidPrice, BidItemId, CrossRefId
)
  from @OrderBook ob
 where isnull(ob.BidPrice,0) = 0
--  join Items I1 on I1.ItemId = ob.ItemId
--  join OrderBooks on OrderBooks.OrderBookId = @pOrderBookId
--  join BidHeaders bh1 on bh1.BidHeaderId = OrderBooks.BidHeaderId

  update @OrderBook
     set BidPrice = round(OrderBookDetail.BasePrice / ((100 - isnull(OrderBooks.Markup,0)) / 100),2)
    from @OrderBook ob
    join OrderBookDetail on OrderBookDetail.OrderBookDetailId = ob.OrderBookDetailId
    join OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
   where isnull(BasePrice,0) != 0

  if @CategoryId = 67
  begin
    update @OrderBook
       set OrderBookDetailId = (select count(*) from @OrderBook where isnull(BidPrice,0) = 0)
  end
end

  if @OrderBookType != 'B'
  begin
    -- Delete No Bid Items
    Delete @OrderBook
     where (isnull(BidPrice,0) = 0 or isnull(AwardId,0) = 0 or isnull(BidPrice,0) between 9999.00 and 9999.99)
       and @PrintMode != 5
     
  end

  if @ParentAwardId != 0
  begin
    Update @OrderBook
       set VendorItemCode = isnull((select top 1 xr.VendorItemCode from CrossRefs xr
           join Catalog on Catalog.CatalogId = xr.CatalogId 
                       and Catalog.Active = 1 
                       and Catalog.VendorId = Awards.VendorId 
                       and isnull(Catalog.NotValidForOB,0) = 0
           join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId 
                                 and AwardsCatalogList.CatalogId = Catalog.CatalogId 
          where xr.ItemId = ob.ItemId 
            and xr.Active = 1 
          order by Catalog.CatalogYear desc, Catalog.Name, xr.CrossRefId desc),ob.VendorItemCode),
           CatalogPage = isnull((select top 1 xr.Page from CrossRefs xr
           join Catalog on Catalog.CatalogId = xr.CatalogId 
                       and Catalog.Active = 1 
                       and Catalog.VendorId = Awards.VendorId 
                       and isnull(Catalog.NotValidForOB,0) = 0
           join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId 
                                 and AwardsCatalogList.CatalogId = Catalog.CatalogId 
          where xr.ItemId = ob.ItemId 
            and xr.Active = 1 
          order by Catalog.CatalogYear desc, Catalog.Name, xr.CrossRefId desc),ob.CatalogPage),
           CatalogId = isnull((select top 1 xr.CatalogId from CrossRefs xr
           join Catalog on Catalog.CatalogId = xr.CatalogId 
                       and Catalog.Active = 1 
                       and Catalog.VendorId = Awards.VendorId 
                       and isnull(Catalog.NotValidForOB,0) = 0
           join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId 
                                 and AwardsCatalogList.CatalogId = Catalog.CatalogId 
          where xr.ItemId = ob.ItemId 
            and xr.Active = 1 
          order by Catalog.CatalogYear desc, Catalog.Name, xr.CrossRefId desc),ob.CatalogId),
           CrossRefId = isnull((select top 1 xr.CrossRefId from CrossRefs xr
           join Catalog on Catalog.CatalogId = xr.CatalogId 
                       and Catalog.Active = 1 
                       and Catalog.VendorId = Awards.VendorId 
                       and isnull(Catalog.NotValidForOB,0) = 0
           join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId 
                                 and AwardsCatalogList.CatalogId = Catalog.CatalogId 
          where xr.ItemId = ob.ItemId 
            and xr.Active = 1 
          order by Catalog.CatalogYear desc, Catalog.Name, xr.CrossRefId desc),ob.CrossRefId)
      from @OrderBook ob
      join Awards on Awards.AwardId = @ParentAwardId

/*
    Update @OrderBook
       set VendorItemCode = isnull(CrossRefs.VendorItemCode ,ob.VendorItemCode),
           CatalogPage = isnull(CrossRefs.Page,ob.CatalogPage),
           CatalogId = isnull(CrossRefs.CatalogId,ob.CatalogId),
           CrossRefId = isnull(CrossRefs.CrossRefId,ob.CrossRefId)
      from @OrderBook ob
      join Awards on Awards.AwardId = @ParentAwardId
      join CrossRefs on CrossRefs.CrossRefId = 
        (select top 1 CrossRefs.CrossRefId 
           from CrossRefs xr
           join Catalog on Catalog.CatalogId = xr.CatalogId 
                       and Catalog.Active = 1 
                       and Catalog.VendorId = Awards.VendorId 
                       and isnull(Catalog.NotValidForOB,0) = 0
           join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId 
                                 and AwardsCatalogList.CatalogId = Catalog.CatalogId 
          where xr.ItemId = ob.ItemId 
            and xr.Active = 1 
          order by Catalog.CatalogYear desc, Catalog.Name, xr.CrossRefId desc)
*/

    Update @OrderBook
       set CatalogId = CrossRefs.CatalogId
      from @OrderBook ob
      join CrossRefs on CrossRefs.CrossRefId = ob.CrossRefId
     where ob.CatalogId is null
  end

  if @UseParentCatalog = 1
  begin
    Update @OrderBook
       set CatalogPage = CrossRefs.Page,
           CatalogId = CrossRefs.CatalogId,
           VendorItemCode = CrossRefs.VendorItemCode
      from @OrderBook ob
      join Items on Items.ItemId = ob.ItemId
      join BidItems on BidItems.BidItemId = ob.BidItemId
      join Bids on Bids.BidHeaderId = @BidHeaderId
               and Bids.Active = 1
      join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
      join Catalog on Catalog.CatalogId = Items.ParentCatalogId
                  and Catalog.CatalogId = BidsCatalogList.CatalogId
                  and Catalog.Active = 1
      join CrossRefs on CrossRefs.ItemId = ob.ItemId
                    and CrossRefs.CatalogId = Catalog.CatalogId
                    and CrossRefs.Active = 1
  end

  if isnull(@OrderBookYear,0) > 0
  begin
    delete @OrderBook
      from @Orderbook ob
      join Catalog on Catalog.CatalogId = ob.CatalogId
                  and convert(int,Catalog.CatalogYear) != @OrderBookYear
     where @PrintMode != 5
  end

  Update @OrderBook
     set CatalogPrice = 0
    where CatalogPrice < BidPrice

  Update @OrderBook
     set VendorName = Vendors.Name,
         VendorCode = Vendors.Code
    from @OrderBook ob
    join Vendors on Vendors.VendorId = ob.VendorId
   where ob.VendorName is null

  if @OrderBookType = 'B'
  begin
    if @pDistrictId != 0
    begin
      if @CategoryId = 44 or @CategoryId = 12
      begin
        Delete @OrderBook
          from @OrderBook ob
          join dbo.Items on Items.ItemId = ob.ItemId
          where Items.DistrictId != @pDistrictId
           and @PrintMode != 5
      end
      if @CategoryId = 15
      begin
        Delete @OrderBook
          from @OrderBook ob
          join dbo.Items on Items.ItemId = ob.ItemId
         where case isnull(Items.DistrictId,0) when 0 then @pDistrictId else Items.DistrictId end != @pDistrictId
           and @PrintMode != 5
--             or (    isnull(MustKeep,0) = 0
--                 and isnull(DistrictUsed,0) = 0)
      end
      else
      begin
        Delete @OrderBook
          from @OrderBook ob
          join dbo.Items on Items.ItemId = ob.ItemId
          where case isnull(Items.DistrictId,0) when 0 then @pDistrictId else Items.DistrictId end != @pDistrictId
           and @PrintMode != 5
      end

      if @CategoryId = 44 and @pUserId != 0
      begin
        Delete @OrderBook
          from @OrderBook ob
         where isnull(HeadingId,0) not in (select isnull(HeadingId,0) from @OrderBook where LYQty > 0 group by isnull(HeadingId,0))
           and (select count(*) from @OrderBook where LYQty > 0) > 0
           and @PrintMode != 5
      end
    end

    if @AddendaCategory != 1 -- Budget Book for Bids 
    begin
      if @CategoryId = 1 -- Phys-Ed
      begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where ((isnull(HeadingId,0) = 0
                and isnull(MustKeep,0) != 1)
            or (isnull(BidPrice,0) = 0))
           and @PrintMode != 5
      end
      else
      if @CategoryId != 15 -- Copy/Dup
      begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where ((isnull(HeadingId,0) = 0
                and isnull(MustKeep,0) != 1)
            or (isnull(BidPrice,0) = 0)
            or (isnull(BidPrice,0) between 9999.00 and 9999.99)
            or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = case @KeepZeroPages when 1 then -1 else 0 end))
           and @PrintMode != 5

--           and MustKeep = 2
      end
    end
  end
  else
  begin
    if @CategoryId = 4 or @CategoryId = 1 
    begin
      if @KeepZeroPages = 0
      begin
        if @pDistrictId = 488
        begin
          -- Delete Non-Bid Items that are not in this years Catalog
          Delete @OrderBook
           where isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = case @KeepZeroPages when 1 then -1 else 0 end
--             and MustKeep != 1
           and @PrintMode != 5
        end
        else
        begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where BidItemId is null
           and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = case @KeepZeroPages when 1 then -1 else 0 end
--           and MustKeep != 1
           and @PrintMode != 5
        end
      end
    end
    else
    begin
      if @KeepZeroPages = 0
      begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = case @KeepZeroPages when 1 then -1 else 0 end
--           and isnull(MustKeep,0) != 1
      end
    end

  -- Delete Items from General Supply Vendors where CatalogPrice <> GrossPrice
  -- This should remove the Furniture Items ... per John 9/11/2003
    if @CategoryId = 4 and @OrderBookType != 'B'
    begin
      delete @OrderBook
        from @OrderBook ob
        join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.ItemId = ob.ItemId
        join dbo.OrderBooks OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
        join dbo.CrossRefs on CrossRefs.ItemId = ob.ItemId                          and crossRefs.Active = 1
       where OrderBooks.CategoryId = 4
         and OrderBooks.OrderBookId = @pOrderBookId
         and isnull(Crossrefs.CatalogPrice,0) != isnull(Crossrefs.GrossPrice,0)
         and ob.BidItemId is null
    end
/*
    if @CategoryId = 7
    begin
      Update @OrderBook
         set CatalogPage = '   0'
       where isnull(CatalogYear,'') != '03'
    end
*/
  end

  -- Set Weight for All Items
  Update @OrderBook
--     set Weight = (isnull(DistrictUsed,0) * 1000000000) + (isnull(TotalRequisitions,0) * 100000) + isnull(TotalQuantity,0)
--     set Weight = (isnull(DistrictUsed,0) * 1000000000) + (isnull(TotalRequisitions,0) * isnull(TotalRequisitions,0)) + isnull(TotalQuantity,0)
     set Weight = case isnull(DistrictUsed,0) when 0 then 0 else 1000000000 end + isnull(Weight,0)

  -- Set Weight for All ExpandAll Items
  Update @OrderBook
     set Weight = ss.MaxWeight
    from @OrderBook obd
    join (
        select HeadingId, max(Weight) MaxWeight
          from @OrderBook
         where ExpandAll = 1
         group by HeadingId
          ) ss on ss.HeadingId = obd.HeadingId
/*
  if @pDistrictId = 417
  begin
    delete @OrderBook
     where isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = case @KeepZeroPages when 1 then -1 else 0 end
  end
*/
  if @OrderBookType = 'B'
  begin
    if @CategoryId = 4
    begin
      if @PrintMode = 1
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 500 with ties OBDWorkId, weight 
              from @OrderBook 
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end 
      else
      if @PrintMode = 2
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 1000 with ties OBDWorkId, weight 
              from @OrderBook 
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
      if @PrintMode != 4
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    if @CategoryId = 5
    begin
      if @PrintMode = 1
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 800 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
--               and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end 
      else
      if @PrintMode = 2
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 1200 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
--               and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
      if @PrintMode != 4
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    if @CategoryId = 7
    begin
      if @PrintMode = 1
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 1500 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
--               and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end 
      else
      if @PrintMode = 2
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 1800 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
--               and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
      if @PrintMode != 4
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    if @CategoryId = 1 -- Phys Ed
    begin
      -- Set Sort Sequence for All Items
      Update @OrderBook
         set SortSeq = dbo.uf_SetSortSeq(Items.ItemCode)
        from @OrderBook ob
        join dbo.Items on Items.ItemId = ob.ItemId

      if @PrintMode = 1
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob          join (
            select top 800 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
               and ((    rtrim(substring(SortSeq,1,16)) = '' 
                     and isnumeric(substring(SortSeq,17,8)) = 1
                     and convert(int,substring(SortSeq,17,8)) < 10000)
                    or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0)
                   )
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end 
      else
      if @PrintMode = 2
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 1200 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
               and ((    rtrim(substring(SortSeq,1,16)) = '' 
                     and isnumeric(substring(SortSeq,17,8)) = 1
                     and convert(int,substring(SortSeq,17,8)) < 10000)                    or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0)
                   )
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
      if @PrintMode != 4
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    begin
      if @PrintMode != 4
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
  end
  else
  if @CategoryId = 4
  begin
    if @PrintMode = 1
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 500 with ties OBDWorkId, weight 
            from @OrderBook 
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @PrintMode = 2
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1000 with ties OBDWorkId, weight 
            from @OrderBook 
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 5
  begin
    if @PrintMode = 1
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 800 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @PrintMode = 2
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1200 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 7 or @CategoryId = 2
  begin
    if @PrintMode = 1
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1500 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @PrintMode = 2
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1800 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 1 -- Phys Ed
  begin
    -- Set Sort Sequence for All Items
    Update @OrderBook
       set SortSeq = dbo.uf_SetSortSeq(Items.ItemCode)
      from @OrderBook ob
      join dbo.Items on Items.ItemId = ob.ItemId

    if @PrintMode = 1
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 800 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
             and ((    rtrim(substring(SortSeq,1,16)) = '' 
                   and isnumeric(substring(SortSeq,17,8)) = 1
                   and convert(int,substring(SortSeq,17,8)) < 10000)
                  or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != case @KeepZeroPages when 1 then -1 else 0 end)
                 )
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @PrintMode = 2
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1200 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
             and ((    rtrim(substring(SortSeq,1,16)) = '' 
                   and isnumeric(substring(SortSeq,17,8)) = 1
                   and convert(int,substring(SortSeq,17,8)) < 10000)                  or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != case @KeepZeroPages when 1 then -1 else 0 end)
                 )
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @OrderBookType != 'B'
  begin
    if @PrintMode = 1
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 800 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--2/16/04             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @PrintMode = 2
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 1200 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--2/16/04             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  begin
    if @PrintMode != 4
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end

  -- Update Must Keep Items - Added to End to Catch Top Selection Items that we Kept
  Update @OrderBook
     set MustKeep = 1,
         ExpandAll = 1
    from @OrderBook obd
    join (
        select HeadingId
          from @OrderBook
         where ExpandAll = 1 and MustKeep = 1
         group by HeadingId
          ) ss on ss.HeadingId = obd.HeadingId
   where isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != case @KeepZeroPages when 1 then -1 else 0 end

  if @CategoryId != 12 or @PrintMode = 4--and @OrderBookType != 'B'
  begin
    -- Delete Items Not being Kept
    delete @OrderBook
      from @OrderBook obd
     where isnull(MustKeep,0) < 1
  end

  -- Update Extra Info
  Update @OrderBook
     set Category = case isnull(OrderBooks.Category,'') when '' then OrderBooks.Category else dbo.Category.Name end,
         UnitCode = rtrim(ltrim(dbo.Units.Code)),
         Title = case isnull(rtrim(ltrim(dbo.Headings.Title)),'') 
                   when '' then 
                     case Category.CategoryId 
                       when 3 then 
                         'Last Year''s Addenda Items' 
                       else 
                         'Last Year''s Addenda Items' 
                     end
                   else 
                     rtrim(ltrim(dbo.Headings.Title)) 
                 end + case isnull(Keywords.Keyword,'') when '' then '' else ' - ' + rtrim(Keywords.Keyword) end,         HeadingDescription = dbo.uf_RemoveTrailingCRs(ltrim(dbo.Headings.Description)),
         ItemCode = rtrim(ltrim(dbo.Items.ItemCode)),
         ItemDescription = case @OrderBookType when 'B' then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescriptionNoExtra.ItemDescription) else case Category.CategoryId when 12 then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescription.ItemDescription) when 44 then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescription.ItemDescription) else dbo.uf_RemoveTrailingCRs(ltrim(dbo.Items.Description)) end end
    from @OrderBook ob
    join dbo.Items on dbo.Items.ItemId = ob.ItemId
    join dbo.vw_ItemDescription on vw_ItemDescription.ItemId = Items.ItemId
    join dbo.vw_ItemDescriptionNoExtra on vw_ItemDescriptionNoExtra.ItemId = Items.ItemId
    join dbo.Category on dbo.Category.CategoryId = dbo.Items.CategoryId
    join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
    join dbo.OrderBooks on OrderBooks.OrderBookId = @pOrderBookId
    left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
                                and dbo.Headings.Active = 1
    left outer join dbo.Keywords Keywords on Keywords.KeywordId = dbo.Items.KeywordId
                                         and dbo.Headings.Active = 1

  if @CategoryId != 1
  begin
    -- Set Sort Sequence for All Items
    Update @OrderBook
       set SortSeq = dbo.uf_SetSortSeq(ItemCode)
  end

  Update @OrderBook
     set SortKey = substring(
                   case @CategoryId 
                     when 4 then 
                       case Title 
                         when 'Miscellaneous' then '2' 
                         when 'Last Year''s Addenda Items' then '3' 
                         else '1' 
                       end + Title + ' ' + SortSeq 
                     else
                       case Title 
                         when 'Miscellaneous' then '2'
                         when 'Last Year''s Addenda Items' then '3' 
                         else '1'
                       end + Title + ' ' + ItemDescription + ' ' + SortSeq
                   end, 1, 512)

  if @OrderBooktype = 'B'
  begin
    Update @OrderBook
       set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then '' else char(13) + char(10) end + dbo.uf_CatalogRefs(Items.ItemId, 0, 0)
      from @OrderBook ob
      join dbo.Catalog on Catalog.CatalogId = ob.CatalogId --Items.ParentCatalogId
      join dbo.Items on Items.ItemId = ob.ItemId
  end
  else
  begin
    if @CategoryId = 12 or @CategoryId = 44
    begin
      Update @OrderBook
         set ItemDescription = case isnull(BidItems.ItemBidType,'') 
                                 when 'Compliant' then 'Compliant Item:' 
                                 else '' 
                               end + 
                               dbo.uf_RemoveTrailingCRs(ltrim(isnull(BidItems.Alternate,''))) +
                               case isnull(BidItems.ItemBidType,'') 
                                 when 'Compliant' then char(13) + char(10)
                                 else ''
                               end +
                               case @OrderBookType 
                                 when 'B' then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescriptionNoExtra.ItemDescription) 
                                 else case @CategoryId 
                                        when 12 then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescription.ItemDescription) 
                                        when 44 then dbo.uf_RemoveTrailingCRs(dbo.vw_ItemDescription.ItemDescription) 
                                        else dbo.uf_RemoveTrailingCRs(ltrim(dbo.Items.Description)) 
                                      end
                                end
        from @OrderBook ob
        join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
        join dbo.Items on Items.ItemId = BidItems.ItemId
        join dbo.vw_ItemDescription on vw_ItemDescription.ItemId = Items.ItemId
        join dbo.vw_ItemDescriptionNoExtra on vw_ItemDescriptionNoExtra.ItemId = Items.ItemId
    end
    else
    begin
      Update @OrderBook
         set Alternate = case isnull(BidItems.ItemBidType,'') when 'Compliant' then 'Compliant Item:' else '' end + dbo.uf_RemoveTrailingCRs(ltrim(isnull(BidItems.Alternate,'')))
        from @OrderBook ob
        join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
    end

    -- Add Alternate Catalog Info
    if @CategoryId != 4
    begin
      Update @OrderBook
         set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then '' else char(13) + char(10) end + case isnull((select count(*) from dbo.CrossRefs join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId and Catalog.Active = 1 join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId join dbo.Bids on Bids.BidId = BidsCatalogList.BidId and Bids.Active = 1 and Bids.BidHeaderId = @BidHeaderId where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1),0) when 0 then '' when 1 then 'Catalog References from:' + isnull(Catalog.Name,'') else dbo.uf_CatalogRefs(Items.ItemId, Bids.VendorId, @BidHeaderId) end
        from @OrderBook ob
        join dbo.Catalog on Catalog.CatalogId = ob.CatalogId --Items.ParentCatalogId
        join dbo.Items on Items.ItemId = ob.ItemId
        left outer join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
        left outer join dbo.Bids on Bids.BidId = BidItems.BidId
        left outer join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
--       where isnull(rtrim(ob.VendorItemCode),'') != ''
    end

    -- Add Winning Vendor Info
    if @CategoryId != 4
    begin
      Update @OrderBook
         set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then ''else char(13) + char(10) end + case isnull(BidItems.VendorItemCode,'') when '' then '' else 'Winning Vendor''s Item:' + isnull(BidItems.VendorItemCode,'') end + case isnull(CrossRefs.Page,'') when '' then '' else ' Catalog Page: ' + CrossRefs.Page end
        from @OrderBook ob
        join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
        join dbo.Bids on Bids.BidId = BidItems.BidId
        left outer join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
       where isnull(rtrim(BidItems.VendorItemCode),'') != ''
         and isnull(BidItems.AwardId,0) != @ParentAwardId
    end
  end

  if @OrderBookType = 'B'
  begin
    Update @OrderBook
       set VendorItemCode = null,
           Compliant = null
     where dbo.uf_PackCode(VendorItemCode) = dbo.uf_PackCode(ItemCode)
  end
/*  Update @OrderBook
     set Alternate = substring(Alternate,1,511)
   where len(rtrim(Alternate)) > 511
*/
  if @OrderBookType != 'B'
  begin
    Update ob
       set Compliant = 1
      from @OrderBook ob
      join BidItems on BidItems.BidItemId = ob.BidItemId
                   and BidItems.ItemBidType = 'Compliant'
  end

  return
end
```
