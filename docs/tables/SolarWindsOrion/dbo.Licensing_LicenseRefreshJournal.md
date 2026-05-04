# Table: `dbo.Licensing_LicenseRefreshJournal`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8323

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `CreatedOnUtc` | datetime | NO |  |  |
| 3 | `OrionServerId` | int | NO |  |  |
| 4 | `Success` | bit | NO |  |  |
| 5 | `Transitioned` | bit | NO |  |  |
| 6 | `LoggedEvent` | bit | NO |  |  |
| 7 | `Message` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Licensing_LicenseRefreshJournal` | no | NONCLUSTERED | `CreatedOnUtc`, `OrionServerId`, `Success`, `Transitioned`, `LoggedEvent` |  |
