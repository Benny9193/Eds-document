# View: `dbo.vw_DocumentTypes`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `Name` | varchar(255) | NO |  |  |
| 3 | `Description` | varchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_DocumentTypes as
select DocumentTypes.Id, DocumentTypes.Name, DocumentTypes.Description
  from DocumentTypes
 where DocumentTypes.deletedAt is null
```
