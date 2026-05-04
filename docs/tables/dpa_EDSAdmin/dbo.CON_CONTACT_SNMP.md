# Table: `dbo.CON_CONTACT_SNMP`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `SNMPHOST` | varchar(100) | NO |  |  |
| 3 | `SNMPPORT` | smallint | NO |  |  |
| 4 | `SNMPCOMMSTRING` | varchar(100) | YES |  |  |
| 5 | `SNMPINSTRUCTIONS` | varchar(500) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
