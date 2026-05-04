# Table: `dbo.vendorbids`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 58080

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbidid` | int | NO |  | YES |
| 2 | `active` | tinyint | YES |  |  |
| 3 | `registrationid` | int | NO |  |  |
| 4 | `calendarid` | int | YES |  |  |
| 5 | `bidpwd` | varbinary(max) | YES |  |  |
| 6 | `created` | datetime | YES | `(getdate())` |  |
| 7 | `ctEncryptionCode` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VendorBids_BidCalendar` | `calendarid` | [`dbo.bidcalendar.calendarid`](dbo.bidcalendar.md) | CASCADE | CASCADE |
| `FK_VendorBids_Registrations` | `registrationid` | [`dbo.registrations.registrationid`](dbo.registrations.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.vendorbiditems_Orig`](dbo.vendorbiditems_Orig.md) | `vendorbidid` | `vendorbidid` | CASCADE | CASCADE |
| [`dbo.vendorbidsjournal`](dbo.vendorbidsjournal.md) | `vendorbidid` | `vendorbidid` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_RegCal_VendorBidId` | YES | NONCLUSTERED | `registrationid`, `calendarid`, `vendorbidid` |  |
| `SKI_RegCalCreated_VendorBid` | no | NONCLUSTERED | `registrationid`, `calendarid`, `created` | `vendorbidid` |
