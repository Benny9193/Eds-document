# Procedure: `dbo.sp_VendorBidsView`

_Generated on 2026-05-04T14:49:11.348Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VendorBidsView` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-24 16:45:19 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@strPassPhrase` | IN | varchar(255) |  |
| 2 | `@BidNumber` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_VendorBidsView` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_VendorBidsView] @strPassPhrase varchar(255), @BidNumber int
as
select *
  from dbo.uf_VendorBidsView(@strPassPhrase,@BidNumber) vbv
```
