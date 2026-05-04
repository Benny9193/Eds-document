# Table: `dbo.vendorsessions`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 61011

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `sessionid` | int | NO |  | YES |
| 2 | `registrationid` | int | YES |  |  |
| 3 | `sessionuser` | varchar(50) | YES |  |  |
| 4 | `starttime` | datetime | YES | `(getdate())` |  |
| 5 | `ipaddress` | varchar(50) | YES |  |  |
| 6 | `endtime` | datetime | YES |  |  |
| 7 | `jsession` | varchar(128) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VendorSessions_Registrations` | `registrationid` | [`dbo.registrations.registrationid`](dbo.registrations.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.vendorbiditemsjournal`](dbo.vendorbiditemsjournal.md) | `sessionid` | `sessionid` | NO_ACTION | NO_ACTION |
| [`dbo.vendorbidsjournal`](dbo.vendorbidsjournal.md) | `sessionid` | `sessionid` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `FK_jSession` | no | NONCLUSTERED | `jsession` |  |
