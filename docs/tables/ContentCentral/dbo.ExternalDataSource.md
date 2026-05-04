# Table: `dbo.ExternalDataSource`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO | `('')` |  |
| 3 | `Description` | nvarchar(128) | NO | `('')` |  |
| 4 | `DataSourceType` | nvarchar(50) | NO | `('')` |  |
| 5 | `OdbcDsn` | nvarchar(50) | NO | `('')` |  |
| 6 | `OdbcUsername` | nvarchar(50) | NO | `('')` |  |
| 7 | `OdbcPassword` | nvarchar(256) | NO | `('')` |  |
| 8 | `UseBracketedConnectionString` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocTypeFieldExternalLookup`](dbo.DocTypeFieldExternalLookup.md) | `ExternalDataSourceId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ExternalDataSource_Name` | YES | NONCLUSTERED | `Name` |  |
