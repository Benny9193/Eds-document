# Table: `dbo.DocumentRetentionPolicy`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentId` | uniqueidentifier | NO |  | YES |
| 2 | `DomainUserName` | nvarchar(50) | NO | `('')` |  |
| 3 | `Disabled` | bit | NO | `((0))` |  |
| 4 | `PeriodBase` | decimal(8,4) | NO | `((1))` |  |
| 5 | `PeriodMultiplier` | int | NO | `((1))` |  |
| 6 | `PeriodDescription` | nvarchar(50) | NO | `('')` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentRetentionPolicy_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
