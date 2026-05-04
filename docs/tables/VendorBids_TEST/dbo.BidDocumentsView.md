# View: `dbo.BidDocumentsView`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentId` | int | NO |  |  |
| 2 | `CalendarId` | int | YES |  |  |
| 3 | `DisplaySeq` | int | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `DocumentName` | varchar(255) | YES |  |  |
| 6 | `DocumentType` | varchar(10) | YES |  |  |
| 7 | `documentbody` | varchar(8000) | YES |  |  |
| 8 | `VendorBidId` | int | YES |  |  |
| 9 | `SessionId` | int | NO |  |  |
| 10 | `AckDateTime` | datetime | YES |  |  |
| 11 | `Acknowledged` | tinyint | NO |  |  |
| 12 | `AckName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidDocumentAcks` | USER_TABLE |
| `dbo.BidDocumentAcks` | USER_TABLE |
| `dbo.BidDocuments` | USER_TABLE |
| `dbo.VendorBids` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_LogBidDocumentDownload` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE view [dbo].[BidDocumentsView] as
select BidDocuments.BidDocumentId, BidDocuments.CalendarId, BidDocuments.DisplaySeq, BidDocuments.Description, BidDocuments.DocumentName, BidDocuments.DocumentType, cast(BidDocuments.DocumentBody as varchar(8000)) as documentbody,
       VendorBids.VendorBidId, isnull(BidDocumentAcks.SessionId,0) as SessionId, isnull(BidDocumentAcks.AckDateTime,cast('01/01/1970' as datetime)) as AckDateTime, isnull(BidDocumentAcks.Acknowledged,0) Acknowledged, isnull(BidDocumentAcks.AckName,'') as AckName
  from dbo.BidDocuments
  left outer join dbo.VendorBids on VendorBids.CalendarId = BidDocuments.CalendarId
  left outer join dbo.BidDocumentAcks on BidDocumentAcks.BidDocumentAckId = 
     (select top 1 bda.BidDocumentAckId
        from BidDocumentAcks bda
       where bda.BidDocumentId = BidDocuments.BidDocumentId
         and bda.VendorBidId = VendorBids.VendorBidId
       order by bda.AckDateTime desc)
```
