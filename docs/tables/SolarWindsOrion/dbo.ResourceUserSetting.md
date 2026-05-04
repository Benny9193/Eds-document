# Table: `dbo.ResourceUserSetting`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ResourceUserSettingID` | int | NO |  | YES |
| 2 | `AccountID` | nvarchar(100) | NO |  |  |
| 3 | `ResourceID` | int | NO |  |  |
| 4 | `Name` | nvarchar(200) | NO |  |  |
| 5 | `Value` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ResourceUserSetting_Accounts` | `AccountID` | [`dbo.Accounts.AccountID`](dbo.Accounts.md) | CASCADE | CASCADE |
| `FK_ResourceUserSetting_Resource` | `ResourceID` | [`dbo.Resources.ResourceID`](dbo.Resources.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
