# Procedure: `null.sp_CoverView`

_Generated on 2026-05-04T13:04:00.216Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CoverView` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-01-09 15:10:55 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CoverView` | VIEW |  |
| `CoverViewSrc` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  Procedure EDSIQWebUser.sp_CoverView AS

drop table CoverView

select * 
  into CoverView 
  from CoverViewSrc

select *
  from CoverView
 order by DistrictId, SchoolId, UserId
```
