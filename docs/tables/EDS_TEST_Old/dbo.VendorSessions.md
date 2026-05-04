# Table: `dbo.VendorSessions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10702

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorSessionId` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `UserName` | varchar(50) | YES |  |  |
| 4 | `jSession` | varchar(255) | YES |  |  |
| 5 | `StartTime` | datetime | YES |  |  |
| 6 | `EndTime` | datetime | YES |  |  |
| 7 | `IPAddress` | varchar(50) | YES |  |  |
| 8 | `VPORegistrationId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_jSessionPK` | YES | NONCLUSTERED | `jSession`, `VendorSessionId` |  |
