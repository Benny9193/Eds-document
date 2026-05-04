# Column Inventory: `*_id`

_Generated on 2026-05-04T15:14:15.781Z_
_Output: `docs\column-inventory-_id.md`_

Pattern `*_id` (SQL LIKE: `%[_]id`) — **69** distinct column names, **154** occurrences across **11** databases.

FK role key: `→ target` = this column is an FK source pointing outward; `← source` = this column is referenced by another table's FK.

_LIKE matching respects the database collation (typically case-insensitive on Azure SQL)._

## Summary

| Column | Occurrences | Databases |
|--------|-------------|-----------|
| [`AG_ID`](#ag-id) | 3 | `dpa_EDSAdmin` |
| [`ALERT_GROUP_ID`](#alert-group-id) | 3 | `dpa_EDSAdmin` |
| [`ALERT_ID`](#alert-id) | 2 | `dpa_EDSAdmin` |
| [`ATTRIBUTE_ID`](#attribute-id) | 2 | `dpa_EDSAdmin` |
| [`BRANCH_NAME_ID`](#branch-name-id) | 1 | `dpa_EDSAdmin` |
| [`CLUSTER_ID`](#cluster-id) | 1 | `dpa_EDSAdmin` |
| [`COND_ID`](#cond-id) | 1 | `dpa_EDSAdmin` |
| [`CONFIG_ID`](#config-id) | 1 | `dpa_EDSAdmin` |
| [`connector_id`](#connector-id) | 1 | `WorkTables` |
| [`CONSUMER_ID`](#consumer-id) | 1 | `dpa_EDSAdmin` |
| [`CONTACT_ID`](#contact-id) | 1 | `dpa_EDSAdmin` |
| [`CONTAINER_ID`](#container-id) | 1 | `dpa_EDSAdmin` |
| [`CURRENT_HOST_ID`](#current-host-id) | 1 | `dpa_EDSAdmin` |
| [`DATABASE_ID`](#database-id) | 1 | `dpa_EDSAdmin` |
| [`DATACENTER_ID`](#datacenter-id) | 4 | `dpa_EDSAdmin` |
| [`DATASTORE_ID`](#datastore-id) | 3 | `dpa_EDSAdmin` |
| [`DB_ID`](#db-id) | 14 | `dpa_EDSAdmin` |
| [`DB_SQL_ID`](#db-sql-id) | 2 | `dpa_EDSAdmin` |
| [`DB2DB_ID`](#db2db-id) | 1 | `dpa_EDSAdmin` |
| [`DEADLOCK_ID`](#deadlock-id) | 2 | `dpa_EDSAdmin` |
| [`diagram_id`](#diagram-id) | 6 | `Documents`, `EDS`, `EDS_TEST_Old`, `EDS_Test`, `VendorBids`, `VendorBids_TEST` |
| [`DIM_ID`](#dim-id) | 2 | `dpa_EDSAdmin` |
| [`DIM_VALUE_ID`](#dim-value-id) | 1 | `dpa_EDSAdmin` |
| [`DOT_Id`](#dot-id) | 9 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`EMAIL_TEMPLATE_ID`](#email-template-id) | 1 | `dpa_EDSAdmin` |
| [`ENTITY_ID`](#entity-id) | 5 | `dpa_EDSAdmin` |
| [`FROM_CONTACT_ID`](#from-contact-id) | 1 | `dpa_EDSAdmin` |
| [`GROUP_ID`](#group-id) | 2 | `dpa_EDSAdmin` |
| [`HOST_ID`](#host-id) | 1 | `dpa_EDSAdmin` |
| [`IDX_ID`](#idx-id) | 1 | `dpa_EDSAdmin` |
| [`INDEX_ID`](#index-id) | 1 | `dpa_EDSAdmin` |
| [`ITEM_ID`](#item-id) | 1 | `dpa_EDSAdmin` |
| [`message_id`](#message-id) | 1 | `WorkTables` |
| [`metadata_id`](#metadata-id) | 2 | `hMailServer`, `hMailServerNew` |
| [`METRIC_NAME_ID`](#metric-name-id) | 1 | `dpa_EDSAdmin` |
| [`METRICS_ID`](#metrics-id) | 4 | `dpa_EDSAdmin` |
| [`MOBJ_ID`](#mobj-id) | 5 | `dpa_EDSAdmin` |
| [`network_message_id`](#network-message-id) | 1 | `WorkTables` |
| [`NODE_ID`](#node-id) | 2 | `dpa_EDSAdmin` |
| [`Operation_ID`](#operation-id) | 3 | `SolarWindsOrion` |
| [`OPTIMIZED_ID`](#optimized-id) | 1 | `dpa_EDSAdmin` |
| [`order_ack_id`](#order-ack-id) | 1 | `EDS_Test` |
| [`PARENT_ENTITY_ID`](#parent-entity-id) | 1 | `dpa_EDSAdmin` |
| [`PARENT_ID`](#parent-id) | 2 | `dpa_EDSAdmin` |
| [`PARENT_NODE_ID`](#parent-node-id) | 2 | `dpa_EDSAdmin` |
| [`PARTITION_ID`](#partition-id) | 1 | `dpa_EDSAdmin` |
| [`payload_id`](#payload-id) | 3 | `EDS_Test` |
| [`po_detail_id`](#po-detail-id) | 2 | `EDS_Test` |
| [`po_id`](#po-id) | 2 | `EDS_Test` |
| [`principal_id`](#principal-id) | 6 | `Documents`, `EDS`, `EDS_TEST_Old`, `EDS_Test`, `VendorBids`, `VendorBids_TEST` |
| [`PROP_ID`](#prop-id) | 2 | `dpa_EDSAdmin` |
| [`PROP_VALUE_ID`](#prop-value-id) | 1 | `dpa_EDSAdmin` |
| [`QUERY_ID`](#query-id) | 1 | `dpa_EDSAdmin` |
| [`RULE_ID`](#rule-id) | 1 | `dpa_EDSAdmin` |
| [`SCHED_ID`](#sched-id) | 3 | `dpa_EDSAdmin` |
| [`SCHEDULE_ID`](#schedule-id) | 2 | `dpa_EDSAdmin` |
| [`SCHEMA_ID`](#schema-id) | 1 | `dpa_EDSAdmin` |
| [`SERVER_ID`](#server-id) | 7 | `dpa_EDSAdmin` |
| [`SERVICE_USER_ID`](#service-user-id) | 1 | `dpa_EDSAdmin` |
| [`SHARE_ID`](#share-id) | 1 | `dpa_EDSAdmin` |
| [`ship_notice_id`](#ship-notice-id) | 1 | `EDS_Test` |
| [`shipment_id`](#shipment-id) | 1 | `EDS_Test` |
| [`Source_Node_ID`](#source-node-id) | 1 | `SolarWindsOrion` |
| [`SUBSCRIPTION_ID`](#subscription-id) | 4 | `SolarWindsOrion`, `dpa_EDSAdmin` |
| [`TABLE_ID`](#table-id) | 2 | `dpa_EDSAdmin` |
| [`Target_Node_ID`](#target-node-id) | 1 | `SolarWindsOrion` |
| [`USER_SUBSCRIPTON_ID`](#user-subscripton-id) | 1 | `dpa_EDSAdmin` |
| [`VENDOR_ID`](#vendor-id) | 5 | `EDS_Test`, `dpa_EDSAdmin` |
| [`VM_ID`](#vm-id) | 1 | `dpa_EDSAdmin` |

## `AG_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_DATABASE`](tables/dpa_EDSAdmin/dbo.CON_AG_DATABASE.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_REPLICA`](tables/dpa_EDSAdmin/dbo.CON_AG_REPLICA.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_STATUS_SUMMARY`](tables/dpa_EDSAdmin/dbo.CON_AG_STATUS_SUMMARY.md) | bigint | NO | YES |  | table |

## `ALERT_GROUP_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_GROUP_ALERTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_ALERTS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_GROUP_DBS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_DBS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONBLACKOUT_SCHEDULE_DATA`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE_DATA.md) | smallint | YES |  |  | table |

## `ALERT_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_GROUP_ALERTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_ALERTS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONBLACKOUT_SCHEDULE_DATA`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE_DATA.md) | smallint | YES |  |  | table |

## `ATTRIBUTE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPT_ATTRIBUTE_NAME_MAP`](tables/dpa_EDSAdmin/dbo.CONPT_ATTRIBUTE_NAME_MAP.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPT_ATTRIBUTES_1`](tables/dpa_EDSAdmin/dbo.CONPT_ATTRIBUTES_1.md) | smallint | NO | YES |  | table |

## `BRANCH_NAME_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_1.md) | bigint | NO |  |  | table |

## `CLUSTER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_HOST`](tables/dpa_EDSAdmin/dbo.CONV_HOST.md) | bigint | YES |  |  | table |

## `COND_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_MSSQL_DB`](tables/dpa_EDSAdmin/dbo.CON_MSSQL_DB.md) | smallint | NO | YES |  | table |

## `CONFIG_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_CONTACT_CNS`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_CNS.md) | int | YES |  |  | table |

## `connector_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.AngelaEmails`](tables/WorkTables/dbo.AngelaEmails.md) | nvarchar(50) | YES |  |  | table |

## `CONSUMER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONLIC_INSTANCE_ALLOCATION`](tables/dpa_EDSAdmin/dbo.CONLIC_INSTANCE_ALLOCATION.md) | varchar(350) | NO | YES |  | table |

## `CONTACT_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE_CONTACTS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_CONTACTS.md) | smallint | NO | YES |  | table |

## `CONTAINER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | bigint | NO |  |  | table |

## `CURRENT_HOST_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | bigint | YES |  |  | table |

## `DATABASE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_SWIP_DATABASE_INFO`](tables/dpa_EDSAdmin/dbo.CON_SWIP_DATABASE_INFO.md) | int | NO | YES |  | table |

## `DATACENTER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_CLUSTER`](tables/dpa_EDSAdmin/dbo.CONV_CLUSTER.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_HOST`](tables/dpa_EDSAdmin/dbo.CONV_HOST.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | bigint | NO |  |  | table |

## `DATASTORE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE_DEVICES`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_DEVICES.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE_HOSTS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_HOSTS.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE_VMS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_VMS.md) | bigint | NO | YES |  | table |

## `DB_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_DATABASE`](tables/dpa_EDSAdmin/dbo.CON_AG_DATABASE.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_REPLICA`](tables/dpa_EDSAdmin/dbo.CON_AG_REPLICA.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_STATUS_SUMMARY`](tables/dpa_EDSAdmin/dbo.CON_AG_STATUS_SUMMARY.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_GROUP_DBS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_DBS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_HISTORY`](tables/dpa_EDSAdmin/dbo.CON_ALERT_HISTORY.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERTABLE_EVENT`](tables/dpa_EDSAdmin/dbo.CON_ALERTABLE_EVENT.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ANOMALY_DETECTION`](tables/dpa_EDSAdmin/dbo.CON_ANOMALY_DETECTION.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_DPA_STATISTICS`](tables/dpa_EDSAdmin/dbo.CON_DPA_STATISTICS.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_FIND_SQL_SHARE`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_DISABLED`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DISABLED.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_THRESHOLDS`](tables/dpa_EDSAdmin/dbo.CON_METRICS_THRESHOLDS.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_SWIP_COUNTERS`](tables/dpa_EDSAdmin/dbo.CON_SWIP_COUNTERS.md) | smallint | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONBLACKOUT_SCHEDULE_DATA`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE_DATA.md) | smallint | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND_CPROPS`](tables/dpa_EDSAdmin/dbo.COND_CPROPS.md) | smallint | NO |  |  | table |

## `DB_SQL_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_SQL_MAP_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_MAP_1.md) | varchar(100) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_SQL_MAP_T_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_MAP_T_1.md) | varchar(100) | NO |  |  | table |

## `DB2DB_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_PLAN_SAMPLES_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_SAMPLES_1.md) | bigint | YES |  |  | table |

## `DEADLOCK_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_DEADLOCK_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DETAIL_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_DEADLOCK_DIM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DIM_1.md) | bigint | NO | YES |  | table |

## `diagram_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `Documents` | `dbo` | [`dbo.sysdiagrams`](tables/Documents/dbo.sysdiagrams.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.sysdiagrams`](tables/EDS/dbo.sysdiagrams.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.sysdiagrams`](tables/EDS_Test/dbo.sysdiagrams.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.sysdiagrams`](tables/EDS_TEST_Old/dbo.sysdiagrams.md) | int | NO | YES |  | table |
| `VendorBids` | `dbo` | [`dbo.sysdiagrams`](tables/VendorBids/dbo.sysdiagrams.md) | int | NO | YES |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.sysdiagrams`](tables/VendorBids_TEST/dbo.sysdiagrams.md) | int | NO | YES |  | table |

## `DIM_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_DEADLOCK_DIM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DIM_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_FIND_SQL_SHARE_DIM`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE_DIM.md) | smallint | NO |  |  | table |

## `DIM_VALUE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_FIND_SQL_SHARE_DIM`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE_DIM.md) | bigint | NO |  |  | table |

## `DOT_Id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.RTK_CASFile`](tables/EDS/dbo.RTK_CASFile.md) | char(4) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_RTKInfo`](tables/EDS/dbo.vw_RTKInfo.md) | char(4) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RTKInfoAnnual`](tables/EDS/dbo.vw_RTKInfoAnnual.md) | char(4) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.RTK_CASFile`](tables/EDS_Test/dbo.RTK_CASFile.md) | char(4) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_RTKInfo`](tables/EDS_Test/dbo.vw_RTKInfo.md) | char(4) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RTKInfoAnnual`](tables/EDS_Test/dbo.vw_RTKInfoAnnual.md) | char(4) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.RTK_CASFile`](tables/EDS_TEST_Old/dbo.RTK_CASFile.md) | char(4) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RTKInfo`](tables/EDS_TEST_Old/dbo.vw_RTKInfo.md) | char(4) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RTKInfoAnnual`](tables/EDS_TEST_Old/dbo.vw_RTKInfoAnnual.md) | char(4) | YES |  |  | view |

## `EMAIL_TEMPLATE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT`](tables/dpa_EDSAdmin/dbo.CON_ALERT.md) | bigint | YES |  |  | table |

## `ENTITY_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_CRED_CYBERARK`](tables/dpa_EDSAdmin/dbo.CON_CRED_CYBERARK.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_RULE_ASSIGNMENT`](tables/dpa_EDSAdmin/dbo.CON_RULE_ASSIGNMENT.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DEVICE`](tables/dpa_EDSAdmin/dbo.CONV_DEVICE.md) | bigint | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | bigint | NO | YES |  | table |

## `FROM_CONTACT_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE.md) | smallint | YES |  |  | table |

## `GROUP_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_STATUS_SUMMARY`](tables/dpa_EDSAdmin/dbo.CON_AG_STATUS_SUMMARY.md) | varchar(100) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONAG_1`](tables/dpa_EDSAdmin/dbo.CONAG_1.md) | varchar(100) | YES |  |  | table |

## `HOST_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE_HOSTS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_HOSTS.md) | bigint | NO | YES |  | table |

## `IDX_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_WHATIF_SRC_1`](tables/dpa_EDSAdmin/dbo.CON_WHATIF_SRC_1.md) | bigint | NO |  |  | table |

## `INDEX_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_INDEX_ANALYSIS_1`](tables/dpa_EDSAdmin/dbo.CON_INDEX_ANALYSIS_1.md) | bigint | YES |  |  | table |

## `ITEM_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE_ITEMS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_ITEMS.md) | smallint | NO | YES |  | table |

## `message_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.AngelaEmails`](tables/WorkTables/dbo.AngelaEmails.md) | nvarchar(100) | NO |  |  | table |

## `metadata_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `hMailServer` | `dbo` | [`dbo.hm_message_metadata`](tables/hMailServer/dbo.hm_message_metadata.md) | bigint | NO | YES |  | table |
| `hMailServerNew` | `dbo` | [`dbo.hm_message_metadata`](tables/hMailServerNew/dbo.hm_message_metadata.md) | bigint | NO | YES |  | table |

## `METRIC_NAME_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_1.md) | bigint | NO |  |  | table |

## `METRICS_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_DAY_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DAY_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DETAIL_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_HOUR_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_HOUR_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_TEN_MINUTE_1.md) | bigint | NO | YES |  | table |

## `MOBJ_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_CLUSTER`](tables/dpa_EDSAdmin/dbo.CONV_CLUSTER.md) | varchar(50) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATACENTER`](tables/dpa_EDSAdmin/dbo.CONV_DATACENTER.md) | varchar(50) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE.md) | varchar(500) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_HOST`](tables/dpa_EDSAdmin/dbo.CONV_HOST.md) | varchar(50) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | varchar(50) | NO |  |  | table |

## `network_message_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.AngelaEmails`](tables/WorkTables/dbo.AngelaEmails.md) | nvarchar(50) | NO |  |  | table |

## `NODE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONMPT_1`](tables/dpa_EDSAdmin/dbo.CONMPT_1.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPPT_1`](tables/dpa_EDSAdmin/dbo.CONPPT_1.md) | smallint | NO | YES |  | table |

## `Operation_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.IpSlaOperationsJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsJitter.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationsICMPEcho`](tables/SolarWindsOrion/dbo.VoipOperationsICMPEcho.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationsUDPEcho`](tables/SolarWindsOrion/dbo.VoipOperationsUDPEcho.md) | int | NO |  |  | view |

## `OPTIMIZED_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONAIQ_FEEDBACK_1`](tables/dpa_EDSAdmin/dbo.CONAIQ_FEEDBACK_1.md) | smallint | NO |  |  | table |

## `order_ack_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_ack_items`](tables/EDS_Test/EDSIQWebUser.cxml_order_ack_items.md) | int | NO |  | → `EDSIQWebUser.cxml_order_acks(id)` | table |

## `PARENT_ENTITY_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | bigint | YES |  |  | table |

## `PARENT_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPT_1`](tables/dpa_EDSAdmin/dbo.CONPT_1.md) | numeric(38,0) | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | bigint | YES |  |  | table |

## `PARENT_NODE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONMPT_1`](tables/dpa_EDSAdmin/dbo.CONMPT_1.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPPT_1`](tables/dpa_EDSAdmin/dbo.CONPPT_1.md) | smallint | NO |  |  | table |

## `PARTITION_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONPT_1`](tables/dpa_EDSAdmin/dbo.CONPT_1.md) | numeric(38,0) | YES |  |  | table |

## `payload_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | nvarchar(255) | NO |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_request_log`](tables/EDS_Test/EDSIQWebUser.cxml_request_log.md) | nvarchar(255) | NO |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | nvarchar(255) | NO |  |  | table |

## `po_detail_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_ack_items`](tables/EDS_Test/EDSIQWebUser.cxml_order_ack_items.md) | int | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notice_items`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notice_items.md) | int | YES |  |  | table |

## `po_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | int | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | int | YES |  |  | table |

## `principal_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `Documents` | `dbo` | [`dbo.sysdiagrams`](tables/Documents/dbo.sysdiagrams.md) | int | NO |  |  | table |
| `EDS` | `dbo` | [`dbo.sysdiagrams`](tables/EDS/dbo.sysdiagrams.md) | int | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.sysdiagrams`](tables/EDS_Test/dbo.sysdiagrams.md) | int | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.sysdiagrams`](tables/EDS_TEST_Old/dbo.sysdiagrams.md) | int | NO |  |  | table |
| `VendorBids` | `dbo` | [`dbo.sysdiagrams`](tables/VendorBids/dbo.sysdiagrams.md) | int | NO |  |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.sysdiagrams`](tables/VendorBids_TEST/dbo.sysdiagrams.md) | int | NO |  |  | table |

## `PROP_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND_CPROPS`](tables/dpa_EDSAdmin/dbo.COND_CPROPS.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND_CPROPS_VALUES`](tables/dpa_EDSAdmin/dbo.COND_CPROPS_VALUES.md) | bigint | NO |  |  | table |

## `PROP_VALUE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND_CPROPS`](tables/dpa_EDSAdmin/dbo.COND_CPROPS.md) | bigint | NO |  |  | table |

## `QUERY_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_METRICS_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_1.md) | bigint | NO |  |  | table |

## `RULE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_RULE_ASSIGNMENT`](tables/dpa_EDSAdmin/dbo.CON_RULE_ASSIGNMENT.md) | bigint | NO |  |  | table |

## `SCHED_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE_CONTACTS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_CONTACTS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE_ITEMS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_ITEMS.md) | smallint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONR_SCHEDULE_TIMES`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_TIMES.md) | smallint | NO |  |  | table |

## `SCHEDULE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONBLACKOUT_SCHEDULE`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONBLACKOUT_SCHEDULE_DATA`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE_DATA.md) | bigint | NO |  |  | table |

## `SCHEMA_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_PLAN_SAMPLES_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_SAMPLES_1.md) | bigint | NO |  |  | table |

## `SERVER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_CLUSTER`](tables/dpa_EDSAdmin/dbo.CONV_CLUSTER.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATACENTER`](tables/dpa_EDSAdmin/dbo.CONV_DATACENTER.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DEVICE`](tables/dpa_EDSAdmin/dbo.CONV_DEVICE.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | bigint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_HOST`](tables/dpa_EDSAdmin/dbo.CONV_HOST.md) | smallint | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | smallint | NO |  |  | table |

## `SERVICE_USER_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ORION_INTEGRATION`](tables/dpa_EDSAdmin/dbo.CON_ORION_INTEGRATION.md) | smallint | NO |  |  | table |

## `SHARE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_FIND_SQL_SHARE_DIM`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE_DIM.md) | bigint | NO |  |  | table |

## `ship_notice_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notice_items`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notice_items.md) | int | NO |  | → `EDSIQWebUser.cxml_ship_notices(id)` | table |

## `shipment_id`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | nvarchar(255) | NO |  |  | table |

## `Source_Node_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.IpSlaOperationsJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsJitter.md) | int | NO |  |  | view |

## `SUBSCRIPTION_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ORION_PENDING_NOTIFS`](tables/dpa_EDSAdmin/dbo.CON_ORION_PENDING_NOTIFS.md) | varchar(100) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ORION_SUBSCRIPTION_TAGS`](tables/dpa_EDSAdmin/dbo.CON_ORION_SUBSCRIPTION_TAGS.md) | varchar(100) | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.PendingNotifications`](tables/SolarWindsOrion/dbo.PendingNotifications.md) | uniqueidentifier | NO |  | → `dbo.Subscriptions(Id)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.SubscriptionTags`](tables/SolarWindsOrion/dbo.SubscriptionTags.md) | uniqueidentifier | NO | YES | → `dbo.Subscriptions(Id)` | table |

## `TABLE_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_IA_TABLE_SUMMARY_1`](tables/dpa_EDSAdmin/dbo.CON_IA_TABLE_SUMMARY_1.md) | bigint | NO | YES |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_INDEX_ANALYSIS_1`](tables/dpa_EDSAdmin/dbo.CON_INDEX_ANALYSIS_1.md) | bigint | NO |  |  | table |

## `Target_Node_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.IpSlaOperationsJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsJitter.md) | int | YES |  |  | view |

## `USER_SUBSCRIPTON_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ORION_SUBSCRIPTIONS`](tables/dpa_EDSAdmin/dbo.CON_ORION_SUBSCRIPTIONS.md) | varchar(100) | YES |  |  | table |

## `VENDOR_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_DEADLOCK_DIM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DIM_1.md) | bigint | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | int | NO |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_request_log`](tables/EDS_Test/EDSIQWebUser.cxml_request_log.md) | int | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_ship_notices`](tables/EDS_Test/EDSIQWebUser.cxml_ship_notices.md) | int | NO |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_vendor_credentials`](tables/EDS_Test/EDSIQWebUser.cxml_vendor_credentials.md) | int | NO |  |  | table |

## `VM_ID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV_DATASTORE_VMS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_VMS.md) | bigint | NO | YES |  | table |
