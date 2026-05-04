# Procedure: `dbo.dt_getpropertiesbyid_vcs`

_Generated on 2026-05-04T13:07:58.706Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `dt_getpropertiesbyid_vcs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-07-19 15:20:41 |
| Modified | 2003-07-19 15:20:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@id` | IN | int |  |
| 2 | `@property` | IN | varchar(64) |  |
| 3 | `@value` | INOUT | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.dt_getpropertiesbyid_vcs
    @id       int,
    @property varchar(64),
    @value    varchar(255) = NULL OUT

as

    set nocount on

    select @value = (
        select value
                from dbo.dtproperties
                where @id=objectid and @property=property
                )
```
