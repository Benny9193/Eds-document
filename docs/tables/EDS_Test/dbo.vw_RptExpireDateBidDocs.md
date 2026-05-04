# View: `dbo.vw_RptExpireDateBidDocs`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorName` | varchar(50) | YES |  |  |
| 3 | `VendorCode` | varchar(16) | NO |  |  |
| 4 | `DocumentName` | varchar(50) | YES |  |  |
| 5 | `ExpirationDatePerDMS` | varchar(10) | YES |  |  |
| 6 | `ExpirationDatePerDocUpload` | varchar(10) | YES |  |  |
| 7 | `DocUploadStatus` | char(1) | NO |  |  |
| 8 | `ExpirationDateStatus` | varchar(46) | YES |  |  |
| 9 | `StatusCode` | int | YES |  |  |
| 10 | `EffectiveFrom` | date | YES |  |  |
| 11 | `EffectiveUntil` | date | YES |  |  |
| 12 | `DocumentUploadId` | int | YES |  |  |
| 13 | `DMSId` | uniqueidentifier | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DMSVendorBidDocuments` | USER_TABLE |
| [`dbo.BidderCheckList`](dbo.BidderCheckList.md) | USER_TABLE |
| [`dbo.BidHeaderCheckList`](dbo.BidHeaderCheckList.md) | USER_TABLE |
| [`dbo.vw_AwardedVendorsAllCurrentAndFutureBids`](dbo.vw_AwardedVendorsAllCurrentAndFutureBids.md) | unresolved |
| `dbo.vw_DocumentUploads` | unresolved |
| [`EDS.dbo.vw_AwardedVendorsAllCurrentAndFutureBids`](../EDS/dbo.vw_AwardedVendorsAllCurrentAndFutureBids.md) | cross-database |
| [`VendorBids.dbo.vw_DocumentUploads`](../VendorBids/dbo.vw_DocumentUploads.md) | cross-database |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RptExpireDateBidDocsAndMore`](dbo.vw_RptExpireDateBidDocsAndMore.md) | VIEW |

## Definition

```sql
/****** Script for SelectTopNRows command from SSMS  ******/
CREATE view [dbo].[vw_RptExpireDateBidDocs] as
SELECT AV.BidHeaderId, AV.VendorName, AV.VendorCode, BCL.DocumentName, -- DMS.ExpirationDate, 
       --case when isnull(DMS.ExpirationDate,'')='' THEN NULL ELSE convert(datetime,DMS.ExpirationDate) END ExpirationDatePerDMS, 
       case when isnull(DMS.ExpirationDate,'')='' THEN '' ELSE CONVERT(varchar(10), convert(date,DMS.ExpirationDate)) END ExpirationDatePerDMS, 
	   --DU.ExpirationDate ExpirationDatePerDocUpload,
       case when isnull(DU.ExpirationDate,'')='' THEN '' ELSE CONVERT(varchar(10), convert(date,DU.ExpirationDate)) END ExpirationDatePerDocUpload, 
	   Isnull(DU.Status,'') DocUploadStatus,  -- A = Accepted, R = Rejected, F = On-File, U = Undetermined
	   case 
	   when DMS.Id IS NULL then 
	     case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 'Doc Missing in DMS but Accepted in bid upload' else 'Doc Missing in DMS' end 
	   when case when DMS.ExpirationDate='' THEN NULL ELSE CONVERT(DateTime, DMS.ExpirationDate) END is null then 
	     case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 'Missing Date in DMS but Accepted in bid upload' else 'Missing Date in DMS' end 
	   else 
	     case 
		 when CONVERT(DateTime, DMS.ExpirationDate) between AV.EffectiveFrom and AV.EffectiveUntil then 'Date Expires during bid'
		 when CONVERT(DateTime, DMS.ExpirationDate) < AV.EffectiveFrom then 'Date Expires before bid effective'
		 when CONVERT(DateTime, DMS.ExpirationDate) > AV.EffectiveUntil then 'Expiration Date Good'
		 end 
	   end ExpirationDateStatus,
	   case 
	   when DMS.Id IS NULL then 
	     --case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 'Doc Missing in DMS but Accepted in bid upload' else 'Doc Missing in DMS' end 
	     case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 3 else 2 end 
	   when case when DMS.ExpirationDate='' THEN NULL ELSE CONVERT(DateTime, DMS.ExpirationDate) END is null then 
	     --case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 'Missing Date in DMS but Accepted in bid upload' else 'Missing Date in DMS' end 
	     case when DU.ExpirationDate is not null and isnull(DU.Status,'') = 'A' then 5 else 4 end 
	   else 
	     case 
		 --when CONVERT(DateTime, DMS.ExpirationDate) between AV.EffectiveFrom and AV.EffectiveUntil then 'Date Expires during bid'
		 when CONVERT(DateTime, DMS.ExpirationDate) between AV.EffectiveFrom and AV.EffectiveUntil then 6
		 --when CONVERT(DateTime, DMS.ExpirationDate) < AV.EffectiveFrom then 'Date Expires before bid effective'
		 when CONVERT(DateTime, DMS.ExpirationDate) < AV.EffectiveFrom then 7
		 --when CONVERT(DateTime, DMS.ExpirationDate) > AV.EffectiveUntil then 'Expiration Date Good'
		 when CONVERT(DateTime, DMS.ExpirationDate) > AV.EffectiveUntil then 1
		 end 
	   end StatusCode,
	   Convert(Date,AV.EffectiveFrom) EffectiveFrom, Convert(Date,AV.EffectiveUntil) EffectiveUntil,
	   DU.DocumentUploadId, DMS.Id DMSId
FROM [EDS].[dbo].[vw_AwardedVendorsAllCurrentAndFutureBids] AV
JOIN dbo.BidHeaderCheckList BHCL ON BHCL.BidHeaderId = AV.BidHeaderId 
JOIN dbo.BidderCheckList BCL ON BCL.BidderCheckListId = BHCL.BidderCheckListId
LEFT JOIN VendorBids.dbo.vw_DocumentUploads DU ON DU.BidId=AV.BidHeaderId and DU.VendorCode=AV.VendorCode and DU.BidderCheckListId=BCL.BidderCheckListId
LEFT JOIN DMSVendorBidDocuments DMS ON DMS.BidHeaderId = AV.BidHeaderId AND DMS.VendorCode = AV.VendorCode AND DMS.DocType = BCL.DocumentName
where BCL.ExpirationDateReqd=1
--order by AV.VendorCode, BCL.DocumentName, AV.BidHeaderId
```
