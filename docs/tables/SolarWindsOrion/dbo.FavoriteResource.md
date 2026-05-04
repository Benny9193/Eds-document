# Table: `dbo.FavoriteResource`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FavoriteResourceID` | int | NO |  | YES |
| 2 | `AccountID` | nvarchar(100) | NO |  |  |
| 3 | `ResourcePath` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_FavoriteResource_Accounts` | `AccountID` | [`dbo.Accounts.AccountID`](dbo.Accounts.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_FavoriteResource` | YES | CLUSTERED | `AccountID`, `ResourcePath` |  |
