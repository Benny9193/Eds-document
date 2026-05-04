# Table: `dbo.DocTypeFieldExternalLookup`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ExternalDataSourceId` | uniqueidentifier | NO |  |  |
| 3 | `ExternalTableSchema` | nvarchar(128) | YES | `(NULL)` |  |
| 4 | `ExternalTableName` | nvarchar(128) | NO | `('')` |  |
| 5 | `Enabled` | bit | NO | `((0))` |  |
| 6 | `ItemOrder` | int | NO | `((0))` |  |
| 7 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 8 | `OverwriteFieldData` | bit | NO | `((0))` |  |
| 9 | `MaxResults` | int | NO | `((0))` |  |
| 10 | `WorkflowOnly` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldExternalLookup_DocType` | `DocTypeId` | [`dbo.DocType.Id`](dbo.DocType.md) | CASCADE | CASCADE |
| `FK_DocTypeFieldExternalLookup_ExternalDataSource` | `ExternalDataSourceId` | [`dbo.ExternalDataSource.Id`](dbo.ExternalDataSource.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocTypeFieldExternalLookupItem`](dbo.DocTypeFieldExternalLookupItem.md) | `DocTypeFieldExternalLookupId` | `Id` | CASCADE | CASCADE |
| [`dbo.DocTypeFieldExternalLookupSelectItem`](dbo.DocTypeFieldExternalLookupSelectItem.md) | `DocTypeFieldExternalLookupId` | `Id` | CASCADE | CASCADE |
| [`dbo.WorkflowAction`](dbo.WorkflowAction.md) | `DocTypeFieldExternalLookupId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldExternalLookup_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
| `IX_DocTypeFieldExternalLookup_ExternalDataSourceId` | no | NONCLUSTERED | `ExternalDataSourceId` |  |
