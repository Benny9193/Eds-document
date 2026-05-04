# Table: `dbo.DocumentUploads`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 133029

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentUploadId` | int | NO |  | YES |
| 2 | `UserCode` | varchar(50) | NO |  |  |
| 3 | `BidId` | int | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `VendorCode` | varchar(50) | NO |  |  |
| 6 | `BidderCheckListId` | int | YES |  |  |
| 7 | `DocumentTypeId` | int | YES |  |  |
| 8 | `ExpirationDate` | datetime | YES |  |  |
| 9 | `DocumentNumber` | varchar(50) | YES |  |  |
| 10 | `ClientFileName` | varchar(1024) | YES |  |  |
| 11 | `ClientFileDateTime` | datetime | YES |  |  |
| 12 | `Status` | char(1) | YES |  |  |
| 13 | `Comments` | varchar(1024) | YES |  |  |
| 14 | `CreatedAt` | datetime | YES | `(CONVERT([datetime2](2),getdate()))` |  |
| 15 | `UpdatedAt` | datetime | YES |  |  |
| 16 | `DeletedAt` | datetime | YES |  |  |
| 17 | `FileData` | varbinary(max) | YES |  |  |
| 18 | `Id` | uniqueidentifier | NO | `(newid())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidVendorBidderCheckListId_CreatedDocId` | no | NONCLUSTERED | `BidId`, `VendorId`, `BidderCheckListId` | `CreatedAt`, `DocumentUploadId` |
| `SKI_StatusBid_Id` | no | NONCLUSTERED | `Status`, `BidId` | `DocumentUploadId` |
