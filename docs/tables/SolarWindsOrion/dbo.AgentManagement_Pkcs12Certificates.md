# Table: `dbo.AgentManagement_Pkcs12Certificates`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CertificateID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `AgentID` | int | NO |  |  |
| 3 | `CertificateType` | int | YES |  |  |
| 4 | `CertificateData` | varbinary(max) | YES |  |  |
| 5 | `Description` | nvarchar(255) | YES |  |  |
| 6 | `CertificateText` | varbinary(max) | YES |  |  |
| 7 | `State` | int | YES |  |  |
| 8 | `LastChangedUtc` | timestamp | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
