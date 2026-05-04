# Table: `dbo.hm_fetchaccounts`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `faid` | int | NO |  | YES |
| 2 | `faactive` | tinyint | NO |  |  |
| 3 | `faaccountid` | int | NO |  |  |
| 4 | `faaccountname` | nvarchar(255) | NO |  |  |
| 5 | `faserveraddress` | nvarchar(255) | NO |  |  |
| 6 | `faserverport` | int | NO |  |  |
| 7 | `faservertype` | tinyint | NO |  |  |
| 8 | `fausername` | nvarchar(255) | NO |  |  |
| 9 | `fapassword` | nvarchar(255) | NO |  |  |
| 10 | `faminutes` | int | NO |  |  |
| 11 | `fanexttry` | datetime | NO |  |  |
| 12 | `fadaystokeep` | int | NO |  |  |
| 13 | `falocked` | tinyint | NO |  |  |
| 14 | `faprocessmimerecipients` | tinyint | NO |  |  |
| 15 | `faprocessmimedate` | tinyint | NO |  |  |
| 16 | `faconnectionsecurity` | tinyint | NO |  |  |
| 17 | `fauseantispam` | tinyint | NO |  |  |
| 18 | `fauseantivirus` | tinyint | NO |  |  |
| 19 | `faenablerouterecipients` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
