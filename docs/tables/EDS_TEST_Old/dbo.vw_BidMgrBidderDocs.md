# View: `dbo.vw_BidMgrBidderDocs`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 5 | `BidHeaderCheckListId` | int | NO |  |  |
| 6 | `BidderCheckListId` | int | YES |  |  |
| 7 | `DocumentUploadId` | int | YES |  |  |
| 8 | `VendorCode` | varchar(16) | YES |  |  |
| 9 | `VendorName` | varchar(50) | YES |  |  |
| 10 | `DisplaySequence` | int | YES |  |  |
| 11 | `DocumentName` | varchar(50) | YES |  |  |
| 12 | `CheckListText` | varchar(100) | YES |  |  |
| 13 | `UploadEligible` | tinyint | NO |  |  |
| 14 | `UploadEligibleStr` | varchar(3) | NO |  |  |
| 15 | `VendorUploadDateTime` | datetime2 | YES |  |  |
| 16 | `DocumentNumber` | varchar(255) | YES |  |  |
| 17 | `DocumentExpiration` | datetime | YES |  |  |
| 18 | `DocStatus` | char(1) | NO |  |  |
| 19 | `StatusStr` | varchar(9) | NO |  |  |
| 20 | `DocRejectReasonComments` | varchar(1024) | NO |  |  |
| 21 | `InDMS` | int | NO |  |  |
| 22 | `InDmsStr` | varchar(12) | NO |  |  |
| 23 | `DocumentTypeId` | int | YES |  |  |
| 24 | `ExpirationDateReqd` | tinyint | NO |  |  |
| 25 | `DocNumberReqd` | tinyint | NO |  |  |
| 26 | `DocNumberLabel` | varchar(50) | YES |  |  |
| 27 | `OptionalDocument` | tinyint | YES |  |  |
| 28 | `DMSCountOfDocType` | int | YES |  |  |
| 29 | `BidDocsCountOfDocType` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidderCheckList`](dbo.BidderCheckList.md) | USER_TABLE |
| [`dbo.BidHeaderCheckList`](dbo.BidHeaderCheckList.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.DMSVendorBidDocuments`](dbo.DMSVendorBidDocuments.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |
| `dbo.vw_DocumentUploads` | unresolved |
| [`VendorBids.dbo.vw_DocumentUploads`](../VendorBids/dbo.vw_DocumentUploads.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_BidMgrBidderDocs]
AS

Select BI.BidHeaderId, BI.BidImportId, BI.VendorId, BI.VendorBidNumber, BHCL.BidHeaderCheckListId, BHCL.BidderCheckListId, vwDU.DocumentUploadId, 
       V.Code VendorCode, V.Name VendorName, 
	   BHCL.DisplaySequence, BCL.DocumentName, BCL.CheckListText, 
	   Isnull(BCL.UploadEligible,0) UploadEligible, Case When Isnull(BCL.UploadEligible,0)=0 Then 'No' Else 'Yes' End UploadEligibleStr,
	   CAST(vwDU.CreatedAt AS DATETIME2(2)) VendorUploadDateTime, 
	   
	   -- Isnull(vwDU.DocumentNumber,'') DocumentNumber, 
	   -- if dms document found and 1-to-1 relation, use dms as the master for document number
	   Case 
	   When DMS.CountOfDocType = 1 and BidDocs.CountOfDocType = 1 
	   Then 
	     (Select IsNull(DMS.DocumentNumber,'')  
          From dbo.DMSVendorBidDocuments DMS 
		  Where DMS.BidHeaderId = BI.BidHeaderId AND DMS.VendorCode = V.Code AND DMS.DocType = BCL.DocumentName   
		 )
	   Else 
	     Isnull(vwDU.DocumentNumber,'')
	   End DocumentNumber,

	   -- vwDU.ExpirationDate DocumentExpiration,
	   -- if dms document found and 1-to-1 relation, use dms as the master for expiration date
	   Case 
	   When DMS.CountOfDocType = 1 and BidDocs.CountOfDocType = 1 
	   Then 
	     (Select Case When ISNULL(DMS.ExpirationDate,'')!='' Then Cast(DMS.ExpirationDate as datetime) Else Null End 
          From dbo.DMSVendorBidDocuments DMS 
		  Where DMS.BidHeaderId = BI.BidHeaderId AND DMS.VendorCode = V.Code AND DMS.DocType = BCL.DocumentName 
		 )
	   Else 
	     vwDU.ExpirationDate
	   End DocumentExpiration,

       Isnull(vwDU.Status,'') DocStatus, Case Isnull(vwDU.Status,'') When 'A' Then 'Accepted' When 'R' Then 'Rejected' When 'U' Then 'Undecided' Else '' End StatusStr,
	   Isnull(vwDU.Comments,'') DocRejectReasonComments,
	   Case When DMS.CountOfDocType = BidDocs.CountOfDocType Then 1 Else 0 End InDMS,
	   Case 
	   When DMS.CountOfDocType = 0 Then 'No'
	   When DMS.CountOfDocType = BidDocs.CountOfDocType Then 'Yes' 
	   Else 'Undetermined' 
	   End InDmsStr,
	   BCL.DocumentTypeId,
	   isnull(BCL.ExpirationDateReqd,0) ExpirationDateReqd,
	   isnull(BCL.DocNumberReqd,0) DocNumberReqd,
	   BCL.DocNumberLabel,
	   BCL.OptionalDocument,
	   DMS.CountOfDocType DMSCountOfDocType,
	   BidDocs.CountOfDocType BidDocsCountOfDocType
FROM dbo.BidImports BI
JOIN dbo.Vendors V ON V.VendorId=BI.VendorId 
JOIN dbo.BidHeaderCheckList BHCL ON BHCL.BidHeaderId = BI.BidHeaderId 
JOIN dbo.BidderCheckList BCL ON BCL.BidderCheckListId = BHCL.BidderCheckListId
LEFT JOIN VendorBids.dbo.vw_DocumentUploads vwDU ON vwDU.BidId = BI.BidHeaderId AND vwDU.VendorId = BI.VendorId AND vwDU.BidderCheckListId = BHCL.BidderCheckListId
Outer Apply 
(
Select Count(*) CountOfDocType From dbo.DMSVendorBidDocuments DMS Where BidHeaderId = BI.BidHeaderId AND VendorCode = V.Code AND DMS.DocType = BCL.DocumentName
) DMS
Outer Apply
(
Select Count(*) CountOfDocType 
FROM dbo.BidHeaderCheckList BHCL2  
JOIN dbo.BidderCheckList BCL2 ON BCL2.BidderCheckListId = BHCL2.BidderCheckListId
WHERE BHCL2.BidHeaderId=BI.BidHeaderId AND BCL2.DocumentTypeId=BCL.DocumentTypeId
) BidDocs
WHERE Isnull(BI.Active,0)=1
-- and BI.BidHeaderId = 10440 and BI.BidImportId = 82114  -- sample for testing
```
