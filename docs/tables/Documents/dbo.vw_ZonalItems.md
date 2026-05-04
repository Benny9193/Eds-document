# View: `dbo.vw_ZonalItems`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CaptureName` | varchar(50) | YES |  |  |
| 2 | `DocCategory` | varchar(255) | NO |  |  |
| 3 | `DocType` | varchar(255) | NO |  |  |
| 4 | `FieldId` | uniqueidentifier | NO |  |  |
| 5 | `TopLeftX` | float | YES |  |  |
| 6 | `TopLeftY` | float | YES |  |  |
| 7 | `TopRightX` | float | YES |  |  |
| 8 | `TopRightY` | float | YES |  |  |
| 9 | `BottomLeftX` | float | YES |  |  |
| 10 | `BottomLeftY` | float | YES |  |  |
| 11 | `BottomRightX` | float | YES |  |  |
| 12 | `BottomRightY` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypes` | USER_TABLE |
| `Fields` | USER_TABLE |
| `ZonalAreas` | USER_TABLE |
| `Zonals` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_ZonalItems as
select Zonals.ZonalName CaptureName, DocumentTypes.Name DocCategory, Fields.Name DocType, ZonalAreas.FieldId, 
       ZonalAreas.X TopLeftX, 
       ZonalAreas.Y TopLeftY, 
       ZonalAreas.X + ZonalAreas.Width TopRightX, 
       ZonalAreas.Y TopRightY, 
       ZonalAreas.X BottomLeftX, 
       ZonalAreas.Y + ZonalAreas.Height BottomLeftY,
       ZonalAreas.X + ZonalAreas.Width BottomRightX,
       ZonalAreas.Y + ZonalAreas.Height BottomRightY
  from ZonalAreas
  join Zonals on Zonals.Id = ZonalAreas.ZonalId
  join DocumentTypes on DocumentTypes.Id = Zonals.DocumentTypeId
  join Fields on Fields.Id = ZonalAreas.FieldId
```
