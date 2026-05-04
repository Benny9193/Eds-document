# Table: `dbo.VendorEmailLog`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 804590

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorEmailLogId` | int | NO |  | YES |
| 2 | `BidScheduleId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `VendorCode` | varchar(16) | YES |  |  |
| 6 | `VendorPwd` | varchar(255) | YES |  |  |
| 7 | `VendorEMail` | varchar(255) | YES |  |  |
| 8 | `RegistrationId` | int | YES |  |  |
| 9 | `EmailDateTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BSIVendorEmailReg_Id` | no | NONCLUSTERED | `BidScheduleId`, `VendorId` | `VendorEmailLogId`, `VendorEMail`, `RegistrationId` |
