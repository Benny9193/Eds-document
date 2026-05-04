# Table: `dbo.VoipCCMPhonesAvayaData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMPhonesID` | int | NO |  |  |
| 3 | `Extension` | nvarchar(50) | YES |  |  |
| 4 | `Port` | nvarchar(10) | YES |  |  |
| 5 | `Type` | nvarchar(50) | YES |  |  |
| 6 | `Location` | int | YES |  |  |
| 7 | `IpAddressV4` | int | YES |  |  |
| 8 | `RegionID` | int | YES |  |  |
| 9 | `RegionIndex` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMPhonesAvayaData` | `VoipCCMPhonesID` | [`dbo.VoipCCMPhones.ID`](dbo.VoipCCMPhones.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMPhonesAvayaData` | no | NONCLUSTERED | `VoipCCMPhonesID` |  |
