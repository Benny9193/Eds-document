# Table: `dbo.Manufacturers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9007

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ManufacturerId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `Name` | varchar(100) | NO |  |  |
| 5 | `WebsiteLink` | varchar(255) | YES |  |  |
| 6 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 7 | `UseOptions` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
