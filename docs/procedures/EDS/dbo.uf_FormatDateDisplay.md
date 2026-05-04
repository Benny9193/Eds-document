# Function: scalar: `dbo.uf_FormatDateDisplay`

_Generated on 2026-05-04T13:04:00.553Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FormatDateDisplay` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2024-02-06 15:19:21 |
| Modified | 2024-02-06 15:19:21 |
| Encrypted | no |
| Returns | varchar(10) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@inputDate` | IN | datetime |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
create FUNCTION [dbo].[uf_FormatDateDisplay]
( @inputDate AS DATETIME
)
    RETURNS VARCHAR(10)
AS
BEGIN
    -- routine body goes here, e.g.
    -- SELECT 'Navicat for SQL Server'


    IF @inputDate IS NULL OR @inputDate = ''
        BEGIN
            RETURN '';
        END

    DECLARE @outputValue VARCHAR(10);

    SET @outputValue = FORMAT(@inputDate, 'MM/dd/yyyy');

    RETURN @outputValue;
END
```
