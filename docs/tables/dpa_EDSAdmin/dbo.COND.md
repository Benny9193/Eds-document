# Table: `dbo.COND`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `NAME` | varchar(400) | NO |  |  |
| 3 | `F` | char(1) | NO |  |  |
| 4 | `LICENSE` | varchar(1000) | YES |  |  |
| 5 | `QP` | smallint | NO |  |  |
| 6 | `SP` | smallint | NO |  |  |
| 7 | `SQLTEXT` | smallint | NO |  |  |
| 8 | `DB_TYPE` | varchar(30) | NO |  |  |
| 9 | `MONDBVERSION` | varchar(100) | YES |  |  |
| 10 | `USERNAME` | varchar(200) | YES |  |  |
| 11 | `PASSWORD` | varchar(1000) | YES |  |  |
| 12 | `SECURITY_MODEL` | varchar(10) | YES | `('NONDBA')` |  |
| 13 | `CONN_STRING` | varchar(1000) | YES |  |  |
| 14 | `CONN_HOST` | varchar(200) | YES |  |  |
| 15 | `CONN_PORT` | varchar(30) | YES |  |  |
| 16 | `CONN_DATABASE` | varchar(200) | YES |  |  |
| 17 | `CONN_SERVICE_NAME` | varchar(200) | YES |  |  |
| 18 | `CONN_SID` | varchar(200) | YES |  |  |
| 19 | `CONN_ADD_PROPS` | varchar(1000) | YES |  |  |
| 20 | `CONN_URL_PROPS` | varchar(1000) | YES |  |  |
| 21 | `MACHINE_NAME` | varchar(200) | YES |  |  |
| 22 | `INSTANCE_NAME` | varchar(100) | YES |  |  |
| 23 | `INSTANCE_NUM` | smallint | YES |  |  |
| 24 | `COMMAND` | varchar(10) | NO | `('STOP')` |  |
| 25 | `STATUS` | varchar(10) | NO | `('STOPPED')` |  |
| 26 | `TRENDFLAG` | char(1) | NO | `('Y')` |  |
| 27 | `ALERTFLAG` | char(1) | NO | `('Y')` |  |
| 28 | `ORACLE_DBID` | bigint | YES |  |  |
| 29 | `ORACLE_CREATE_DATE` | datetime | YES |  |  |
| 30 | `ORACLE_DBNAME` | varchar(50) | YES |  |  |
| 31 | `ORACLE_ERP` | char(1) | NO | `('N')` |  |
| 32 | `DBGROUPID` | smallint | YES |  |  |
| 33 | `CLEAN_START_HOUR` | smallint | NO | `((22))` |  |
| 34 | `CLEAN_END_HOUR` | smallint | NO | `((3))` |  |
| 35 | `CLEAN_INTERVAL_DAYS` | smallint | NO | `((1))` |  |
| 36 | `VMID` | bigint | YES |  |  |
| 37 | `VMNAME` | varchar(200) | YES |  |  |
| 38 | `IP_ADDRESS` | varchar(50) | YES |  |  |
| 39 | `EDITION` | varchar(400) | YES |  |  |
| 40 | `AUTH_SCHEMA` | varchar(10) | NO | `('PASSWORD')` |  |
| 41 | `SSL_MODE` | varchar(50) | YES |  |  |
| 42 | `SERVER_CERTIFICATE` | varchar(max) | YES |  |  |
| 43 | `JDBC_DRIVER` | varchar(200) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_COND` | YES | NONCLUSTERED | `NAME` |  |
