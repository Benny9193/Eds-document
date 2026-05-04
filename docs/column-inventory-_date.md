# Column Inventory: `*_date`

_Generated on 2026-05-04T15:15:14.808Z_
_Output: `docs\column-inventory-_date.md`_

Pattern `*_date` (SQL LIKE: `%[_]date`) — **22** distinct column names, **24** occurrences across **3** databases.

FK role key: `→ target` = this column is an FK source pointing outward; `← source` = this column is referenced by another table's FK.

_LIKE matching respects the database collation (typically case-insensitive on Azure SQL)._

## Summary

| Column | Occurrences | Databases |
|--------|-------------|-----------|
| [`ACTIVATE_DATE`](#activate-date) | 1 | `dpa_EDSAdmin` |
| [`delivery_date`](#delivery-date) | 1 | `EDS_Test` |
| [`DISMISSED_DATE`](#dismissed-date) | 1 | `dpa_EDSAdmin` |
| [`EVENT_DATE`](#event-date) | 2 | `dpa_EDSAdmin` |
| [`EXCLUDE_DATE`](#exclude-date) | 1 | `dpa_EDSAdmin` |
| [`EXPIRATION_DATE`](#expiration-date) | 1 | `dpa_EDSAdmin` |
| [`EXTRA_DATE`](#extra-date) | 1 | `dpa_EDSAdmin` |
| [`LATEST_DAY_DATE`](#latest-day-date) | 1 | `dpa_EDSAdmin` |
| [`LATEST_DETAIL_DATE`](#latest-detail-date) | 1 | `dpa_EDSAdmin` |
| [`LATEST_HOUR_DATE`](#latest-hour-date) | 1 | `dpa_EDSAdmin` |
| [`LATEST_TEN_MINUTE_DATE`](#latest-ten-minute-date) | 1 | `dpa_EDSAdmin` |
| [`LOG_DATE`](#log-date) | 1 | `dpa_EDSAdmin` |
| [`notice_date`](#notice-date) | 1 | `EDS_Test` |
| [`OLDEST_DETAIL_DATE`](#oldest-detail-date) | 1 | `dpa_EDSAdmin` |
| [`ORACLE_CREATE_DATE`](#oracle-create-date) | 1 | `dpa_EDSAdmin` |
| [`PO_Date`](#po-date) | 1 | `WorkTables` |
| [`REPORT_DATE`](#report-date) | 1 | `dpa_EDSAdmin` |
| [`ship_date`](#ship-date) | 2 | `EDS_Test` |
| [`SILENCE_DATE`](#silence-date) | 1 | `dpa_EDSAdmin` |
| [`STATE_DATE`](#state-date) | 1 | `dpa_EDSAdmin` |
| [`UPGRADE_DATE`](#upgrade-date) | 1 | `dpa_EDSAdmin` |
| [`USAGE_DATE`](#usage-date) | 1 | `dpa_EDSAdmin` |

## `ACTIVATE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_PROBLEM_SILENCE_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_SILENCE_1.md) | datetime | YES |  |  | table |

## `delivery_date`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | date | YES |  |  | table |

## `DISMISSED_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_WHATIF_IDX_1`](tables/dpa_EDSAdmin/dbo.CON_WHATIF_IDX_1.md) | datetime | YES |  |  | table |

## `EVENT_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_EVENTS`](tables/dpa_EDSAdmin/dbo.CON_EVENTS.md) | datetime | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | datetime | NO | YES |  | table |

## `EXCLUDE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_EXCLUDED_SQL`](tables/dpa_EDSAdmin/dbo.CON_EXCLUDED_SQL.md) | datetime | YES |  |  | table |

## `EXPIRATION_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ORION_INTEGRATION`](tables/dpa_EDSAdmin/dbo.CON_ORION_INTEGRATION.md) | datetime | YES |  |  | table |

## `EXTRA_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONLIC_HISTORY`](tables/dpa_EDSAdmin/dbo.CONLIC_HISTORY.md) | datetime | YES |  |  | table |

## `LATEST_DAY_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | datetime | YES |  |  | table |

## `LATEST_DETAIL_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | datetime | YES |  |  | table |

## `LATEST_HOUR_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | datetime | YES |  |  | table |

## `LATEST_TEN_MINUTE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | datetime | YES |  |  | table |

## `LOG_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONLOG`](tables/dpa_EDSAdmin/dbo.CONLOG.md) | datetime | YES |  |  | table |

## `notice_date`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | datetime2 | NO |  |  | table |

## `OLDEST_DETAIL_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | datetime | YES |  |  | table |

## `ORACLE_CREATE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND`](tables/dpa_EDSAdmin/dbo.COND.md) | datetime | YES |  |  | table |

## `PO_Date`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.CSV File for EDS POs`](tables/WorkTables/dbo.CSV_File_for_EDS_POs.md) | date | NO |  |  | table |

## `REPORT_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONMETER`](tables/dpa_EDSAdmin/dbo.CONMETER.md) | datetime | NO |  |  | table |

## `ship_date`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_ack_items`](tables/EDS_Test/EDSIQWebUser.cxml_order_ack_items.md) | date | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | date | YES |  |  | table |

## `SILENCE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_PROBLEM_SILENCE_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_SILENCE_1.md) | datetime | NO |  |  | table |

## `STATE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_DB_STATE`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB_STATE.md) | datetime | NO |  |  | table |

## `UPGRADE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_UPGRADE`](tables/dpa_EDSAdmin/dbo.CON_UPGRADE.md) | datetime | NO |  |  | table |

## `USAGE_DATE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONMETER`](tables/dpa_EDSAdmin/dbo.CONMETER.md) | smalldatetime | NO |  |  | table |
