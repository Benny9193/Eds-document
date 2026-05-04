# Procedure: `dbo.sp_VendorBiditemsViewReport`

_Generated on 2026-05-04T13:43:22.353Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorBiditemsViewReport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-27 02:48:09 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@strPassPhrase` | IN | varchar(255) |  |
| 2 | `@BidNumber` | IN | int |  |
| 3 | `@ReportType` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_VendorBiditemsView` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure [dbo].[sp_VendorBiditemsViewReport] @strPassPhrase varchar(255), @BidNumber int, @ReportType varchar(50)
as
if @ReportType = 'Submission' or @ReportType = 'Bid Only'
  select * from dbo.uf_VendorBiditemsView(@strPassPhrase,@BidNumber) where Itemhasbeenbid = 1 order by sortseq
else
if @ReportType = 'ByDistrict'
  select * from dbo.uf_VendorBiditemsView(@strPassPhrase,@BidNumber) order by Districtname, sortseq
else
  select * from dbo.uf_VendorBiditemsView(@strPassPhrase,@BidNumber) order by sortseq
```
