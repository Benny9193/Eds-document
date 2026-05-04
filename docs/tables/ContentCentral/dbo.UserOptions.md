# Table: `dbo.UserOptions`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | uniqueidentifier | NO |  | YES |
| 2 | `SendCopyToEmail` | bit | NO | `((0))` |  |
| 3 | `NotifyApprovalQueue` | bit | NO | `((0))` |  |
| 4 | `NotifyWorkQueue` | bit | NO | `((0))` |  |
| 5 | `NotifyZonalRecognition` | bit | NO | `((0))` |  |
| 6 | `NotifyUnprocessed` | bit | NO | `((0))` |  |
| 7 | `AutoOpenFirstDoc` | bit | NO | `((0))` |  |
| 8 | `DoubleClickOpen` | bit | NO | `((0))` |  |
| 9 | `AutoPrintQCard` | nvarchar(50) | NO | `('')` |  |
| 10 | `Language` | nvarchar(50) | YES |  |  |
| 11 | `XmlKeyValuePairs` | nvarchar(max) | YES |  |  |
| 12 | `RefreshGridOnDocPropChange` | bit | NO | `((0))` |  |
| 13 | `DisablePDFStreaming` | bit | NO | `((0))` |  |
| 14 | `DefaultCaptureCatalogId` | uniqueidentifier | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UserOptions_DefaultCaptureCatalogId` | `DefaultCaptureCatalogId` | [`dbo.Catalog.Id`](dbo.Catalog.md) | NO_ACTION | NO_ACTION |
| `FK_UserOptions_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_UserOptions_DefaultCaptureCatalogId` | no | NONCLUSTERED | `DefaultCaptureCatalogId` |  |
