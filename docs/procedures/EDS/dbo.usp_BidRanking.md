# Procedure: `dbo.usp_BidRanking`

_Generated on 2026-05-04T13:04:24.349Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRanking` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-24 12:48:21 |
| Modified | 2015-03-24 13:07:04 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `BidMSRPResults` | USER_TABLE |  |
| `BidMSRPResultsProductLines` | USER_TABLE |  |
| `ManufacturerProductLines` | USER_TABLE |  |
| `PriceListTypes` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_BidMSRPRankedManufacturerProductLines` | VIEW |  |
| `vw_BidMSRPResultsPrices` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_BidRanking
-- =============================================
-- Author:		Shawn Mason (do I have to claim this?)
-- Create date: 3/23/15
-- Description:	bidding ranking return
-- =============================================
CREATE PROCEDURE [dbo].[usp_BidRanking]

	
AS
BEGIN

	SET NOCOUNT ON;

Declare @RankValue int = 0;

With
	MSRPItems (BidHeaderId, MfgId, MfgName, MfgProductLineId, MSRPOptInId, OptionName, 
			  AllFlag, ProductLineName, DiscountRate, VendorId, vendorName
			  ,RankValue, TotalAward,RankForWgt
			  )
	as
	(
SELECT Distinct
	   r.BidHeaderId
      ,r.ManufacturerId
      ,vMPL.ManufacturerName
      ,vMPL.ManufacturerProductLineId
      --,ProductLineName
      ,vMPL.MSRPOptionId
      ,vMPL.OptionName
	  ,case when Upper(Ltrim(Rtrim(ProductLineName))) = 'ALL' then 1 else 0 end AllFlag
	  ,CASE WHEN   -- Does an "ALL" product line have a bid?
		(Select Count(*) From ManufacturerProductLines MPL 
			WHERE MPL.ManufacturerProductLineId = vMPL.ManufacturerProductLineId 
				 And Upper(LTrim(RTrim(MPL.Name))) = 'ALL') > 1 
			THEN 
				CASE WHEN LTrim(RTrim(MPL.Name)) = '' -- does an "ALL" product line have a blank? if so make it "ALL"
						THEN 'ALL' 
						ELSE MPL.Name
				END
			ELSE MPL.Name
		END ProductLineName
       ,Coalesce((select AVG(bmrp.WeightedDiscount)    -- Calc Avg Weighted Discount  YUCK
				   	           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = r.BidMSRPResultsId
					            and (bmrp.ManufacturerProductLineId = vMPL.ManufacturerProductLineId
					                 or bmrp.ProductLineName = vMPL.ProductLineName)
					            and bmrp.OptionName = vMPL.OptionName),
			                (select AVG(bmrp.WeightedDiscount)
					           from vw_BidMSRPResultsPrices bmrp with (nolock)
				              where bmrp.BidMSRPResultsId = bmrpla.BidMSRPResultsId
					            and (bmrp.ManufacturerProductLineId = bmrpla.ManufacturerProductLineId
					                 or bmrp.ProductLineName = vMPL.ProductLineName)
					            and bmrp.OptionName = vMPL.OptionName),0) + case when r.TotalAward = 1 then r.TotalAwardDiscount else 0 end
       DiscountRate
       --,plt.Name PriceListType
       ,Vendors.VendorId
       ,Vendors.Name VendorName
	   ,Case When (AuthorizationLetter=0 Or SubmittedExcel=0 Or ProductCatalog=0)
			Then @RankValue - 50
		Else @RankValue
		End
		,R.TotalAward
	  ,CASE WHEN   -- Are all wgts of product line Zero?
		(Select Count(*) From BidMSRPResultsProductLines 
			WHERE BidMSRPResultsProductLineId = vMPL.ManufacturerProductLineId 
				 And BidMSRPResultsProductLines.Weight = 0 ) > 1 
			THEN 
				-100
			ELSE 0
		END RankForWgt

FROM BidMSRPResults R (nolock) Left Outer Join
	 --ManufacturerProductLines On BidMSRPResults.ManufacturerId = ManufacturerProductLines.ManufacturerId --Left Outer Join
	 vw_BidMSRPRankedManufacturerProductLines vMPL  (nolock) on R.ManufacturerId = vMPL.ManufacturerId Left Outer Join
	 ManufacturerProductLines MPL  (nolock) On MPL.ManufacturerProductLineId = vMPL.ManufacturerProductLineId Left Outer Join
	 BidMSRPResultsProductLines bmrpla on bmrpla.BidMSRPResultsProductLineId =      
			(
			Select top 1 bmrpls.BidMSRPResultsProductLineId         
			   From BidMSRPResults bmrs1 join
					BidMSRPResultsProductLines bmrpls on bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId and bmrpls.Active = 1 and bmrpls.OptionName = vMPL.OptionName join
					ManufacturerProductLines mpls on mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId and mpls.Name = 'ALL'        
			 Where bmrs1.BidMSRPResultsId = r.BidMSRPResultsId
			) Left Outer Join
	 BidImports bi on bi.BidImportId = r.BidImportId  Left Outer Join
     PriceListTypes plt on plt.PriceListTypeId = r.PriceListTypeId  Left Outer Join
     Vendors on Vendors.VendorId = bi.VendorId
-- WHERE R.TotalAward = 0   --- Is Total Award checked for any Vendor for given Mfg?
	)


Select *
From MSRPItems
where BidHeaderId = 6848
--cWhere TotalAward = 1
Order By mfgName, productlineName, optionName, DiscountRate DESC


END
```
