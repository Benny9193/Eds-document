# Function: inline table-valued: `dbo.uf_vendorbidanswersview`

_Generated on 2026-05-04T13:43:22.356Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_vendorbidanswersview` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2012-01-17 12:57:30 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@passPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorBids` | USER_TABLE |  |
| `VendorBidsJournal` | USER_TABLE |  |
| `vendorbidTMAnswers` | USER_TABLE |  |
| `VendorBidTMAnswersJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_vendorbidanswersview] (@passPhrase varchar(255), @VendorBidId int)
returns table as
return (select vba.vendorbidTMAnswerId, 
               vb.vendorbidid, 
               isnull(vbaj.vendorBidTMAnswerJournalId,0) as vendorBidTMAnswerJournalId, 
               vba.BidQuestionId,
               vba.CountyId,
               vba.BidTradeId,
               vbaj.SessionId,
               vbaj.datemodified,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbaj.BidAnswer, 1, cast(vb.vendorbidid as varbinary)) as varchar(512)),'') as BidAnswer, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbaj.BidAnswerExtended, 1, cast(vb.vendorbidid as varbinary)) as varchar(512)),'') as BidAnswerExtended
  from vendorbidTMAnswers as vba
  join VendorBids vb on vb.VendorBidId = vba.VendorBidId
                    and vb.VendorBidId = @VendorBidId
  left outer join VendorBidTMAnswersJournal as vbaj on vbaj.VendorBidTMAnswerJournalId = 
    (select top 1 VendorBidTMAnswersJournal.VendorBidTMAnswerJournalId 
       from VendorBidTMAnswersJournal
      where VendorBidTMAnswersJournal.vendorbidTMAnswerid = vba.vendorbidTMAnswerId
      order by VendorBidTMAnswersJournal.VendorBidTMAnswerJournalId desc)
  left outer join VendorBidsJournal vbj on vbj.vbjid =
    (select top 1 vendorbidsjournal.vbjid
       from vendorbidsjournal
      where vendorbidsjournal.vendorbidid = vb.vendorbidid
      order by vendorbidsjournal.vbjid desc)
 )
```
