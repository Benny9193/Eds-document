# View: `dbo.ComposedLimitations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LimitationID` | int | NO |  |  |
| 2 | `LimitationTypeID` | int | YES |  |  |
| 3 | `Definition` | nvarchar(max) | YES |  |  |
| 4 | `WhereClause` | nvarchar(max) | YES |  |  |
| 5 | `IsSubLimitation` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ExpandedLimitations` | USER_TABLE |
| `Limitations` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view dbo.ComposedLimitations as

	SELECT LimitationID, LimitationTypeID, Definition, WhereClause, 0 as IsSubLimitation FROM Limitations
		
	UNION ALL
	
	SELECT e.LimitationID, 
		   e.LimitationTypeID, 
		   STUFF( (SELECT ':;' + l.Definition FROM ExpandedLimitations l WHERE e.LimitationID=l.LimitationID  AND e.LimitationTypeID = l.LimitationTypeID FOR XML PATH(''),TYPE).value('.', 'nvarchar(max)'), 1, 2, '') as Definition,
		   STUFF( (SELECT ' OR ' + l.WhereClause FROM ExpandedLimitations l WHERE e.LimitationID=l.LimitationID  AND e.LimitationTypeID = l.LimitationTypeID FOR XML PATH(''),TYPE).value('.', 'nvarchar(max)'), 1, 4, '') as WhereClause,
		   1 as IsSubLimitation	   
	FROM ExpandedLimitations e
		JOIN Limitations k ON e.LimitationID = k. LimitationID
	GROUP By e.LimitationID, e.LimitationTypeID
```
