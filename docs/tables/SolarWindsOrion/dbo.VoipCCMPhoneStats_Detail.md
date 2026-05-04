# Table: `dbo.VoipCCMPhoneStats_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMPhonesID` | int | NO |  |  |
| 3 | `RecordTime` | datetime | NO |  |  |
| 4 | `Status` | int | NO |  |  |
| 5 | `Archive` | tinyint | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMPhoneStats_Detail` | `VoipCCMPhonesID` | [`dbo.VoipCCMPhones.ID`](dbo.VoipCCMPhones.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMPhoneStats_Detail` | no | NONCLUSTERED | `VoipCCMPhonesID` |  |
| `NI_VoipCCMPhoneStats_Detail_RecordTime` | no | NONCLUSTERED | `RecordTime` |  |
