# Table: `dbo.CON_SWIP_DATABASE_INFO`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATABASE_ID` | int | NO |  | YES |
| 2 | `DATABASE_TYPE` | varchar(200) | NO |  |  |
| 3 | `DATABASE_VERSION` | varchar(200) | NO |  |  |
| 4 | `DATABASE_EDITION` | varchar(200) | NO |  |  |
| 5 | `DATABASE_IS_AMAZON_RDS` | varchar(200) | NO |  |  |
| 6 | `AG_CONNECTION` | char(1) | YES |  |  |
| 7 | `AG_COUNT` | int | YES |  |  |
| 8 | `AG_DATABASE_COUNT` | int | YES |  |  |
| 9 | `TOTAL_DATABASE_COUNT` | int | YES |  |  |
| 10 | `AD_ENABLED` | varchar(200) | YES |  |  |
| 11 | `AD_WARNING_COUNT` | int | YES |  |  |
| 12 | `AD_CRITICAL_COUNT` | int | YES |  |  |
| 13 | `AD_WARNING_THRESHOLD` | decimal(20,1) | YES |  |  |
| 14 | `AD_CRITICAL_THRESHOLD` | decimal(20,1) | YES |  |  |
| 15 | `AD_STD_MIN` | decimal(20,1) | YES |  |  |
| 16 | `AD_STD_MAX` | decimal(20,1) | YES |  |  |
| 17 | `AD_STD_AVG` | decimal(20,1) | YES |  |  |
| 18 | `AD_STD_STD` | decimal(20,1) | YES |  |  |
| 19 | `AUTHENTICATION_TYPE` | varchar(50) | YES |  |  |
| 20 | `DATABASE_IS_AZURE` | char(1) | YES |  |  |
| 21 | `PG_TRACK_ACTIVITIES_ENABLED` | char(1) | YES |  |  |
| 22 | `PG_TRACK_ACTIVITY_QUERY_SIZE` | int | YES |  |  |
| 23 | `PG_ORACLE_SYNTAX` | char(1) | YES |  |  |
| 24 | `PG_EXTENSION_LIST` | varchar(200) | YES |  |  |
| 25 | `FIND_SQL_INDEX_SIZE` | int | YES |  |  |
| 26 | `DATABASE_DRIVER` | varchar(100) | YES |  |  |
| 27 | `DEPLOYMENT` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
