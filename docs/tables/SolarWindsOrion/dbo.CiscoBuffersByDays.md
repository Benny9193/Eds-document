# View: `dbo.CiscoBuffersByDays`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `BufferNoMem` | int | YES |  |  |
| 4 | `BufferSmMiss` | int | YES |  |  |
| 5 | `BufferMdMiss` | int | YES |  |  |
| 6 | `BufferBgMiss` | int | YES |  |  |
| 7 | `BufferLgMiss` | int | YES |  |  |
| 8 | `BufferHgMiss` | int | YES |  |  |
| 9 | `Archive` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CiscoBuffers`](dbo.CiscoBuffers.md) | VIEW |
| `dbo.DateOnly` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.CiscoBuffersByDays AS
	SELECT	NodeID, dbo.DateOnly(DateTime) AS DateTime, 
			SUM(BufferNoMem) AS BufferNoMem, 
			SUM(BufferSmMiss) AS BufferSmMiss, 
			SUM(BufferMdMiss) AS BufferMdMiss, 
			SUM(BufferBgMiss) AS BufferBgMiss, 
			SUM(BufferLgMiss) AS BufferLgMiss, 
			SUM(BufferHgMiss) AS BufferHgMiss, 
			2 AS Archive
	FROM dbo.CiscoBuffers
	GROUP BY NodeID, dbo.DateOnly(DateTime)
```
