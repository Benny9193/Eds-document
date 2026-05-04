# Function: scalar: `dbo.uf_lower`

_Generated on 2026-05-04T14:49:07.392Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_lower` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2001-08-24 14:40:45 |
| Encrypted | no |
| Returns | decimal(9,2) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@Value1` | IN | decimal(9,2) |  |
| 2 | `@Value2` | IN | decimal(9,2) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_SubmitRequisitionNew` | SQL_STORED_PROCEDURE |
| `dbo.vw_RequisitionsAccounts` | VIEW |

## Definition

```sql
CREATE FUNCTION uf_lower (@Value1 as decimal(9,2), @Value2 as decimal(9,2))  
RETURNS decimal(9,2) AS
BEGIN 
declare @RetVal decimal(9,2)

  if @Value1 < @Value2
    RETURN @Value1
  else
    RETURN @Value2

  RETURN @Value1
END
```
