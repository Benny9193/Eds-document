# Table: `dbo.VendorCertificates`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCertificateId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `CertificateAuthorityId` | int | NO |  |  |
| 5 | `Certificate` | varchar(50) | YES |  |  |
| 6 | `DateOfIssuance` | datetime | YES |  |  |
| 7 | `ExpirationDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
