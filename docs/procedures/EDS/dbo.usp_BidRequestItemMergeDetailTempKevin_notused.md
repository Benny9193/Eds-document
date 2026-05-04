# Procedure: `dbo.usp_BidRequestItemMergeDetailTempKevin_notused`

_Generated on 2026-05-04T14:49:07.452Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestItemMergeDetailTempKevin_notused` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-20 16:18:11 |
| Modified | 2019-08-16 15:17:42 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidRequestItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Kevin
-- Create date: 08/20/2015
-- Description:	Detail portion of screen used to possibly identify duplicate items in a pre-bid
-- =============================================
CREATE PROCEDURE [dbo].[usp_BidRequestItemMergeDetailTempKevin] 
	-- Add the parameters for the stored procedure here
	@BidRequestItemId int = 0
	  
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--Declare @BidRequestItemId int = 12348577 --14321590
-- comment above line - input paramater
 
--Select ItemId From BidRequestItems Where BidRequestItemId = @BidRequestItemId -- itemid = 466453 
--Select BH.CategoryId From BidRequestItems BRI Join BidHeaders BH On BH.BidHeaderId = BRI.BidHeaderId Where BidRequestItemId = @BidRequestItemId --categoryid=7
 

Declare @ItemId int = 0
Declare @BidHeaderId int = 0
Declare @CategoryId int = 0
 
Select @ItemId = BRI.ItemId, @BidHeaderId = BRI.BidHeaderId, @CategoryId = BH.CategoryId 
From BidRequestItems BRI
Join BidHeaders BH On BH.BidHeaderId = BRI.BidHeaderId 
Where BidRequestItemId = @BidRequestItemId
 

-- Build Matching Return based on join with ItemIds
Select BRI3.BidHeaderId, I3.ItemCode, I3.Description as ItemDesc, BRI3.BidRequestItemId, BRI3.ItemId, BRI3.BidRequest, 
       BRI3.Active, BRI3.RequisitionCount, BRI3.BidRequestAmount, 'Bogus Checksum' as [CHECKSUM], U.Code as UnitCode, 
       I3.SortSeq, 'Bogus District Name' as DistrictName, 'Bogus Heading' as Heading, 'Bogus ManufPart#' as ManufacturorPartNumber, 'Bogus ManufPartNoBid' as ManufPartNoBid,
       0 as VendorId, 'Bogus VendorItemCode' as VendorItemCode, 0 MatchMfgPartNo, 0 MatchVendorItemCode
From BidRequestItems BRI3
join Items I3 on I3.ItemId = BRI3.ItemId
join Units U on U.UnitId = I3.UnitId
Join
(
 
-- Get ItemIds of duplicates by matching vendoritemcode (by vendor) for different (i.e. matching) items
Select BRI2.ItemId
--Select BI2.VendorId, BR2.VendorItemCode, BRI2.BidHeaderId, BRI2.BidRequestItemId, BRI2.ItemId
From BidResults BR2 
join BidImports BI2 ON BI2.BidImportId = BR2.BidImportId
JOIN BidRequestItems BRI2 ON BRI2.BidRequestItemId = BR2.BidRequestItemId
JOIN
(
-- inner SS: get vendoritemcode for each vendor from all bid results
Select BI.VendorId, BR.VendorItemCode, BRI.ItemId --, 0 as MatchMfgPartNo, 1 as MatchVendorItemCode
From BidRequestItems BRI
join BidHeaders BH ON BH.BidHeaderId = BRI.BidHeaderId and BH.Active=1
join BidResults BR ON BR.BidRequestItemId = BRI.BidRequestItemId and BR.Active=1
join BidImports BI ON BI.BidImportId = BR.BidImportId and BI.Active=1
Where BRI.ItemId = @ItemId 
      And BRI.Active=1 
      And ISNULL(BR.VendorItemCode,'')!=''
      And ItemBidType = 'S'  --Specified Type
      And BH.BidType = 1  -- Pre-bid
      And BH.CategoryId = @CategoryId
Group By BI.VendorId, BR.VendorItemCode, BRI.ItemId
) SS ON SS.VendorId=BI2.VendorId and SS.VendorItemCode=BR2.VendorItemCode
and SS.ItemId != BRI2.ItemId
--Order by BI2.VendorId, BR2.VendorItemCode, BRI2.BidHeaderId, BRI2.BidRequestItemId, BRI2.ItemId
 
UNION 
 
-- get ItemId of duplicates by matching ManufacturorNumber for different (i.e. matching) items
Select BRI2.ItemId
--Select BI2.VendorId, BR2.ManufPartNoBid, BRI2.BidHeaderId, BRI2.BidRequestItemId, BRI2.ItemId
From BidResults BR2 
join BidImports BI2 ON BI2.BidImportId = BR2.BidImportId
JOIN BidRequestItems BRI2 ON BRI2.BidRequestItemId = BR2.BidRequestItemId
JOIN
(
-- inner SS: get ManufacturorNumber for each vendor from all bid results
Select BR.ManufPartNoBid, BRI.ItemId
From BidRequestItems BRI
join BidHeaders BH ON BH.BidHeaderId = BRI.BidHeaderId and BH.Active=1
join BidResults BR ON BR.BidRequestItemId = BRI.BidRequestItemId and BR.Active=1
join BidImports BI ON BI.BidImportId = BR.BidImportId and BI.Active=1
Where BRI.ItemId = @ItemId 
      And BRI.Active=1 
      And ISNULL(BR.ManufPartNoBid,'')!=''
      And ItemBidType = 'S'  --Specified Type
      And BH.BidType = 1  -- Pre-bid
      And BH.CategoryId = @CategoryId
Group By BR.ManufPartNoBid, BRI.ItemId
) SS ON SS.ManufPartNoBid=BR2.ManufPartNoBid
and SS.ItemId != BRI2.ItemId
 

Group By BRI2.ItemId
) SS2 ON BRI3.ItemId = SS2.ItemId 
Where BRI3.BidHeaderId = @BidHeaderId and BRI3.Active=1
 
 END
```
