# Function: table-valued: `null.uf_OrderBook`

_Generated on 2026-05-04T13:04:00.231Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_OrderBook` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-06-27 19:03:37 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Category` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.NewFF` | unresolved |  |
| `dbo.PricePlans` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `null.uf_TopOrderBook` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE   function EDSIQWebUser.uf_OrderBook(@pCategoryId int, @pPricePlanId int, @pDistrictId int)
returns @OrderBook table (
Title			varchar(255) null,
HeadingDescription	varchar(4096) null,
ItemCode		varchar(32) null,
ItemDescription		varchar(1024) null,
UnitCode		varchar(10) null,
BidPrice		money null,
PricePlanDescription	varchar(255) null,
CatalogPage		varchar(4) null,
CatalogYear		char(2) null,
VendorName		varchar(255) null,
VendorItemCode		varchar(32) null,
Category		varchar(255) null,
TotalQuantity		int null,
TotalRequisitions	int null,
ExpandAll		tinyint null,
ItemId			int null,
HeadingId		int null,
Weight			int null,
SortSeq			varchar(64) null)

AS
begin

  if @pDistrictId != 0
  begin
    -- Add Items used by District
    insert @OrderBook (ItemId, HeadingId, ExpandAll, TotalQuantity, TotalRequisitions)
      select dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity) TotalQuantity, count(dbo.Detail.RequisitionId) TotalRequisitions
        from dbo.Items
        join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
        join dbo.Detail on dbo.Detail.ItemId = dbo.Items.ItemId
        join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
        join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.School.DistrictId
                           and dbo.DistrictPP.PricePlanId = @pPricePlanId
       where dbo.Items.CategoryId = @pCategoryId
         and dbo.School.DistrictId = @pDistrictId
       group by dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll
       order by (sum(dbo.Detail.Quantity) * count(dbo.Detail.RequisitionId)) desc
  end
  else
  begin
    -- Add Items used by Price Plan
    insert @OrderBook (ItemId, HeadingId, ExpandAll, TotalQuantity, TotalRequisitions)
      select dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll, sum(dbo.Detail.Quantity), count(dbo.Detail.RequisitionId)
        from dbo.Items
        join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
        join dbo.Detail on dbo.Detail.ItemId = dbo.Items.ItemId
        join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
        join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
        join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.School.DistrictId
                           and dbo.DistrictPP.PricePlanId = @pPricePlanId
       where dbo.Items.CategoryId = @pCategoryId
       group by dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll
       order by (sum(dbo.Detail.Quantity) * count(dbo.Detail.RequisitionId)) desc
  end

  -- Add Expand All Heading Items that aren't already loaded
  insert @OrderBook (ItemId, HeadingId, ExpandAll, TotalQuantity, TotalRequisitions)
    select dbo.Items.ItemId, dbo.Items.HeadingId, dbo.Headings.ExpandAll, 0, 0
      from dbo.Items
      join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
      join (
        select HeadingId
          from @OrderBook
         where ExpandAll = 1
         group by HeadingId
      ) ss on ss.HeadingId = dbo.Headings.HeadingId
      where dbo.Items.ItemId not in (
        select ItemId
          from @OrderBook
      )

declare @TotalQuantity int,
	@TotalRequisitions int,
	@HeadingId int

declare HeadingCur cursor fast_forward read_only for
select HeadingId, sum(TotalQuantity), sum(TotalRequisitions) from @OrderBook where ExpandAll = 1 group by HeadingId

  open HeadingCur

  fetch next from HeadingCur into @HeadingId, @TotalQuantity, @TotalRequisitions

  while @@fetch_status = 0
  begin
    -- Set Weight for Expand All Items
    Update @OrderBook
       set TotalQuantity = @TotalQuantity,
           TotalRequisitions = @TotalRequisitions
     where HeadingId = @HeadingId

    fetch next from HeadingCur into @HeadingId, @TotalQuantity, @TotalRequisitions
  end

  close HeadingCur
  deallocate HeadingCur

  -- Update Extra Info
  Update @OrderBook
     set Category = dbo.Category.Name,
         UnitCode = dbo.Units.Code,
         Title = dbo.Headings.Title,
         HeadingDescription = dbo.Headings.Description,
         ItemCode = dbo.Items.ItemCode,
         ItemDescription = dbo.Items.Description
    from @OrderBook ob
    join dbo.Items on dbo.Items.ItemId = ob.ItemId
    join dbo.Category on dbo.Category.CategoryId = dbo.Items.CategoryId
    join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
    join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId

  if @pDistrictId != 0
  begin
    -- Update Bid Items for District
    Update @OrderBook
       set BidPrice = si.BidPrice,
           CatalogPage = si.Page,
           CatalogYear = si.CatalogYear,
           VendorName = si.VendorName,
           VendorItemCode = si.VendorItemCode,
           PricePlanDescription = District.DistrictCode + ' - ' + District.Name
      from @OrderBook ob
      join (
        select ItemId, PricePlanId, BidPrice, Page, CatalogYear, VendorName, VendorItemCode
          from dbo.NewFF
         where CategoryId = @pCategoryId
           and PricePlanId = @pPricePlanId
           and DistrictId = @pDistrictId
           and VendorCode != '0000'
         group by ItemId, PricePlanId, BidPrice, Page, CatalogYear, VendorName, VendorItemCode
      ) si on si.ItemId = ob.ItemId
      join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
      join dbo.DistrictPP on dbo.DistrictPP.PricePlanId = dbo.PricePlans.PricePlanId
      join dbo.District on dbo.District.DistrictId = dbo.DistrictPP.DistrictId
  end
  else
  begin
    -- Update Bid Items for Price Plan
    Update @OrderBook
       set BidPrice = si.BidPrice,
           CatalogPage = si.Page,
           CatalogYear = si.CatalogYear,
           VendorName = si.VendorName,
           VendorItemCode = si.VendorItemCode,
           PricePlanDescription = PricePlans.Code + ' - ' + PricePlans.Description
      from @OrderBook ob
      join (
        select ItemId, PricePlanId, BidPrice, Page, CatalogYear, VendorName, VendorItemCode
          from dbo.NewFF
         where CategoryId = @pCategoryId
           and PricePlanId = @pPricePlanId
--           and VendorCode != '0000'
         group by ItemId, PricePlanId, BidPrice, Page, CatalogYear, VendorName, VendorItemCode
      ) si on si.ItemId = ob.ItemId
      join dbo.PricePlans on dbo.PricePlans.PricePlanId = si.PricePlanId
  end

  -- Set Weight for All Items
  Update @OrderBook
     set Weight = TotalQuantity * TotalRequisitions,
         SortSeq = dbo.uf_SetSortSeq(ItemCode)

  return
end
```
