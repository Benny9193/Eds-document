# Table: `dbo.CertificateAuthority`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CertificateAuthorityId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `StateId` | int | NO |  |  |
| 4 | `CertificateName` | varchar(50) | NO |  |  |
| 5 | `CertificatesExpire` | tinyint | YES |  |  |
| 6 | `ExpireInMonths` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
