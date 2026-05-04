# Table: `dbo.hm_tcpipports`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `portid` | int | NO |  | YES |
| 2 | `portprotocol` | tinyint | NO |  |  |
| 3 | `portnumber` | int | NO |  |  |
| 4 | `portaddress1` | bigint | NO |  |  |
| 5 | `portaddress2` | bigint | YES |  |  |
| 6 | `portconnectionsecurity` | tinyint | NO |  |  |
| 7 | `portsslcertificateid` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
