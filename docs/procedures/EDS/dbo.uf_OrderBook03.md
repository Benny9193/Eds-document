# Function: table-valued: `dbo.uf_OrderBook03`

_Generated on 2026-05-04T13:04:24.293Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_OrderBook03` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2006-11-13 08:30:08 |
| Modified | 2009-03-25 06:55:28 |
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
| `Category` | USER_TABLE |  |
| `dbo.Awards` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Budgets` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Crossrefs` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.OBPrices` | USER_TABLE |  |
| `dbo.OldPrices` | unresolved |  |
| `dbo.OrderBookAlwaysAdd` | USER_TABLE |  |
| `dbo.OrderBookDetail` | USER_TABLE |  |
| `dbo.OrderBooks` | USER_TABLE |  |
| `dbo.PricePlans` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from Items where ItemId = 561508
--sp_who2
--sp_RebuildOBPricesSingle 23
--select * from OrderBooks
--select * from uf_OrderBook03(23, 11, 187597) Order by Title, SortSeq
CREATE                             function dbo.uf_OrderBook03(@pOrderBookId int, @pDistrictId int, @pUserId int)
returns @OrderBook table (
OBDWorkId		int identity(1,1) not null primary key,
Title			varchar(255) null,
HeadingDescription	varchar(4096) null,
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
Alternate		varchar(1024) null,
Category		varchar(255) null,
TotalQuantity		int null,
TotalRequisitions	int null,
DistrictUsed		int null,
ExpandAll		tinyint null,
ItemId			int null,
HeadingId		int null,
BidItemId		int null,
Weight			int null,
SortSeq			varchar(64) null,
LYQty			int null,
MustKeep		int null,
GrossPrice		money null,
BidDiscountRate		decimal(9,5) null,
CatalogDiscountRate	decimal(9,5) null,
AwardId			int null,
ParentAwardId		int null,
CatalogId		int null,
CatalogPrice		money null)

AS
begin
declare @BookDate datetime,
	@CategoryId int,
	@PricePlanId int,
	@ParentAwardId int,
	@OrderBookType char(1),
	@AddendaCategory int,
	@RecCount int
--	@CatalogYear char(2)

  if @pUserId != 0
  begin
    insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, LYQty, MustKeep)
      select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId), sum(dbo.Detail.Quantity), 1
        from dbo.OrderBooks OrderBooks
        join dbo.Requisitions on dbo.Requisitions.CategoryId = OrderBooks.CategoryId
        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                        and Budgets.StartDate <= convert(datetime,'11/02/2003')
                        and Budgets.EndDate >= convert(datetime,'11/02/2003')
        join dbo.Detail on dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.Budgets.DistrictId
                           and dbo.DistrictPP.PricePlanId = OrderBooks.PricePlanId
        join dbo.Items on Items.ItemId = Detail.ItemId
                      and Items.Active = 1
        left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
        left outer join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
                                                           and OrderBookDetail.ItemId = Items.ItemId
        left outer join @OrderBook obd on obd.ItemId = Items.ItemId
       where OrderBooks.OrderBookId = @pOrderBookId
         and dbo.Requisitions.UserId = @pUserId
         and obd.OBDWorkId is null
       group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll
  end

  if @pDistrictId != 0
  begin
    -- Add Items used by District
    insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, DistrictUsed)
      select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId), 1
        from dbo.OrderBooks OrderBooks
        join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
        join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
                      and Items.Active = 1
        join dbo.Detail on dbo.Detail.ItemId = dbo.Items.ItemId
        join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
                             and dbo.Requisitions.CategoryId = OrderBooks.CategoryId
        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                        and Budgets.StartDate <= convert(datetime,'11/02/2003')
                        and Budgets.EndDate >= convert(datetime,'11/02/2003')
        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.Budgets.DistrictId
                           and dbo.DistrictPP.PricePlanId = OrderBooks.PricePlanId        left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
        left outer join @OrderBook obd on obd.ItemId = Items.ItemId
       where OrderBooks.OrderBookId = @pOrderBookId
         and dbo.Budgets.DistrictId = @pDistrictId
         and obd.OBDWorkId is null
       group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll
/*      select dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId), 1
        from dbo.OrderBooks OrderBooks
        join dbo.Requisitions on dbo.Requisitions.CategoryId = OrderBooks.CategoryId
        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                        and Budgets.StartDate <= convert(datetime,'11/02/2003')
                        and Budgets.EndDate >= convert(datetime,'11/02/2003')
        join dbo.Detail on dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.Budgets.DistrictId
                           and dbo.DistrictPP.PricePlanId = OrderBooks.PricePlanId
        join dbo.Items on Items.ItemId = Detail.ItemId
        join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
                                                and OrderBookDetail.ItemId = Items.ItemId
        left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
        left outer join @OrderBook obd on obd.ItemId = Items.ItemId
       where OrderBooks.OrderBookId = @pOrderBookId
         and dbo.Budgets.DistrictId = @pDistrictId
         and obd.OBDWorkId is null
       group by dbo.Items.ItemId, dbo.Items.HeadingId, OrderBookDetail.BidItemId, dbo.Headings.ExpandAll
*/
  end

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

  -- Add Always Add Items
  insert @OrderBook (ItemId, HeadingId, BidItemId, ExpandAll, TotalQuantity, TotalRequisitions, LYQty, MustKeep)
    select dbo.Items.ItemId, dbo.Items.HeadingId, null, dbo.Headings.ExpandAll, 0, 0, 0, 1
      from dbo.OrderBooks OrderBooks
      join dbo.OrderBookAlwaysAdd OrderBookAlwaysAdd on OrderBookAlwaysAdd.CategoryId = OrderBooks.CategoryId
      join dbo.Items on Items.PackedCode = dbo.uf_PackCode(OrderBookAlwaysAdd.ItemCode)
                    and Items.CategoryId = OrderBookAlwaysAdd.CategoryId
                    and Items.Active = 1
      left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
      left outer join @OrderBook obd on obd.ItemId = Items.ItemId
     where OrderBooks.OrderBookId = @pOrderBookId
       and obd.OBDWorkId is null
     group by dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll

  -- Add Expand All Heading Items that aren't already loaded
  insert @OrderBook (ItemId, HeadingId, ExpandAll, TotalQuantity, TotalRequisitions)
    select dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll, 0, 0
      from dbo.Items
      join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
      join (
        select HeadingId          from @OrderBook
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

  select @BookDate = convert(datetime,'11/02/2003'),
         @CategoryId = OrderBooks.CategoryId,
         @PricePlanId = OrderBooks.PricePlanId,
         @ParentAwardId = OrderBooks.AwardId,
         @OrderBookType = OrderBooks.Type
    from dbo.OrderBooks OrderBooks
   where OrderBookId = @pOrderBookId

  select @AddendaCategory = AllowAddenda
    from Category
   where CategoryId = @CategoryId

  if @@rowcount = 0
  begin
    select @AddendaCategory = 0
  end

  Update @OrderBook
     set HeadingId = null
   where HeadingId = 0

  if @OrderBookType = 'B'
  begin
    if @CategoryId = 15 -- Copy/Dup
    begin
      -- Update Bid Items for Price Plan
      Update @OrderBook
         set BidPrice = si.BidPrice,
             GrossPrice = si.GrossPrice,
             BidDiscountRate = si.BidDiscountRate,
             CatalogDiscountRate = si.CatalogDiscountRate,
             CatalogPage = si.Page,
             CatalogYear = si.CatalogYear,
             VendorCode = si.VendorCode,
             VendorName = si.VendorName,
             VendorItemCode = si.VendorItemCode,
             PricePlanDescription = PricePlans.Code + ' - ' + PricePlans.Description,
             AwardId = si.AwardId,
             ParentAwardid = si.ParentAwardId,
             CatalogId = si.CatalogId
        from @OrderBook ob
        join (
          select NewPrices.ItemId, NewPrices.PricePlanId, round(case Vendors.VendorId when 7691 then 0 else NewPrices.BidPrice / ((100 - OrderBooks.Markup) / 100) end,2) BidPrice, round(case Vendors.VendorId when 7691 then 0 else NewPrices.BidPrice / ((100 - OrderBooks.Markup) / 100) end,2) GrossPrice, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then '   0' 
                   when (
                     case rtrim(isnull(BidCrossRef.CatalogYear,''))
                       when '' then
                         rtrim(isnull((select top 1 cr1.CatalogYear 
                            from dbo.CrossRefs cr1 
                           where cr1.ItemId = NewPrices.ItemId 
                             and cr1.CatalogId = Catalog.CatalogId
                             and cr1.Active = 1 
                           order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                       else rtrim(BidCrossRef.CatalogYear)
                     end) then 
                       case rtrim(isnull(BidCrossRef.CatalogYear,''))
                         when '' then
                           rtrim(isnull((select top 1 cr1.Page
                              from dbo.CrossRefs cr1 
                             where cr1.ItemId = NewPrices.ItemId 
                               and cr1.CatalogId = Catalog.CatalogId
                               and cr1.Active = 1 
                             order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                         else BidCrossRef.Page
                       end
                   else '   0'
                 end Page, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then null 
                   when (
                     case isnull(BidCrossRef.CatalogYear,'')
                       when '' then
                         (select top 1 CatalogYear 
                            from dbo.CrossRefs cr1 
                           where cr1.ItemId = NewPrices.ItemId 
                             and cr1.CatalogId = Catalog.CatalogId
                             and cr1.Active = 1 
                           order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc) 
                       else BidCrossRef.CatalogYear
                     end) then 
                       case rtrim(isnull(BidCrossRef.CatalogYear,''))
                         when '' then
                           rtrim(isnull((select top 1 cr1.CatalogYear
                              from dbo.CrossRefs cr1 
                             where cr1.ItemId = NewPrices.ItemId 
                               and cr1.CatalogId = Catalog.CatalogId
                               and cr1.Active = 1 
                             order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                         else BidCrossRef.CatalogYear
                       end
                   else null
                 end CatalogYear,
                 Vendors.Code VendorCode, NewPrices.VendorName, 
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull(rtrim((select top 1 VendorItemCode 
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.VendorItemCode
                       else
                         isnull(rtrim((select top 1 VendorItemCode 
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                     end
                 end VendorItemCode, 
                 Awards.BidDiscountRate, Awards.DiscountRate CatalogDiscountRate, Awards.AwardId, ParentAward.AwardId ParentAwardId, Catalog.CatalogId
            from dbo.OrderBooks OrderBooks
            join dbo.OldPrices NewPrices on NewPrices.PricePlanId = OrderBooks.PricePlanId
                                       and NewPrices.CategoryId = OrderBooks.CategoryId
            join dbo.Vendors on Vendors.VendorId = NewPrices.VendorId
            left outer join dbo.BidItems on BidItems.BidItemId = NewPrices.BidItemId
            left outer join dbo.Crossrefs BidCrossRef on BidCrossRef.CrossRefId = BidItems.CrossRefId
            left outer join dbo.Awards on Awards.AwardId = NewPrices.AwardId
            left outer join dbo.Awards ParentAward on ParentAward.AwardId = OrderBooks.AwardId
            left outer join dbo.Catalog on Catalog.CatalogId = case isnull(ParentAward.CatalogId,0) when 0 then (select isnull(Items.ParentCatalogId, Awards.CatalogId) from dbo.Items where Items.ItemId = NewPrices.ItemId) else ParentAward.CatalogId end
           where OrderBooks.OrderBookId = @pOrderBookId
           group by NewPrices.ItemId, NewPrices.PricePlanId, NewPrices.BidPrice, NewPrices.GrossPrice, /*CrossRefs.Page, CrossRefs.CatalogYear, */Catalog.CatalogYear, Vendors.Code, NewPrices.VendorName, /*CrossRefs.VendorItemCode, */Awards.BidDiscountRate, Awards.DiscountRate, ParentAward.CatalogId, Awards.AwardId, ParentAward.AwardId, Awards.CatalogId, NewPrices.CatalogId, NewPrices.VendorItemCode, NewPrices.ParentCatalogId, NewPrices.VendorId, BidCrossRef.CatalogYear, BidCrossRef.Page, Catalog.CatalogId, Vendors.VendorId, OrderBooks.Markup
        ) si on si.ItemId = ob.ItemId
        join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
    end
    else
    if @AddendaCategory = 1
    begin
      -- Update Bid Items for Price Plan using Item List Price
      Update @OrderBook
         set BidPrice = si.BidPrice,
             GrossPrice = si.GrossPrice,
             CatalogPage = si.Page,
             CatalogYear = si.CatalogYear,
             VendorCode = si.VendorCode,
             VendorName = si.VendorName,
             VendorItemCode = si.VendorItemCode,
             PricePlanDescription = case isnull(PricePlans.Code + PricePlans.Description,'') when '' then 'No Price Plan Specified' else PricePlans.Code + ' - ' + PricePlans.Description end
        from @OrderBook ob
        join (
          select Items.ItemId, OrderBooks.PricePlanId, round(isnull(OrderBookDetail.BasePrice,Items.ListPrice) / ((100 - OrderBooks.Markup) / 100),2) BidPrice, round(isnull(OrderBookDetail.BasePrice,Items.ListPrice) / ((100 - OrderBooks.Markup) / 100),2) GrossPrice, case rtrim(isnull(Catalog.CatalogYear,'')) when '' then '   0' when CrossRefs.CatalogYear then '   0' else '   0' end Page, CrossRefs.CatalogYear, '0000' VendorCode, 'Budget Book Only' VendorName, case isnull(rtrim(Items.VendorPartNumber),'') when '' then Items.ManufacturorNumber else Items.VendorPartNumber end VendorItemCode, null BidDiscountRate, null CatalogDiscountRate
            from dbo.OrderBooks OrderBooks
            join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
            join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
            left outer join dbo.CrossRefs on CrossRefs.CrossRefId = Items.ItemId
                                         and CrossRefs.Active = 1
            left outer join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                                       and Catalog.Name = 'EDS'
                                       and Catalog.Active = 1
           where OrderBooks.OrderBookId = @pOrderBookId
           group by Items.ItemId, OrderBooks.PricePlanId, OrderBookDetail.BasePrice, Items.ListPrice, Catalog.CatalogYear, CrossRefs.CatalogYear, Items.VendorPartNumber, Items.ManufacturorNumber, OrderBooks.Markup
        ) si on si.ItemId = ob.ItemId
        left outer join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
    end
    else
    begin
      -- Update Bid Items for Price Plan
      Update @OrderBook
         set BidPrice = si.BidPrice,
             GrossPrice = si.GrossPrice,
             BidDiscountRate = si.BidDiscountRate,
             CatalogDiscountRate = si.CatalogDiscountRate,
             CatalogPage = si.Page,
             CatalogYear = si.CatalogYear,
             VendorCode = si.VendorCode,
             VendorName = si.VendorName,
             VendorItemCode = si.VendorItemCode,
             PricePlanDescription = PricePlans.Code + ' - ' + PricePlans.Description,
             AwardId = si.AwardId,
             ParentAwardid = si.ParentAwardId,
             CatalogId = si.CatalogId
        from @OrderBook ob
        join (
          select OrderBookDetail.ItemId, OrderBooks.PricePlanId, round(case Vendors.VendorId when 7691 then 0 else OrderBookDetail.BasePrice / ((100 - OrderBooks.Markup) / 100) end,2) BidPrice, round(case Vendors.VendorId when 7691 then 0 else OrderBookDetail.BasePrice / ((100 - OrderBooks.Markup) / 100) end,2) GrossPrice, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then '   0' 
                   when rtrim(isnull((select top 1 cr1.CatalogYear 
                                        from dbo.CrossRefs cr1 
                                       where cr1.ItemId = OrderBookDetail.ItemId 
                                         and cr1.CatalogId = Catalog.CatalogId
                                         and cr1.Active = 1 
                                       order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                       then 
                         rtrim(isnull((select top 1 cr1.Page
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = OrderBookDetail.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                   else '   0'
                 end Page, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then null 
                   when rtrim(isnull((select top 1 cr1.CatalogYear 
                                        from dbo.CrossRefs cr1 
                                       where cr1.ItemId = OrderBookDetail.ItemId 
                                         and cr1.CatalogId = Catalog.CatalogId
                                         and cr1.Active = 1 
                                       order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                       then 
                         rtrim(isnull((select top 1 cr1.CatalogYear
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = OrderBookDetail.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                   else null
                 end CatalogYear,
                 Vendors.Code VendorCode, Vendors.Name VendorName, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then null 
                   when rtrim(isnull((select top 1 cr1.CatalogYear 
                                        from dbo.CrossRefs cr1 
                                       where cr1.ItemId = OrderBookDetail.ItemId 
                                         and cr1.CatalogId = Catalog.CatalogId
                                         and cr1.Active = 1 
                                       order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                       then 
                         rtrim(isnull((select top 1 cr1.VendorItemCode
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = OrderBookDetail.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                   else null
                 end VendorItemCode, 
                 null BidDiscountRate, null CatalogDiscountRate, null AwardId, null ParentAwardId, Catalog.CatalogId
            from dbo.OrderBooks OrderBooks
            join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
            join dbo.Items Items on Items.ItemId = OrderBookDetail.ItemId
            left outer join dbo.Catalog on Catalog.CatalogId = isnull(OrderBookDetail.CatalogId,Items.ParentCatalogid)
            left outer join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
           where OrderBooks.OrderBookId = @pOrderBookId
           group by OrderBookDetail.ItemId, OrderBooks.PricePlanId, OrderBookDetail.BasePrice, Catalog.CatalogYear, Vendors.Code, Vendors.Name, Catalog.CatalogId, Vendors.VendorId, OrderBooks.Markup
        ) si on si.ItemId = ob.ItemId
        join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
    end
  end
  else
  begin
    if @CategoryId = 7 or @CategoryId = 8 or @CategoryId = 9
    begin
      -- Update Bid Items for Price Plan
      Update @OrderBook
         set BidPrice = si.BidPrice,
             GrossPrice = si.GrossPrice,
             BidDiscountRate = si.BidDiscountRate,
             CatalogDiscountRate = si.CatalogDiscountRate,
             CatalogPage = si.Page,
             CatalogYear = si.CatalogYear,
             VendorCode = si.VendorCode,
             VendorName = si.VendorName,
             VendorItemCode = si.VendorItemCode,
             PricePlanDescription = PricePlans.Code + ' - ' + PricePlans.Description,
             AwardId = si.AwardId,
             ParentAwardid = si.ParentAwardId,
             CatalogId = si.CatalogId,
             CatalogPrice = si.CatalogPrice
        from @OrderBook ob
        join (
          select NewPrices.ItemId, NewPrices.PricePlanId, case Vendors.VendorId when 7691 then 0 else NewPrices.BidPrice end BidPrice, case Vendors.VendorId when 7691 then 0 else NewPrices.GrossPrice end GrossPrice, 
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull(rtrim((select top 1 case isnull(cr1.CatalogYear,'') when '' then '   0' when Catalog.CatalogYear then Page else '   0' end Page
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.Page
                       else
                         isnull(rtrim((select top 1 case isnull(cr1.CatalogYear,'') when '' then '   0' when Catalog.CatalogYear then Page else '   0' end Page
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                     end
                 end Page, 
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull(rtrim((select top 1 CatalogYear
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.CatalogYear
                       else
                         isnull(rtrim((select top 1 CatalogYear
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                     end
                 end CatalogYear, 
                 Vendors.Code VendorCode, NewPrices.VendorName, 
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull(rtrim((select top 1 VendorItemCode 
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.VendorItemCode
                       else
                         isnull(rtrim((select top 1 VendorItemCode 
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                     end
                 end VendorItemCode, 
                 Awards.BidDiscountRate, Awards.DiscountRate CatalogDiscountRate, Awards.AwardId, ParentAward.AwardId ParentAwardId, Catalog.CatalogId,
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull((select top 1 case isnull(cr1.CatalogYear,'') when '' then 0 when Catalog.CatalogYear then CatalogPrice else 0 end CatalogPrice
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),0) 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.CatalogPrice
                       else
                         isnull((select top 1 case isnull(cr1.CatalogYear,'') when '' then 0 when Catalog.CatalogYear then CatalogPrice else 0 end CatalogPrice
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),0) 
                     end
                 end CatalogPrice
            from dbo.OrderBooks OrderBooks
            join dbo.OBPrices NewPrices on NewPrices.PricePlanId = OrderBooks.PricePlanId
                                       and NewPrices.CategoryId = OrderBooks.CategoryId
            join dbo.Vendors on Vendors.VendorId = NewPrices.VendorId
            left outer join dbo.BidItems on BidItems.BidItemId = NewPrices.BidItemId
            left outer join dbo.Crossrefs BidCrossRef on BidCrossRef.CrossRefId = BidItems.CrossRefId
            left outer join dbo.Awards on Awards.AwardId = NewPrices.AwardId
            left outer join dbo.Awards ParentAward on ParentAward.AwardId = OrderBooks.AwardId
            left outer join dbo.Catalog on Catalog.CatalogId = case isnull(ParentAward.CatalogId,0) when 0 then (select isnull(Items.ParentCatalogId, Awards.CatalogId) from dbo.Items where Items.ItemId = NewPrices.ItemId) else ParentAward.CatalogId end
           where OrderBooks.OrderBookId = @pOrderBookId
           group by NewPrices.ItemId, NewPrices.PricePlanId, NewPrices.BidPrice, NewPrices.GrossPrice, /*CrossRefs.Page, CrossRefs.CatalogYear, */Catalog.CatalogYear, Vendors.Code, NewPrices.VendorName, /*CrossRefs.VendorItemCode, */Awards.BidDiscountRate, Awards.DiscountRate, ParentAward.CatalogId, Awards.AwardId, ParentAward.AwardId, Awards.CatalogId, NewPrices.CatalogId, NewPrices.VendorItemCode, NewPrices.ParentCatalogId, NewPrices.VendorId, BidCrossRef.CatalogYear, BidCrossRef.Page, Catalog.CatalogId, Vendors.VendorId, NewPrices.Page, NewPrices.CatalogYear, NewPrices.CatalogPrice
        ) si on si.ItemId = ob.ItemId
        join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
    end
    else
    begin
      -- Update Bid Items for Price Plan
      Update @OrderBook
         set BidPrice = si.BidPrice,
             GrossPrice = si.GrossPrice,
             BidDiscountRate = si.BidDiscountRate,
             CatalogDiscountRate = si.CatalogDiscountRate,
             CatalogPage = si.Page,
             CatalogYear = si.CatalogYear,             VendorCode = si.VendorCode,
             VendorName = si.VendorName,
             VendorItemCode = si.VendorItemCode,
             PricePlanDescription = PricePlans.Code + ' - ' + PricePlans.Description,
             AwardId = si.AwardId,
             ParentAwardid = si.ParentAwardId,
             CatalogId = si.CatalogId,
             CatalogPrice = si.CatalogPrice
        from @OrderBook ob
        join (
          select NewPrices.ItemId, NewPrices.PricePlanId, case Vendors.VendorId when 7691 then 0 else NewPrices.BidPrice end BidPrice, case Vendors.VendorId when 7691 then 0 else NewPrices.GrossPrice end GrossPrice, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then '   0' 
                   when (
                     case rtrim(isnull(BidCrossRef.CatalogYear,''))
                       when '' then
                         rtrim(isnull((select top 1 cr1.CatalogYear 
                            from dbo.CrossRefs cr1 
                           where cr1.ItemId = NewPrices.ItemId 
                             and cr1.CatalogId = Catalog.CatalogId
                             and cr1.Active = 1 
                           order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                       else rtrim(BidCrossRef.CatalogYear)
                     end) then 
                       case rtrim(isnull(BidCrossRef.CatalogYear,''))
                         when '' then
                           rtrim(isnull((select top 1 cr1.Page
                              from dbo.CrossRefs cr1 
                             where cr1.ItemId = NewPrices.ItemId 
                               and cr1.CatalogId = Catalog.CatalogId
                               and cr1.Active = 1 
                             order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                         else BidCrossRef.Page
                       end
                   else '   0'
                 end Page, 
                 case rtrim(isnull(Catalog.CatalogYear,'')) 
                   when '' then null 
                   when (
                     case isnull(BidCrossRef.CatalogYear,'')
                       when '' then
                         (select top 1 CatalogYear 
                            from dbo.CrossRefs cr1 
                           where cr1.ItemId = NewPrices.ItemId 
                             and cr1.CatalogId = Catalog.CatalogId
                             and cr1.Active = 1 
                           order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc) 
                       else BidCrossRef.CatalogYear
                     end) then 
                       case rtrim(isnull(BidCrossRef.CatalogYear,''))
                         when '' then
                           rtrim(isnull((select top 1 cr1.CatalogYear
                              from dbo.CrossRefs cr1 
                             where cr1.ItemId = NewPrices.ItemId 
                               and cr1.CatalogId = Catalog.CatalogId
                               and cr1.Active = 1 
                             order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),''))
                         else BidCrossRef.CatalogYear
                       end
                   else null
                 end CatalogYear,
                 Vendors.Code VendorCode, NewPrices.VendorName, 
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull(rtrim((select top 1 VendorItemCode 
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.VendorItemCode
                       else
                         isnull(rtrim((select top 1 VendorItemCode 
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc)),'') 
                     end
                 end VendorItemCode, 
                 Awards.BidDiscountRate, Awards.DiscountRate CatalogDiscountRate, Awards.AwardId, ParentAward.AwardId ParentAwardId, Catalog.CatalogId,
                 case rtrim(isnull(NewPrices.VendorItemCode,''))
                   when '' then
                     isnull((select top 1 case isnull(cr1.CatalogYear,'') when '' then 0 when Catalog.CatalogYear then CatalogPrice else 0 end CatalogPrice
                                     from dbo.CrossRefs cr1 
                                    where cr1.ItemId = NewPrices.ItemId 
                                      and cr1.CatalogId = Catalog.CatalogId
                                      and cr1.Active = 1 
                                    order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),0) 
                   else
                     case isnull(Awards.CatalogId,0)
                       when Catalog.CatalogId then 
                         NewPrices.CatalogPrice
                       else
                         isnull((select top 1 case isnull(cr1.CatalogYear,'') when '' then 0 when Catalog.CatalogYear then CatalogPrice else 0 end CatalogPrice
                                         from dbo.CrossRefs cr1 
                                        where cr1.ItemId = NewPrices.ItemId 
                                          and cr1.CatalogId = Catalog.CatalogId
                                          and cr1.Active = 1 
                                        order by cr1.CatalogYear desc, cr1.Page, cr1.CrossRefId Desc),0) 
                     end
                 end CatalogPrice
            from dbo.OrderBooks OrderBooks
            join dbo.OBPrices NewPrices on NewPrices.PricePlanId = OrderBooks.PricePlanId
                                       and NewPrices.CategoryId = OrderBooks.CategoryId
            join dbo.Vendors on Vendors.VendorId = NewPrices.VendorId
            left outer join dbo.BidItems on BidItems.BidItemId = NewPrices.BidItemId
            left outer join dbo.Crossrefs BidCrossRef on BidCrossRef.CrossRefId = BidItems.CrossRefId
            left outer join dbo.Awards on Awards.AwardId = NewPrices.AwardId
            left outer join dbo.Awards ParentAward on ParentAward.AwardId = OrderBooks.AwardId
            left outer join dbo.Catalog on Catalog.CatalogId = case isnull(ParentAward.CatalogId,0) when 0 then (select isnull(Items.ParentCatalogId, Awards.CatalogId) from dbo.Items where Items.ItemId = NewPrices.ItemId) else ParentAward.CatalogId end
           where OrderBooks.OrderBookId = @pOrderBookId
           group by NewPrices.ItemId, NewPrices.PricePlanId, NewPrices.BidPrice, NewPrices.GrossPrice, /*CrossRefs.Page, CrossRefs.CatalogYear, */Catalog.CatalogYear, Vendors.Code, NewPrices.VendorName, /*CrossRefs.VendorItemCode, */Awards.BidDiscountRate, Awards.DiscountRate, ParentAward.CatalogId, Awards.AwardId, ParentAward.AwardId, Awards.CatalogId, NewPrices.CatalogId, NewPrices.VendorItemCode, NewPrices.ParentCatalogId, NewPrices.VendorId, BidCrossRef.CatalogYear, BidCrossRef.Page, Catalog.CatalogId, Vendors.VendorId, NewPrices.CatalogPrice
        ) si on si.ItemId = ob.ItemId
        join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
    end  
    -- Delete No Bid Items
    Delete @OrderBook
     where isnull(BidPrice,0) = 0
  end

  Update @OrderBook
     set CatalogPrice = 0
    where CatalogPrice < BidPrice

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
      end
      else
      begin
        Delete @OrderBook
          from @OrderBook ob
          join dbo.Items on Items.ItemId = ob.ItemId
          where case isnull(Items.DistrictId,0) when 0 then @pDistrictId else Items.DistrictId end != @pDistrictId
      end
    end

    if @AddendaCategory != 1 -- Budget Book for Bids 
    begin
      if @CategoryId = 1 -- Phys-Ed
      begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where (isnull(HeadingId,0) = 0
                and isnull(MustKeep,0) != 1)
            or (isnull(BidPrice,0) = 0)
      end
      else
      if @CategoryId != 15 -- Copy/Dup
      begin
        -- Delete Non-Bid Items that are not in this years Catalog
        Delete @OrderBook
         where (isnull(HeadingId,0) = 0
                and isnull(MustKeep,0) != 1)
            or (isnull(BidPrice,0) = 0)
            or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = 0)
      end
    end
  end
  else
  begin
    -- Delete Non-Bid Items that are not in this years Catalog
    Delete @OrderBook
     where BidItemId is null
       and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) = 0
--       and MustKeep != 1


  -- Delete Items from General Supply Vendors where CatalogPrice <> GrossPrice
  -- This should remove the Furniture Items ... per John 9/11/2003
    if @CategoryId = 4
    begin
      delete @OrderBook
        from @OrderBook ob
        join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.ItemId = ob.ItemId
        join dbo.OrderBooks OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
        join dbo.CrossRefs on CrossRefs.ItemId = ob.ItemId                          and crossRefs.Active = 1
       where OrderBooks.CategoryId = 4
         and OrderBooks.OrderBookId = @pOrderBookId
         and isnull(Crossrefs.CatalogPrice,0) != isnull(Crossrefs.GrossPrice,0)
         and ob.BidItemId is null
    end

    if @CategoryId = 7
    begin
      Update @OrderBook
         set CatalogPage = '   0'
       where isnull(CatalogYear,'') != '03'
    end
  end

  -- Set Weight for All Items
  Update @OrderBook
     set Weight = (isnull(DistrictUsed,0) * 1000000000) + (isnull(TotalRequisitions,0) * 100000) + isnull(TotalQuantity,0)

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

  if @pDistrictId = 417
  begin
    delete @OrderBook
     where CatalogPage = '   0'
  end

  if @OrderBookType = 'B'
  begin
    if @CategoryId = 4
    begin
      if @pUserId != 0
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 250 with ties OBDWorkId, weight 
              from @OrderBook 
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end 
      else
      if @pDistrictId != 0
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
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    if @CategoryId = 5
    begin
      if @pUserId != 0
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
      if @pDistrictId != 0
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
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    if @CategoryId = 7
    begin
      if @pUserId != 0
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
      if @pDistrictId != 0
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
            select top 2100 with ties OBDWorkId, weight 
              from @OrderBook 
             where HeadingId is not null
--               and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
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

      if @pUserId != 0
      begin
        Update @OrderBook
           set MustKeep = 1
          from @OrderBook ob
          join (
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
      if @pDistrictId != 0
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
                     and convert(int,substring(SortSeq,17,8)) < 10000)                    or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0)
                   )
             order by weight desc
               ) s1 on s1.OBDWorkId = ob.OBDWorkId
      end
      else
      begin
        Update @OrderBook
           set MustKeep = 1
      end
    end
    else
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 4
  begin
    if @pUserId != 0
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 250 with ties OBDWorkId, weight 
            from @OrderBook 
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @pDistrictId != 0
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
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 5
  begin
    if @pUserId != 0
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
    if @pDistrictId != 0
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
    else
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @CategoryId = 7
  begin
    if @pUserId != 0
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
    if @pDistrictId != 0
    begin
      Update @OrderBook
         set MustKeep = 1
        from @OrderBook ob
        join (
          select top 2100 with ties OBDWorkId, weight 
            from @OrderBook 
           where BidItemId is not null
             and HeadingId is not null
--             and isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
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

    if @pUserId != 0
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
                  or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0)
                 )
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end 
    else
    if @pDistrictId != 0
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
                   and convert(int,substring(SortSeq,17,8)) < 10000)
                  or (isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0)
                 )
           order by weight desc
             ) s1 on s1.OBDWorkId = ob.OBDWorkId
    end
    else
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  if @OrderBookType != 'B'
  begin
    if @pUserId != 0
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
    if @pDistrictId != 0
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
    begin
      Update @OrderBook
         set MustKeep = 1
    end
  end
  else
  begin
    Update @OrderBook
       set MustKeep = 1
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
   where isnull(case isnumeric(CatalogPage) when 1 then convert(int,CatalogPage) else 0 end,0) != 0

  if @CategoryId != 12
  begin
    -- Delete Items Not being Kept
    delete @OrderBook
      from @OrderBook obd
     where isnull(MustKeep,0) < 1
  end

  -- Update Extra Info
  Update @OrderBook
     set Category = dbo.Category.Name,
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
                 end + case isnull(Keywords.Keyword,'') when '' then '' else ' - ' + rtrim(Keywords.Keyword) end,
         HeadingDescription = dbo.uf_RemoveTrailingCRs(ltrim(dbo.Headings.Description)),
         ItemCode = rtrim(ltrim(dbo.Items.ItemCode)),
         ItemDescription = case @OrderBookType when 'B' then dbo.uf_RemoveTrailingCRs(dbo.uf_ItemDescription(Items.ItemId)) else dbo.uf_RemoveTrailingCRs(ltrim(dbo.Items.Description)) end
    from @OrderBook ob
    join dbo.Items on dbo.Items.ItemId = ob.ItemId
    join dbo.Category on dbo.Category.CategoryId = dbo.Items.CategoryId
    join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
    left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
    left outer join dbo.Keywords Keywords on Keywords.KeywordId = dbo.Items.KeywordId

  if @CategoryId != 1
  begin
    -- Set Sort Sequence for All Items
    Update @OrderBook
       set SortSeq = dbo.uf_SetSortSeq(ItemCode)
  end

  if @OrderBooktype = 'B'
  begin
    if @CategoryId = 1 or @CategoryId = 9 or @CategoryId = 8 or @CategoryId = 7 -- Phys-Ed
    begin
      Update @OrderBook
         set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then '' else char(13) + char(10) end + 'Catalog References from:' + isnull(Catalog.Name,'')
        from @OrderBook ob
        join dbo.Items on Items.ItemId = ob.ItemId
        join dbo.Catalog on Catalog.CatalogId = ob.CatalogId
--       where isnull(rtrim(ob.VendorItemCode),'') != ''
    end
  end
  else
  begin
    Update @OrderBook
       set Alternate = case isnull(BidItems.ItemBidType,'') when 'Compliant' then 'Compliant Item:' else '' end + dbo.uf_RemoveTrailingCRs(ltrim(isnull(BidItems.Alternate,'')))
      from @OrderBook ob
      join dbo.BidItems on BidItems.BidItemId = ob.BidItemId

    if @CategoryId = 1 or @CategoryId = 9 or @CategoryId = 8 or @CategoryId = 7 -- Phys-Ed
    begin
      Update @OrderBook
         set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then '' else char(13) + char(10) end + 'Catalog References from:' + isnull(Catalog.Name,'')
        from @OrderBook ob
        join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
        join dbo.Bids on Bids.BidId = BidItems.BidId
        join dbo.Items on Items.ItemId = BidItems.ItemId
        join dbo.Catalog on Catalog.CatalogId = Items.ParentCatalogId
        left outer join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
--       where isnull(rtrim(ob.VendorItemCode),'') != ''
    end

    if @CategoryId = 9 or @CategoryId = 8 or @CategoryId = 7 --Technology
    begin
      Update @OrderBook
         set Alternate = isnull(ob.Alternate,'') + case rtrim(isnull(ob.Alternate,'')) when '' then ''else char(13) + char(10) end + 'Winning Vendor''s Item:' + BidItems.VendorItemCode + case isnull(CrossRefs.Page,'') when '' then '' else ' Catalog Page: ' + CrossRefs.Page end
        from @OrderBook ob
        join dbo.BidItems on BidItems.BidItemId = ob.BidItemId
        join dbo.Bids on Bids.BidId = BidItems.BidId
        left outer join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
       where isnull(rtrim(BidItems.VendorItemCode),'') != ''
         and isnull(BidItems.AwardId,0) != @ParentAwardId
    end
  end

/*  Update @OrderBook
     set Alternate = substring(Alternate,1,511)
   where len(rtrim(Alternate)) > 511
*/
  return
end
```
