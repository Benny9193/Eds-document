# View: `dbo.Vendors`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | nvarchar(100) | NO |  |  |
| 2 | `Icon` | nvarchar(104) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.SWISysObjects`](dbo.SWISysObjects.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[Vendors] AS
	SELECT [Vendor] as Name, cast(MIN([EnterpriseID]) as nvarchar(100)) + '.gif' as Icon
	FROM [dbo].[SWISysObjects]
	WHERE [ObjectID] LIKE '1.3.6.1.4.1.%' 
	AND LEN([ObjectID]) - LEN(REPLACE([ObjectID], '.', '')) = 7 -- ObjectID with exactly seven '.' is name of vendor
	GROUP BY [Vendor]
```
