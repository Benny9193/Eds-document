# Table: `dbo.Accounts`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountID` | nvarchar(100) | NO |  | YES |
| 2 | `PasswordHash` | nvarchar(200) | YES |  |  |
| 3 | `Expires` | datetime | YES |  |  |
| 4 | `AccountEnabled` | char(1) | YES |  |  |
| 5 | `MenuName` | varchar(200) | YES |  |  |
| 6 | `HomePageViewID` | int | YES |  |  |
| 7 | `DefaultNetObjectID` | varchar(50) | YES |  |  |
| 8 | `DefaultNetObject` | varchar(255) | YES |  |  |
| 9 | `SummaryViewID` | int | YES |  |  |
| 10 | `NodeDetailsViewID` | int | YES |  |  |
| 11 | `ContainerDetailsViewID` | int | YES |  |  |
| 12 | `InterfaceDetailsViewID` | int | YES |  |  |
| 13 | `VolumeDetailsViewID` | varchar(50) | YES |  |  |
| 14 | `BBSummaryViewID` | int | YES |  |  |
| 15 | `ModemDetailsViewID` | int | YES |  |  |
| 16 | `WirelessClientViewID` | int | YES |  |  |
| 17 | `WirelessSessionViewID` | int | YES |  |  |
| 18 | `ApplicationViewID` | int | YES |  |  |
| 19 | `NetworkServiceViewID` | int | YES |  |  |
| 20 | `AllowAdmin` | char(1) | YES |  |  |
| 21 | `AllowNodeManagement` | char(1) | YES |  |  |
| 22 | `AllowMapManagement` | char(1) | YES |  |  |
| 23 | `AllowCustomize` | char(1) | YES |  |  |
| 24 | `AllowEventClear` | char(1) | YES |  |  |
| 25 | `AllowReportManagement` | char(1) | YES |  |  |
| 26 | `AllowAlertManagement` | char(1) | YES |  |  |
| 27 | `AllowUnmanage` | char(1) | YES |  |  |
| 28 | `AllowDisableAction` | char(1) | YES |  |  |
| 29 | `AllowDisableAlert` | char(1) | YES |  |  |
| 30 | `AllowDisableAllActions` | char(1) | YES |  |  |
| 31 | `LastLogin` | datetime | YES |  |  |
| 32 | `ReportFolder` | nvarchar(255) | YES |  |  |
| 33 | `AlertCategory` | nvarchar(255) | YES |  |  |
| 34 | `LimitationID1` | int | YES |  |  |
| 35 | `LimitationID2` | int | YES |  |  |
| 36 | `LimitationID3` | int | YES |  |  |
| 37 | `ToolsetIntegration` | char(1) | YES | `('N')` |  |
| 38 | `DisableSessionTimeout` | char(1) | YES | `('N')` |  |
| 39 | `AlertSound` | nvarchar(255) | YES |  |  |
| 40 | `AccountType` | smallint | YES | `((1))` |  |
| 41 | `GroupInfo` | nvarchar(255) | YES |  |  |
| 42 | `GroupPriority` | smallint | YES |  |  |
| 43 | `AccountSID` | nvarchar(200) | YES |  |  |
| 44 | `ActiveAlertDetailsViewID` | int | YES |  |  |
| 45 | `AllowViewCopCheck` | char(1) | YES | `('N')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.FavoriteResource`](dbo.FavoriteResource.md) | `AccountID` | `AccountID` | CASCADE | CASCADE |
| [`dbo.ResourceUserSetting`](dbo.ResourceUserSetting.md) | `AccountID` | `AccountID` | CASCADE | CASCADE |
| [`dbo.WebResourceUserSetting`](dbo.WebResourceUserSetting.md) | `AccountID` | `AccountID` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Accounts_AlertCategory` | no | NONCLUSTERED | `AlertCategory` |  |
