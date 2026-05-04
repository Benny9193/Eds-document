# Table: `dbo.LogEntry`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 354089

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |
| 4 | `DomainUserName` | nvarchar(50) | NO | `('')` |  |
| 5 | `IPAddress` | nvarchar(39) | NO | `('')` |  |
| 6 | `Action` | nvarchar(50) | NO | `('')` |  |
| 7 | `DocumentPath` | nvarchar(max) | NO | `('')` |  |
| 8 | `LoginStatus` | nvarchar(7) | YES | `(NULL)` |  |
| 9 | `SearchCatalogs` | nvarchar(max) | NO | `('')` |  |
| 10 | `SearchString` | nvarchar(max) | NO | `('')` |  |
| 11 | `EmailRcpt` | nvarchar(max) | NO | `('')` |  |
| 12 | `EmailSubj` | nvarchar(max) | NO | `('')` |  |
| 13 | `EmailBody` | nvarchar(max) | NO | `('')` |  |
| 14 | `QCardId` | int | NO | `((0))` |  |
| 15 | `CodingTime` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_LogEntry_DomainUserName_Action` | no | NONCLUSTERED | `DomainUserName`, `Action` |  |
