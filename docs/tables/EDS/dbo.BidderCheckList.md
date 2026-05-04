# Table: `dbo.BidderCheckList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 140

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidderCheckListId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CheckListText` | varchar(100) | YES |  |  |
| 4 | `AdditionalInfoRTF` | varchar(1000) | YES |  |  |
| 5 | `AdditionalInfoRTFText` | varchar(1000) | YES |  |  |
| 6 | `DocumentName` | varchar(50) | YES |  |  |
| 7 | `OptionalDocument` | tinyint | YES |  |  |
| 8 | `OnFileEligible` | tinyint | YES |  |  |
| 9 | `UploadEligible` | tinyint | YES |  |  |
| 10 | `DocumentTypeId` | int | YES |  |  |
| 11 | `ExpirationDateReqd` | tinyint | YES |  |  |
| 12 | `DocNumberReqd` | tinyint | YES |  |  |
| 13 | `DocNumberLabel` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_DocumentTypeBidderCheckListId` | no | NONCLUSTERED | `DocumentTypeId`, `BidderCheckListId` |  |
