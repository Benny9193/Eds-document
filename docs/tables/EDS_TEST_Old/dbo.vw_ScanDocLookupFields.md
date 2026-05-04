# View: `dbo.vw_ScanDocLookupFields`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ScanJobId` | int | NO |  |  |
| 2 | `DocTypeFieldExternalLookupId` | uniqueidentifier | NO |  |  |
| 3 | `ExternalTableName` | nvarchar(128) | NO |  |  |
| 4 | `ItemOrder` | int | NO |  |  |
| 5 | `DocTypeFieldExternalLookupItemId` | uniqueidentifier | NO |  |  |
| 6 | `Type` | nvarchar(50) | NO |  |  |
| 7 | `DocTypeFieldExternalLookupItemOrder` | int | NO |  |  |
| 8 | `Name` | nvarchar(50) | NO |  |  |
| 9 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Catalog`](dbo.Catalog.md) | unresolved |
| `dbo.DocType` | unresolved |
| `dbo.DocTypeField` | unresolved |
| `dbo.DocTypeFieldExternalLookup` | unresolved |
| `dbo.DocTypeFieldExternalLookupItem` | unresolved |
| [`dbo.ScanJobs`](dbo.ScanJobs.md) | USER_TABLE |
| [`ContentCentral.dbo.Catalog`](../ContentCentral/dbo.Catalog.md) | cross-database |
| [`ContentCentral.dbo.DocType`](../ContentCentral/dbo.DocType.md) | cross-database |
| [`ContentCentral.dbo.DocTypeField`](../ContentCentral/dbo.DocTypeField.md) | cross-database |
| [`ContentCentral.dbo.DocTypeFieldExternalLookup`](../ContentCentral/dbo.DocTypeFieldExternalLookup.md) | cross-database |
| [`ContentCentral.dbo.DocTypeFieldExternalLookupItem`](../ContentCentral/dbo.DocTypeFieldExternalLookupItem.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ScanDocLookupFields] as
select sj.ScanJobId, DocTypeFieldExternalLookup.Id DocTypeFieldExternalLookupId, DocTypeFieldExternalLookup.ExternalTableName, DocTypeFieldExternalLookup.ItemOrder, DocTypeFieldExternalLookupItem.Id DocTypeFieldExternalLookupItemId, DocTypeFieldExternalLookupItem.Type, DocTypeFieldExternalLookupItem.ItemOrder DocTypeFieldExternalLookupItemOrder,DocTypeField.Name, DocTypeField.Id DocTypeFieldId
  from ContentCentral.dbo.DocType DocType
  join ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup.DocTypeId = DocType.Id
  join ContentCentral.dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem on DocTypeFieldExternalLookupItem.DocTypeFieldExternalLookupId = DocTypeFieldExternalLookup.Id
  join ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField.Id = DocTypeFieldExternalLookupItem.DocTypeFieldId
  join ContentCentral.dbo.Catalog Catalog on Catalog.Id = DocType.CatalogId
  join dbo.ScanJobs sj on sj.CatalogName = Catalog.Name
                          and sj.CabinetName = DocType.Name
 where DocTypeFieldExternalLookup.Enabled = 1
```
