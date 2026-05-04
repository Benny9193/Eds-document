# View: `dbo.vw_ScannedDocumentDataMSDSManufacturers`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ManufacturerName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.vw_ScannedDocumentDataMSDS`](dbo.vw_ScannedDocumentDataMSDS.md) | unresolved |
| [`EDS.dbo.vw_ScannedDocumentDataMSDS`](../EDS/dbo.vw_ScannedDocumentDataMSDS.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ScannedDocumentDataMSDSManufacturers] as
SELECT Cast(ManufacturerName as varchar(50)) ManufacturerName
FROM [EDS].[dbo].[vw_ScannedDocumentDataMSDS] with (nolock)
GROUP BY ManufacturerName
```
