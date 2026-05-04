# Table: `dbo.MimeType`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 202

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Extension` | nvarchar(50) | NO | `('')` | YES |
| 2 | `Type` | nvarchar(50) | NO | `('')` |  |
| 3 | `SubType` | nvarchar(150) | NO | `('')` |  |
| 4 | `Description` | nvarchar(128) | NO | `('')` |  |
| 5 | `UseOctetStreamInstead` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
