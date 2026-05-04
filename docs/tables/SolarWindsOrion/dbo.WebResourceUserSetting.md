# Table: `dbo.WebResourceUserSetting`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebResourceUserSettingID` | int | NO |  | YES |
| 2 | `AccountID` | nvarchar(100) | NO |  |  |
| 3 | `WebResourceID` | int | NO |  |  |
| 4 | `Name` | nvarchar(50) | NO |  |  |
| 5 | `Value` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebResourceUserSetting_Accounts` | `AccountID` | [`dbo.Accounts.AccountID`](dbo.Accounts.md) | CASCADE | CASCADE |
| `FK_WebResourceUserSetting_WebResource` | `WebResourceID` | [`dbo.WebResource.WebResourceID`](dbo.WebResource.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
