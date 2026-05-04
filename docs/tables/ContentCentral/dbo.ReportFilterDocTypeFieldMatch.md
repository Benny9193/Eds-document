# Table: `dbo.ReportFilterDocTypeFieldMatch`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ReportFilterDocTypeFieldId` | uniqueidentifier | NO |  |  |
| 3 | `MatchType` | nvarchar(50) | NO | `('')` |  |
| 4 | `MatchValue` | nvarchar(560) | NO | `('')` |  |
| 5 | `MatchValue2` | nvarchar(560) | YES | `('')` |  |
| 6 | `ItemOrder` | int | NO | `((1))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ReportFilterDocTypeFieldMatch_ReportFilterDocTypeField` | `ReportFilterDocTypeFieldId` | [`dbo.ReportFilterDocTypeField.Id`](dbo.ReportFilterDocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ReportFilterDocTypeFieldMatch_ReportFilterDocTypeFieldId` | no | NONCLUSTERED | `ReportFilterDocTypeFieldId` |  |
