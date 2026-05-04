# Table: `dbo.VoipCCMPhonesCiscoData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMPhonesID` | int | NO |  |  |
| 3 | `Index` | int | NO |  |  |
| 4 | `Location` | nvarchar(255) | NO |  |  |
| 5 | `LastRegisteredUTC` | datetime | NO |  |  |
| 6 | `UTCOffset` | int | NO |  |  |
| 7 | `Extension` | nvarchar(50) | YES |  |  |
| 8 | `RegionID` | int | YES |  |  |
| 9 | `IpAddressV4` | int | YES |  |  |
| 10 | `ProductType` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMPhonesCiscoData` | `VoipCCMPhonesID` | [`dbo.VoipCCMPhones.ID`](dbo.VoipCCMPhones.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMPhonesCiscoData` | no | NONCLUSTERED | `VoipCCMPhonesID` |  |
