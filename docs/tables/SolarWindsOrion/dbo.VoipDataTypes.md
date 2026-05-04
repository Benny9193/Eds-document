# Table: `dbo.VoipDataTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipDataTypeID` | smallint | NO |  | YES |
| 2 | `DataType` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationParameterTypes`](dbo.VoipOperationParameterTypes.md) | `VoipDataTypeID` | `VoipDataTypeID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
