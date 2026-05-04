# Table: `dbo.VPOVendorLinks`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VPOVendorLinkId` | int | NO |  | YES |
| 2 | `VPORegistrationId` | int | NO |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `LastChange` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VPOVendorLinks` | no | NONCLUSTERED | `VPORegistrationId`, `VendorId` |  |
