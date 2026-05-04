# Procedure: `dbo.usp_BidRequestItemMergeDetail_notused`

_Generated on 2026-05-04T13:43:19.144Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestItemMergeDetail_notused` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-07 14:17:05 |
| Modified | 2019-08-16 15:17:28 |
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
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Shawn Mason
-- Create date: 07/31/2015
-- Description:	Detail portion of screen used to possibly identify duplicate items in a pre-bid
-- =============================================
CREATE PROCEDURE [dbo].[usp_BidRequestItemMergeDetail] 
	-- Add the parameters for the stored procedure here
	@BidRequestItemId int = 0
	  
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--Declare @BidRequestItemId int =  14321590
Declare @MfgPartNumber varchar(50) = null
Declare @BidHeaderId int = null
Declare @ManufPartNoBid varchar(50) = null

Select @BidHeaderID = BRI.BidHeaderId
	  ,@MfgPartNumber = ManufacturorPartNumber
From BidRequestItems BRI Inner Join
	 CrossRefs CR on CR.ItemId = BRI.ItemId
WHERE BRI.BidRequestItemId = @BidRequestItemId

Select 	 BH.BidHeaderId
		,BR.ItemCode
	    ,I.[Description] as ItemDesc
		,BR.BidRequestItemId
		,BR.ItemId
		,BRI.BidRequest
		,BR.Active
		,RequisitionCount
		,BidRequestAmount
		,[CHECKSUM]
		,U.Code as UnitCode
		,I.SortSeq
		,D.Name as DistrictName
        ,isnull(Headings.Title,'') + case isnull(rtrim(Keywords.Keyword),'') when '' then '' else ' - ' + rtrim(ltrim(Keywords.Keyword)) end as Heading
		,CR.ManufacturorPartNumber
		,BR.ManufPartNoBid
		--,BI.VendorId
		--,BR.VendorItemCode
		--,(CASE ManufPartNoBid When @MfgPartNumber Then 1 Else 0 END) as MatchMfgPartNo
		--,(CASE BR.VendorItemCode WHen @VendorItemCode Then 1 Else 0 ENd) as MatchVendorItemCode
From BidRequestItems BRI INNER JOIN
	BidHeaders BH On BH.BidHeaderId = BRI.BidHeaderId Inner Join
	BidResults BR ON BRI.BidRequestItemId = BR.BidRequestItemId INNER JOIN
	Category C on C.CategoryId = BH.CategoryId INNER JOIN
	Items I On I.ItemId = BRI.ItemId INNER JOIN 
	BidImports BI on BI.BidHeaderId = BRI.BidHeaderId INNER Join
	Units U on U.UnitId = I.UnitId LEFT OUTER JOIN
	District D on D.DistrictId = I.DistrictId LEFT OUTER JOIN
	Headings on Headings.HeadingId = I.HeadingId LEFT OUTER JOIN
    Keywords Keywords on Keywords.KeywordId = I.KeywordId LEFT OUTER JOIN
	CrossRefs CR On BRI.ItemId = CR.ItemId
Where BH.BidType = 1  -- Pre-bid
	  AND ItemBidType = 'S'  --Specified Type
	  AND BH.BidHeaderId = @BidHeaderID
	  And BI.VendorId In (Select VendorId From BidImports Where BidImports.BidHeaderID = @BidHeaderID)
	  And BR.VendorItemCode In (Select VendorItemCode 
							From BidResults BR INNER JOIN 
								BidRequestItems BRI On BR.BidRequestItemId = BRI.BidRequestItemId 
							WHERE BRI.BidRequestItemId = @BidRequestItemId And IsNull(VendorItemCode,'') != '')
GROUP By
		BH.BidHeaderId
		,BR.ItemCode
	    ,I.[Description] 
		,BR.BidRequestItemId
		,BR.ItemId
		,BRI.BidRequest
		,BR.Active
		,RequisitionCount
		,BidRequestAmount
		,[CHECKSUM]
		,U.Code 
		,I.SortSeq
		,D.Name 
        ,isnull(Headings.Title,'') + case isnull(rtrim(Keywords.Keyword),'') when '' then '' else ' - ' + rtrim(ltrim(Keywords.Keyword)) end 
		,CR.ManufacturorPartNumber
		,BR.ManufPartNoBid
		--,BI.VendorId
		--,BR.VendorItemCode
		--,CASE ManufPartNoBid When @MfgPartNumber Then 1 Else 0 END 
		--,CASE BR.VendorItemCode WHen @VendorItemCode Then 1 Else 0 ENd
Having BR.BidRequestItemId != @BidRequestItemId
	   --And BR.VendorItemCode In (Select VendorItemCode 
				--			From BidResults BR INNER JOIN 
				--				BidRequestItems BRI On BR.BidRequestItemId = BRI.BidRequestItemId 
				--			WHERE BRI.BidRequestItemId = @BidRequestItemId And IsNull(VendorItemCode,'') != '')
       --AND BI.VendorId In (Select VendorId From BidImports Where BidImports.BidHeaderID = @BidHeaderID)
	   AND (CR.ManufacturorPartNumber = @MfgPartNumber) Or (BR.ManufPartNoBid = @ManufPartNoBid)


END
```
