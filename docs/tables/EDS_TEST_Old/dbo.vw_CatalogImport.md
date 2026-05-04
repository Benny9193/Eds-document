# View: `dbo.vw_CatalogImport`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogImportFieldId` | int | NO |  |  |
| 2 | `CatalogImportId` | int | NO |  |  |
| 3 | `SequenceId` | int | YES |  |  |
| 4 | `Name` | varchar(50) | NO |  |  |
| 5 | `Optional` | tinyint | YES |  |  |
| 6 | `rowguid` | uniqueidentifier | NO |  |  |
| 7 | `CatalogImportMapId` | int | YES |  |  |
| 8 | `CatalogId` | int | YES |  |  |
| 9 | `ImportIndex` | int | YES |  |  |
| 10 | `ImportRegExp` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CatalogImportFields` | USER_TABLE |
| `CatalogImportMap` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogImport] as
select CatalogImportFields.*, CatalogImportMap.CatalogImportMapId, CatalogImportMap.CatalogId, CatalogImportMap.ImportIndex, CatalogImportMap.ImportRegExp
  from CatalogImportFields with (nolock)
  left outer join CatalogImportMap on CatalogImportMap.CatalogImportFieldId = CatalogImportFields.CatalogImportFieldId
```
