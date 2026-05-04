# Table: `dbo.SDSResults`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 116893

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SDSResultsId` | int | NO |  | YES |
| 2 | `SafetyDataSheetId` | int | NO |  |  |
| 3 | `SDSURL` | varchar(512) | YES |  |  |
| 4 | `SDSCacheURL` | varchar(512) | YES |  |  |
| 5 | `DocumentType` | varchar(128) | YES |  |  |
| 6 | `DocumentURL` | varchar(512) | YES |  |  |
| 7 | `ValidCache` | bit | YES |  |  |
| 8 | `ValidSDSUrl` | bit | YES |  |  |
| 9 | `ValidDocumentURL` | bit | YES |  |  |
| 10 | `ValidElasticText` | bit | YES |  |  |
| 11 | `SDSCacheError` | varchar(1024) | YES |  |  |
| 12 | `SDSURLError` | varchar(1024) | YES |  |  |
| 13 | `DocumentURLError` | varchar(1024) | YES |  |  |
| 14 | `ElasticError` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
