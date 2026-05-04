# View: `dbo.vw_RptExpireDateBidDocsAndMore`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorName` | varchar(50) | NO |  |  |
| 3 | `VendorCode` | varchar(16) | NO |  |  |
| 4 | `DocumentName` | varchar(50) | YES |  |  |
| 5 | `ExpirationDatePerDMS` | varchar(10) | YES |  |  |
| 6 | `ExpirationDatePerDocUpload` | varchar(10) | YES |  |  |
| 7 | `DocUploadStatus` | char(1) | NO |  |  |
| 8 | `ExpirationDateStatus` | varchar(46) | YES |  |  |
| 9 | `StatusCode` | int | YES |  |  |
| 10 | `EffectiveFrom` | date | YES |  |  |
| 11 | `EffectiveUntil` | date | YES |  |  |
| 12 | `DocInOtherBid` | varchar(10) | NO |  |  |
| 13 | `ExpirationDatePerOtherBid` | varchar(10) | NO |  |  |
| 14 | `DocumentUploadId` | int | YES |  |  |
| 15 | `DMSId` | uniqueidentifier | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_RptExpireDateBidDocs` | VIEW |
| [`dbo.vw_RptExpireDateBidDocs`](dbo.vw_RptExpireDateBidDocs.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_RptExpireDateBidDocsAndMore] as
SELECT RPT1.[BidHeaderId]
      ,RPT1.[VendorName]
      ,RPT1.[VendorCode]
      ,RPT1.[DocumentName]
      ,RPT1.[ExpirationDatePerDMS]
      ,RPT1.[ExpirationDatePerDocUpload]
      ,RPT1.[DocUploadStatus]
      ,RPT1.[ExpirationDateStatus]
      ,RPT1.[StatusCode]
      ,RPT1.[EffectiveFrom]
      ,RPT1.[EffectiveUntil]
	  ,ISNULL( CONVERT(VARCHAR(10),OtherBid.BidHeaderId), '' ) DocInOtherBid
	  ,ISNULL(OtherBid.ExpirationDatePerDMS,'') ExpirationDatePerOtherBid
      ,[DocumentUploadId]
      ,[DMSId]
  FROM [dbo].[vw_RptExpireDateBidDocs] RPT1
  OUTER APPLY 
  (select TOP 1  RPT2.BidHeaderId, RPT2.ExpirationDatePerDMS
	From vw_RptExpireDateBidDocs Rpt2
	where RPT2.VendorCode = RPT1.VendorCode 
	  and RPT2.DocumentName = RPT1.DocumentName 
      and RPT2.ExpirationDatePerDMS > RPT1.EffectiveFrom  
  --  and (RPT2.StatusCode=1 OR RPT2.StatusCode=6)  
  --  and RPT2.BidHeaderId != RPT1.BidHeaderId   
	order by RPT2.ExpirationDatePerDMS DESC, RPT2.BidHeaderId DESC 
   ) OtherBid
--  ORDER BY RPT1.VendorName, RPT1.BidHeaderId
```
