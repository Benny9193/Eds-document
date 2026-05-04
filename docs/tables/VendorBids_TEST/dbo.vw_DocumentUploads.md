# View: `dbo.vw_DocumentUploads`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentUploadId` | int | NO |  |  |
| 2 | `UserCode` | varchar(50) | NO |  |  |
| 3 | `BidId` | int | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `VendorCode` | varchar(50) | NO |  |  |
| 6 | `BidderCheckListId` | int | YES |  |  |
| 7 | `DocumentTypeId` | int | YES |  |  |
| 8 | `ExpirationDate` | datetime | YES |  |  |
| 9 | `DocumentNumber` | varchar(50) | YES |  |  |
| 10 | `ClientFileName` | varchar(1024) | YES |  |  |
| 11 | `ClientFileDateTime` | datetime2 | YES |  |  |
| 12 | `Status` | char(1) | YES |  |  |
| 13 | `Comments` | varchar(1024) | YES |  |  |
| 14 | `CreatedAt` | datetime | YES |  |  |
| 15 | `UpdatedAt` | datetime | YES |  |  |
| 16 | `DeletedAt` | datetime | YES |  |  |
| 17 | `Id` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.DocumentUploads`](dbo.DocumentUploads.md) | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[vw_DocumentUploads] AS 

SELECT [DocumentUploadId]
      ,[UserCode]
      ,[BidId]
      ,[VendorId]
      ,[VendorCode]
      ,[BidderCheckListId]
      ,[DocumentTypeId]
      ,[ExpirationDate]
      ,[DocumentNumber]
      ,[ClientFileName]
      ,CAST( ClientFileDateTime AS DATETIME2(2)) [ClientFileDateTime]
      ,[Status]
      ,[Comments]
      ,[CreatedAt]
      ,[UpdatedAt]
      ,[DeletedAt]
      ,[Id]
  FROM [VendorBids].[dbo].[DocumentUploads] A
  where -- Isnull(A.Status,'')!='F' and   -- changed 7/30/2021 kjm
   A.DocumentUploadId in
  (Select Top 1 Newest.DocumentUploadId
   from [VendorBids].[dbo].[DocumentUploads] Newest
   where  -- Isnull(Newest.Status,'')!='F' and   -- changed 7/30/2021 kjm
         Newest.VendorId = A.VendorId 
     and Newest.BidderCheckListId = A.BidderCheckListId 
	 and Newest.BidId = A.BidId
   order by Newest.CreatedAt Desc
   )
```
