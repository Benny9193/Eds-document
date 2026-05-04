# Orphan & Unreferenced Object Audit

_Generated on 2026-05-04T15:27:02.133Z_

Flags objects that may be unused or disconnected from the schema. Each entry is a **signal for investigation**, not a verdict — confirm before removing anything.

| Category | Definition |
|----------|------------|
| **Orphan table** | Base table with no outgoing FK (no parent it points to) and no incoming FK (no child that points to it). Isolated from the FK graph entirely. |
| **Leaf view** | View not referenced by any other view, procedure, or function tracked in `sys.sql_expression_dependencies`. |
| **Unreferenced routine** | Stored procedure or function with no SQL-module callers. Application-code callers will not appear here. |

**Totals:** 2221 orphan tables, 1286 leaf views, 1932 unreferenced routines.

## Summary by database

| Database | Orphan tables | Leaf views | Unreferenced routines |
|----------|---------------|------------|-----------------------|
| [`Catalogs`](#catalogs) | 25 | 0 | 23 |
| [`ContentCentral`](#contentcentral) | 11 | 7 | 0 |
| [`DeletedPOs`](#deletedpos) | 1 | 0 | 0 |
| [`Documents`](#documents) | 19 | 15 | 14 |
| [`dpa_EDSAdmin`](#dpa_edsadmin) | 211 | 0 | 0 |
| [`EDS`](#eds) | 405 | 373 | 518 |
| [`EDS_Test`](#eds_test) | 408 | 374 | 517 |
| [`EDS_TEST_Old`](#eds_test_old) | 403 | 375 | 515 |
| [`hMailServer`](#hmailserver) | 34 | 0 | 2 |
| [`hMailServerNew`](#hmailservernew) | 34 | 0 | 2 |
| [`IDIQ_Platform`](#idiq_platform) | 20 | 0 | 0 |
| [`IDIQ_Platform_UAT`](#idiq_platform_uat) | 20 | 0 | 0 |
| [`NJ_RTK`](#nj_rtk) | 9 | 6 | 4 |
| [`ProcurementAnalytics`](#procurementanalytics) | 1 | 0 | 0 |
| [`SearchData`](#searchdata) | 9 | 0 | 4 |
| [`SearchData_Test`](#searchdata_test) | 9 | 0 | 4 |
| [`SolarWindsOrion`](#solarwindsorion) | 273 | 100 | 232 |
| [`test`](#test) | 0 | 0 | 0 |
| [`VendorBids`](#vendorbids) | 31 | 18 | 48 |
| [`VendorBids_TEST`](#vendorbids_test) | 31 | 18 | 48 |
| [`work`](#work) | 1 | 0 | 0 |
| [`WorkTables`](#worktables) | 266 | 0 | 1 |

## `Catalogs`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Abilitations 2014 Configurables`](tables/Catalogs/dbo.Abilitations_2014_Configurables.md) | 3351 |
| [`dbo.Cascade Image URLs`](tables/Catalogs/dbo.Cascade_Image_URLs.md) | 27691 |
| [`dbo.Cascade MSDS`](tables/Catalogs/dbo.Cascade_MSDS.md) | 10102 |
| [`dbo.CatalogImports`](tables/Catalogs/dbo.CatalogImports.md) | 405 |
| [`dbo.ChildCraft 2014 Configurables`](tables/Catalogs/dbo.ChildCraft_2014_Configurables.md) | 7840 |
| [`dbo.Grainger Feb 2018`](tables/Catalogs/dbo.Grainger_Feb_2018.md) | 1444539 |
| [`dbo.Grainger Jan 2015`](tables/Catalogs/dbo.Grainger_Jan_2015.md) | 1217944 |
| [`dbo.Grainger Jan 2016`](tables/Catalogs/dbo.Grainger_Jan_2016.md) | 1239903 |
| [`dbo.Grainger Jan 2017`](tables/Catalogs/dbo.Grainger_Jan_2017.md) | 1325502 |
| [`dbo.Grainger Jan 2017 Revised`](tables/Catalogs/dbo.Grainger_Jan_2017_Revised.md) | 1361077 |
| [`dbo.Grainger Jan 2019`](tables/Catalogs/dbo.Grainger_Jan_2019.md) | 1471345 |
| [`dbo.Grainger May 2016`](tables/Catalogs/dbo.Grainger_May_2016.md) | 1325502 |
| [`dbo.Grainger May 2017`](tables/Catalogs/dbo.Grainger_May_2017.md) | 1371372 |
| [`dbo.Grainger May 2018`](tables/Catalogs/dbo.Grainger_May_2018.md) | 1445499 |
| [`dbo.Master Catalog`](tables/Catalogs/dbo.Master_Catalog.md) | 144403830 |
| [`dbo.Middletown K-5 ETA 2015`](tables/Catalogs/dbo.Middletown_K-5_ETA_2015.md) | 114 |
| [`dbo.Middletown K-5 Scott Foresman 2015`](tables/Catalogs/dbo.Middletown_K-5_Scott_Foresman_2015.md) | 21 |
| [`dbo.Middletown MS ETA 2015`](tables/Catalogs/dbo.Middletown_MS_ETA_2015.md) | 35 |
| [`dbo.Middletown MS Prentice Hall 2015`](tables/Catalogs/dbo.Middletown_MS_Prentice_Hall_2015.md) | 8 |
| [`dbo.Middletown Science ETA 2015`](tables/Catalogs/dbo.Middletown_Science_ETA_2015.md) | 43 |
| [`dbo.MSRPTechnologyBlastTemp`](tables/Catalogs/dbo.MSRPTechnologyBlastTemp.md) | 999 |
| [`dbo.Sax 2014 Configurables`](tables/Catalogs/dbo.Sax_2014_Configurables.md) | 12875 |
| [`dbo.School Specialty 2014 Configurables`](tables/Catalogs/dbo.School_Specialty_2014_Configurables.md) | 50377 |
| [`dbo.Sportime 2014 Configurables`](tables/Catalogs/dbo.Sportime_2014_Configurables.md) | 5747 |
| [`dbo.uniqueCodes`](tables/Catalogs/dbo.uniqueCodes.md) | 331388 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.sp_CatalogCopy` | PROCEDURE |
| `dbo.sp_CatalogPrepareForPost` | PROCEDURE |
| `dbo.sp_CatalogPrePostXRef` | PROCEDURE |
| `dbo.sp_CreateHybrid` | PROCEDURE |
| `dbo.sp_MergeCatalogs` | PROCEDURE |
| `dbo.sp_PostCatalog` | PROCEDURE |
| `dbo.sp_PostCatalog6` | PROCEDURE |
| `dbo.sp_PostCatalogBackup` | PROCEDURE |
| `dbo.sp_PostCatalogBG2013` | PROCEDURE |
| `dbo.sp_PostCatalogLarge` | PROCEDURE |
| `dbo.sp_PostCatalogNew` | PROCEDURE |
| `dbo.sp_PostCatalogOrig` | PROCEDURE |
| `dbo.sp_ProcessMiddletownCatalog` | PROCEDURE |
| `dbo.sp_ReimportCatalog` | PROCEDURE |
| `dbo.sp_SyncCatalog` | PROCEDURE |
| `dbo.uf_HasExtdASCIIChars` | SCALAR FUNCTION |
| `dbo.uf_HasNonPrintableChars` | SCALAR FUNCTION |
| `dbo.uf_RemoveNonPrintableChars` | SCALAR FUNCTION |
| `dbo.uf_ReplaceNonPrintableChars` | SCALAR FUNCTION |
| `dbo.uf_TeachersDiscoveryItemCode` | SCALAR FUNCTION |
| `dbo.uf_Trim` | SCALAR FUNCTION |
| `dbo.uf_ViewDifferentChars` | SCALAR FUNCTION |
| `dbo.uf_ViewNonPrintableChars` | SCALAR FUNCTION |

## `ContentCentral`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.admLOAValidation`](tables/ContentCentral/dbo.admLOAValidation.md) | 1 |
| [`dbo.CaptureStatus`](tables/ContentCentral/dbo.CaptureStatus.md) | 1 |
| [`dbo.CatalogAdminPermission`](tables/ContentCentral/dbo.CatalogAdminPermission.md) | 1 |
| [`dbo.ContentDirectorAuthenticationNonce`](tables/ContentCentral/dbo.ContentDirectorAuthenticationNonce.md) | 0 |
| [`dbo.DragDrop`](tables/ContentCentral/dbo.DragDrop.md) | 20029 |
| [`dbo.FolderPropertiesSession`](tables/ContentCentral/dbo.FolderPropertiesSession.md) | 2 |
| [`dbo.LogEntry`](tables/ContentCentral/dbo.LogEntry.md) | 354089 |
| [`dbo.MimeType`](tables/ContentCentral/dbo.MimeType.md) | 202 |
| [`dbo.ProductVersion`](tables/ContentCentral/dbo.ProductVersion.md) | 0 |
| [`dbo.ViewState`](tables/ContentCentral/dbo.ViewState.md) | 12 |
| [`dbo.XmlKeyedSection`](tables/ContentCentral/dbo.XmlKeyedSection.md) | 26 |

### Leaf views

| View |
|------|
| [`dbo.DocumentPacketCompletion`](tables/ContentCentral/dbo.DocumentPacketCompletion.md) |
| [`dbo.DocumentPath`](tables/ContentCentral/dbo.DocumentPath.md) |
| [`dbo.vw_ScannedDocumentData`](tables/ContentCentral/dbo.vw_ScannedDocumentData.md) |
| [`dbo.vw_ScannedDocumentData1`](tables/ContentCentral/dbo.vw_ScannedDocumentData1.md) |
| [`dbo.vw_ScannedDocumentData2`](tables/ContentCentral/dbo.vw_ScannedDocumentData2.md) |
| [`dbo.vw_ScannedDocumentDataAll`](tables/ContentCentral/dbo.vw_ScannedDocumentDataAll.md) |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/ContentCentral/dbo.vw_ScannedDocumentDataMSDS.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `DeletedPOs`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.xmlData`](tables/DeletedPOs/dbo.xmlData.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `Documents`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Audit`](tables/Documents/dbo.Audit.md) | 0 |
| [`dbo.DocumentFiles`](tables/Documents/dbo.DocumentFiles.md) | 602288 |
| [`dbo.DocumentWorkFiles`](tables/Documents/dbo.DocumentWorkFiles.md) | 17741 |
| [`dbo.droppedDocs`](tables/Documents/dbo.droppedDocs.md) | 3195 |
| [`dbo.droppedFieldData`](tables/Documents/dbo.droppedFieldData.md) | 32374 |
| [`dbo.FileTypes`](tables/Documents/dbo.FileTypes.md) | 5 |
| [`dbo.ImportTasks`](tables/Documents/dbo.ImportTasks.md) | 7 |
| [`dbo.Modules`](tables/Documents/dbo.Modules.md) | 0 |
| [`dbo.RecognitionFields`](tables/Documents/dbo.RecognitionFields.md) | 0 |
| [`dbo.RecognitionZones`](tables/Documents/dbo.RecognitionZones.md) | 0 |
| [`dbo.RTK_2010NJHSL`](tables/Documents/dbo.RTK_2010NJHSL.md) | 3322 |
| [`dbo.savedFieldDataNJBRCAck`](tables/Documents/dbo.savedFieldDataNJBRCAck.md) | 1645 |
| [`dbo.sysdiagrams`](tables/Documents/dbo.sysdiagrams.md) | 1 |
| [`dbo.Vendor Bid Document Names`](tables/Documents/dbo.Vendor_Bid_Document_Names.md) | 75 |
| [`dbo.workFields`](tables/Documents/dbo.workFields.md) | 36 |
| [`dbo.ZonalActions`](tables/Documents/dbo.ZonalActions.md) | 0 |
| [`dbo.ZonalAreas`](tables/Documents/dbo.ZonalAreas.md) | 10 |
| [`dbo.ZonalEvents`](tables/Documents/dbo.ZonalEvents.md) | 84 |
| [`dbo.Zonals`](tables/Documents/dbo.Zonals.md) | 4 |

### Leaf views

| View |
|------|
| [`dbo.vw_AvailableFields`](tables/Documents/dbo.vw_AvailableFields.md) |
| [`dbo.vw_Documents`](tables/Documents/dbo.vw_Documents.md) |
| [`dbo.vw_DocumentTypeFields`](tables/Documents/dbo.vw_DocumentTypeFields.md) |
| [`dbo.vw_DocumentTypeFieldWithDatas`](tables/Documents/dbo.vw_DocumentTypeFieldWithDatas.md) |
| [`dbo.vw_DocumentTypeLookupKeys`](tables/Documents/dbo.vw_DocumentTypeLookupKeys.md) |
| [`dbo.vw_DocumentTypeLookupResults`](tables/Documents/dbo.vw_DocumentTypeLookupResults.md) |
| [`dbo.vw_DocumentTypes`](tables/Documents/dbo.vw_DocumentTypes.md) |
| [`dbo.vw_FieldDataEmpty`](tables/Documents/dbo.vw_FieldDataEmpty.md) |
| [`dbo.vw_FieldDatas`](tables/Documents/dbo.vw_FieldDatas.md) |
| [`dbo.vw_FieldDatasOrig`](tables/Documents/dbo.vw_FieldDatasOrig.md) |
| [`dbo.vw_Fields`](tables/Documents/dbo.vw_Fields.md) |
| [`dbo.vw_ViewFields`](tables/Documents/dbo.vw_ViewFields.md) |
| [`dbo.vw_Views`](tables/Documents/dbo.vw_Views.md) |
| [`dbo.vw_ViewSelectors`](tables/Documents/dbo.vw_ViewSelectors.md) |
| [`dbo.vw_ZonalItems`](tables/Documents/dbo.vw_ZonalItems.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.sp_AcceptDocs` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_DeleteDocs` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_FieldMerge` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_MultiEditCheck` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_UpdateDocumentFields` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.ufn_LookupSelectStatement` | SCALAR FUNCTION |

## `dpa_EDSAdmin`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.CON_ACTION_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_ACTION_SUM_1.md) | 0 |
| [`dbo.CON_ACTION_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_ACTION_TEN_MINUTE_1.md) | 0 |
| [`dbo.CON_AG_DATABASE`](tables/dpa_EDSAdmin/dbo.CON_AG_DATABASE.md) | 0 |
| [`dbo.CON_AG_REPLICA`](tables/dpa_EDSAdmin/dbo.CON_AG_REPLICA.md) | 0 |
| [`dbo.CON_AG_STATUS_SUMMARY`](tables/dpa_EDSAdmin/dbo.CON_AG_STATUS_SUMMARY.md) | 0 |
| [`dbo.CON_AG_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_AG_SUM_1.md) | 0 |
| [`dbo.CON_ALERT`](tables/dpa_EDSAdmin/dbo.CON_ALERT.md) | 0 |
| [`dbo.CON_ALERT_ACK`](tables/dpa_EDSAdmin/dbo.CON_ALERT_ACK.md) | 0 |
| [`dbo.CON_ALERT_DB`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB.md) | 0 |
| [`dbo.CON_ALERT_DB_RESULTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB_RESULTS.md) | 0 |
| [`dbo.CON_ALERT_DB_STATE`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB_STATE.md) | 0 |
| [`dbo.CON_ALERT_DB_STATUS_HISTORY`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB_STATUS_HISTORY.md) | 0 |
| [`dbo.CON_ALERT_GROUP`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP.md) | 0 |
| [`dbo.CON_ALERT_GROUP_ALERTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_ALERTS.md) | 0 |
| [`dbo.CON_ALERT_GROUP_DBS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_GROUP_DBS.md) | 0 |
| [`dbo.CON_ALERT_HISTORY`](tables/dpa_EDSAdmin/dbo.CON_ALERT_HISTORY.md) | 0 |
| [`dbo.CON_ALERT_HISTORY_RESULTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_HISTORY_RESULTS.md) | 0 |
| [`dbo.CON_ALERT_LEVEL`](tables/dpa_EDSAdmin/dbo.CON_ALERT_LEVEL.md) | 0 |
| [`dbo.CON_ALERT_PRM`](tables/dpa_EDSAdmin/dbo.CON_ALERT_PRM.md) | 0 |
| [`dbo.CON_ALERT_TEMPLATE`](tables/dpa_EDSAdmin/dbo.CON_ALERT_TEMPLATE.md) | 88 |
| [`dbo.CON_ALERTABLE_EVENT`](tables/dpa_EDSAdmin/dbo.CON_ALERTABLE_EVENT.md) | 0 |
| [`dbo.CON_ANOMALY_DETECTION`](tables/dpa_EDSAdmin/dbo.CON_ANOMALY_DETECTION.md) | 2880 |
| [`dbo.CON_BLOCKING_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_BLOCKING_SUM_1.md) | 83835 |
| [`dbo.CON_BLOCKING_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_BLOCKING_TEN_MINUTE_1.md) | 2162 |
| [`dbo.CON_COLOR`](tables/dpa_EDSAdmin/dbo.CON_COLOR.md) | 0 |
| [`dbo.CON_CONTACT`](tables/dpa_EDSAdmin/dbo.CON_CONTACT.md) | 5 |
| [`dbo.CON_CONTACT_CNS`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_CNS.md) | 0 |
| [`dbo.CON_CONTACT_EMAIL`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_EMAIL.md) | 1 |
| [`dbo.CON_CONTACT_GROUP`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_GROUP.md) | 0 |
| [`dbo.CON_CONTACT_SNMP`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_SNMP.md) | 0 |
| [`dbo.CON_CONTACT_WEBHOOK`](tables/dpa_EDSAdmin/dbo.CON_CONTACT_WEBHOOK.md) | 0 |
| [`dbo.CON_CRED_CYBERARK`](tables/dpa_EDSAdmin/dbo.CON_CRED_CYBERARK.md) | 0 |
| [`dbo.CON_DBUSER_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_DBUSER_SUM_1.md) | 19374 |
| [`dbo.CON_DBUSER_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_DBUSER_TEN_MINUTE_1.md) | 3231 |
| [`dbo.CON_DEADLOCK_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_1.md) | 174 |
| [`dbo.CON_DEADLOCK_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DETAIL_1.md) | 2622 |
| [`dbo.CON_DEADLOCK_DIM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_DIM_1.md) | 1529 |
| [`dbo.CON_DEADLOCK_OBJ_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_OBJ_1.md) | 30 |
| [`dbo.CON_DEADLOCK_SAMPLE_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_SAMPLE_SUM_1.md) | 361 |
| [`dbo.CON_DEADLOCK_VICTIM_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_DEADLOCK_VICTIM_SUM_1.md) | 2319 |
| [`dbo.CON_DLOCK_S_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_DLOCK_S_TEN_MINUTE_1.md) | 11 |
| [`dbo.CON_DLOCK_V_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_DLOCK_V_TEN_MINUTE_1.md) | 94 |
| [`dbo.CON_DPA_STATISTICS`](tables/dpa_EDSAdmin/dbo.CON_DPA_STATISTICS.md) | 1 |
| [`dbo.CON_EMAIL_TEMPLATE`](tables/dpa_EDSAdmin/dbo.CON_EMAIL_TEMPLATE.md) | 0 |
| [`dbo.CON_EVENT_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_EVENT_SUM_1.md) | 44117 |
| [`dbo.CON_EVENT_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_EVENT_TEN_MINUTE_1.md) | 5744 |
| [`dbo.CON_EVENTS`](tables/dpa_EDSAdmin/dbo.CON_EVENTS.md) | 0 |
| [`dbo.CON_EXCLUDED_SQL`](tables/dpa_EDSAdmin/dbo.CON_EXCLUDED_SQL.md) | 0 |
| [`dbo.CON_FILE_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_FILE_SUM_1.md) | 15587 |
| [`dbo.CON_FILE_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_FILE_TEN_MINUTE_1.md) | 1385 |
| [`dbo.CON_FIND_SQL_SHARE`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE.md) | 0 |
| [`dbo.CON_FIND_SQL_SHARE_DIM`](tables/dpa_EDSAdmin/dbo.CON_FIND_SQL_SHARE_DIM.md) | 0 |
| [`dbo.CON_FQ_OBJECT_1`](tables/dpa_EDSAdmin/dbo.CON_FQ_OBJECT_1.md) | 1017 |
| [`dbo.CON_HASH_REFRESH`](tables/dpa_EDSAdmin/dbo.CON_HASH_REFRESH.md) | 123 |
| [`dbo.CON_HISTORICAL_PLANS_1`](tables/dpa_EDSAdmin/dbo.CON_HISTORICAL_PLANS_1.md) | 0 |
| [`dbo.CON_IA_TABLE_SUMMARY_1`](tables/dpa_EDSAdmin/dbo.CON_IA_TABLE_SUMMARY_1.md) | 900 |
| [`dbo.CON_INDEX_ANALYSIS_1`](tables/dpa_EDSAdmin/dbo.CON_INDEX_ANALYSIS_1.md) | 3016 |
| [`dbo.CON_IO_DAY_1`](tables/dpa_EDSAdmin/dbo.CON_IO_DAY_1.md) | 2160 |
| [`dbo.CON_IO_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_IO_DETAIL_1.md) | 3176064 |
| [`dbo.CON_IO_EXCLUSIONS`](tables/dpa_EDSAdmin/dbo.CON_IO_EXCLUSIONS.md) | 0 |
| [`dbo.CON_IO_HOUR_1`](tables/dpa_EDSAdmin/dbo.CON_IO_HOUR_1.md) | 190472 |
| [`dbo.CON_IO_THRESHOLDS`](tables/dpa_EDSAdmin/dbo.CON_IO_THRESHOLDS.md) | 0 |
| [`dbo.CON_IPKB`](tables/dpa_EDSAdmin/dbo.CON_IPKB.md) | 0 |
| [`dbo.CON_KEY_1`](tables/dpa_EDSAdmin/dbo.CON_KEY_1.md) | 3 |
| [`dbo.CON_MACHINE_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_MACHINE_SUM_1.md) | 45245 |
| [`dbo.CON_MACHINE_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_MACHINE_TEN_MINUTE_1.md) | 4254 |
| [`dbo.CON_METRICS_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_1.md) | 48 |
| [`dbo.CON_METRICS_DAY_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DAY_1.md) | 31376 |
| [`dbo.CON_METRICS_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DETAIL_1.md) | 950453 |
| [`dbo.CON_METRICS_DISABLED`](tables/dpa_EDSAdmin/dbo.CON_METRICS_DISABLED.md) | 0 |
| [`dbo.CON_METRICS_HOUR_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_HOUR_1.md) | 101144 |
| [`dbo.CON_METRICS_NAMES_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_NAMES_1.md) | 48 |
| [`dbo.CON_METRICS_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_METRICS_TEN_MINUTE_1.md) | 200384 |
| [`dbo.CON_METRICS_THRESHOLDS`](tables/dpa_EDSAdmin/dbo.CON_METRICS_THRESHOLDS.md) | 0 |
| [`dbo.CON_MODULE_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_MODULE_SUM_1.md) | 0 |
| [`dbo.CON_MODULE_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_MODULE_TEN_MINUTE_1.md) | 0 |
| [`dbo.CON_MSSQL_DB`](tables/dpa_EDSAdmin/dbo.CON_MSSQL_DB.md) | 0 |
| [`dbo.CON_MUD`](tables/dpa_EDSAdmin/dbo.CON_MUD.md) | 0 |
| [`dbo.CON_OBJECT_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_OBJECT_SUM_1.md) | 0 |
| [`dbo.CON_OBJECT_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_OBJECT_TEN_MINUTE_1.md) | 0 |
| [`dbo.CON_ORASQLID_1`](tables/dpa_EDSAdmin/dbo.CON_ORASQLID_1.md) | 0 |
| [`dbo.CON_ORION_CREDENTIALS`](tables/dpa_EDSAdmin/dbo.CON_ORION_CREDENTIALS.md) | 0 |
| [`dbo.CON_ORION_INTEGRATION`](tables/dpa_EDSAdmin/dbo.CON_ORION_INTEGRATION.md) | 0 |
| [`dbo.CON_ORION_PENDING_NOTIFS`](tables/dpa_EDSAdmin/dbo.CON_ORION_PENDING_NOTIFS.md) | 0 |
| [`dbo.CON_ORION_SUBSCRIPTION_TAGS`](tables/dpa_EDSAdmin/dbo.CON_ORION_SUBSCRIPTION_TAGS.md) | 0 |
| [`dbo.CON_ORION_SUBSCRIPTIONS`](tables/dpa_EDSAdmin/dbo.CON_ORION_SUBSCRIPTIONS.md) | 0 |
| [`dbo.CON_OSUSER_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_OSUSER_SUM_1.md) | 32952 |
| [`dbo.CON_OSUSER_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_OSUSER_TEN_MINUTE_1.md) | 3091 |
| [`dbo.CON_PLAN_COLLECTION_SCHEDULE`](tables/dpa_EDSAdmin/dbo.CON_PLAN_COLLECTION_SCHEDULE.md) | 0 |
| [`dbo.CON_PLAN_COLLECTION_SCHEMAS`](tables/dpa_EDSAdmin/dbo.CON_PLAN_COLLECTION_SCHEMAS.md) | 0 |
| [`dbo.CON_PLAN_COLLECTION_SQLS_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_COLLECTION_SQLS_1.md) | 0 |
| [`dbo.CON_PLAN_EXCLUDED_SQLS`](tables/dpa_EDSAdmin/dbo.CON_PLAN_EXCLUDED_SQLS.md) | 0 |
| [`dbo.CON_PLAN_PREDICATES_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_PREDICATES_1.md) | 343 |
| [`dbo.CON_PLAN_SAMPLES_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_SAMPLES_1.md) | 0 |
| [`dbo.CON_PLAN_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_SUM_1.md) | 526003 |
| [`dbo.CON_PLAN_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_PLAN_TEN_MINUTE_1.md) | 34121 |
| [`dbo.CON_PROBLEM_ANALYSIS_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_ANALYSIS_1.md) | 735 |
| [`dbo.CON_PROBLEM_DETAIL_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_DETAIL_1.md) | 4354 |
| [`dbo.CON_PROBLEM_SILENCE_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_SILENCE_1.md) | 0 |
| [`dbo.CON_PROBLEM_SUMMARY_1`](tables/dpa_EDSAdmin/dbo.CON_PROBLEM_SUMMARY_1.md) | 3496 |
| [`dbo.CON_PROGRAM_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_PROGRAM_SUM_1.md) | 35813 |
| [`dbo.CON_PROGRAM_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_PROGRAM_TEN_MINUTE_1.md) | 4513 |
| [`dbo.CON_QP_EXCLUDE`](tables/dpa_EDSAdmin/dbo.CON_QP_EXCLUDE.md) | 0 |
| [`dbo.CON_RULE_ASSIGNMENT`](tables/dpa_EDSAdmin/dbo.CON_RULE_ASSIGNMENT.md) | 0 |
| [`dbo.CON_RULE_DEFINITION`](tables/dpa_EDSAdmin/dbo.CON_RULE_DEFINITION.md) | 0 |
| [`dbo.CON_SAMPLE_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_SAMPLE_SUM_1.md) | 2740 |
| [`dbo.CON_SAMPLE_TEN_MIN_EXT_1`](tables/dpa_EDSAdmin/dbo.CON_SAMPLE_TEN_MIN_EXT_1.md) | 4412 |
| [`dbo.CON_SAMPLE_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_SAMPLE_TEN_MINUTE_1.md) | 668 |
| [`dbo.CON_SQL_FINGERPRINTER_ERROR`](tables/dpa_EDSAdmin/dbo.CON_SQL_FINGERPRINTER_ERROR.md) | 0 |
| [`dbo.CON_SQL_MAP_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_MAP_1.md) | 0 |
| [`dbo.CON_SQL_MAP_T_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_MAP_T_1.md) | 0 |
| [`dbo.CON_SQL_NAME`](tables/dpa_EDSAdmin/dbo.CON_SQL_NAME.md) | 23 |
| [`dbo.CON_SQL_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_SUM_1.md) | 882122 |
| [`dbo.CON_SQL_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_SQL_TEN_MINUTE_1.md) | 56137 |
| [`dbo.CON_STATS_DAY_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_STATS_DAY_SUM_1.md) | 65464 |
| [`dbo.CON_STATS_SUM_1`](tables/dpa_EDSAdmin/dbo.CON_STATS_SUM_1.md) | 929382 |
| [`dbo.CON_STATS_TEN_MINUTE_1`](tables/dpa_EDSAdmin/dbo.CON_STATS_TEN_MINUTE_1.md) | 127110 |
| [`dbo.CON_SWIP_COUNTERS`](tables/dpa_EDSAdmin/dbo.CON_SWIP_COUNTERS.md) | 18 |
| [`dbo.CON_SWIP_DATABASE_INFO`](tables/dpa_EDSAdmin/dbo.CON_SWIP_DATABASE_INFO.md) | 1 |
| [`dbo.CON_SWIP_PRODUCT_INFO`](tables/dpa_EDSAdmin/dbo.CON_SWIP_PRODUCT_INFO.md) | 43 |
| [`dbo.CON_TABLE_CHURN_1`](tables/dpa_EDSAdmin/dbo.CON_TABLE_CHURN_1.md) | 1564 |
| [`dbo.CON_TABLE_CHURN_T1_1`](tables/dpa_EDSAdmin/dbo.CON_TABLE_CHURN_T1_1.md) | 48 |
| [`dbo.CON_TABLE_CHURN_T2_1`](tables/dpa_EDSAdmin/dbo.CON_TABLE_CHURN_T2_1.md) | 48 |
| [`dbo.CON_UPGRADE`](tables/dpa_EDSAdmin/dbo.CON_UPGRADE.md) | 1 |
| [`dbo.CON_USERKB`](tables/dpa_EDSAdmin/dbo.CON_USERKB.md) | 0 |
| [`dbo.CON_VERSION`](tables/dpa_EDSAdmin/dbo.CON_VERSION.md) | 6 |
| [`dbo.CON_WAIT_CATEGORIES`](tables/dpa_EDSAdmin/dbo.CON_WAIT_CATEGORIES.md) | 130 |
| [`dbo.CON_WHATIF_IDX_1`](tables/dpa_EDSAdmin/dbo.CON_WHATIF_IDX_1.md) | 120 |
| [`dbo.CON_WHATIF_SRC_1`](tables/dpa_EDSAdmin/dbo.CON_WHATIF_SRC_1.md) | 1589 |
| [`dbo.CON_WT_METER_HIST_1`](tables/dpa_EDSAdmin/dbo.CON_WT_METER_HIST_1.md) | 4464 |
| [`dbo.CONACT_1`](tables/dpa_EDSAdmin/dbo.CONACT_1.md) | 0 |
| [`dbo.CONAG_1`](tables/dpa_EDSAdmin/dbo.CONAG_1.md) | 0 |
| [`dbo.CONAIQ_1`](tables/dpa_EDSAdmin/dbo.CONAIQ_1.md) | 0 |
| [`dbo.CONAIQ_FEEDBACK_1`](tables/dpa_EDSAdmin/dbo.CONAIQ_FEEDBACK_1.md) | 0 |
| [`dbo.CONAUDIT`](tables/dpa_EDSAdmin/dbo.CONAUDIT.md) | 129 |
| [`dbo.CONBLACKOUT`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT.md) | 0 |
| [`dbo.CONBLACKOUT_SCHEDULE`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE.md) | 0 |
| [`dbo.CONBLACKOUT_SCHEDULE_DATA`](tables/dpa_EDSAdmin/dbo.CONBLACKOUT_SCHEDULE_DATA.md) | 0 |
| [`dbo.COND`](tables/dpa_EDSAdmin/dbo.COND.md) | 1 |
| [`dbo.COND_CPROPS`](tables/dpa_EDSAdmin/dbo.COND_CPROPS.md) | 0 |
| [`dbo.COND_CPROPS_KEYS`](tables/dpa_EDSAdmin/dbo.COND_CPROPS_KEYS.md) | 0 |
| [`dbo.COND_CPROPS_VALUES`](tables/dpa_EDSAdmin/dbo.COND_CPROPS_VALUES.md) | 0 |
| [`dbo.CONDBGROUP`](tables/dpa_EDSAdmin/dbo.CONDBGROUP.md) | 0 |
| [`dbo.CONDPRM`](tables/dpa_EDSAdmin/dbo.CONDPRM.md) | 13 |
| [`dbo.CONEV_1`](tables/dpa_EDSAdmin/dbo.CONEV_1.md) | 84 |
| [`dbo.CONEV_MAP_1`](tables/dpa_EDSAdmin/dbo.CONEV_MAP_1.md) | 83 |
| [`dbo.CONEXCLUDE_EVENTS`](tables/dpa_EDSAdmin/dbo.CONEXCLUDE_EVENTS.md) | 264 |
| [`dbo.CONF_1`](tables/dpa_EDSAdmin/dbo.CONF_1.md) | 100 |
| [`dbo.CONF_DRIVE_1`](tables/dpa_EDSAdmin/dbo.CONF_DRIVE_1.md) | 7 |
| [`dbo.CONF_DRIVE_MAP_1`](tables/dpa_EDSAdmin/dbo.CONF_DRIVE_MAP_1.md) | 95 |
| [`dbo.CONL_1`](tables/dpa_EDSAdmin/dbo.CONL_1.md) | 0 |
| [`dbo.CONLIC`](tables/dpa_EDSAdmin/dbo.CONLIC.md) | 0 |
| [`dbo.CONLIC_HISTORY`](tables/dpa_EDSAdmin/dbo.CONLIC_HISTORY.md) | 0 |
| [`dbo.CONLIC_INSTANCE_ALLOCATION`](tables/dpa_EDSAdmin/dbo.CONLIC_INSTANCE_ALLOCATION.md) | 1 |
| [`dbo.CONLOG`](tables/dpa_EDSAdmin/dbo.CONLOG.md) | 50075 |
| [`dbo.CONM_1`](tables/dpa_EDSAdmin/dbo.CONM_1.md) | 5158 |
| [`dbo.CONMETER`](tables/dpa_EDSAdmin/dbo.CONMETER.md) | 0 |
| [`dbo.CONMOD_1`](tables/dpa_EDSAdmin/dbo.CONMOD_1.md) | 0 |
| [`dbo.CONMOD_DISPLAY`](tables/dpa_EDSAdmin/dbo.CONMOD_DISPLAY.md) | 0 |
| [`dbo.CONMPT_1`](tables/dpa_EDSAdmin/dbo.CONMPT_1.md) | 0 |
| [`dbo.CONO_1`](tables/dpa_EDSAdmin/dbo.CONO_1.md) | 31 |
| [`dbo.CONOBJ_1`](tables/dpa_EDSAdmin/dbo.CONOBJ_1.md) | 2 |
| [`dbo.CONPPT_1`](tables/dpa_EDSAdmin/dbo.CONPPT_1.md) | 0 |
| [`dbo.CONPR_1`](tables/dpa_EDSAdmin/dbo.CONPR_1.md) | 84 |
| [`dbo.CONPRIVDEF`](tables/dpa_EDSAdmin/dbo.CONPRIVDEF.md) | 8 |
| [`dbo.CONPRM`](tables/dpa_EDSAdmin/dbo.CONPRM.md) | 60 |
| [`dbo.CONPT_1`](tables/dpa_EDSAdmin/dbo.CONPT_1.md) | 0 |
| [`dbo.CONPT_ATTRIBUTE_NAME_MAP`](tables/dpa_EDSAdmin/dbo.CONPT_ATTRIBUTE_NAME_MAP.md) | 2 |
| [`dbo.CONPT_ATTRIBUTES_1`](tables/dpa_EDSAdmin/dbo.CONPT_ATTRIBUTES_1.md) | 0 |
| [`dbo.CONR`](tables/dpa_EDSAdmin/dbo.CONR.md) | 0 |
| [`dbo.CONR_GROUP`](tables/dpa_EDSAdmin/dbo.CONR_GROUP.md) | 1 |
| [`dbo.CONR_GROUP_MAP`](tables/dpa_EDSAdmin/dbo.CONR_GROUP_MAP.md) | 0 |
| [`dbo.CONR_SCHEDULE`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE.md) | 1 |
| [`dbo.CONR_SCHEDULE_CONTACTS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_CONTACTS.md) | 1 |
| [`dbo.CONR_SCHEDULE_ITEMS`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_ITEMS.md) | 1 |
| [`dbo.CONR_SCHEDULE_TIMES`](tables/dpa_EDSAdmin/dbo.CONR_SCHEDULE_TIMES.md) | 2 |
| [`dbo.CONSPA_1`](tables/dpa_EDSAdmin/dbo.CONSPA_1.md) | 1938 |
| [`dbo.CONSPH_1`](tables/dpa_EDSAdmin/dbo.CONSPH_1.md) | 10805 |
| [`dbo.CONSPT_1`](tables/dpa_EDSAdmin/dbo.CONSPT_1.md) | 477480 |
| [`dbo.CONSS_1`](tables/dpa_EDSAdmin/dbo.CONSS_1.md) | 3507600 |
| [`dbo.CONST_1`](tables/dpa_EDSAdmin/dbo.CONST_1.md) | 143459 |
| [`dbo.CONST_EXAMPLE_1`](tables/dpa_EDSAdmin/dbo.CONST_EXAMPLE_1.md) | 0 |
| [`dbo.CONSW_1`](tables/dpa_EDSAdmin/dbo.CONSW_1.md) | 4377011 |
| [`dbo.CONSW_EC_1`](tables/dpa_EDSAdmin/dbo.CONSW_EC_1.md) | 0 |
| [`dbo.CONTIME`](tables/dpa_EDSAdmin/dbo.CONTIME.md) | 268692 |
| [`dbo.CONTOKEN`](tables/dpa_EDSAdmin/dbo.CONTOKEN.md) | 0 |
| [`dbo.CONTSS1_1`](tables/dpa_EDSAdmin/dbo.CONTSS1_1.md) | 1395 |
| [`dbo.CONTSS2_1`](tables/dpa_EDSAdmin/dbo.CONTSS2_1.md) | 2236 |
| [`dbo.CONTSSD_1`](tables/dpa_EDSAdmin/dbo.CONTSSD_1.md) | 2 |
| [`dbo.CONTT_1`](tables/dpa_EDSAdmin/dbo.CONTT_1.md) | 4413 |
| [`dbo.CONU_1`](tables/dpa_EDSAdmin/dbo.CONU_1.md) | 18 |
| [`dbo.CONUSER`](tables/dpa_EDSAdmin/dbo.CONUSER.md) | 1 |
| [`dbo.CONUSERGROUP`](tables/dpa_EDSAdmin/dbo.CONUSERGROUP.md) | 0 |
| [`dbo.CONUSERPRIVS`](tables/dpa_EDSAdmin/dbo.CONUSERPRIVS.md) | 5 |
| [`dbo.CONV`](tables/dpa_EDSAdmin/dbo.CONV.md) | 0 |
| [`dbo.CONV_CLUSTER`](tables/dpa_EDSAdmin/dbo.CONV_CLUSTER.md) | 0 |
| [`dbo.CONV_DATACENTER`](tables/dpa_EDSAdmin/dbo.CONV_DATACENTER.md) | 0 |
| [`dbo.CONV_DATASTORE`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE.md) | 0 |
| [`dbo.CONV_DATASTORE_DEVICES`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_DEVICES.md) | 0 |
| [`dbo.CONV_DATASTORE_HOSTS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_HOSTS.md) | 0 |
| [`dbo.CONV_DATASTORE_VMS`](tables/dpa_EDSAdmin/dbo.CONV_DATASTORE_VMS.md) | 0 |
| [`dbo.CONV_DB_RESIDENCY`](tables/dpa_EDSAdmin/dbo.CONV_DB_RESIDENCY.md) | 0 |
| [`dbo.CONV_DEVICE`](tables/dpa_EDSAdmin/dbo.CONV_DEVICE.md) | 0 |
| [`dbo.CONV_ENTITY_TIMES`](tables/dpa_EDSAdmin/dbo.CONV_ENTITY_TIMES.md) | 0 |
| [`dbo.CONV_EVENT`](tables/dpa_EDSAdmin/dbo.CONV_EVENT.md) | 0 |
| [`dbo.CONV_HOST`](tables/dpa_EDSAdmin/dbo.CONV_HOST.md) | 0 |
| [`dbo.CONV_METRICS`](tables/dpa_EDSAdmin/dbo.CONV_METRICS.md) | 34 |
| [`dbo.CONV_VM`](tables/dpa_EDSAdmin/dbo.CONV_VM.md) | 0 |
| [`dbo.CONV_VM_IPS`](tables/dpa_EDSAdmin/dbo.CONV_VM_IPS.md) | 0 |
| [`dbo.CONV_VM_RESIDENCY`](tables/dpa_EDSAdmin/dbo.CONV_VM_RESIDENCY.md) | 0 |
| [`dbo.CONVPRM`](tables/dpa_EDSAdmin/dbo.CONVPRM.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `EDS`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`archive.allitems`](tables/EDS/archive.allitems.md) | 0 |
| [`archive.Approvals`](tables/EDS/archive.Approvals.md) | 3517361 |
| [`archive.ApprovalsHistory`](tables/EDS/archive.ApprovalsHistory.md) | 447389 |
| [`archive.Awards`](tables/EDS/archive.Awards.md) | 143977 |
| [`archive.BatchDetail`](tables/EDS/archive.BatchDetail.md) | 4060286 |
| [`archive.BidHeaderCheckList`](tables/EDS/archive.BidHeaderCheckList.md) | 4521 |
| [`archive.BidHeaderDetail`](tables/EDS/archive.BidHeaderDetail.md) | 26252593 |
| [`archive.BidHeaderDocument`](tables/EDS/archive.BidHeaderDocument.md) | 11787 |
| [`archive.BidHeaderDocuments`](tables/EDS/archive.BidHeaderDocuments.md) | 0 |
| [`archive.BidHeaders`](tables/EDS/archive.BidHeaders.md) | 3395 |
| [`archive.BidImports`](tables/EDS/archive.BidImports.md) | 42011 |
| [`archive.BidMappedItems`](tables/EDS/archive.BidMappedItems.md) | 0 |
| [`archive.BidMSRPResults`](tables/EDS/archive.BidMSRPResults.md) | 10848 |
| [`archive.BidReawards`](tables/EDS/archive.BidReawards.md) | 0 |
| [`archive.BidRequestItems`](tables/EDS/archive.BidRequestItems.md) | 5704577 |
| [`archive.BidRequestManufacturer`](tables/EDS/archive.BidRequestManufacturer.md) | 0 |
| [`archive.BidRequestOptions`](tables/EDS/archive.BidRequestOptions.md) | 0 |
| [`archive.BidRequestPriceRanges`](tables/EDS/archive.BidRequestPriceRanges.md) | 0 |
| [`archive.BidResults`](tables/EDS/archive.BidResults.md) | 30585282 |
| [`archive.Bids`](tables/EDS/archive.Bids.md) | 172256 |
| [`archive.BidTrades`](tables/EDS/archive.BidTrades.md) | 119 |
| [`archive.Catalog`](tables/EDS/archive.Catalog.md) | 2422 |
| [`archive.cxmlSession`](tables/EDS/archive.cxmlSession.md) | 50022 |
| [`archive.Detail`](tables/EDS/archive.Detail.md) | 25480018 |
| [`archive.DetailHold`](tables/EDS/archive.DetailHold.md) | 0 |
| [`archive.DetailMatch`](tables/EDS/archive.DetailMatch.md) | 1499 |
| [`archive.DMSBidDocuments`](tables/EDS/archive.DMSBidDocuments.md) | 0 |
| [`archive.DMSVendorBidDocuments`](tables/EDS/archive.DMSVendorBidDocuments.md) | 0 |
| [`archive.FreezeItems`](tables/EDS/archive.FreezeItems.md) | 0 |
| [`archive.ItemContractPrices`](tables/EDS/archive.ItemContractPrices.md) | 0 |
| [`archive.OrderBooks`](tables/EDS/archive.OrderBooks.md) | 692 |
| [`archive.PO`](tables/EDS/archive.PO.md) | 1300617 |
| [`archive.PODetailItems`](tables/EDS/archive.PODetailItems.md) | 22905929 |
| [`archive.POTempDetails`](tables/EDS/archive.POTempDetails.md) | 0 |
| [`archive.Prices`](tables/EDS/archive.Prices.md) | 0 |
| [`archive.PricingConsolidatedOrderCounts`](tables/EDS/archive.PricingConsolidatedOrderCounts.md) | 0 |
| [`archive.PricingMap`](tables/EDS/archive.PricingMap.md) | 0 |
| [`archive.PricingUpdate`](tables/EDS/archive.PricingUpdate.md) | 0 |
| [`archive.RequisitionChangeLog`](tables/EDS/archive.RequisitionChangeLog.md) | 1936897 |
| [`archive.Requisitions`](tables/EDS/archive.Requisitions.md) | 1433904 |
| [`archive.TMAwards`](tables/EDS/archive.TMAwards.md) | 29335 |
| [`archive.UserAccounts`](tables/EDS/archive.UserAccounts.md) | 2704140 |
| [`archive.UserAccountsUserAccountId_CrossMapping`](tables/EDS/archive.UserAccountsUserAccountId_CrossMapping.md) | 2704140 |
| [`archive.VendorDocRequest`](tables/EDS/archive.VendorDocRequest.md) | 0 |
| [`archive.VendorDocRequestDetail`](tables/EDS/archive.VendorDocRequestDetail.md) | 0 |
| [`archive.VendorQuery`](tables/EDS/archive.VendorQuery.md) | 4057 |
| [`archive.VendorQueryDetail`](tables/EDS/archive.VendorQueryDetail.md) | 39321 |
| [`archive.VendorQueryMSRP`](tables/EDS/archive.VendorQueryMSRP.md) | 0 |
| [`archive.VendorQueryMSRPDetail`](tables/EDS/archive.VendorQueryMSRPDetail.md) | 0 |
| [`archive.VendorQueryTandM`](tables/EDS/archive.VendorQueryTandM.md) | 7 |
| [`archive.VendorQueryTandMDetail`](tables/EDS/archive.VendorQueryTandMDetail.md) | 0 |
| [`dbo.AccountingDetail`](tables/EDS/dbo.AccountingDetail.md) | 0 |
| [`dbo.AccountingFormats`](tables/EDS/dbo.AccountingFormats.md) | 49 |
| [`dbo.AccountingUserFields`](tables/EDS/dbo.AccountingUserFields.md) | 80 |
| [`dbo.AccountSeparators`](tables/EDS/dbo.AccountSeparators.md) | 0 |
| [`dbo.AddendumItems`](tables/EDS/dbo.AddendumItems.md) | 0 |
| [`dbo.additems`](tables/EDS/dbo.additems.md) | 0 |
| [`dbo.Alerts`](tables/EDS/dbo.Alerts.md) | 4 |
| [`dbo.allitems`](tables/EDS/dbo.allitems.md) | 6276768 |
| [`dbo.AnswerTypes`](tables/EDS/dbo.AnswerTypes.md) | 0 |
| [`dbo.ApprovalLevels`](tables/EDS/dbo.ApprovalLevels.md) | 9 |
| [`dbo.Approvals`](tables/EDS/dbo.Approvals.md) | 8043824 |
| [`dbo.ApprovalsHistory`](tables/EDS/dbo.ApprovalsHistory.md) | 341764 |
| [`dbo.Audit`](tables/EDS/dbo.Audit.md) | 2568656 |
| [`dbo.AuditLog`](tables/EDS/dbo.AuditLog.md) | 0 |
| [`dbo.Awardings`](tables/EDS/dbo.Awardings.md) | 11450 |
| [`dbo.Awards`](tables/EDS/dbo.Awards.md) | 139138 |
| [`dbo.AwardsCatalogList`](tables/EDS/dbo.AwardsCatalogList.md) | 84677 |
| [`dbo.AwardTypes`](tables/EDS/dbo.AwardTypes.md) | 2 |
| [`dbo.BatchBook`](tables/EDS/dbo.BatchBook.md) | 217611 |
| [`dbo.BatchDetail`](tables/EDS/dbo.BatchDetail.md) | 5020036 |
| [`dbo.BatchDetailInserts`](tables/EDS/dbo.BatchDetailInserts.md) | 1176 |
| [`dbo.Batches`](tables/EDS/dbo.Batches.md) | 14507 |
| [`dbo.BidCalendar`](tables/EDS/dbo.BidCalendar.md) | 1 |
| [`dbo.BidderCheckList`](tables/EDS/dbo.BidderCheckList.md) | 140 |
| [`dbo.BidderCheckListPkgDetail`](tables/EDS/dbo.BidderCheckListPkgDetail.md) | 1195 |
| [`dbo.BidderCheckListPkgHeader`](tables/EDS/dbo.BidderCheckListPkgHeader.md) | 56 |
| [`dbo.BidDocument`](tables/EDS/dbo.BidDocument.md) | 10693 |
| [`dbo.BidDocumentTypes`](tables/EDS/dbo.BidDocumentTypes.md) | 298 |
| [`dbo.BidHeaderCheckList`](tables/EDS/dbo.BidHeaderCheckList.md) | 112432 |
| [`dbo.BidHeaderDetail`](tables/EDS/dbo.BidHeaderDetail.md) | 123803821 |
| [`dbo.BidHeaderDetail_Orig`](tables/EDS/dbo.BidHeaderDetail_Orig.md) | 102658927 |
| [`dbo.BidHeaderDocument`](tables/EDS/dbo.BidHeaderDocument.md) | 164275 |
| [`dbo.BidHeaderDocuments`](tables/EDS/dbo.BidHeaderDocuments.md) | 1 |
| [`dbo.BidImportCatalogList`](tables/EDS/dbo.BidImportCatalogList.md) | 32912 |
| [`dbo.BidImportCounties`](tables/EDS/dbo.BidImportCounties.md) | 65169 |
| [`dbo.BidImports`](tables/EDS/dbo.BidImports.md) | 55605 |
| [`dbo.BidItems`](tables/EDS/dbo.BidItems.md) | 27457031 |
| [`dbo.BidManagers`](tables/EDS/dbo.BidManagers.md) | 0 |
| [`dbo.BidManufacturers`](tables/EDS/dbo.BidManufacturers.md) | 253038 |
| [`dbo.BidMappedItems`](tables/EDS/dbo.BidMappedItems.md) | 1035546 |
| [`dbo.BidMgrConfiguration`](tables/EDS/dbo.BidMgrConfiguration.md) | 1 |
| [`dbo.BidMgrTagFile`](tables/EDS/dbo.BidMgrTagFile.md) | 4440500 |
| [`dbo.BidMSRPResultPrices`](tables/EDS/dbo.BidMSRPResultPrices.md) | 422692 |
| [`dbo.BidMSRPResults`](tables/EDS/dbo.BidMSRPResults.md) | 40980 |
| [`dbo.BidMSRPResultsProductLines`](tables/EDS/dbo.BidMSRPResultsProductLines.md) | 110442 |
| [`dbo.BidPackage`](tables/EDS/dbo.BidPackage.md) | 51 |
| [`dbo.BidPackageDocument`](tables/EDS/dbo.BidPackageDocument.md) | 1452 |
| [`dbo.BidProductLinePrices`](tables/EDS/dbo.BidProductLinePrices.md) | 1332652 |
| [`dbo.BidProductLines`](tables/EDS/dbo.BidProductLines.md) | 287890 |
| [`dbo.BidReawards`](tables/EDS/dbo.BidReawards.md) | 615 |
| [`dbo.BidRequestItemMergeActions`](tables/EDS/dbo.BidRequestItemMergeActions.md) | 36542 |
| [`dbo.BidRequestItemMergeActions_Orig`](tables/EDS/dbo.BidRequestItemMergeActions_Orig.md) | 27168 |
| [`dbo.BidRequestItemMergeActions_Saved_101521`](tables/EDS/dbo.BidRequestItemMergeActions_Saved_101521.md) | 27298 |
| [`dbo.BidRequestItems`](tables/EDS/dbo.BidRequestItems.md) | 27869374 |
| [`dbo.BidRequestItems_Orig`](tables/EDS/dbo.BidRequestItems_Orig.md) | 25521585 |
| [`dbo.BidRequestOptions`](tables/EDS/dbo.BidRequestOptions.md) | 422035 |
| [`dbo.BidRequestPriceRanges`](tables/EDS/dbo.BidRequestPriceRanges.md) | 1897760 |
| [`dbo.BidRequestProductLines`](tables/EDS/dbo.BidRequestProductLines.md) | 175875 |
| [`dbo.BidResponses`](tables/EDS/dbo.BidResponses.md) | 1 |
| [`dbo.BidResultChanges`](tables/EDS/dbo.BidResultChanges.md) | 18229521 |
| [`dbo.BidResults`](tables/EDS/dbo.BidResults.md) | 33204670 |
| [`dbo.BidResults_Orig`](tables/EDS/dbo.BidResults_Orig.md) | 55592743 |
| [`dbo.BidResultsChangeLog`](tables/EDS/dbo.BidResultsChangeLog.md) | 242431 |
| [`dbo.Bids`](tables/EDS/dbo.Bids.md) | 147225 |
| [`dbo.BidsCatalogList`](tables/EDS/dbo.BidsCatalogList.md) | 84842 |
| [`dbo.BidTradeCounties`](tables/EDS/dbo.BidTradeCounties.md) | 42912 |
| [`dbo.BidTypes`](tables/EDS/dbo.BidTypes.md) | 2 |
| [`dbo.BookTypes`](tables/EDS/dbo.BookTypes.md) | 4 |
| [`dbo.CalDistricts`](tables/EDS/dbo.CalDistricts.md) | 0 |
| [`dbo.CalendarDates`](tables/EDS/dbo.CalendarDates.md) | 2261 |
| [`dbo.CalendarIB`](tables/EDS/dbo.CalendarIB.md) | 684 |
| [`dbo.CalendarItems`](tables/EDS/dbo.CalendarItems.md) | 0 |
| [`dbo.Calendars`](tables/EDS/dbo.Calendars.md) | 300 |
| [`dbo.CalendarTypes`](tables/EDS/dbo.CalendarTypes.md) | 2 |
| [`dbo.Carolina Living Items`](tables/EDS/dbo.Carolina_Living_Items.md) | 2017 |
| [`dbo.CatalogImportFields`](tables/EDS/dbo.CatalogImportFields.md) | 15 |
| [`dbo.CatalogImportMap`](tables/EDS/dbo.CatalogImportMap.md) | 0 |
| [`dbo.CatalogPricing`](tables/EDS/dbo.CatalogPricing.md) | 0 |
| [`dbo.CatalogText`](tables/EDS/dbo.CatalogText.md) | 112799 |
| [`dbo.CatalogTextParts`](tables/EDS/dbo.CatalogTextParts.md) | 17179537 |
| [`dbo.CatList`](tables/EDS/dbo.CatList.md) | 155059 |
| [`dbo.CertificateAuthority`](tables/EDS/dbo.CertificateAuthority.md) | 1 |
| [`dbo.ChargeTypes`](tables/EDS/dbo.ChargeTypes.md) | 14 |
| [`dbo.CommonMSRPVendorQuery`](tables/EDS/dbo.CommonMSRPVendorQuery.md) | 4 |
| [`dbo.CommonTandMVendorQuery`](tables/EDS/dbo.CommonTandMVendorQuery.md) | 22 |
| [`dbo.CommonVendorQuery`](tables/EDS/dbo.CommonVendorQuery.md) | 43 |
| [`dbo.CommonVendorQueryAnswer`](tables/EDS/dbo.CommonVendorQueryAnswer.md) | 0 |
| [`dbo.ContractTypes`](tables/EDS/dbo.ContractTypes.md) | 0 |
| [`dbo.Control`](tables/EDS/dbo.Control.md) | 1 |
| [`dbo.Coops`](tables/EDS/dbo.Coops.md) | 20 |
| [`dbo.CopyRequests`](tables/EDS/dbo.CopyRequests.md) | 24667 |
| [`dbo.Counties`](tables/EDS/dbo.Counties.md) | 78 |
| [`dbo.CoverView`](tables/EDS/dbo.CoverView.md) | 0 |
| [`dbo.CrossRefs`](tables/EDS/dbo.CrossRefs.md) | 171650155 |
| [`dbo.CSCommands`](tables/EDS/dbo.CSCommands.md) | 16 |
| [`dbo.CSMessageFiles`](tables/EDS/dbo.CSMessageFiles.md) | 0 |
| [`dbo.CSMessages`](tables/EDS/dbo.CSMessages.md) | 12207 |
| [`dbo.CSRep`](tables/EDS/dbo.CSRep.md) | 45 |
| [`dbo.CXmlSession`](tables/EDS/dbo.CXmlSession.md) | 66748 |
| [`dbo.dchtest`](tables/EDS/dbo.dchtest.md) | 1192 |
| [`dbo.DebugMsgs`](tables/EDS/dbo.DebugMsgs.md) | 23728146 |
| [`dbo.DebugMsgs_Orig`](tables/EDS/dbo.DebugMsgs_Orig.md) | 5211696 |
| [`dbo.DetailChangeLog`](tables/EDS/dbo.DetailChangeLog.md) | 2926279 |
| [`dbo.DetailChanges`](tables/EDS/dbo.DetailChanges.md) | 26502061 |
| [`dbo.DetailHold`](tables/EDS/dbo.DetailHold.md) | 1 |
| [`dbo.DetailMatch`](tables/EDS/dbo.DetailMatch.md) | 103534 |
| [`dbo.DetailNotifications`](tables/EDS/dbo.DetailNotifications.md) | 2992927 |
| [`dbo.DetailUploads`](tables/EDS/dbo.DetailUploads.md) | 0 |
| [`dbo.DistrictCategories`](tables/EDS/dbo.DistrictCategories.md) | 126493 |
| [`dbo.DistrictCategoryTitles`](tables/EDS/dbo.DistrictCategoryTitles.md) | 0 |
| [`dbo.DistrictCharges`](tables/EDS/dbo.DistrictCharges.md) | 22494 |
| [`dbo.DistrictChargesNotes`](tables/EDS/dbo.DistrictChargesNotes.md) | 0 |
| [`dbo.DistrictContacts`](tables/EDS/dbo.DistrictContacts.md) | 3848 |
| [`dbo.DistrictContactTypes`](tables/EDS/dbo.DistrictContactTypes.md) | 7 |
| [`dbo.DistrictContinuances`](tables/EDS/dbo.DistrictContinuances.md) | 14461 |
| [`dbo.DistrictNotes`](tables/EDS/dbo.DistrictNotes.md) | 77 |
| [`dbo.DistrictNoteType`](tables/EDS/dbo.DistrictNoteType.md) | 3 |
| [`dbo.DistrictNotifications`](tables/EDS/dbo.DistrictNotifications.md) | 6087 |
| [`dbo.DistrictProposedCharges`](tables/EDS/dbo.DistrictProposedCharges.md) | 12019 |
| [`dbo.DistrictReports`](tables/EDS/dbo.DistrictReports.md) | 11 |
| [`dbo.DistrictTypes`](tables/EDS/dbo.DistrictTypes.md) | 6 |
| [`dbo.DMSBidDocuments`](tables/EDS/dbo.DMSBidDocuments.md) | 29251 |
| [`dbo.DMSSDSDocuments`](tables/EDS/dbo.DMSSDSDocuments.md) | 602 |
| [`dbo.DMSVendorBidDocuments`](tables/EDS/dbo.DMSVendorBidDocuments.md) | 750489 |
| [`dbo.DMSVendorDocuments`](tables/EDS/dbo.DMSVendorDocuments.md) | 6485 |
| [`dbo.EmailBlast`](tables/EDS/dbo.EmailBlast.md) | 18136 |
| [`dbo.EmailBlastAddresses08132012`](tables/EDS/dbo.EmailBlastAddresses08132012.md) | 271 |
| [`dbo.EmailBlastCopy`](tables/EDS/dbo.EmailBlastCopy.md) | 3 |
| [`dbo.EmailBlastLog`](tables/EDS/dbo.EmailBlastLog.md) | 1546825 |
| [`dbo.FreezeItems`](tables/EDS/dbo.FreezeItems.md) | 15435 |
| [`dbo.FreezeItems2015`](tables/EDS/dbo.FreezeItems2015.md) | 105962 |
| [`dbo.HeaderWorkItems`](tables/EDS/dbo.HeaderWorkItems.md) | 491824 |
| [`dbo.Headings`](tables/EDS/dbo.Headings.md) | 305979 |
| [`dbo.HolidayCalendar`](tables/EDS/dbo.HolidayCalendar.md) | 29 |
| [`dbo.HolidayCalendarVendor`](tables/EDS/dbo.HolidayCalendarVendor.md) | 7 |
| [`dbo.ImageErrors`](tables/EDS/dbo.ImageErrors.md) | 26727 |
| [`dbo.ImageLog`](tables/EDS/dbo.ImageLog.md) | 1788706 |
| [`dbo.Images`](tables/EDS/dbo.Images.md) | 1736177 |
| [`dbo.ImportCatalogDetail`](tables/EDS/dbo.ImportCatalogDetail.md) | 18658 |
| [`dbo.ImportCatalogHeader`](tables/EDS/dbo.ImportCatalogHeader.md) | 2980 |
| [`dbo.ImportDetail`](tables/EDS/dbo.ImportDetail.md) | 882935 |
| [`dbo.ImportMessages`](tables/EDS/dbo.ImportMessages.md) | 5500 |
| [`dbo.ImportProcesses`](tables/EDS/dbo.ImportProcesses.md) | 754 |
| [`dbo.Imports`](tables/EDS/dbo.Imports.md) | 301 |
| [`dbo.InstructionBookContents`](tables/EDS/dbo.InstructionBookContents.md) | 31 |
| [`dbo.InstructionBookTypes`](tables/EDS/dbo.InstructionBookTypes.md) | 6 |
| [`dbo.Instructions`](tables/EDS/dbo.Instructions.md) | 7 |
| [`dbo.Invoices`](tables/EDS/dbo.Invoices.md) | 0 |
| [`dbo.InvoiceTypes`](tables/EDS/dbo.InvoiceTypes.md) | 0 |
| [`dbo.IPQueue`](tables/EDS/dbo.IPQueue.md) | 5046 |
| [`dbo.IPQueueUsers`](tables/EDS/dbo.IPQueueUsers.md) | 489930 |
| [`dbo.ItemContractPrices`](tables/EDS/dbo.ItemContractPrices.md) | 0 |
| [`dbo.ItemDocuments`](tables/EDS/dbo.ItemDocuments.md) | 0 |
| [`dbo.Items`](tables/EDS/dbo.Items.md) | 43965968 |
| [`dbo.ItemUpdates`](tables/EDS/dbo.ItemUpdates.md) | 198886 |
| [`dbo.jSessions`](tables/EDS/dbo.jSessions.md) | 0 |
| [`dbo.Keywords`](tables/EDS/dbo.Keywords.md) | 25267 |
| [`dbo.Ledger`](tables/EDS/dbo.Ledger.md) | 0 |
| [`dbo.LL_RepArea`](tables/EDS/dbo.LL_RepArea.md) | 0 |
| [`dbo.LL_RepLay`](tables/EDS/dbo.LL_RepLay.md) | 0 |
| [`dbo.ManufacturerProductLines`](tables/EDS/dbo.ManufacturerProductLines.md) | 14298 |
| [`dbo.Manufacturers`](tables/EDS/dbo.Manufacturers.md) | 9007 |
| [`dbo.MappedItems`](tables/EDS/dbo.MappedItems.md) | 2 |
| [`dbo.Menus`](tables/EDS/dbo.Menus.md) | 4 |
| [`dbo.Messages`](tables/EDS/dbo.Messages.md) | 0 |
| [`dbo.Months`](tables/EDS/dbo.Months.md) | 12 |
| [`dbo.MSRPExcelExport`](tables/EDS/dbo.MSRPExcelExport.md) | 563 |
| [`dbo.MSRPExcelImport`](tables/EDS/dbo.MSRPExcelImport.md) | 76315 |
| [`dbo.MSRPOptions`](tables/EDS/dbo.MSRPOptions.md) | 12 |
| [`dbo.NextNumber`](tables/EDS/dbo.NextNumber.md) | 24790 |
| [`dbo.NotificationOptions`](tables/EDS/dbo.NotificationOptions.md) | 4 |
| [`dbo.Notifications`](tables/EDS/dbo.Notifications.md) | 720 |
| [`dbo.OBPrices`](tables/EDS/dbo.OBPrices.md) | 0 |
| [`dbo.OBView`](tables/EDS/dbo.OBView.md) | 0 |
| [`dbo.Options`](tables/EDS/dbo.Options.md) | 0 |
| [`dbo.OptionsLink`](tables/EDS/dbo.OptionsLink.md) | 0 |
| [`dbo.OrderBookAlwaysAdd`](tables/EDS/dbo.OrderBookAlwaysAdd.md) | 9 |
| [`dbo.OrderBookDetail`](tables/EDS/dbo.OrderBookDetail.md) | 37829973 |
| [`dbo.OrderBookDetailOld`](tables/EDS/dbo.OrderBookDetailOld.md) | 187630151 |
| [`dbo.OrderBookLog`](tables/EDS/dbo.OrderBookLog.md) | 474353 |
| [`dbo.OrderBooks`](tables/EDS/dbo.OrderBooks.md) | 30478 |
| [`dbo.OrderBookTypes`](tables/EDS/dbo.OrderBookTypes.md) | 12 |
| [`dbo.Payments`](tables/EDS/dbo.Payments.md) | 0 |
| [`dbo.PaymentTypes`](tables/EDS/dbo.PaymentTypes.md) | 0 |
| [`dbo.PendingApprovals`](tables/EDS/dbo.PendingApprovals.md) | 585350 |
| [`dbo.POIDTable`](tables/EDS/dbo.POIDTable.md) | 0 |
| [`dbo.POLayoutDetail`](tables/EDS/dbo.POLayoutDetail.md) | 6856 |
| [`dbo.POLayoutFields`](tables/EDS/dbo.POLayoutFields.md) | 56 |
| [`dbo.POLayouts`](tables/EDS/dbo.POLayouts.md) | 636 |
| [`dbo.POPageSummary`](tables/EDS/dbo.POPageSummary.md) | 73456 |
| [`dbo.POPrintTaggedPOFile`](tables/EDS/dbo.POPrintTaggedPOFile.md) | 121202 |
| [`dbo.POQueue`](tables/EDS/dbo.POQueue.md) | 27088 |
| [`dbo.POQueueItems`](tables/EDS/dbo.POQueueItems.md) | 400659 |
| [`dbo.POStatus`](tables/EDS/dbo.POStatus.md) | 413180 |
| [`dbo.POStatusTable`](tables/EDS/dbo.POStatusTable.md) | 0 |
| [`dbo.PostCatalogDetail`](tables/EDS/dbo.PostCatalogDetail.md) | 42638 |
| [`dbo.PostCatalogHeader`](tables/EDS/dbo.PostCatalogHeader.md) | 3610 |
| [`dbo.POTemp`](tables/EDS/dbo.POTemp.md) | 37 |
| [`dbo.POTempDetails`](tables/EDS/dbo.POTempDetails.md) | 4014 |
| [`dbo.PPCatalogs`](tables/EDS/dbo.PPCatalogs.md) | 1665 |
| [`dbo.PPCategory`](tables/EDS/dbo.PPCategory.md) | 1458 |
| [`dbo.PriceHolds`](tables/EDS/dbo.PriceHolds.md) | 0 |
| [`dbo.PriceListTypes`](tables/EDS/dbo.PriceListTypes.md) | 2 |
| [`dbo.PriceRanges`](tables/EDS/dbo.PriceRanges.md) | 120619 |
| [`dbo.PricingAddenda`](tables/EDS/dbo.PricingAddenda.md) | 209797 |
| [`dbo.PricingConsolidatedOrderCounts`](tables/EDS/dbo.PricingConsolidatedOrderCounts.md) | 401387 |
| [`dbo.PricingMap`](tables/EDS/dbo.PricingMap.md) | 0 |
| [`dbo.PricingUpdate`](tables/EDS/dbo.PricingUpdate.md) | 60312 |
| [`dbo.PrintDocuments`](tables/EDS/dbo.PrintDocuments.md) | 0 |
| [`dbo.Printers`](tables/EDS/dbo.Printers.md) | 18 |
| [`dbo.ProductVerificationResults`](tables/EDS/dbo.ProductVerificationResults.md) | 206645 |
| [`dbo.ProjectTasks`](tables/EDS/dbo.ProjectTasks.md) | 14 |
| [`dbo.QuestionnaireResponses`](tables/EDS/dbo.QuestionnaireResponses.md) | 0 |
| [`dbo.Rates`](tables/EDS/dbo.Rates.md) | 0 |
| [`dbo.RateTypes`](tables/EDS/dbo.RateTypes.md) | 0 |
| [`dbo.RateUnits`](tables/EDS/dbo.RateUnits.md) | 0 |
| [`dbo.Receiving`](tables/EDS/dbo.Receiving.md) | 0 |
| [`dbo.ReportSession`](tables/EDS/dbo.ReportSession.md) | 5446508 |
| [`dbo.ReportSessionLinks`](tables/EDS/dbo.ReportSessionLinks.md) | 52725220 |
| [`dbo.ReqAudit`](tables/EDS/dbo.ReqAudit.md) | 0 |
| [`dbo.RequisitionChangeLog`](tables/EDS/dbo.RequisitionChangeLog.md) | 1938501 |
| [`dbo.RequisitionNoteEmails`](tables/EDS/dbo.RequisitionNoteEmails.md) | 16691 |
| [`dbo.RequisitionNotes`](tables/EDS/dbo.RequisitionNotes.md) | 25482 |
| [`dbo.ResetPasswordTracking`](tables/EDS/dbo.ResetPasswordTracking.md) | 125046 |
| [`dbo.Rights`](tables/EDS/dbo.Rights.md) | 0 |
| [`dbo.RightsLink`](tables/EDS/dbo.RightsLink.md) | 0 |
| [`dbo.RTK_2010NJHSL`](tables/EDS/dbo.RTK_2010NJHSL.md) | 3322 |
| [`dbo.RTK_CASFile`](tables/EDS/dbo.RTK_CASFile.md) | 7881 |
| [`dbo.RTK_ContainerCodes`](tables/EDS/dbo.RTK_ContainerCodes.md) | 21 |
| [`dbo.RTK_Documents`](tables/EDS/dbo.RTK_Documents.md) | 0 |
| [`dbo.RTK_FactSheets`](tables/EDS/dbo.RTK_FactSheets.md) | 2459 |
| [`dbo.RTK_HealthHazardCodes`](tables/EDS/dbo.RTK_HealthHazardCodes.md) | 9 |
| [`dbo.RTK_Inventories`](tables/EDS/dbo.RTK_Inventories.md) | 658 |
| [`dbo.RTK_InventoryRangeCodes`](tables/EDS/dbo.RTK_InventoryRangeCodes.md) | 12 |
| [`dbo.RTK_Items`](tables/EDS/dbo.RTK_Items.md) | 64627 |
| [`dbo.RTK_LegacyDistrictCodesMap`](tables/EDS/dbo.RTK_LegacyDistrictCodesMap.md) | 78 |
| [`dbo.RTK_LegacySchoolFile`](tables/EDS/dbo.RTK_LegacySchoolFile.md) | 6766 |
| [`dbo.RTK_MixtureCodes`](tables/EDS/dbo.RTK_MixtureCodes.md) | 11 |
| [`dbo.RTK_MSDSDetail`](tables/EDS/dbo.RTK_MSDSDetail.md) | 151665 |
| [`dbo.RTK_Purposes`](tables/EDS/dbo.RTK_Purposes.md) | 35 |
| [`dbo.RTK_ReportItems`](tables/EDS/dbo.RTK_ReportItems.md) | 1006140 |
| [`dbo.RTK_Sites`](tables/EDS/dbo.RTK_Sites.md) | 823 |
| [`dbo.RTK_Surveys`](tables/EDS/dbo.RTK_Surveys.md) | 0 |
| [`dbo.RTK_Training`](tables/EDS/dbo.RTK_Training.md) | 0 |
| [`dbo.RTK_UOMCodes`](tables/EDS/dbo.RTK_UOMCodes.md) | 3 |
| [`dbo.RTK_VendorLinks`](tables/EDS/dbo.RTK_VendorLinks.md) | 0 |
| [`dbo.SafetyDataSheets`](tables/EDS/dbo.SafetyDataSheets.md) | 158524 |
| [`dbo.Salutations`](tables/EDS/dbo.Salutations.md) | 5 |
| [`dbo.SaxDups`](tables/EDS/dbo.SaxDups.md) | 31171 |
| [`dbo.SaxNotifications`](tables/EDS/dbo.SaxNotifications.md) | 78 |
| [`dbo.ScanEvents`](tables/EDS/dbo.ScanEvents.md) | 395703 |
| [`dbo.ScanJobs`](tables/EDS/dbo.ScanJobs.md) | 3 |
| [`dbo.ScannerZones`](tables/EDS/dbo.ScannerZones.md) | 10 |
| [`dbo.ScheduledTask`](tables/EDS/dbo.ScheduledTask.md) | 12 |
| [`dbo.ScheduleTypes`](tables/EDS/dbo.ScheduleTypes.md) | 10 |
| [`dbo.SDS_Rpt_Bridge`](tables/EDS/dbo.SDS_Rpt_Bridge.md) | 100 |
| [`dbo.SDSDocs`](tables/EDS/dbo.SDSDocs.md) | 161387 |
| [`dbo.SDSErrors`](tables/EDS/dbo.SDSErrors.md) | 0 |
| [`dbo.SDSLog`](tables/EDS/dbo.SDSLog.md) | 0 |
| [`dbo.SDSResults`](tables/EDS/dbo.SDSResults.md) | 116893 |
| [`dbo.SDSs`](tables/EDS/dbo.SDSs.md) | 0 |
| [`dbo.SDSSyncStatus`](tables/EDS/dbo.SDSSyncStatus.md) | 26483 |
| [`dbo.SearchKeywords`](tables/EDS/dbo.SearchKeywords.md) | 0 |
| [`dbo.SearchSets`](tables/EDS/dbo.SearchSets.md) | 44494 |
| [`dbo.Sections`](tables/EDS/dbo.Sections.md) | 18 |
| [`dbo.SecurityKeys`](tables/EDS/dbo.SecurityKeys.md) | 14 |
| [`dbo.SecurityRoleKeys`](tables/EDS/dbo.SecurityRoleKeys.md) | 65 |
| [`dbo.SecurityRoles`](tables/EDS/dbo.SecurityRoles.md) | 5 |
| [`dbo.SecurityRoleUsers`](tables/EDS/dbo.SecurityRoleUsers.md) | 364908 |
| [`dbo.Services`](tables/EDS/dbo.Services.md) | 0 |
| [`dbo.SessionCmds`](tables/EDS/dbo.SessionCmds.md) | 0 |
| [`dbo.SessionTable`](tables/EDS/dbo.SessionTable.md) | 12809526 |
| [`dbo.ShipLocations`](tables/EDS/dbo.ShipLocations.md) | 6924 |
| [`dbo.ShippingCosts`](tables/EDS/dbo.ShippingCosts.md) | 1113 |
| [`dbo.ShippingRequests`](tables/EDS/dbo.ShippingRequests.md) | 730 |
| [`dbo.ShippingVendor`](tables/EDS/dbo.ShippingVendor.md) | 38754 |
| [`dbo.SSOLoginTracking`](tables/EDS/dbo.SSOLoginTracking.md) | 188926 |
| [`dbo.States`](tables/EDS/dbo.States.md) | 3 |
| [`dbo.StatusTable`](tables/EDS/dbo.StatusTable.md) | 53 |
| [`dbo.Sulphite`](tables/EDS/dbo.Sulphite.md) | 49 |
| [`dbo.SulphiteDetail`](tables/EDS/dbo.SulphiteDetail.md) | 6280 |
| [`dbo.SulphiteImport`](tables/EDS/dbo.SulphiteImport.md) | 49 |
| [`dbo.SulphiteUsers`](tables/EDS/dbo.SulphiteUsers.md) | 1209 |
| [`dbo.Suppression`](tables/EDS/dbo.Suppression.md) | 5984 |
| [`dbo.sysdiagrams`](tables/EDS/dbo.sysdiagrams.md) | 9 |
| [`dbo.TableOfContents`](tables/EDS/dbo.TableOfContents.md) | 0 |
| [`dbo.TagFile_`](tables/EDS/dbo.TagFile_.md) | 6235 |
| [`dbo.TAGFILEP`](tables/EDS/dbo.TAGFILEP.md) | 0 |
| [`dbo.TagFilePos_`](tables/EDS/dbo.TagFilePos_.md) | 2259 |
| [`dbo.TagSet_`](tables/EDS/dbo.TagSet_.md) | 0 |
| [`dbo.TaskEvent`](tables/EDS/dbo.TaskEvent.md) | 122148 |
| [`dbo.TaskSchedule`](tables/EDS/dbo.TaskSchedule.md) | 1554438 |
| [`dbo.TempIrvingtonWincap`](tables/EDS/dbo.TempIrvingtonWincap.md) | 860 |
| [`dbo.TM_UOM`](tables/EDS/dbo.TM_UOM.md) | 77 |
| [`dbo.TMAwards`](tables/EDS/dbo.TMAwards.md) | 94281 |
| [`dbo.TMImport`](tables/EDS/dbo.TMImport.md) | 3114 |
| [`dbo.TMImport1`](tables/EDS/dbo.TMImport1.md) | 1885 |
| [`dbo.TMImport2`](tables/EDS/dbo.TMImport2.md) | 147 |
| [`dbo.TMImport3`](tables/EDS/dbo.TMImport3.md) | 833 |
| [`dbo.TMImport5`](tables/EDS/dbo.TMImport5.md) | 2889 |
| [`dbo.TMImport6`](tables/EDS/dbo.TMImport6.md) | 2134 |
| [`dbo.TmpLog`](tables/EDS/dbo.TmpLog.md) | 461 |
| [`dbo.TmpTaskSchedule`](tables/EDS/dbo.TmpTaskSchedule.md) | 4898 |
| [`dbo.TMSurvey`](tables/EDS/dbo.TMSurvey.md) | 862 |
| [`dbo.TMSurveyNewTrades`](tables/EDS/dbo.TMSurveyNewTrades.md) | 89 |
| [`dbo.TMSurveyNewVendors`](tables/EDS/dbo.TMSurveyNewVendors.md) | 202 |
| [`dbo.TMSurveyResults`](tables/EDS/dbo.TMSurveyResults.md) | 98340 |
| [`dbo.TMVendors`](tables/EDS/dbo.TMVendors.md) | 16173 |
| [`dbo.TopUOM`](tables/EDS/dbo.TopUOM.md) | 4579 |
| [`dbo.Trades`](tables/EDS/dbo.Trades.md) | 107 |
| [`dbo.TransactionLog_HISTORY`](tables/EDS/dbo.TransactionLog_HISTORY.md) | 120869019 |
| [`dbo.TransactionLogCF`](tables/EDS/dbo.TransactionLogCF.md) | 3640319 |
| [`dbo.TransactionLogCF_Arc`](tables/EDS/dbo.TransactionLogCF_Arc.md) | 35172962 |
| [`dbo.TransactionTypes`](tables/EDS/dbo.TransactionTypes.md) | 0 |
| [`dbo.TransmitLog`](tables/EDS/dbo.TransmitLog.md) | 155938 |
| [`dbo.Units`](tables/EDS/dbo.Units.md) | 11233 |
| [`dbo.UNSPSCs`](tables/EDS/dbo.UNSPSCs.md) | 50317 |
| [`dbo.UnsubscriptionEmail`](tables/EDS/dbo.UnsubscriptionEmail.md) | 0 |
| [`dbo.UserAdminLog`](tables/EDS/dbo.UserAdminLog.md) | 6466 |
| [`dbo.UserCategory`](tables/EDS/dbo.UserCategory.md) | 0 |
| [`dbo.UserImports`](tables/EDS/dbo.UserImports.md) | 328 |
| [`dbo.Users`](tables/EDS/dbo.Users.md) | 345717 |
| [`dbo.UserTrees`](tables/EDS/dbo.UserTrees.md) | 56920 |
| [`dbo.VendorCatalogNote`](tables/EDS/dbo.VendorCatalogNote.md) | 11 |
| [`dbo.VendorCategory`](tables/EDS/dbo.VendorCategory.md) | 6898 |
| [`dbo.VendorCategoryPP`](tables/EDS/dbo.VendorCategoryPP.md) | 17891 |
| [`dbo.VendorCertificates`](tables/EDS/dbo.VendorCertificates.md) | 0 |
| [`dbo.VendorContacts`](tables/EDS/dbo.VendorContacts.md) | 23503 |
| [`dbo.VendorDeliveryRule`](tables/EDS/dbo.VendorDeliveryRule.md) | 1 |
| [`dbo.VendorDocRequest`](tables/EDS/dbo.VendorDocRequest.md) | 14 |
| [`dbo.VendorDocRequestDetail`](tables/EDS/dbo.VendorDocRequestDetail.md) | 52 |
| [`dbo.VendorDocRequestStatus`](tables/EDS/dbo.VendorDocRequestStatus.md) | 14 |
| [`dbo.VendorLocations`](tables/EDS/dbo.VendorLocations.md) | 0 |
| [`dbo.VendorLogoDisplays`](tables/EDS/dbo.VendorLogoDisplays.md) | 0 |
| [`dbo.VendorOrders`](tables/EDS/dbo.VendorOrders.md) | 5775 |
| [`dbo.VendorOverrideMessages`](tables/EDS/dbo.VendorOverrideMessages.md) | 5 |
| [`dbo.VendorPOtags`](tables/EDS/dbo.VendorPOtags.md) | 0 |
| [`dbo.VendorQuery`](tables/EDS/dbo.VendorQuery.md) | 11971 |
| [`dbo.VendorQueryDetail`](tables/EDS/dbo.VendorQueryDetail.md) | 134978 |
| [`dbo.VendorQueryStatus`](tables/EDS/dbo.VendorQueryStatus.md) | 30800 |
| [`dbo.VendorSessions`](tables/EDS/dbo.VendorSessions.md) | 10993 |
| [`dbo.VendorUploads`](tables/EDS/dbo.VendorUploads.md) | 1538921 |
| [`dbo.VPOLoginAttempts`](tables/EDS/dbo.VPOLoginAttempts.md) | 0 |
| [`dbo.VPORegistrations`](tables/EDS/dbo.VPORegistrations.md) | 6 |
| [`dbo.VPOVendorLinks`](tables/EDS/dbo.VPOVendorLinks.md) | 10 |
| [`dbo.WizHelpFile`](tables/EDS/dbo.WizHelpFile.md) | 0 |
| [`dbo.YearlyTotals`](tables/EDS/dbo.YearlyTotals.md) | 10619 |
| [`dbo.z4zbBidFix`](tables/EDS/dbo.z4zbBidFix.md) | 0 |
| [`dbo.z4zbReqDetail`](tables/EDS/dbo.z4zbReqDetail.md) | 0 |
| [`EDSIQWebUser.migratorversions`](tables/EDS/EDSIQWebUser.migratorversions.md) | 0 |
| [`EDSIQWebUser.TableOfContents`](tables/EDS/EDSIQWebUser.TableOfContents.md) | 6664 |
| [`EDSIQWebUser.UnsubscriptionEmail`](tables/EDS/EDSIQWebUser.UnsubscriptionEmail.md) | 0 |
| [`EDSWebRpts.REPMAN_GROUPS`](tables/EDS/EDSWebRpts.REPMAN_GROUPS.md) | 1 |
| [`EDSWebRpts.REPMAN_REPORTS`](tables/EDS/EDSWebRpts.REPMAN_REPORTS.md) | 1 |

### Leaf views

| View |
|------|
| [`null.MissingCoverView`](tables/EDS/null.MissingCoverView.md) |
| [`null.OrderBookDetailView`](tables/EDS/null.OrderBookDetailView.md) |
| [`null.OrderBookView`](tables/EDS/null.OrderBookView.md) |
| [`null.POAccountList`](tables/EDS/null.POAccountList.md) |
| [`null.POAccountsUsed`](tables/EDS/null.POAccountsUsed.md) |
| [`null.ScheduledByPricePlanCategory`](tables/EDS/null.ScheduledByPricePlanCategory.md) |
| [`null.ScheduledByPricePlanCategoryRep`](tables/EDS/null.ScheduledByPricePlanCategoryRep.md) |
| [`null.ScheduledDistrictsByPricePlanCategory`](tables/EDS/null.ScheduledDistrictsByPricePlanCategory.md) |
| [`null.Sessions`](tables/EDS/null.Sessions.md) |
| [`null.vw_BidsByVendor`](tables/EDS/null.vw_BidsByVendor.md) |
| [`null.vw_Login`](tables/EDS/null.vw_Login.md) |
| [`dbo.BidAnalysisDetail`](tables/EDS/dbo.BidAnalysisDetail.md) |
| [`dbo.BidAnalysisDetailReq`](tables/EDS/dbo.BidAnalysisDetailReq.md) |
| [`dbo.BidHeadersView`](tables/EDS/dbo.BidHeadersView.md) |
| [`dbo.BidItemsView`](tables/EDS/dbo.BidItemsView.md) |
| [`dbo.BidItemView`](tables/EDS/dbo.BidItemView.md) |
| [`dbo.BidMgrBidRankingMSRPView`](tables/EDS/dbo.BidMgrBidRankingMSRPView.md) |
| [`dbo.BidMgrBidRequestAndWriteInMSRPView`](tables/EDS/dbo.BidMgrBidRequestAndWriteInMSRPView.md) |
| [`dbo.BidMgrBidRequestDetail`](tables/EDS/dbo.BidMgrBidRequestDetail.md) |
| [`dbo.BidMgrBidRequestMSRPView`](tables/EDS/dbo.BidMgrBidRequestMSRPView.md) |
| [`dbo.BidMgrBidTradeCountiesView`](tables/EDS/dbo.BidMgrBidTradeCountiesView.md) |
| [`dbo.BidMgrMSRP2ResultsView`](tables/EDS/dbo.BidMgrMSRP2ResultsView.md) |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](tables/EDS/dbo.BidMgrMSRP2VendorReportViewTemp.md) |
| [`dbo.BidMgrView`](tables/EDS/dbo.BidMgrView.md) |
| [`dbo.BidMgrView2`](tables/EDS/dbo.BidMgrView2.md) |
| [`dbo.BidMgrWeightView`](tables/EDS/dbo.BidMgrWeightView.md) |
| [`dbo.BidProjectAveragePO`](tables/EDS/dbo.BidProjectAveragePO.md) |
| [`dbo.BidRequestDetail`](tables/EDS/dbo.BidRequestDetail.md) |
| [`dbo.BidRequestDetail1`](tables/EDS/dbo.BidRequestDetail1.md) |
| [`dbo.BidRequestDetail2`](tables/EDS/dbo.BidRequestDetail2.md) |
| [`dbo.BidRequestItemsCrossRefsView`](tables/EDS/dbo.BidRequestItemsCrossRefsView.md) |
| [`dbo.BidRequestItemsView`](tables/EDS/dbo.BidRequestItemsView.md) |
| [`dbo.BidRequestItemsView1`](tables/EDS/dbo.BidRequestItemsView1.md) |
| [`dbo.BidRequestItemsView1Original`](tables/EDS/dbo.BidRequestItemsView1Original.md) |
| [`dbo.BidRequestItemsWeightView`](tables/EDS/dbo.BidRequestItemsWeightView.md) |
| [`dbo.BidResultsView`](tables/EDS/dbo.BidResultsView.md) |
| [`dbo.BidsView`](tables/EDS/dbo.BidsView.md) |
| [`dbo.BudgetsView`](tables/EDS/dbo.BudgetsView.md) |
| [`dbo.cfv_Districts`](tables/EDS/dbo.cfv_Districts.md) |
| [`dbo.cfv_Schools`](tables/EDS/dbo.cfv_Schools.md) |
| [`dbo.cfv_Users`](tables/EDS/dbo.cfv_Users.md) |
| [`dbo.CoverViewNew`](tables/EDS/dbo.CoverViewNew.md) |
| [`dbo.CoverViewNewSave`](tables/EDS/dbo.CoverViewNewSave.md) |
| [`dbo.CoverViewNewTest`](tables/EDS/dbo.CoverViewNewTest.md) |
| [`dbo.CoverViewNewTest1`](tables/EDS/dbo.CoverViewNewTest1.md) |
| [`dbo.cvw_NJSavings`](tables/EDS/dbo.cvw_NJSavings.md) |
| [`dbo.cvw_NYSavings`](tables/EDS/dbo.cvw_NYSavings.md) |
| [`dbo.cvw_Savings`](tables/EDS/dbo.cvw_Savings.md) |
| [`dbo.DetailView`](tables/EDS/dbo.DetailView.md) |
| [`dbo.DistrictContactProblemView`](tables/EDS/dbo.DistrictContactProblemView.md) |
| [`dbo.DistrictUsersView`](tables/EDS/dbo.DistrictUsersView.md) |
| [`dbo.InstructionBookCalendar`](tables/EDS/dbo.InstructionBookCalendar.md) |
| [`dbo.InstructionBookView09`](tables/EDS/dbo.InstructionBookView09.md) |
| [`dbo.InstructionBookViewCF`](tables/EDS/dbo.InstructionBookViewCF.md) |
| [`dbo.InstructionBookViewCF2013`](tables/EDS/dbo.InstructionBookViewCF2013.md) |
| [`dbo.InstructionBookViewwork`](tables/EDS/dbo.InstructionBookViewwork.md) |
| [`dbo.ItemsBidHeaderView`](tables/EDS/dbo.ItemsBidHeaderView.md) |
| [`dbo.Keywords1`](tables/EDS/dbo.Keywords1.md) |
| [`dbo.NewFF1`](tables/EDS/dbo.NewFF1.md) |
| [`dbo.OrderBookDetailView`](tables/EDS/dbo.OrderBookDetailView.md) |
| [`dbo.OrderBookView`](tables/EDS/dbo.OrderBookView.md) |
| [`dbo.pa_Accounts`](tables/EDS/dbo.pa_Accounts.md) |
| [`dbo.pa_Budgets`](tables/EDS/dbo.pa_Budgets.md) |
| [`dbo.pa_Category`](tables/EDS/dbo.pa_Category.md) |
| [`dbo.pa_ReqList`](tables/EDS/dbo.pa_ReqList.md) |
| [`dbo.pa_School`](tables/EDS/dbo.pa_School.md) |
| [`dbo.pa_Status`](tables/EDS/dbo.pa_Status.md) |
| [`dbo.pa_Users`](tables/EDS/dbo.pa_Users.md) |
| [`dbo.POAttentionList`](tables/EDS/dbo.POAttentionList.md) |
| [`dbo.PODetail_old`](tables/EDS/dbo.PODetail_old.md) |
| [`dbo.PODetail_Orig`](tables/EDS/dbo.PODetail_Orig.md) |
| [`dbo.PODetailExport`](tables/EDS/dbo.PODetailExport.md) |
| [`dbo.PODetailExport_old`](tables/EDS/dbo.PODetailExport_old.md) |
| [`dbo.PODetailJavaExport`](tables/EDS/dbo.PODetailJavaExport.md) |
| [`dbo.PODetailJavaExportNew`](tables/EDS/dbo.PODetailJavaExportNew.md) |
| [`dbo.PODetailTest`](tables/EDS/dbo.PODetailTest.md) |
| [`dbo.POHeaderSummary`](tables/EDS/dbo.POHeaderSummary.md) |
| [`dbo.POHeaderSummary_04232018`](tables/EDS/dbo.POHeaderSummary_04232018.md) |
| [`dbo.POHeaderTest`](tables/EDS/dbo.POHeaderTest.md) |
| [`dbo.PricePlanView`](tables/EDS/dbo.PricePlanView.md) |
| [`dbo.ReqDetail`](tables/EDS/dbo.ReqDetail.md) |
| [`dbo.RequisitionsView`](tables/EDS/dbo.RequisitionsView.md) |
| [`dbo.rs_DistrictSummary`](tables/EDS/dbo.rs_DistrictSummary.md) |
| [`dbo.rs_DistrictSummaryAwardLetter`](tables/EDS/dbo.rs_DistrictSummaryAwardLetter.md) |
| [`dbo.rs_DistrictSummaryVendors`](tables/EDS/dbo.rs_DistrictSummaryVendors.md) |
| [`dbo.rs_SBS_AccountRecap_District`](tables/EDS/dbo.rs_SBS_AccountRecap_District.md) |
| [`dbo.rs_SBS_AccountRecap_School`](tables/EDS/dbo.rs_SBS_AccountRecap_School.md) |
| [`dbo.rs_SBS_SchoolSummary`](tables/EDS/dbo.rs_SBS_SchoolSummary.md) |
| [`dbo.rs_SBS_SchoolSummary_Detail`](tables/EDS/dbo.rs_SBS_SchoolSummary_Detail.md) |
| [`dbo.rs_SBS_UserRecap_District`](tables/EDS/dbo.rs_SBS_UserRecap_District.md) |
| [`dbo.rs_SBS_UserRecap_School`](tables/EDS/dbo.rs_SBS_UserRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_District`](tables/EDS/dbo.rs_SBS_VendorRecap_District.md) |
| [`dbo.rs_SBS_VendorRecap_School`](tables/EDS/dbo.rs_SBS_VendorRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_User`](tables/EDS/dbo.rs_SBS_VendorRecap_User.md) |
| [`dbo.rs_SBS_VendorUserRecap_District`](tables/EDS/dbo.rs_SBS_VendorUserRecap_District.md) |
| [`dbo.rs_SBS_VendorUserRecap_School`](tables/EDS/dbo.rs_SBS_VendorUserRecap_School.md) |
| [`dbo.rs_SBSDetailRecap`](tables/EDS/dbo.rs_SBSDetailRecap.md) |
| [`dbo.rs_SBSReqRecap`](tables/EDS/dbo.rs_SBSReqRecap.md) |
| [`dbo.rs_SBSVendorRecap`](tables/EDS/dbo.rs_SBSVendorRecap.md) |
| [`dbo.rs_VendorRecap`](tables/EDS/dbo.rs_VendorRecap.md) |
| [`dbo.RTK_Item_StructureView`](tables/EDS/dbo.RTK_Item_StructureView.md) |
| [`dbo.SearchItemsHeadingsView`](tables/EDS/dbo.SearchItemsHeadingsView.md) |
| [`dbo.SearchItemsKeywordsView`](tables/EDS/dbo.SearchItemsKeywordsView.md) |
| [`dbo.SearchItemsView`](tables/EDS/dbo.SearchItemsView.md) |
| [`dbo.TestAllFF`](tables/EDS/dbo.TestAllFF.md) |
| [`dbo.TestFF`](tables/EDS/dbo.TestFF.md) |
| [`dbo.TMDistrictInfo`](tables/EDS/dbo.TMDistrictInfo.md) |
| [`dbo.UploadView`](tables/EDS/dbo.UploadView.md) |
| [`dbo.UserContactProblemView`](tables/EDS/dbo.UserContactProblemView.md) |
| [`dbo.UserListView`](tables/EDS/dbo.UserListView.md) |
| [`dbo.UsersApprovees`](tables/EDS/dbo.UsersApprovees.md) |
| [`dbo.UserTreeView`](tables/EDS/dbo.UserTreeView.md) |
| [`dbo.VendorBidLookup`](tables/EDS/dbo.VendorBidLookup.md) |
| [`dbo.VendorContactProblemView`](tables/EDS/dbo.VendorContactProblemView.md) |
| [`dbo.vw_ActiveBids`](tables/EDS/dbo.vw_ActiveBids.md) |
| [`dbo.vw_ActiveCatalogs`](tables/EDS/dbo.vw_ActiveCatalogs.md) |
| [`dbo.vw_ActiveDistrictList`](tables/EDS/dbo.vw_ActiveDistrictList.md) |
| [`dbo.vw_ActiveVendors`](tables/EDS/dbo.vw_ActiveVendors.md) |
| [`dbo.vw_ApprovalsHistory`](tables/EDS/dbo.vw_ApprovalsHistory.md) |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS/dbo.vw_ApproveRequisitionsBySession_Test.md) |
| [`dbo.vw_ApproveRequisitionsTest`](tables/EDS/dbo.vw_ApproveRequisitionsTest.md) |
| [`dbo.vw_ARAccounts`](tables/EDS/dbo.vw_ARAccounts.md) |
| [`dbo.vw_ARBudgets`](tables/EDS/dbo.vw_ARBudgets.md) |
| [`dbo.vw_ARCategories`](tables/EDS/dbo.vw_ARCategories.md) |
| [`dbo.vw_ARSchools`](tables/EDS/dbo.vw_ARSchools.md) |
| [`dbo.vw_ARStatuses`](tables/EDS/dbo.vw_ARStatuses.md) |
| [`dbo.vw_ARUsers`](tables/EDS/dbo.vw_ARUsers.md) |
| [`dbo.vw_AtAGlance`](tables/EDS/dbo.vw_AtAGlance.md) |
| [`dbo.vw_AvailableReqBids`](tables/EDS/dbo.vw_AvailableReqBids.md) |
| [`dbo.vw_AvailableUserAccounts`](tables/EDS/dbo.vw_AvailableUserAccounts.md) |
| [`dbo.vw_AVCategoriesBySession`](tables/EDS/dbo.vw_AVCategoriesBySession.md) |
| [`dbo.vw_AVVendorsBySession`](tables/EDS/dbo.vw_AVVendorsBySession.md) |
| [`dbo.vw_AVVendorsExport`](tables/EDS/dbo.vw_AVVendorsExport.md) |
| [`dbo.vw_AwardedVendorsAllCurrentBids`](tables/EDS/dbo.vw_AwardedVendorsAllCurrentBids.md) |
| [`dbo.vw_BAPCBG`](tables/EDS/dbo.vw_BAPCBG.md) |
| [`dbo.vw_BidAnalysisVendorSummary`](tables/EDS/dbo.vw_BidAnalysisVendorSummary.md) |
| [`dbo.vw_BidAnalysisVendorSummaryByDistrict`](tables/EDS/dbo.vw_BidAnalysisVendorSummaryByDistrict.md) |
| [`dbo.vw_BidAnalysisVendorSummaryTest`](tables/EDS/dbo.vw_BidAnalysisVendorSummaryTest.md) |
| [`dbo.vw_BidAncillaryBySession`](tables/EDS/dbo.vw_BidAncillaryBySession.md) |
| [`dbo.vw_BidComplianceBySession`](tables/EDS/dbo.vw_BidComplianceBySession.md) |
| [`dbo.vw_BidContactsVendorList`](tables/EDS/dbo.vw_BidContactsVendorList.md) |
| [`dbo.vw_BidDocumentsList`](tables/EDS/dbo.vw_BidDocumentsList.md) |
| [`dbo.vw_BidDocumentTypeNames`](tables/EDS/dbo.vw_BidDocumentTypeNames.md) |
| [`dbo.vw_BidDuplicateIdentifiers`](tables/EDS/dbo.vw_BidDuplicateIdentifiers.md) |
| [`dbo.vw_BidHeadersList`](tables/EDS/dbo.vw_BidHeadersList.md) |
| [`dbo.vw_BidImportMostRecentContactInfo`](tables/EDS/dbo.vw_BidImportMostRecentContactInfo.md) |
| [`dbo.vw_BidLeadComplianceBySession`](tables/EDS/dbo.vw_BidLeadComplianceBySession.md) |
| [`dbo.vw_BidLines`](tables/EDS/dbo.vw_BidLines.md) |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS/dbo.vw_BidMgrBidderDocs.md) |
| [`dbo.vw_BidMSRPManufacturerProductLinePrices`](tables/EDS/dbo.vw_BidMSRPManufacturerProductLinePrices.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](tables/EDS/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`](tables/EDS/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved.md) |
| [`dbo.vw_BidMSRPRankedManufacturers`](tables/EDS/dbo.vw_BidMSRPRankedManufacturers.md) |
| [`dbo.vw_BidMSRPResultsPriceRanges`](tables/EDS/dbo.vw_BidMSRPResultsPriceRanges.md) |
| [`dbo.vw_BidPricing`](tables/EDS/dbo.vw_BidPricing.md) |
| [`dbo.vw_BidProjectAveragePO`](tables/EDS/dbo.vw_BidProjectAveragePO.md) |
| [`dbo.vw_BidRequestItemMergeDetail`](tables/EDS/dbo.vw_BidRequestItemMergeDetail.md) |
| [`dbo.vw_BidRequestItemMergeHeader`](tables/EDS/dbo.vw_BidRequestItemMergeHeader.md) |
| [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS/dbo.vw_BidRequestItemsBidMgr.md) |
| [`dbo.vw_BidResults`](tables/EDS/dbo.vw_BidResults.md) |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS/dbo.vw_BidTabReadyNotifications.md) |
| [`dbo.vw_BidTrades`](tables/EDS/dbo.vw_BidTrades.md) |
| [`dbo.vw_BidTradesBySession`](tables/EDS/dbo.vw_BidTradesBySession.md) |
| [`dbo.vw_BidTradesBySession_Test`](tables/EDS/dbo.vw_BidTradesBySession_Test.md) |
| [`dbo.vw_BidTradesVendorDetailForReports`](tables/EDS/dbo.vw_BidTradesVendorDetailForReports.md) |
| [`dbo.vw_BidTradesVendorsAnswers`](tables/EDS/dbo.vw_BidTradesVendorsAnswers.md) |
| [`dbo.vw_BidTradesVendorsAnswersBySession`](tables/EDS/dbo.vw_BidTradesVendorsAnswersBySession.md) |
| [`dbo.vw_BidTradesVendorsBySession`](tables/EDS/dbo.vw_BidTradesVendorsBySession.md) |
| [`dbo.vw_BidTradesVendorsForReports`](tables/EDS/dbo.vw_BidTradesVendorsForReports.md) |
| [`dbo.vw_BidType`](tables/EDS/dbo.vw_BidType.md) |
| [`dbo.vw_BidVendor`](tables/EDS/dbo.vw_BidVendor.md) |
| [`dbo.vw_BidVendorsBySession`](tables/EDS/dbo.vw_BidVendorsBySession.md) |
| [`dbo.vw_BidYears`](tables/EDS/dbo.vw_BidYears.md) |
| [`dbo.vw_BillingStatus`](tables/EDS/dbo.vw_BillingStatus.md) |
| [`dbo.vw_BrowseDistrictBidHeaders`](tables/EDS/dbo.vw_BrowseDistrictBidHeaders.md) |
| [`dbo.vw_BudgetDistrictBySession`](tables/EDS/dbo.vw_BudgetDistrictBySession.md) |
| [`dbo.vw_BudgetsFilter`](tables/EDS/dbo.vw_BudgetsFilter.md) |
| [`dbo.vw_CatalogCompare`](tables/EDS/dbo.vw_CatalogCompare.md) |
| [`dbo.vw_CatalogImport`](tables/EDS/dbo.vw_CatalogImport.md) |
| [`dbo.vw_CatalogImporter1`](tables/EDS/dbo.vw_CatalogImporter1.md) |
| [`dbo.vw_CatalogImporter1Dtl`](tables/EDS/dbo.vw_CatalogImporter1Dtl.md) |
| [`dbo.vw_CatalogImporterCat`](tables/EDS/dbo.vw_CatalogImporterCat.md) |
| [`dbo.vw_CatalogImporterVen`](tables/EDS/dbo.vw_CatalogImporterVen.md) |
| [`dbo.vw_CatalogImports`](tables/EDS/dbo.vw_CatalogImports.md) |
| [`dbo.vw_CatalogPages_Orig`](tables/EDS/dbo.vw_CatalogPages_Orig.md) |
| [`dbo.vw_CatalogPages1`](tables/EDS/dbo.vw_CatalogPages1.md) |
| [`dbo.vw_CatalogRefsItemTest`](tables/EDS/dbo.vw_CatalogRefsItemTest.md) |
| [`dbo.vw_CatalogRequestStatus`](tables/EDS/dbo.vw_CatalogRequestStatus.md) |
| [`dbo.vw_CatalogsAttachedToBids`](tables/EDS/dbo.vw_CatalogsAttachedToBids.md) |
| [`dbo.vw_Categories`](tables/EDS/dbo.vw_Categories.md) |
| [`dbo.vw_CategoriesAndVendors`](tables/EDS/dbo.vw_CategoriesAndVendors.md) |
| [`dbo.vw_ContinuanceSection0Charges`](tables/EDS/dbo.vw_ContinuanceSection0Charges.md) |
| [`dbo.vw_ContinuanceSection1Charges`](tables/EDS/dbo.vw_ContinuanceSection1Charges.md) |
| [`dbo.vw_CSReps`](tables/EDS/dbo.vw_CSReps.md) |
| [`dbo.vw_DetailDescription_old`](tables/EDS/dbo.vw_DetailDescription_old.md) |
| [`dbo.vw_DetailDescriptionPrint`](tables/EDS/dbo.vw_DetailDescriptionPrint.md) |
| [`dbo.vw_DetailDescriptionTest`](tables/EDS/dbo.vw_DetailDescriptionTest.md) |
| [`dbo.vw_DetailView`](tables/EDS/dbo.vw_DetailView.md) |
| [`dbo.vw_DistrictBudgetList`](tables/EDS/dbo.vw_DistrictBudgetList.md) |
| [`dbo.vw_DistrictBudgetPP`](tables/EDS/dbo.vw_DistrictBudgetPP.md) |
| [`dbo.vw_DistrictContactsList`](tables/EDS/dbo.vw_DistrictContactsList.md) |
| [`dbo.vw_DistrictCounties_BidMgr`](tables/EDS/dbo.vw_DistrictCounties_BidMgr.md) |
| [`dbo.vw_DistrictList`](tables/EDS/dbo.vw_DistrictList.md) |
| [`dbo.vw_DistrictPaymentSchedule`](tables/EDS/dbo.vw_DistrictPaymentSchedule.md) |
| [`dbo.vw_DistrictPOInfo`](tables/EDS/dbo.vw_DistrictPOInfo.md) |
| [`dbo.vw_DistrictSchools`](tables/EDS/dbo.vw_DistrictSchools.md) |
| [`dbo.vw_DistrictsNeedingReview`](tables/EDS/dbo.vw_DistrictsNeedingReview.md) |
| [`dbo.vw_DistrictStates_BidMgr`](tables/EDS/dbo.vw_DistrictStates_BidMgr.md) |
| [`dbo.vw_DMSBidDocuments`](tables/EDS/dbo.vw_DMSBidDocuments.md) |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS/dbo.vw_DMSBidDocuments_View.md) |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS/dbo.vw_DMSRTKDocuments.md) |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS/dbo.vw_DMSRTKSurveys.md) |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS/dbo.vw_DMSSDSDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments`](tables/EDS/dbo.vw_DMSVendorBidDocuments.md) |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS/dbo.vw_DMSVendorBidDocuments_04232018.md) |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS/dbo.vw_DMSVendorBidDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS/dbo.vw_DMSVendorBidDocuments_ViewTest.md) |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS/dbo.vw_DMSVendorBidDocumentsTest.md) |
| [`dbo.vw_DMSVendorDocuments`](tables/EDS/dbo.vw_DMSVendorDocuments.md) |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS/dbo.vw_DMSVendorDocuments_View.md) |
| [`dbo.vw_DocumentTypes`](tables/EDS/dbo.vw_DocumentTypes.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed`](tables/EDS/dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed`](tables/EDS/dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed.md) |
| [`dbo.vw_ExistingRequisitions`](tables/EDS/dbo.vw_ExistingRequisitions.md) |
| [`dbo.vw_ExistingUserAccounts`](tables/EDS/dbo.vw_ExistingUserAccounts.md) |
| [`dbo.vw_ExistingUserAccounts_NEW`](tables/EDS/dbo.vw_ExistingUserAccounts_NEW.md) |
| [`dbo.vw_FA_CategoriesAndVendors`](tables/EDS/dbo.vw_FA_CategoriesAndVendors.md) |
| [`dbo.vw_FA_EDSUser`](tables/EDS/dbo.vw_FA_EDSUser.md) |
| [`dbo.vw_FA_ReqCategories`](tables/EDS/dbo.vw_FA_ReqCategories.md) |
| [`dbo.vw_FA_Requisitions`](tables/EDS/dbo.vw_FA_Requisitions.md) |
| [`dbo.vw_FA_UserAccounts`](tables/EDS/dbo.vw_FA_UserAccounts.md) |
| [`dbo.vw_FA_UserList`](tables/EDS/dbo.vw_FA_UserList.md) |
| [`dbo.vw_FA_UserLogin`](tables/EDS/dbo.vw_FA_UserLogin.md) |
| [`dbo.vw_Financials`](tables/EDS/dbo.vw_Financials.md) |
| [`dbo.vw_FormattedDetailDescription`](tables/EDS/dbo.vw_FormattedDetailDescription.md) |
| [`dbo.vw_GetMSDSInfo`](tables/EDS/dbo.vw_GetMSDSInfo.md) |
| [`dbo.vw_HeadingsByBid`](tables/EDS/dbo.vw_HeadingsByBid.md) |
| [`dbo.vw_HeadingsByReq`](tables/EDS/dbo.vw_HeadingsByReq.md) |
| [`dbo.vw_HeadingsByReqTest`](tables/EDS/dbo.vw_HeadingsByReqTest.md) |
| [`dbo.vw_HeadingsKeywordsByBid`](tables/EDS/dbo.vw_HeadingsKeywordsByBid.md) |
| [`dbo.vw_IncidentalOrderDownloads`](tables/EDS/dbo.vw_IncidentalOrderDownloads.md) |
| [`dbo.vw_IncidentalOrderDownloadsDetail`](tables/EDS/dbo.vw_IncidentalOrderDownloadsDetail.md) |
| [`dbo.vw_InstructionBookCalendar`](tables/EDS/dbo.vw_InstructionBookCalendar.md) |
| [`dbo.vw_InstructionBookContents`](tables/EDS/dbo.vw_InstructionBookContents.md) |
| [`dbo.vw_IsRequisitionLocked`](tables/EDS/dbo.vw_IsRequisitionLocked.md) |
| [`dbo.vw_JavaReqDetail`](tables/EDS/dbo.vw_JavaReqDetail.md) |
| [`dbo.vw_KeywordsByBid`](tables/EDS/dbo.vw_KeywordsByBid.md) |
| [`dbo.vw_KeywordsByReqHeading`](tables/EDS/dbo.vw_KeywordsByReqHeading.md) |
| [`dbo.vw_LatestCrossRef`](tables/EDS/dbo.vw_LatestCrossRef.md) |
| [`dbo.vw_MPIHeadings`](tables/EDS/dbo.vw_MPIHeadings.md) |
| [`dbo.vw_MSRPBidReqManufacturer`](tables/EDS/dbo.vw_MSRPBidReqManufacturer.md) |
| [`dbo.vw_MSRPBidReqManufacturerWriteIn`](tables/EDS/dbo.vw_MSRPBidReqManufacturerWriteIn.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOption`](tables/EDS/dbo.vw_MSRPBidReqProdLineAndOption.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOptionWriteIn`](tables/EDS/dbo.vw_MSRPBidReqProdLineAndOptionWriteIn.md) |
| [`dbo.vw_MSRPBidReqProductLine`](tables/EDS/dbo.vw_MSRPBidReqProductLine.md) |
| [`dbo.vw_MSRPCategoriesBySession`](tables/EDS/dbo.vw_MSRPCategoriesBySession.md) |
| [`dbo.vw_MSRPManufacturersBySession`](tables/EDS/dbo.vw_MSRPManufacturersBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesBySession`](tables/EDS/dbo.vw_MSRPMPLVendorsCategoriesBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReport`](tables/EDS/dbo.vw_MSRPMPLVendorsCategoriesReport.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReportBC`](tables/EDS/dbo.vw_MSRPMPLVendorsCategoriesReportBC.md) |
| [`dbo.vw_MSRPProductLineExceptions`](tables/EDS/dbo.vw_MSRPProductLineExceptions.md) |
| [`dbo.vw_MSRPVendorsAndManufacturersByReq`](tables/EDS/dbo.vw_MSRPVendorsAndManufacturersByReq.md) |
| [`dbo.vw_MSRPVendorsBidHeaderBySession`](tables/EDS/dbo.vw_MSRPVendorsBidHeaderBySession.md) |
| [`dbo.vw_MSRPVendorsCategoriesBySession`](tables/EDS/dbo.vw_MSRPVendorsCategoriesBySession.md) |
| [`dbo.vw_MultiVendorPODistrictsAndBudgets`](tables/EDS/dbo.vw_MultiVendorPODistrictsAndBudgets.md) |
| [`dbo.vw_NJDistricts`](tables/EDS/dbo.vw_NJDistricts.md) |
| [`dbo.vw_NY_TM_Districts_Mailing`](tables/EDS/dbo.vw_NY_TM_Districts_Mailing.md) |
| [`dbo.vw_OverrideReferences`](tables/EDS/dbo.vw_OverrideReferences.md) |
| [`dbo.vw_OverrideVendorBidders`](tables/EDS/dbo.vw_OverrideVendorBidders.md) |
| [`dbo.vw_POStatus_Test`](tables/EDS/dbo.vw_POStatus_Test.md) |
| [`dbo.vw_PricePlanFilter`](tables/EDS/dbo.vw_PricePlanFilter.md) |
| [`dbo.vw_RepsDistricts`](tables/EDS/dbo.vw_RepsDistricts.md) |
| [`dbo.vw_ReqBidReview`](tables/EDS/dbo.vw_ReqBidReview.md) |
| [`dbo.vw_ReqCategories`](tables/EDS/dbo.vw_ReqCategories.md) |
| [`dbo.vw_ReqDetail_BK20241205`](tables/EDS/dbo.vw_ReqDetail_BK20241205.md) |
| [`dbo.vw_ReqDetail_BK20241227`](tables/EDS/dbo.vw_ReqDetail_BK20241227.md) |
| [`dbo.vw_ReqDetail1`](tables/EDS/dbo.vw_ReqDetail1.md) |
| [`dbo.vw_ReqDetailAsp1`](tables/EDS/dbo.vw_ReqDetailAsp1.md) |
| [`dbo.vw_ReqDetailPrintTest`](tables/EDS/dbo.vw_ReqDetailPrintTest.md) |
| [`dbo.vw_ReqDetail-removed 12082010`](tables/EDS/dbo.vw_ReqDetail-removed_12082010.md) |
| [`dbo.vw_ReqDetailSummary`](tables/EDS/dbo.vw_ReqDetailSummary.md) |
| [`dbo.vw_ReqDetailTab`](tables/EDS/dbo.vw_ReqDetailTab.md) |
| [`dbo.vw_ReqTotalsByVendor`](tables/EDS/dbo.vw_ReqTotalsByVendor.md) |
| [`dbo.vw_ReqTotalsByVendor_TEST`](tables/EDS/dbo.vw_ReqTotalsByVendor_TEST.md) |
| [`dbo.vw_ReqTotalsByVendorTest`](tables/EDS/dbo.vw_ReqTotalsByVendorTest.md) |
| [`dbo.vw_RequisitionAccountBalance`](tables/EDS/dbo.vw_RequisitionAccountBalance.md) |
| [`dbo.vw_RequisitionCatalogList`](tables/EDS/dbo.vw_RequisitionCatalogList.md) |
| [`dbo.vw_RequisitionList`](tables/EDS/dbo.vw_RequisitionList.md) |
| [`dbo.vw_Requisitions`](tables/EDS/dbo.vw_Requisitions.md) |
| [`dbo.vw_RequisitionsAccounts`](tables/EDS/dbo.vw_RequisitionsAccounts.md) |
| [`dbo.vw_RequisitionsCategories`](tables/EDS/dbo.vw_RequisitionsCategories.md) |
| [`dbo.vw_RequisitionShippingCostsTest`](tables/EDS/dbo.vw_RequisitionShippingCostsTest.md) |
| [`dbo.vw_RequisitionsPrint`](tables/EDS/dbo.vw_RequisitionsPrint.md) |
| [`dbo.vw_RequisitionsShippingLocations`](tables/EDS/dbo.vw_RequisitionsShippingLocations.md) |
| [`dbo.vw_RequisitionStatus_orig`](tables/EDS/dbo.vw_RequisitionStatus_orig.md) |
| [`dbo.vw_ReqVendors`](tables/EDS/dbo.vw_ReqVendors.md) |
| [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS/dbo.vw_RptExpireDateBidDocsAndMore.md) |
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](tables/EDS/dbo.vw_RptMarkedReadyEmailBlastStats.md) |
| [`dbo.vw_RptMissingURLsByBidAndVendor`](tables/EDS/dbo.vw_RptMissingURLsByBidAndVendor.md) |
| [`dbo.vw_RTK_MSDSandCC`](tables/EDS/dbo.vw_RTK_MSDSandCC.md) |
| [`dbo.vw_RTK_Sites`](tables/EDS/dbo.vw_RTK_Sites.md) |
| [`dbo.vw_RTKDefaultMSDSLocation`](tables/EDS/dbo.vw_RTKDefaultMSDSLocation.md) |
| [`dbo.vw_RTKInfo`](tables/EDS/dbo.vw_RTKInfo.md) |
| [`dbo.vw_RTKInfoAnnual`](tables/EDS/dbo.vw_RTKInfoAnnual.md) |
| [`dbo.vw_RTKItems`](tables/EDS/dbo.vw_RTKItems.md) |
| [`dbo.vw_RTKItems2`](tables/EDS/dbo.vw_RTKItems2.md) |
| [`dbo.vw_RTKReportItems`](tables/EDS/dbo.vw_RTKReportItems.md) |
| [`dbo.vw_Savings1`](tables/EDS/dbo.vw_Savings1.md) |
| [`dbo.vw_Savings5`](tables/EDS/dbo.vw_Savings5.md) |
| [`dbo.vw_SavingsTotals`](tables/EDS/dbo.vw_SavingsTotals.md) |
| [`dbo.vw_SavingsTotals5NJ`](tables/EDS/dbo.vw_SavingsTotals5NJ.md) |
| [`dbo.vw_SavingsTotals5NonFiltered`](tables/EDS/dbo.vw_SavingsTotals5NonFiltered.md) |
| [`dbo.vw_SavingsTotals5Test`](tables/EDS/dbo.vw_SavingsTotals5Test.md) |
| [`dbo.vw_ScanDocLookupFields`](tables/EDS/dbo.vw_ScanDocLookupFields.md) |
| [`dbo.vw_ScanDocLookups`](tables/EDS/dbo.vw_ScanDocLookups.md) |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS/dbo.vw_ScanDocLookupTargets.md) |
| [`dbo.vw_ScannedDocumentDataMSDSCategories`](tables/EDS/dbo.vw_ScannedDocumentDataMSDSCategories.md) |
| [`dbo.vw_ScannedDocumentDataMSDSManufacturers`](tables/EDS/dbo.vw_ScannedDocumentDataMSDSManufacturers.md) |
| [`dbo.vw_scARCategories`](tables/EDS/dbo.vw_scARCategories.md) |
| [`dbo.vw_SchoolUsers`](tables/EDS/dbo.vw_SchoolUsers.md) |
| [`dbo.vw_SDSImportView`](tables/EDS/dbo.vw_SDSImportView.md) |
| [`dbo.vw_SDSReferencedURLs`](tables/EDS/dbo.vw_SDSReferencedURLs.md) |
| [`dbo.vw_SearchDescription`](tables/EDS/dbo.vw_SearchDescription.md) |
| [`dbo.vw_SearchItemsDetail`](tables/EDS/dbo.vw_SearchItemsDetail.md) |
| [`dbo.vw_SearchItemsHeadings`](tables/EDS/dbo.vw_SearchItemsHeadings.md) |
| [`dbo.vw_SearchItemsKeywords`](tables/EDS/dbo.vw_SearchItemsKeywords.md) |
| [`dbo.vw_SessionCategories`](tables/EDS/dbo.vw_SessionCategories.md) |
| [`dbo.vw_SessionCategoryVendors`](tables/EDS/dbo.vw_SessionCategoryVendors.md) |
| [`dbo.vw_SessionTableBudgets`](tables/EDS/dbo.vw_SessionTableBudgets.md) |
| [`dbo.vw_ShortDescription`](tables/EDS/dbo.vw_ShortDescription.md) |
| [`dbo.vw_StatusDetailed`](tables/EDS/dbo.vw_StatusDetailed.md) |
| [`dbo.vw_TMAwardedVendors`](tables/EDS/dbo.vw_TMAwardedVendors.md) |
| [`dbo.vw_TMLineItems`](tables/EDS/dbo.vw_TMLineItems.md) |
| [`dbo.vw_TMSurveyData`](tables/EDS/dbo.vw_TMSurveyData.md) |
| [`dbo.vw_TMSurveys`](tables/EDS/dbo.vw_TMSurveys.md) |
| [`dbo.vw_TMTrades`](tables/EDS/dbo.vw_TMTrades.md) |
| [`dbo.vw_TMUsers`](tables/EDS/dbo.vw_TMUsers.md) |
| [`dbo.vw_TMVendorsForReports`](tables/EDS/dbo.vw_TMVendorsForReports.md) |
| [`dbo.vw_UsedAccountData`](tables/EDS/dbo.vw_UsedAccountData.md) |
| [`dbo.vw_UserNotificationOptions`](tables/EDS/dbo.vw_UserNotificationOptions.md) |
| [`dbo.vw_ValidLogins`](tables/EDS/dbo.vw_ValidLogins.md) |
| [`dbo.vw_Vendor0528Items`](tables/EDS/dbo.vw_Vendor0528Items.md) |
| [`dbo.vw_VendorBidDocumentsList`](tables/EDS/dbo.vw_VendorBidDocumentsList.md) |
| [`dbo.vw_VendorBidInfoStats`](tables/EDS/dbo.vw_VendorBidInfoStats.md) |
| [`dbo.vw_VendorBlast`](tables/EDS/dbo.vw_VendorBlast.md) |
| [`dbo.vw_VendorBlast_AwardedByBid`](tables/EDS/dbo.vw_VendorBlast_AwardedByBid.md) |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS/dbo.vw_VendorBlast_DownloadedBySchedule.md) |
| [`dbo.vw_VendorBlast_RegisteredByBid`](tables/EDS/dbo.vw_VendorBlast_RegisteredByBid.md) |
| [`dbo.vw_VendorBlast_RegisteredByCategory`](tables/EDS/dbo.vw_VendorBlast_RegisteredByCategory.md) |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS/dbo.vw_VendorBlast_RegisteredBySchedule.md) |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS/dbo.vw_VendorBlast_SubmittedByBid.md) |
| [`dbo.vw_VendorCategoryBids_Cats`](tables/EDS/dbo.vw_VendorCategoryBids_Cats.md) |
| [`dbo.vw_VendorCategoryBids_Vendors`](tables/EDS/dbo.vw_VendorCategoryBids_Vendors.md) |
| [`dbo.vw_VendorDocRequestStatus`](tables/EDS/dbo.vw_VendorDocRequestStatus.md) |
| [`dbo.vw_VendorDocumentsList`](tables/EDS/dbo.vw_VendorDocumentsList.md) |
| [`dbo.vw_VendorPODistrictList`](tables/EDS/dbo.vw_VendorPODistrictList.md) |
| [`dbo.vw_VendorPODistricts`](tables/EDS/dbo.vw_VendorPODistricts.md) |
| [`dbo.vw_VendorPODistrictsAndBudgets`](tables/EDS/dbo.vw_VendorPODistrictsAndBudgets.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsCF`](tables/EDS/dbo.vw_VendorPODistrictsAndBudgetsCF.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsOld`](tables/EDS/dbo.vw_VendorPODistrictsAndBudgetsOld.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsTest`](tables/EDS/dbo.vw_VendorPODistrictsAndBudgetsTest.md) |
| [`dbo.vw_VendorPOView1`](tables/EDS/dbo.vw_VendorPOView1.md) |
| [`dbo.vw_VendorPOView2`](tables/EDS/dbo.vw_VendorPOView2.md) |
| [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS/dbo.vw_VendorQueryMSRPStatus.md) |
| [`dbo.vw_VendorQueryStatus`](tables/EDS/dbo.vw_VendorQueryStatus.md) |
| [`dbo.vw_VendorQueryTandMStatus`](tables/EDS/dbo.vw_VendorQueryTandMStatus.md) |
| [`dbo.vw_VendorsByBid`](tables/EDS/dbo.vw_VendorsByBid.md) |
| [`dbo.vw_VendorsTable`](tables/EDS/dbo.vw_VendorsTable.md) |
| [`dbo.vw_VPOLoginCheck`](tables/EDS/dbo.vw_VPOLoginCheck.md) |
| [`dbo.vw_VPOVendors`](tables/EDS/dbo.vw_VPOVendors.md) |
| [`dbo.vw_WincapVendors`](tables/EDS/dbo.vw_WincapVendors.md) |
| [`dbo.vw_WincapVendorsMaster`](tables/EDS/dbo.vw_WincapVendorsMaster.md) |
| [`dbo.vw_ZonalItems`](tables/EDS/dbo.vw_ZonalItems.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `null.sp_CCAddAddendaItem_EDSIQWebuser` | PROCEDURE |
| `null.sp_CCAddAddendaMaint` | PROCEDURE |
| `null.sp_CCUpdateAddendaItem_EDSIQWEBUSER` | PROCEDURE |
| `null.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `null.sp_CombineReqs` | PROCEDURE |
| `null.sp_CombineReqsNoDelete` | PROCEDURE |
| `null.sp_ConvertReadyBatches` | PROCEDURE |
| `null.sp_CoverView` | PROCEDURE |
| `null.sp_DeleteDistrictBudgetPOs` | PROCEDURE |
| `null.sp_DeleteEmptyReqs` | PROCEDURE |
| `null.sp_DeletePOList` | PROCEDURE |
| `null.sp_DeleteRequisitionWithItems` | PROCEDURE |
| `null.sp_MultiBatchLoad` | PROCEDURE |
| `null.sp_NightlyGarbageCollection` | PROCEDURE |
| `null.sp_OrderBookCopy` | PROCEDURE |
| `null.sp_SavingsLetter` | PROCEDURE |
| `null.sp_Sys3000ToWinCap` | PROCEDURE |
| `null.uf_CoverPages` | INLINE TABLE FUNCTION |
| `null.uf_IsRequisitionLocked` | SCALAR FUNCTION |
| `null.uf_LookupItems` | TABLE FUNCTION |
| `null.uf_LookupItemsByCatalog` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch1` | INLINE TABLE FUNCTION |
| `null.uf_LookupItemsForBook` | TABLE FUNCTION |
| `null.uf_LookupItemsForBook1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrice1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrices` | TABLE FUNCTION |
| `null.uf_Sys3000ToWinCap` | TABLE FUNCTION |
| `null.uf_TopOrderBook` | INLINE TABLE FUNCTION |
| `dbo._sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.bid2xls` | PROCEDURE |
| `dbo.bid2xlsTest` | PROCEDURE |
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.fnParseRTF` | SCALAR FUNCTION |
| `dbo.RTF2TXT` | SCALAR FUNCTION |
| `dbo.sp_AddDistrict` | PROCEDURE |
| `dbo.sp_AddISBN` | PROCEDURE |
| `dbo.sp_AddMSRPItem` | PROCEDURE |
| `dbo.sp_AddPPCatalog` | PROCEDURE |
| `dbo.sp_AddPricePlan` | PROCEDURE |
| `dbo.sp_AddSchool` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_ApproveReq` | PROCEDURE |
| `dbo.sp_AttemptLogin` | PROCEDURE |
| `dbo.sp_AwardBid` | PROCEDURE |
| `dbo.sp_AwardBidHeader` | PROCEDURE |
| `dbo.sp_AwardBidHeaderSingleItem` | PROCEDURE |
| `dbo.sp_BAList` | PROCEDURE |
| `dbo.sp_BatchChanges` | PROCEDURE |
| `dbo.sp_BatchConvert` | PROCEDURE |
| `dbo.sp_BatchConvertNew` | PROCEDURE |
| `dbo.sp_BatchLoad` | PROCEDURE |
| `dbo.sp_BatchProcess` | PROCEDURE |
| `dbo.sp_BatchQueue` | PROCEDURE |
| `dbo.sp_BatchVerify` | PROCEDURE |
| `dbo.sp_BatchVerifyBook` | PROCEDURE |
| `dbo.sp_BatchVerifyForce` | PROCEDURE |
| `dbo.sp_BidCompare` | PROCEDURE |
| `dbo.sp_BidCompareDiscount` | PROCEDURE |
| `dbo.sp_BidCompareSame` | PROCEDURE |
| `dbo.sp_BidCompareSummary` | PROCEDURE |
| `dbo.sp_BidCopy` | PROCEDURE |
| `dbo.sp_BidCopyChangePP` | PROCEDURE |
| `dbo.sp_BidCopyWithIncrease` | PROCEDURE |
| `dbo.sp_BringBillingForward` | PROCEDURE |
| `dbo.sp_BringBillingForwardState` | PROCEDURE |
| `dbo.sp_BuildTopOrdered` | PROCEDURE |
| `dbo.sp_CanDeleteRequisition` | PROCEDURE |
| `dbo.sp_CatalogDataCheck` | PROCEDURE |
| `dbo.sp_CatalogDataPriceCheck` | PROCEDURE |
| `dbo.sp_CatalogImport` | PROCEDURE |
| `dbo.sp_CatalogImporter` | PROCEDURE |
| `dbo.sp_CatalogImporterXML` | PROCEDURE |
| `dbo.sp_CCAccountMaint` | PROCEDURE |
| `dbo.sp_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_CCAddAddendaMaint` | PROCEDURE |
| `dbo.sp_CCAnalysisReturn` | PROCEDURE |
| `dbo.sp_CCItemMaint` | PROCEDURE |
| `dbo.sp_CCSchoolMaint` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItemSizesOnly` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `dbo.sp_CCUpdateResults` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts_2` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccountsBulk` | PROCEDURE |
| `dbo.sp_CCUserAccountMaint` | PROCEDURE |
| `dbo.sp_CCUserGridMaint` | PROCEDURE |
| `dbo.sp_CombineReqs` | PROCEDURE |
| `dbo.sp_CombineReqsByVendorNoDelete` | PROCEDURE |
| `dbo.sp_CometLoad` | PROCEDURE |
| `dbo.sp_ConvertReqs` | PROCEDURE |
| `dbo.sp_ConvertTextbookReqs` | PROCEDURE |
| `dbo.sp_CopyBidImport` | PROCEDURE |
| `dbo.sp_CopyBudgetAmounts` | PROCEDURE |
| `dbo.sp_CopyCalendar` | PROCEDURE |
| `dbo.sp_CopyItems` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup-2014-10-29` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave2` | PROCEDURE |
| `dbo.sp_CopyMSRPVers3Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers4Bid` | PROCEDURE |
| `dbo.sp_CopyReqs` | PROCEDURE |
| `dbo.sp_CreateBidFromRequest` | PROCEDURE |
| `dbo.sp_CreateBidHeaderDetail` | PROCEDURE |
| `dbo.sp_CreateBidHeaderItems` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_CreateNewBidHeader` | PROCEDURE |
| `dbo.sp_CreateNewRequisition` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionV` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor_bk20250416` | PROCEDURE |
| `dbo.sp_CreateOrderBook03` | PROCEDURE |
| `dbo.sp_CreateOrderBookTest` | PROCEDURE |
| `dbo.sp_CreatePO_Saved062724` | PROCEDURE |
| `dbo.sp_CreatePOTest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequestPrebid` | PROCEDURE |
| `dbo.sp_CreateTextBookBidRequest` | PROCEDURE |
| `dbo.sp_CreateVendorSession` | PROCEDURE |
| `dbo.sp_CXmlLogin` | PROCEDURE |
| `dbo.sp_DBCheck` | PROCEDURE |
| `dbo.sp_DefragAll` | PROCEDURE |
| `dbo.sp_DeleteBatch` | PROCEDURE |
| `dbo.sp_DeleteBook` | PROCEDURE |
| `dbo.sp_DeleteDistrictPOs` | PROCEDURE |
| `dbo.sp_DeleteNoBids` | PROCEDURE |
| `dbo.sp_DeletePO` | PROCEDURE |
| `dbo.sp_DeleteRequisition` | PROCEDURE |
| `dbo.sp_DeleteRequisitionRestricted` | PROCEDURE |
| `dbo.sp_DeleteRequisitionWithDetail` | PROCEDURE |
| `dbo.sp_DeleteZeros` | PROCEDURE |
| `dbo.sp_DistrictRequisitionDetail` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_DSHeadings` | PROCEDURE |
| `dbo.sp_easyadd` | PROCEDURE |
| `dbo.sp_EDSItems` | PROCEDURE |
| `dbo.sp_EnhancedSearchItem` | PROCEDURE |
| `dbo.sp_ExportMSRPBid` | PROCEDURE |
| `dbo.sp_FA_AddUpdateAccountCode` | PROCEDURE |
| `dbo.sp_FA_ApproveReq` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin_BK_20241018_Before_EncryptedPassword` | PROCEDURE |
| `dbo.sp_FA_AvailableAccounts` | PROCEDURE |
| `dbo.sp_FA_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CreatePO` | PROCEDURE |
| `dbo.sp_FA_CreateReportSession` | PROCEDURE |
| `dbo.sp_FA_CreateReportSessionLinks` | PROCEDURE |
| `dbo.sp_FA_DeleteAccount` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition_bk20250416` | PROCEDURE |
| `dbo.sp_FA_DeleteUser` | PROCEDURE |
| `dbo.sp_FA_GetAlert` | PROCEDURE |
| `dbo.sp_FA_getUserKeys` | PROCEDURE |
| `dbo.sp_FA_NewPONumbers` | PROCEDURE |
| `dbo.sp_FA_NextPONumber` | PROCEDURE |
| `dbo.sp_FA_RequisitionsForPurchaseOrderModal` | PROCEDURE |
| `dbo.sp_FA_RequisitionsTotals` | PROCEDURE |
| `dbo.sp_FA_SaveHeading` | PROCEDURE |
| `dbo.sp_FA_SaveKeyword` | PROCEDURE |
| `dbo.sp_FA_SavePOs` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNote` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNoteEmails` | PROCEDURE |
| `dbo.sp_FA_SaveUser` | PROCEDURE |
| `dbo.sp_FA_SetBudgetAccount` | PROCEDURE |
| `dbo.sp_FA_SetUserAccount` | PROCEDURE |
| `dbo.sp_FA_UpdatePOStatus` | PROCEDURE |
| `dbo.sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.sp_FixVendorItemCode` | PROCEDURE |
| `dbo.sp_getCurrentPrices` | PROCEDURE |
| `dbo.sp_GetPODetailByIds` | PROCEDURE |
| `dbo.sp_GetRequisitionShipping` | PROCEDURE |
| `dbo.sp_GetUserRequisitions` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_HoldRequisition` | PROCEDURE |
| `dbo.sp_ImportVendorsBid` | PROCEDURE |
| `dbo.sp_IPQueueStart` | PROCEDURE |
| `dbo.sp_ISBNAdd` | PROCEDURE |
| `dbo.sp_Logout` | PROCEDURE |
| `dbo.sp_MakeReq` | PROCEDURE |
| `dbo.sp_MasterBudgetBook` | PROCEDURE |
| `dbo.sp_MergeAccounts` | PROCEDURE |
| `dbo.sp_MergeAwards` | PROCEDURE |
| `dbo.sp_MergeBidImports` | PROCEDURE |
| `dbo.sp_MergeBids` | PROCEDURE |
| `dbo.sp_MoveIndexes` | PROCEDURE |
| `dbo.sp_MoveReqs` | PROCEDURE |
| `dbo.sp_MPIHeadings` | PROCEDURE |
| `dbo.sp_MSRPExporter` | PROCEDURE |
| `dbo.sp_MSRPImporter` | PROCEDURE |
| `dbo.sp_NewReportSession` | PROCEDURE |
| `dbo.sp_NewRequisitionId_BK20250416` | PROCEDURE |
| `dbo.sp_NewUpload` | PROCEDURE |
| `dbo.sp_OrderBookMaint` | PROCEDURE |
| `dbo.sp_PAAccounts` | PROCEDURE |
| `dbo.sp_PABudgets` | PROCEDURE |
| `dbo.sp_PACategories` | PROCEDURE |
| `dbo.sp_PAComet` | PROCEDURE |
| `dbo.sp_PARequisitions` | PROCEDURE |
| `dbo.sp_PARequisitionsTest` | PROCEDURE |
| `dbo.sp_PARequisitionsTotal` | PROCEDURE |
| `dbo.sp_PASchools` | PROCEDURE |
| `dbo.sp_PAStatus` | PROCEDURE |
| `dbo.sp_PAStatusTest` | PROCEDURE |
| `dbo.sp_PAStatusTest1` | PROCEDURE |
| `dbo.sp_PAUsers` | PROCEDURE |
| `dbo.sp_PODetail` | PROCEDURE |
| `dbo.sp_PODetailLastItemOnly` | PROCEDURE |
| `dbo.sp_PrepareNextYear` | PROCEDURE |
| `dbo.sp_PrepTMSurvey` | PROCEDURE |
| `dbo.sp_ProcessCopyRequests` | PROCEDURE |
| `dbo.sp_processKill` | PROCEDURE |
| `dbo.sp_processMonitor` | PROCEDURE |
| `dbo.sp_processMonitorOrig` | PROCEDURE |
| `dbo.sp_processStatus` | PROCEDURE |
| `dbo.sp_QueueIPs` | PROCEDURE |
| `dbo.sp_QueueReqs` | PROCEDURE |
| `dbo.sp_Reaward_script` | PROCEDURE |
| `dbo.sp_RefreshAccounts` | PROCEDURE |
| `dbo.sp_RefreshDistrictVendors` | PROCEDURE |
| `dbo.sp_ReindexAll` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_ReportReqData` | PROCEDURE |
| `dbo.sp_ResetDistrictAccountingYear` | PROCEDURE |
| `dbo.sp_retrieveTagset` | PROCEDURE |
| `dbo.sp_retrieveTagsetDMS` | PROCEDURE |
| `dbo.sp_ReturnUserReqs` | PROCEDURE |
| `dbo.sp_RTK_AddReportItems` | PROCEDURE |
| `dbo.sp_RTK_Build_MSDS_and_MSDSDetail` | PROCEDURE |
| `dbo.sp_RTKExport` | PROCEDURE |
| `dbo.sp_SaveTags` | PROCEDURE |
| `dbo.sp_SchoolMerge` | PROCEDURE |
| `dbo.sp_search` | PROCEDURE |
| `dbo.sp_SearchItems` | PROCEDURE |
| `dbo.sp_SearchItemsByReqHK` | PROCEDURE |
| `dbo.sp_SessionTableUpdate` | PROCEDURE |
| `dbo.sp_SetBudgetYear` | PROCEDURE |
| `dbo.sp_SetDistrictAndBudgetYear` | PROCEDURE |
| `dbo.sp_ShowAllDefrag` | PROCEDURE |
| `dbo.sp_ShowDistribution` | PROCEDURE |
| `dbo.sp_ShowTextbookSavings` | PROCEDURE |
| `dbo.sp_SmallPOCheck` | PROCEDURE |
| `dbo.sp_SubmitRequisition` | PROCEDURE |
| `dbo.sp_SubmitRequisitionNew` | PROCEDURE |
| `dbo.sp_UAAccounts` | PROCEDURE |
| `dbo.sp_UAList` | PROCEDURE |
| `dbo.sp_UAListTotals` | PROCEDURE |
| `dbo.sp_UAUsers` | PROCEDURE |
| `dbo.sp_UnawardBidHeader` | PROCEDURE |
| `dbo.sp_UnpostCatalog` | PROCEDURE |
| `dbo.sp_UpdateAllListPrices` | PROCEDURE |
| `dbo.sp_UpdateAllReqs` | PROCEDURE |
| `dbo.sp_UpdateCatalogText` | PROCEDURE |
| `dbo.sp_UpdateCatalogTextPart` | PROCEDURE |
| `dbo.sp_UpdateDetails` | PROCEDURE |
| `dbo.sp_UpdateHeading` | PROCEDURE |
| `dbo.sp_UpdateISBN` | PROCEDURE |
| `dbo.sp_UpdateListPrices` | PROCEDURE |
| `dbo.sp_UpdateMSRPItem` | PROCEDURE |
| `dbo.sp_UpdateNextNumber` | PROCEDURE |
| `dbo.sp_UpdateReqDetail` | PROCEDURE |
| `dbo.sp_UpdateReqDetailItem` | PROCEDURE |
| `dbo.sp_UpdateReqDetailList` | PROCEDURE |
| `dbo.sp_UpdateReqDetailPricePlan` | PROCEDURE |
| `dbo.sp_UpdateReqHeader` | PROCEDURE |
| `dbo.sp_UpdateShippingCode` | PROCEDURE |
| `dbo.sp_UpdateVIC` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.sp_ValidateBidImport` | PROCEDURE |
| `dbo.sp_ValidateForPO` | PROCEDURE |
| `dbo.sp_VendorOverride` | PROCEDURE |
| `dbo.sp_VendorOverrideLine` | PROCEDURE |
| `dbo.sp_VendorOverrideOld` | PROCEDURE |
| `dbo.sp_VerifyForPO` | PROCEDURE |
| `dbo.sp_WarningsForPO` | PROCEDURE |
| `dbo.uf_ActiveAccountList` | SCALAR FUNCTION |
| `dbo.uf_AwardLetter` | TABLE FUNCTION |
| `dbo.uf_AwardLetter1` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid_Orig` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid1` | TABLE FUNCTION |
| `dbo.uf_BatchChanges` | TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailReqComb` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailRSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummary` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummaryByDistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinner` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinnerReq` | INLINE TABLE FUNCTION |
| `dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered` | TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePO` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePODistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePORSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_BillingMonths` | SCALAR FUNCTION |
| `dbo.uf_CatalogFtsHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogFtsPageHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogRefsAsp` | SCALAR FUNCTION |
| `dbo.uf_CatalogRefsDetailTest` | SCALAR FUNCTION |
| `dbo.uf_ConfiguredDistricts` | SCALAR FUNCTION |
| `dbo.uf_ContactList` | SCALAR FUNCTION |
| `dbo.uf_ContactListHtml` | SCALAR FUNCTION |
| `dbo.uf_ContactListText` | SCALAR FUNCTION |
| `dbo.uf_CrossRefs2TextOrig` | SCALAR FUNCTION |
| `dbo.uf_DecodeChargeDates` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtra` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtraNH` | SCALAR FUNCTION |
| `dbo.uf_DistrictPaymentHistory` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentHistoryBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBO` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | TABLE FUNCTION |
| `dbo.uf_DistrictProposedFees` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary1_Test` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2Off` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryBidHeader` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors1` | TABLE FUNCTION |
| `dbo.uf_ExportMSRPBid` | TABLE FUNCTION |
| `dbo.uf_FA_ApprovalUserTree` | TABLE FUNCTION |
| `dbo.uf_FA_UserApproverTree` | TABLE FUNCTION |
| `dbo.uf_FirstPhrase` | SCALAR FUNCTION |
| `dbo.uf_FixExtended` | SCALAR FUNCTION |
| `dbo.uf_FormatDateDisplay` | SCALAR FUNCTION |
| `dbo.uf_IsBid` | SCALAR FUNCTION |
| `dbo.uf_IsRequisitionLocked2` | SCALAR FUNCTION |
| `dbo.uf_LineCount` | SCALAR FUNCTION |
| `dbo.uf_LookupItemCode` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH1` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReq-120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqOld120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqSaved` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendorTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeReq` | TABLE FUNCTION |
| `dbo.uf_LookupItems` | TABLE FUNCTION |
| `dbo.uf_LookupPrice` | TABLE FUNCTION |
| `dbo.uf_LookupPriceByBHLong` | TABLE FUNCTION |
| `dbo.uf_MSRPCheckManufacturerAndNumber` | TABLE FUNCTION |
| `dbo.uf_MyUserTree` | TABLE FUNCTION |
| `dbo.uf_NameParser` | TABLE FUNCTION |
| `dbo.uf_NewSavingsLetter` | TABLE FUNCTION |
| `dbo.uf_NextLowestPrice` | SCALAR FUNCTION |
| `dbo.uf_NextLowestPriceId` | SCALAR FUNCTION |
| `dbo.uf_OrderBook` | TABLE FUNCTION |
| `dbo.uf_OrderBook03` | TABLE FUNCTION |
| `dbo.uf_OrderBookNew` | TABLE FUNCTION |
| `dbo.uf_OrderBookSaved` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest1` | TABLE FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | TABLE FUNCTION |
| `dbo.uf_PackCode_New` | SCALAR FUNCTION |
| `dbo.uf_PackCode_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalog_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalogTest` | SCALAR FUNCTION |
| `dbo.uf_PackCodeExport_Old` | SCALAR FUNCTION |
| `dbo.uf_PARequisitions` | TABLE FUNCTION |
| `dbo.uf_PARequisitionsTest` | TABLE FUNCTION |
| `dbo.uf_POAccountList` | TABLE FUNCTION |
| `dbo.uf_POAccountsUsed` | TABLE FUNCTION |
| `dbo.uf_POAttentionList` | TABLE FUNCTION |
| `dbo.uf_POAttentionListCount` | SCALAR FUNCTION |
| `dbo.uf_PODetail` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary1` | TABLE FUNCTION |
| `dbo.uf_POHeader` | TABLE FUNCTION |
| `dbo.uf_PricePlanSummary` | TABLE FUNCTION |
| `dbo.uf_ProposedDistrictPaymentSchedule` | TABLE FUNCTION |
| `dbo.uf_RemoveHighOrder` | SCALAR FUNCTION |
| `dbo.uf_RequisitionCategories` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionCategoriesTest` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionData` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionList` | TABLE FUNCTION |
| `dbo.uf_RequisitionListSelective` | TABLE FUNCTION |
| `dbo.uf_RequisitionListTest` | TABLE FUNCTION |
| `dbo.uf_RTKItems` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKItemsRev2` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKUnassignedShipLocations` | INLINE TABLE FUNCTION |
| `dbo.uf_SavingsLetter` | TABLE FUNCTION |
| `dbo.uf_SavingsLetter2` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty1` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCountyNew` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterOld` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterState` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterSummary` | TABLE FUNCTION |
| `dbo.uf_ScanDocSelectStatement` | SCALAR FUNCTION |
| `dbo.uf_SchoolNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_SearchDistrictDetail` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetail_Orig` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetailNew` | TABLE FUNCTION |
| `dbo.uf_SearchItemsDetail` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchItemsHeadings` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchKeywords` | SCALAR FUNCTION |
| `dbo.uf_SecondPhrase` | SCALAR FUNCTION |
| `dbo.uf_SecondWord` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq1` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq2` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq3` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeqTest` | SCALAR FUNCTION |
| `dbo.uf_ShippingNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_ShowDistribution` | TABLE FUNCTION |
| `dbo.uf_Status` | TABLE FUNCTION |
| `dbo.uf_TMTradeVendorSummary` | SCALAR FUNCTION |
| `dbo.uf_Trim` | SCALAR FUNCTION |
| `dbo.uf_UserEmailTree` | TABLE FUNCTION |
| `dbo.uf_UserTreeApprover` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudget` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetFiltered` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetWork` | TABLE FUNCTION |
| `dbo.uf_UserTrees` | TABLE FUNCTION |
| `dbo.uf_UserTreesDistrict` | TABLE FUNCTION |
| `dbo.uf_VendorBidContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorBidNumbers` | SCALAR FUNCTION |
| `dbo.uf_VendorContacts` | SCALAR FUNCTION |
| `dbo.uf_VendorPOContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorSummary` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsDetail` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsItem` | TABLE FUNCTION |
| `dbo.ufn_GetHazardsDescription` | SCALAR FUNCTION |
| `dbo.ufn_GetMSDSSheets` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNonHazardous` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNotScanned` | TABLE FUNCTION |
| `dbo.ufn_VerifyForPO` | TABLE FUNCTION |
| `dbo.UrlDecode` | SCALAR FUNCTION |
| `dbo.usp_BidMatchRefs` | PROCEDURE |
| `dbo.usp_BidPageNumberUpdate` | PROCEDURE |
| `dbo.usp_BidRanking` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetail_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavid` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailTempKevin_notused` | PROCEDURE |
| `dbo.usp_BidRequestMergeActions` | PROCEDURE |
| `dbo.usp_BidRequestMergeActionsUNDO-wait` | PROCEDURE |
| `dbo.usp_BringAccountsForward` | PROCEDURE |
| `dbo.usp_ChangeBidHeaderNumber` | PROCEDURE |
| `dbo.usp_CheckVendorComplianceForPOs` | PROCEDURE |
| `dbo.usp_ContinuanceAcceptance` | PROCEDURE |
| `dbo.usp_CopyRequisition` | PROCEDURE |
| `dbo.usp_CreateFreightRequest` | PROCEDURE |
| `dbo.usp_DetailedIdentityColumnsReport` | PROCEDURE |
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed` | PROCEDURE |
| `dbo.usp_EndPOSend` | PROCEDURE |
| `dbo.usp_FindEmail` | PROCEDURE |
| `dbo.usp_FindEmail_BK` | PROCEDURE |
| `dbo.usp_GeneratePassword` | PROCEDURE |
| `dbo.usp_GeneratePassword_Print` | PROCEDURE |
| `dbo.usp_GetBidItemAIData` | PROCEDURE |
| `dbo.usp_GetBidItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetImageList` | PROCEDURE |
| `dbo.usp_GetItemAIData` | PROCEDURE |
| `dbo.usp_GetItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetMSDSSheets` | PROCEDURE |
| `dbo.usp_getMyLastYearsReqs` | PROCEDURE |
| `dbo.usp_GetNextPONumber` | PROCEDURE |
| `dbo.usp_GetPODetail` | PROCEDURE |
| `dbo.usp_GetPODetail_Test` | PROCEDURE |
| `dbo.usp_GetPOs` | PROCEDURE |
| `dbo.usp_GetPOs_Test` | PROCEDURE |
| `dbo.usp_getSDSDocsAll` | PROCEDURE |
| `dbo.usp_getSDSDocsDistrict` | PROCEDURE |
| `dbo.usp_getSDSDocsSchool` | PROCEDURE |
| `dbo.usp_getSDSDocsUser` | PROCEDURE |
| `dbo.usp_getSDSheets` | PROCEDURE |
| `dbo.usp_getSDSItems` | PROCEDURE |
| `dbo.usp_GetSDSURLs` | PROCEDURE |
| `dbo.usp_GetVendorPricing` | PROCEDURE |
| `dbo.usp_ImportUser` | PROCEDURE |
| `dbo.usp_MakeZ$` | PROCEDURE |
| `dbo.usp_MakeZC` | PROCEDURE |
| `dbo.usp_MissingHeaders` | PROCEDURE |
| `dbo.usp_mySDS` | PROCEDURE |
| `dbo.usp_OrderEZVendors` | PROCEDURE |
| `dbo.usp_POPrintExport` | PROCEDURE |
| `dbo.usp_POStatusByRep` | PROCEDURE |
| `dbo.usp_POStatusByState` | PROCEDURE |
| `dbo.usp_POStatusUpdates` | PROCEDURE |
| `dbo.usp_QueuePOsToSend` | PROCEDURE |
| `dbo.usp_RestoreBidHeaderNumber` | PROCEDURE |
| `dbo.usp_SavePositionData` | PROCEDURE |
| `dbo.usp_SDSDocs` | PROCEDURE |
| `dbo.usp_SearchItems_SearchDataDB` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS_David` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSDavid` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSError` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSTest` | PROCEDURE |
| `dbo.usp_SearchVendors` | PROCEDURE |
| `dbo.usp_SetBidItemAIData` | PROCEDURE |
| `dbo.usp_SetItemAIData` | PROCEDURE |
| `dbo.usp_SetPricing` | PROCEDURE |
| `dbo.usp_SetPricing_SearchDataDB` | PROCEDURE |
| `dbo.usp_ShowItemURLs` | PROCEDURE |
| `dbo.usp_StartPOSend` | PROCEDURE |
| `dbo.usp_StoreImage` | PROCEDURE |
| `dbo.usp_StoreImageDone` | PROCEDURE |
| `dbo.usp_StoreImageError` | PROCEDURE |
| `dbo.usp_StoreVendorOrder` | PROCEDURE |
| `dbo.usp_TransactionLogMover` | PROCEDURE |
| `dbo.usp_TransactionLogMoverArc` | PROCEDURE |
| `dbo.usp_UpdateBudgets` | PROCEDURE |
| `dbo.usp_UpdatePONextNumber` | PROCEDURE |
| `dbo.usp_UpdatePONumbers` | PROCEDURE |
| `dbo.usp_validateRequisitionStatuses` | PROCEDURE |
| `dbo.usp_VendorStatsCYvsLY` | PROCEDURE |
| `dbo.usp_WaitingTasks` | PROCEDURE |
| `dbo.x_TestErrorHandling` | PROCEDURE |

## `EDS_Test`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`archive.allitems`](tables/EDS_Test/archive.allitems.md) | 0 |
| [`archive.Approvals`](tables/EDS_Test/archive.Approvals.md) | 3517361 |
| [`archive.ApprovalsHistory`](tables/EDS_Test/archive.ApprovalsHistory.md) | 447389 |
| [`archive.Awards`](tables/EDS_Test/archive.Awards.md) | 143977 |
| [`archive.BatchDetail`](tables/EDS_Test/archive.BatchDetail.md) | 4060286 |
| [`archive.BidHeaderCheckList`](tables/EDS_Test/archive.BidHeaderCheckList.md) | 4521 |
| [`archive.BidHeaderDetail`](tables/EDS_Test/archive.BidHeaderDetail.md) | 26252593 |
| [`archive.BidHeaderDocument`](tables/EDS_Test/archive.BidHeaderDocument.md) | 11787 |
| [`archive.BidHeaderDocuments`](tables/EDS_Test/archive.BidHeaderDocuments.md) | 0 |
| [`archive.BidHeaders`](tables/EDS_Test/archive.BidHeaders.md) | 3395 |
| [`archive.BidImports`](tables/EDS_Test/archive.BidImports.md) | 42011 |
| [`archive.BidMappedItems`](tables/EDS_Test/archive.BidMappedItems.md) | 0 |
| [`archive.BidMSRPResults`](tables/EDS_Test/archive.BidMSRPResults.md) | 10848 |
| [`archive.BidReawards`](tables/EDS_Test/archive.BidReawards.md) | 0 |
| [`archive.BidRequestItems`](tables/EDS_Test/archive.BidRequestItems.md) | 5704577 |
| [`archive.BidRequestManufacturer`](tables/EDS_Test/archive.BidRequestManufacturer.md) | 0 |
| [`archive.BidRequestOptions`](tables/EDS_Test/archive.BidRequestOptions.md) | 0 |
| [`archive.BidRequestPriceRanges`](tables/EDS_Test/archive.BidRequestPriceRanges.md) | 0 |
| [`archive.BidResults`](tables/EDS_Test/archive.BidResults.md) | 30585282 |
| [`archive.Bids`](tables/EDS_Test/archive.Bids.md) | 172256 |
| [`archive.BidTrades`](tables/EDS_Test/archive.BidTrades.md) | 119 |
| [`archive.Catalog`](tables/EDS_Test/archive.Catalog.md) | 2422 |
| [`archive.cxmlSession`](tables/EDS_Test/archive.cxmlSession.md) | 50022 |
| [`archive.Detail`](tables/EDS_Test/archive.Detail.md) | 25480018 |
| [`archive.DetailHold`](tables/EDS_Test/archive.DetailHold.md) | 0 |
| [`archive.DetailMatch`](tables/EDS_Test/archive.DetailMatch.md) | 1499 |
| [`archive.DMSBidDocuments`](tables/EDS_Test/archive.DMSBidDocuments.md) | 0 |
| [`archive.DMSVendorBidDocuments`](tables/EDS_Test/archive.DMSVendorBidDocuments.md) | 0 |
| [`archive.FreezeItems`](tables/EDS_Test/archive.FreezeItems.md) | 0 |
| [`archive.ItemContractPrices`](tables/EDS_Test/archive.ItemContractPrices.md) | 0 |
| [`archive.OrderBooks`](tables/EDS_Test/archive.OrderBooks.md) | 692 |
| [`archive.PO`](tables/EDS_Test/archive.PO.md) | 1300617 |
| [`archive.PODetailItems`](tables/EDS_Test/archive.PODetailItems.md) | 22905929 |
| [`archive.POTempDetails`](tables/EDS_Test/archive.POTempDetails.md) | 0 |
| [`archive.Prices`](tables/EDS_Test/archive.Prices.md) | 0 |
| [`archive.PricingConsolidatedOrderCounts`](tables/EDS_Test/archive.PricingConsolidatedOrderCounts.md) | 0 |
| [`archive.PricingMap`](tables/EDS_Test/archive.PricingMap.md) | 0 |
| [`archive.PricingUpdate`](tables/EDS_Test/archive.PricingUpdate.md) | 0 |
| [`archive.RequisitionChangeLog`](tables/EDS_Test/archive.RequisitionChangeLog.md) | 1936897 |
| [`archive.Requisitions`](tables/EDS_Test/archive.Requisitions.md) | 1433904 |
| [`archive.TMAwards`](tables/EDS_Test/archive.TMAwards.md) | 29335 |
| [`archive.UserAccounts`](tables/EDS_Test/archive.UserAccounts.md) | 2704140 |
| [`archive.UserAccountsUserAccountId_CrossMapping`](tables/EDS_Test/archive.UserAccountsUserAccountId_CrossMapping.md) | 2704140 |
| [`archive.VendorDocRequest`](tables/EDS_Test/archive.VendorDocRequest.md) | 0 |
| [`archive.VendorDocRequestDetail`](tables/EDS_Test/archive.VendorDocRequestDetail.md) | 0 |
| [`archive.VendorQuery`](tables/EDS_Test/archive.VendorQuery.md) | 4057 |
| [`archive.VendorQueryDetail`](tables/EDS_Test/archive.VendorQueryDetail.md) | 39321 |
| [`archive.VendorQueryMSRP`](tables/EDS_Test/archive.VendorQueryMSRP.md) | 0 |
| [`archive.VendorQueryMSRPDetail`](tables/EDS_Test/archive.VendorQueryMSRPDetail.md) | 0 |
| [`archive.VendorQueryTandM`](tables/EDS_Test/archive.VendorQueryTandM.md) | 7 |
| [`archive.VendorQueryTandMDetail`](tables/EDS_Test/archive.VendorQueryTandMDetail.md) | 0 |
| [`dbo.AccountingDetail`](tables/EDS_Test/dbo.AccountingDetail.md) | 0 |
| [`dbo.AccountingFormats`](tables/EDS_Test/dbo.AccountingFormats.md) | 49 |
| [`dbo.AccountingUserFields`](tables/EDS_Test/dbo.AccountingUserFields.md) | 80 |
| [`dbo.AccountSeparators`](tables/EDS_Test/dbo.AccountSeparators.md) | 0 |
| [`dbo.AddendumItems`](tables/EDS_Test/dbo.AddendumItems.md) | 0 |
| [`dbo.additems`](tables/EDS_Test/dbo.additems.md) | 0 |
| [`dbo.Alerts`](tables/EDS_Test/dbo.Alerts.md) | 4 |
| [`dbo.allitems`](tables/EDS_Test/dbo.allitems.md) | 6276768 |
| [`dbo.AnswerTypes`](tables/EDS_Test/dbo.AnswerTypes.md) | 0 |
| [`dbo.ApprovalLevels`](tables/EDS_Test/dbo.ApprovalLevels.md) | 9 |
| [`dbo.Approvals`](tables/EDS_Test/dbo.Approvals.md) | 7818091 |
| [`dbo.ApprovalsHistory`](tables/EDS_Test/dbo.ApprovalsHistory.md) | 331991 |
| [`dbo.Audit`](tables/EDS_Test/dbo.Audit.md) | 2568656 |
| [`dbo.AuditLog`](tables/EDS_Test/dbo.AuditLog.md) | 0 |
| [`dbo.Awardings`](tables/EDS_Test/dbo.Awardings.md) | 10991 |
| [`dbo.Awards`](tables/EDS_Test/dbo.Awards.md) | 135407 |
| [`dbo.AwardsCatalogList`](tables/EDS_Test/dbo.AwardsCatalogList.md) | 82267 |
| [`dbo.AwardTypes`](tables/EDS_Test/dbo.AwardTypes.md) | 2 |
| [`dbo.BatchBook`](tables/EDS_Test/dbo.BatchBook.md) | 217611 |
| [`dbo.BatchDetail`](tables/EDS_Test/dbo.BatchDetail.md) | 5020036 |
| [`dbo.BatchDetailInserts`](tables/EDS_Test/dbo.BatchDetailInserts.md) | 1176 |
| [`dbo.Batches`](tables/EDS_Test/dbo.Batches.md) | 14507 |
| [`dbo.BidCalendar`](tables/EDS_Test/dbo.BidCalendar.md) | 1 |
| [`dbo.BidderCheckList`](tables/EDS_Test/dbo.BidderCheckList.md) | 140 |
| [`dbo.BidderCheckListPkgDetail`](tables/EDS_Test/dbo.BidderCheckListPkgDetail.md) | 1195 |
| [`dbo.BidderCheckListPkgHeader`](tables/EDS_Test/dbo.BidderCheckListPkgHeader.md) | 56 |
| [`dbo.BidDocument`](tables/EDS_Test/dbo.BidDocument.md) | 10548 |
| [`dbo.BidDocumentTypes`](tables/EDS_Test/dbo.BidDocumentTypes.md) | 298 |
| [`dbo.BidHeaderCheckList`](tables/EDS_Test/dbo.BidHeaderCheckList.md) | 110342 |
| [`dbo.BidHeaderDetail`](tables/EDS_Test/dbo.BidHeaderDetail.md) | 123789151 |
| [`dbo.BidHeaderDetail_Orig`](tables/EDS_Test/dbo.BidHeaderDetail_Orig.md) | 102658927 |
| [`dbo.BidHeaderDocument`](tables/EDS_Test/dbo.BidHeaderDocument.md) | 161370 |
| [`dbo.BidHeaderDocuments`](tables/EDS_Test/dbo.BidHeaderDocuments.md) | 1 |
| [`dbo.BidImportCatalogList`](tables/EDS_Test/dbo.BidImportCatalogList.md) | 32919 |
| [`dbo.BidImportCounties`](tables/EDS_Test/dbo.BidImportCounties.md) | 63196 |
| [`dbo.BidImports`](tables/EDS_Test/dbo.BidImports.md) | 54560 |
| [`dbo.BidItems`](tables/EDS_Test/dbo.BidItems.md) | 26861506 |
| [`dbo.BidManagers`](tables/EDS_Test/dbo.BidManagers.md) | 0 |
| [`dbo.BidManufacturers`](tables/EDS_Test/dbo.BidManufacturers.md) | 251771 |
| [`dbo.BidMappedItems`](tables/EDS_Test/dbo.BidMappedItems.md) | 1456770 |
| [`dbo.BidMgrConfiguration`](tables/EDS_Test/dbo.BidMgrConfiguration.md) | 1 |
| [`dbo.BidMgrTagFile`](tables/EDS_Test/dbo.BidMgrTagFile.md) | 4314063 |
| [`dbo.BidMSRPResultPrices`](tables/EDS_Test/dbo.BidMSRPResultPrices.md) | 422692 |
| [`dbo.BidMSRPResults`](tables/EDS_Test/dbo.BidMSRPResults.md) | 40980 |
| [`dbo.BidMSRPResultsProductLines`](tables/EDS_Test/dbo.BidMSRPResultsProductLines.md) | 110442 |
| [`dbo.BidPackage`](tables/EDS_Test/dbo.BidPackage.md) | 50 |
| [`dbo.BidPackageDocument`](tables/EDS_Test/dbo.BidPackageDocument.md) | 1428 |
| [`dbo.BidProductLinePrices`](tables/EDS_Test/dbo.BidProductLinePrices.md) | 1309559 |
| [`dbo.BidProductLines`](tables/EDS_Test/dbo.BidProductLines.md) | 283550 |
| [`dbo.BidReawards`](tables/EDS_Test/dbo.BidReawards.md) | 611 |
| [`dbo.BidRequestItemMergeActions`](tables/EDS_Test/dbo.BidRequestItemMergeActions.md) | 36542 |
| [`dbo.BidRequestItemMergeActions_Orig`](tables/EDS_Test/dbo.BidRequestItemMergeActions_Orig.md) | 27168 |
| [`dbo.BidRequestItemMergeActions_Saved_101521`](tables/EDS_Test/dbo.BidRequestItemMergeActions_Saved_101521.md) | 27298 |
| [`dbo.BidRequestItems`](tables/EDS_Test/dbo.BidRequestItems.md) | 27854935 |
| [`dbo.BidRequestItems_Orig`](tables/EDS_Test/dbo.BidRequestItems_Orig.md) | 25521585 |
| [`dbo.BidRequestOptions`](tables/EDS_Test/dbo.BidRequestOptions.md) | 422035 |
| [`dbo.BidRequestPriceRanges`](tables/EDS_Test/dbo.BidRequestPriceRanges.md) | 1897760 |
| [`dbo.BidRequestProductLines`](tables/EDS_Test/dbo.BidRequestProductLines.md) | 175875 |
| [`dbo.BidResponses`](tables/EDS_Test/dbo.BidResponses.md) | 1 |
| [`dbo.BidResultChanges`](tables/EDS_Test/dbo.BidResultChanges.md) | 18229521 |
| [`dbo.BidResults`](tables/EDS_Test/dbo.BidResults.md) | 33034634 |
| [`dbo.BidResults_Orig`](tables/EDS_Test/dbo.BidResults_Orig.md) | 55592743 |
| [`dbo.BidResultsChangeLog`](tables/EDS_Test/dbo.BidResultsChangeLog.md) | 238978 |
| [`dbo.Bids`](tables/EDS_Test/dbo.Bids.md) | 143402 |
| [`dbo.BidsCatalogList`](tables/EDS_Test/dbo.BidsCatalogList.md) | 82432 |
| [`dbo.BidTradeCounties`](tables/EDS_Test/dbo.BidTradeCounties.md) | 42912 |
| [`dbo.BidTypes`](tables/EDS_Test/dbo.BidTypes.md) | 2 |
| [`dbo.BookTypes`](tables/EDS_Test/dbo.BookTypes.md) | 4 |
| [`dbo.CalDistricts`](tables/EDS_Test/dbo.CalDistricts.md) | 0 |
| [`dbo.CalendarDates`](tables/EDS_Test/dbo.CalendarDates.md) | 2261 |
| [`dbo.CalendarIB`](tables/EDS_Test/dbo.CalendarIB.md) | 684 |
| [`dbo.CalendarItems`](tables/EDS_Test/dbo.CalendarItems.md) | 0 |
| [`dbo.Calendars`](tables/EDS_Test/dbo.Calendars.md) | 300 |
| [`dbo.CalendarTypes`](tables/EDS_Test/dbo.CalendarTypes.md) | 2 |
| [`dbo.Carolina Living Items`](tables/EDS_Test/dbo.Carolina_Living_Items.md) | 2017 |
| [`dbo.CatalogImportFields`](tables/EDS_Test/dbo.CatalogImportFields.md) | 15 |
| [`dbo.CatalogImportMap`](tables/EDS_Test/dbo.CatalogImportMap.md) | 0 |
| [`dbo.CatalogPricing`](tables/EDS_Test/dbo.CatalogPricing.md) | 0 |
| [`dbo.CatalogText`](tables/EDS_Test/dbo.CatalogText.md) | 112799 |
| [`dbo.CatalogTextParts`](tables/EDS_Test/dbo.CatalogTextParts.md) | 17179537 |
| [`dbo.CatList`](tables/EDS_Test/dbo.CatList.md) | 155059 |
| [`dbo.CertificateAuthority`](tables/EDS_Test/dbo.CertificateAuthority.md) | 1 |
| [`dbo.ChargeTypes`](tables/EDS_Test/dbo.ChargeTypes.md) | 14 |
| [`dbo.CommonMSRPVendorQuery`](tables/EDS_Test/dbo.CommonMSRPVendorQuery.md) | 4 |
| [`dbo.CommonTandMVendorQuery`](tables/EDS_Test/dbo.CommonTandMVendorQuery.md) | 22 |
| [`dbo.CommonVendorQuery`](tables/EDS_Test/dbo.CommonVendorQuery.md) | 43 |
| [`dbo.CommonVendorQueryAnswer`](tables/EDS_Test/dbo.CommonVendorQueryAnswer.md) | 0 |
| [`dbo.ContractTypes`](tables/EDS_Test/dbo.ContractTypes.md) | 0 |
| [`dbo.Control`](tables/EDS_Test/dbo.Control.md) | 1 |
| [`dbo.Coops`](tables/EDS_Test/dbo.Coops.md) | 20 |
| [`dbo.CopyRequests`](tables/EDS_Test/dbo.CopyRequests.md) | 23472 |
| [`dbo.Counties`](tables/EDS_Test/dbo.Counties.md) | 78 |
| [`dbo.CoverView`](tables/EDS_Test/dbo.CoverView.md) | 0 |
| [`dbo.CrossRefs`](tables/EDS_Test/dbo.CrossRefs.md) | 149041697 |
| [`dbo.CSCommands`](tables/EDS_Test/dbo.CSCommands.md) | 16 |
| [`dbo.CSMessageFiles`](tables/EDS_Test/dbo.CSMessageFiles.md) | 0 |
| [`dbo.CSMessages`](tables/EDS_Test/dbo.CSMessages.md) | 11600 |
| [`dbo.CSRep`](tables/EDS_Test/dbo.CSRep.md) | 45 |
| [`dbo.CXmlSession`](tables/EDS_Test/dbo.CXmlSession.md) | 64669 |
| [`dbo.dchtest`](tables/EDS_Test/dbo.dchtest.md) | 1192 |
| [`dbo.DebugMsgs`](tables/EDS_Test/dbo.DebugMsgs.md) | 20689445 |
| [`dbo.DebugMsgs_Orig`](tables/EDS_Test/dbo.DebugMsgs_Orig.md) | 5211696 |
| [`dbo.DetailChangeLog`](tables/EDS_Test/dbo.DetailChangeLog.md) | 2924942 |
| [`dbo.DetailChanges`](tables/EDS_Test/dbo.DetailChanges.md) | 26502061 |
| [`dbo.DetailHold`](tables/EDS_Test/dbo.DetailHold.md) | 1 |
| [`dbo.DetailMatch`](tables/EDS_Test/dbo.DetailMatch.md) | 103534 |
| [`dbo.DetailNotifications`](tables/EDS_Test/dbo.DetailNotifications.md) | 2777000 |
| [`dbo.DetailUploads`](tables/EDS_Test/dbo.DetailUploads.md) | 0 |
| [`dbo.DistrictCategories`](tables/EDS_Test/dbo.DistrictCategories.md) | 125118 |
| [`dbo.DistrictCategoryTitles`](tables/EDS_Test/dbo.DistrictCategoryTitles.md) | 0 |
| [`dbo.DistrictCharges`](tables/EDS_Test/dbo.DistrictCharges.md) | 22481 |
| [`dbo.DistrictChargesNotes`](tables/EDS_Test/dbo.DistrictChargesNotes.md) | 0 |
| [`dbo.DistrictContacts`](tables/EDS_Test/dbo.DistrictContacts.md) | 3813 |
| [`dbo.DistrictContactTypes`](tables/EDS_Test/dbo.DistrictContactTypes.md) | 7 |
| [`dbo.DistrictContinuances`](tables/EDS_Test/dbo.DistrictContinuances.md) | 14397 |
| [`dbo.DistrictNotes`](tables/EDS_Test/dbo.DistrictNotes.md) | 76 |
| [`dbo.DistrictNoteType`](tables/EDS_Test/dbo.DistrictNoteType.md) | 3 |
| [`dbo.DistrictNotifications`](tables/EDS_Test/dbo.DistrictNotifications.md) | 6043 |
| [`dbo.DistrictProposedCharges`](tables/EDS_Test/dbo.DistrictProposedCharges.md) | 11999 |
| [`dbo.DistrictReports`](tables/EDS_Test/dbo.DistrictReports.md) | 11 |
| [`dbo.DistrictTypes`](tables/EDS_Test/dbo.DistrictTypes.md) | 6 |
| [`dbo.DMSBidDocuments`](tables/EDS_Test/dbo.DMSBidDocuments.md) | 29010 |
| [`dbo.DMSSDSDocuments`](tables/EDS_Test/dbo.DMSSDSDocuments.md) | 602 |
| [`dbo.DMSVendorBidDocuments`](tables/EDS_Test/dbo.DMSVendorBidDocuments.md) | 736011 |
| [`dbo.DMSVendorDocuments`](tables/EDS_Test/dbo.DMSVendorDocuments.md) | 6485 |
| [`dbo.EmailBlast`](tables/EDS_Test/dbo.EmailBlast.md) | 16600 |
| [`dbo.EmailBlastAddresses08132012`](tables/EDS_Test/dbo.EmailBlastAddresses08132012.md) | 271 |
| [`dbo.EmailBlastCopy`](tables/EDS_Test/dbo.EmailBlastCopy.md) | 3 |
| [`dbo.EmailBlastLog`](tables/EDS_Test/dbo.EmailBlastLog.md) | 1427462 |
| [`dbo.FreezeItems`](tables/EDS_Test/dbo.FreezeItems.md) | 15435 |
| [`dbo.FreezeItems2015`](tables/EDS_Test/dbo.FreezeItems2015.md) | 102339 |
| [`dbo.HeaderWorkItems`](tables/EDS_Test/dbo.HeaderWorkItems.md) | 491824 |
| [`dbo.Headings`](tables/EDS_Test/dbo.Headings.md) | 166563 |
| [`dbo.HolidayCalendar`](tables/EDS_Test/dbo.HolidayCalendar.md) | 29 |
| [`dbo.HolidayCalendarVendor`](tables/EDS_Test/dbo.HolidayCalendarVendor.md) | 7 |
| [`dbo.ImageErrors`](tables/EDS_Test/dbo.ImageErrors.md) | 26727 |
| [`dbo.ImageLog`](tables/EDS_Test/dbo.ImageLog.md) | 1788706 |
| [`dbo.Images`](tables/EDS_Test/dbo.Images.md) | 1736177 |
| [`dbo.ImportCatalogDetail`](tables/EDS_Test/dbo.ImportCatalogDetail.md) | 17593 |
| [`dbo.ImportCatalogHeader`](tables/EDS_Test/dbo.ImportCatalogHeader.md) | 2815 |
| [`dbo.ImportDetail`](tables/EDS_Test/dbo.ImportDetail.md) | 882935 |
| [`dbo.ImportMessages`](tables/EDS_Test/dbo.ImportMessages.md) | 5500 |
| [`dbo.ImportProcesses`](tables/EDS_Test/dbo.ImportProcesses.md) | 754 |
| [`dbo.Imports`](tables/EDS_Test/dbo.Imports.md) | 301 |
| [`dbo.InstructionBookContents`](tables/EDS_Test/dbo.InstructionBookContents.md) | 31 |
| [`dbo.InstructionBookTypes`](tables/EDS_Test/dbo.InstructionBookTypes.md) | 6 |
| [`dbo.Instructions`](tables/EDS_Test/dbo.Instructions.md) | 7 |
| [`dbo.Invoices`](tables/EDS_Test/dbo.Invoices.md) | 0 |
| [`dbo.InvoiceTypes`](tables/EDS_Test/dbo.InvoiceTypes.md) | 0 |
| [`dbo.IPQueue`](tables/EDS_Test/dbo.IPQueue.md) | 5038 |
| [`dbo.IPQueueUsers`](tables/EDS_Test/dbo.IPQueueUsers.md) | 489217 |
| [`dbo.ItemContractPrices`](tables/EDS_Test/dbo.ItemContractPrices.md) | 0 |
| [`dbo.ItemDocuments`](tables/EDS_Test/dbo.ItemDocuments.md) | 0 |
| [`dbo.Items`](tables/EDS_Test/dbo.Items.md) | 30147867 |
| [`dbo.ItemUpdates`](tables/EDS_Test/dbo.ItemUpdates.md) | 198886 |
| [`dbo.jSessions`](tables/EDS_Test/dbo.jSessions.md) | 0 |
| [`dbo.Keywords`](tables/EDS_Test/dbo.Keywords.md) | 25261 |
| [`dbo.Ledger`](tables/EDS_Test/dbo.Ledger.md) | 0 |
| [`dbo.LL_RepArea`](tables/EDS_Test/dbo.LL_RepArea.md) | 0 |
| [`dbo.LL_RepLay`](tables/EDS_Test/dbo.LL_RepLay.md) | 0 |
| [`dbo.ManufacturerProductLines`](tables/EDS_Test/dbo.ManufacturerProductLines.md) | 14292 |
| [`dbo.Manufacturers`](tables/EDS_Test/dbo.Manufacturers.md) | 9001 |
| [`dbo.MappedItems`](tables/EDS_Test/dbo.MappedItems.md) | 2 |
| [`dbo.Menus`](tables/EDS_Test/dbo.Menus.md) | 4 |
| [`dbo.Messages`](tables/EDS_Test/dbo.Messages.md) | 0 |
| [`dbo.Months`](tables/EDS_Test/dbo.Months.md) | 12 |
| [`dbo.MSRPExcelExport`](tables/EDS_Test/dbo.MSRPExcelExport.md) | 563 |
| [`dbo.MSRPExcelImport`](tables/EDS_Test/dbo.MSRPExcelImport.md) | 76315 |
| [`dbo.MSRPOptions`](tables/EDS_Test/dbo.MSRPOptions.md) | 12 |
| [`dbo.NextNumber`](tables/EDS_Test/dbo.NextNumber.md) | 24209 |
| [`dbo.NotificationOptions`](tables/EDS_Test/dbo.NotificationOptions.md) | 4 |
| [`dbo.Notifications`](tables/EDS_Test/dbo.Notifications.md) | 720 |
| [`dbo.OBPrices`](tables/EDS_Test/dbo.OBPrices.md) | 0 |
| [`dbo.OBView`](tables/EDS_Test/dbo.OBView.md) | 0 |
| [`dbo.Options`](tables/EDS_Test/dbo.Options.md) | 0 |
| [`dbo.OptionsLink`](tables/EDS_Test/dbo.OptionsLink.md) | 0 |
| [`dbo.OrderBookAlwaysAdd`](tables/EDS_Test/dbo.OrderBookAlwaysAdd.md) | 9 |
| [`dbo.OrderBookDetail`](tables/EDS_Test/dbo.OrderBookDetail.md) | 37803703 |
| [`dbo.OrderBookDetailOld`](tables/EDS_Test/dbo.OrderBookDetailOld.md) | 187630151 |
| [`dbo.OrderBookLog`](tables/EDS_Test/dbo.OrderBookLog.md) | 474296 |
| [`dbo.OrderBooks`](tables/EDS_Test/dbo.OrderBooks.md) | 30398 |
| [`dbo.OrderBookTypes`](tables/EDS_Test/dbo.OrderBookTypes.md) | 12 |
| [`dbo.Payments`](tables/EDS_Test/dbo.Payments.md) | 0 |
| [`dbo.PaymentTypes`](tables/EDS_Test/dbo.PaymentTypes.md) | 0 |
| [`dbo.PendingApprovals`](tables/EDS_Test/dbo.PendingApprovals.md) | 564839 |
| [`dbo.POIDTable`](tables/EDS_Test/dbo.POIDTable.md) | 0 |
| [`dbo.POLayoutDetail`](tables/EDS_Test/dbo.POLayoutDetail.md) | 6841 |
| [`dbo.POLayoutFields`](tables/EDS_Test/dbo.POLayoutFields.md) | 56 |
| [`dbo.POLayouts`](tables/EDS_Test/dbo.POLayouts.md) | 632 |
| [`dbo.POPageSummary`](tables/EDS_Test/dbo.POPageSummary.md) | 73456 |
| [`dbo.POPrintTaggedPOFile`](tables/EDS_Test/dbo.POPrintTaggedPOFile.md) | 121313 |
| [`dbo.POQueue`](tables/EDS_Test/dbo.POQueue.md) | 26735 |
| [`dbo.POQueueItems`](tables/EDS_Test/dbo.POQueueItems.md) | 398079 |
| [`dbo.POStatus`](tables/EDS_Test/dbo.POStatus.md) | 406120 |
| [`dbo.POStatusTable`](tables/EDS_Test/dbo.POStatusTable.md) | 0 |
| [`dbo.PostCatalogDetail`](tables/EDS_Test/dbo.PostCatalogDetail.md) | 39015 |
| [`dbo.PostCatalogHeader`](tables/EDS_Test/dbo.PostCatalogHeader.md) | 3320 |
| [`dbo.POTemp`](tables/EDS_Test/dbo.POTemp.md) | 37 |
| [`dbo.POTempDetails`](tables/EDS_Test/dbo.POTempDetails.md) | 4014 |
| [`dbo.PPCatalogs`](tables/EDS_Test/dbo.PPCatalogs.md) | 1664 |
| [`dbo.PPCategory`](tables/EDS_Test/dbo.PPCategory.md) | 1457 |
| [`dbo.PriceHolds`](tables/EDS_Test/dbo.PriceHolds.md) | 0 |
| [`dbo.PriceListTypes`](tables/EDS_Test/dbo.PriceListTypes.md) | 2 |
| [`dbo.PriceRanges`](tables/EDS_Test/dbo.PriceRanges.md) | 120619 |
| [`dbo.PricingAddenda`](tables/EDS_Test/dbo.PricingAddenda.md) | 204103 |
| [`dbo.PricingConsolidatedOrderCounts`](tables/EDS_Test/dbo.PricingConsolidatedOrderCounts.md) | 401387 |
| [`dbo.PricingMap`](tables/EDS_Test/dbo.PricingMap.md) | 0 |
| [`dbo.PricingUpdate`](tables/EDS_Test/dbo.PricingUpdate.md) | 59484 |
| [`dbo.PrintDocuments`](tables/EDS_Test/dbo.PrintDocuments.md) | 0 |
| [`dbo.Printers`](tables/EDS_Test/dbo.Printers.md) | 18 |
| [`dbo.ProductVerificationResults`](tables/EDS_Test/dbo.ProductVerificationResults.md) | 197830 |
| [`dbo.ProjectTasks`](tables/EDS_Test/dbo.ProjectTasks.md) | 14 |
| [`dbo.QuestionnaireResponses`](tables/EDS_Test/dbo.QuestionnaireResponses.md) | 0 |
| [`dbo.Rates`](tables/EDS_Test/dbo.Rates.md) | 0 |
| [`dbo.RateTypes`](tables/EDS_Test/dbo.RateTypes.md) | 0 |
| [`dbo.RateUnits`](tables/EDS_Test/dbo.RateUnits.md) | 0 |
| [`dbo.Receiving`](tables/EDS_Test/dbo.Receiving.md) | 0 |
| [`dbo.ReportSession`](tables/EDS_Test/dbo.ReportSession.md) | 5271559 |
| [`dbo.ReportSessionLinks`](tables/EDS_Test/dbo.ReportSessionLinks.md) | 51963656 |
| [`dbo.ReqAudit`](tables/EDS_Test/dbo.ReqAudit.md) | 0 |
| [`dbo.RequisitionChangeLog`](tables/EDS_Test/dbo.RequisitionChangeLog.md) | 1938490 |
| [`dbo.RequisitionNoteEmails`](tables/EDS_Test/dbo.RequisitionNoteEmails.md) | 16115 |
| [`dbo.RequisitionNotes`](tables/EDS_Test/dbo.RequisitionNotes.md) | 24711 |
| [`dbo.ResetPasswordTracking`](tables/EDS_Test/dbo.ResetPasswordTracking.md) | 85181 |
| [`dbo.Rights`](tables/EDS_Test/dbo.Rights.md) | 0 |
| [`dbo.RightsLink`](tables/EDS_Test/dbo.RightsLink.md) | 0 |
| [`dbo.RTK_2010NJHSL`](tables/EDS_Test/dbo.RTK_2010NJHSL.md) | 3322 |
| [`dbo.RTK_CASFile`](tables/EDS_Test/dbo.RTK_CASFile.md) | 7881 |
| [`dbo.RTK_ContainerCodes`](tables/EDS_Test/dbo.RTK_ContainerCodes.md) | 21 |
| [`dbo.RTK_Documents`](tables/EDS_Test/dbo.RTK_Documents.md) | 0 |
| [`dbo.RTK_FactSheets`](tables/EDS_Test/dbo.RTK_FactSheets.md) | 2459 |
| [`dbo.RTK_HealthHazardCodes`](tables/EDS_Test/dbo.RTK_HealthHazardCodes.md) | 9 |
| [`dbo.RTK_Inventories`](tables/EDS_Test/dbo.RTK_Inventories.md) | 658 |
| [`dbo.RTK_InventoryRangeCodes`](tables/EDS_Test/dbo.RTK_InventoryRangeCodes.md) | 12 |
| [`dbo.RTK_Items`](tables/EDS_Test/dbo.RTK_Items.md) | 64627 |
| [`dbo.RTK_LegacyDistrictCodesMap`](tables/EDS_Test/dbo.RTK_LegacyDistrictCodesMap.md) | 78 |
| [`dbo.RTK_LegacySchoolFile`](tables/EDS_Test/dbo.RTK_LegacySchoolFile.md) | 6766 |
| [`dbo.RTK_MixtureCodes`](tables/EDS_Test/dbo.RTK_MixtureCodes.md) | 11 |
| [`dbo.RTK_MSDSDetail`](tables/EDS_Test/dbo.RTK_MSDSDetail.md) | 151665 |
| [`dbo.RTK_Purposes`](tables/EDS_Test/dbo.RTK_Purposes.md) | 35 |
| [`dbo.RTK_ReportItems`](tables/EDS_Test/dbo.RTK_ReportItems.md) | 1006037 |
| [`dbo.RTK_Sites`](tables/EDS_Test/dbo.RTK_Sites.md) | 823 |
| [`dbo.RTK_Surveys`](tables/EDS_Test/dbo.RTK_Surveys.md) | 0 |
| [`dbo.RTK_Training`](tables/EDS_Test/dbo.RTK_Training.md) | 0 |
| [`dbo.RTK_UOMCodes`](tables/EDS_Test/dbo.RTK_UOMCodes.md) | 3 |
| [`dbo.RTK_VendorLinks`](tables/EDS_Test/dbo.RTK_VendorLinks.md) | 0 |
| [`dbo.SafetyDataSheets`](tables/EDS_Test/dbo.SafetyDataSheets.md) | 154401 |
| [`dbo.Salutations`](tables/EDS_Test/dbo.Salutations.md) | 5 |
| [`dbo.SaxDups`](tables/EDS_Test/dbo.SaxDups.md) | 31171 |
| [`dbo.SaxNotifications`](tables/EDS_Test/dbo.SaxNotifications.md) | 78 |
| [`dbo.ScanEvents`](tables/EDS_Test/dbo.ScanEvents.md) | 389458 |
| [`dbo.ScanJobs`](tables/EDS_Test/dbo.ScanJobs.md) | 3 |
| [`dbo.ScannerZones`](tables/EDS_Test/dbo.ScannerZones.md) | 10 |
| [`dbo.ScheduledTask`](tables/EDS_Test/dbo.ScheduledTask.md) | 12 |
| [`dbo.ScheduleTypes`](tables/EDS_Test/dbo.ScheduleTypes.md) | 10 |
| [`dbo.SDS_Rpt_Bridge`](tables/EDS_Test/dbo.SDS_Rpt_Bridge.md) | 99 |
| [`dbo.SDSDocs`](tables/EDS_Test/dbo.SDSDocs.md) | 161387 |
| [`dbo.SDSErrors`](tables/EDS_Test/dbo.SDSErrors.md) | 0 |
| [`dbo.SDSLog`](tables/EDS_Test/dbo.SDSLog.md) | 0 |
| [`dbo.SDSResults`](tables/EDS_Test/dbo.SDSResults.md) | 116893 |
| [`dbo.SDSs`](tables/EDS_Test/dbo.SDSs.md) | 0 |
| [`dbo.SDSSyncStatus`](tables/EDS_Test/dbo.SDSSyncStatus.md) | 26483 |
| [`dbo.SearchKeywords`](tables/EDS_Test/dbo.SearchKeywords.md) | 0 |
| [`dbo.SearchSets`](tables/EDS_Test/dbo.SearchSets.md) | 43870 |
| [`dbo.Sections`](tables/EDS_Test/dbo.Sections.md) | 18 |
| [`dbo.SecurityKeys`](tables/EDS_Test/dbo.SecurityKeys.md) | 14 |
| [`dbo.SecurityRoleKeys`](tables/EDS_Test/dbo.SecurityRoleKeys.md) | 65 |
| [`dbo.SecurityRoles`](tables/EDS_Test/dbo.SecurityRoles.md) | 5 |
| [`dbo.SecurityRoleUsers`](tables/EDS_Test/dbo.SecurityRoleUsers.md) | 354838 |
| [`dbo.Services`](tables/EDS_Test/dbo.Services.md) | 0 |
| [`dbo.SessionCmds`](tables/EDS_Test/dbo.SessionCmds.md) | 0 |
| [`dbo.SessionTable`](tables/EDS_Test/dbo.SessionTable.md) | 12371645 |
| [`dbo.ShipLocations`](tables/EDS_Test/dbo.ShipLocations.md) | 6862 |
| [`dbo.ShippingCosts`](tables/EDS_Test/dbo.ShippingCosts.md) | 945 |
| [`dbo.ShippingRequests`](tables/EDS_Test/dbo.ShippingRequests.md) | 627 |
| [`dbo.ShippingVendor`](tables/EDS_Test/dbo.ShippingVendor.md) | 38754 |
| [`dbo.SSOLoginTracking`](tables/EDS_Test/dbo.SSOLoginTracking.md) | 119735 |
| [`dbo.States`](tables/EDS_Test/dbo.States.md) | 3 |
| [`dbo.StatusTable`](tables/EDS_Test/dbo.StatusTable.md) | 53 |
| [`dbo.Sulphite`](tables/EDS_Test/dbo.Sulphite.md) | 49 |
| [`dbo.SulphiteDetail`](tables/EDS_Test/dbo.SulphiteDetail.md) | 6280 |
| [`dbo.SulphiteImport`](tables/EDS_Test/dbo.SulphiteImport.md) | 49 |
| [`dbo.SulphiteUsers`](tables/EDS_Test/dbo.SulphiteUsers.md) | 1209 |
| [`dbo.Suppression`](tables/EDS_Test/dbo.Suppression.md) | 5984 |
| [`dbo.sysdiagrams`](tables/EDS_Test/dbo.sysdiagrams.md) | 9 |
| [`dbo.TableOfContents`](tables/EDS_Test/dbo.TableOfContents.md) | 0 |
| [`dbo.TagFile_`](tables/EDS_Test/dbo.TagFile_.md) | 6235 |
| [`dbo.TAGFILEP`](tables/EDS_Test/dbo.TAGFILEP.md) | 0 |
| [`dbo.TagFilePos_`](tables/EDS_Test/dbo.TagFilePos_.md) | 2259 |
| [`dbo.TagSet_`](tables/EDS_Test/dbo.TagSet_.md) | 0 |
| [`dbo.TaskEvent`](tables/EDS_Test/dbo.TaskEvent.md) | 122103 |
| [`dbo.TaskSchedule`](tables/EDS_Test/dbo.TaskSchedule.md) | 1544400 |
| [`dbo.TempIrvingtonWincap`](tables/EDS_Test/dbo.TempIrvingtonWincap.md) | 860 |
| [`dbo.TM_UOM`](tables/EDS_Test/dbo.TM_UOM.md) | 77 |
| [`dbo.TMAwards`](tables/EDS_Test/dbo.TMAwards.md) | 89597 |
| [`dbo.TMImport`](tables/EDS_Test/dbo.TMImport.md) | 3114 |
| [`dbo.TMImport1`](tables/EDS_Test/dbo.TMImport1.md) | 1885 |
| [`dbo.TMImport2`](tables/EDS_Test/dbo.TMImport2.md) | 147 |
| [`dbo.TMImport3`](tables/EDS_Test/dbo.TMImport3.md) | 833 |
| [`dbo.TMImport5`](tables/EDS_Test/dbo.TMImport5.md) | 2889 |
| [`dbo.TMImport6`](tables/EDS_Test/dbo.TMImport6.md) | 2134 |
| [`dbo.TmpLog`](tables/EDS_Test/dbo.TmpLog.md) | 461 |
| [`dbo.TmpTaskSchedule`](tables/EDS_Test/dbo.TmpTaskSchedule.md) | 4884 |
| [`dbo.TMSurvey`](tables/EDS_Test/dbo.TMSurvey.md) | 796 |
| [`dbo.TMSurveyNewTrades`](tables/EDS_Test/dbo.TMSurveyNewTrades.md) | 89 |
| [`dbo.TMSurveyNewVendors`](tables/EDS_Test/dbo.TMSurveyNewVendors.md) | 186 |
| [`dbo.TMSurveyResults`](tables/EDS_Test/dbo.TMSurveyResults.md) | 89650 |
| [`dbo.TMVendors`](tables/EDS_Test/dbo.TMVendors.md) | 16173 |
| [`dbo.TopUOM`](tables/EDS_Test/dbo.TopUOM.md) | 4579 |
| [`dbo.Trades`](tables/EDS_Test/dbo.Trades.md) | 107 |
| [`dbo.TransactionLog_HISTORY`](tables/EDS_Test/dbo.TransactionLog_HISTORY.md) | 99019937 |
| [`dbo.TransactionLogCF`](tables/EDS_Test/dbo.TransactionLogCF.md) | 130002 |
| [`dbo.TransactionLogCF_Arc`](tables/EDS_Test/dbo.TransactionLogCF_Arc.md) | 32358341 |
| [`dbo.TransactionTypes`](tables/EDS_Test/dbo.TransactionTypes.md) | 0 |
| [`dbo.TransmitLog`](tables/EDS_Test/dbo.TransmitLog.md) | 139925 |
| [`dbo.Units`](tables/EDS_Test/dbo.Units.md) | 11218 |
| [`dbo.UNSPSCs`](tables/EDS_Test/dbo.UNSPSCs.md) | 50317 |
| [`dbo.UnsubscriptionEmail`](tables/EDS_Test/dbo.UnsubscriptionEmail.md) | 0 |
| [`dbo.UserAdminLog`](tables/EDS_Test/dbo.UserAdminLog.md) | 6466 |
| [`dbo.UserCategory`](tables/EDS_Test/dbo.UserCategory.md) | 0 |
| [`dbo.UserImports`](tables/EDS_Test/dbo.UserImports.md) | 328 |
| [`dbo.Users`](tables/EDS_Test/dbo.Users.md) | 337916 |
| [`dbo.UserTrees`](tables/EDS_Test/dbo.UserTrees.md) | 56920 |
| [`dbo.VendorCatalogNote`](tables/EDS_Test/dbo.VendorCatalogNote.md) | 11 |
| [`dbo.VendorCategory`](tables/EDS_Test/dbo.VendorCategory.md) | 6767 |
| [`dbo.VendorCategoryPP`](tables/EDS_Test/dbo.VendorCategoryPP.md) | 17643 |
| [`dbo.VendorCertificates`](tables/EDS_Test/dbo.VendorCertificates.md) | 0 |
| [`dbo.VendorContacts`](tables/EDS_Test/dbo.VendorContacts.md) | 23254 |
| [`dbo.VendorDeliveryRule`](tables/EDS_Test/dbo.VendorDeliveryRule.md) | 1 |
| [`dbo.VendorDocRequest`](tables/EDS_Test/dbo.VendorDocRequest.md) | 14 |
| [`dbo.VendorDocRequestDetail`](tables/EDS_Test/dbo.VendorDocRequestDetail.md) | 52 |
| [`dbo.VendorDocRequestStatus`](tables/EDS_Test/dbo.VendorDocRequestStatus.md) | 14 |
| [`dbo.VendorLocations`](tables/EDS_Test/dbo.VendorLocations.md) | 0 |
| [`dbo.VendorLogoDisplays`](tables/EDS_Test/dbo.VendorLogoDisplays.md) | 0 |
| [`dbo.VendorOrders`](tables/EDS_Test/dbo.VendorOrders.md) | 5424 |
| [`dbo.VendorOverrideMessages`](tables/EDS_Test/dbo.VendorOverrideMessages.md) | 5 |
| [`dbo.VendorPOtags`](tables/EDS_Test/dbo.VendorPOtags.md) | 0 |
| [`dbo.VendorQuery`](tables/EDS_Test/dbo.VendorQuery.md) | 11553 |
| [`dbo.VendorQueryDetail`](tables/EDS_Test/dbo.VendorQueryDetail.md) | 130112 |
| [`dbo.VendorQueryStatus`](tables/EDS_Test/dbo.VendorQueryStatus.md) | 30222 |
| [`dbo.VendorSessions`](tables/EDS_Test/dbo.VendorSessions.md) | 10769 |
| [`dbo.VendorUploads`](tables/EDS_Test/dbo.VendorUploads.md) | 1533191 |
| [`dbo.VPOLoginAttempts`](tables/EDS_Test/dbo.VPOLoginAttempts.md) | 0 |
| [`dbo.VPORegistrations`](tables/EDS_Test/dbo.VPORegistrations.md) | 6 |
| [`dbo.VPOVendorLinks`](tables/EDS_Test/dbo.VPOVendorLinks.md) | 10 |
| [`dbo.WizHelpFile`](tables/EDS_Test/dbo.WizHelpFile.md) | 0 |
| [`dbo.YearlyTotals`](tables/EDS_Test/dbo.YearlyTotals.md) | 10134 |
| [`dbo.z4zbBidFix`](tables/EDS_Test/dbo.z4zbBidFix.md) | 0 |
| [`dbo.z4zbReqDetail`](tables/EDS_Test/dbo.z4zbReqDetail.md) | 0 |
| [`EDSIQWebUser.cxml_migrations`](tables/EDS_Test/EDSIQWebUser.cxml_migrations.md) | 7 |
| [`EDSIQWebUser.cxml_request_log`](tables/EDS_Test/EDSIQWebUser.cxml_request_log.md) | 0 |
| [`EDSIQWebUser.cxml_vendor_credentials`](tables/EDS_Test/EDSIQWebUser.cxml_vendor_credentials.md) | 0 |
| [`EDSIQWebUser.migratorversions`](tables/EDS_Test/EDSIQWebUser.migratorversions.md) | 0 |
| [`EDSIQWebUser.TableOfContents`](tables/EDS_Test/EDSIQWebUser.TableOfContents.md) | 6664 |
| [`EDSIQWebUser.UnsubscriptionEmail`](tables/EDS_Test/EDSIQWebUser.UnsubscriptionEmail.md) | 0 |
| [`EDSWebRpts.REPMAN_GROUPS`](tables/EDS_Test/EDSWebRpts.REPMAN_GROUPS.md) | 1 |
| [`EDSWebRpts.REPMAN_REPORTS`](tables/EDS_Test/EDSWebRpts.REPMAN_REPORTS.md) | 1 |

### Leaf views

| View |
|------|
| [`null.MissingCoverView`](tables/EDS_Test/null.MissingCoverView.md) |
| [`null.OrderBookDetailView`](tables/EDS_Test/null.OrderBookDetailView.md) |
| [`null.OrderBookView`](tables/EDS_Test/null.OrderBookView.md) |
| [`null.POAccountList`](tables/EDS_Test/null.POAccountList.md) |
| [`null.POAccountsUsed`](tables/EDS_Test/null.POAccountsUsed.md) |
| [`null.ScheduledByPricePlanCategory`](tables/EDS_Test/null.ScheduledByPricePlanCategory.md) |
| [`null.ScheduledByPricePlanCategoryRep`](tables/EDS_Test/null.ScheduledByPricePlanCategoryRep.md) |
| [`null.ScheduledDistrictsByPricePlanCategory`](tables/EDS_Test/null.ScheduledDistrictsByPricePlanCategory.md) |
| [`null.Sessions`](tables/EDS_Test/null.Sessions.md) |
| [`null.vw_BidsByVendor`](tables/EDS_Test/null.vw_BidsByVendor.md) |
| [`null.vw_Login`](tables/EDS_Test/null.vw_Login.md) |
| [`dbo.BidAnalysisDetail`](tables/EDS_Test/dbo.BidAnalysisDetail.md) |
| [`dbo.BidAnalysisDetailReq`](tables/EDS_Test/dbo.BidAnalysisDetailReq.md) |
| [`dbo.BidHeadersView`](tables/EDS_Test/dbo.BidHeadersView.md) |
| [`dbo.BidItemsView`](tables/EDS_Test/dbo.BidItemsView.md) |
| [`dbo.BidItemView`](tables/EDS_Test/dbo.BidItemView.md) |
| [`dbo.BidMgrBidRankingMSRPView`](tables/EDS_Test/dbo.BidMgrBidRankingMSRPView.md) |
| [`dbo.BidMgrBidRequestAndWriteInMSRPView`](tables/EDS_Test/dbo.BidMgrBidRequestAndWriteInMSRPView.md) |
| [`dbo.BidMgrBidRequestDetail`](tables/EDS_Test/dbo.BidMgrBidRequestDetail.md) |
| [`dbo.BidMgrBidRequestMSRPView`](tables/EDS_Test/dbo.BidMgrBidRequestMSRPView.md) |
| [`dbo.BidMgrBidTradeCountiesView`](tables/EDS_Test/dbo.BidMgrBidTradeCountiesView.md) |
| [`dbo.BidMgrMSRP2ResultsView`](tables/EDS_Test/dbo.BidMgrMSRP2ResultsView.md) |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](tables/EDS_Test/dbo.BidMgrMSRP2VendorReportViewTemp.md) |
| [`dbo.BidMgrView`](tables/EDS_Test/dbo.BidMgrView.md) |
| [`dbo.BidMgrView2`](tables/EDS_Test/dbo.BidMgrView2.md) |
| [`dbo.BidMgrWeightView`](tables/EDS_Test/dbo.BidMgrWeightView.md) |
| [`dbo.BidProjectAveragePO`](tables/EDS_Test/dbo.BidProjectAveragePO.md) |
| [`dbo.BidRequestDetail`](tables/EDS_Test/dbo.BidRequestDetail.md) |
| [`dbo.BidRequestDetail1`](tables/EDS_Test/dbo.BidRequestDetail1.md) |
| [`dbo.BidRequestDetail2`](tables/EDS_Test/dbo.BidRequestDetail2.md) |
| [`dbo.BidRequestItemsCrossRefsView`](tables/EDS_Test/dbo.BidRequestItemsCrossRefsView.md) |
| [`dbo.BidRequestItemsView`](tables/EDS_Test/dbo.BidRequestItemsView.md) |
| [`dbo.BidRequestItemsView1`](tables/EDS_Test/dbo.BidRequestItemsView1.md) |
| [`dbo.BidRequestItemsView1Original`](tables/EDS_Test/dbo.BidRequestItemsView1Original.md) |
| [`dbo.BidRequestItemsWeightView`](tables/EDS_Test/dbo.BidRequestItemsWeightView.md) |
| [`dbo.BidResultsView`](tables/EDS_Test/dbo.BidResultsView.md) |
| [`dbo.BidsView`](tables/EDS_Test/dbo.BidsView.md) |
| [`dbo.BudgetsView`](tables/EDS_Test/dbo.BudgetsView.md) |
| [`dbo.cfv_Districts`](tables/EDS_Test/dbo.cfv_Districts.md) |
| [`dbo.cfv_Schools`](tables/EDS_Test/dbo.cfv_Schools.md) |
| [`dbo.cfv_Users`](tables/EDS_Test/dbo.cfv_Users.md) |
| [`dbo.CoverViewNew`](tables/EDS_Test/dbo.CoverViewNew.md) |
| [`dbo.CoverViewNewSave`](tables/EDS_Test/dbo.CoverViewNewSave.md) |
| [`dbo.CoverViewNewTest`](tables/EDS_Test/dbo.CoverViewNewTest.md) |
| [`dbo.CoverViewNewTest1`](tables/EDS_Test/dbo.CoverViewNewTest1.md) |
| [`dbo.cvw_NJSavings`](tables/EDS_Test/dbo.cvw_NJSavings.md) |
| [`dbo.cvw_NYSavings`](tables/EDS_Test/dbo.cvw_NYSavings.md) |
| [`dbo.cvw_Savings`](tables/EDS_Test/dbo.cvw_Savings.md) |
| [`dbo.DetailView`](tables/EDS_Test/dbo.DetailView.md) |
| [`dbo.DistrictContactProblemView`](tables/EDS_Test/dbo.DistrictContactProblemView.md) |
| [`dbo.DistrictUsersView`](tables/EDS_Test/dbo.DistrictUsersView.md) |
| [`dbo.InstructionBookCalendar`](tables/EDS_Test/dbo.InstructionBookCalendar.md) |
| [`dbo.InstructionBookView09`](tables/EDS_Test/dbo.InstructionBookView09.md) |
| [`dbo.InstructionBookViewCF`](tables/EDS_Test/dbo.InstructionBookViewCF.md) |
| [`dbo.InstructionBookViewCF2013`](tables/EDS_Test/dbo.InstructionBookViewCF2013.md) |
| [`dbo.InstructionBookViewwork`](tables/EDS_Test/dbo.InstructionBookViewwork.md) |
| [`dbo.ItemsBidHeaderView`](tables/EDS_Test/dbo.ItemsBidHeaderView.md) |
| [`dbo.Keywords1`](tables/EDS_Test/dbo.Keywords1.md) |
| [`dbo.NewFF1`](tables/EDS_Test/dbo.NewFF1.md) |
| [`dbo.OrderBookDetailView`](tables/EDS_Test/dbo.OrderBookDetailView.md) |
| [`dbo.OrderBookView`](tables/EDS_Test/dbo.OrderBookView.md) |
| [`dbo.pa_Accounts`](tables/EDS_Test/dbo.pa_Accounts.md) |
| [`dbo.pa_Budgets`](tables/EDS_Test/dbo.pa_Budgets.md) |
| [`dbo.pa_Category`](tables/EDS_Test/dbo.pa_Category.md) |
| [`dbo.pa_ReqList`](tables/EDS_Test/dbo.pa_ReqList.md) |
| [`dbo.pa_School`](tables/EDS_Test/dbo.pa_School.md) |
| [`dbo.pa_Status`](tables/EDS_Test/dbo.pa_Status.md) |
| [`dbo.pa_Users`](tables/EDS_Test/dbo.pa_Users.md) |
| [`dbo.POAttentionList`](tables/EDS_Test/dbo.POAttentionList.md) |
| [`dbo.PODetail_old`](tables/EDS_Test/dbo.PODetail_old.md) |
| [`dbo.PODetail_Orig`](tables/EDS_Test/dbo.PODetail_Orig.md) |
| [`dbo.PODetailExport`](tables/EDS_Test/dbo.PODetailExport.md) |
| [`dbo.PODetailExport_old`](tables/EDS_Test/dbo.PODetailExport_old.md) |
| [`dbo.PODetailJavaExport`](tables/EDS_Test/dbo.PODetailJavaExport.md) |
| [`dbo.PODetailJavaExportNew`](tables/EDS_Test/dbo.PODetailJavaExportNew.md) |
| [`dbo.PODetailTest`](tables/EDS_Test/dbo.PODetailTest.md) |
| [`dbo.POHeaderSummary`](tables/EDS_Test/dbo.POHeaderSummary.md) |
| [`dbo.POHeaderSummary_04232018`](tables/EDS_Test/dbo.POHeaderSummary_04232018.md) |
| [`dbo.POHeaderTest`](tables/EDS_Test/dbo.POHeaderTest.md) |
| [`dbo.PricePlanView`](tables/EDS_Test/dbo.PricePlanView.md) |
| [`dbo.ReqDetail`](tables/EDS_Test/dbo.ReqDetail.md) |
| [`dbo.RequisitionsView`](tables/EDS_Test/dbo.RequisitionsView.md) |
| [`dbo.rs_DistrictSummary`](tables/EDS_Test/dbo.rs_DistrictSummary.md) |
| [`dbo.rs_DistrictSummaryAwardLetter`](tables/EDS_Test/dbo.rs_DistrictSummaryAwardLetter.md) |
| [`dbo.rs_DistrictSummaryVendors`](tables/EDS_Test/dbo.rs_DistrictSummaryVendors.md) |
| [`dbo.rs_SBS_AccountRecap_District`](tables/EDS_Test/dbo.rs_SBS_AccountRecap_District.md) |
| [`dbo.rs_SBS_AccountRecap_School`](tables/EDS_Test/dbo.rs_SBS_AccountRecap_School.md) |
| [`dbo.rs_SBS_SchoolSummary`](tables/EDS_Test/dbo.rs_SBS_SchoolSummary.md) |
| [`dbo.rs_SBS_SchoolSummary_Detail`](tables/EDS_Test/dbo.rs_SBS_SchoolSummary_Detail.md) |
| [`dbo.rs_SBS_UserRecap_District`](tables/EDS_Test/dbo.rs_SBS_UserRecap_District.md) |
| [`dbo.rs_SBS_UserRecap_School`](tables/EDS_Test/dbo.rs_SBS_UserRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_District`](tables/EDS_Test/dbo.rs_SBS_VendorRecap_District.md) |
| [`dbo.rs_SBS_VendorRecap_School`](tables/EDS_Test/dbo.rs_SBS_VendorRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_User`](tables/EDS_Test/dbo.rs_SBS_VendorRecap_User.md) |
| [`dbo.rs_SBS_VendorUserRecap_District`](tables/EDS_Test/dbo.rs_SBS_VendorUserRecap_District.md) |
| [`dbo.rs_SBS_VendorUserRecap_School`](tables/EDS_Test/dbo.rs_SBS_VendorUserRecap_School.md) |
| [`dbo.rs_SBSDetailRecap`](tables/EDS_Test/dbo.rs_SBSDetailRecap.md) |
| [`dbo.rs_SBSReqRecap`](tables/EDS_Test/dbo.rs_SBSReqRecap.md) |
| [`dbo.rs_SBSVendorRecap`](tables/EDS_Test/dbo.rs_SBSVendorRecap.md) |
| [`dbo.rs_VendorRecap`](tables/EDS_Test/dbo.rs_VendorRecap.md) |
| [`dbo.RTK_Item_StructureView`](tables/EDS_Test/dbo.RTK_Item_StructureView.md) |
| [`dbo.SearchItemsHeadingsView`](tables/EDS_Test/dbo.SearchItemsHeadingsView.md) |
| [`dbo.SearchItemsKeywordsView`](tables/EDS_Test/dbo.SearchItemsKeywordsView.md) |
| [`dbo.SearchItemsView`](tables/EDS_Test/dbo.SearchItemsView.md) |
| [`dbo.TestAllFF`](tables/EDS_Test/dbo.TestAllFF.md) |
| [`dbo.TestFF`](tables/EDS_Test/dbo.TestFF.md) |
| [`dbo.TMDistrictInfo`](tables/EDS_Test/dbo.TMDistrictInfo.md) |
| [`dbo.UploadView`](tables/EDS_Test/dbo.UploadView.md) |
| [`dbo.UserContactProblemView`](tables/EDS_Test/dbo.UserContactProblemView.md) |
| [`dbo.UserListView`](tables/EDS_Test/dbo.UserListView.md) |
| [`dbo.UsersApprovees`](tables/EDS_Test/dbo.UsersApprovees.md) |
| [`dbo.UserTreeView`](tables/EDS_Test/dbo.UserTreeView.md) |
| [`dbo.VendorBidLookup`](tables/EDS_Test/dbo.VendorBidLookup.md) |
| [`dbo.VendorContactProblemView`](tables/EDS_Test/dbo.VendorContactProblemView.md) |
| [`dbo.vw_ActiveBids`](tables/EDS_Test/dbo.vw_ActiveBids.md) |
| [`dbo.vw_ActiveCatalogs`](tables/EDS_Test/dbo.vw_ActiveCatalogs.md) |
| [`dbo.vw_ActiveDistrictList`](tables/EDS_Test/dbo.vw_ActiveDistrictList.md) |
| [`dbo.vw_ActiveVendors`](tables/EDS_Test/dbo.vw_ActiveVendors.md) |
| [`dbo.vw_ApprovalsHistory`](tables/EDS_Test/dbo.vw_ApprovalsHistory.md) |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession_Test.md) |
| [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_Test/dbo.vw_ApproveRequisitionsTest.md) |
| [`dbo.vw_ARAccounts`](tables/EDS_Test/dbo.vw_ARAccounts.md) |
| [`dbo.vw_ARBudgets`](tables/EDS_Test/dbo.vw_ARBudgets.md) |
| [`dbo.vw_ARCategories`](tables/EDS_Test/dbo.vw_ARCategories.md) |
| [`dbo.vw_ARSchools`](tables/EDS_Test/dbo.vw_ARSchools.md) |
| [`dbo.vw_ARStatuses`](tables/EDS_Test/dbo.vw_ARStatuses.md) |
| [`dbo.vw_ARUsers`](tables/EDS_Test/dbo.vw_ARUsers.md) |
| [`dbo.vw_AtAGlance`](tables/EDS_Test/dbo.vw_AtAGlance.md) |
| [`dbo.vw_AvailableReqBids`](tables/EDS_Test/dbo.vw_AvailableReqBids.md) |
| [`dbo.vw_AvailableUserAccounts`](tables/EDS_Test/dbo.vw_AvailableUserAccounts.md) |
| [`dbo.vw_AVCategoriesBySession`](tables/EDS_Test/dbo.vw_AVCategoriesBySession.md) |
| [`dbo.vw_AVVendorsBySession`](tables/EDS_Test/dbo.vw_AVVendorsBySession.md) |
| [`dbo.vw_AVVendorsExport`](tables/EDS_Test/dbo.vw_AVVendorsExport.md) |
| [`dbo.vw_AwardedVendorsAllCurrentAndFutureBids`](tables/EDS_Test/dbo.vw_AwardedVendorsAllCurrentAndFutureBids.md) |
| [`dbo.vw_AwardedVendorsAllCurrentBids`](tables/EDS_Test/dbo.vw_AwardedVendorsAllCurrentBids.md) |
| [`dbo.vw_BAPCBG`](tables/EDS_Test/dbo.vw_BAPCBG.md) |
| [`dbo.vw_BidAnalysisVendorSummary`](tables/EDS_Test/dbo.vw_BidAnalysisVendorSummary.md) |
| [`dbo.vw_BidAnalysisVendorSummaryByDistrict`](tables/EDS_Test/dbo.vw_BidAnalysisVendorSummaryByDistrict.md) |
| [`dbo.vw_BidAnalysisVendorSummaryTest`](tables/EDS_Test/dbo.vw_BidAnalysisVendorSummaryTest.md) |
| [`dbo.vw_BidAncillaryBySession`](tables/EDS_Test/dbo.vw_BidAncillaryBySession.md) |
| [`dbo.vw_BidComplianceBySession`](tables/EDS_Test/dbo.vw_BidComplianceBySession.md) |
| [`dbo.vw_BidContactsVendorList`](tables/EDS_Test/dbo.vw_BidContactsVendorList.md) |
| [`dbo.vw_BidDocumentsList`](tables/EDS_Test/dbo.vw_BidDocumentsList.md) |
| [`dbo.vw_BidDocumentTypeNames`](tables/EDS_Test/dbo.vw_BidDocumentTypeNames.md) |
| [`dbo.vw_BidDuplicateIdentifiers`](tables/EDS_Test/dbo.vw_BidDuplicateIdentifiers.md) |
| [`dbo.vw_BidHeadersList`](tables/EDS_Test/dbo.vw_BidHeadersList.md) |
| [`dbo.vw_BidImportMostRecentContactInfo`](tables/EDS_Test/dbo.vw_BidImportMostRecentContactInfo.md) |
| [`dbo.vw_BidLeadComplianceBySession`](tables/EDS_Test/dbo.vw_BidLeadComplianceBySession.md) |
| [`dbo.vw_BidLines`](tables/EDS_Test/dbo.vw_BidLines.md) |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS_Test/dbo.vw_BidMgrBidderDocs.md) |
| [`dbo.vw_BidMSRPManufacturerProductLinePrices`](tables/EDS_Test/dbo.vw_BidMSRPManufacturerProductLinePrices.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](tables/EDS_Test/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`](tables/EDS_Test/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved.md) |
| [`dbo.vw_BidMSRPRankedManufacturers`](tables/EDS_Test/dbo.vw_BidMSRPRankedManufacturers.md) |
| [`dbo.vw_BidMSRPResultsPriceRanges`](tables/EDS_Test/dbo.vw_BidMSRPResultsPriceRanges.md) |
| [`dbo.vw_BidPricing`](tables/EDS_Test/dbo.vw_BidPricing.md) |
| [`dbo.vw_BidProjectAveragePO`](tables/EDS_Test/dbo.vw_BidProjectAveragePO.md) |
| [`dbo.vw_BidRequestItemMergeDetail`](tables/EDS_Test/dbo.vw_BidRequestItemMergeDetail.md) |
| [`dbo.vw_BidRequestItemMergeHeader`](tables/EDS_Test/dbo.vw_BidRequestItemMergeHeader.md) |
| [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS_Test/dbo.vw_BidRequestItemsBidMgr.md) |
| [`dbo.vw_BidResults`](tables/EDS_Test/dbo.vw_BidResults.md) |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS_Test/dbo.vw_BidTabReadyNotifications.md) |
| [`dbo.vw_BidTrades`](tables/EDS_Test/dbo.vw_BidTrades.md) |
| [`dbo.vw_BidTradesBySession`](tables/EDS_Test/dbo.vw_BidTradesBySession.md) |
| [`dbo.vw_BidTradesBySession_Test`](tables/EDS_Test/dbo.vw_BidTradesBySession_Test.md) |
| [`dbo.vw_BidTradesVendorDetailForReports`](tables/EDS_Test/dbo.vw_BidTradesVendorDetailForReports.md) |
| [`dbo.vw_BidTradesVendorsAnswers`](tables/EDS_Test/dbo.vw_BidTradesVendorsAnswers.md) |
| [`dbo.vw_BidTradesVendorsAnswersBySession`](tables/EDS_Test/dbo.vw_BidTradesVendorsAnswersBySession.md) |
| [`dbo.vw_BidTradesVendorsBySession`](tables/EDS_Test/dbo.vw_BidTradesVendorsBySession.md) |
| [`dbo.vw_BidTradesVendorsForReports`](tables/EDS_Test/dbo.vw_BidTradesVendorsForReports.md) |
| [`dbo.vw_BidType`](tables/EDS_Test/dbo.vw_BidType.md) |
| [`dbo.vw_BidVendor`](tables/EDS_Test/dbo.vw_BidVendor.md) |
| [`dbo.vw_BidVendorsBySession`](tables/EDS_Test/dbo.vw_BidVendorsBySession.md) |
| [`dbo.vw_BidYears`](tables/EDS_Test/dbo.vw_BidYears.md) |
| [`dbo.vw_BillingStatus`](tables/EDS_Test/dbo.vw_BillingStatus.md) |
| [`dbo.vw_BrowseDistrictBidHeaders`](tables/EDS_Test/dbo.vw_BrowseDistrictBidHeaders.md) |
| [`dbo.vw_BudgetDistrictBySession`](tables/EDS_Test/dbo.vw_BudgetDistrictBySession.md) |
| [`dbo.vw_BudgetsFilter`](tables/EDS_Test/dbo.vw_BudgetsFilter.md) |
| [`dbo.vw_CatalogCompare`](tables/EDS_Test/dbo.vw_CatalogCompare.md) |
| [`dbo.vw_CatalogImport`](tables/EDS_Test/dbo.vw_CatalogImport.md) |
| [`dbo.vw_CatalogImporter1`](tables/EDS_Test/dbo.vw_CatalogImporter1.md) |
| [`dbo.vw_CatalogImporter1Dtl`](tables/EDS_Test/dbo.vw_CatalogImporter1Dtl.md) |
| [`dbo.vw_CatalogImporterCat`](tables/EDS_Test/dbo.vw_CatalogImporterCat.md) |
| [`dbo.vw_CatalogImporterVen`](tables/EDS_Test/dbo.vw_CatalogImporterVen.md) |
| [`dbo.vw_CatalogImports`](tables/EDS_Test/dbo.vw_CatalogImports.md) |
| [`dbo.vw_CatalogPages_Orig`](tables/EDS_Test/dbo.vw_CatalogPages_Orig.md) |
| [`dbo.vw_CatalogPages1`](tables/EDS_Test/dbo.vw_CatalogPages1.md) |
| [`dbo.vw_CatalogRefsItemTest`](tables/EDS_Test/dbo.vw_CatalogRefsItemTest.md) |
| [`dbo.vw_CatalogRequestStatus`](tables/EDS_Test/dbo.vw_CatalogRequestStatus.md) |
| [`dbo.vw_CatalogsAttachedToBids`](tables/EDS_Test/dbo.vw_CatalogsAttachedToBids.md) |
| [`dbo.vw_Categories`](tables/EDS_Test/dbo.vw_Categories.md) |
| [`dbo.vw_CategoriesAndVendors`](tables/EDS_Test/dbo.vw_CategoriesAndVendors.md) |
| [`dbo.vw_ContinuanceSection0Charges`](tables/EDS_Test/dbo.vw_ContinuanceSection0Charges.md) |
| [`dbo.vw_ContinuanceSection1Charges`](tables/EDS_Test/dbo.vw_ContinuanceSection1Charges.md) |
| [`dbo.vw_CSReps`](tables/EDS_Test/dbo.vw_CSReps.md) |
| [`dbo.vw_DetailDescription_old`](tables/EDS_Test/dbo.vw_DetailDescription_old.md) |
| [`dbo.vw_DetailDescriptionPrint`](tables/EDS_Test/dbo.vw_DetailDescriptionPrint.md) |
| [`dbo.vw_DetailDescriptionTest`](tables/EDS_Test/dbo.vw_DetailDescriptionTest.md) |
| [`dbo.vw_DetailView`](tables/EDS_Test/dbo.vw_DetailView.md) |
| [`dbo.vw_DistrictBudgetList`](tables/EDS_Test/dbo.vw_DistrictBudgetList.md) |
| [`dbo.vw_DistrictBudgetPP`](tables/EDS_Test/dbo.vw_DistrictBudgetPP.md) |
| [`dbo.vw_DistrictContactsList`](tables/EDS_Test/dbo.vw_DistrictContactsList.md) |
| [`dbo.vw_DistrictCounties_BidMgr`](tables/EDS_Test/dbo.vw_DistrictCounties_BidMgr.md) |
| [`dbo.vw_DistrictList`](tables/EDS_Test/dbo.vw_DistrictList.md) |
| [`dbo.vw_DistrictPaymentSchedule`](tables/EDS_Test/dbo.vw_DistrictPaymentSchedule.md) |
| [`dbo.vw_DistrictPOInfo`](tables/EDS_Test/dbo.vw_DistrictPOInfo.md) |
| [`dbo.vw_DistrictSchools`](tables/EDS_Test/dbo.vw_DistrictSchools.md) |
| [`dbo.vw_DistrictsNeedingReview`](tables/EDS_Test/dbo.vw_DistrictsNeedingReview.md) |
| [`dbo.vw_DistrictStates_BidMgr`](tables/EDS_Test/dbo.vw_DistrictStates_BidMgr.md) |
| [`dbo.vw_DMSBidDocuments`](tables/EDS_Test/dbo.vw_DMSBidDocuments.md) |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS_Test/dbo.vw_DMSBidDocuments_View.md) |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS_Test/dbo.vw_DMSRTKDocuments.md) |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS_Test/dbo.vw_DMSRTKSurveys.md) |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS_Test/dbo.vw_DMSSDSDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments.md) |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_04232018.md) |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS_Test/dbo.vw_DMSVendorBidDocuments_ViewTest.md) |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS_Test/dbo.vw_DMSVendorBidDocumentsTest.md) |
| [`dbo.vw_DMSVendorDocuments`](tables/EDS_Test/dbo.vw_DMSVendorDocuments.md) |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS_Test/dbo.vw_DMSVendorDocuments_View.md) |
| [`dbo.vw_DocumentTypes`](tables/EDS_Test/dbo.vw_DocumentTypes.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed`](tables/EDS_Test/dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed`](tables/EDS_Test/dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed.md) |
| [`dbo.vw_ExistingRequisitions`](tables/EDS_Test/dbo.vw_ExistingRequisitions.md) |
| [`dbo.vw_ExistingUserAccounts`](tables/EDS_Test/dbo.vw_ExistingUserAccounts.md) |
| [`dbo.vw_ExistingUserAccounts_NEW`](tables/EDS_Test/dbo.vw_ExistingUserAccounts_NEW.md) |
| [`dbo.vw_FA_CategoriesAndVendors`](tables/EDS_Test/dbo.vw_FA_CategoriesAndVendors.md) |
| [`dbo.vw_FA_EDSUser`](tables/EDS_Test/dbo.vw_FA_EDSUser.md) |
| [`dbo.vw_FA_ReqCategories`](tables/EDS_Test/dbo.vw_FA_ReqCategories.md) |
| [`dbo.vw_FA_Requisitions`](tables/EDS_Test/dbo.vw_FA_Requisitions.md) |
| [`dbo.vw_FA_UserAccounts`](tables/EDS_Test/dbo.vw_FA_UserAccounts.md) |
| [`dbo.vw_FA_UserList`](tables/EDS_Test/dbo.vw_FA_UserList.md) |
| [`dbo.vw_FA_UserLogin`](tables/EDS_Test/dbo.vw_FA_UserLogin.md) |
| [`dbo.vw_Financials`](tables/EDS_Test/dbo.vw_Financials.md) |
| [`dbo.vw_FormattedDetailDescription`](tables/EDS_Test/dbo.vw_FormattedDetailDescription.md) |
| [`dbo.vw_GetMSDSInfo`](tables/EDS_Test/dbo.vw_GetMSDSInfo.md) |
| [`dbo.vw_HeadingsByBid`](tables/EDS_Test/dbo.vw_HeadingsByBid.md) |
| [`dbo.vw_HeadingsByReq`](tables/EDS_Test/dbo.vw_HeadingsByReq.md) |
| [`dbo.vw_HeadingsByReqTest`](tables/EDS_Test/dbo.vw_HeadingsByReqTest.md) |
| [`dbo.vw_HeadingsKeywordsByBid`](tables/EDS_Test/dbo.vw_HeadingsKeywordsByBid.md) |
| [`dbo.vw_IncidentalOrderDownloads`](tables/EDS_Test/dbo.vw_IncidentalOrderDownloads.md) |
| [`dbo.vw_IncidentalOrderDownloadsDetail`](tables/EDS_Test/dbo.vw_IncidentalOrderDownloadsDetail.md) |
| [`dbo.vw_InstructionBookCalendar`](tables/EDS_Test/dbo.vw_InstructionBookCalendar.md) |
| [`dbo.vw_InstructionBookContents`](tables/EDS_Test/dbo.vw_InstructionBookContents.md) |
| [`dbo.vw_IsRequisitionLocked`](tables/EDS_Test/dbo.vw_IsRequisitionLocked.md) |
| [`dbo.vw_JavaReqDetail`](tables/EDS_Test/dbo.vw_JavaReqDetail.md) |
| [`dbo.vw_KeywordsByBid`](tables/EDS_Test/dbo.vw_KeywordsByBid.md) |
| [`dbo.vw_KeywordsByReqHeading`](tables/EDS_Test/dbo.vw_KeywordsByReqHeading.md) |
| [`dbo.vw_LatestCrossRef`](tables/EDS_Test/dbo.vw_LatestCrossRef.md) |
| [`dbo.vw_MPIHeadings`](tables/EDS_Test/dbo.vw_MPIHeadings.md) |
| [`dbo.vw_MSRPBidReqManufacturer`](tables/EDS_Test/dbo.vw_MSRPBidReqManufacturer.md) |
| [`dbo.vw_MSRPBidReqManufacturerWriteIn`](tables/EDS_Test/dbo.vw_MSRPBidReqManufacturerWriteIn.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOption`](tables/EDS_Test/dbo.vw_MSRPBidReqProdLineAndOption.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOptionWriteIn`](tables/EDS_Test/dbo.vw_MSRPBidReqProdLineAndOptionWriteIn.md) |
| [`dbo.vw_MSRPBidReqProductLine`](tables/EDS_Test/dbo.vw_MSRPBidReqProductLine.md) |
| [`dbo.vw_MSRPCategoriesBySession`](tables/EDS_Test/dbo.vw_MSRPCategoriesBySession.md) |
| [`dbo.vw_MSRPManufacturersBySession`](tables/EDS_Test/dbo.vw_MSRPManufacturersBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesBySession`](tables/EDS_Test/dbo.vw_MSRPMPLVendorsCategoriesBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReport`](tables/EDS_Test/dbo.vw_MSRPMPLVendorsCategoriesReport.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReportBC`](tables/EDS_Test/dbo.vw_MSRPMPLVendorsCategoriesReportBC.md) |
| [`dbo.vw_MSRPProductLineExceptions`](tables/EDS_Test/dbo.vw_MSRPProductLineExceptions.md) |
| [`dbo.vw_MSRPVendorsAndManufacturersByReq`](tables/EDS_Test/dbo.vw_MSRPVendorsAndManufacturersByReq.md) |
| [`dbo.vw_MSRPVendorsBidHeaderBySession`](tables/EDS_Test/dbo.vw_MSRPVendorsBidHeaderBySession.md) |
| [`dbo.vw_MSRPVendorsCategoriesBySession`](tables/EDS_Test/dbo.vw_MSRPVendorsCategoriesBySession.md) |
| [`dbo.vw_MultiVendorPODistrictsAndBudgets`](tables/EDS_Test/dbo.vw_MultiVendorPODistrictsAndBudgets.md) |
| [`dbo.vw_NJDistricts`](tables/EDS_Test/dbo.vw_NJDistricts.md) |
| [`dbo.vw_NY_TM_Districts_Mailing`](tables/EDS_Test/dbo.vw_NY_TM_Districts_Mailing.md) |
| [`dbo.vw_OverrideReferences`](tables/EDS_Test/dbo.vw_OverrideReferences.md) |
| [`dbo.vw_OverrideVendorBidders`](tables/EDS_Test/dbo.vw_OverrideVendorBidders.md) |
| [`dbo.vw_POStatus_Test`](tables/EDS_Test/dbo.vw_POStatus_Test.md) |
| [`dbo.vw_PricePlanFilter`](tables/EDS_Test/dbo.vw_PricePlanFilter.md) |
| [`dbo.vw_RepsDistricts`](tables/EDS_Test/dbo.vw_RepsDistricts.md) |
| [`dbo.vw_ReqBidReview`](tables/EDS_Test/dbo.vw_ReqBidReview.md) |
| [`dbo.vw_ReqCategories`](tables/EDS_Test/dbo.vw_ReqCategories.md) |
| [`dbo.vw_ReqDetail_BK20241205`](tables/EDS_Test/dbo.vw_ReqDetail_BK20241205.md) |
| [`dbo.vw_ReqDetail_BK20241227`](tables/EDS_Test/dbo.vw_ReqDetail_BK20241227.md) |
| [`dbo.vw_ReqDetail1`](tables/EDS_Test/dbo.vw_ReqDetail1.md) |
| [`dbo.vw_ReqDetailAsp1`](tables/EDS_Test/dbo.vw_ReqDetailAsp1.md) |
| [`dbo.vw_ReqDetailPrintTest`](tables/EDS_Test/dbo.vw_ReqDetailPrintTest.md) |
| [`dbo.vw_ReqDetail-removed 12082010`](tables/EDS_Test/dbo.vw_ReqDetail-removed_12082010.md) |
| [`dbo.vw_ReqDetailSummary`](tables/EDS_Test/dbo.vw_ReqDetailSummary.md) |
| [`dbo.vw_ReqDetailTab`](tables/EDS_Test/dbo.vw_ReqDetailTab.md) |
| [`dbo.vw_ReqTotalsByVendor`](tables/EDS_Test/dbo.vw_ReqTotalsByVendor.md) |
| [`dbo.vw_ReqTotalsByVendorTest`](tables/EDS_Test/dbo.vw_ReqTotalsByVendorTest.md) |
| [`dbo.vw_RequisitionAccountBalance`](tables/EDS_Test/dbo.vw_RequisitionAccountBalance.md) |
| [`dbo.vw_RequisitionCatalogList`](tables/EDS_Test/dbo.vw_RequisitionCatalogList.md) |
| [`dbo.vw_RequisitionList`](tables/EDS_Test/dbo.vw_RequisitionList.md) |
| [`dbo.vw_Requisitions`](tables/EDS_Test/dbo.vw_Requisitions.md) |
| [`dbo.vw_RequisitionsAccounts`](tables/EDS_Test/dbo.vw_RequisitionsAccounts.md) |
| [`dbo.vw_RequisitionsCategories`](tables/EDS_Test/dbo.vw_RequisitionsCategories.md) |
| [`dbo.vw_RequisitionShippingCostsTest`](tables/EDS_Test/dbo.vw_RequisitionShippingCostsTest.md) |
| [`dbo.vw_RequisitionsPrint`](tables/EDS_Test/dbo.vw_RequisitionsPrint.md) |
| [`dbo.vw_RequisitionsShippingLocations`](tables/EDS_Test/dbo.vw_RequisitionsShippingLocations.md) |
| [`dbo.vw_RequisitionStatus_orig`](tables/EDS_Test/dbo.vw_RequisitionStatus_orig.md) |
| [`dbo.vw_ReqVendors`](tables/EDS_Test/dbo.vw_ReqVendors.md) |
| [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocsAndMore.md) |
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](tables/EDS_Test/dbo.vw_RptMarkedReadyEmailBlastStats.md) |
| [`dbo.vw_RptMissingURLsByBidAndVendor`](tables/EDS_Test/dbo.vw_RptMissingURLsByBidAndVendor.md) |
| [`dbo.vw_RTK_MSDSandCC`](tables/EDS_Test/dbo.vw_RTK_MSDSandCC.md) |
| [`dbo.vw_RTK_Sites`](tables/EDS_Test/dbo.vw_RTK_Sites.md) |
| [`dbo.vw_RTKDefaultMSDSLocation`](tables/EDS_Test/dbo.vw_RTKDefaultMSDSLocation.md) |
| [`dbo.vw_RTKInfo`](tables/EDS_Test/dbo.vw_RTKInfo.md) |
| [`dbo.vw_RTKInfoAnnual`](tables/EDS_Test/dbo.vw_RTKInfoAnnual.md) |
| [`dbo.vw_RTKItems`](tables/EDS_Test/dbo.vw_RTKItems.md) |
| [`dbo.vw_RTKItems2`](tables/EDS_Test/dbo.vw_RTKItems2.md) |
| [`dbo.vw_RTKReportItems`](tables/EDS_Test/dbo.vw_RTKReportItems.md) |
| [`dbo.vw_Savings1`](tables/EDS_Test/dbo.vw_Savings1.md) |
| [`dbo.vw_Savings5`](tables/EDS_Test/dbo.vw_Savings5.md) |
| [`dbo.vw_SavingsTotals`](tables/EDS_Test/dbo.vw_SavingsTotals.md) |
| [`dbo.vw_SavingsTotals5NJ`](tables/EDS_Test/dbo.vw_SavingsTotals5NJ.md) |
| [`dbo.vw_SavingsTotals5NonFiltered`](tables/EDS_Test/dbo.vw_SavingsTotals5NonFiltered.md) |
| [`dbo.vw_SavingsTotals5Test`](tables/EDS_Test/dbo.vw_SavingsTotals5Test.md) |
| [`dbo.vw_ScanDocLookupFields`](tables/EDS_Test/dbo.vw_ScanDocLookupFields.md) |
| [`dbo.vw_ScanDocLookups`](tables/EDS_Test/dbo.vw_ScanDocLookups.md) |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS_Test/dbo.vw_ScanDocLookupTargets.md) |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDS.md) |
| [`dbo.vw_ScannedDocumentDataMSDSCategories`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDSCategories.md) |
| [`dbo.vw_ScannedDocumentDataMSDSManufacturers`](tables/EDS_Test/dbo.vw_ScannedDocumentDataMSDSManufacturers.md) |
| [`dbo.vw_scARCategories`](tables/EDS_Test/dbo.vw_scARCategories.md) |
| [`dbo.vw_SchoolUsers`](tables/EDS_Test/dbo.vw_SchoolUsers.md) |
| [`dbo.vw_SDSImportView`](tables/EDS_Test/dbo.vw_SDSImportView.md) |
| [`dbo.vw_SDSReferencedURLs`](tables/EDS_Test/dbo.vw_SDSReferencedURLs.md) |
| [`dbo.vw_SearchDescription`](tables/EDS_Test/dbo.vw_SearchDescription.md) |
| [`dbo.vw_SearchItemsDetail`](tables/EDS_Test/dbo.vw_SearchItemsDetail.md) |
| [`dbo.vw_SearchItemsHeadings`](tables/EDS_Test/dbo.vw_SearchItemsHeadings.md) |
| [`dbo.vw_SearchItemsKeywords`](tables/EDS_Test/dbo.vw_SearchItemsKeywords.md) |
| [`dbo.vw_SessionCategories`](tables/EDS_Test/dbo.vw_SessionCategories.md) |
| [`dbo.vw_SessionCategoryVendors`](tables/EDS_Test/dbo.vw_SessionCategoryVendors.md) |
| [`dbo.vw_SessionTableBudgets`](tables/EDS_Test/dbo.vw_SessionTableBudgets.md) |
| [`dbo.vw_ShortDescription`](tables/EDS_Test/dbo.vw_ShortDescription.md) |
| [`dbo.vw_StatusDetailed`](tables/EDS_Test/dbo.vw_StatusDetailed.md) |
| [`dbo.vw_TMAwardedVendors`](tables/EDS_Test/dbo.vw_TMAwardedVendors.md) |
| [`dbo.vw_TMLineItems`](tables/EDS_Test/dbo.vw_TMLineItems.md) |
| [`dbo.vw_TMSurveyData`](tables/EDS_Test/dbo.vw_TMSurveyData.md) |
| [`dbo.vw_TMSurveys`](tables/EDS_Test/dbo.vw_TMSurveys.md) |
| [`dbo.vw_TMTrades`](tables/EDS_Test/dbo.vw_TMTrades.md) |
| [`dbo.vw_TMUsers`](tables/EDS_Test/dbo.vw_TMUsers.md) |
| [`dbo.vw_TMVendorsForReports`](tables/EDS_Test/dbo.vw_TMVendorsForReports.md) |
| [`dbo.vw_UsedAccountData`](tables/EDS_Test/dbo.vw_UsedAccountData.md) |
| [`dbo.vw_UserNotificationOptions`](tables/EDS_Test/dbo.vw_UserNotificationOptions.md) |
| [`dbo.vw_ValidLogins`](tables/EDS_Test/dbo.vw_ValidLogins.md) |
| [`dbo.vw_Vendor0528Items`](tables/EDS_Test/dbo.vw_Vendor0528Items.md) |
| [`dbo.vw_VendorBidDocumentsList`](tables/EDS_Test/dbo.vw_VendorBidDocumentsList.md) |
| [`dbo.vw_VendorBidInfoStats`](tables/EDS_Test/dbo.vw_VendorBidInfoStats.md) |
| [`dbo.vw_VendorBlast`](tables/EDS_Test/dbo.vw_VendorBlast.md) |
| [`dbo.vw_VendorBlast_AwardedByBid`](tables/EDS_Test/dbo.vw_VendorBlast_AwardedByBid.md) |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS_Test/dbo.vw_VendorBlast_DownloadedBySchedule.md) |
| [`dbo.vw_VendorBlast_RegisteredByBid`](tables/EDS_Test/dbo.vw_VendorBlast_RegisteredByBid.md) |
| [`dbo.vw_VendorBlast_RegisteredByCategory`](tables/EDS_Test/dbo.vw_VendorBlast_RegisteredByCategory.md) |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS_Test/dbo.vw_VendorBlast_RegisteredBySchedule.md) |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS_Test/dbo.vw_VendorBlast_SubmittedByBid.md) |
| [`dbo.vw_VendorCategoryBids_Cats`](tables/EDS_Test/dbo.vw_VendorCategoryBids_Cats.md) |
| [`dbo.vw_VendorCategoryBids_Vendors`](tables/EDS_Test/dbo.vw_VendorCategoryBids_Vendors.md) |
| [`dbo.vw_VendorDocRequestStatus`](tables/EDS_Test/dbo.vw_VendorDocRequestStatus.md) |
| [`dbo.vw_VendorDocumentsList`](tables/EDS_Test/dbo.vw_VendorDocumentsList.md) |
| [`dbo.vw_VendorPODistrictList`](tables/EDS_Test/dbo.vw_VendorPODistrictList.md) |
| [`dbo.vw_VendorPODistricts`](tables/EDS_Test/dbo.vw_VendorPODistricts.md) |
| [`dbo.vw_VendorPODistrictsAndBudgets`](tables/EDS_Test/dbo.vw_VendorPODistrictsAndBudgets.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsCF`](tables/EDS_Test/dbo.vw_VendorPODistrictsAndBudgetsCF.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsOld`](tables/EDS_Test/dbo.vw_VendorPODistrictsAndBudgetsOld.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsTest`](tables/EDS_Test/dbo.vw_VendorPODistrictsAndBudgetsTest.md) |
| [`dbo.vw_VendorPOView1`](tables/EDS_Test/dbo.vw_VendorPOView1.md) |
| [`dbo.vw_VendorPOView2`](tables/EDS_Test/dbo.vw_VendorPOView2.md) |
| [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_Test/dbo.vw_VendorQueryMSRPStatus.md) |
| [`dbo.vw_VendorQueryStatus`](tables/EDS_Test/dbo.vw_VendorQueryStatus.md) |
| [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_Test/dbo.vw_VendorQueryTandMStatus.md) |
| [`dbo.vw_VendorsByBid`](tables/EDS_Test/dbo.vw_VendorsByBid.md) |
| [`dbo.vw_VendorsTable`](tables/EDS_Test/dbo.vw_VendorsTable.md) |
| [`dbo.vw_VPOLoginCheck`](tables/EDS_Test/dbo.vw_VPOLoginCheck.md) |
| [`dbo.vw_VPOVendors`](tables/EDS_Test/dbo.vw_VPOVendors.md) |
| [`dbo.vw_WincapVendors`](tables/EDS_Test/dbo.vw_WincapVendors.md) |
| [`dbo.vw_WincapVendorsMaster`](tables/EDS_Test/dbo.vw_WincapVendorsMaster.md) |
| [`dbo.vw_ZonalItems`](tables/EDS_Test/dbo.vw_ZonalItems.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `null.sp_CCAddAddendaItem_EDSIQWebuser` | PROCEDURE |
| `null.sp_CCAddAddendaMaint` | PROCEDURE |
| `null.sp_CCUpdateAddendaItem_EDSIQWEBUSER` | PROCEDURE |
| `null.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `null.sp_CombineReqs` | PROCEDURE |
| `null.sp_CombineReqsNoDelete` | PROCEDURE |
| `null.sp_ConvertReadyBatches` | PROCEDURE |
| `null.sp_CoverView` | PROCEDURE |
| `null.sp_DeleteDistrictBudgetPOs` | PROCEDURE |
| `null.sp_DeleteEmptyReqs` | PROCEDURE |
| `null.sp_DeletePOList` | PROCEDURE |
| `null.sp_DeleteRequisitionWithItems` | PROCEDURE |
| `null.sp_MultiBatchLoad` | PROCEDURE |
| `null.sp_NightlyGarbageCollection` | PROCEDURE |
| `null.sp_OrderBookCopy` | PROCEDURE |
| `null.sp_SavingsLetter` | PROCEDURE |
| `null.sp_Sys3000ToWinCap` | PROCEDURE |
| `null.uf_CoverPages` | INLINE TABLE FUNCTION |
| `null.uf_IsRequisitionLocked` | SCALAR FUNCTION |
| `null.uf_LookupItems` | TABLE FUNCTION |
| `null.uf_LookupItemsByCatalog` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch1` | INLINE TABLE FUNCTION |
| `null.uf_LookupItemsForBook` | TABLE FUNCTION |
| `null.uf_LookupItemsForBook1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrice1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrices` | TABLE FUNCTION |
| `null.uf_Sys3000ToWinCap` | TABLE FUNCTION |
| `null.uf_TopOrderBook` | INLINE TABLE FUNCTION |
| `dbo._sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.bid2xls` | PROCEDURE |
| `dbo.bid2xlsTest` | PROCEDURE |
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.fnParseRTF` | SCALAR FUNCTION |
| `dbo.RTF2TXT` | SCALAR FUNCTION |
| `dbo.sp_AddDistrict` | PROCEDURE |
| `dbo.sp_AddISBN` | PROCEDURE |
| `dbo.sp_AddMSRPItem` | PROCEDURE |
| `dbo.sp_AddPPCatalog` | PROCEDURE |
| `dbo.sp_AddPricePlan` | PROCEDURE |
| `dbo.sp_AddSchool` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_ApproveReq` | PROCEDURE |
| `dbo.sp_AttemptLogin` | PROCEDURE |
| `dbo.sp_AwardBid` | PROCEDURE |
| `dbo.sp_AwardBidHeader` | PROCEDURE |
| `dbo.sp_AwardBidHeaderSingleItem` | PROCEDURE |
| `dbo.sp_BAList` | PROCEDURE |
| `dbo.sp_BatchChanges` | PROCEDURE |
| `dbo.sp_BatchConvert` | PROCEDURE |
| `dbo.sp_BatchConvertNew` | PROCEDURE |
| `dbo.sp_BatchLoad` | PROCEDURE |
| `dbo.sp_BatchProcess` | PROCEDURE |
| `dbo.sp_BatchQueue` | PROCEDURE |
| `dbo.sp_BatchVerify` | PROCEDURE |
| `dbo.sp_BatchVerifyBook` | PROCEDURE |
| `dbo.sp_BatchVerifyForce` | PROCEDURE |
| `dbo.sp_BidCompare` | PROCEDURE |
| `dbo.sp_BidCompareDiscount` | PROCEDURE |
| `dbo.sp_BidCompareSame` | PROCEDURE |
| `dbo.sp_BidCompareSummary` | PROCEDURE |
| `dbo.sp_BidCopy` | PROCEDURE |
| `dbo.sp_BidCopyChangePP` | PROCEDURE |
| `dbo.sp_BidCopyWithIncrease` | PROCEDURE |
| `dbo.sp_BringBillingForward` | PROCEDURE |
| `dbo.sp_BringBillingForwardState` | PROCEDURE |
| `dbo.sp_BuildTopOrdered` | PROCEDURE |
| `dbo.sp_CanDeleteRequisition` | PROCEDURE |
| `dbo.sp_CatalogDataCheck` | PROCEDURE |
| `dbo.sp_CatalogDataPriceCheck` | PROCEDURE |
| `dbo.sp_CatalogImport` | PROCEDURE |
| `dbo.sp_CatalogImporter` | PROCEDURE |
| `dbo.sp_CatalogImporterXML` | PROCEDURE |
| `dbo.sp_CCAccountMaint` | PROCEDURE |
| `dbo.sp_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_CCAddAddendaMaint` | PROCEDURE |
| `dbo.sp_CCAnalysisReturn` | PROCEDURE |
| `dbo.sp_CCItemMaint` | PROCEDURE |
| `dbo.sp_CCSchoolMaint` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItemSizesOnly` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `dbo.sp_CCUpdateResults` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts_2` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccountsBulk` | PROCEDURE |
| `dbo.sp_CCUserAccountMaint` | PROCEDURE |
| `dbo.sp_CCUserGridMaint` | PROCEDURE |
| `dbo.sp_CombineReqs` | PROCEDURE |
| `dbo.sp_CombineReqsByVendorNoDelete` | PROCEDURE |
| `dbo.sp_CometLoad` | PROCEDURE |
| `dbo.sp_ConvertReqs` | PROCEDURE |
| `dbo.sp_ConvertTextbookReqs` | PROCEDURE |
| `dbo.sp_CopyBidImport` | PROCEDURE |
| `dbo.sp_CopyBudgetAmounts` | PROCEDURE |
| `dbo.sp_CopyCalendar` | PROCEDURE |
| `dbo.sp_CopyItems` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup-2014-10-29` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave2` | PROCEDURE |
| `dbo.sp_CopyMSRPVers3Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers4Bid` | PROCEDURE |
| `dbo.sp_CopyReqs` | PROCEDURE |
| `dbo.sp_CreateBidFromRequest` | PROCEDURE |
| `dbo.sp_CreateBidHeaderDetail` | PROCEDURE |
| `dbo.sp_CreateBidHeaderItems` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_CreateNewBidHeader` | PROCEDURE |
| `dbo.sp_CreateNewRequisition` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionV` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor_bk20250416` | PROCEDURE |
| `dbo.sp_CreateOrderBook03` | PROCEDURE |
| `dbo.sp_CreateOrderBookTest` | PROCEDURE |
| `dbo.sp_CreatePO_Saved062724` | PROCEDURE |
| `dbo.sp_CreatePOTest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequestPrebid` | PROCEDURE |
| `dbo.sp_CreateTextBookBidRequest` | PROCEDURE |
| `dbo.sp_CreateVendorSession` | PROCEDURE |
| `dbo.sp_CXmlLogin` | PROCEDURE |
| `dbo.sp_DBCheck` | PROCEDURE |
| `dbo.sp_DefragAll` | PROCEDURE |
| `dbo.sp_DeleteBatch` | PROCEDURE |
| `dbo.sp_DeleteBook` | PROCEDURE |
| `dbo.sp_DeleteDistrictPOs` | PROCEDURE |
| `dbo.sp_DeleteNoBids` | PROCEDURE |
| `dbo.sp_DeletePO` | PROCEDURE |
| `dbo.sp_DeleteRequisition` | PROCEDURE |
| `dbo.sp_DeleteRequisitionRestricted` | PROCEDURE |
| `dbo.sp_DeleteRequisitionWithDetail` | PROCEDURE |
| `dbo.sp_DeleteZeros` | PROCEDURE |
| `dbo.sp_DistrictRequisitionDetail` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_DSHeadings` | PROCEDURE |
| `dbo.sp_easyadd` | PROCEDURE |
| `dbo.sp_EDSItems` | PROCEDURE |
| `dbo.sp_EnhancedSearchItem` | PROCEDURE |
| `dbo.sp_ExportMSRPBid` | PROCEDURE |
| `dbo.sp_FA_AddUpdateAccountCode` | PROCEDURE |
| `dbo.sp_FA_ApproveReq` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin_BK_20241018_Before_EncryptedPassword` | PROCEDURE |
| `dbo.sp_FA_AvailableAccounts` | PROCEDURE |
| `dbo.sp_FA_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CreatePO` | PROCEDURE |
| `dbo.sp_FA_CreateReportSession` | PROCEDURE |
| `dbo.sp_FA_CreateReportSessionLinks` | PROCEDURE |
| `dbo.sp_FA_DeleteAccount` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition_bk20250416` | PROCEDURE |
| `dbo.sp_FA_DeleteUser` | PROCEDURE |
| `dbo.sp_FA_GetAlert` | PROCEDURE |
| `dbo.sp_FA_getUserKeys` | PROCEDURE |
| `dbo.sp_FA_NewPONumbers` | PROCEDURE |
| `dbo.sp_FA_NextPONumber` | PROCEDURE |
| `dbo.sp_FA_RequisitionsForPurchaseOrderModal` | PROCEDURE |
| `dbo.sp_FA_RequisitionsTotals` | PROCEDURE |
| `dbo.sp_FA_SaveHeading` | PROCEDURE |
| `dbo.sp_FA_SaveKeyword` | PROCEDURE |
| `dbo.sp_FA_SavePOs` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNote` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNoteEmails` | PROCEDURE |
| `dbo.sp_FA_SaveUser` | PROCEDURE |
| `dbo.sp_FA_SetBudgetAccount` | PROCEDURE |
| `dbo.sp_FA_SetUserAccount` | PROCEDURE |
| `dbo.sp_FA_UpdatePOStatus` | PROCEDURE |
| `dbo.sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.sp_FixVendorItemCode` | PROCEDURE |
| `dbo.sp_getCurrentPrices` | PROCEDURE |
| `dbo.sp_GetPODetailByIds` | PROCEDURE |
| `dbo.sp_GetRequisitionShipping` | PROCEDURE |
| `dbo.sp_GetUserRequisitions` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_HoldRequisition` | PROCEDURE |
| `dbo.sp_ImportVendorsBid` | PROCEDURE |
| `dbo.sp_IPQueueStart` | PROCEDURE |
| `dbo.sp_ISBNAdd` | PROCEDURE |
| `dbo.sp_Logout` | PROCEDURE |
| `dbo.sp_MakeReq` | PROCEDURE |
| `dbo.sp_MasterBudgetBook` | PROCEDURE |
| `dbo.sp_MergeAccounts` | PROCEDURE |
| `dbo.sp_MergeAwards` | PROCEDURE |
| `dbo.sp_MergeBidImports` | PROCEDURE |
| `dbo.sp_MergeBids` | PROCEDURE |
| `dbo.sp_MoveIndexes` | PROCEDURE |
| `dbo.sp_MoveReqs` | PROCEDURE |
| `dbo.sp_MPIHeadings` | PROCEDURE |
| `dbo.sp_MSRPExporter` | PROCEDURE |
| `dbo.sp_MSRPImporter` | PROCEDURE |
| `dbo.sp_NewReportSession` | PROCEDURE |
| `dbo.sp_NewRequisitionId_BK20250416` | PROCEDURE |
| `dbo.sp_NewUpload` | PROCEDURE |
| `dbo.sp_OrderBookMaint` | PROCEDURE |
| `dbo.sp_PAAccounts` | PROCEDURE |
| `dbo.sp_PABudgets` | PROCEDURE |
| `dbo.sp_PACategories` | PROCEDURE |
| `dbo.sp_PAComet` | PROCEDURE |
| `dbo.sp_PARequisitions` | PROCEDURE |
| `dbo.sp_PARequisitionsTest` | PROCEDURE |
| `dbo.sp_PARequisitionsTotal` | PROCEDURE |
| `dbo.sp_PASchools` | PROCEDURE |
| `dbo.sp_PAStatus` | PROCEDURE |
| `dbo.sp_PAStatusTest` | PROCEDURE |
| `dbo.sp_PAStatusTest1` | PROCEDURE |
| `dbo.sp_PAUsers` | PROCEDURE |
| `dbo.sp_PODetail` | PROCEDURE |
| `dbo.sp_PODetailLastItemOnly` | PROCEDURE |
| `dbo.sp_PrepareNextYear` | PROCEDURE |
| `dbo.sp_PrepTMSurvey` | PROCEDURE |
| `dbo.sp_ProcessCopyRequests` | PROCEDURE |
| `dbo.sp_processKill` | PROCEDURE |
| `dbo.sp_processMonitor` | PROCEDURE |
| `dbo.sp_processMonitorOrig` | PROCEDURE |
| `dbo.sp_processStatus` | PROCEDURE |
| `dbo.sp_QueueIPs` | PROCEDURE |
| `dbo.sp_QueueReqs` | PROCEDURE |
| `dbo.sp_Reaward_script` | PROCEDURE |
| `dbo.sp_RefreshAccounts` | PROCEDURE |
| `dbo.sp_RefreshDistrictVendors` | PROCEDURE |
| `dbo.sp_ReindexAll` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_ReportReqData` | PROCEDURE |
| `dbo.sp_ResetDistrictAccountingYear` | PROCEDURE |
| `dbo.sp_retrieveTagset` | PROCEDURE |
| `dbo.sp_retrieveTagsetDMS` | PROCEDURE |
| `dbo.sp_ReturnUserReqs` | PROCEDURE |
| `dbo.sp_RTK_AddReportItems` | PROCEDURE |
| `dbo.sp_RTK_Build_MSDS_and_MSDSDetail` | PROCEDURE |
| `dbo.sp_RTKExport` | PROCEDURE |
| `dbo.sp_SaveTags` | PROCEDURE |
| `dbo.sp_SchoolMerge` | PROCEDURE |
| `dbo.sp_search` | PROCEDURE |
| `dbo.sp_SearchItems` | PROCEDURE |
| `dbo.sp_SearchItemsByReqHK` | PROCEDURE |
| `dbo.sp_SessionTableUpdate` | PROCEDURE |
| `dbo.sp_SetBudgetYear` | PROCEDURE |
| `dbo.sp_SetDistrictAndBudgetYear` | PROCEDURE |
| `dbo.sp_ShowAllDefrag` | PROCEDURE |
| `dbo.sp_ShowDistribution` | PROCEDURE |
| `dbo.sp_ShowTextbookSavings` | PROCEDURE |
| `dbo.sp_SmallPOCheck` | PROCEDURE |
| `dbo.sp_SubmitRequisition` | PROCEDURE |
| `dbo.sp_SubmitRequisitionNew` | PROCEDURE |
| `dbo.sp_UAAccounts` | PROCEDURE |
| `dbo.sp_UAList` | PROCEDURE |
| `dbo.sp_UAListTotals` | PROCEDURE |
| `dbo.sp_UAUsers` | PROCEDURE |
| `dbo.sp_UnawardBidHeader` | PROCEDURE |
| `dbo.sp_UnpostCatalog` | PROCEDURE |
| `dbo.sp_UpdateAllListPrices` | PROCEDURE |
| `dbo.sp_UpdateAllReqs` | PROCEDURE |
| `dbo.sp_UpdateCatalogText` | PROCEDURE |
| `dbo.sp_UpdateCatalogTextPart` | PROCEDURE |
| `dbo.sp_UpdateDetails` | PROCEDURE |
| `dbo.sp_UpdateHeading` | PROCEDURE |
| `dbo.sp_UpdateISBN` | PROCEDURE |
| `dbo.sp_UpdateListPrices` | PROCEDURE |
| `dbo.sp_UpdateMSRPItem` | PROCEDURE |
| `dbo.sp_UpdateNextNumber` | PROCEDURE |
| `dbo.sp_UpdateReqDetail` | PROCEDURE |
| `dbo.sp_UpdateReqDetailItem` | PROCEDURE |
| `dbo.sp_UpdateReqDetailList` | PROCEDURE |
| `dbo.sp_UpdateReqDetailPricePlan` | PROCEDURE |
| `dbo.sp_UpdateReqHeader` | PROCEDURE |
| `dbo.sp_UpdateShippingCode` | PROCEDURE |
| `dbo.sp_UpdateVIC` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.sp_ValidateBidImport` | PROCEDURE |
| `dbo.sp_ValidateForPO` | PROCEDURE |
| `dbo.sp_VendorOverride` | PROCEDURE |
| `dbo.sp_VendorOverrideLine` | PROCEDURE |
| `dbo.sp_VendorOverrideOld` | PROCEDURE |
| `dbo.sp_VerifyForPO` | PROCEDURE |
| `dbo.sp_WarningsForPO` | PROCEDURE |
| `dbo.uf_ActiveAccountList` | SCALAR FUNCTION |
| `dbo.uf_AwardLetter` | TABLE FUNCTION |
| `dbo.uf_AwardLetter1` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid_Orig` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid1` | TABLE FUNCTION |
| `dbo.uf_BatchChanges` | TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailReqComb` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailRSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummary` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummaryByDistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinner` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinnerReq` | INLINE TABLE FUNCTION |
| `dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered` | TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePO` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePODistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePORSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_BillingMonths` | SCALAR FUNCTION |
| `dbo.uf_CatalogFtsHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogFtsPageHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogRefsAsp` | SCALAR FUNCTION |
| `dbo.uf_CatalogRefsDetailTest` | SCALAR FUNCTION |
| `dbo.uf_ConfiguredDistricts` | SCALAR FUNCTION |
| `dbo.uf_ContactList` | SCALAR FUNCTION |
| `dbo.uf_ContactListHtml` | SCALAR FUNCTION |
| `dbo.uf_ContactListText` | SCALAR FUNCTION |
| `dbo.uf_CrossRefs2TextOrig` | SCALAR FUNCTION |
| `dbo.uf_DecodeChargeDates` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtra` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtraNH` | SCALAR FUNCTION |
| `dbo.uf_DistrictPaymentHistory` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentHistoryBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBO` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | TABLE FUNCTION |
| `dbo.uf_DistrictProposedFees` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary1_Test` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2Off` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryBidHeader` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors1` | TABLE FUNCTION |
| `dbo.uf_ExportMSRPBid` | TABLE FUNCTION |
| `dbo.uf_FA_ApprovalUserTree` | TABLE FUNCTION |
| `dbo.uf_FA_UserApproverTree` | TABLE FUNCTION |
| `dbo.uf_FirstPhrase` | SCALAR FUNCTION |
| `dbo.uf_FixExtended` | SCALAR FUNCTION |
| `dbo.uf_FormatDateDisplay` | SCALAR FUNCTION |
| `dbo.uf_IsBid` | SCALAR FUNCTION |
| `dbo.uf_IsRequisitionLocked2` | SCALAR FUNCTION |
| `dbo.uf_LineCount` | SCALAR FUNCTION |
| `dbo.uf_LookupItemCode` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH1` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReq-120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqOld120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqSaved` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendorTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeReq` | TABLE FUNCTION |
| `dbo.uf_LookupItems` | TABLE FUNCTION |
| `dbo.uf_LookupPrice` | TABLE FUNCTION |
| `dbo.uf_LookupPriceByBHLong` | TABLE FUNCTION |
| `dbo.uf_MSRPCheckManufacturerAndNumber` | TABLE FUNCTION |
| `dbo.uf_MyUserTree` | TABLE FUNCTION |
| `dbo.uf_NameParser` | TABLE FUNCTION |
| `dbo.uf_NewSavingsLetter` | TABLE FUNCTION |
| `dbo.uf_NextLowestPrice` | SCALAR FUNCTION |
| `dbo.uf_NextLowestPriceId` | SCALAR FUNCTION |
| `dbo.uf_OrderBook` | TABLE FUNCTION |
| `dbo.uf_OrderBook03` | TABLE FUNCTION |
| `dbo.uf_OrderBookNew` | TABLE FUNCTION |
| `dbo.uf_OrderBookSaved` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest1` | TABLE FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | TABLE FUNCTION |
| `dbo.uf_PackCode_New` | SCALAR FUNCTION |
| `dbo.uf_PackCode_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalog_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalogTest` | SCALAR FUNCTION |
| `dbo.uf_PackCodeExport_Old` | SCALAR FUNCTION |
| `dbo.uf_PARequisitions` | TABLE FUNCTION |
| `dbo.uf_PARequisitionsTest` | TABLE FUNCTION |
| `dbo.uf_POAccountList` | TABLE FUNCTION |
| `dbo.uf_POAccountsUsed` | TABLE FUNCTION |
| `dbo.uf_POAttentionList` | TABLE FUNCTION |
| `dbo.uf_POAttentionListCount` | SCALAR FUNCTION |
| `dbo.uf_PODetail` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary1` | TABLE FUNCTION |
| `dbo.uf_POHeader` | TABLE FUNCTION |
| `dbo.uf_PricePlanSummary` | TABLE FUNCTION |
| `dbo.uf_ProposedDistrictPaymentSchedule` | TABLE FUNCTION |
| `dbo.uf_RemoveHighOrder` | SCALAR FUNCTION |
| `dbo.uf_RequisitionCategories` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionCategoriesTest` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionData` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionList` | TABLE FUNCTION |
| `dbo.uf_RequisitionListSelective` | TABLE FUNCTION |
| `dbo.uf_RequisitionListTest` | TABLE FUNCTION |
| `dbo.uf_RTKItems` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKItemsRev2` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKUnassignedShipLocations` | INLINE TABLE FUNCTION |
| `dbo.uf_SavingsLetter` | TABLE FUNCTION |
| `dbo.uf_SavingsLetter2` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty1` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCountyNew` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterOld` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterState` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterSummary` | TABLE FUNCTION |
| `dbo.uf_ScanDocSelectStatement` | SCALAR FUNCTION |
| `dbo.uf_SchoolNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_SearchDistrictDetail` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetail_Orig` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetailNew` | TABLE FUNCTION |
| `dbo.uf_SearchItemsDetail` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchItemsHeadings` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchKeywords` | SCALAR FUNCTION |
| `dbo.uf_SecondPhrase` | SCALAR FUNCTION |
| `dbo.uf_SecondWord` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq1` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq2` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq3` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeqTest` | SCALAR FUNCTION |
| `dbo.uf_ShippingNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_ShowDistribution` | TABLE FUNCTION |
| `dbo.uf_Status` | TABLE FUNCTION |
| `dbo.uf_TMTradeVendorSummary` | SCALAR FUNCTION |
| `dbo.uf_Trim` | SCALAR FUNCTION |
| `dbo.uf_UserEmailTree` | TABLE FUNCTION |
| `dbo.uf_UserTreeApprover` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudget` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetFiltered` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetWork` | TABLE FUNCTION |
| `dbo.uf_UserTrees` | TABLE FUNCTION |
| `dbo.uf_UserTreesDistrict` | TABLE FUNCTION |
| `dbo.uf_VendorBidContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorBidNumbers` | SCALAR FUNCTION |
| `dbo.uf_VendorContacts` | SCALAR FUNCTION |
| `dbo.uf_VendorPOContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorSummary` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsDetail` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsItem` | TABLE FUNCTION |
| `dbo.ufn_GetHazardsDescription` | SCALAR FUNCTION |
| `dbo.ufn_GetMSDSSheets` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNonHazardous` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNotScanned` | TABLE FUNCTION |
| `dbo.ufn_VerifyForPO` | TABLE FUNCTION |
| `dbo.UrlDecode` | SCALAR FUNCTION |
| `dbo.usp_BidMatchRefs` | PROCEDURE |
| `dbo.usp_BidPageNumberUpdate` | PROCEDURE |
| `dbo.usp_BidRanking` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetail_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavid` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailTempKevin_notused` | PROCEDURE |
| `dbo.usp_BidRequestMergeActions` | PROCEDURE |
| `dbo.usp_BidRequestMergeActionsUNDO-wait` | PROCEDURE |
| `dbo.usp_BringAccountsForward` | PROCEDURE |
| `dbo.usp_ChangeBidHeaderNumber` | PROCEDURE |
| `dbo.usp_CheckVendorComplianceForPOs` | PROCEDURE |
| `dbo.usp_ContinuanceAcceptance` | PROCEDURE |
| `dbo.usp_CopyRequisition` | PROCEDURE |
| `dbo.usp_CreateFreightRequest` | PROCEDURE |
| `dbo.usp_DetailedIdentityColumnsReport` | PROCEDURE |
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed` | PROCEDURE |
| `dbo.usp_EndPOSend` | PROCEDURE |
| `dbo.usp_FindEmail` | PROCEDURE |
| `dbo.usp_FindEmail_BK` | PROCEDURE |
| `dbo.usp_GeneratePassword` | PROCEDURE |
| `dbo.usp_GeneratePassword_Print` | PROCEDURE |
| `dbo.usp_GetBidItemAIData` | PROCEDURE |
| `dbo.usp_GetBidItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetImageList` | PROCEDURE |
| `dbo.usp_GetItemAIData` | PROCEDURE |
| `dbo.usp_GetItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetMSDSSheets` | PROCEDURE |
| `dbo.usp_getMyLastYearsReqs` | PROCEDURE |
| `dbo.usp_GetNextPONumber` | PROCEDURE |
| `dbo.usp_GetPODetail` | PROCEDURE |
| `dbo.usp_GetPODetail_Test` | PROCEDURE |
| `dbo.usp_GetPOs` | PROCEDURE |
| `dbo.usp_GetPOs_Test` | PROCEDURE |
| `dbo.usp_getSDSDocsAll` | PROCEDURE |
| `dbo.usp_getSDSDocsDistrict` | PROCEDURE |
| `dbo.usp_getSDSDocsSchool` | PROCEDURE |
| `dbo.usp_getSDSDocsUser` | PROCEDURE |
| `dbo.usp_getSDSheets` | PROCEDURE |
| `dbo.usp_getSDSItems` | PROCEDURE |
| `dbo.usp_GetSDSURLs` | PROCEDURE |
| `dbo.usp_GetVendorPricing` | PROCEDURE |
| `dbo.usp_ImportUser` | PROCEDURE |
| `dbo.usp_MakeZ$` | PROCEDURE |
| `dbo.usp_MakeZC` | PROCEDURE |
| `dbo.usp_MissingHeaders` | PROCEDURE |
| `dbo.usp_mySDS` | PROCEDURE |
| `dbo.usp_OrderEZVendors` | PROCEDURE |
| `dbo.usp_POPrintExport` | PROCEDURE |
| `dbo.usp_POStatusByRep` | PROCEDURE |
| `dbo.usp_POStatusByState` | PROCEDURE |
| `dbo.usp_POStatusUpdates` | PROCEDURE |
| `dbo.usp_QueuePOsToSend` | PROCEDURE |
| `dbo.usp_RestoreBidHeaderNumber` | PROCEDURE |
| `dbo.usp_SavePositionData` | PROCEDURE |
| `dbo.usp_SDSDocs` | PROCEDURE |
| `dbo.usp_SearchItems_SearchDataDB` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS_David` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSDavid` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSError` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSTest` | PROCEDURE |
| `dbo.usp_SearchVendors` | PROCEDURE |
| `dbo.usp_SetBidItemAIData` | PROCEDURE |
| `dbo.usp_SetItemAIData` | PROCEDURE |
| `dbo.usp_SetPricing` | PROCEDURE |
| `dbo.usp_SetPricing_SearchDataDB` | PROCEDURE |
| `dbo.usp_ShowItemURLs` | PROCEDURE |
| `dbo.usp_StartPOSend` | PROCEDURE |
| `dbo.usp_StoreImage` | PROCEDURE |
| `dbo.usp_StoreImageDone` | PROCEDURE |
| `dbo.usp_StoreImageError` | PROCEDURE |
| `dbo.usp_StoreVendorOrder` | PROCEDURE |
| `dbo.usp_TransactionLogMover` | PROCEDURE |
| `dbo.usp_UpdateBudgets` | PROCEDURE |
| `dbo.usp_UpdatePONextNumber` | PROCEDURE |
| `dbo.usp_UpdatePONumbers` | PROCEDURE |
| `dbo.usp_validateRequisitionStatuses` | PROCEDURE |
| `dbo.usp_VendorStatsCYvsLY` | PROCEDURE |
| `dbo.usp_WaitingTasks` | PROCEDURE |
| `dbo.x_TestErrorHandling` | PROCEDURE |

## `EDS_TEST_Old`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`archive.allitems`](tables/EDS_TEST_Old/archive.allitems.md) | 0 |
| [`archive.Approvals`](tables/EDS_TEST_Old/archive.Approvals.md) | 3517361 |
| [`archive.ApprovalsHistory`](tables/EDS_TEST_Old/archive.ApprovalsHistory.md) | 447389 |
| [`archive.Awards`](tables/EDS_TEST_Old/archive.Awards.md) | 143977 |
| [`archive.BatchDetail`](tables/EDS_TEST_Old/archive.BatchDetail.md) | 4060286 |
| [`archive.BidHeaderCheckList`](tables/EDS_TEST_Old/archive.BidHeaderCheckList.md) | 4521 |
| [`archive.BidHeaderDetail`](tables/EDS_TEST_Old/archive.BidHeaderDetail.md) | 26252593 |
| [`archive.BidHeaderDocument`](tables/EDS_TEST_Old/archive.BidHeaderDocument.md) | 11787 |
| [`archive.BidHeaderDocuments`](tables/EDS_TEST_Old/archive.BidHeaderDocuments.md) | 0 |
| [`archive.BidHeaders`](tables/EDS_TEST_Old/archive.BidHeaders.md) | 3395 |
| [`archive.BidImports`](tables/EDS_TEST_Old/archive.BidImports.md) | 42011 |
| [`archive.BidMappedItems`](tables/EDS_TEST_Old/archive.BidMappedItems.md) | 0 |
| [`archive.BidMSRPResults`](tables/EDS_TEST_Old/archive.BidMSRPResults.md) | 10848 |
| [`archive.BidReawards`](tables/EDS_TEST_Old/archive.BidReawards.md) | 0 |
| [`archive.BidRequestItems`](tables/EDS_TEST_Old/archive.BidRequestItems.md) | 5704577 |
| [`archive.BidRequestManufacturer`](tables/EDS_TEST_Old/archive.BidRequestManufacturer.md) | 0 |
| [`archive.BidRequestOptions`](tables/EDS_TEST_Old/archive.BidRequestOptions.md) | 0 |
| [`archive.BidRequestPriceRanges`](tables/EDS_TEST_Old/archive.BidRequestPriceRanges.md) | 0 |
| [`archive.BidResults`](tables/EDS_TEST_Old/archive.BidResults.md) | 30585282 |
| [`archive.Bids`](tables/EDS_TEST_Old/archive.Bids.md) | 172256 |
| [`archive.BidTrades`](tables/EDS_TEST_Old/archive.BidTrades.md) | 119 |
| [`archive.Catalog`](tables/EDS_TEST_Old/archive.Catalog.md) | 2422 |
| [`archive.cxmlSession`](tables/EDS_TEST_Old/archive.cxmlSession.md) | 50022 |
| [`archive.Detail`](tables/EDS_TEST_Old/archive.Detail.md) | 25480018 |
| [`archive.DetailHold`](tables/EDS_TEST_Old/archive.DetailHold.md) | 0 |
| [`archive.DetailMatch`](tables/EDS_TEST_Old/archive.DetailMatch.md) | 1499 |
| [`archive.DMSBidDocuments`](tables/EDS_TEST_Old/archive.DMSBidDocuments.md) | 0 |
| [`archive.DMSVendorBidDocuments`](tables/EDS_TEST_Old/archive.DMSVendorBidDocuments.md) | 0 |
| [`archive.FreezeItems`](tables/EDS_TEST_Old/archive.FreezeItems.md) | 0 |
| [`archive.ItemContractPrices`](tables/EDS_TEST_Old/archive.ItemContractPrices.md) | 0 |
| [`archive.OrderBooks`](tables/EDS_TEST_Old/archive.OrderBooks.md) | 692 |
| [`archive.PO`](tables/EDS_TEST_Old/archive.PO.md) | 1300617 |
| [`archive.PODetailItems`](tables/EDS_TEST_Old/archive.PODetailItems.md) | 22905929 |
| [`archive.POTempDetails`](tables/EDS_TEST_Old/archive.POTempDetails.md) | 0 |
| [`archive.Prices`](tables/EDS_TEST_Old/archive.Prices.md) | 0 |
| [`archive.PricingConsolidatedOrderCounts`](tables/EDS_TEST_Old/archive.PricingConsolidatedOrderCounts.md) | 0 |
| [`archive.PricingMap`](tables/EDS_TEST_Old/archive.PricingMap.md) | 0 |
| [`archive.PricingUpdate`](tables/EDS_TEST_Old/archive.PricingUpdate.md) | 0 |
| [`archive.RequisitionChangeLog`](tables/EDS_TEST_Old/archive.RequisitionChangeLog.md) | 1936897 |
| [`archive.Requisitions`](tables/EDS_TEST_Old/archive.Requisitions.md) | 1433904 |
| [`archive.TMAwards`](tables/EDS_TEST_Old/archive.TMAwards.md) | 29335 |
| [`archive.UserAccounts`](tables/EDS_TEST_Old/archive.UserAccounts.md) | 2704140 |
| [`archive.UserAccountsUserAccountId_CrossMapping`](tables/EDS_TEST_Old/archive.UserAccountsUserAccountId_CrossMapping.md) | 2704140 |
| [`archive.VendorDocRequest`](tables/EDS_TEST_Old/archive.VendorDocRequest.md) | 0 |
| [`archive.VendorDocRequestDetail`](tables/EDS_TEST_Old/archive.VendorDocRequestDetail.md) | 0 |
| [`archive.VendorQuery`](tables/EDS_TEST_Old/archive.VendorQuery.md) | 4057 |
| [`archive.VendorQueryDetail`](tables/EDS_TEST_Old/archive.VendorQueryDetail.md) | 39321 |
| [`archive.VendorQueryMSRP`](tables/EDS_TEST_Old/archive.VendorQueryMSRP.md) | 0 |
| [`archive.VendorQueryMSRPDetail`](tables/EDS_TEST_Old/archive.VendorQueryMSRPDetail.md) | 0 |
| [`archive.VendorQueryTandM`](tables/EDS_TEST_Old/archive.VendorQueryTandM.md) | 7 |
| [`archive.VendorQueryTandMDetail`](tables/EDS_TEST_Old/archive.VendorQueryTandMDetail.md) | 0 |
| [`dbo.AccountingDetail`](tables/EDS_TEST_Old/dbo.AccountingDetail.md) | 0 |
| [`dbo.AccountingFormats`](tables/EDS_TEST_Old/dbo.AccountingFormats.md) | 49 |
| [`dbo.AccountingUserFields`](tables/EDS_TEST_Old/dbo.AccountingUserFields.md) | 80 |
| [`dbo.AccountSeparators`](tables/EDS_TEST_Old/dbo.AccountSeparators.md) | 0 |
| [`dbo.AddendumItems`](tables/EDS_TEST_Old/dbo.AddendumItems.md) | 0 |
| [`dbo.additems`](tables/EDS_TEST_Old/dbo.additems.md) | 0 |
| [`dbo.Alerts`](tables/EDS_TEST_Old/dbo.Alerts.md) | 3 |
| [`dbo.allitems`](tables/EDS_TEST_Old/dbo.allitems.md) | 6276768 |
| [`dbo.AnswerTypes`](tables/EDS_TEST_Old/dbo.AnswerTypes.md) | 0 |
| [`dbo.ApprovalLevels`](tables/EDS_TEST_Old/dbo.ApprovalLevels.md) | 9 |
| [`dbo.Approvals`](tables/EDS_TEST_Old/dbo.Approvals.md) | 7799409 |
| [`dbo.ApprovalsHistory`](tables/EDS_TEST_Old/dbo.ApprovalsHistory.md) | 331411 |
| [`dbo.Audit`](tables/EDS_TEST_Old/dbo.Audit.md) | 2568656 |
| [`dbo.Awardings`](tables/EDS_TEST_Old/dbo.Awardings.md) | 10611 |
| [`dbo.Awards`](tables/EDS_TEST_Old/dbo.Awards.md) | 132982 |
| [`dbo.AwardsCatalogList`](tables/EDS_TEST_Old/dbo.AwardsCatalogList.md) | 80845 |
| [`dbo.AwardTypes`](tables/EDS_TEST_Old/dbo.AwardTypes.md) | 2 |
| [`dbo.BatchBook`](tables/EDS_TEST_Old/dbo.BatchBook.md) | 217611 |
| [`dbo.BatchDetail`](tables/EDS_TEST_Old/dbo.BatchDetail.md) | 5020036 |
| [`dbo.BatchDetailInserts`](tables/EDS_TEST_Old/dbo.BatchDetailInserts.md) | 1176 |
| [`dbo.Batches`](tables/EDS_TEST_Old/dbo.Batches.md) | 14507 |
| [`dbo.BidCalendar`](tables/EDS_TEST_Old/dbo.BidCalendar.md) | 1 |
| [`dbo.BidderCheckList`](tables/EDS_TEST_Old/dbo.BidderCheckList.md) | 138 |
| [`dbo.BidderCheckListPkgDetail`](tables/EDS_TEST_Old/dbo.BidderCheckListPkgDetail.md) | 1193 |
| [`dbo.BidderCheckListPkgHeader`](tables/EDS_TEST_Old/dbo.BidderCheckListPkgHeader.md) | 56 |
| [`dbo.BidDocument`](tables/EDS_TEST_Old/dbo.BidDocument.md) | 10511 |
| [`dbo.BidDocumentTypes`](tables/EDS_TEST_Old/dbo.BidDocumentTypes.md) | 298 |
| [`dbo.BidHeaderCheckList`](tables/EDS_TEST_Old/dbo.BidHeaderCheckList.md) | 108817 |
| [`dbo.BidHeaderDetail`](tables/EDS_TEST_Old/dbo.BidHeaderDetail.md) | 120598977 |
| [`dbo.BidHeaderDetail_Orig`](tables/EDS_TEST_Old/dbo.BidHeaderDetail_Orig.md) | 102658927 |
| [`dbo.BidHeaderDocument`](tables/EDS_TEST_Old/dbo.BidHeaderDocument.md) | 158538 |
| [`dbo.BidHeaderDocuments`](tables/EDS_TEST_Old/dbo.BidHeaderDocuments.md) | 1 |
| [`dbo.BidImportCatalogList`](tables/EDS_TEST_Old/dbo.BidImportCatalogList.md) | 32314 |
| [`dbo.BidImportCounties`](tables/EDS_TEST_Old/dbo.BidImportCounties.md) | 63063 |
| [`dbo.BidImports`](tables/EDS_TEST_Old/dbo.BidImports.md) | 53879 |
| [`dbo.BidItems`](tables/EDS_TEST_Old/dbo.BidItems.md) | 26375605 |
| [`dbo.BidManagers`](tables/EDS_TEST_Old/dbo.BidManagers.md) | 0 |
| [`dbo.BidManufacturers`](tables/EDS_TEST_Old/dbo.BidManufacturers.md) | 246450 |
| [`dbo.BidMappedItems`](tables/EDS_TEST_Old/dbo.BidMappedItems.md) | 1458517 |
| [`dbo.BidMgrConfiguration`](tables/EDS_TEST_Old/dbo.BidMgrConfiguration.md) | 1 |
| [`dbo.BidMgrTagFile`](tables/EDS_TEST_Old/dbo.BidMgrTagFile.md) | 4177029 |
| [`dbo.BidMSRPResultPrices`](tables/EDS_TEST_Old/dbo.BidMSRPResultPrices.md) | 389934 |
| [`dbo.BidMSRPResults`](tables/EDS_TEST_Old/dbo.BidMSRPResults.md) | 38615 |
| [`dbo.BidMSRPResultsProductLines`](tables/EDS_TEST_Old/dbo.BidMSRPResultsProductLines.md) | 102262 |
| [`dbo.BidPackage`](tables/EDS_TEST_Old/dbo.BidPackage.md) | 50 |
| [`dbo.BidPackageDocument`](tables/EDS_TEST_Old/dbo.BidPackageDocument.md) | 1430 |
| [`dbo.BidProductLinePrices`](tables/EDS_TEST_Old/dbo.BidProductLinePrices.md) | 1231550 |
| [`dbo.BidProductLines`](tables/EDS_TEST_Old/dbo.BidProductLines.md) | 265903 |
| [`dbo.BidReawards`](tables/EDS_TEST_Old/dbo.BidReawards.md) | 524 |
| [`dbo.BidRequestItemMergeActions`](tables/EDS_TEST_Old/dbo.BidRequestItemMergeActions.md) | 36542 |
| [`dbo.BidRequestItemMergeActions_Orig`](tables/EDS_TEST_Old/dbo.BidRequestItemMergeActions_Orig.md) | 27168 |
| [`dbo.BidRequestItemMergeActions_Saved_101521`](tables/EDS_TEST_Old/dbo.BidRequestItemMergeActions_Saved_101521.md) | 27298 |
| [`dbo.BidRequestItems`](tables/EDS_TEST_Old/dbo.BidRequestItems.md) | 27376064 |
| [`dbo.BidRequestItems_Orig`](tables/EDS_TEST_Old/dbo.BidRequestItems_Orig.md) | 25521585 |
| [`dbo.BidRequestOptions`](tables/EDS_TEST_Old/dbo.BidRequestOptions.md) | 419805 |
| [`dbo.BidRequestPriceRanges`](tables/EDS_TEST_Old/dbo.BidRequestPriceRanges.md) | 1888322 |
| [`dbo.BidRequestProductLines`](tables/EDS_TEST_Old/dbo.BidRequestProductLines.md) | 174760 |
| [`dbo.BidResponses`](tables/EDS_TEST_Old/dbo.BidResponses.md) | 1 |
| [`dbo.BidResultChanges`](tables/EDS_TEST_Old/dbo.BidResultChanges.md) | 18229521 |
| [`dbo.BidResults`](tables/EDS_TEST_Old/dbo.BidResults.md) | 32321954 |
| [`dbo.BidResults_Orig`](tables/EDS_TEST_Old/dbo.BidResults_Orig.md) | 55592743 |
| [`dbo.BidResultsChangeLog`](tables/EDS_TEST_Old/dbo.BidResultsChangeLog.md) | 238978 |
| [`dbo.Bids`](tables/EDS_TEST_Old/dbo.Bids.md) | 140662 |
| [`dbo.BidsCatalogList`](tables/EDS_TEST_Old/dbo.BidsCatalogList.md) | 81010 |
| [`dbo.BidTradeCounties`](tables/EDS_TEST_Old/dbo.BidTradeCounties.md) | 40367 |
| [`dbo.BidTypes`](tables/EDS_TEST_Old/dbo.BidTypes.md) | 2 |
| [`dbo.BookTypes`](tables/EDS_TEST_Old/dbo.BookTypes.md) | 4 |
| [`dbo.CalDistricts`](tables/EDS_TEST_Old/dbo.CalDistricts.md) | 0 |
| [`dbo.CalendarDates`](tables/EDS_TEST_Old/dbo.CalendarDates.md) | 2152 |
| [`dbo.CalendarIB`](tables/EDS_TEST_Old/dbo.CalendarIB.md) | 640 |
| [`dbo.CalendarItems`](tables/EDS_TEST_Old/dbo.CalendarItems.md) | 0 |
| [`dbo.Calendars`](tables/EDS_TEST_Old/dbo.Calendars.md) | 282 |
| [`dbo.CalendarTypes`](tables/EDS_TEST_Old/dbo.CalendarTypes.md) | 2 |
| [`dbo.Carolina Living Items`](tables/EDS_TEST_Old/dbo.Carolina_Living_Items.md) | 2017 |
| [`dbo.CatalogImportFields`](tables/EDS_TEST_Old/dbo.CatalogImportFields.md) | 15 |
| [`dbo.CatalogImportMap`](tables/EDS_TEST_Old/dbo.CatalogImportMap.md) | 0 |
| [`dbo.CatalogPricing`](tables/EDS_TEST_Old/dbo.CatalogPricing.md) | 0 |
| [`dbo.CatalogText`](tables/EDS_TEST_Old/dbo.CatalogText.md) | 112799 |
| [`dbo.CatalogTextParts`](tables/EDS_TEST_Old/dbo.CatalogTextParts.md) | 17179537 |
| [`dbo.CatList`](tables/EDS_TEST_Old/dbo.CatList.md) | 155059 |
| [`dbo.CertificateAuthority`](tables/EDS_TEST_Old/dbo.CertificateAuthority.md) | 1 |
| [`dbo.ChargeTypes`](tables/EDS_TEST_Old/dbo.ChargeTypes.md) | 14 |
| [`dbo.CommonMSRPVendorQuery`](tables/EDS_TEST_Old/dbo.CommonMSRPVendorQuery.md) | 4 |
| [`dbo.CommonTandMVendorQuery`](tables/EDS_TEST_Old/dbo.CommonTandMVendorQuery.md) | 22 |
| [`dbo.CommonVendorQuery`](tables/EDS_TEST_Old/dbo.CommonVendorQuery.md) | 43 |
| [`dbo.CommonVendorQueryAnswer`](tables/EDS_TEST_Old/dbo.CommonVendorQueryAnswer.md) | 0 |
| [`dbo.ContractTypes`](tables/EDS_TEST_Old/dbo.ContractTypes.md) | 0 |
| [`dbo.Control`](tables/EDS_TEST_Old/dbo.Control.md) | 1 |
| [`dbo.Coops`](tables/EDS_TEST_Old/dbo.Coops.md) | 20 |
| [`dbo.CopyRequests`](tables/EDS_TEST_Old/dbo.CopyRequests.md) | 23265 |
| [`dbo.Counties`](tables/EDS_TEST_Old/dbo.Counties.md) | 78 |
| [`dbo.CoverView`](tables/EDS_TEST_Old/dbo.CoverView.md) | 0 |
| [`dbo.CrossRefs`](tables/EDS_TEST_Old/dbo.CrossRefs.md) | 142860557 |
| [`dbo.CSCommands`](tables/EDS_TEST_Old/dbo.CSCommands.md) | 16 |
| [`dbo.CSMessageFiles`](tables/EDS_TEST_Old/dbo.CSMessageFiles.md) | 0 |
| [`dbo.CSMessages`](tables/EDS_TEST_Old/dbo.CSMessages.md) | 11520 |
| [`dbo.CSRep`](tables/EDS_TEST_Old/dbo.CSRep.md) | 45 |
| [`dbo.CXmlSession`](tables/EDS_TEST_Old/dbo.CXmlSession.md) | 63906 |
| [`dbo.dchtest`](tables/EDS_TEST_Old/dbo.dchtest.md) | 1192 |
| [`dbo.DebugMsgs`](tables/EDS_TEST_Old/dbo.DebugMsgs.md) | 20103449 |
| [`dbo.DebugMsgs_Orig`](tables/EDS_TEST_Old/dbo.DebugMsgs_Orig.md) | 5211696 |
| [`dbo.DetailChangeLog`](tables/EDS_TEST_Old/dbo.DetailChangeLog.md) | 2924940 |
| [`dbo.DetailChanges`](tables/EDS_TEST_Old/dbo.DetailChanges.md) | 26502061 |
| [`dbo.DetailHold`](tables/EDS_TEST_Old/dbo.DetailHold.md) | 1 |
| [`dbo.DetailMatch`](tables/EDS_TEST_Old/dbo.DetailMatch.md) | 103534 |
| [`dbo.DetailNotifications`](tables/EDS_TEST_Old/dbo.DetailNotifications.md) | 2552114 |
| [`dbo.DetailUploads`](tables/EDS_TEST_Old/dbo.DetailUploads.md) | 0 |
| [`dbo.DistrictCategories`](tables/EDS_TEST_Old/dbo.DistrictCategories.md) | 124493 |
| [`dbo.DistrictCategoryTitles`](tables/EDS_TEST_Old/dbo.DistrictCategoryTitles.md) | 0 |
| [`dbo.DistrictCharges`](tables/EDS_TEST_Old/dbo.DistrictCharges.md) | 20788 |
| [`dbo.DistrictChargesNotes`](tables/EDS_TEST_Old/dbo.DistrictChargesNotes.md) | 0 |
| [`dbo.DistrictContacts`](tables/EDS_TEST_Old/dbo.DistrictContacts.md) | 3792 |
| [`dbo.DistrictContactTypes`](tables/EDS_TEST_Old/dbo.DistrictContactTypes.md) | 7 |
| [`dbo.DistrictContinuances`](tables/EDS_TEST_Old/dbo.DistrictContinuances.md) | 13398 |
| [`dbo.DistrictNotes`](tables/EDS_TEST_Old/dbo.DistrictNotes.md) | 75 |
| [`dbo.DistrictNotifications`](tables/EDS_TEST_Old/dbo.DistrictNotifications.md) | 6015 |
| [`dbo.DistrictProposedCharges`](tables/EDS_TEST_Old/dbo.DistrictProposedCharges.md) | 10309 |
| [`dbo.DistrictReports`](tables/EDS_TEST_Old/dbo.DistrictReports.md) | 11 |
| [`dbo.DistrictTypes`](tables/EDS_TEST_Old/dbo.DistrictTypes.md) | 6 |
| [`dbo.DMSBidDocuments`](tables/EDS_TEST_Old/dbo.DMSBidDocuments.md) | 28030 |
| [`dbo.DMSSDSDocuments`](tables/EDS_TEST_Old/dbo.DMSSDSDocuments.md) | 602 |
| [`dbo.DMSVendorBidDocuments`](tables/EDS_TEST_Old/dbo.DMSVendorBidDocuments.md) | 719827 |
| [`dbo.DMSVendorDocuments`](tables/EDS_TEST_Old/dbo.DMSVendorDocuments.md) | 6485 |
| [`dbo.EmailBlast`](tables/EDS_TEST_Old/dbo.EmailBlast.md) | 16144 |
| [`dbo.EmailBlastAddresses08132012`](tables/EDS_TEST_Old/dbo.EmailBlastAddresses08132012.md) | 271 |
| [`dbo.EmailBlastCopy`](tables/EDS_TEST_Old/dbo.EmailBlastCopy.md) | 3 |
| [`dbo.EmailBlastLog`](tables/EDS_TEST_Old/dbo.EmailBlastLog.md) | 1403672 |
| [`dbo.FreezeItems`](tables/EDS_TEST_Old/dbo.FreezeItems.md) | 15435 |
| [`dbo.FreezeItems2015`](tables/EDS_TEST_Old/dbo.FreezeItems2015.md) | 102337 |
| [`dbo.HeaderWorkItems`](tables/EDS_TEST_Old/dbo.HeaderWorkItems.md) | 491824 |
| [`dbo.Headings`](tables/EDS_TEST_Old/dbo.Headings.md) | 164214 |
| [`dbo.HolidayCalendar`](tables/EDS_TEST_Old/dbo.HolidayCalendar.md) | 29 |
| [`dbo.HolidayCalendarVendor`](tables/EDS_TEST_Old/dbo.HolidayCalendarVendor.md) | 7 |
| [`dbo.ImageErrors`](tables/EDS_TEST_Old/dbo.ImageErrors.md) | 26727 |
| [`dbo.ImageLog`](tables/EDS_TEST_Old/dbo.ImageLog.md) | 1788706 |
| [`dbo.Images`](tables/EDS_TEST_Old/dbo.Images.md) | 1736177 |
| [`dbo.ImportCatalogDetail`](tables/EDS_TEST_Old/dbo.ImportCatalogDetail.md) | 17290 |
| [`dbo.ImportCatalogHeader`](tables/EDS_TEST_Old/dbo.ImportCatalogHeader.md) | 2761 |
| [`dbo.ImportDetail`](tables/EDS_TEST_Old/dbo.ImportDetail.md) | 882935 |
| [`dbo.ImportMessages`](tables/EDS_TEST_Old/dbo.ImportMessages.md) | 5500 |
| [`dbo.ImportProcesses`](tables/EDS_TEST_Old/dbo.ImportProcesses.md) | 754 |
| [`dbo.Imports`](tables/EDS_TEST_Old/dbo.Imports.md) | 301 |
| [`dbo.InstructionBookContents`](tables/EDS_TEST_Old/dbo.InstructionBookContents.md) | 31 |
| [`dbo.InstructionBookTypes`](tables/EDS_TEST_Old/dbo.InstructionBookTypes.md) | 6 |
| [`dbo.Instructions`](tables/EDS_TEST_Old/dbo.Instructions.md) | 7 |
| [`dbo.Invoices`](tables/EDS_TEST_Old/dbo.Invoices.md) | 0 |
| [`dbo.InvoiceTypes`](tables/EDS_TEST_Old/dbo.InvoiceTypes.md) | 0 |
| [`dbo.IPQueue`](tables/EDS_TEST_Old/dbo.IPQueue.md) | 5038 |
| [`dbo.IPQueueUsers`](tables/EDS_TEST_Old/dbo.IPQueueUsers.md) | 489217 |
| [`dbo.ItemContractPrices`](tables/EDS_TEST_Old/dbo.ItemContractPrices.md) | 0 |
| [`dbo.ItemDocuments`](tables/EDS_TEST_Old/dbo.ItemDocuments.md) | 0 |
| [`dbo.Items`](tables/EDS_TEST_Old/dbo.Items.md) | 28911629 |
| [`dbo.ItemUpdates`](tables/EDS_TEST_Old/dbo.ItemUpdates.md) | 198886 |
| [`dbo.jSessions`](tables/EDS_TEST_Old/dbo.jSessions.md) | 0 |
| [`dbo.Keywords`](tables/EDS_TEST_Old/dbo.Keywords.md) | 25261 |
| [`dbo.Ledger`](tables/EDS_TEST_Old/dbo.Ledger.md) | 0 |
| [`dbo.LL_RepArea`](tables/EDS_TEST_Old/dbo.LL_RepArea.md) | 0 |
| [`dbo.LL_RepLay`](tables/EDS_TEST_Old/dbo.LL_RepLay.md) | 0 |
| [`dbo.ManufacturerProductLines`](tables/EDS_TEST_Old/dbo.ManufacturerProductLines.md) | 14194 |
| [`dbo.Manufacturers`](tables/EDS_TEST_Old/dbo.Manufacturers.md) | 8920 |
| [`dbo.MappedItems`](tables/EDS_TEST_Old/dbo.MappedItems.md) | 2 |
| [`dbo.Menus`](tables/EDS_TEST_Old/dbo.Menus.md) | 4 |
| [`dbo.Messages`](tables/EDS_TEST_Old/dbo.Messages.md) | 0 |
| [`dbo.Months`](tables/EDS_TEST_Old/dbo.Months.md) | 12 |
| [`dbo.MSRPExcelExport`](tables/EDS_TEST_Old/dbo.MSRPExcelExport.md) | 563 |
| [`dbo.MSRPExcelImport`](tables/EDS_TEST_Old/dbo.MSRPExcelImport.md) | 76315 |
| [`dbo.MSRPOptions`](tables/EDS_TEST_Old/dbo.MSRPOptions.md) | 12 |
| [`dbo.NextNumber`](tables/EDS_TEST_Old/dbo.NextNumber.md) | 24033 |
| [`dbo.NotificationOptions`](tables/EDS_TEST_Old/dbo.NotificationOptions.md) | 4 |
| [`dbo.Notifications`](tables/EDS_TEST_Old/dbo.Notifications.md) | 720 |
| [`dbo.OBPrices`](tables/EDS_TEST_Old/dbo.OBPrices.md) | 0 |
| [`dbo.OBView`](tables/EDS_TEST_Old/dbo.OBView.md) | 0 |
| [`dbo.Options`](tables/EDS_TEST_Old/dbo.Options.md) | 0 |
| [`dbo.OptionsLink`](tables/EDS_TEST_Old/dbo.OptionsLink.md) | 0 |
| [`dbo.OrderBookAlwaysAdd`](tables/EDS_TEST_Old/dbo.OrderBookAlwaysAdd.md) | 9 |
| [`dbo.OrderBookDetail`](tables/EDS_TEST_Old/dbo.OrderBookDetail.md) | 37298143 |
| [`dbo.OrderBookDetailOld`](tables/EDS_TEST_Old/dbo.OrderBookDetailOld.md) | 187630151 |
| [`dbo.OrderBookLog`](tables/EDS_TEST_Old/dbo.OrderBookLog.md) | 474243 |
| [`dbo.OrderBooks`](tables/EDS_TEST_Old/dbo.OrderBooks.md) | 29977 |
| [`dbo.OrderBookTypes`](tables/EDS_TEST_Old/dbo.OrderBookTypes.md) | 12 |
| [`dbo.Payments`](tables/EDS_TEST_Old/dbo.Payments.md) | 0 |
| [`dbo.PaymentTypes`](tables/EDS_TEST_Old/dbo.PaymentTypes.md) | 0 |
| [`dbo.PendingApprovals`](tables/EDS_TEST_Old/dbo.PendingApprovals.md) | 547908 |
| [`dbo.POIDTable`](tables/EDS_TEST_Old/dbo.POIDTable.md) | 0 |
| [`dbo.POLayoutDetail`](tables/EDS_TEST_Old/dbo.POLayoutDetail.md) | 6841 |
| [`dbo.POLayoutFields`](tables/EDS_TEST_Old/dbo.POLayoutFields.md) | 56 |
| [`dbo.POLayouts`](tables/EDS_TEST_Old/dbo.POLayouts.md) | 631 |
| [`dbo.POPageSummary`](tables/EDS_TEST_Old/dbo.POPageSummary.md) | 73456 |
| [`dbo.POPrintTaggedPOFile`](tables/EDS_TEST_Old/dbo.POPrintTaggedPOFile.md) | 120966 |
| [`dbo.POQueue`](tables/EDS_TEST_Old/dbo.POQueue.md) | 26436 |
| [`dbo.POQueueItems`](tables/EDS_TEST_Old/dbo.POQueueItems.md) | 397406 |
| [`dbo.POStatus`](tables/EDS_TEST_Old/dbo.POStatus.md) | 405189 |
| [`dbo.POStatusTable`](tables/EDS_TEST_Old/dbo.POStatusTable.md) | 0 |
| [`dbo.PostCatalogDetail`](tables/EDS_TEST_Old/dbo.PostCatalogDetail.md) | 38343 |
| [`dbo.PostCatalogHeader`](tables/EDS_TEST_Old/dbo.PostCatalogHeader.md) | 3264 |
| [`dbo.POTemp`](tables/EDS_TEST_Old/dbo.POTemp.md) | 37 |
| [`dbo.POTempDetails`](tables/EDS_TEST_Old/dbo.POTempDetails.md) | 4014 |
| [`dbo.PPCatalogs`](tables/EDS_TEST_Old/dbo.PPCatalogs.md) | 1662 |
| [`dbo.PPCategory`](tables/EDS_TEST_Old/dbo.PPCategory.md) | 1455 |
| [`dbo.PriceHolds`](tables/EDS_TEST_Old/dbo.PriceHolds.md) | 0 |
| [`dbo.PriceListTypes`](tables/EDS_TEST_Old/dbo.PriceListTypes.md) | 2 |
| [`dbo.PriceRanges`](tables/EDS_TEST_Old/dbo.PriceRanges.md) | 120619 |
| [`dbo.PricingAddenda`](tables/EDS_TEST_Old/dbo.PricingAddenda.md) | 203569 |
| [`dbo.PricingConsolidatedOrderCounts`](tables/EDS_TEST_Old/dbo.PricingConsolidatedOrderCounts.md) | 401387 |
| [`dbo.PricingMap`](tables/EDS_TEST_Old/dbo.PricingMap.md) | 0 |
| [`dbo.PricingUpdate`](tables/EDS_TEST_Old/dbo.PricingUpdate.md) | 59327 |
| [`dbo.PrintDocuments`](tables/EDS_TEST_Old/dbo.PrintDocuments.md) | 0 |
| [`dbo.Printers`](tables/EDS_TEST_Old/dbo.Printers.md) | 15 |
| [`dbo.Printers_copy1`](tables/EDS_TEST_Old/dbo.Printers_copy1.md) | 15 |
| [`dbo.ProductVerificationResults`](tables/EDS_TEST_Old/dbo.ProductVerificationResults.md) | 0 |
| [`dbo.ProjectTasks`](tables/EDS_TEST_Old/dbo.ProjectTasks.md) | 14 |
| [`dbo.QuestionnaireResponses`](tables/EDS_TEST_Old/dbo.QuestionnaireResponses.md) | 0 |
| [`dbo.Rates`](tables/EDS_TEST_Old/dbo.Rates.md) | 0 |
| [`dbo.RateTypes`](tables/EDS_TEST_Old/dbo.RateTypes.md) | 0 |
| [`dbo.RateUnits`](tables/EDS_TEST_Old/dbo.RateUnits.md) | 0 |
| [`dbo.Receiving`](tables/EDS_TEST_Old/dbo.Receiving.md) | 0 |
| [`dbo.ReportSession`](tables/EDS_TEST_Old/dbo.ReportSession.md) | 5226631 |
| [`dbo.ReportSessionLinks`](tables/EDS_TEST_Old/dbo.ReportSessionLinks.md) | 51849818 |
| [`dbo.ReqAudit`](tables/EDS_TEST_Old/dbo.ReqAudit.md) | 0 |
| [`dbo.RequisitionChangeLog`](tables/EDS_TEST_Old/dbo.RequisitionChangeLog.md) | 1938485 |
| [`dbo.RequisitionNoteEmails`](tables/EDS_TEST_Old/dbo.RequisitionNoteEmails.md) | 16010 |
| [`dbo.RequisitionNotes`](tables/EDS_TEST_Old/dbo.RequisitionNotes.md) | 24528 |
| [`dbo.ResetPasswordTracking`](tables/EDS_TEST_Old/dbo.ResetPasswordTracking.md) | 80394 |
| [`dbo.Rights`](tables/EDS_TEST_Old/dbo.Rights.md) | 0 |
| [`dbo.RightsLink`](tables/EDS_TEST_Old/dbo.RightsLink.md) | 0 |
| [`dbo.RTK_2010NJHSL`](tables/EDS_TEST_Old/dbo.RTK_2010NJHSL.md) | 3322 |
| [`dbo.RTK_CASFile`](tables/EDS_TEST_Old/dbo.RTK_CASFile.md) | 7881 |
| [`dbo.RTK_ContainerCodes`](tables/EDS_TEST_Old/dbo.RTK_ContainerCodes.md) | 21 |
| [`dbo.RTK_Documents`](tables/EDS_TEST_Old/dbo.RTK_Documents.md) | 0 |
| [`dbo.RTK_FactSheets`](tables/EDS_TEST_Old/dbo.RTK_FactSheets.md) | 2459 |
| [`dbo.RTK_HealthHazardCodes`](tables/EDS_TEST_Old/dbo.RTK_HealthHazardCodes.md) | 9 |
| [`dbo.RTK_Inventories`](tables/EDS_TEST_Old/dbo.RTK_Inventories.md) | 658 |
| [`dbo.RTK_InventoryRangeCodes`](tables/EDS_TEST_Old/dbo.RTK_InventoryRangeCodes.md) | 12 |
| [`dbo.RTK_Items`](tables/EDS_TEST_Old/dbo.RTK_Items.md) | 64627 |
| [`dbo.RTK_LegacyDistrictCodesMap`](tables/EDS_TEST_Old/dbo.RTK_LegacyDistrictCodesMap.md) | 78 |
| [`dbo.RTK_LegacySchoolFile`](tables/EDS_TEST_Old/dbo.RTK_LegacySchoolFile.md) | 6766 |
| [`dbo.RTK_MixtureCodes`](tables/EDS_TEST_Old/dbo.RTK_MixtureCodes.md) | 11 |
| [`dbo.RTK_MSDSDetail`](tables/EDS_TEST_Old/dbo.RTK_MSDSDetail.md) | 151665 |
| [`dbo.RTK_Purposes`](tables/EDS_TEST_Old/dbo.RTK_Purposes.md) | 35 |
| [`dbo.RTK_ReportItems`](tables/EDS_TEST_Old/dbo.RTK_ReportItems.md) | 1006046 |
| [`dbo.RTK_Sites`](tables/EDS_TEST_Old/dbo.RTK_Sites.md) | 823 |
| [`dbo.RTK_Surveys`](tables/EDS_TEST_Old/dbo.RTK_Surveys.md) | 0 |
| [`dbo.RTK_Training`](tables/EDS_TEST_Old/dbo.RTK_Training.md) | 0 |
| [`dbo.RTK_UOMCodes`](tables/EDS_TEST_Old/dbo.RTK_UOMCodes.md) | 3 |
| [`dbo.RTK_VendorLinks`](tables/EDS_TEST_Old/dbo.RTK_VendorLinks.md) | 0 |
| [`dbo.SafetyDataSheets`](tables/EDS_TEST_Old/dbo.SafetyDataSheets.md) | 97183 |
| [`dbo.Salutations`](tables/EDS_TEST_Old/dbo.Salutations.md) | 5 |
| [`dbo.SaxDups`](tables/EDS_TEST_Old/dbo.SaxDups.md) | 31171 |
| [`dbo.SaxNotifications`](tables/EDS_TEST_Old/dbo.SaxNotifications.md) | 78 |
| [`dbo.ScanEvents`](tables/EDS_TEST_Old/dbo.ScanEvents.md) | 383626 |
| [`dbo.ScanJobs`](tables/EDS_TEST_Old/dbo.ScanJobs.md) | 3 |
| [`dbo.ScannerZones`](tables/EDS_TEST_Old/dbo.ScannerZones.md) | 10 |
| [`dbo.ScheduledTask`](tables/EDS_TEST_Old/dbo.ScheduledTask.md) | 12 |
| [`dbo.ScheduleTypes`](tables/EDS_TEST_Old/dbo.ScheduleTypes.md) | 10 |
| [`dbo.SDS_Rpt_Bridge`](tables/EDS_TEST_Old/dbo.SDS_Rpt_Bridge.md) | 104 |
| [`dbo.SDSDocs`](tables/EDS_TEST_Old/dbo.SDSDocs.md) | 161387 |
| [`dbo.SDSErrors`](tables/EDS_TEST_Old/dbo.SDSErrors.md) | 0 |
| [`dbo.SDSLog`](tables/EDS_TEST_Old/dbo.SDSLog.md) | 0 |
| [`dbo.SDSResults`](tables/EDS_TEST_Old/dbo.SDSResults.md) | 116893 |
| [`dbo.SDSs`](tables/EDS_TEST_Old/dbo.SDSs.md) | 0 |
| [`dbo.SDSSyncStatus`](tables/EDS_TEST_Old/dbo.SDSSyncStatus.md) | 26483 |
| [`dbo.SearchKeywords`](tables/EDS_TEST_Old/dbo.SearchKeywords.md) | 0 |
| [`dbo.SearchSets`](tables/EDS_TEST_Old/dbo.SearchSets.md) | 43585 |
| [`dbo.Sections`](tables/EDS_TEST_Old/dbo.Sections.md) | 18 |
| [`dbo.SecurityKeys`](tables/EDS_TEST_Old/dbo.SecurityKeys.md) | 14 |
| [`dbo.SecurityRoleKeys`](tables/EDS_TEST_Old/dbo.SecurityRoleKeys.md) | 66 |
| [`dbo.SecurityRoles`](tables/EDS_TEST_Old/dbo.SecurityRoles.md) | 5 |
| [`dbo.SecurityRoleUsers`](tables/EDS_TEST_Old/dbo.SecurityRoleUsers.md) | 352458 |
| [`dbo.Services`](tables/EDS_TEST_Old/dbo.Services.md) | 0 |
| [`dbo.SessionCmds`](tables/EDS_TEST_Old/dbo.SessionCmds.md) | 0 |
| [`dbo.SessionTable`](tables/EDS_TEST_Old/dbo.SessionTable.md) | 12293285 |
| [`dbo.ShipLocations`](tables/EDS_TEST_Old/dbo.ShipLocations.md) | 6841 |
| [`dbo.ShippingCosts`](tables/EDS_TEST_Old/dbo.ShippingCosts.md) | 929 |
| [`dbo.ShippingRequests`](tables/EDS_TEST_Old/dbo.ShippingRequests.md) | 613 |
| [`dbo.ShippingVendor`](tables/EDS_TEST_Old/dbo.ShippingVendor.md) | 38754 |
| [`dbo.SSOLoginTracking`](tables/EDS_TEST_Old/dbo.SSOLoginTracking.md) | 107543 |
| [`dbo.States`](tables/EDS_TEST_Old/dbo.States.md) | 3 |
| [`dbo.StatusTable`](tables/EDS_TEST_Old/dbo.StatusTable.md) | 53 |
| [`dbo.Sulphite`](tables/EDS_TEST_Old/dbo.Sulphite.md) | 49 |
| [`dbo.SulphiteDetail`](tables/EDS_TEST_Old/dbo.SulphiteDetail.md) | 6280 |
| [`dbo.SulphiteImport`](tables/EDS_TEST_Old/dbo.SulphiteImport.md) | 49 |
| [`dbo.SulphiteUsers`](tables/EDS_TEST_Old/dbo.SulphiteUsers.md) | 1209 |
| [`dbo.Suppression`](tables/EDS_TEST_Old/dbo.Suppression.md) | 4267 |
| [`dbo.sysdiagrams`](tables/EDS_TEST_Old/dbo.sysdiagrams.md) | 9 |
| [`dbo.TableOfContents`](tables/EDS_TEST_Old/dbo.TableOfContents.md) | 0 |
| [`dbo.TagFile_`](tables/EDS_TEST_Old/dbo.TagFile_.md) | 6235 |
| [`dbo.TAGFILEP`](tables/EDS_TEST_Old/dbo.TAGFILEP.md) | 0 |
| [`dbo.TagFilePos_`](tables/EDS_TEST_Old/dbo.TagFilePos_.md) | 2259 |
| [`dbo.TagSet_`](tables/EDS_TEST_Old/dbo.TagSet_.md) | 0 |
| [`dbo.TaskEvent`](tables/EDS_TEST_Old/dbo.TaskEvent.md) | 122103 |
| [`dbo.TaskSchedule`](tables/EDS_TEST_Old/dbo.TaskSchedule.md) | 1544400 |
| [`dbo.TempIrvingtonWincap`](tables/EDS_TEST_Old/dbo.TempIrvingtonWincap.md) | 860 |
| [`dbo.TM_UOM`](tables/EDS_TEST_Old/dbo.TM_UOM.md) | 77 |
| [`dbo.TMAwards`](tables/EDS_TEST_Old/dbo.TMAwards.md) | 88501 |
| [`dbo.TMImport`](tables/EDS_TEST_Old/dbo.TMImport.md) | 3114 |
| [`dbo.TMImport1`](tables/EDS_TEST_Old/dbo.TMImport1.md) | 1885 |
| [`dbo.TMImport2`](tables/EDS_TEST_Old/dbo.TMImport2.md) | 147 |
| [`dbo.TMImport3`](tables/EDS_TEST_Old/dbo.TMImport3.md) | 833 |
| [`dbo.TMImport5`](tables/EDS_TEST_Old/dbo.TMImport5.md) | 2889 |
| [`dbo.TMImport6`](tables/EDS_TEST_Old/dbo.TMImport6.md) | 2134 |
| [`dbo.TmpLog`](tables/EDS_TEST_Old/dbo.TmpLog.md) | 461 |
| [`dbo.TmpTaskSchedule`](tables/EDS_TEST_Old/dbo.TmpTaskSchedule.md) | 4884 |
| [`dbo.TMSurvey`](tables/EDS_TEST_Old/dbo.TMSurvey.md) | 796 |
| [`dbo.TMSurveyNewTrades`](tables/EDS_TEST_Old/dbo.TMSurveyNewTrades.md) | 89 |
| [`dbo.TMSurveyNewVendors`](tables/EDS_TEST_Old/dbo.TMSurveyNewVendors.md) | 186 |
| [`dbo.TMSurveyResults`](tables/EDS_TEST_Old/dbo.TMSurveyResults.md) | 89650 |
| [`dbo.TMVendors`](tables/EDS_TEST_Old/dbo.TMVendors.md) | 16173 |
| [`dbo.TopUOM`](tables/EDS_TEST_Old/dbo.TopUOM.md) | 4579 |
| [`dbo.Trades`](tables/EDS_TEST_Old/dbo.Trades.md) | 107 |
| [`dbo.TransactionLog_HISTORY`](tables/EDS_TEST_Old/dbo.TransactionLog_HISTORY.md) | 99019937 |
| [`dbo.TransactionLogCF`](tables/EDS_TEST_Old/dbo.TransactionLogCF.md) | 27886311 |
| [`dbo.TransactionTypes`](tables/EDS_TEST_Old/dbo.TransactionTypes.md) | 0 |
| [`dbo.TransmitLog`](tables/EDS_TEST_Old/dbo.TransmitLog.md) | 139319 |
| [`dbo.Units`](tables/EDS_TEST_Old/dbo.Units.md) | 11217 |
| [`dbo.UNSPSCs`](tables/EDS_TEST_Old/dbo.UNSPSCs.md) | 50317 |
| [`dbo.UnsubscriptionEmail`](tables/EDS_TEST_Old/dbo.UnsubscriptionEmail.md) | 0 |
| [`dbo.UserAdminLog`](tables/EDS_TEST_Old/dbo.UserAdminLog.md) | 6466 |
| [`dbo.UserCategory`](tables/EDS_TEST_Old/dbo.UserCategory.md) | 0 |
| [`dbo.UserImports`](tables/EDS_TEST_Old/dbo.UserImports.md) | 328 |
| [`dbo.Users`](tables/EDS_TEST_Old/dbo.Users.md) | 336307 |
| [`dbo.UserTrees`](tables/EDS_TEST_Old/dbo.UserTrees.md) | 56920 |
| [`dbo.VendorCatalogNote`](tables/EDS_TEST_Old/dbo.VendorCatalogNote.md) | 11 |
| [`dbo.VendorCategory`](tables/EDS_TEST_Old/dbo.VendorCategory.md) | 6747 |
| [`dbo.VendorCategoryPP`](tables/EDS_TEST_Old/dbo.VendorCategoryPP.md) | 17502 |
| [`dbo.VendorCertificates`](tables/EDS_TEST_Old/dbo.VendorCertificates.md) | 0 |
| [`dbo.VendorContacts`](tables/EDS_TEST_Old/dbo.VendorContacts.md) | 23203 |
| [`dbo.VendorDeliveryRule`](tables/EDS_TEST_Old/dbo.VendorDeliveryRule.md) | 1 |
| [`dbo.VendorDocRequest`](tables/EDS_TEST_Old/dbo.VendorDocRequest.md) | 14 |
| [`dbo.VendorDocRequestDetail`](tables/EDS_TEST_Old/dbo.VendorDocRequestDetail.md) | 52 |
| [`dbo.VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.VendorDocRequestStatus.md) | 14 |
| [`dbo.VendorLocations`](tables/EDS_TEST_Old/dbo.VendorLocations.md) | 0 |
| [`dbo.VendorLogoDisplays`](tables/EDS_TEST_Old/dbo.VendorLogoDisplays.md) | 0 |
| [`dbo.VendorOrders`](tables/EDS_TEST_Old/dbo.VendorOrders.md) | 4206 |
| [`dbo.VendorOverrideMessages`](tables/EDS_TEST_Old/dbo.VendorOverrideMessages.md) | 5 |
| [`dbo.VendorPOtags`](tables/EDS_TEST_Old/dbo.VendorPOtags.md) | 0 |
| [`dbo.VendorQuery`](tables/EDS_TEST_Old/dbo.VendorQuery.md) | 11499 |
| [`dbo.VendorQueryDetail`](tables/EDS_TEST_Old/dbo.VendorQueryDetail.md) | 128763 |
| [`dbo.VendorQueryStatus`](tables/EDS_TEST_Old/dbo.VendorQueryStatus.md) | 30096 |
| [`dbo.VendorSessions`](tables/EDS_TEST_Old/dbo.VendorSessions.md) | 10702 |
| [`dbo.VendorUploads`](tables/EDS_TEST_Old/dbo.VendorUploads.md) | 1532157 |
| [`dbo.VPOLoginAttempts`](tables/EDS_TEST_Old/dbo.VPOLoginAttempts.md) | 0 |
| [`dbo.VPORegistrations`](tables/EDS_TEST_Old/dbo.VPORegistrations.md) | 6 |
| [`dbo.VPOVendorLinks`](tables/EDS_TEST_Old/dbo.VPOVendorLinks.md) | 10 |
| [`dbo.WizHelpFile`](tables/EDS_TEST_Old/dbo.WizHelpFile.md) | 0 |
| [`dbo.YearlyTotals`](tables/EDS_TEST_Old/dbo.YearlyTotals.md) | 9989 |
| [`dbo.z4zbBidFix`](tables/EDS_TEST_Old/dbo.z4zbBidFix.md) | 0 |
| [`dbo.z4zbReqDetail`](tables/EDS_TEST_Old/dbo.z4zbReqDetail.md) | 0 |
| [`EDSIQWebUser.migratorversions`](tables/EDS_TEST_Old/EDSIQWebUser.migratorversions.md) | 0 |
| [`EDSIQWebUser.TableOfContents`](tables/EDS_TEST_Old/EDSIQWebUser.TableOfContents.md) | 6664 |
| [`EDSIQWebUser.UnsubscriptionEmail`](tables/EDS_TEST_Old/EDSIQWebUser.UnsubscriptionEmail.md) | 0 |
| [`EDSWebRpts.REPMAN_GROUPS`](tables/EDS_TEST_Old/EDSWebRpts.REPMAN_GROUPS.md) | 1 |
| [`EDSWebRpts.REPMAN_REPORTS`](tables/EDS_TEST_Old/EDSWebRpts.REPMAN_REPORTS.md) | 1 |

### Leaf views

| View |
|------|
| [`null.MissingCoverView`](tables/EDS_TEST_Old/null.MissingCoverView.md) |
| [`null.OrderBookDetailView`](tables/EDS_TEST_Old/null.OrderBookDetailView.md) |
| [`null.OrderBookView`](tables/EDS_TEST_Old/null.OrderBookView.md) |
| [`null.POAccountList`](tables/EDS_TEST_Old/null.POAccountList.md) |
| [`null.POAccountsUsed`](tables/EDS_TEST_Old/null.POAccountsUsed.md) |
| [`null.ScheduledByPricePlanCategory`](tables/EDS_TEST_Old/null.ScheduledByPricePlanCategory.md) |
| [`null.ScheduledByPricePlanCategoryRep`](tables/EDS_TEST_Old/null.ScheduledByPricePlanCategoryRep.md) |
| [`null.ScheduledDistrictsByPricePlanCategory`](tables/EDS_TEST_Old/null.ScheduledDistrictsByPricePlanCategory.md) |
| [`null.Sessions`](tables/EDS_TEST_Old/null.Sessions.md) |
| [`null.vw_BidsByVendor`](tables/EDS_TEST_Old/null.vw_BidsByVendor.md) |
| [`null.vw_Login`](tables/EDS_TEST_Old/null.vw_Login.md) |
| [`dbo.BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.BidAnalysisDetail.md) |
| [`dbo.BidAnalysisDetailReq`](tables/EDS_TEST_Old/dbo.BidAnalysisDetailReq.md) |
| [`dbo.BidHeadersView`](tables/EDS_TEST_Old/dbo.BidHeadersView.md) |
| [`dbo.BidItemsView`](tables/EDS_TEST_Old/dbo.BidItemsView.md) |
| [`dbo.BidItemView`](tables/EDS_TEST_Old/dbo.BidItemView.md) |
| [`dbo.BidMgrBidRankingMSRPView`](tables/EDS_TEST_Old/dbo.BidMgrBidRankingMSRPView.md) |
| [`dbo.BidMgrBidRequestAndWriteInMSRPView`](tables/EDS_TEST_Old/dbo.BidMgrBidRequestAndWriteInMSRPView.md) |
| [`dbo.BidMgrBidRequestDetail`](tables/EDS_TEST_Old/dbo.BidMgrBidRequestDetail.md) |
| [`dbo.BidMgrBidRequestMSRPView`](tables/EDS_TEST_Old/dbo.BidMgrBidRequestMSRPView.md) |
| [`dbo.BidMgrBidTradeCountiesView`](tables/EDS_TEST_Old/dbo.BidMgrBidTradeCountiesView.md) |
| [`dbo.BidMgrMSRP2ResultsView`](tables/EDS_TEST_Old/dbo.BidMgrMSRP2ResultsView.md) |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](tables/EDS_TEST_Old/dbo.BidMgrMSRP2VendorReportViewTemp.md) |
| [`dbo.BidMgrView`](tables/EDS_TEST_Old/dbo.BidMgrView.md) |
| [`dbo.BidMgrView2`](tables/EDS_TEST_Old/dbo.BidMgrView2.md) |
| [`dbo.BidMgrWeightView`](tables/EDS_TEST_Old/dbo.BidMgrWeightView.md) |
| [`dbo.BidProjectAveragePO`](tables/EDS_TEST_Old/dbo.BidProjectAveragePO.md) |
| [`dbo.BidRequestDetail`](tables/EDS_TEST_Old/dbo.BidRequestDetail.md) |
| [`dbo.BidRequestDetail1`](tables/EDS_TEST_Old/dbo.BidRequestDetail1.md) |
| [`dbo.BidRequestDetail2`](tables/EDS_TEST_Old/dbo.BidRequestDetail2.md) |
| [`dbo.BidRequestItemsCrossRefsView`](tables/EDS_TEST_Old/dbo.BidRequestItemsCrossRefsView.md) |
| [`dbo.BidRequestItemsView`](tables/EDS_TEST_Old/dbo.BidRequestItemsView.md) |
| [`dbo.BidRequestItemsView1`](tables/EDS_TEST_Old/dbo.BidRequestItemsView1.md) |
| [`dbo.BidRequestItemsView1Original`](tables/EDS_TEST_Old/dbo.BidRequestItemsView1Original.md) |
| [`dbo.BidRequestItemsWeightView`](tables/EDS_TEST_Old/dbo.BidRequestItemsWeightView.md) |
| [`dbo.BidResultsView`](tables/EDS_TEST_Old/dbo.BidResultsView.md) |
| [`dbo.BidsView`](tables/EDS_TEST_Old/dbo.BidsView.md) |
| [`dbo.BudgetsView`](tables/EDS_TEST_Old/dbo.BudgetsView.md) |
| [`dbo.cfv_Districts`](tables/EDS_TEST_Old/dbo.cfv_Districts.md) |
| [`dbo.cfv_Schools`](tables/EDS_TEST_Old/dbo.cfv_Schools.md) |
| [`dbo.cfv_Users`](tables/EDS_TEST_Old/dbo.cfv_Users.md) |
| [`dbo.CoverViewNew`](tables/EDS_TEST_Old/dbo.CoverViewNew.md) |
| [`dbo.CoverViewNewSave`](tables/EDS_TEST_Old/dbo.CoverViewNewSave.md) |
| [`dbo.CoverViewNewTest`](tables/EDS_TEST_Old/dbo.CoverViewNewTest.md) |
| [`dbo.CoverViewNewTest1`](tables/EDS_TEST_Old/dbo.CoverViewNewTest1.md) |
| [`dbo.cvw_NJSavings`](tables/EDS_TEST_Old/dbo.cvw_NJSavings.md) |
| [`dbo.cvw_NYSavings`](tables/EDS_TEST_Old/dbo.cvw_NYSavings.md) |
| [`dbo.cvw_Savings`](tables/EDS_TEST_Old/dbo.cvw_Savings.md) |
| [`dbo.DetailView`](tables/EDS_TEST_Old/dbo.DetailView.md) |
| [`dbo.DistrictContactProblemView`](tables/EDS_TEST_Old/dbo.DistrictContactProblemView.md) |
| [`dbo.DistrictUsersView`](tables/EDS_TEST_Old/dbo.DistrictUsersView.md) |
| [`dbo.InstructionBookCalendar`](tables/EDS_TEST_Old/dbo.InstructionBookCalendar.md) |
| [`dbo.InstructionBookView09`](tables/EDS_TEST_Old/dbo.InstructionBookView09.md) |
| [`dbo.InstructionBookViewCF`](tables/EDS_TEST_Old/dbo.InstructionBookViewCF.md) |
| [`dbo.InstructionBookViewCF2013`](tables/EDS_TEST_Old/dbo.InstructionBookViewCF2013.md) |
| [`dbo.InstructionBookViewwork`](tables/EDS_TEST_Old/dbo.InstructionBookViewwork.md) |
| [`dbo.ItemsBidHeaderView`](tables/EDS_TEST_Old/dbo.ItemsBidHeaderView.md) |
| [`dbo.Keywords1`](tables/EDS_TEST_Old/dbo.Keywords1.md) |
| [`dbo.NewFF1`](tables/EDS_TEST_Old/dbo.NewFF1.md) |
| [`dbo.OrderBookDetailView`](tables/EDS_TEST_Old/dbo.OrderBookDetailView.md) |
| [`dbo.OrderBookView`](tables/EDS_TEST_Old/dbo.OrderBookView.md) |
| [`dbo.pa_Accounts`](tables/EDS_TEST_Old/dbo.pa_Accounts.md) |
| [`dbo.pa_Budgets`](tables/EDS_TEST_Old/dbo.pa_Budgets.md) |
| [`dbo.pa_Category`](tables/EDS_TEST_Old/dbo.pa_Category.md) |
| [`dbo.pa_ReqList`](tables/EDS_TEST_Old/dbo.pa_ReqList.md) |
| [`dbo.pa_School`](tables/EDS_TEST_Old/dbo.pa_School.md) |
| [`dbo.pa_Status`](tables/EDS_TEST_Old/dbo.pa_Status.md) |
| [`dbo.pa_Users`](tables/EDS_TEST_Old/dbo.pa_Users.md) |
| [`dbo.POAttentionList`](tables/EDS_TEST_Old/dbo.POAttentionList.md) |
| [`dbo.PODetail_old`](tables/EDS_TEST_Old/dbo.PODetail_old.md) |
| [`dbo.PODetail_Orig`](tables/EDS_TEST_Old/dbo.PODetail_Orig.md) |
| [`dbo.PODetailExport`](tables/EDS_TEST_Old/dbo.PODetailExport.md) |
| [`dbo.PODetailExport_old`](tables/EDS_TEST_Old/dbo.PODetailExport_old.md) |
| [`dbo.PODetailJavaExport`](tables/EDS_TEST_Old/dbo.PODetailJavaExport.md) |
| [`dbo.PODetailJavaExportNew`](tables/EDS_TEST_Old/dbo.PODetailJavaExportNew.md) |
| [`dbo.PODetailTest`](tables/EDS_TEST_Old/dbo.PODetailTest.md) |
| [`dbo.POHeaderSummary`](tables/EDS_TEST_Old/dbo.POHeaderSummary.md) |
| [`dbo.POHeaderSummary_04232018`](tables/EDS_TEST_Old/dbo.POHeaderSummary_04232018.md) |
| [`dbo.POHeaderTest`](tables/EDS_TEST_Old/dbo.POHeaderTest.md) |
| [`dbo.PricePlanView`](tables/EDS_TEST_Old/dbo.PricePlanView.md) |
| [`dbo.ReqDetail`](tables/EDS_TEST_Old/dbo.ReqDetail.md) |
| [`dbo.RequisitionsView`](tables/EDS_TEST_Old/dbo.RequisitionsView.md) |
| [`dbo.rs_DistrictSummary`](tables/EDS_TEST_Old/dbo.rs_DistrictSummary.md) |
| [`dbo.rs_DistrictSummaryAwardLetter`](tables/EDS_TEST_Old/dbo.rs_DistrictSummaryAwardLetter.md) |
| [`dbo.rs_DistrictSummaryVendors`](tables/EDS_TEST_Old/dbo.rs_DistrictSummaryVendors.md) |
| [`dbo.rs_SBS_AccountRecap_District`](tables/EDS_TEST_Old/dbo.rs_SBS_AccountRecap_District.md) |
| [`dbo.rs_SBS_AccountRecap_School`](tables/EDS_TEST_Old/dbo.rs_SBS_AccountRecap_School.md) |
| [`dbo.rs_SBS_SchoolSummary`](tables/EDS_TEST_Old/dbo.rs_SBS_SchoolSummary.md) |
| [`dbo.rs_SBS_SchoolSummary_Detail`](tables/EDS_TEST_Old/dbo.rs_SBS_SchoolSummary_Detail.md) |
| [`dbo.rs_SBS_UserRecap_District`](tables/EDS_TEST_Old/dbo.rs_SBS_UserRecap_District.md) |
| [`dbo.rs_SBS_UserRecap_School`](tables/EDS_TEST_Old/dbo.rs_SBS_UserRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_District`](tables/EDS_TEST_Old/dbo.rs_SBS_VendorRecap_District.md) |
| [`dbo.rs_SBS_VendorRecap_School`](tables/EDS_TEST_Old/dbo.rs_SBS_VendorRecap_School.md) |
| [`dbo.rs_SBS_VendorRecap_User`](tables/EDS_TEST_Old/dbo.rs_SBS_VendorRecap_User.md) |
| [`dbo.rs_SBS_VendorUserRecap_District`](tables/EDS_TEST_Old/dbo.rs_SBS_VendorUserRecap_District.md) |
| [`dbo.rs_SBS_VendorUserRecap_School`](tables/EDS_TEST_Old/dbo.rs_SBS_VendorUserRecap_School.md) |
| [`dbo.rs_SBSDetailRecap`](tables/EDS_TEST_Old/dbo.rs_SBSDetailRecap.md) |
| [`dbo.rs_SBSReqRecap`](tables/EDS_TEST_Old/dbo.rs_SBSReqRecap.md) |
| [`dbo.rs_SBSVendorRecap`](tables/EDS_TEST_Old/dbo.rs_SBSVendorRecap.md) |
| [`dbo.rs_VendorRecap`](tables/EDS_TEST_Old/dbo.rs_VendorRecap.md) |
| [`dbo.RTK_Item_StructureView`](tables/EDS_TEST_Old/dbo.RTK_Item_StructureView.md) |
| [`dbo.SearchItemsHeadingsView`](tables/EDS_TEST_Old/dbo.SearchItemsHeadingsView.md) |
| [`dbo.SearchItemsKeywordsView`](tables/EDS_TEST_Old/dbo.SearchItemsKeywordsView.md) |
| [`dbo.SearchItemsView`](tables/EDS_TEST_Old/dbo.SearchItemsView.md) |
| [`dbo.TestAllFF`](tables/EDS_TEST_Old/dbo.TestAllFF.md) |
| [`dbo.TestFF`](tables/EDS_TEST_Old/dbo.TestFF.md) |
| [`dbo.TMDistrictInfo`](tables/EDS_TEST_Old/dbo.TMDistrictInfo.md) |
| [`dbo.UploadView`](tables/EDS_TEST_Old/dbo.UploadView.md) |
| [`dbo.UserContactProblemView`](tables/EDS_TEST_Old/dbo.UserContactProblemView.md) |
| [`dbo.UserListView`](tables/EDS_TEST_Old/dbo.UserListView.md) |
| [`dbo.UsersApprovees`](tables/EDS_TEST_Old/dbo.UsersApprovees.md) |
| [`dbo.UserTreeView`](tables/EDS_TEST_Old/dbo.UserTreeView.md) |
| [`dbo.VendorBidLookup`](tables/EDS_TEST_Old/dbo.VendorBidLookup.md) |
| [`dbo.VendorContactProblemView`](tables/EDS_TEST_Old/dbo.VendorContactProblemView.md) |
| [`dbo.vw_ActiveBids`](tables/EDS_TEST_Old/dbo.vw_ActiveBids.md) |
| [`dbo.vw_ActiveCatalogs`](tables/EDS_TEST_Old/dbo.vw_ActiveCatalogs.md) |
| [`dbo.vw_ActiveDistrictList`](tables/EDS_TEST_Old/dbo.vw_ActiveDistrictList.md) |
| [`dbo.vw_ActiveVendors`](tables/EDS_TEST_Old/dbo.vw_ActiveVendors.md) |
| [`dbo.vw_ApprovalsHistory`](tables/EDS_TEST_Old/dbo.vw_ApprovalsHistory.md) |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession_Test.md) |
| [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsTest.md) |
| [`dbo.vw_ARAccounts`](tables/EDS_TEST_Old/dbo.vw_ARAccounts.md) |
| [`dbo.vw_ARBudgets`](tables/EDS_TEST_Old/dbo.vw_ARBudgets.md) |
| [`dbo.vw_ARCategories`](tables/EDS_TEST_Old/dbo.vw_ARCategories.md) |
| [`dbo.vw_ARSchools`](tables/EDS_TEST_Old/dbo.vw_ARSchools.md) |
| [`dbo.vw_ARStatuses`](tables/EDS_TEST_Old/dbo.vw_ARStatuses.md) |
| [`dbo.vw_ARUsers`](tables/EDS_TEST_Old/dbo.vw_ARUsers.md) |
| [`dbo.vw_AtAGlance`](tables/EDS_TEST_Old/dbo.vw_AtAGlance.md) |
| [`dbo.vw_AvailableReqBids`](tables/EDS_TEST_Old/dbo.vw_AvailableReqBids.md) |
| [`dbo.vw_AvailableUserAccounts`](tables/EDS_TEST_Old/dbo.vw_AvailableUserAccounts.md) |
| [`dbo.vw_AVCategoriesBySession`](tables/EDS_TEST_Old/dbo.vw_AVCategoriesBySession.md) |
| [`dbo.vw_AVVendorsBySession`](tables/EDS_TEST_Old/dbo.vw_AVVendorsBySession.md) |
| [`dbo.vw_AVVendorsExport`](tables/EDS_TEST_Old/dbo.vw_AVVendorsExport.md) |
| [`dbo.vw_AwardedVendorsAllCurrentAndFutureBids`](tables/EDS_TEST_Old/dbo.vw_AwardedVendorsAllCurrentAndFutureBids.md) |
| [`dbo.vw_AwardedVendorsAllCurrentBids`](tables/EDS_TEST_Old/dbo.vw_AwardedVendorsAllCurrentBids.md) |
| [`dbo.vw_BAPCBG`](tables/EDS_TEST_Old/dbo.vw_BAPCBG.md) |
| [`dbo.vw_BidAnalysisVendorSummary`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisVendorSummary.md) |
| [`dbo.vw_BidAnalysisVendorSummaryByDistrict`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisVendorSummaryByDistrict.md) |
| [`dbo.vw_BidAnalysisVendorSummaryTest`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisVendorSummaryTest.md) |
| [`dbo.vw_BidAncillaryBySession`](tables/EDS_TEST_Old/dbo.vw_BidAncillaryBySession.md) |
| [`dbo.vw_BidComplianceBySession`](tables/EDS_TEST_Old/dbo.vw_BidComplianceBySession.md) |
| [`dbo.vw_BidContactsVendorList`](tables/EDS_TEST_Old/dbo.vw_BidContactsVendorList.md) |
| [`dbo.vw_BidDocumentsList`](tables/EDS_TEST_Old/dbo.vw_BidDocumentsList.md) |
| [`dbo.vw_BidDocumentTypeNames`](tables/EDS_TEST_Old/dbo.vw_BidDocumentTypeNames.md) |
| [`dbo.vw_BidDuplicateIdentifiers`](tables/EDS_TEST_Old/dbo.vw_BidDuplicateIdentifiers.md) |
| [`dbo.vw_BidHeadersList`](tables/EDS_TEST_Old/dbo.vw_BidHeadersList.md) |
| [`dbo.vw_BidImportMostRecentContactInfo`](tables/EDS_TEST_Old/dbo.vw_BidImportMostRecentContactInfo.md) |
| [`dbo.vw_BidLeadComplianceBySession`](tables/EDS_TEST_Old/dbo.vw_BidLeadComplianceBySession.md) |
| [`dbo.vw_BidLines`](tables/EDS_TEST_Old/dbo.vw_BidLines.md) |
| [`dbo.vw_BidMgrBidderDocs`](tables/EDS_TEST_Old/dbo.vw_BidMgrBidderDocs.md) |
| [`dbo.vw_BidMSRPManufacturerProductLinePrices`](tables/EDS_TEST_Old/dbo.vw_BidMSRPManufacturerProductLinePrices.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](tables/EDS_TEST_Old/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved`](tables/EDS_TEST_Old/dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedSaved.md) |
| [`dbo.vw_BidMSRPRankedManufacturers`](tables/EDS_TEST_Old/dbo.vw_BidMSRPRankedManufacturers.md) |
| [`dbo.vw_BidMSRPResultsPriceRanges`](tables/EDS_TEST_Old/dbo.vw_BidMSRPResultsPriceRanges.md) |
| [`dbo.vw_BidPricing`](tables/EDS_TEST_Old/dbo.vw_BidPricing.md) |
| [`dbo.vw_BidProjectAveragePO`](tables/EDS_TEST_Old/dbo.vw_BidProjectAveragePO.md) |
| [`dbo.vw_BidRequestItemMergeDetail`](tables/EDS_TEST_Old/dbo.vw_BidRequestItemMergeDetail.md) |
| [`dbo.vw_BidRequestItemMergeHeader`](tables/EDS_TEST_Old/dbo.vw_BidRequestItemMergeHeader.md) |
| [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS_TEST_Old/dbo.vw_BidRequestItemsBidMgr.md) |
| [`dbo.vw_BidResults`](tables/EDS_TEST_Old/dbo.vw_BidResults.md) |
| [`dbo.vw_BidTabReadyNotifications`](tables/EDS_TEST_Old/dbo.vw_BidTabReadyNotifications.md) |
| [`dbo.vw_BidTrades`](tables/EDS_TEST_Old/dbo.vw_BidTrades.md) |
| [`dbo.vw_BidTradesBySession`](tables/EDS_TEST_Old/dbo.vw_BidTradesBySession.md) |
| [`dbo.vw_BidTradesBySession_Test`](tables/EDS_TEST_Old/dbo.vw_BidTradesBySession_Test.md) |
| [`dbo.vw_BidTradesVendorDetailForReports`](tables/EDS_TEST_Old/dbo.vw_BidTradesVendorDetailForReports.md) |
| [`dbo.vw_BidTradesVendorsAnswers`](tables/EDS_TEST_Old/dbo.vw_BidTradesVendorsAnswers.md) |
| [`dbo.vw_BidTradesVendorsAnswersBySession`](tables/EDS_TEST_Old/dbo.vw_BidTradesVendorsAnswersBySession.md) |
| [`dbo.vw_BidTradesVendorsBySession`](tables/EDS_TEST_Old/dbo.vw_BidTradesVendorsBySession.md) |
| [`dbo.vw_BidTradesVendorsForReports`](tables/EDS_TEST_Old/dbo.vw_BidTradesVendorsForReports.md) |
| [`dbo.vw_BidType`](tables/EDS_TEST_Old/dbo.vw_BidType.md) |
| [`dbo.vw_BidVendor`](tables/EDS_TEST_Old/dbo.vw_BidVendor.md) |
| [`dbo.vw_BidVendorsBySession`](tables/EDS_TEST_Old/dbo.vw_BidVendorsBySession.md) |
| [`dbo.vw_BidYears`](tables/EDS_TEST_Old/dbo.vw_BidYears.md) |
| [`dbo.vw_BillingStatus`](tables/EDS_TEST_Old/dbo.vw_BillingStatus.md) |
| [`dbo.vw_BrowseDistrictBidHeaders`](tables/EDS_TEST_Old/dbo.vw_BrowseDistrictBidHeaders.md) |
| [`dbo.vw_BudgetDistrictBySession`](tables/EDS_TEST_Old/dbo.vw_BudgetDistrictBySession.md) |
| [`dbo.vw_BudgetsFilter`](tables/EDS_TEST_Old/dbo.vw_BudgetsFilter.md) |
| [`dbo.vw_CatalogCompare`](tables/EDS_TEST_Old/dbo.vw_CatalogCompare.md) |
| [`dbo.vw_CatalogImport`](tables/EDS_TEST_Old/dbo.vw_CatalogImport.md) |
| [`dbo.vw_CatalogImporter1`](tables/EDS_TEST_Old/dbo.vw_CatalogImporter1.md) |
| [`dbo.vw_CatalogImporter1Dtl`](tables/EDS_TEST_Old/dbo.vw_CatalogImporter1Dtl.md) |
| [`dbo.vw_CatalogImporterCat`](tables/EDS_TEST_Old/dbo.vw_CatalogImporterCat.md) |
| [`dbo.vw_CatalogImporterVen`](tables/EDS_TEST_Old/dbo.vw_CatalogImporterVen.md) |
| [`dbo.vw_CatalogImports`](tables/EDS_TEST_Old/dbo.vw_CatalogImports.md) |
| [`dbo.vw_CatalogPages_Orig`](tables/EDS_TEST_Old/dbo.vw_CatalogPages_Orig.md) |
| [`dbo.vw_CatalogPages1`](tables/EDS_TEST_Old/dbo.vw_CatalogPages1.md) |
| [`dbo.vw_CatalogRefsItemTest`](tables/EDS_TEST_Old/dbo.vw_CatalogRefsItemTest.md) |
| [`dbo.vw_CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.vw_CatalogRequestStatus.md) |
| [`dbo.vw_CatalogsAttachedToBids`](tables/EDS_TEST_Old/dbo.vw_CatalogsAttachedToBids.md) |
| [`dbo.vw_Categories`](tables/EDS_TEST_Old/dbo.vw_Categories.md) |
| [`dbo.vw_CategoriesAndVendors`](tables/EDS_TEST_Old/dbo.vw_CategoriesAndVendors.md) |
| [`dbo.vw_ContinuanceSection0Charges`](tables/EDS_TEST_Old/dbo.vw_ContinuanceSection0Charges.md) |
| [`dbo.vw_ContinuanceSection1Charges`](tables/EDS_TEST_Old/dbo.vw_ContinuanceSection1Charges.md) |
| [`dbo.vw_CSReps`](tables/EDS_TEST_Old/dbo.vw_CSReps.md) |
| [`dbo.vw_DetailDescription_old`](tables/EDS_TEST_Old/dbo.vw_DetailDescription_old.md) |
| [`dbo.vw_DetailDescriptionPrint`](tables/EDS_TEST_Old/dbo.vw_DetailDescriptionPrint.md) |
| [`dbo.vw_DetailDescriptionTest`](tables/EDS_TEST_Old/dbo.vw_DetailDescriptionTest.md) |
| [`dbo.vw_DetailView`](tables/EDS_TEST_Old/dbo.vw_DetailView.md) |
| [`dbo.vw_DistrictBudgetList`](tables/EDS_TEST_Old/dbo.vw_DistrictBudgetList.md) |
| [`dbo.vw_DistrictBudgetPP`](tables/EDS_TEST_Old/dbo.vw_DistrictBudgetPP.md) |
| [`dbo.vw_DistrictContactsList`](tables/EDS_TEST_Old/dbo.vw_DistrictContactsList.md) |
| [`dbo.vw_DistrictCounties_BidMgr`](tables/EDS_TEST_Old/dbo.vw_DistrictCounties_BidMgr.md) |
| [`dbo.vw_DistrictList`](tables/EDS_TEST_Old/dbo.vw_DistrictList.md) |
| [`dbo.vw_DistrictPaymentSchedule`](tables/EDS_TEST_Old/dbo.vw_DistrictPaymentSchedule.md) |
| [`dbo.vw_DistrictPOInfo`](tables/EDS_TEST_Old/dbo.vw_DistrictPOInfo.md) |
| [`dbo.vw_DistrictSchools`](tables/EDS_TEST_Old/dbo.vw_DistrictSchools.md) |
| [`dbo.vw_DistrictsNeedingReview`](tables/EDS_TEST_Old/dbo.vw_DistrictsNeedingReview.md) |
| [`dbo.vw_DistrictStates_BidMgr`](tables/EDS_TEST_Old/dbo.vw_DistrictStates_BidMgr.md) |
| [`dbo.vw_DMSBidDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSBidDocuments.md) |
| [`dbo.vw_DMSBidDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSBidDocuments_View.md) |
| [`dbo.vw_DMSRTKDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSRTKDocuments.md) |
| [`dbo.vw_DMSRTKSurveys`](tables/EDS_TEST_Old/dbo.vw_DMSRTKSurveys.md) |
| [`dbo.vw_DMSSDSDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSSDSDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments.md) |
| [`dbo.vw_DMSVendorBidDocuments_04232018`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_04232018.md) |
| [`dbo.vw_DMSVendorBidDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_View.md) |
| [`dbo.vw_DMSVendorBidDocuments_ViewTest`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocuments_ViewTest.md) |
| [`dbo.vw_DMSVendorBidDocumentsTest`](tables/EDS_TEST_Old/dbo.vw_DMSVendorBidDocumentsTest.md) |
| [`dbo.vw_DMSVendorDocuments`](tables/EDS_TEST_Old/dbo.vw_DMSVendorDocuments.md) |
| [`dbo.vw_DMSVendorDocuments_View`](tables/EDS_TEST_Old/dbo.vw_DMSVendorDocuments_View.md) |
| [`dbo.vw_DocumentTypes`](tables/EDS_TEST_Old/dbo.vw_DocumentTypes.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed`](tables/EDS_TEST_Old/dbo.vw_EmailBlastChangeNotificationHTMLTableApprover_NotUsed.md) |
| [`dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed`](tables/EDS_TEST_Old/dbo.vw_EmailBlastChangeNotificationHTMLTableRequisitioner_NotUsed.md) |
| [`dbo.vw_ExistingRequisitions`](tables/EDS_TEST_Old/dbo.vw_ExistingRequisitions.md) |
| [`dbo.vw_ExistingUserAccounts`](tables/EDS_TEST_Old/dbo.vw_ExistingUserAccounts.md) |
| [`dbo.vw_ExistingUserAccounts_NEW`](tables/EDS_TEST_Old/dbo.vw_ExistingUserAccounts_NEW.md) |
| [`dbo.vw_FA_CategoriesAndVendors`](tables/EDS_TEST_Old/dbo.vw_FA_CategoriesAndVendors.md) |
| [`dbo.vw_FA_EDSUser`](tables/EDS_TEST_Old/dbo.vw_FA_EDSUser.md) |
| [`dbo.vw_FA_ReqCategories`](tables/EDS_TEST_Old/dbo.vw_FA_ReqCategories.md) |
| [`dbo.vw_FA_Requisitions`](tables/EDS_TEST_Old/dbo.vw_FA_Requisitions.md) |
| [`dbo.vw_FA_UserAccounts`](tables/EDS_TEST_Old/dbo.vw_FA_UserAccounts.md) |
| [`dbo.vw_FA_UserList`](tables/EDS_TEST_Old/dbo.vw_FA_UserList.md) |
| [`dbo.vw_FA_UserLogin`](tables/EDS_TEST_Old/dbo.vw_FA_UserLogin.md) |
| [`dbo.vw_Financials`](tables/EDS_TEST_Old/dbo.vw_Financials.md) |
| [`dbo.vw_FormattedDetailDescription`](tables/EDS_TEST_Old/dbo.vw_FormattedDetailDescription.md) |
| [`dbo.vw_GetMSDSInfo`](tables/EDS_TEST_Old/dbo.vw_GetMSDSInfo.md) |
| [`dbo.vw_HeadingsByBid`](tables/EDS_TEST_Old/dbo.vw_HeadingsByBid.md) |
| [`dbo.vw_HeadingsByReq`](tables/EDS_TEST_Old/dbo.vw_HeadingsByReq.md) |
| [`dbo.vw_HeadingsByReqTest`](tables/EDS_TEST_Old/dbo.vw_HeadingsByReqTest.md) |
| [`dbo.vw_HeadingsKeywordsByBid`](tables/EDS_TEST_Old/dbo.vw_HeadingsKeywordsByBid.md) |
| [`dbo.vw_IncidentalOrderDownloads`](tables/EDS_TEST_Old/dbo.vw_IncidentalOrderDownloads.md) |
| [`dbo.vw_IncidentalOrderDownloadsDetail`](tables/EDS_TEST_Old/dbo.vw_IncidentalOrderDownloadsDetail.md) |
| [`dbo.vw_InstructionBookCalendar`](tables/EDS_TEST_Old/dbo.vw_InstructionBookCalendar.md) |
| [`dbo.vw_InstructionBookContents`](tables/EDS_TEST_Old/dbo.vw_InstructionBookContents.md) |
| [`dbo.vw_IsRequisitionLocked`](tables/EDS_TEST_Old/dbo.vw_IsRequisitionLocked.md) |
| [`dbo.vw_JavaReqDetail`](tables/EDS_TEST_Old/dbo.vw_JavaReqDetail.md) |
| [`dbo.vw_KeywordsByBid`](tables/EDS_TEST_Old/dbo.vw_KeywordsByBid.md) |
| [`dbo.vw_KeywordsByReqHeading`](tables/EDS_TEST_Old/dbo.vw_KeywordsByReqHeading.md) |
| [`dbo.vw_LatestCrossRef`](tables/EDS_TEST_Old/dbo.vw_LatestCrossRef.md) |
| [`dbo.vw_MPIHeadings`](tables/EDS_TEST_Old/dbo.vw_MPIHeadings.md) |
| [`dbo.vw_MSRPBidReqManufacturer`](tables/EDS_TEST_Old/dbo.vw_MSRPBidReqManufacturer.md) |
| [`dbo.vw_MSRPBidReqManufacturerWriteIn`](tables/EDS_TEST_Old/dbo.vw_MSRPBidReqManufacturerWriteIn.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOption`](tables/EDS_TEST_Old/dbo.vw_MSRPBidReqProdLineAndOption.md) |
| [`dbo.vw_MSRPBidReqProdLineAndOptionWriteIn`](tables/EDS_TEST_Old/dbo.vw_MSRPBidReqProdLineAndOptionWriteIn.md) |
| [`dbo.vw_MSRPBidReqProductLine`](tables/EDS_TEST_Old/dbo.vw_MSRPBidReqProductLine.md) |
| [`dbo.vw_MSRPCategoriesBySession`](tables/EDS_TEST_Old/dbo.vw_MSRPCategoriesBySession.md) |
| [`dbo.vw_MSRPManufacturersBySession`](tables/EDS_TEST_Old/dbo.vw_MSRPManufacturersBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesBySession`](tables/EDS_TEST_Old/dbo.vw_MSRPMPLVendorsCategoriesBySession.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReport`](tables/EDS_TEST_Old/dbo.vw_MSRPMPLVendorsCategoriesReport.md) |
| [`dbo.vw_MSRPMPLVendorsCategoriesReportBC`](tables/EDS_TEST_Old/dbo.vw_MSRPMPLVendorsCategoriesReportBC.md) |
| [`dbo.vw_MSRPProductLineExceptions`](tables/EDS_TEST_Old/dbo.vw_MSRPProductLineExceptions.md) |
| [`dbo.vw_MSRPVendorsAndManufacturersByReq`](tables/EDS_TEST_Old/dbo.vw_MSRPVendorsAndManufacturersByReq.md) |
| [`dbo.vw_MSRPVendorsBidHeaderBySession`](tables/EDS_TEST_Old/dbo.vw_MSRPVendorsBidHeaderBySession.md) |
| [`dbo.vw_MSRPVendorsCategoriesBySession`](tables/EDS_TEST_Old/dbo.vw_MSRPVendorsCategoriesBySession.md) |
| [`dbo.vw_MultiVendorPODistrictsAndBudgets`](tables/EDS_TEST_Old/dbo.vw_MultiVendorPODistrictsAndBudgets.md) |
| [`dbo.vw_NJDistricts`](tables/EDS_TEST_Old/dbo.vw_NJDistricts.md) |
| [`dbo.vw_NY_TM_Districts_Mailing`](tables/EDS_TEST_Old/dbo.vw_NY_TM_Districts_Mailing.md) |
| [`dbo.vw_OverrideReferences`](tables/EDS_TEST_Old/dbo.vw_OverrideReferences.md) |
| [`dbo.vw_OverrideVendorBidders`](tables/EDS_TEST_Old/dbo.vw_OverrideVendorBidders.md) |
| [`dbo.vw_POStatus_Test`](tables/EDS_TEST_Old/dbo.vw_POStatus_Test.md) |
| [`dbo.vw_PricePlanFilter`](tables/EDS_TEST_Old/dbo.vw_PricePlanFilter.md) |
| [`dbo.vw_RepsDistricts`](tables/EDS_TEST_Old/dbo.vw_RepsDistricts.md) |
| [`dbo.vw_ReqBidReview`](tables/EDS_TEST_Old/dbo.vw_ReqBidReview.md) |
| [`dbo.vw_ReqCategories`](tables/EDS_TEST_Old/dbo.vw_ReqCategories.md) |
| [`dbo.vw_ReqDetail_BK20241205`](tables/EDS_TEST_Old/dbo.vw_ReqDetail_BK20241205.md) |
| [`dbo.vw_ReqDetail_BK20241227`](tables/EDS_TEST_Old/dbo.vw_ReqDetail_BK20241227.md) |
| [`dbo.vw_ReqDetail1`](tables/EDS_TEST_Old/dbo.vw_ReqDetail1.md) |
| [`dbo.vw_ReqDetailAsp1`](tables/EDS_TEST_Old/dbo.vw_ReqDetailAsp1.md) |
| [`dbo.vw_ReqDetailPrintTest`](tables/EDS_TEST_Old/dbo.vw_ReqDetailPrintTest.md) |
| [`dbo.vw_ReqDetail-removed 12082010`](tables/EDS_TEST_Old/dbo.vw_ReqDetail-removed_12082010.md) |
| [`dbo.vw_ReqDetailSummary`](tables/EDS_TEST_Old/dbo.vw_ReqDetailSummary.md) |
| [`dbo.vw_ReqDetailTab`](tables/EDS_TEST_Old/dbo.vw_ReqDetailTab.md) |
| [`dbo.vw_ReqTotalsByVendor`](tables/EDS_TEST_Old/dbo.vw_ReqTotalsByVendor.md) |
| [`dbo.vw_ReqTotalsByVendorTest`](tables/EDS_TEST_Old/dbo.vw_ReqTotalsByVendorTest.md) |
| [`dbo.vw_RequisitionAccountBalance`](tables/EDS_TEST_Old/dbo.vw_RequisitionAccountBalance.md) |
| [`dbo.vw_RequisitionCatalogList`](tables/EDS_TEST_Old/dbo.vw_RequisitionCatalogList.md) |
| [`dbo.vw_RequisitionList`](tables/EDS_TEST_Old/dbo.vw_RequisitionList.md) |
| [`dbo.vw_Requisitions`](tables/EDS_TEST_Old/dbo.vw_Requisitions.md) |
| [`dbo.vw_RequisitionsAccounts`](tables/EDS_TEST_Old/dbo.vw_RequisitionsAccounts.md) |
| [`dbo.vw_RequisitionsCategories`](tables/EDS_TEST_Old/dbo.vw_RequisitionsCategories.md) |
| [`dbo.vw_RequisitionShippingCostsTest`](tables/EDS_TEST_Old/dbo.vw_RequisitionShippingCostsTest.md) |
| [`dbo.vw_RequisitionsPrint`](tables/EDS_TEST_Old/dbo.vw_RequisitionsPrint.md) |
| [`dbo.vw_RequisitionsShippingLocations`](tables/EDS_TEST_Old/dbo.vw_RequisitionsShippingLocations.md) |
| [`dbo.vw_RequisitionStatus_orig`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus_orig.md) |
| [`dbo.vw_ReqVendors`](tables/EDS_TEST_Old/dbo.vw_ReqVendors.md) |
| [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocsAndMore.md) |
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](tables/EDS_TEST_Old/dbo.vw_RptMarkedReadyEmailBlastStats.md) |
| [`dbo.vw_RptMissingURLsByBidAndVendor`](tables/EDS_TEST_Old/dbo.vw_RptMissingURLsByBidAndVendor.md) |
| [`dbo.vw_RTK_MSDSandCC`](tables/EDS_TEST_Old/dbo.vw_RTK_MSDSandCC.md) |
| [`dbo.vw_RTK_Sites`](tables/EDS_TEST_Old/dbo.vw_RTK_Sites.md) |
| [`dbo.vw_RTKDefaultMSDSLocation`](tables/EDS_TEST_Old/dbo.vw_RTKDefaultMSDSLocation.md) |
| [`dbo.vw_RTKInfo`](tables/EDS_TEST_Old/dbo.vw_RTKInfo.md) |
| [`dbo.vw_RTKInfoAnnual`](tables/EDS_TEST_Old/dbo.vw_RTKInfoAnnual.md) |
| [`dbo.vw_RTKItems`](tables/EDS_TEST_Old/dbo.vw_RTKItems.md) |
| [`dbo.vw_RTKItems2`](tables/EDS_TEST_Old/dbo.vw_RTKItems2.md) |
| [`dbo.vw_RTKReportItems`](tables/EDS_TEST_Old/dbo.vw_RTKReportItems.md) |
| [`dbo.vw_Savings1`](tables/EDS_TEST_Old/dbo.vw_Savings1.md) |
| [`dbo.vw_Savings5`](tables/EDS_TEST_Old/dbo.vw_Savings5.md) |
| [`dbo.vw_SavingsTotals`](tables/EDS_TEST_Old/dbo.vw_SavingsTotals.md) |
| [`dbo.vw_SavingsTotals5NJ`](tables/EDS_TEST_Old/dbo.vw_SavingsTotals5NJ.md) |
| [`dbo.vw_SavingsTotals5NonFiltered`](tables/EDS_TEST_Old/dbo.vw_SavingsTotals5NonFiltered.md) |
| [`dbo.vw_SavingsTotals5Test`](tables/EDS_TEST_Old/dbo.vw_SavingsTotals5Test.md) |
| [`dbo.vw_ScanDocLookupFields`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookupFields.md) |
| [`dbo.vw_ScanDocLookups`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookups.md) |
| [`dbo.vw_ScanDocLookupTargets`](tables/EDS_TEST_Old/dbo.vw_ScanDocLookupTargets.md) |
| [`dbo.vw_ScannedDocumentDataMSDS`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDS.md) |
| [`dbo.vw_ScannedDocumentDataMSDSCategories`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDSCategories.md) |
| [`dbo.vw_ScannedDocumentDataMSDSManufacturers`](tables/EDS_TEST_Old/dbo.vw_ScannedDocumentDataMSDSManufacturers.md) |
| [`dbo.vw_scARCategories`](tables/EDS_TEST_Old/dbo.vw_scARCategories.md) |
| [`dbo.vw_SchoolUsers`](tables/EDS_TEST_Old/dbo.vw_SchoolUsers.md) |
| [`dbo.vw_SDSImportView`](tables/EDS_TEST_Old/dbo.vw_SDSImportView.md) |
| [`dbo.vw_SDSReferencedURLs`](tables/EDS_TEST_Old/dbo.vw_SDSReferencedURLs.md) |
| [`dbo.vw_SearchDescription`](tables/EDS_TEST_Old/dbo.vw_SearchDescription.md) |
| [`dbo.vw_SearchDescriptionBid`](tables/EDS_TEST_Old/dbo.vw_SearchDescriptionBid.md) |
| [`dbo.vw_SearchItemsDetail`](tables/EDS_TEST_Old/dbo.vw_SearchItemsDetail.md) |
| [`dbo.vw_SearchItemsHeadings`](tables/EDS_TEST_Old/dbo.vw_SearchItemsHeadings.md) |
| [`dbo.vw_SearchItemsKeywords`](tables/EDS_TEST_Old/dbo.vw_SearchItemsKeywords.md) |
| [`dbo.vw_SessionCategories`](tables/EDS_TEST_Old/dbo.vw_SessionCategories.md) |
| [`dbo.vw_SessionCategoryVendors`](tables/EDS_TEST_Old/dbo.vw_SessionCategoryVendors.md) |
| [`dbo.vw_SessionTableBudgets`](tables/EDS_TEST_Old/dbo.vw_SessionTableBudgets.md) |
| [`dbo.vw_ShortDescription`](tables/EDS_TEST_Old/dbo.vw_ShortDescription.md) |
| [`dbo.vw_StatusDetailed`](tables/EDS_TEST_Old/dbo.vw_StatusDetailed.md) |
| [`dbo.vw_TMAwardedVendors`](tables/EDS_TEST_Old/dbo.vw_TMAwardedVendors.md) |
| [`dbo.vw_TMLineItems`](tables/EDS_TEST_Old/dbo.vw_TMLineItems.md) |
| [`dbo.vw_TMSurveyData`](tables/EDS_TEST_Old/dbo.vw_TMSurveyData.md) |
| [`dbo.vw_TMSurveys`](tables/EDS_TEST_Old/dbo.vw_TMSurveys.md) |
| [`dbo.vw_TMTrades`](tables/EDS_TEST_Old/dbo.vw_TMTrades.md) |
| [`dbo.vw_TMUsers`](tables/EDS_TEST_Old/dbo.vw_TMUsers.md) |
| [`dbo.vw_TMVendorsForReports`](tables/EDS_TEST_Old/dbo.vw_TMVendorsForReports.md) |
| [`dbo.vw_UsedAccountData`](tables/EDS_TEST_Old/dbo.vw_UsedAccountData.md) |
| [`dbo.vw_UserNotificationOptions`](tables/EDS_TEST_Old/dbo.vw_UserNotificationOptions.md) |
| [`dbo.vw_ValidLogins`](tables/EDS_TEST_Old/dbo.vw_ValidLogins.md) |
| [`dbo.vw_Vendor0528Items`](tables/EDS_TEST_Old/dbo.vw_Vendor0528Items.md) |
| [`dbo.vw_VendorBidDocumentsList`](tables/EDS_TEST_Old/dbo.vw_VendorBidDocumentsList.md) |
| [`dbo.vw_VendorBidInfoStats`](tables/EDS_TEST_Old/dbo.vw_VendorBidInfoStats.md) |
| [`dbo.vw_VendorBlast`](tables/EDS_TEST_Old/dbo.vw_VendorBlast.md) |
| [`dbo.vw_VendorBlast_AwardedByBid`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_AwardedByBid.md) |
| [`dbo.vw_VendorBlast_DownloadedBySchedule`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_DownloadedBySchedule.md) |
| [`dbo.vw_VendorBlast_RegisteredByBid`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_RegisteredByBid.md) |
| [`dbo.vw_VendorBlast_RegisteredByCategory`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_RegisteredByCategory.md) |
| [`dbo.vw_VendorBlast_RegisteredBySchedule`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_RegisteredBySchedule.md) |
| [`dbo.vw_VendorBlast_SubmittedByBid`](tables/EDS_TEST_Old/dbo.vw_VendorBlast_SubmittedByBid.md) |
| [`dbo.vw_VendorCategoryBids_Cats`](tables/EDS_TEST_Old/dbo.vw_VendorCategoryBids_Cats.md) |
| [`dbo.vw_VendorCategoryBids_Vendors`](tables/EDS_TEST_Old/dbo.vw_VendorCategoryBids_Vendors.md) |
| [`dbo.vw_VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.vw_VendorDocRequestStatus.md) |
| [`dbo.vw_VendorDocumentsList`](tables/EDS_TEST_Old/dbo.vw_VendorDocumentsList.md) |
| [`dbo.vw_VendorPODistrictList`](tables/EDS_TEST_Old/dbo.vw_VendorPODistrictList.md) |
| [`dbo.vw_VendorPODistricts`](tables/EDS_TEST_Old/dbo.vw_VendorPODistricts.md) |
| [`dbo.vw_VendorPODistrictsAndBudgets`](tables/EDS_TEST_Old/dbo.vw_VendorPODistrictsAndBudgets.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsCF`](tables/EDS_TEST_Old/dbo.vw_VendorPODistrictsAndBudgetsCF.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsOld`](tables/EDS_TEST_Old/dbo.vw_VendorPODistrictsAndBudgetsOld.md) |
| [`dbo.vw_VendorPODistrictsAndBudgetsTest`](tables/EDS_TEST_Old/dbo.vw_VendorPODistrictsAndBudgetsTest.md) |
| [`dbo.vw_VendorPOView1`](tables/EDS_TEST_Old/dbo.vw_VendorPOView1.md) |
| [`dbo.vw_VendorPOView2`](tables/EDS_TEST_Old/dbo.vw_VendorPOView2.md) |
| [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryMSRPStatus.md) |
| [`dbo.vw_VendorQueryStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryStatus.md) |
| [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryTandMStatus.md) |
| [`dbo.vw_VendorsByBid`](tables/EDS_TEST_Old/dbo.vw_VendorsByBid.md) |
| [`dbo.vw_VendorsTable`](tables/EDS_TEST_Old/dbo.vw_VendorsTable.md) |
| [`dbo.vw_VPOLoginCheck`](tables/EDS_TEST_Old/dbo.vw_VPOLoginCheck.md) |
| [`dbo.vw_VPOVendors`](tables/EDS_TEST_Old/dbo.vw_VPOVendors.md) |
| [`dbo.vw_WincapVendors`](tables/EDS_TEST_Old/dbo.vw_WincapVendors.md) |
| [`dbo.vw_WincapVendorsMaster`](tables/EDS_TEST_Old/dbo.vw_WincapVendorsMaster.md) |
| [`dbo.vw_ZonalItems`](tables/EDS_TEST_Old/dbo.vw_ZonalItems.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `null.sp_CCAddAddendaItem_EDSIQWebuser` | PROCEDURE |
| `null.sp_CCAddAddendaMaint` | PROCEDURE |
| `null.sp_CCUpdateAddendaItem_EDSIQWEBUSER` | PROCEDURE |
| `null.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `null.sp_CombineReqs` | PROCEDURE |
| `null.sp_CombineReqsNoDelete` | PROCEDURE |
| `null.sp_ConvertReadyBatches` | PROCEDURE |
| `null.sp_CoverView` | PROCEDURE |
| `null.sp_DeleteDistrictBudgetPOs` | PROCEDURE |
| `null.sp_DeleteEmptyReqs` | PROCEDURE |
| `null.sp_DeletePOList` | PROCEDURE |
| `null.sp_DeleteRequisitionWithItems` | PROCEDURE |
| `null.sp_MultiBatchLoad` | PROCEDURE |
| `null.sp_NightlyGarbageCollection` | PROCEDURE |
| `null.sp_OrderBookCopy` | PROCEDURE |
| `null.sp_SavingsLetter` | PROCEDURE |
| `null.sp_Sys3000ToWinCap` | PROCEDURE |
| `null.uf_CoverPages` | INLINE TABLE FUNCTION |
| `null.uf_IsRequisitionLocked` | SCALAR FUNCTION |
| `null.uf_LookupItems` | TABLE FUNCTION |
| `null.uf_LookupItemsByCatalog` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch` | TABLE FUNCTION |
| `null.uf_LookupItemsForBatch1` | INLINE TABLE FUNCTION |
| `null.uf_LookupItemsForBook` | TABLE FUNCTION |
| `null.uf_LookupItemsForBook1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrice1` | INLINE TABLE FUNCTION |
| `null.uf_LookupPrices` | TABLE FUNCTION |
| `null.uf_Sys3000ToWinCap` | TABLE FUNCTION |
| `null.uf_TopOrderBook` | INLINE TABLE FUNCTION |
| `dbo._sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.bid2xls` | PROCEDURE |
| `dbo.bid2xlsTest` | PROCEDURE |
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.fnParseRTF` | SCALAR FUNCTION |
| `dbo.RTF2TXT` | SCALAR FUNCTION |
| `dbo.sp_AddDistrict` | PROCEDURE |
| `dbo.sp_AddISBN` | PROCEDURE |
| `dbo.sp_AddMSRPItem` | PROCEDURE |
| `dbo.sp_AddPPCatalog` | PROCEDURE |
| `dbo.sp_AddPricePlan` | PROCEDURE |
| `dbo.sp_AddSchool` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_ApproveReq` | PROCEDURE |
| `dbo.sp_AttemptLogin` | PROCEDURE |
| `dbo.sp_AwardBid` | PROCEDURE |
| `dbo.sp_AwardBidHeader` | PROCEDURE |
| `dbo.sp_AwardBidHeaderSingleItem` | PROCEDURE |
| `dbo.sp_BAList` | PROCEDURE |
| `dbo.sp_BatchChanges` | PROCEDURE |
| `dbo.sp_BatchConvert` | PROCEDURE |
| `dbo.sp_BatchConvertNew` | PROCEDURE |
| `dbo.sp_BatchLoad` | PROCEDURE |
| `dbo.sp_BatchProcess` | PROCEDURE |
| `dbo.sp_BatchQueue` | PROCEDURE |
| `dbo.sp_BatchVerify` | PROCEDURE |
| `dbo.sp_BatchVerifyBook` | PROCEDURE |
| `dbo.sp_BatchVerifyForce` | PROCEDURE |
| `dbo.sp_BidCompare` | PROCEDURE |
| `dbo.sp_BidCompareDiscount` | PROCEDURE |
| `dbo.sp_BidCompareSame` | PROCEDURE |
| `dbo.sp_BidCompareSummary` | PROCEDURE |
| `dbo.sp_BidCopy` | PROCEDURE |
| `dbo.sp_BidCopyChangePP` | PROCEDURE |
| `dbo.sp_BidCopyWithIncrease` | PROCEDURE |
| `dbo.sp_BringBillingForward` | PROCEDURE |
| `dbo.sp_BringBillingForwardState` | PROCEDURE |
| `dbo.sp_BuildTopOrdered` | PROCEDURE |
| `dbo.sp_CanDeleteRequisition` | PROCEDURE |
| `dbo.sp_CatalogDataCheck` | PROCEDURE |
| `dbo.sp_CatalogDataPriceCheck` | PROCEDURE |
| `dbo.sp_CatalogImport` | PROCEDURE |
| `dbo.sp_CatalogImporter` | PROCEDURE |
| `dbo.sp_CatalogImporterXML` | PROCEDURE |
| `dbo.sp_CCAccountMaint` | PROCEDURE |
| `dbo.sp_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_CCAddAddendaMaint` | PROCEDURE |
| `dbo.sp_CCAnalysisReturn` | PROCEDURE |
| `dbo.sp_CCItemMaint` | PROCEDURE |
| `dbo.sp_CCSchoolMaint` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaItemSizesOnly` | PROCEDURE |
| `dbo.sp_CCUpdateAddendaMaint` | PROCEDURE |
| `dbo.sp_CCUpdateResults` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccounts_2` | PROCEDURE |
| `dbo.sp_CCUpdateUserAccountsBulk` | PROCEDURE |
| `dbo.sp_CCUserAccountMaint` | PROCEDURE |
| `dbo.sp_CCUserGridMaint` | PROCEDURE |
| `dbo.sp_CombineReqs` | PROCEDURE |
| `dbo.sp_CombineReqsByVendorNoDelete` | PROCEDURE |
| `dbo.sp_CometLoad` | PROCEDURE |
| `dbo.sp_ConvertReqs` | PROCEDURE |
| `dbo.sp_ConvertTextbookReqs` | PROCEDURE |
| `dbo.sp_CopyBidImport` | PROCEDURE |
| `dbo.sp_CopyBudgetAmounts` | PROCEDURE |
| `dbo.sp_CopyCalendar` | PROCEDURE |
| `dbo.sp_CopyItems` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidBackup-2014-10-29` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave` | PROCEDURE |
| `dbo.sp_CopyMSRPVers2BidUsingCursorSave2` | PROCEDURE |
| `dbo.sp_CopyMSRPVers3Bid` | PROCEDURE |
| `dbo.sp_CopyMSRPVers4Bid` | PROCEDURE |
| `dbo.sp_CopyReqs` | PROCEDURE |
| `dbo.sp_CreateBidFromRequest` | PROCEDURE |
| `dbo.sp_CreateBidHeaderDetail` | PROCEDURE |
| `dbo.sp_CreateBidHeaderItems` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_CreateNewBidHeader` | PROCEDURE |
| `dbo.sp_CreateNewRequisition` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionV` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor` | PROCEDURE |
| `dbo.sp_CreateNewRequisitionVendor_bk20250416` | PROCEDURE |
| `dbo.sp_CreateOrderBook03` | PROCEDURE |
| `dbo.sp_CreateOrderBookTest` | PROCEDURE |
| `dbo.sp_CreatePO_Saved062724` | PROCEDURE |
| `dbo.sp_CreatePOTest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequest` | PROCEDURE |
| `dbo.sp_CreateQuoteRequestPrebid` | PROCEDURE |
| `dbo.sp_CreateTextBookBidRequest` | PROCEDURE |
| `dbo.sp_CreateVendorSession` | PROCEDURE |
| `dbo.sp_CXmlLogin` | PROCEDURE |
| `dbo.sp_DBCheck` | PROCEDURE |
| `dbo.sp_DefragAll` | PROCEDURE |
| `dbo.sp_DeleteBatch` | PROCEDURE |
| `dbo.sp_DeleteBook` | PROCEDURE |
| `dbo.sp_DeleteDistrictPOs` | PROCEDURE |
| `dbo.sp_DeleteNoBids` | PROCEDURE |
| `dbo.sp_DeletePO` | PROCEDURE |
| `dbo.sp_DeleteRequisition` | PROCEDURE |
| `dbo.sp_DeleteRequisitionRestricted` | PROCEDURE |
| `dbo.sp_DeleteRequisitionWithDetail` | PROCEDURE |
| `dbo.sp_DeleteZeros` | PROCEDURE |
| `dbo.sp_DistrictRequisitionDetail` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_DSHeadings` | PROCEDURE |
| `dbo.sp_easyadd` | PROCEDURE |
| `dbo.sp_EDSItems` | PROCEDURE |
| `dbo.sp_EnhancedSearchItem` | PROCEDURE |
| `dbo.sp_ExportMSRPBid` | PROCEDURE |
| `dbo.sp_FA_AddUpdateAccountCode` | PROCEDURE |
| `dbo.sp_FA_ApproveReq` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin` | PROCEDURE |
| `dbo.sp_FA_AttemptLogin_BK_20241018_Before_EncryptedPassword` | PROCEDURE |
| `dbo.sp_FA_AvailableAccounts` | PROCEDURE |
| `dbo.sp_FA_CCAddAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CCUpdateAddendaItem` | PROCEDURE |
| `dbo.sp_FA_CreatePO` | PROCEDURE |
| `dbo.sp_FA_CreateReportSession` | PROCEDURE |
| `dbo.sp_FA_CreateReportSessionLinks` | PROCEDURE |
| `dbo.sp_FA_DeleteAccount` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition` | PROCEDURE |
| `dbo.sp_FA_DeleteRequisition_bk20250416` | PROCEDURE |
| `dbo.sp_FA_DeleteUser` | PROCEDURE |
| `dbo.sp_FA_GetAlert` | PROCEDURE |
| `dbo.sp_FA_getUserKeys` | PROCEDURE |
| `dbo.sp_FA_NewPONumbers` | PROCEDURE |
| `dbo.sp_FA_NextPONumber` | PROCEDURE |
| `dbo.sp_FA_RequisitionsForPurchaseOrderModal` | PROCEDURE |
| `dbo.sp_FA_RequisitionsTotals` | PROCEDURE |
| `dbo.sp_FA_SaveHeading` | PROCEDURE |
| `dbo.sp_FA_SaveKeyword` | PROCEDURE |
| `dbo.sp_FA_SavePOs` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNote` | PROCEDURE |
| `dbo.sp_FA_SaveRequisitionNoteEmails` | PROCEDURE |
| `dbo.sp_FA_SaveUser` | PROCEDURE |
| `dbo.sp_FA_SetBudgetAccount` | PROCEDURE |
| `dbo.sp_FA_SetUserAccount` | PROCEDURE |
| `dbo.sp_FA_UpdatePOStatus` | PROCEDURE |
| `dbo.sp_FA_UpdateRequisitionStatus` | PROCEDURE |
| `dbo.sp_FixVendorItemCode` | PROCEDURE |
| `dbo.sp_getCurrentPrices` | PROCEDURE |
| `dbo.sp_GetPODetailByIds` | PROCEDURE |
| `dbo.sp_GetRequisitionShipping` | PROCEDURE |
| `dbo.sp_GetUserRequisitions` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_HoldRequisition` | PROCEDURE |
| `dbo.sp_ImportVendorsBid` | PROCEDURE |
| `dbo.sp_IPQueueStart` | PROCEDURE |
| `dbo.sp_ISBNAdd` | PROCEDURE |
| `dbo.sp_Logout` | PROCEDURE |
| `dbo.sp_MakeReq` | PROCEDURE |
| `dbo.sp_MasterBudgetBook` | PROCEDURE |
| `dbo.sp_MergeAccounts` | PROCEDURE |
| `dbo.sp_MergeAwards` | PROCEDURE |
| `dbo.sp_MergeBidImports` | PROCEDURE |
| `dbo.sp_MergeBids` | PROCEDURE |
| `dbo.sp_MoveIndexes` | PROCEDURE |
| `dbo.sp_MoveReqs` | PROCEDURE |
| `dbo.sp_MPIHeadings` | PROCEDURE |
| `dbo.sp_MSRPExporter` | PROCEDURE |
| `dbo.sp_MSRPImporter` | PROCEDURE |
| `dbo.sp_NewReportSession` | PROCEDURE |
| `dbo.sp_NewRequisitionId_BK20250416` | PROCEDURE |
| `dbo.sp_NewUpload` | PROCEDURE |
| `dbo.sp_OrderBookMaint` | PROCEDURE |
| `dbo.sp_PAAccounts` | PROCEDURE |
| `dbo.sp_PABudgets` | PROCEDURE |
| `dbo.sp_PACategories` | PROCEDURE |
| `dbo.sp_PAComet` | PROCEDURE |
| `dbo.sp_PARequisitions` | PROCEDURE |
| `dbo.sp_PARequisitionsTest` | PROCEDURE |
| `dbo.sp_PARequisitionsTotal` | PROCEDURE |
| `dbo.sp_PASchools` | PROCEDURE |
| `dbo.sp_PAStatus` | PROCEDURE |
| `dbo.sp_PAStatusTest` | PROCEDURE |
| `dbo.sp_PAStatusTest1` | PROCEDURE |
| `dbo.sp_PAUsers` | PROCEDURE |
| `dbo.sp_PODetail` | PROCEDURE |
| `dbo.sp_PODetailLastItemOnly` | PROCEDURE |
| `dbo.sp_PrepareNextYear` | PROCEDURE |
| `dbo.sp_PrepTMSurvey` | PROCEDURE |
| `dbo.sp_ProcessCopyRequests` | PROCEDURE |
| `dbo.sp_processKill` | PROCEDURE |
| `dbo.sp_processMonitor` | PROCEDURE |
| `dbo.sp_processMonitorOrig` | PROCEDURE |
| `dbo.sp_processStatus` | PROCEDURE |
| `dbo.sp_QueueIPs` | PROCEDURE |
| `dbo.sp_QueueReqs` | PROCEDURE |
| `dbo.sp_Reaward_script` | PROCEDURE |
| `dbo.sp_RefreshAccounts` | PROCEDURE |
| `dbo.sp_RefreshDistrictVendors` | PROCEDURE |
| `dbo.sp_ReindexAll` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_ReportReqData` | PROCEDURE |
| `dbo.sp_ResetDistrictAccountingYear` | PROCEDURE |
| `dbo.sp_retrieveTagset` | PROCEDURE |
| `dbo.sp_retrieveTagsetDMS` | PROCEDURE |
| `dbo.sp_ReturnUserReqs` | PROCEDURE |
| `dbo.sp_RTK_AddReportItems` | PROCEDURE |
| `dbo.sp_RTK_Build_MSDS_and_MSDSDetail` | PROCEDURE |
| `dbo.sp_RTKExport` | PROCEDURE |
| `dbo.sp_SaveTags` | PROCEDURE |
| `dbo.sp_SchoolMerge` | PROCEDURE |
| `dbo.sp_search` | PROCEDURE |
| `dbo.sp_SearchItems` | PROCEDURE |
| `dbo.sp_SearchItemsByReqHK` | PROCEDURE |
| `dbo.sp_SessionTableUpdate` | PROCEDURE |
| `dbo.sp_SetBudgetYear` | PROCEDURE |
| `dbo.sp_SetDistrictAndBudgetYear` | PROCEDURE |
| `dbo.sp_ShowAllDefrag` | PROCEDURE |
| `dbo.sp_ShowDistribution` | PROCEDURE |
| `dbo.sp_ShowTextbookSavings` | PROCEDURE |
| `dbo.sp_SmallPOCheck` | PROCEDURE |
| `dbo.sp_SubmitRequisition` | PROCEDURE |
| `dbo.sp_SubmitRequisitionNew` | PROCEDURE |
| `dbo.sp_UAAccounts` | PROCEDURE |
| `dbo.sp_UAList` | PROCEDURE |
| `dbo.sp_UAListTotals` | PROCEDURE |
| `dbo.sp_UAUsers` | PROCEDURE |
| `dbo.sp_UnawardBidHeader` | PROCEDURE |
| `dbo.sp_UnpostCatalog` | PROCEDURE |
| `dbo.sp_UpdateAllListPrices` | PROCEDURE |
| `dbo.sp_UpdateAllReqs` | PROCEDURE |
| `dbo.sp_UpdateCatalogText` | PROCEDURE |
| `dbo.sp_UpdateCatalogTextPart` | PROCEDURE |
| `dbo.sp_UpdateDetails` | PROCEDURE |
| `dbo.sp_UpdateHeading` | PROCEDURE |
| `dbo.sp_UpdateISBN` | PROCEDURE |
| `dbo.sp_UpdateListPrices` | PROCEDURE |
| `dbo.sp_UpdateMSRPItem` | PROCEDURE |
| `dbo.sp_UpdateNextNumber` | PROCEDURE |
| `dbo.sp_UpdateReqDetail` | PROCEDURE |
| `dbo.sp_UpdateReqDetailItem` | PROCEDURE |
| `dbo.sp_UpdateReqDetailList` | PROCEDURE |
| `dbo.sp_UpdateReqDetailPricePlan` | PROCEDURE |
| `dbo.sp_UpdateReqHeader` | PROCEDURE |
| `dbo.sp_UpdateShippingCode` | PROCEDURE |
| `dbo.sp_UpdateVIC` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.sp_ValidateBidImport` | PROCEDURE |
| `dbo.sp_ValidateForPO` | PROCEDURE |
| `dbo.sp_VendorOverride` | PROCEDURE |
| `dbo.sp_VendorOverrideLine` | PROCEDURE |
| `dbo.sp_VendorOverrideOld` | PROCEDURE |
| `dbo.sp_VerifyForPO` | PROCEDURE |
| `dbo.sp_WarningsForPO` | PROCEDURE |
| `dbo.uf_ActiveAccountList` | SCALAR FUNCTION |
| `dbo.uf_AwardLetter` | TABLE FUNCTION |
| `dbo.uf_AwardLetter1` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid_Orig` | TABLE FUNCTION |
| `dbo.uf_AwardLetterBid1` | TABLE FUNCTION |
| `dbo.uf_BatchChanges` | TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailReqComb` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailRSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummary` | INLINE TABLE FUNCTION |
| `dbo.uf_BidAnalysisVendorSummaryByDistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinner` | INLINE TABLE FUNCTION |
| `dbo.uf_BidItemWinnerReq` | INLINE TABLE FUNCTION |
| `dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered` | TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePO` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePODistrict` | INLINE TABLE FUNCTION |
| `dbo.uf_BidProjectAveragePORSId` | INLINE TABLE FUNCTION |
| `dbo.uf_BidSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_BillingMonths` | SCALAR FUNCTION |
| `dbo.uf_CatalogFtsHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogFtsPageHighlights` | TABLE FUNCTION |
| `dbo.uf_CatalogRefsAsp` | SCALAR FUNCTION |
| `dbo.uf_CatalogRefsDetailTest` | SCALAR FUNCTION |
| `dbo.uf_ConfiguredDistricts` | SCALAR FUNCTION |
| `dbo.uf_ContactList` | SCALAR FUNCTION |
| `dbo.uf_ContactListHtml` | SCALAR FUNCTION |
| `dbo.uf_ContactListText` | SCALAR FUNCTION |
| `dbo.uf_CrossRefs2TextOrig` | SCALAR FUNCTION |
| `dbo.uf_DecodeChargeDates` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtra` | SCALAR FUNCTION |
| `dbo.uf_DetailItemDescriptionNoExtraNH` | SCALAR FUNCTION |
| `dbo.uf_DistrictPaymentHistory` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentHistoryBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBO` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | TABLE FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | TABLE FUNCTION |
| `dbo.uf_DistrictProposedFees` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary1_Test` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2` | TABLE FUNCTION |
| `dbo.uf_DistrictSummary2Off` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryBidHeader` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors` | TABLE FUNCTION |
| `dbo.uf_DistrictSummaryVendors1` | TABLE FUNCTION |
| `dbo.uf_ExportMSRPBid` | TABLE FUNCTION |
| `dbo.uf_FA_ApprovalUserTree` | TABLE FUNCTION |
| `dbo.uf_FA_UserApproverTree` | TABLE FUNCTION |
| `dbo.uf_FirstPhrase` | SCALAR FUNCTION |
| `dbo.uf_FixExtended` | SCALAR FUNCTION |
| `dbo.uf_FormatDateDisplay` | SCALAR FUNCTION |
| `dbo.uf_IsBid` | SCALAR FUNCTION |
| `dbo.uf_LineCount` | SCALAR FUNCTION |
| `dbo.uf_LookupItemCode` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByBH1` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReq-120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqOld120912` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqSaved` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendorTest` | TABLE FUNCTION |
| `dbo.uf_LookupItemCodeReq` | TABLE FUNCTION |
| `dbo.uf_LookupItems` | TABLE FUNCTION |
| `dbo.uf_LookupPrice` | TABLE FUNCTION |
| `dbo.uf_LookupPriceByBHLong` | TABLE FUNCTION |
| `dbo.uf_MSRPCheckManufacturerAndNumber` | TABLE FUNCTION |
| `dbo.uf_MyUserTree` | TABLE FUNCTION |
| `dbo.uf_NameParser` | TABLE FUNCTION |
| `dbo.uf_NewSavingsLetter` | TABLE FUNCTION |
| `dbo.uf_NextLowestPrice` | SCALAR FUNCTION |
| `dbo.uf_NextLowestPriceId` | SCALAR FUNCTION |
| `dbo.uf_OrderBook` | TABLE FUNCTION |
| `dbo.uf_OrderBook03` | TABLE FUNCTION |
| `dbo.uf_OrderBookNew` | TABLE FUNCTION |
| `dbo.uf_OrderBookSaved` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest` | TABLE FUNCTION |
| `dbo.uf_OrderBookTest1` | TABLE FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | TABLE FUNCTION |
| `dbo.uf_PackCode_New` | SCALAR FUNCTION |
| `dbo.uf_PackCode_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalog_Old` | SCALAR FUNCTION |
| `dbo.uf_PackCodeCatalogTest` | SCALAR FUNCTION |
| `dbo.uf_PackCodeExport_Old` | SCALAR FUNCTION |
| `dbo.uf_PARequisitions` | TABLE FUNCTION |
| `dbo.uf_PARequisitionsTest` | TABLE FUNCTION |
| `dbo.uf_POAccountList` | TABLE FUNCTION |
| `dbo.uf_POAccountsUsed` | TABLE FUNCTION |
| `dbo.uf_POAttentionList` | TABLE FUNCTION |
| `dbo.uf_POAttentionListCount` | SCALAR FUNCTION |
| `dbo.uf_PODetail` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary` | TABLE FUNCTION |
| `dbo.uf_PODetailSummary1` | TABLE FUNCTION |
| `dbo.uf_POHeader` | TABLE FUNCTION |
| `dbo.uf_PricePlanSummary` | TABLE FUNCTION |
| `dbo.uf_ProposedDistrictPaymentSchedule` | TABLE FUNCTION |
| `dbo.uf_RemoveHighOrder` | SCALAR FUNCTION |
| `dbo.uf_RequisitionCategories` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionCategoriesTest` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionData` | INLINE TABLE FUNCTION |
| `dbo.uf_RequisitionList` | TABLE FUNCTION |
| `dbo.uf_RequisitionListSelective` | TABLE FUNCTION |
| `dbo.uf_RequisitionListTest` | TABLE FUNCTION |
| `dbo.uf_RTKItems` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKItemsRev2` | INLINE TABLE FUNCTION |
| `dbo.uf_RTKUnassignedShipLocations` | INLINE TABLE FUNCTION |
| `dbo.uf_SavingsLetter` | TABLE FUNCTION |
| `dbo.uf_SavingsLetter2` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCounty1` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterCountyNew` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterOld` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterState` | TABLE FUNCTION |
| `dbo.uf_SavingsLetterSummary` | TABLE FUNCTION |
| `dbo.uf_ScanDocSelectStatement` | SCALAR FUNCTION |
| `dbo.uf_SchoolNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_SearchDistrictDetail` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetail_Orig` | TABLE FUNCTION |
| `dbo.uf_SearchDistrictDetailNew` | TABLE FUNCTION |
| `dbo.uf_SearchItemsDetail` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchItemsHeadings` | INLINE TABLE FUNCTION |
| `dbo.uf_SearchKeywords` | SCALAR FUNCTION |
| `dbo.uf_SecondPhrase` | SCALAR FUNCTION |
| `dbo.uf_SecondWord` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq1` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq2` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeq3` | SCALAR FUNCTION |
| `dbo.uf_SetSortSeqTest` | SCALAR FUNCTION |
| `dbo.uf_ShippingNameAndAddress` | SCALAR FUNCTION |
| `dbo.uf_ShowDistribution` | TABLE FUNCTION |
| `dbo.uf_Status` | TABLE FUNCTION |
| `dbo.uf_TMTradeVendorSummary` | SCALAR FUNCTION |
| `dbo.uf_Trim` | SCALAR FUNCTION |
| `dbo.uf_UserEmailTree` | TABLE FUNCTION |
| `dbo.uf_UserTreeApprover` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudget` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetFiltered` | TABLE FUNCTION |
| `dbo.uf_UserTreeBudgetWork` | TABLE FUNCTION |
| `dbo.uf_UserTrees` | TABLE FUNCTION |
| `dbo.uf_UserTreesDistrict` | TABLE FUNCTION |
| `dbo.uf_VendorBidContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorBidNumbers` | SCALAR FUNCTION |
| `dbo.uf_VendorContacts` | SCALAR FUNCTION |
| `dbo.uf_VendorPOContactAddress` | SCALAR FUNCTION |
| `dbo.uf_VendorSummary` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsDetail` | TABLE FUNCTION |
| `dbo.ufn_CatalogRefsItem` | TABLE FUNCTION |
| `dbo.ufn_GetHazardsDescription` | SCALAR FUNCTION |
| `dbo.ufn_GetMSDSSheets` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNonHazardous` | TABLE FUNCTION |
| `dbo.ufn_GetMSDSSheetsNotScanned` | TABLE FUNCTION |
| `dbo.ufn_VerifyForPO` | TABLE FUNCTION |
| `dbo.UrlDecode` | SCALAR FUNCTION |
| `dbo.usp_BidMatchRefs` | PROCEDURE |
| `dbo.usp_BidPageNumberUpdate` | PROCEDURE |
| `dbo.usp_BidRanking` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetail_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavid` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailTempKevin_notused` | PROCEDURE |
| `dbo.usp_BidRequestMergeActions` | PROCEDURE |
| `dbo.usp_BidRequestMergeActionsUNDO-wait` | PROCEDURE |
| `dbo.usp_BringAccountsForward` | PROCEDURE |
| `dbo.usp_ChangeBidHeaderNumber` | PROCEDURE |
| `dbo.usp_ContinuanceAcceptance` | PROCEDURE |
| `dbo.usp_CopyRequisition` | PROCEDURE |
| `dbo.usp_CreateFreightRequest` | PROCEDURE |
| `dbo.usp_DetailedIdentityColumnsReport` | PROCEDURE |
| `dbo.usp_EmailBlastProcessOrderDetailChangeNotifications` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeApprover_NotUsed` | PROCEDURE |
| `dbo.usp_EmailBlastVarsOrderDetailChangeRequistioner_NotUsed` | PROCEDURE |
| `dbo.usp_EndPOSend` | PROCEDURE |
| `dbo.usp_FindEmail` | PROCEDURE |
| `dbo.usp_FindEmail_BK` | PROCEDURE |
| `dbo.usp_GeneratePassword` | PROCEDURE |
| `dbo.usp_GeneratePassword_Print` | PROCEDURE |
| `dbo.usp_GetBidItemAIData` | PROCEDURE |
| `dbo.usp_GetBidItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetImageList` | PROCEDURE |
| `dbo.usp_GetItemAIData` | PROCEDURE |
| `dbo.usp_GetItemsNeedingAIUpdate` | PROCEDURE |
| `dbo.usp_GetMSDSSheets` | PROCEDURE |
| `dbo.usp_getMyLastYearsReqs` | PROCEDURE |
| `dbo.usp_GetNextPONumber` | PROCEDURE |
| `dbo.usp_GetPODetail` | PROCEDURE |
| `dbo.usp_GetPODetail_Test` | PROCEDURE |
| `dbo.usp_GetPOs` | PROCEDURE |
| `dbo.usp_GetPOs_Test` | PROCEDURE |
| `dbo.usp_getSDSDocsAll` | PROCEDURE |
| `dbo.usp_getSDSDocsDistrict` | PROCEDURE |
| `dbo.usp_getSDSDocsSchool` | PROCEDURE |
| `dbo.usp_getSDSDocsUser` | PROCEDURE |
| `dbo.usp_getSDSheets` | PROCEDURE |
| `dbo.usp_getSDSItems` | PROCEDURE |
| `dbo.usp_GetSDSURLs` | PROCEDURE |
| `dbo.usp_GetVendorPricing` | PROCEDURE |
| `dbo.usp_ImportUser` | PROCEDURE |
| `dbo.usp_MakeZ$` | PROCEDURE |
| `dbo.usp_MakeZC` | PROCEDURE |
| `dbo.usp_MissingHeaders` | PROCEDURE |
| `dbo.usp_mySDS` | PROCEDURE |
| `dbo.usp_OrderEZVendors` | PROCEDURE |
| `dbo.usp_POPrintExport` | PROCEDURE |
| `dbo.usp_POStatusByRep` | PROCEDURE |
| `dbo.usp_POStatusByState` | PROCEDURE |
| `dbo.usp_POStatusUpdates` | PROCEDURE |
| `dbo.usp_QueuePOsToSend` | PROCEDURE |
| `dbo.usp_RestoreBidHeaderNumber` | PROCEDURE |
| `dbo.usp_SavePositionData` | PROCEDURE |
| `dbo.usp_SDSDocs` | PROCEDURE |
| `dbo.usp_SearchItems_SearchDataDB` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS_David` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSDavid` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSError` | PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSTest` | PROCEDURE |
| `dbo.usp_SearchVendors` | PROCEDURE |
| `dbo.usp_SetBidItemAIData` | PROCEDURE |
| `dbo.usp_SetItemAIData` | PROCEDURE |
| `dbo.usp_SetPricing` | PROCEDURE |
| `dbo.usp_SetPricing_SearchDataDB` | PROCEDURE |
| `dbo.usp_ShowItemURLs` | PROCEDURE |
| `dbo.usp_StartPOSend` | PROCEDURE |
| `dbo.usp_StoreImage` | PROCEDURE |
| `dbo.usp_StoreImageDone` | PROCEDURE |
| `dbo.usp_StoreImageError` | PROCEDURE |
| `dbo.usp_StoreVendorOrder` | PROCEDURE |
| `dbo.usp_TransactionLogMover` | PROCEDURE |
| `dbo.usp_UpdateBudgets` | PROCEDURE |
| `dbo.usp_UpdatePONextNumber` | PROCEDURE |
| `dbo.usp_UpdatePONumbers` | PROCEDURE |
| `dbo.usp_validateRequisitionStatuses` | PROCEDURE |
| `dbo.usp_VendorStatsCYvsLY` | PROCEDURE |
| `dbo.usp_WaitingTasks` | PROCEDURE |
| `dbo.x_TestErrorHandling` | PROCEDURE |

## `hMailServer`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.hm_accounts`](tables/hMailServer/dbo.hm_accounts.md) | 1 |
| [`dbo.hm_acl`](tables/hMailServer/dbo.hm_acl.md) | 0 |
| [`dbo.hm_aliases`](tables/hMailServer/dbo.hm_aliases.md) | 0 |
| [`dbo.hm_blocked_attachments`](tables/hMailServer/dbo.hm_blocked_attachments.md) | 14 |
| [`dbo.hm_dbversion`](tables/hMailServer/dbo.hm_dbversion.md) | 1 |
| [`dbo.hm_distributionlists`](tables/hMailServer/dbo.hm_distributionlists.md) | 0 |
| [`dbo.hm_distributionlistsrecipients`](tables/hMailServer/dbo.hm_distributionlistsrecipients.md) | 0 |
| [`dbo.hm_dnsbl`](tables/hMailServer/dbo.hm_dnsbl.md) | 2 |
| [`dbo.hm_domain_aliases`](tables/hMailServer/dbo.hm_domain_aliases.md) | 4 |
| [`dbo.hm_domains`](tables/hMailServer/dbo.hm_domains.md) | 1 |
| [`dbo.hm_fetchaccounts`](tables/hMailServer/dbo.hm_fetchaccounts.md) | 0 |
| [`dbo.hm_fetchaccounts_uids`](tables/hMailServer/dbo.hm_fetchaccounts_uids.md) | 0 |
| [`dbo.hm_greylisting_triplets`](tables/hMailServer/dbo.hm_greylisting_triplets.md) | 0 |
| [`dbo.hm_greylisting_whiteaddresses`](tables/hMailServer/dbo.hm_greylisting_whiteaddresses.md) | 0 |
| [`dbo.hm_group_members`](tables/hMailServer/dbo.hm_group_members.md) | 0 |
| [`dbo.hm_groups`](tables/hMailServer/dbo.hm_groups.md) | 0 |
| [`dbo.hm_imapfolders`](tables/hMailServer/dbo.hm_imapfolders.md) | 1 |
| [`dbo.hm_incoming_relays`](tables/hMailServer/dbo.hm_incoming_relays.md) | 0 |
| [`dbo.hm_logon_failures`](tables/hMailServer/dbo.hm_logon_failures.md) | 0 |
| [`dbo.hm_message_metadata`](tables/hMailServer/dbo.hm_message_metadata.md) | 0 |
| [`dbo.hm_messagerecipients`](tables/hMailServer/dbo.hm_messagerecipients.md) | 0 |
| [`dbo.hm_messages`](tables/hMailServer/dbo.hm_messages.md) | 0 |
| [`dbo.hm_routeaddresses`](tables/hMailServer/dbo.hm_routeaddresses.md) | 0 |
| [`dbo.hm_routes`](tables/hMailServer/dbo.hm_routes.md) | 0 |
| [`dbo.hm_rule_actions`](tables/hMailServer/dbo.hm_rule_actions.md) | 0 |
| [`dbo.hm_rule_criterias`](tables/hMailServer/dbo.hm_rule_criterias.md) | 0 |
| [`dbo.hm_rules`](tables/hMailServer/dbo.hm_rules.md) | 0 |
| [`dbo.hm_securityranges`](tables/hMailServer/dbo.hm_securityranges.md) | 6 |
| [`dbo.hm_servermessages`](tables/hMailServer/dbo.hm_servermessages.md) | 7 |
| [`dbo.hm_settings`](tables/hMailServer/dbo.hm_settings.md) | 108 |
| [`dbo.hm_sslcertificates`](tables/hMailServer/dbo.hm_sslcertificates.md) | 1 |
| [`dbo.hm_surblservers`](tables/hMailServer/dbo.hm_surblservers.md) | 1 |
| [`dbo.hm_tcpipports`](tables/hMailServer/dbo.hm_tcpipports.md) | 4 |
| [`dbo.hm_whitelist`](tables/hMailServer/dbo.hm_whitelist.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.hm_drop_table_column` | PROCEDURE |
| `dbo.hm_drop_table_objects` | PROCEDURE |

## `hMailServerNew`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.hm_accounts`](tables/hMailServerNew/dbo.hm_accounts.md) | 0 |
| [`dbo.hm_acl`](tables/hMailServerNew/dbo.hm_acl.md) | 0 |
| [`dbo.hm_aliases`](tables/hMailServerNew/dbo.hm_aliases.md) | 0 |
| [`dbo.hm_blocked_attachments`](tables/hMailServerNew/dbo.hm_blocked_attachments.md) | 14 |
| [`dbo.hm_dbversion`](tables/hMailServerNew/dbo.hm_dbversion.md) | 1 |
| [`dbo.hm_distributionlists`](tables/hMailServerNew/dbo.hm_distributionlists.md) | 0 |
| [`dbo.hm_distributionlistsrecipients`](tables/hMailServerNew/dbo.hm_distributionlistsrecipients.md) | 0 |
| [`dbo.hm_dnsbl`](tables/hMailServerNew/dbo.hm_dnsbl.md) | 2 |
| [`dbo.hm_domain_aliases`](tables/hMailServerNew/dbo.hm_domain_aliases.md) | 0 |
| [`dbo.hm_domains`](tables/hMailServerNew/dbo.hm_domains.md) | 1 |
| [`dbo.hm_fetchaccounts`](tables/hMailServerNew/dbo.hm_fetchaccounts.md) | 0 |
| [`dbo.hm_fetchaccounts_uids`](tables/hMailServerNew/dbo.hm_fetchaccounts_uids.md) | 0 |
| [`dbo.hm_greylisting_triplets`](tables/hMailServerNew/dbo.hm_greylisting_triplets.md) | 0 |
| [`dbo.hm_greylisting_whiteaddresses`](tables/hMailServerNew/dbo.hm_greylisting_whiteaddresses.md) | 0 |
| [`dbo.hm_group_members`](tables/hMailServerNew/dbo.hm_group_members.md) | 0 |
| [`dbo.hm_groups`](tables/hMailServerNew/dbo.hm_groups.md) | 0 |
| [`dbo.hm_imapfolders`](tables/hMailServerNew/dbo.hm_imapfolders.md) | 0 |
| [`dbo.hm_incoming_relays`](tables/hMailServerNew/dbo.hm_incoming_relays.md) | 0 |
| [`dbo.hm_logon_failures`](tables/hMailServerNew/dbo.hm_logon_failures.md) | 0 |
| [`dbo.hm_message_metadata`](tables/hMailServerNew/dbo.hm_message_metadata.md) | 0 |
| [`dbo.hm_messagerecipients`](tables/hMailServerNew/dbo.hm_messagerecipients.md) | 0 |
| [`dbo.hm_messages`](tables/hMailServerNew/dbo.hm_messages.md) | 0 |
| [`dbo.hm_routeaddresses`](tables/hMailServerNew/dbo.hm_routeaddresses.md) | 0 |
| [`dbo.hm_routes`](tables/hMailServerNew/dbo.hm_routes.md) | 0 |
| [`dbo.hm_rule_actions`](tables/hMailServerNew/dbo.hm_rule_actions.md) | 0 |
| [`dbo.hm_rule_criterias`](tables/hMailServerNew/dbo.hm_rule_criterias.md) | 0 |
| [`dbo.hm_rules`](tables/hMailServerNew/dbo.hm_rules.md) | 0 |
| [`dbo.hm_securityranges`](tables/hMailServerNew/dbo.hm_securityranges.md) | 3 |
| [`dbo.hm_servermessages`](tables/hMailServerNew/dbo.hm_servermessages.md) | 7 |
| [`dbo.hm_settings`](tables/hMailServerNew/dbo.hm_settings.md) | 108 |
| [`dbo.hm_sslcertificates`](tables/hMailServerNew/dbo.hm_sslcertificates.md) | 0 |
| [`dbo.hm_surblservers`](tables/hMailServerNew/dbo.hm_surblservers.md) | 1 |
| [`dbo.hm_tcpipports`](tables/hMailServerNew/dbo.hm_tcpipports.md) | 4 |
| [`dbo.hm_whitelist`](tables/hMailServerNew/dbo.hm_whitelist.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.hm_drop_table_column` | PROCEDURE |
| `dbo.hm_drop_table_objects` | PROCEDURE |

## `IDIQ_Platform`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.AdministrativeHearingRequest`](tables/IDIQ_Platform/dbo.AdministrativeHearingRequest.md) | 0 |
| [`dbo.ApiKey`](tables/IDIQ_Platform/dbo.ApiKey.md) | 0 |
| [`dbo.ApiRequestLog`](tables/IDIQ_Platform/dbo.ApiRequestLog.md) | 0 |
| [`dbo.AuditTrail`](tables/IDIQ_Platform/dbo.AuditTrail.md) | 59821 |
| [`dbo.BidOpenerCredential`](tables/IDIQ_Platform/dbo.BidOpenerCredential.md) | 0 |
| [`dbo.BidTemplate`](tables/IDIQ_Platform/dbo.BidTemplate.md) | 0 |
| [`dbo.CertifiedPayrollReceipt`](tables/IDIQ_Platform/dbo.CertifiedPayrollReceipt.md) | 0 |
| [`dbo.CompliancePlaybook`](tables/IDIQ_Platform/dbo.CompliancePlaybook.md) | 0 |
| [`dbo.CooperativeDebarment`](tables/IDIQ_Platform/dbo.CooperativeDebarment.md) | 0 |
| [`dbo.Document`](tables/IDIQ_Platform/dbo.Document.md) | 0 |
| [`dbo.ESignatureConfig`](tables/IDIQ_Platform/dbo.ESignatureConfig.md) | 0 |
| [`dbo.LeadAgencyCompliance`](tables/IDIQ_Platform/dbo.LeadAgencyCompliance.md) | 0 |
| [`dbo.MonthlyPublicPosting`](tables/IDIQ_Platform/dbo.MonthlyPublicPosting.md) | 0 |
| [`dbo.PasswordResetToken`](tables/IDIQ_Platform/dbo.PasswordResetToken.md) | 43 |
| [`dbo.PrevailingWageThreshold`](tables/IDIQ_Platform/dbo.PrevailingWageThreshold.md) | 0 |
| [`dbo.ProcurementType`](tables/IDIQ_Platform/dbo.ProcurementType.md) | 3 |
| [`dbo.ProcurementTypeHistory`](tables/IDIQ_Platform/dbo.ProcurementTypeHistory.md) | 3 |
| [`dbo.PublicPostingReport`](tables/IDIQ_Platform/dbo.PublicPostingReport.md) | 0 |
| [`dbo.SSOConfiguration`](tables/IDIQ_Platform/dbo.SSOConfiguration.md) | 0 |
| [`dbo.WageRateScheduledIncrease`](tables/IDIQ_Platform/dbo.WageRateScheduledIncrease.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `IDIQ_Platform_UAT`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.AdministrativeHearingRequest`](tables/IDIQ_Platform_UAT/dbo.AdministrativeHearingRequest.md) | 0 |
| [`dbo.ApiKey`](tables/IDIQ_Platform_UAT/dbo.ApiKey.md) | 0 |
| [`dbo.ApiRequestLog`](tables/IDIQ_Platform_UAT/dbo.ApiRequestLog.md) | 0 |
| [`dbo.AuditTrail`](tables/IDIQ_Platform_UAT/dbo.AuditTrail.md) | 2723 |
| [`dbo.BidOpenerCredential`](tables/IDIQ_Platform_UAT/dbo.BidOpenerCredential.md) | 1 |
| [`dbo.BidTemplate`](tables/IDIQ_Platform_UAT/dbo.BidTemplate.md) | 0 |
| [`dbo.CertifiedPayrollReceipt`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollReceipt.md) | 0 |
| [`dbo.CompliancePlaybook`](tables/IDIQ_Platform_UAT/dbo.CompliancePlaybook.md) | 0 |
| [`dbo.CooperativeDebarment`](tables/IDIQ_Platform_UAT/dbo.CooperativeDebarment.md) | 0 |
| [`dbo.Document`](tables/IDIQ_Platform_UAT/dbo.Document.md) | 15 |
| [`dbo.ESignatureConfig`](tables/IDIQ_Platform_UAT/dbo.ESignatureConfig.md) | 0 |
| [`dbo.LeadAgencyCompliance`](tables/IDIQ_Platform_UAT/dbo.LeadAgencyCompliance.md) | 0 |
| [`dbo.MonthlyPublicPosting`](tables/IDIQ_Platform_UAT/dbo.MonthlyPublicPosting.md) | 0 |
| [`dbo.PasswordResetToken`](tables/IDIQ_Platform_UAT/dbo.PasswordResetToken.md) | 7 |
| [`dbo.PrevailingWageThreshold`](tables/IDIQ_Platform_UAT/dbo.PrevailingWageThreshold.md) | 0 |
| [`dbo.ProcurementType`](tables/IDIQ_Platform_UAT/dbo.ProcurementType.md) | 3 |
| [`dbo.ProcurementTypeHistory`](tables/IDIQ_Platform_UAT/dbo.ProcurementTypeHistory.md) | 3 |
| [`dbo.PublicPostingReport`](tables/IDIQ_Platform_UAT/dbo.PublicPostingReport.md) | 0 |
| [`dbo.SSOConfiguration`](tables/IDIQ_Platform_UAT/dbo.SSOConfiguration.md) | 0 |
| [`dbo.WageRateScheduledIncrease`](tables/IDIQ_Platform_UAT/dbo.WageRateScheduledIncrease.md) | 0 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `NJ_RTK`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.CAS`](tables/NJ_RTK/dbo.CAS.md) | 3322 |
| [`dbo.Employers`](tables/NJ_RTK/dbo.Employers.md) | 62 |
| [`dbo.Facilities`](tables/NJ_RTK/dbo.Facilities.md) | 496 |
| [`dbo.Products`](tables/NJ_RTK/dbo.Products.md) | 0 |
| [`dbo.ReportProducts`](tables/NJ_RTK/dbo.ReportProducts.md) | 216812 |
| [`dbo.ReportSubstances`](tables/NJ_RTK/dbo.ReportSubstances.md) | 206295 |
| [`dbo.ReportSurveys`](tables/NJ_RTK/dbo.ReportSurveys.md) | 1982 |
| [`dbo.Substances`](tables/NJ_RTK/dbo.Substances.md) | 0 |
| [`dbo.Surveys`](tables/NJ_RTK/dbo.Surveys.md) | 1978 |

### Leaf views

| View |
|------|
| [`dbo.vw_DMSCheck`](tables/NJ_RTK/dbo.vw_DMSCheck.md) |
| [`dbo.vw_InventoryRange`](tables/NJ_RTK/dbo.vw_InventoryRange.md) |
| [`dbo.vw_reportedData`](tables/NJ_RTK/dbo.vw_reportedData.md) |
| [`dbo.vw_RTKChanges`](tables/NJ_RTK/dbo.vw_RTKChanges.md) |
| [`dbo.vw_RTKChangesOrig`](tables/NJ_RTK/dbo.vw_RTKChangesOrig.md) |
| [`dbo.vw_RTKData`](tables/NJ_RTK/dbo.vw_RTKData.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.sp_refreshEmployer` | PROCEDURE |
| `dbo.sp_refreshFacility` | PROCEDURE |
| `dbo.uf_SanitizeDataTest` | SCALAR FUNCTION |
| `dbo.usp_UpdateSurvey` | PROCEDURE |

## `ProcurementAnalytics`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.BudgetAllocations`](tables/ProcurementAnalytics/dbo.BudgetAllocations.md) | 80 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `SearchData`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Adds`](tables/SearchData/dbo.Adds.md) | 1195248 |
| [`dbo.ElasticSearchUpdateLog`](tables/SearchData/dbo.ElasticSearchUpdateLog.md) | 336 |
| [`dbo.PricingAddenda`](tables/SearchData/dbo.PricingAddenda.md) | 0 |
| [`dbo.PricingConsolidated`](tables/SearchData/dbo.PricingConsolidated.md) | 13896847 |
| [`dbo.PricingConsolidatedOrderCounts`](tables/SearchData/dbo.PricingConsolidatedOrderCounts.md) | 0 |
| [`dbo.PricingUpdate`](tables/SearchData/dbo.PricingUpdate.md) | 446 |
| [`dbo.ProductVerificationResults`](tables/SearchData/dbo.ProductVerificationResults.md) | 91787 |
| [`dbo.Searches`](tables/SearchData/dbo.Searches.md) | 1598434 |
| [`dbo.SearchReqs`](tables/SearchData/dbo.SearchReqs.md) | 1863819 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.GetSearchQueryJsonTemplate` | SCALAR FUNCTION |
| `dbo.SearchPrices` | TABLE FUNCTION |
| `dbo.SearchPricesJson` | TABLE FUNCTION |
| `dbo.usp_getIndexData` | PROCEDURE |

## `SearchData_Test`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Adds`](tables/SearchData_Test/dbo.Adds.md) | 1195248 |
| [`dbo.ElasticSearchUpdateLog`](tables/SearchData_Test/dbo.ElasticSearchUpdateLog.md) | 336 |
| [`dbo.PricingAddenda`](tables/SearchData_Test/dbo.PricingAddenda.md) | 0 |
| [`dbo.PricingConsolidated`](tables/SearchData_Test/dbo.PricingConsolidated.md) | 30216767 |
| [`dbo.PricingConsolidatedOrderCounts`](tables/SearchData_Test/dbo.PricingConsolidatedOrderCounts.md) | 0 |
| [`dbo.PricingUpdate`](tables/SearchData_Test/dbo.PricingUpdate.md) | 446 |
| [`dbo.ProductVerificationResults`](tables/SearchData_Test/dbo.ProductVerificationResults.md) | 0 |
| [`dbo.Searches`](tables/SearchData_Test/dbo.Searches.md) | 1598434 |
| [`dbo.SearchReqs`](tables/SearchData_Test/dbo.SearchReqs.md) | 1863819 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.GetSearchQueryJsonTemplate` | SCALAR FUNCTION |
| `dbo.SearchPrices` | TABLE FUNCTION |
| `dbo.SearchPricesJson` | TABLE FUNCTION |
| `dbo.usp_getIndexData` | PROCEDURE |

## `SolarWindsOrion`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.AccountRights`](tables/SolarWindsOrion/dbo.AccountRights.md) | 0 |
| [`dbo.ActionDefinitions`](tables/SolarWindsOrion/dbo.ActionDefinitions.md) | 0 |
| [`dbo.Actions`](tables/SolarWindsOrion/dbo.Actions.md) | 96 |
| [`dbo.ActionSchedules`](tables/SolarWindsOrion/dbo.ActionSchedules.md) | 0 |
| [`dbo.ActionsProperties`](tables/SolarWindsOrion/dbo.ActionsProperties.md) | 619 |
| [`dbo.ActiveAlerts`](tables/SolarWindsOrion/dbo.ActiveAlerts.md) | 0 |
| [`dbo.ActiveDiagnosticsDetail`](tables/SolarWindsOrion/dbo.ActiveDiagnosticsDetail.md) | 6336 |
| [`dbo.ActiveDiagnosticsSilencedChecks`](tables/SolarWindsOrion/dbo.ActiveDiagnosticsSilencedChecks.md) | 0 |
| [`dbo.AgentManagement_AgentPlugins`](tables/SolarWindsOrion/dbo.AgentManagement_AgentPlugins.md) | 8 |
| [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | 1 |
| [`dbo.AgentManagement_Certificates`](tables/SolarWindsOrion/dbo.AgentManagement_Certificates.md) | 1 |
| [`dbo.AgentManagement_DownloadRequests`](tables/SolarWindsOrion/dbo.AgentManagement_DownloadRequests.md) | 0 |
| [`dbo.AgentManagement_EngineInfo`](tables/SolarWindsOrion/dbo.AgentManagement_EngineInfo.md) | 1 |
| [`dbo.AgentManagement_InstallPackageMappings`](tables/SolarWindsOrion/dbo.AgentManagement_InstallPackageMappings.md) | 11 |
| [`dbo.AgentManagement_InstallPackages`](tables/SolarWindsOrion/dbo.AgentManagement_InstallPackages.md) | 11 |
| [`dbo.AgentManagement_Pkcs12Certificates`](tables/SolarWindsOrion/dbo.AgentManagement_Pkcs12Certificates.md) | 2 |
| [`dbo.AgentManagement_Proxy`](tables/SolarWindsOrion/dbo.AgentManagement_Proxy.md) | 0 |
| [`dbo.AlertActions`](tables/SolarWindsOrion/dbo.AlertActions.md) | 0 |
| [`dbo.AlertActiveObjects`](tables/SolarWindsOrion/dbo.AlertActiveObjects.md) | 0 |
| [`dbo.AlertConditionState`](tables/SolarWindsOrion/dbo.AlertConditionState.md) | 52 |
| [`dbo.AlertConfigurations`](tables/SolarWindsOrion/dbo.AlertConfigurations.md) | 49 |
| [`dbo.AlertConfigurationsCustomProperties`](tables/SolarWindsOrion/dbo.AlertConfigurationsCustomProperties.md) | 49 |
| [`dbo.AlertDefinitions`](tables/SolarWindsOrion/dbo.AlertDefinitions.md) | 0 |
| [`dbo.AlertHistory`](tables/SolarWindsOrion/dbo.AlertHistory.md) | 4638 |
| [`dbo.AlertImportLog`](tables/SolarWindsOrion/dbo.AlertImportLog.md) | 0 |
| [`dbo.AlertLog`](tables/SolarWindsOrion/dbo.AlertLog.md) | 0 |
| [`dbo.AlertMigrationLog`](tables/SolarWindsOrion/dbo.AlertMigrationLog.md) | 0 |
| [`dbo.Alerts`](tables/SolarWindsOrion/dbo.Alerts.md) | 0 |
| [`dbo.AlertSchedules`](tables/SolarWindsOrion/dbo.AlertSchedules.md) | 0 |
| [`dbo.AlertStatus`](tables/SolarWindsOrion/dbo.AlertStatus.md) | 0 |
| [`dbo.AlertSuppression`](tables/SolarWindsOrion/dbo.AlertSuppression.md) | 0 |
| [`dbo.AlertSuppression2`](tables/SolarWindsOrion/dbo.AlertSuppression2.md) | 0 |
| [`dbo.AlertTestLog`](tables/SolarWindsOrion/dbo.AlertTestLog.md) | 0 |
| [`dbo.AlertTests`](tables/SolarWindsOrion/dbo.AlertTests.md) | 0 |
| [`dbo.AlertTriggerMap`](tables/SolarWindsOrion/dbo.AlertTriggerMap.md) | 0 |
| [`dbo.AlertValueChanges`](tables/SolarWindsOrion/dbo.AlertValueChanges.md) | 0 |
| [`dbo.AuditingActionTypes`](tables/SolarWindsOrion/dbo.AuditingActionTypes.md) | 68 |
| [`dbo.AuditingArguments`](tables/SolarWindsOrion/dbo.AuditingArguments.md) | 458 |
| [`dbo.AuditingEvents`](tables/SolarWindsOrion/dbo.AuditingEvents.md) | 117 |
| [`dbo.AutoDependencyRoot`](tables/SolarWindsOrion/dbo.AutoDependencyRoot.md) | 0 |
| [`dbo.ChartSettings`](tables/SolarWindsOrion/dbo.ChartSettings.md) | 29 |
| [`dbo.ConfigWizardLog`](tables/SolarWindsOrion/dbo.ConfigWizardLog.md) | 5 |
| [`dbo.ConfigWizardMessage`](tables/SolarWindsOrion/dbo.ConfigWizardMessage.md) | 1 |
| [`dbo.ConfigWizardMetric`](tables/SolarWindsOrion/dbo.ConfigWizardMetric.md) | 1 |
| [`dbo.ContainerCustomProperties`](tables/SolarWindsOrion/dbo.ContainerCustomProperties.md) | 0 |
| [`dbo.Cortex_Documents`](tables/SolarWindsOrion/dbo.Cortex_Documents.md) | 1295 |
| [`dbo.Cortex_DocumentTypes`](tables/SolarWindsOrion/dbo.Cortex_DocumentTypes.md) | 2 |
| [`dbo.Cortex_ExternalDocumentTypes`](tables/SolarWindsOrion/dbo.Cortex_ExternalDocumentTypes.md) | 2 |
| [`dbo.Cortex_MetricGroups`](tables/SolarWindsOrion/dbo.Cortex_MetricGroups.md) | 6 |
| [`dbo.Cortex_MetricRollupTypes`](tables/SolarWindsOrion/dbo.Cortex_MetricRollupTypes.md) | 3 |
| [`dbo.Cortex_MetricTypes`](tables/SolarWindsOrion/dbo.Cortex_MetricTypes.md) | 0 |
| [`dbo.Cortex_PartitionErrors`](tables/SolarWindsOrion/dbo.Cortex_PartitionErrors.md) | 0 |
| [`dbo.Cortex_Sequences`](tables/SolarWindsOrion/dbo.Cortex_Sequences.md) | 2 |
| [`dbo.Cortex_Versions`](tables/SolarWindsOrion/dbo.Cortex_Versions.md) | 13 |
| [`dbo.CPULoad_Statistics`](tables/SolarWindsOrion/dbo.CPULoad_Statistics.md) | 115 |
| [`dbo.CPUMultiLoad_Current`](tables/SolarWindsOrion/dbo.CPUMultiLoad_Current.md) | 136 |
| [`dbo.CPUMultiLoad_Daily`](tables/SolarWindsOrion/dbo.CPUMultiLoad_Daily.md) | 0 |
| [`dbo.CPUMultiLoad_Detail`](tables/SolarWindsOrion/dbo.CPUMultiLoad_Detail.md) | 254046 |
| [`dbo.CPUMultiLoad_Hourly`](tables/SolarWindsOrion/dbo.CPUMultiLoad_Hourly.md) | 0 |
| [`dbo.Credential`](tables/SolarWindsOrion/dbo.Credential.md) | 7 |
| [`dbo.CredentialProperty`](tables/SolarWindsOrion/dbo.CredentialProperty.md) | 11 |
| [`dbo.CustomPropertyMetadata`](tables/SolarWindsOrion/dbo.CustomPropertyMetadata.md) | 6 |
| [`dbo.CustomPropertyUsage`](tables/SolarWindsOrion/dbo.CustomPropertyUsage.md) | 0 |
| [`dbo.CustomPropertyValues`](tables/SolarWindsOrion/dbo.CustomPropertyValues.md) | 0 |
| [`dbo.DeletedAutoDependencies`](tables/SolarWindsOrion/dbo.DeletedAutoDependencies.md) | 0 |
| [`dbo.DeletedNodes`](tables/SolarWindsOrion/dbo.DeletedNodes.md) | 0 |
| [`dbo.DeletedVolumes`](tables/SolarWindsOrion/dbo.DeletedVolumes.md) | 0 |
| [`dbo.Dependencies`](tables/SolarWindsOrion/dbo.Dependencies.md) | 0 |
| [`dbo.DependencyEntities`](tables/SolarWindsOrion/dbo.DependencyEntities.md) | 10 |
| [`dbo.DiscoveredMACAddresses`](tables/SolarWindsOrion/dbo.DiscoveredMACAddresses.md) | 150 |
| [`dbo.DiscoveredNetObjectStatuses`](tables/SolarWindsOrion/dbo.DiscoveredNetObjectStatuses.md) | 108 |
| [`dbo.DiscoveredNodePortMaps`](tables/SolarWindsOrion/dbo.DiscoveredNodePortMaps.md) | 0 |
| [`dbo.DiscoveredNodes`](tables/SolarWindsOrion/dbo.DiscoveredNodes.md) | 108 |
| [`dbo.DiscoveredNodeVlans`](tables/SolarWindsOrion/dbo.DiscoveredNodeVlans.md) | 0 |
| [`dbo.DiscoveredPollers`](tables/SolarWindsOrion/dbo.DiscoveredPollers.md) | 602 |
| [`dbo.DiscoveredVolumes`](tables/SolarWindsOrion/dbo.DiscoveredVolumes.md) | 809 |
| [`dbo.DiscoveryLogItems`](tables/SolarWindsOrion/dbo.DiscoveryLogItems.md) | 859 |
| [`dbo.DiscoveryLogs`](tables/SolarWindsOrion/dbo.DiscoveryLogs.md) | 1 |
| [`dbo.DiscoveryProfiles`](tables/SolarWindsOrion/dbo.DiscoveryProfiles.md) | 1 |
| [`dbo.ElementUsage_Daily`](tables/SolarWindsOrion/dbo.ElementUsage_Daily.md) | 34 |
| [`dbo.EngineProperties`](tables/SolarWindsOrion/dbo.EngineProperties.md) | 5 |
| [`dbo.ESI_Instance`](tables/SolarWindsOrion/dbo.ESI_Instance.md) | 0 |
| [`dbo.Events`](tables/SolarWindsOrion/dbo.Events.md) | 3282 |
| [`dbo.EventTypes`](tables/SolarWindsOrion/dbo.EventTypes.md) | 87 |
| [`dbo.ExpandedLimitations`](tables/SolarWindsOrion/dbo.ExpandedLimitations.md) | 0 |
| [`dbo.ExternalWebsites`](tables/SolarWindsOrion/dbo.ExternalWebsites.md) | 0 |
| [`dbo.FavoriteMacroVariables`](tables/SolarWindsOrion/dbo.FavoriteMacroVariables.md) | 0 |
| [`dbo.FavoriteProperties`](tables/SolarWindsOrion/dbo.FavoriteProperties.md) | 0 |
| [`dbo.FED_ProviderSubscriptions`](tables/SolarWindsOrion/dbo.FED_ProviderSubscriptions.md) | 0 |
| [`dbo.FED_RemoteInformationServices`](tables/SolarWindsOrion/dbo.FED_RemoteInformationServices.md) | 0 |
| [`dbo.FED_Subscription`](tables/SolarWindsOrion/dbo.FED_Subscription.md) | 0 |
| [`dbo.Frequencies`](tables/SolarWindsOrion/dbo.Frequencies.md) | 0 |
| [`dbo.HA_Audit`](tables/SolarWindsOrion/dbo.HA_Audit.md) | 39 |
| [`dbo.HA_FacilitiesInstances`](tables/SolarWindsOrion/dbo.HA_FacilitiesInstances.md) | 4 |
| [`dbo.HA_PoolMemberInterfacesInfo`](tables/SolarWindsOrion/dbo.HA_PoolMemberInterfacesInfo.md) | 2 |
| [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | 2 |
| [`dbo.HA_Pools`](tables/SolarWindsOrion/dbo.HA_Pools.md) | 0 |
| [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | 1 |
| [`dbo.HistoryTableDDL`](tables/SolarWindsOrion/dbo.HistoryTableDDL.md) | 15 |
| [`dbo.IndexDefragmentationHistory`](tables/SolarWindsOrion/dbo.IndexDefragmentationHistory.md) | 112 |
| [`dbo.IndexSelectionPattern`](tables/SolarWindsOrion/dbo.IndexSelectionPattern.md) | 12 |
| [`dbo.InterfaceTypes`](tables/SolarWindsOrion/dbo.InterfaceTypes.md) | 231 |
| [`dbo.InventorySettings`](tables/SolarWindsOrion/dbo.InventorySettings.md) | 0 |
| [`dbo.LazyUpgradeStatus`](tables/SolarWindsOrion/dbo.LazyUpgradeStatus.md) | 0 |
| [`dbo.LazyUpgradeStatusProgress`](tables/SolarWindsOrion/dbo.LazyUpgradeStatusProgress.md) | 0 |
| [`dbo.Licensing_DeactivationReceipts`](tables/SolarWindsOrion/dbo.Licensing_DeactivationReceipts.md) | 0 |
| [`dbo.Licensing_LicenseAssignments`](tables/SolarWindsOrion/dbo.Licensing_LicenseAssignments.md) | 0 |
| [`dbo.Licensing_LicenseFilters`](tables/SolarWindsOrion/dbo.Licensing_LicenseFilters.md) | 0 |
| [`dbo.Licensing_LicenseRefreshJournal`](tables/SolarWindsOrion/dbo.Licensing_LicenseRefreshJournal.md) | 8323 |
| [`dbo.Licensing_LicenseStore`](tables/SolarWindsOrion/dbo.Licensing_LicenseStore.md) | 1 |
| [`dbo.Limitations`](tables/SolarWindsOrion/dbo.Limitations.md) | 0 |
| [`dbo.LimitationSnapshots`](tables/SolarWindsOrion/dbo.LimitationSnapshots.md) | 0 |
| [`dbo.LimitationTableRelation`](tables/SolarWindsOrion/dbo.LimitationTableRelation.md) | 51 |
| [`dbo.LoginNonces`](tables/SolarWindsOrion/dbo.LoginNonces.md) | 0 |
| [`dbo.MacPrefixes`](tables/SolarWindsOrion/dbo.MacPrefixes.md) | 19221 |
| [`dbo.MaintenancePlanAssignments`](tables/SolarWindsOrion/dbo.MaintenancePlanAssignments.md) | 0 |
| [`dbo.MaintenancePlans`](tables/SolarWindsOrion/dbo.MaintenancePlans.md) | 0 |
| [`dbo.MaintenanceRenewalsCheckStatus`](tables/SolarWindsOrion/dbo.MaintenanceRenewalsCheckStatus.md) | 1 |
| [`dbo.MapStudioFiles`](tables/SolarWindsOrion/dbo.MapStudioFiles.md) | 12 |
| [`dbo.MemoryMultiLoad_Current`](tables/SolarWindsOrion/dbo.MemoryMultiLoad_Current.md) | 0 |
| [`dbo.MemoryMultiLoad_Daily`](tables/SolarWindsOrion/dbo.MemoryMultiLoad_Daily.md) | 0 |
| [`dbo.MemoryMultiLoad_Detail`](tables/SolarWindsOrion/dbo.MemoryMultiLoad_Detail.md) | 0 |
| [`dbo.MemoryMultiLoad_Hourly`](tables/SolarWindsOrion/dbo.MemoryMultiLoad_Hourly.md) | 0 |
| [`dbo.MenuBars`](tables/SolarWindsOrion/dbo.MenuBars.md) | 25 |
| [`dbo.MenuItems`](tables/SolarWindsOrion/dbo.MenuItems.md) | 37 |
| [`dbo.Modules`](tables/SolarWindsOrion/dbo.Modules.md) | 2 |
| [`dbo.NetObjectDowntime`](tables/SolarWindsOrion/dbo.NetObjectDowntime.md) | 4230 |
| [`dbo.NodeCategories`](tables/SolarWindsOrion/dbo.NodeCategories.md) | 3 |
| [`dbo.NodeChildStatus`](tables/SolarWindsOrion/dbo.NodeChildStatus.md) | 0 |
| [`dbo.NodeChildStatusParticipation`](tables/SolarWindsOrion/dbo.NodeChildStatusParticipation.md) | 0 |
| [`dbo.NodeCiscoCdpEntries`](tables/SolarWindsOrion/dbo.NodeCiscoCdpEntries.md) | 0 |
| [`dbo.NodeIPAddresses`](tables/SolarWindsOrion/dbo.NodeIPAddresses.md) | 126 |
| [`dbo.NodeL2Connections`](tables/SolarWindsOrion/dbo.NodeL2Connections.md) | 179 |
| [`dbo.NodeL3Entries`](tables/SolarWindsOrion/dbo.NodeL3Entries.md) | 38 |
| [`dbo.NodeL3RoutingData`](tables/SolarWindsOrion/dbo.NodeL3RoutingData.md) | 22 |
| [`dbo.NodeListResourcesCache`](tables/SolarWindsOrion/dbo.NodeListResourcesCache.md) | 0 |
| [`dbo.NodeLldpEntries`](tables/SolarWindsOrion/dbo.NodeLldpEntries.md) | 0 |
| [`dbo.NodeMACAddresses`](tables/SolarWindsOrion/dbo.NodeMACAddresses.md) | 169 |
| [`dbo.NodeNotes`](tables/SolarWindsOrion/dbo.NodeNotes.md) | 0 |
| [`dbo.NodePortInterfaceMap`](tables/SolarWindsOrion/dbo.NodePortInterfaceMap.md) | 96 |
| [`dbo.NodesCustomProperties`](tables/SolarWindsOrion/dbo.NodesCustomProperties.md) | 110 |
| [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | 110 |
| [`dbo.NodeSettings`](tables/SolarWindsOrion/dbo.NodeSettings.md) | 40 |
| [`dbo.NodesStatistics`](tables/SolarWindsOrion/dbo.NodesStatistics.md) | 110 |
| [`dbo.NodeVlans`](tables/SolarWindsOrion/dbo.NodeVlans.md) | 0 |
| [`dbo.Orion_AuditSSH`](tables/SolarWindsOrion/dbo.Orion_AuditSSH.md) | 0 |
| [`dbo.OrionFeatures`](tables/SolarWindsOrion/dbo.OrionFeatures.md) | 0 |
| [`dbo.OrionServers`](tables/SolarWindsOrion/dbo.OrionServers.md) | 1 |
| [`dbo.Packaging_DatabaseCommittedTask`](tables/SolarWindsOrion/dbo.Packaging_DatabaseCommittedTask.md) | 12 |
| [`dbo.PartitionErrors`](tables/SolarWindsOrion/dbo.PartitionErrors.md) | 0 |
| [`dbo.PerfStackProjects`](tables/SolarWindsOrion/dbo.PerfStackProjects.md) | 0 |
| [`dbo.PerfStackStatisticsEntity`](tables/SolarWindsOrion/dbo.PerfStackStatisticsEntity.md) | 0 |
| [`dbo.PollerCapacity_Daily`](tables/SolarWindsOrion/dbo.PollerCapacity_Daily.md) | 11 |
| [`dbo.Pollers`](tables/SolarWindsOrion/dbo.Pollers.md) | 2727 |
| [`dbo.PortItems`](tables/SolarWindsOrion/dbo.PortItems.md) | 96 |
| [`dbo.RecommendationEngine_Content`](tables/SolarWindsOrion/dbo.RecommendationEngine_Content.md) | 0 |
| [`dbo.RecommendationEngine_Dismissed`](tables/SolarWindsOrion/dbo.RecommendationEngine_Dismissed.md) | 0 |
| [`dbo.RecommendationEngine_Rules`](tables/SolarWindsOrion/dbo.RecommendationEngine_Rules.md) | 0 |
| [`dbo.ReportDefinitions`](tables/SolarWindsOrion/dbo.ReportDefinitions.md) | 110 |
| [`dbo.ReportFavorites`](tables/SolarWindsOrion/dbo.ReportFavorites.md) | 0 |
| [`dbo.ReportJobDefinitions`](tables/SolarWindsOrion/dbo.ReportJobDefinitions.md) | 0 |
| [`dbo.ReportJobs`](tables/SolarWindsOrion/dbo.ReportJobs.md) | 0 |
| [`dbo.ReportJobUrls`](tables/SolarWindsOrion/dbo.ReportJobUrls.md) | 0 |
| [`dbo.ReportSchedules`](tables/SolarWindsOrion/dbo.ReportSchedules.md) | 0 |
| [`dbo.ResourceProperties`](tables/SolarWindsOrion/dbo.ResourceProperties.md) | 447 |
| [`dbo.ResourceProperties_Previous`](tables/SolarWindsOrion/dbo.ResourceProperties_Previous.md) | 0 |
| [`dbo.Resources_Previous`](tables/SolarWindsOrion/dbo.Resources_Previous.md) | 0 |
| [`dbo.ResponseTime_Statistics`](tables/SolarWindsOrion/dbo.ResponseTime_Statistics.md) | 330 |
| [`dbo.ServerCertificates`](tables/SolarWindsOrion/dbo.ServerCertificates.md) | 1 |
| [`dbo.ServiceDirectoryEntries`](tables/SolarWindsOrion/dbo.ServiceDirectoryEntries.md) | 31 |
| [`dbo.Setting`](tables/SolarWindsOrion/dbo.Setting.md) | 1 |
| [`dbo.SettingOverride`](tables/SolarWindsOrion/dbo.SettingOverride.md) | 0 |
| [`dbo.Settings`](tables/SolarWindsOrion/dbo.Settings.md) | 193 |
| [`dbo.SettingUpdateTimestamp`](tables/SolarWindsOrion/dbo.SettingUpdateTimestamp.md) | 2 |
| [`dbo.ShadowNodes`](tables/SolarWindsOrion/dbo.ShadowNodes.md) | 4 |
| [`dbo.SiteMapRoots`](tables/SolarWindsOrion/dbo.SiteMapRoots.md) | 10 |
| [`dbo.Sites`](tables/SolarWindsOrion/dbo.Sites.md) | 1 |
| [`dbo.SMTPServers`](tables/SolarWindsOrion/dbo.SMTPServers.md) | 0 |
| [`dbo.SNI_AlertIncidents`](tables/SolarWindsOrion/dbo.SNI_AlertIncidents.md) | 0 |
| [`dbo.SSH_Sessions`](tables/SolarWindsOrion/dbo.SSH_Sessions.md) | 0 |
| [`dbo.StackFilterProperty`](tables/SolarWindsOrion/dbo.StackFilterProperty.md) | 3 |
| [`dbo.StackParticipation`](tables/SolarWindsOrion/dbo.StackParticipation.md) | 30 |
| [`dbo.StatusInfo`](tables/SolarWindsOrion/dbo.StatusInfo.md) | 26 |
| [`dbo.STPRecords`](tables/SolarWindsOrion/dbo.STPRecords.md) | 3 |
| [`dbo.SWA_InstallationSession`](tables/SolarWindsOrion/dbo.SWA_InstallationSession.md) | 0 |
| [`dbo.SWA_InstallationSession_Log`](tables/SolarWindsOrion/dbo.SWA_InstallationSession_Log.md) | 0 |
| [`dbo.SWA_InstallationSession_OrionServer`](tables/SolarWindsOrion/dbo.SWA_InstallationSession_OrionServer.md) | 0 |
| [`dbo.SWISysObjects`](tables/SolarWindsOrion/dbo.SWISysObjects.md) | 56461 |
| [`dbo.SysLog`](tables/SolarWindsOrion/dbo.SysLog.md) | 0 |
| [`dbo.SysLogActions`](tables/SolarWindsOrion/dbo.SysLogActions.md) | 0 |
| [`dbo.SysLogFacilities`](tables/SolarWindsOrion/dbo.SysLogFacilities.md) | 24 |
| [`dbo.SysLogNodes`](tables/SolarWindsOrion/dbo.SysLogNodes.md) | 0 |
| [`dbo.SysLogRules`](tables/SolarWindsOrion/dbo.SysLogRules.md) | 0 |
| [`dbo.SysLogSeverities`](tables/SolarWindsOrion/dbo.SysLogSeverities.md) | 8 |
| [`dbo.ThresholdsLevelSettings`](tables/SolarWindsOrion/dbo.ThresholdsLevelSettings.md) | 8 |
| [`dbo.TimeFrameDays`](tables/SolarWindsOrion/dbo.TimeFrameDays.md) | 19 |
| [`dbo.TimeFrames`](tables/SolarWindsOrion/dbo.TimeFrames.md) | 3 |
| [`dbo.TimeUnits`](tables/SolarWindsOrion/dbo.TimeUnits.md) | 10 |
| [`dbo.TopologyConnections`](tables/SolarWindsOrion/dbo.TopologyConnections.md) | 31 |
| [`dbo.TopologyEntities`](tables/SolarWindsOrion/dbo.TopologyEntities.md) | 2 |
| [`dbo.TrapActions`](tables/SolarWindsOrion/dbo.TrapActions.md) | 0 |
| [`dbo.TrapRules`](tables/SolarWindsOrion/dbo.TrapRules.md) | 0 |
| [`dbo.TrapRulesDetail`](tables/SolarWindsOrion/dbo.TrapRulesDetail.md) | 0 |
| [`dbo.Traps`](tables/SolarWindsOrion/dbo.Traps.md) | 0 |
| [`dbo.TrapsCommunityStrings`](tables/SolarWindsOrion/dbo.TrapsCommunityStrings.md) | 0 |
| [`dbo.TrapsNodes`](tables/SolarWindsOrion/dbo.TrapsNodes.md) | 0 |
| [`dbo.TrapVarbinds`](tables/SolarWindsOrion/dbo.TrapVarbinds.md) | 0 |
| [`dbo.UserTabs`](tables/SolarWindsOrion/dbo.UserTabs.md) | 4 |
| [`dbo.UserWebViews`](tables/SolarWindsOrion/dbo.UserWebViews.md) | 0 |
| [`dbo.ViewConditions`](tables/SolarWindsOrion/dbo.ViewConditions.md) | 1 |
| [`dbo.Views`](tables/SolarWindsOrion/dbo.Views.md) | 40 |
| [`dbo.ViewsByDeviceType`](tables/SolarWindsOrion/dbo.ViewsByDeviceType.md) | 13 |
| [`dbo.VoipAlertTypes`](tables/SolarWindsOrion/dbo.VoipAlertTypes.md) | 0 |
| [`dbo.VoipAxlConnectionInfo`](tables/SolarWindsOrion/dbo.VoipAxlConnectionInfo.md) | 0 |
| [`dbo.VoipCCMCDRConfiguration`](tables/SolarWindsOrion/dbo.VoipCCMCDRConfiguration.md) | 0 |
| [`dbo.VoipCCMFtpConnectionInfo`](tables/SolarWindsOrion/dbo.VoipCCMFtpConnectionInfo.md) | 0 |
| [`dbo.VoipCCMGateways`](tables/SolarWindsOrion/dbo.VoipCCMGateways.md) | 0 |
| [`dbo.VoipCCMH323Devices`](tables/SolarWindsOrion/dbo.VoipCCMH323Devices.md) | 0 |
| [`dbo.VoipCCMRegions`](tables/SolarWindsOrion/dbo.VoipCCMRegions.md) | 0 |
| [`dbo.VoipCCMSipTrunkCallActivity_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkCallActivity_Daily.md) | 0 |
| [`dbo.VoipCCMSipTrunkCallActivity_Detail`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkCallActivity_Detail.md) | 0 |
| [`dbo.VoipCCMSipTrunkCallActivity_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkCallActivity_Hourly.md) | 0 |
| [`dbo.VoipCCMSipTrunkDestinations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkDestinations.md) | 0 |
| [`dbo.VoipCCMSipTrunks`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunks.md) | 0 |
| [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | 0 |
| [`dbo.VoipCCMSipTrunkStatus_Detail`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Detail.md) | 0 |
| [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | 0 |
| [`dbo.VoipCCMSipTrunkStatuses`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatuses.md) | 6 |
| [`dbo.VoipCDRConfiguration`](tables/SolarWindsOrion/dbo.VoipCDRConfiguration.md) | 1 |
| [`dbo.VoipCDRDetails`](tables/SolarWindsOrion/dbo.VoipCDRDetails.md) | 0 |
| [`dbo.VoipCDRs`](tables/SolarWindsOrion/dbo.VoipCDRs.md) | 0 |
| [`dbo.VoipCMRs`](tables/SolarWindsOrion/dbo.VoipCMRs.md) | 0 |
| [`dbo.VoipConfig`](tables/SolarWindsOrion/dbo.VoipConfig.md) | 103 |
| [`dbo.VoipEvents`](tables/SolarWindsOrion/dbo.VoipEvents.md) | 6 |
| [`dbo.VoipGatewayChannels`](tables/SolarWindsOrion/dbo.VoipGatewayChannels.md) | 0 |
| [`dbo.VoipGatewayChannelStats_Daily`](tables/SolarWindsOrion/dbo.VoipGatewayChannelStats_Daily.md) | 0 |
| [`dbo.VoipGatewayChannelStats_Detail`](tables/SolarWindsOrion/dbo.VoipGatewayChannelStats_Detail.md) | 0 |
| [`dbo.VoipGatewayChannelStats_Hourly`](tables/SolarWindsOrion/dbo.VoipGatewayChannelStats_Hourly.md) | 0 |
| [`dbo.VoipGatewayEndpoints`](tables/SolarWindsOrion/dbo.VoipGatewayEndpoints.md) | 0 |
| [`dbo.VoipGatewayEndpointStats_Daily`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointStats_Daily.md) | 0 |
| [`dbo.VoipGatewayEndpointStats_Detail`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointStats_Detail.md) | 0 |
| [`dbo.VoipGatewayEndpointStats_Hourly`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointStats_Hourly.md) | 0 |
| [`dbo.VoipGateways`](tables/SolarWindsOrion/dbo.VoipGateways.md) | 0 |
| [`dbo.VoipGatewayStats_Daily`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Daily.md) | 0 |
| [`dbo.VoipGatewayStats_Detail`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Detail.md) | 0 |
| [`dbo.VoipGatewayStats_Hourly`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Hourly.md) | 0 |
| [`dbo.VoipHttpFtpOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipHttpFtpOperationResults_Daily.md) | 0 |
| [`dbo.VoipHttpFtpOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipHttpFtpOperationResults_Detail.md) | 0 |
| [`dbo.VoipHttpFtpOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipHttpFtpOperationResults_Hourly.md) | 0 |
| [`dbo.VoipInfrastructureInterfaces`](tables/SolarWindsOrion/dbo.VoipInfrastructureInterfaces.md) | 0 |
| [`dbo.VoipInfrastructureNodes`](tables/SolarWindsOrion/dbo.VoipInfrastructureNodes.md) | 0 |
| [`dbo.VoipJitterOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipJitterOperationResults_Daily.md) | 0 |
| [`dbo.VoipJitterOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipJitterOperationResults_Detail.md) | 0 |
| [`dbo.VoipJitterOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipJitterOperationResults_Hourly.md) | 0 |
| [`dbo.VoipMosOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipMosOperationResults_Daily.md) | 0 |
| [`dbo.VoipMosOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipMosOperationResults_Detail.md) | 0 |
| [`dbo.VoipMosOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipMosOperationResults_Hourly.md) | 0 |
| [`dbo.VoipOneWayDelayOperationResults_Daily`](tables/SolarWindsOrion/dbo.VoipOneWayDelayOperationResults_Daily.md) | 0 |
| [`dbo.VoipOneWayDelayOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipOneWayDelayOperationResults_Detail.md) | 0 |
| [`dbo.VoipOneWayDelayOperationResults_Hourly`](tables/SolarWindsOrion/dbo.VoipOneWayDelayOperationResults_Hourly.md) | 0 |
| [`dbo.VoipWebUserSettings`](tables/SolarWindsOrion/dbo.VoipWebUserSettings.md) | 0 |
| [`dbo.VolumePerformance_Daily`](tables/SolarWindsOrion/dbo.VolumePerformance_Daily.md) | 0 |
| [`dbo.VolumePerformance_Detail`](tables/SolarWindsOrion/dbo.VolumePerformance_Detail.md) | 58727 |
| [`dbo.VolumePerformance_Hourly`](tables/SolarWindsOrion/dbo.VolumePerformance_Hourly.md) | 0 |
| [`dbo.Volumes`](tables/SolarWindsOrion/dbo.Volumes.md) | 751 |
| [`dbo.VolumeUsage_ForecastCoefficients`](tables/SolarWindsOrion/dbo.VolumeUsage_ForecastCoefficients.md) | 751 |
| [`dbo.WebCommunityStrings`](tables/SolarWindsOrion/dbo.WebCommunityStrings.md) | 3 |
| [`dbo.WebProxy`](tables/SolarWindsOrion/dbo.WebProxy.md) | 0 |
| [`dbo.WebSettings`](tables/SolarWindsOrion/dbo.WebSettings.md) | 53 |
| [`dbo.Websites`](tables/SolarWindsOrion/dbo.Websites.md) | 1 |
| [`dbo.WebUserSettings`](tables/SolarWindsOrion/dbo.WebUserSettings.md) | 15 |
| [`dbo.WorldMapPointLabel`](tables/SolarWindsOrion/dbo.WorldMapPointLabel.md) | 0 |
| [`dbo.WorldMapPoints`](tables/SolarWindsOrion/dbo.WorldMapPoints.md) | 0 |

### Leaf views

| View |
|------|
| [`dbo.AlertDefinitionsView`](tables/SolarWindsOrion/dbo.AlertDefinitionsView.md) |
| [`dbo.AlertHistoryView`](tables/SolarWindsOrion/dbo.AlertHistoryView.md) |
| [`dbo.AlertStatusView`](tables/SolarWindsOrion/dbo.AlertStatusView.md) |
| [`dbo.AllEngines`](tables/SolarWindsOrion/dbo.AllEngines.md) |
| [`dbo.CiscoBuffersByDays`](tables/SolarWindsOrion/dbo.CiscoBuffersByDays.md) |
| [`dbo.ComposedLimitations`](tables/SolarWindsOrion/dbo.ComposedLimitations.md) |
| [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) |
| [`dbo.Containers_ContainerAvailability`](tables/SolarWindsOrion/dbo.Containers_ContainerAvailability.md) |
| [`dbo.Containers_CurrentStatusOfContainer`](tables/SolarWindsOrion/dbo.Containers_CurrentStatusOfContainer.md) |
| [`dbo.Containers_DailyContainerAvailability`](tables/SolarWindsOrion/dbo.Containers_DailyContainerAvailability.md) |
| [`dbo.Containers_HistoricalContainerStatus`](tables/SolarWindsOrion/dbo.Containers_HistoricalContainerStatus.md) |
| [`dbo.ContainerTreeSnapshot`](tables/SolarWindsOrion/dbo.ContainerTreeSnapshot.md) |
| [`dbo.Cortex_Metrics_0`](tables/SolarWindsOrion/dbo.Cortex_Metrics_0.md) |
| [`dbo.Cortex_Metrics_0_latest`](tables/SolarWindsOrion/dbo.Cortex_Metrics_0_latest.md) |
| [`dbo.Cortex_Metrics_1440`](tables/SolarWindsOrion/dbo.Cortex_Metrics_1440.md) |
| [`dbo.Cortex_Metrics_60`](tables/SolarWindsOrion/dbo.Cortex_Metrics_60.md) |
| [`dbo.Cortex_Metrics_NodeStatistics_1440_LATEST`](tables/SolarWindsOrion/dbo.Cortex_Metrics_NodeStatistics_1440_LATEST.md) |
| [`dbo.Cortex_Metrics_NodeStatistics_60_LATEST`](tables/SolarWindsOrion/dbo.Cortex_Metrics_NodeStatistics_60_LATEST.md) |
| [`dbo.Cortex_Metrics_PcuStatistics_1440_LATEST`](tables/SolarWindsOrion/dbo.Cortex_Metrics_PcuStatistics_1440_LATEST.md) |
| [`dbo.Cortex_Metrics_PcuStatistics_60_LATEST`](tables/SolarWindsOrion/dbo.Cortex_Metrics_PcuStatistics_60_LATEST.md) |
| [`dbo.CPULoadByDays`](tables/SolarWindsOrion/dbo.CPULoadByDays.md) |
| [`dbo.CPUMultiLoad`](tables/SolarWindsOrion/dbo.CPUMultiLoad.md) |
| [`dbo.HA_PoolsView`](tables/SolarWindsOrion/dbo.HA_PoolsView.md) |
| [`dbo.IpSlaOperationsDHCP`](tables/SolarWindsOrion/dbo.IpSlaOperationsDHCP.md) |
| [`dbo.IpSlaOperationsDNS`](tables/SolarWindsOrion/dbo.IpSlaOperationsDNS.md) |
| [`dbo.IpSlaOperationsFTP`](tables/SolarWindsOrion/dbo.IpSlaOperationsFTP.md) |
| [`dbo.IpSlaOperationsHTTP`](tables/SolarWindsOrion/dbo.IpSlaOperationsHTTP.md) |
| [`dbo.IpSlaOperationsJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsJitter.md) |
| [`dbo.IpSlaOperationsMOS`](tables/SolarWindsOrion/dbo.IpSlaOperationsMOS.md) |
| [`dbo.IpSlaOperationsTCP`](tables/SolarWindsOrion/dbo.IpSlaOperationsTCP.md) |
| [`dbo.IpSlaOperationsUDPJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsUDPJitter.md) |
| [`dbo.IpSlaOperationsVoIpUDPJitter`](tables/SolarWindsOrion/dbo.IpSlaOperationsVoIpUDPJitter.md) |
| [`dbo.IpSlaPacketLoss`](tables/SolarWindsOrion/dbo.IpSlaPacketLoss.md) |
| [`dbo.LoadAverage`](tables/SolarWindsOrion/dbo.LoadAverage.md) |
| [`dbo.MemoryMultiLoad`](tables/SolarWindsOrion/dbo.MemoryMultiLoad.md) |
| [`dbo.NodesCpuLoadForecastCapacity`](tables/SolarWindsOrion/dbo.NodesCpuLoadForecastCapacity.md) |
| [`dbo.NodesCpuLoadThreshold`](tables/SolarWindsOrion/dbo.NodesCpuLoadThreshold.md) |
| [`dbo.NodesPercentLossThreshold`](tables/SolarWindsOrion/dbo.NodesPercentLossThreshold.md) |
| [`dbo.NodesPercentMemoryUsedForecastCapacity`](tables/SolarWindsOrion/dbo.NodesPercentMemoryUsedForecastCapacity.md) |
| [`dbo.NodesPercentMemoryUsedThreshold`](tables/SolarWindsOrion/dbo.NodesPercentMemoryUsedThreshold.md) |
| [`dbo.NodesResponseTimeThreshold`](tables/SolarWindsOrion/dbo.NodesResponseTimeThreshold.md) |
| [`dbo.NodesThresholdsAlerts`](tables/SolarWindsOrion/dbo.NodesThresholdsAlerts.md) |
| [`dbo.PRIGatewayUtilization`](tables/SolarWindsOrion/dbo.PRIGatewayUtilization.md) |
| [`dbo.ResponseTimeByDays`](tables/SolarWindsOrion/dbo.ResponseTimeByDays.md) |
| [`dbo.Vendors`](tables/SolarWindsOrion/dbo.Vendors.md) |
| [`dbo.VoipAlertQos`](tables/SolarWindsOrion/dbo.VoipAlertQos.md) |
| [`dbo.VoipCallDetails`](tables/SolarWindsOrion/dbo.VoipCallDetails.md) |
| [`dbo.VoipCallManagerAlertStats`](tables/SolarWindsOrion/dbo.VoipCallManagerAlertStats.md) |
| [`dbo.VoipCallManagerQualityAggregate1Hour`](tables/SolarWindsOrion/dbo.VoipCallManagerQualityAggregate1Hour.md) |
| [`dbo.VoipCallManagerQualityAggregate30Mins`](tables/SolarWindsOrion/dbo.VoipCallManagerQualityAggregate30Mins.md) |
| [`dbo.VoipCallPathMetrics`](tables/SolarWindsOrion/dbo.VoipCallPathMetrics.md) |
| [`dbo.VoipCallQualityDetails`](tables/SolarWindsOrion/dbo.VoipCallQualityDetails.md) |
| [`dbo.VoipCalls`](tables/SolarWindsOrion/dbo.VoipCalls.md) |
| [`dbo.VoipCCMMonitoringDetail`](tables/SolarWindsOrion/dbo.VoipCCMMonitoringDetail.md) |
| [`dbo.VoipCCMPhoneStats`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats.md) |
| [`dbo.VoipCCMSipTrunkAvailability`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkAvailability.md) |
| [`dbo.VoipCCMSipTrunkCallActivityData`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkCallActivityData.md) |
| [`dbo.VoipCCMSipTrunkDestinationsView`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkDestinationsView.md) |
| [`dbo.VoipCCMSipTrunksCurrentCallActivity`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksCurrentCallActivity.md) |
| [`dbo.VoipCCMSipTrunksCurrentStatus`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksCurrentStatus.md) |
| [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) |
| [`dbo.VoipConnectedPhonesReport`](tables/SolarWindsOrion/dbo.VoipConnectedPhonesReport.md) |
| [`dbo.VoipGatewayAlertsAggregateLast1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayAlertsAggregateLast1Hour.md) |
| [`dbo.VoipGatewayChannelStats`](tables/SolarWindsOrion/dbo.VoipGatewayChannelStats.md) |
| [`dbo.VoipGatewayDetailCurrentStats`](tables/SolarWindsOrion/dbo.VoipGatewayDetailCurrentStats.md) |
| [`dbo.VoipGatewayEndpointCurrentStats`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointCurrentStats.md) |
| [`dbo.VoipGatewayEndpointDetailStats`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointDetailStats.md) |
| [`dbo.VoipGatewayQualityAggregate1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayQualityAggregate1Hour.md) |
| [`dbo.VoipGatewayQualityAggregate30Mins`](tables/SolarWindsOrion/dbo.VoipGatewayQualityAggregate30Mins.md) |
| [`dbo.VoipGatewaysDetail`](tables/SolarWindsOrion/dbo.VoipGatewaysDetail.md) |
| [`dbo.VoipGatewayStats`](tables/SolarWindsOrion/dbo.VoipGatewayStats.md) |
| [`dbo.VoipHttpFtpOperationResults`](tables/SolarWindsOrion/dbo.VoipHttpFtpOperationResults.md) |
| [`dbo.VoipIcmpPathJitterOperationStats`](tables/SolarWindsOrion/dbo.VoipIcmpPathJitterOperationStats.md) |
| [`dbo.VoipICMPPathMonthReport`](tables/SolarWindsOrion/dbo.VoipICMPPathMonthReport.md) |
| [`dbo.VoipICMPPathReport`](tables/SolarWindsOrion/dbo.VoipICMPPathReport.md) |
| [`dbo.VoIPInterface`](tables/SolarWindsOrion/dbo.VoIPInterface.md) |
| [`dbo.VoipJitterMosOperationResults`](tables/SolarWindsOrion/dbo.VoipJitterMosOperationResults.md) |
| [`dbo.VoipJitterOperationResults`](tables/SolarWindsOrion/dbo.VoipJitterOperationResults.md) |
| [`dbo.VoipLinkTestResults`](tables/SolarWindsOrion/dbo.VoipLinkTestResults.md) |
| [`dbo.VoipNodesAvailabilityReport`](tables/SolarWindsOrion/dbo.VoipNodesAvailabilityReport.md) |
| [`dbo.VoipNonMOSUdpJitterOperationStats`](tables/SolarWindsOrion/dbo.VoipNonMOSUdpJitterOperationStats.md) |
| [`dbo.VoipNonPathOperationStats`](tables/SolarWindsOrion/dbo.VoipNonPathOperationStats.md) |
| [`dbo.VoipOneWayDelayOperationResults`](tables/SolarWindsOrion/dbo.VoipOneWayDelayOperationResults.md) |
| [`dbo.VoipOperationAvailability`](tables/SolarWindsOrion/dbo.VoipOperationAvailability.md) |
| [`dbo.VoipOperationInstancesSupport21`](tables/SolarWindsOrion/dbo.VoipOperationInstancesSupport21.md) |
| [`dbo.VoIPOperations`](tables/SolarWindsOrion/dbo.VoIPOperations.md) |
| [`dbo.VoipOperationsICMPEcho`](tables/SolarWindsOrion/dbo.VoipOperationsICMPEcho.md) |
| [`dbo.VoipOperationsUDPEcho`](tables/SolarWindsOrion/dbo.VoipOperationsUDPEcho.md) |
| [`dbo.VoipPathHopOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoipPathHopOperationCurrentStats.md) |
| [`dbo.VoipPhoneQualityAggregate1Hour`](tables/SolarWindsOrion/dbo.VoipPhoneQualityAggregate1Hour.md) |
| [`dbo.VoipPhoneQualityAggregate30Mins`](tables/SolarWindsOrion/dbo.VoipPhoneQualityAggregate30Mins.md) |
| [`dbo.VoipQoS`](tables/SolarWindsOrion/dbo.VoipQoS.md) |
| [`dbo.VoipRegionQualityAggregate1Hour`](tables/SolarWindsOrion/dbo.VoipRegionQualityAggregate1Hour.md) |
| [`dbo.VoipRegionQualityAggregate30Mins`](tables/SolarWindsOrion/dbo.VoipRegionQualityAggregate30Mins.md) |
| [`dbo.VoipTestInstance`](tables/SolarWindsOrion/dbo.VoipTestInstance.md) |
| [`dbo.VoipUdpJitterOperationStats`](tables/SolarWindsOrion/dbo.VoipUdpJitterOperationStats.md) |
| [`dbo.VolumePerformance`](tables/SolarWindsOrion/dbo.VolumePerformance.md) |
| [`dbo.VolumesPercentDiskUsedForecastCapacity`](tables/SolarWindsOrion/dbo.VolumesPercentDiskUsedForecastCapacity.md) |
| [`dbo.VolumeUsageByDays`](tables/SolarWindsOrion/dbo.VolumeUsageByDays.md) |
| [`dbo.VW_VoipLinks`](tables/SolarWindsOrion/dbo.VW_VoipLinks.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.CiscoBuffersByDaysFnc` | INLINE TABLE FUNCTION |
| `dbo.cortex_GetNextId` | PROCEDURE |
| `dbo.Cortex_SlidePartitionedView` | PROCEDURE |
| `dbo.CPULoadByDaysFnc` | INLINE TABLE FUNCTION |
| `dbo.DateAndHalfHoursOnly` | SCALAR FUNCTION |
| `dbo.DateAndHourOnlyInline` | INLINE TABLE FUNCTION |
| `dbo.DateTime` | SCALAR FUNCTION |
| `dbo.DayOfWeek` | SCALAR FUNCTION |
| `dbo.dbm_Actions_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_AlertHistory_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_AlertHistory_DeleteStale` | PROCEDURE |
| `dbo.dbm_AlertLog_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_AlertLog_DeleteStale` | PROCEDURE |
| `dbo.dbm_AuditingArguments_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_AuditingEvents_DeleteStale` | PROCEDURE |
| `dbo.dbm_BeginMaintenance` | PROCEDURE |
| `dbo.dbm_CiscoBuffers_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_CiscoBuffers_DeleteStale` | PROCEDURE |
| `dbo.dbm_CiscoBuffers_DetailToHourly` | PROCEDURE |
| `dbo.dbm_CiscoBuffers_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_Containers_DeleteStale` | PROCEDURE |
| `dbo.dbm_Containers_DetailToHourly` | PROCEDURE |
| `dbo.dbm_Containers_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_CoreDependencies_DeleteOrphanGroups` | PROCEDURE |
| `dbo.dbm_CoreDependencies_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_CPULoad_DailyToForecastCoefficients` | PROCEDURE |
| `dbo.dbm_CPULoad_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_CPULoad_DeleteStale` | PROCEDURE |
| `dbo.dbm_CPULoad_DetailToHourly` | PROCEDURE |
| `dbo.dbm_CPULoad_DetailToStatistics` | PROCEDURE |
| `dbo.dbm_CPULoad_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_CPUMultiLoad_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_CPUMultiLoad_DeleteStale` | PROCEDURE |
| `dbo.dbm_CPUMultiLoad_DetailToHourly` | PROCEDURE |
| `dbo.dbm_CPUMultiLoad_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_CPUMultiLoadCurrent_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_DeleteFromDeletedNodes` | PROCEDURE |
| `dbo.dbm_DeleteFromDeletedVolumes` | PROCEDURE |
| `dbo.dbm_DiscoveredTopologyData_DeleteStale` | PROCEDURE |
| `dbo.dbm_Discovery_Maintenance` | PROCEDURE |
| `dbo.dbm_DowntimeMonitoringHistory_DeleteStale` | PROCEDURE |
| `dbo.dbm_EndMaintenance` | PROCEDURE |
| `dbo.dbm_EngineProperties_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_Events_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_Events_DeleteStale` | PROCEDURE |
| `dbo.dbm_Forecast_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_GetNetworkElements` | PROCEDURE |
| `dbo.dbm_HA_Audit_DeleteStale` | PROCEDURE |
| `dbo.dbm_Licensing_LicenseRefreshJournal_RemoveStale` | PROCEDURE |
| `dbo.dbm_LoadAverage_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_LoadAverage_DeleteStale` | PROCEDURE |
| `dbo.dbm_LoadAverage_DetailToHourly` | PROCEDURE |
| `dbo.dbm_LoadAverage_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_LoginNonce_Clean` | PROCEDURE |
| `dbo.dbm_MaintenancePlanAssignments_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_MaintenancePlans_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_MemoryMultiLoad_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_MemoryMultiLoad_DeleteStale` | PROCEDURE |
| `dbo.dbm_MemoryMultiLoad_DetailToHourly` | PROCEDURE |
| `dbo.dbm_MemoryMultiLoad_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_MemoryMultiLoadCurrent_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_NodeExtraTables_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_NodeMACAddresses_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_Nodes_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_NotificationItems_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_NotificationItems_DeleteStale` | PROCEDURE |
| `dbo.dbm_Orphaned_Frequencies_Clean` | PROCEDURE |
| `dbo.dbm_PartitionErrors_DeleteStale` | PROCEDURE |
| `dbo.dbm_Pollers_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_ReportJobUrls_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_ResponseTime_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_ResponseTime_DeleteStale` | PROCEDURE |
| `dbo.dbm_ResponseTime_DetailToHourly` | PROCEDURE |
| `dbo.dbm_ResponseTime_DetailToStatistics` | PROCEDURE |
| `dbo.dbm_ResponseTime_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_SettingUpdateTimestamp_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_ShadowNodes_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_ShrinkDatabase` | PROCEDURE |
| `dbo.dbm_SNI_AlertIncidents_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_SyslogMessages_DeleteStale` | PROCEDURE |
| `dbo.dbm_Thresholds_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_TopologyPollingTables_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_TrapMessages_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipCCM_AcmNameUpdate` | PROCEDURE |
| `dbo.dbm_VoipCCMPhoneStats_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipCCMPhoneStats_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipCCMPhoneStats_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkCallActivity_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkCallActivity_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkCallActivity_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkCallActivityInsert` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkDestinationsInsertUpdate` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkInsertUpdate` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkStatus_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkStatus_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkStatus_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipCCMSipTrunkStatusInsert` | PROCEDURE |
| `dbo.dbm_VoipCCMStats_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipCCMStats_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipCCMStats_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipDeletePolledData` | PROCEDURE |
| `dbo.dbm_VoipGatewayStats_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipGatewayStats_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipGatewayStats_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipGetRetentionDate` | PROCEDURE |
| `dbo.dbm_VoipOperationResults_DeleteOrphanedData` | PROCEDURE |
| `dbo.dbm_VoipOperationResults_DeleteStale` | PROCEDURE |
| `dbo.dbm_VoipOperationResults_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VoipOperationResults_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_VoipPathHopOperationHistoryResults_UpdateMainData` | PROCEDURE |
| `dbo.dbm_VoipRemovedDeletedData` | PROCEDURE |
| `dbo.dbm_VoipSetDefaultCCMMonitoringType` | PROCEDURE |
| `dbo.dbm_VoipSetDefaultCCMStatsType` | PROCEDURE |
| `dbo.dbm_VoipShrinkDatabase` | PROCEDURE |
| `dbo.dbm_VolumeForecast_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_VolumePerformance_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_VolumePerformance_DeleteStale` | PROCEDURE |
| `dbo.dbm_VolumePerformance_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VolumePerformance_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_Volumes_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_VolumeUsage_DailyToForecastCoefficients` | PROCEDURE |
| `dbo.dbm_VolumeUsage_DeleteOrphans` | PROCEDURE |
| `dbo.dbm_VolumeUsage_DeleteStale` | PROCEDURE |
| `dbo.dbm_VolumeUsage_DetailToHourly` | PROCEDURE |
| `dbo.dbm_VolumeUsage_HourlyToDaily` | PROCEDURE |
| `dbo.dbm_WebUserSettings_DeleteOrphans` | PROCEDURE |
| `dbo.GetAgentManagementPackageDbVersion` | SCALAR FUNCTION |
| `dbo.GetCoreDbVersion` | SCALAR FUNCTION |
| `dbo.GetMapsDbVersion` | SCALAR FUNCTION |
| `dbo.GetPCUDbVersion` | SCALAR FUNCTION |
| `dbo.GetPerfStackDbVersion` | SCALAR FUNCTION |
| `dbo.GetVoipDbVersion` | SCALAR FUNCTION |
| `dbo.GUIDToIPAddress` | SCALAR FUNCTION |
| `dbo.MakeSortable` | SCALAR FUNCTION |
| `dbo.NPM_Greatest` | SCALAR FUNCTION |
| `dbo.NPM_Smallest` | SCALAR FUNCTION |
| `dbo.ResponseTimeByDaysFnc` | INLINE TABLE FUNCTION |
| `dbo.sw_FormatString` | SCALAR FUNCTION |
| `dbo.sw_NormalizeLongitude` | SCALAR FUNCTION |
| `dbo.sw_ParseNetObjectID` | SCALAR FUNCTION |
| `dbo.sw_ParseNetObjectType` | SCALAR FUNCTION |
| `dbo.sw_UpgradeChart` | PROCEDURE |
| `dbo.SWA_InstallationSession_Create` | PROCEDURE |
| `dbo.swsp_AckMessage` | PROCEDURE |
| `dbo.swsp_AddViewToGroup` | PROCEDURE |
| `dbo.swsp_AssignMenuBarToUsers` | PROCEDURE |
| `dbo.swsp_ChangeCPSizeToMax` | PROCEDURE |
| `dbo.swsp_ChangeToUnicode` | PROCEDURE |
| `dbo.swsp_CheckData` | PROCEDURE |
| `dbo.swsp_CloneGroupAccountToVirtual` | PROCEDURE |
| `dbo.swsp_CloneView` | PROCEDURE |
| `dbo.swsp_CloneViewContents` | PROCEDURE |
| `dbo.swsp_CreateCoreTab` | PROCEDURE |
| `dbo.swsp_CreateIndex` | PROCEDURE |
| `dbo.swsp_CreateTab` | PROCEDURE |
| `dbo.swsp_DeleteAction` | PROCEDURE |
| `dbo.swsp_DeleteActionsByAssignments` | PROCEDURE |
| `dbo.swsp_DeleteLimitationType` | PROCEDURE |
| `dbo.swsp_DeleteNode` | PROCEDURE |
| `dbo.swsp_DeleteVolume` | PROCEDURE |
| `dbo.swsp_DependencyUpsert` | PROCEDURE |
| `dbo.swsp_DisableTabs` | PROCEDURE |
| `dbo.swsp_DropColumn` | PROCEDURE |
| `dbo.swsp_DropIndex` | PROCEDURE |
| `dbo.swsp_DropOldDiscoveryTables` | PROCEDURE |
| `dbo.swsp_GetSQLServerLogsEx` | PROCEDURE |
| `dbo.swsp_GetUpdEngineID` | PROCEDURE |
| `dbo.swsp_IndexPattern_AddIndexExclude` | PROCEDURE |
| `dbo.swsp_IndexPattern_AddIndexInclude` | PROCEDURE |
| `dbo.swsp_IndexPattern_AddTableExclude` | PROCEDURE |
| `dbo.swsp_IndexPattern_AddTableInclude` | PROCEDURE |
| `dbo.swsp_InsertOrUpdateAuditingType` | PROCEDURE |
| `dbo.swsp_MapOrionServersToNodes` | PROCEDURE |
| `dbo.swsp_Merge_LimitationSnapshots_EntitySet` | PROCEDURE |
| `dbo.swsp_Node_GetAvailability` | PROCEDURE |
| `dbo.swsp_RecreateViewNodes` | PROCEDURE |
| `dbo.swsp_ReflowAllNodeChildStatus` | PROCEDURE |
| `dbo.swsp_SetNodeChildStatus` | PROCEDURE |
| `dbo.swsp_SetNodeChildStatusParticipation` | PROCEDURE |
| `dbo.swsp_SetNodeTopologyThrottlingDelay` | PROCEDURE |
| `dbo.swsp_UpdateAccountIdOrSid` | PROCEDURE |
| `dbo.swsp_UpdateAccounts` | PROCEDURE |
| `dbo.swsp_UpdateContainersUris` | PROCEDURE |
| `dbo.swsp_UpdateDependenciesUris` | PROCEDURE |
| `dbo.swsp_UpdateEngineProperty` | PROCEDURE |
| `dbo.swsp_UpdateGuidForMenuItem` | PROCEDURE |
| `dbo.swsp_UpdatePollingCapacityStatistics` | PROCEDURE |
| `dbo.swsp_UpdateResourcePosition` | PROCEDURE |
| `dbo.swsp_UpdateStatusLED` | PROCEDURE |
| `dbo.TimeOnly` | SCALAR FUNCTION |
| `dbo.TimeSpan` | SCALAR FUNCTION |
| `dbo.TimeSpanUnits` | SCALAR FUNCTION |
| `dbo.tmp_IsStillTable` | PROCEDURE |
| `dbo.tmp_PartitionHistoryTable` | PROCEDURE |
| `dbo.upgrade_Events_FinishNow` | PROCEDURE |
| `dbo.upgrade_Events_LazyUpdate` | PROCEDURE |
| `dbo.upgrade_Events_NewTable` | PROCEDURE |
| `dbo.upgrade_Events_Progress` | PROCEDURE |
| `dbo.upgrade_Events_UpdateRequest` | PROCEDURE |
| `dbo.upgrade_Events_UpgradeNeeded` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_FinishNow` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_LazyUpdate` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_NewTable` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_NewTablePost` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_Progress` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_UpdateRequest` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_UpdateType` | PROCEDURE |
| `dbo.upgrade_NetObjectDownTime_UpgradeNeeded` | PROCEDURE |
| `dbo.upgrade_SysLog_FinishNow` | PROCEDURE |
| `dbo.upgrade_SysLog_LazyUpdate` | PROCEDURE |
| `dbo.upgrade_SysLog_NewTable` | PROCEDURE |
| `dbo.upgrade_SysLog_NewTablePost` | PROCEDURE |
| `dbo.upgrade_SysLog_Progress` | PROCEDURE |
| `dbo.upgrade_SysLog_UpdateRequest` | PROCEDURE |
| `dbo.upgrade_SysLog_UpdateType` | PROCEDURE |
| `dbo.upgrade_SysLog_UpgradeNeeded` | PROCEDURE |
| `dbo.upgrade_Traps_FinishNow` | PROCEDURE |
| `dbo.upgrade_Traps_LazyUpdate` | PROCEDURE |
| `dbo.upgrade_Traps_NewTable` | PROCEDURE |
| `dbo.upgrade_Traps_NewTablePost` | PROCEDURE |
| `dbo.upgrade_Traps_Progress` | PROCEDURE |
| `dbo.upgrade_Traps_UpdateRequest` | PROCEDURE |
| `dbo.upgrade_Traps_UpdateType` | PROCEDURE |
| `dbo.upgrade_Traps_UpgradeNeeded` | PROCEDURE |
| `dbo.UriEquals` | SCALAR FUNCTION |
| `dbo.voip_GetIPAddressFromInt` | SCALAR FUNCTION |
| `dbo.voip_IsMacAddressValid` | SCALAR FUNCTION |
| `dbo.voip_NumberTable` | TABLE FUNCTION |
| `dbo.VolumeUsageByDaysFnc` | INLINE TABLE FUNCTION |
| `dbo.web_CreateWebResource` | PROCEDURE |
| `dbo.web_CreateWebView` | PROCEDURE |
| `dbo.web_CreateWebViewGroup` | PROCEDURE |

## `test`

### Orphan tables

_None — all tables participate in at least one FK relationship._

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `VendorBids`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.bidcalendaritems`](tables/VendorBids/dbo.bidcalendaritems.md) | 1664090 |
| [`dbo.biddocumentacks`](tables/VendorBids/dbo.biddocumentacks.md) | 18 |
| [`dbo.BidDocumentLog`](tables/VendorBids/dbo.BidDocumentLog.md) | 26 |
| [`dbo.biddocuments`](tables/VendorBids/dbo.biddocuments.md) | 175741 |
| [`dbo.BidManagers`](tables/VendorBids/dbo.BidManagers.md) | 0 |
| [`dbo.BidSchedule`](tables/VendorBids/dbo.BidSchedule.md) | 1633 |
| [`dbo.BidScheduleCats`](tables/VendorBids/dbo.BidScheduleCats.md) | 3111 |
| [`dbo.Categories`](tables/VendorBids/dbo.Categories.md) | 63 |
| [`dbo.Cooperatives`](tables/VendorBids/dbo.Cooperatives.md) | 15 |
| [`dbo.debugmsgs`](tables/VendorBids/dbo.debugmsgs.md) | 58541 |
| [`dbo.DocumentUploads`](tables/VendorBids/dbo.DocumentUploads.md) | 144910 |
| [`dbo.DownloadLog`](tables/VendorBids/dbo.DownloadLog.md) | 426088 |
| [`dbo.Regcalendar`](tables/VendorBids/dbo.Regcalendar.md) | 631808 |
| [`dbo.regcalsaved`](tables/VendorBids/dbo.regcalsaved.md) | 998 |
| [`dbo.regusers`](tables/VendorBids/dbo.regusers.md) | 13383 |
| [`dbo.SavedRegCal`](tables/VendorBids/dbo.SavedRegCal.md) | 42471 |
| [`dbo.States`](tables/VendorBids/dbo.States.md) | 2 |
| [`dbo.statustable`](tables/VendorBids/dbo.statustable.md) | 2 |
| [`dbo.sysdiagrams`](tables/VendorBids/dbo.sysdiagrams.md) | 1 |
| [`dbo.testrc`](tables/VendorBids/dbo.testrc.md) | 2117 |
| [`dbo.TransmitLog`](tables/VendorBids/dbo.TransmitLog.md) | 5882 |
| [`dbo.TypeFilters`](tables/VendorBids/dbo.TypeFilters.md) | 3 |
| [`dbo.vendorbidimports`](tables/VendorBids/dbo.vendorbidimports.md) | 0 |
| [`dbo.vendorbiditemimports`](tables/VendorBids/dbo.vendorbiditemimports.md) | 0 |
| [`dbo.vendorbiditems`](tables/VendorBids/dbo.vendorbiditems.md) | 24495590 |
| [`dbo.VendorBidMSRPPriceRanges`](tables/VendorBids/dbo.VendorBidMSRPPriceRanges.md) | 537578 |
| [`dbo.VendorBidMSRPResults`](tables/VendorBids/dbo.VendorBidMSRPResults.md) | 141573 |
| [`dbo.VendorBidMSRPResultsJournal`](tables/VendorBids/dbo.VendorBidMSRPResultsJournal.md) | 141023 |
| [`dbo.VendorBidTMAnswers`](tables/VendorBids/dbo.VendorBidTMAnswers.md) | 695835 |
| [`dbo.VendorBidTMAnswersJournal`](tables/VendorBids/dbo.VendorBidTMAnswersJournal.md) | 695859 |
| [`dbo.VendorEmailLog`](tables/VendorBids/dbo.VendorEmailLog.md) | 804590 |

### Leaf views

| View |
|------|
| [`dbo.bidcalendardistricts`](tables/VendorBids/dbo.bidcalendardistricts.md) |
| [`dbo.BidDocumentsViewByUser`](tables/VendorBids/dbo.BidDocumentsViewByUser.md) |
| [`dbo.BidMgrVendorbidsForImport`](tables/VendorBids/dbo.BidMgrVendorbidsForImport.md) |
| [`dbo.BidMgrVendorEmailListView`](tables/VendorBids/dbo.BidMgrVendorEmailListView.md) |
| [`dbo.BidMgrVendorEmailLogCount`](tables/VendorBids/dbo.BidMgrVendorEmailLogCount.md) |
| [`dbo.CategoryView`](tables/VendorBids/dbo.CategoryView.md) |
| [`dbo.cfv_vendorbidsview`](tables/VendorBids/dbo.cfv_vendorbidsview.md) |
| [`dbo.filterCategories`](tables/VendorBids/dbo.filterCategories.md) |
| [`dbo.filterStates`](tables/VendorBids/dbo.filterStates.md) |
| [`dbo.filterStatuses`](tables/VendorBids/dbo.filterStatuses.md) |
| [`dbo.usersView`](tables/VendorBids/dbo.usersView.md) |
| [`dbo.VendorBidLookup`](tables/VendorBids/dbo.VendorBidLookup.md) |
| [`dbo.vendorbidsforimport`](tables/VendorBids/dbo.vendorbidsforimport.md) |
| [`dbo.vendorbidsList`](tables/VendorBids/dbo.vendorbidsList.md) |
| [`dbo.vendorbidsview`](tables/VendorBids/dbo.vendorbidsview.md) |
| [`dbo.vendordocumentsviewByUser`](tables/VendorBids/dbo.vendordocumentsviewByUser.md) |
| [`dbo.vw_DocumentUploads`](tables/VendorBids/dbo.vw_DocumentUploads.md) |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids/dbo.vw_UploadedDocuments.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.sp_AcknowledgeBidDocument` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_AttemptLogin` | PROCEDURE |
| `dbo.sp_CreateBidDocumentAck` | PROCEDURE |
| `dbo.sp_createBidItemsJournalEntry` | PROCEDURE |
| `dbo.sp_CreateBidJournalEntry` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_CreateNewBid` | PROCEDURE |
| `dbo.sp_CreateVendorSession` | PROCEDURE |
| `dbo.sp_DeleteBid` | PROCEDURE |
| `dbo.sp_DeleteBidCalendar` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_ImportBid` | PROCEDURE |
| `dbo.sp_ImportBidItem` | PROCEDURE |
| `dbo.sp_LogBidDocumentDownload` | PROCEDURE |
| `dbo.sp_LogDownload` | PROCEDURE |
| `dbo.sp_NewVendorBid` | PROCEDURE |
| `dbo.sp_ProcessBid` | PROCEDURE |
| `dbo.sp_RegDistrictsUpdate` | PROCEDURE |
| `dbo.sp_RegistrationsUpdate` | PROCEDURE |
| `dbo.sp_RegStatesUpdate` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_SubDistrictsUpdate` | PROCEDURE |
| `dbo.sp_SubmitBid` | PROCEDURE |
| `dbo.sp_SubmitBidwDate` | PROCEDURE |
| `dbo.sp_SubStatesUpdate` | PROCEDURE |
| `dbo.sp_UnDeleteBid` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.sp_VBUpload` | PROCEDURE |
| `dbo.sp_VBUploadItem` | PROCEDURE |
| `dbo.sp_VBUploadXML` | PROCEDURE |
| `dbo.sp_VBUploadXMLSaved` | PROCEDURE |
| `dbo.sp_VBUploadXMLTest` | PROCEDURE |
| `dbo.sp_VendorBidItemMaint` | PROCEDURE |
| `dbo.sp_VendorBiditemsView` | PROCEDURE |
| `dbo.sp_VendorBiditemsViewReport` | PROCEDURE |
| `dbo.sp_VendorBidMaint` | PROCEDURE |
| `dbo.sp_VendorBidsView` | PROCEDURE |
| `dbo.uf_BidCategories` | SCALAR FUNCTION |
| `dbo.uf_vendorbidanswersview` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbiditemsimportview` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbiditemsviewDiscounted` | INLINE TABLE FUNCTION |
| `dbo.uf_VendorBidMSRPResultsView` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbidsviewDiscounted` | INLINE TABLE FUNCTION |
| `dbo.usp_ReturnBidDocumentStatus` | PROCEDURE |

## `VendorBids_TEST`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.bidcalendaritems`](tables/VendorBids_TEST/dbo.bidcalendaritems.md) | 1642206 |
| [`dbo.biddocumentacks`](tables/VendorBids_TEST/dbo.biddocumentacks.md) | 18 |
| [`dbo.BidDocumentLog`](tables/VendorBids_TEST/dbo.BidDocumentLog.md) | 26 |
| [`dbo.biddocuments`](tables/VendorBids_TEST/dbo.biddocuments.md) | 169971 |
| [`dbo.BidManagers`](tables/VendorBids_TEST/dbo.BidManagers.md) | 0 |
| [`dbo.BidSchedule`](tables/VendorBids_TEST/dbo.BidSchedule.md) | 1587 |
| [`dbo.BidScheduleCats`](tables/VendorBids_TEST/dbo.BidScheduleCats.md) | 3040 |
| [`dbo.Categories`](tables/VendorBids_TEST/dbo.Categories.md) | 63 |
| [`dbo.Cooperatives`](tables/VendorBids_TEST/dbo.Cooperatives.md) | 15 |
| [`dbo.debugmsgs`](tables/VendorBids_TEST/dbo.debugmsgs.md) | 53556 |
| [`dbo.DocumentUploads`](tables/VendorBids_TEST/dbo.DocumentUploads.md) | 133029 |
| [`dbo.DownloadLog`](tables/VendorBids_TEST/dbo.DownloadLog.md) | 418063 |
| [`dbo.Regcalendar`](tables/VendorBids_TEST/dbo.Regcalendar.md) | 616829 |
| [`dbo.regcalsaved`](tables/VendorBids_TEST/dbo.regcalsaved.md) | 998 |
| [`dbo.regusers`](tables/VendorBids_TEST/dbo.regusers.md) | 13111 |
| [`dbo.SavedRegCal`](tables/VendorBids_TEST/dbo.SavedRegCal.md) | 42471 |
| [`dbo.States`](tables/VendorBids_TEST/dbo.States.md) | 2 |
| [`dbo.statustable`](tables/VendorBids_TEST/dbo.statustable.md) | 2 |
| [`dbo.sysdiagrams`](tables/VendorBids_TEST/dbo.sysdiagrams.md) | 1 |
| [`dbo.testrc`](tables/VendorBids_TEST/dbo.testrc.md) | 2117 |
| [`dbo.TransmitLog`](tables/VendorBids_TEST/dbo.TransmitLog.md) | 4275 |
| [`dbo.TypeFilters`](tables/VendorBids_TEST/dbo.TypeFilters.md) | 3 |
| [`dbo.vendorbidimports`](tables/VendorBids_TEST/dbo.vendorbidimports.md) | 0 |
| [`dbo.vendorbiditemimports`](tables/VendorBids_TEST/dbo.vendorbiditemimports.md) | 0 |
| [`dbo.vendorbiditems`](tables/VendorBids_TEST/dbo.vendorbiditems.md) | 24207430 |
| [`dbo.VendorBidMSRPPriceRanges`](tables/VendorBids_TEST/dbo.VendorBidMSRPPriceRanges.md) | 522585 |
| [`dbo.VendorBidMSRPResults`](tables/VendorBids_TEST/dbo.VendorBidMSRPResults.md) | 138158 |
| [`dbo.VendorBidMSRPResultsJournal`](tables/VendorBids_TEST/dbo.VendorBidMSRPResultsJournal.md) | 137608 |
| [`dbo.VendorBidTMAnswers`](tables/VendorBids_TEST/dbo.VendorBidTMAnswers.md) | 671619 |
| [`dbo.VendorBidTMAnswersJournal`](tables/VendorBids_TEST/dbo.VendorBidTMAnswersJournal.md) | 671643 |
| [`dbo.VendorEmailLog`](tables/VendorBids_TEST/dbo.VendorEmailLog.md) | 778732 |

### Leaf views

| View |
|------|
| [`dbo.bidcalendardistricts`](tables/VendorBids_TEST/dbo.bidcalendardistricts.md) |
| [`dbo.BidDocumentsViewByUser`](tables/VendorBids_TEST/dbo.BidDocumentsViewByUser.md) |
| [`dbo.BidMgrVendorbidsForImport`](tables/VendorBids_TEST/dbo.BidMgrVendorbidsForImport.md) |
| [`dbo.BidMgrVendorEmailListView`](tables/VendorBids_TEST/dbo.BidMgrVendorEmailListView.md) |
| [`dbo.BidMgrVendorEmailLogCount`](tables/VendorBids_TEST/dbo.BidMgrVendorEmailLogCount.md) |
| [`dbo.CategoryView`](tables/VendorBids_TEST/dbo.CategoryView.md) |
| [`dbo.cfv_vendorbidsview`](tables/VendorBids_TEST/dbo.cfv_vendorbidsview.md) |
| [`dbo.filterCategories`](tables/VendorBids_TEST/dbo.filterCategories.md) |
| [`dbo.filterStates`](tables/VendorBids_TEST/dbo.filterStates.md) |
| [`dbo.filterStatuses`](tables/VendorBids_TEST/dbo.filterStatuses.md) |
| [`dbo.usersView`](tables/VendorBids_TEST/dbo.usersView.md) |
| [`dbo.VendorBidLookup`](tables/VendorBids_TEST/dbo.VendorBidLookup.md) |
| [`dbo.vendorbidsforimport`](tables/VendorBids_TEST/dbo.vendorbidsforimport.md) |
| [`dbo.vendorbidsList`](tables/VendorBids_TEST/dbo.vendorbidsList.md) |
| [`dbo.vendorbidsview`](tables/VendorBids_TEST/dbo.vendorbidsview.md) |
| [`dbo.vendordocumentsviewByUser`](tables/VendorBids_TEST/dbo.vendordocumentsviewByUser.md) |
| [`dbo.vw_DocumentUploads`](tables/VendorBids_TEST/dbo.vw_DocumentUploads.md) |
| [`dbo.vw_UploadedDocuments`](tables/VendorBids_TEST/dbo.vw_UploadedDocuments.md) |

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.fn_diagramobjects` | SCALAR FUNCTION |
| `dbo.sp_AcknowledgeBidDocument` | PROCEDURE |
| `dbo.sp_alterdiagram` | PROCEDURE |
| `dbo.sp_AttemptLogin` | PROCEDURE |
| `dbo.sp_CreateBidDocumentAck` | PROCEDURE |
| `dbo.sp_createBidItemsJournalEntry` | PROCEDURE |
| `dbo.sp_CreateBidJournalEntry` | PROCEDURE |
| `dbo.sp_creatediagram` | PROCEDURE |
| `dbo.sp_CreateNewBid` | PROCEDURE |
| `dbo.sp_CreateVendorSession` | PROCEDURE |
| `dbo.sp_DeleteBid` | PROCEDURE |
| `dbo.sp_DeleteBidCalendar` | PROCEDURE |
| `dbo.sp_dropdiagram` | PROCEDURE |
| `dbo.sp_helpdiagramdefinition` | PROCEDURE |
| `dbo.sp_helpdiagrams` | PROCEDURE |
| `dbo.sp_ImportBid` | PROCEDURE |
| `dbo.sp_ImportBidItem` | PROCEDURE |
| `dbo.sp_LogBidDocumentDownload` | PROCEDURE |
| `dbo.sp_LogDownload` | PROCEDURE |
| `dbo.sp_NewVendorBid` | PROCEDURE |
| `dbo.sp_ProcessBid` | PROCEDURE |
| `dbo.sp_RegDistrictsUpdate` | PROCEDURE |
| `dbo.sp_RegistrationsUpdate` | PROCEDURE |
| `dbo.sp_RegStatesUpdate` | PROCEDURE |
| `dbo.sp_renamediagram` | PROCEDURE |
| `dbo.sp_SubDistrictsUpdate` | PROCEDURE |
| `dbo.sp_SubmitBid` | PROCEDURE |
| `dbo.sp_SubmitBidwDate` | PROCEDURE |
| `dbo.sp_SubStatesUpdate` | PROCEDURE |
| `dbo.sp_UnDeleteBid` | PROCEDURE |
| `dbo.sp_upgraddiagrams` | PROCEDURE |
| `dbo.sp_VBUpload` | PROCEDURE |
| `dbo.sp_VBUploadItem` | PROCEDURE |
| `dbo.sp_VBUploadXML` | PROCEDURE |
| `dbo.sp_VBUploadXMLSaved` | PROCEDURE |
| `dbo.sp_VBUploadXMLTest` | PROCEDURE |
| `dbo.sp_VendorBidItemMaint` | PROCEDURE |
| `dbo.sp_VendorBiditemsView` | PROCEDURE |
| `dbo.sp_VendorBiditemsViewReport` | PROCEDURE |
| `dbo.sp_VendorBidMaint` | PROCEDURE |
| `dbo.sp_VendorBidsView` | PROCEDURE |
| `dbo.uf_BidCategories` | SCALAR FUNCTION |
| `dbo.uf_vendorbidanswersview` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbiditemsimportview` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbiditemsviewDiscounted` | INLINE TABLE FUNCTION |
| `dbo.uf_VendorBidMSRPResultsView` | INLINE TABLE FUNCTION |
| `dbo.uf_vendorbidsviewDiscounted` | INLINE TABLE FUNCTION |
| `dbo.usp_ReturnBidDocumentStatus` | PROCEDURE |

## `work`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Districtb4Incidentals`](tables/work/dbo.Districtb4Incidentals.md) | 72 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

_None — all routines are referenced by at least one SQL object._

## `WorkTables`

### Orphan tables

| Table | Approx rows |
|-------|-------------|
| [`dbo.Amazon Staples List`](tables/WorkTables/dbo.Amazon_Staples_List.md) | 648 |
| [`dbo.AngelaEmails`](tables/WorkTables/dbo.AngelaEmails.md) | 100 |
| [`dbo.Athletic Prebid 2018`](tables/WorkTables/dbo.Athletic_Prebid_2018.md) | 273 |
| [`dbo.Athletic Prebid 2019`](tables/WorkTables/dbo.Athletic_Prebid_2019.md) | 89 |
| [`dbo.Athletic Prebid 2020`](tables/WorkTables/dbo.Athletic_Prebid_2020.md) | 208 |
| [`dbo.Athletic Prebid 2021`](tables/WorkTables/dbo.Athletic_Prebid_2021.md) | 131 |
| [`dbo.Athletic Prebid 2022`](tables/WorkTables/dbo.Athletic_Prebid_2022.md) | 199 |
| [`dbo.Athletic Prebid 2023`](tables/WorkTables/dbo.Athletic_Prebid_2023.md) | 85 |
| [`dbo.Athletic Prebid 2024`](tables/WorkTables/dbo.Athletic_Prebid_2024.md) | 173 |
| [`dbo.Athletic Prebid 2026`](tables/WorkTables/dbo.Athletic_Prebid_2026.md) | 63 |
| [`dbo.AvantorShipping`](tables/WorkTables/dbo.AvantorShipping.md) | 4783 |
| [`dbo.badContinuances`](tables/WorkTables/dbo.badContinuances.md) | 54 |
| [`dbo.BB Missing Downloads`](tables/WorkTables/dbo.BB_Missing_Downloads.md) | 49 |
| [`dbo.Becker Account Codes`](tables/WorkTables/dbo.Becker_Account_Codes.md) | 676 |
| [`dbo.Bid 13264`](tables/WorkTables/dbo.Bid_13264.md) | 13508 |
| [`dbo.Bid11384`](tables/WorkTables/dbo.Bid11384.md) | 1997 |
| [`dbo.Bid11390`](tables/WorkTables/dbo.Bid11390.md) | 1998 |
| [`dbo.Bid11391`](tables/WorkTables/dbo.Bid11391.md) | 1997 |
| [`dbo.Bid11392`](tables/WorkTables/dbo.Bid11392.md) | 2500 |
| [`dbo.Bid13449b4reset`](tables/WorkTables/dbo.Bid13449b4reset.md) | 2175 |
| [`dbo.bid9334bri`](tables/WorkTables/dbo.bid9334bri.md) | 748 |
| [`dbo.Bid9334dels`](tables/WorkTables/dbo.Bid9334dels.md) | 167 |
| [`dbo.bid9339bri`](tables/WorkTables/dbo.bid9339bri.md) | 369 |
| [`dbo.Bid9339dels`](tables/WorkTables/dbo.Bid9339dels.md) | 61 |
| [`dbo.Bid9993Detail`](tables/WorkTables/dbo.Bid9993Detail.md) | 2467 |
| [`dbo.BidHeaderDetail`](tables/WorkTables/dbo.BidHeaderDetail.md) | 29454 |
| [`dbo.BidItemsb4StaplesUpdate`](tables/WorkTables/dbo.BidItemsb4StaplesUpdate.md) | 27 |
| [`dbo.Bill2021`](tables/WorkTables/dbo.Bill2021.md) | 695 |
| [`dbo.BioCorpNoBids`](tables/WorkTables/dbo.BioCorpNoBids.md) | 6556 |
| [`dbo.Blick 12270`](tables/WorkTables/dbo.Blick_12270.md) | 48115 |
| [`dbo.Blick 24 District List`](tables/WorkTables/dbo.Blick_24_District_List.md) | 273 |
| [`dbo.Blick 24 School List`](tables/WorkTables/dbo.Blick_24_School_List.md) | 1393 |
| [`dbo.BlickNJ23`](tables/WorkTables/dbo.BlickNJ23.md) | 92652 |
| [`dbo.BlickNY23`](tables/WorkTables/dbo.BlickNY23.md) | 92567 |
| [`dbo.bri12916`](tables/WorkTables/dbo.bri12916.md) | 9875 |
| [`dbo.Canandaigua`](tables/WorkTables/dbo.Canandaigua.md) | 470 |
| [`dbo.Carolina Living Items`](tables/WorkTables/dbo.Carolina_Living_Items.md) | 2017 |
| [`dbo.Carolina Tariffs`](tables/WorkTables/dbo.Carolina_Tariffs.md) | 1079 |
| [`dbo.Carolina Tariffs Bid`](tables/WorkTables/dbo.Carolina_Tariffs_Bid.md) | 195 |
| [`dbo.Carolina Tariffs Usage`](tables/WorkTables/dbo.Carolina_Tariffs_Usage.md) | 484 |
| [`dbo.Carolina Tariffs xr`](tables/WorkTables/dbo.Carolina_Tariffs_xr.md) | 6432 |
| [`dbo.Carolina24`](tables/WorkTables/dbo.Carolina24.md) | 19177 |
| [`dbo.Cascade Bid Import`](tables/WorkTables/dbo.Cascade_Bid_Import.md) | 336 |
| [`dbo.Cascade Image Update`](tables/WorkTables/dbo.Cascade_Image_Update.md) | 9661 |
| [`dbo.Cascade ImageCorrections`](tables/WorkTables/dbo.Cascade_ImageCorrections.md) | 7748 |
| [`dbo.Cascade ImageFillIn`](tables/WorkTables/dbo.Cascade_ImageFillIn.md) | 3510 |
| [`dbo.Cascade ZZ 2022`](tables/WorkTables/dbo.Cascade_ZZ_2022.md) | 9615 |
| [`dbo.CascadeNY22`](tables/WorkTables/dbo.CascadeNY22.md) | 5230 |
| [`dbo.Category Descriptions`](tables/WorkTables/dbo.Category_Descriptions.md) | 49 |
| [`dbo.catList`](tables/WorkTables/dbo.catList.md) | 50 |
| [`dbo.census_Data`](tables/WorkTables/dbo.census_Data.md) | 3142 |
| [`dbo.Class`](tables/WorkTables/dbo.Class.md) | 3713 |
| [`dbo.Commodity`](tables/WorkTables/dbo.Commodity.md) | 46137 |
| [`dbo.CSV File for EDS POs`](tables/WorkTables/dbo.CSV_File_for_EDS_POs.md) | 5141 |
| [`dbo.d251ba`](tables/WorkTables/dbo.d251ba.md) | 1350 |
| [`dbo.d251ba2`](tables/WorkTables/dbo.d251ba2.md) | 454 |
| [`dbo.d251ba3`](tables/WorkTables/dbo.d251ba3.md) | 378 |
| [`dbo.d251ua`](tables/WorkTables/dbo.d251ua.md) | 1350 |
| [`dbo.Detailb4Update_021320202`](tables/WorkTables/dbo.Detailb4Update_021320202.md) | 606689 |
| [`dbo.Doubled 2019`](tables/WorkTables/dbo.Doubled_2019.md) | 41 |
| [`dbo.East Brunswick 26 PO Cross Reference`](tables/WorkTables/dbo.East_Brunswick_26_PO_Cross_Reference.md) | 1848 |
| [`dbo.East Brunswick POs`](tables/WorkTables/dbo.East_Brunswick_POs.md) | 1817 |
| [`dbo.EE2`](tables/WorkTables/dbo.EE2.md) | 394 |
| [`dbo.EEItemsB4Reproc`](tables/WorkTables/dbo.EEItemsB4Reproc.md) | 1077 |
| [`dbo.Essex Errors`](tables/WorkTables/dbo.Essex_Errors.md) | 146 |
| [`dbo.Family`](tables/WorkTables/dbo.Family.md) | 411 |
| [`dbo.Fees2020`](tables/WorkTables/dbo.Fees2020.md) | 631 |
| [`dbo.Fees2020ni`](tables/WorkTables/dbo.Fees2020ni.md) | 627 |
| [`dbo.FixItemsExisting`](tables/WorkTables/dbo.FixItemsExisting.md) | 1211 |
| [`dbo.FixItemsExisting1`](tables/WorkTables/dbo.FixItemsExisting1.md) | 1078 |
| [`dbo.FixItemsMissing`](tables/WorkTables/dbo.FixItemsMissing.md) | 1063 |
| [`dbo.Flaghouse 11708`](tables/WorkTables/dbo.Flaghouse_11708.md) | 8810 |
| [`dbo.Flaghouse 11720`](tables/WorkTables/dbo.Flaghouse_11720.md) | 8818 |
| [`dbo.Flaghouse 11722`](tables/WorkTables/dbo.Flaghouse_11722.md) | 3001 |
| [`dbo.Flaghouse 11783`](tables/WorkTables/dbo.Flaghouse_11783.md) | 8808 |
| [`dbo.Flaghouse 11784`](tables/WorkTables/dbo.Flaghouse_11784.md) | 8817 |
| [`dbo.Flaghouse 11786`](tables/WorkTables/dbo.Flaghouse_11786.md) | 3008 |
| [`dbo.FlagHouse Discontinues`](tables/WorkTables/dbo.FlagHouse_Discontinues.md) | 19122 |
| [`dbo.FlagHouse Items`](tables/WorkTables/dbo.FlagHouse_Items.md) | 41262 |
| [`dbo.Florida_COVID19_Case_Line_Data`](tables/WorkTables/dbo.Florida_COVID19_Case_Line_Data.md) | 75568 |
| [`dbo.FrozenNoBids`](tables/WorkTables/dbo.FrozenNoBids.md) | 1638 |
| [`dbo.General Supplies Discontinues 2022`](tables/WorkTables/dbo.General_Supplies_Discontinues_2022.md) | 1619 |
| [`dbo.Henry Schein`](tables/WorkTables/dbo.Henry_Schein.md) | 2807 |
| [`dbo.HI SKUs`](tables/WorkTables/dbo.HI_SKUs.md) | 7741 |
| [`dbo.HICKSVILLE`](tables/WorkTables/dbo.HICKSVILLE.md) | 514 |
| [`dbo.hmailserver_awstats`](tables/WorkTables/dbo.hmailserver_awstats.md) | 669246 |
| [`dbo.HPItems`](tables/WorkTables/dbo.HPItems.md) | 523 |
| [`dbo.HS2022`](tables/WorkTables/dbo.HS2022.md) | 1032 |
| [`dbo.Hurdat`](tables/WorkTables/dbo.Hurdat.md) | 0 |
| [`dbo.hurdat2`](tables/WorkTables/dbo.hurdat2.md) | 53733 |
| [`dbo.IISLogs`](tables/WorkTables/dbo.IISLogs.md) | 491178 |
| [`dbo.items`](tables/WorkTables/dbo.items.md) | 33 |
| [`dbo.Itemsb4StaplesUpdate`](tables/WorkTables/dbo.Itemsb4StaplesUpdate.md) | 77333 |
| [`dbo.Kurtz Codes`](tables/WorkTables/dbo.Kurtz_Codes.md) | 679 |
| [`dbo.Kurtz Codes 2`](tables/WorkTables/dbo.Kurtz_Codes_2.md) | 417 |
| [`dbo.Kurtz Issues`](tables/WorkTables/dbo.Kurtz_Issues.md) | 11 |
| [`dbo.Kurtz Missing`](tables/WorkTables/dbo.Kurtz_Missing.md) | 57 |
| [`dbo.LakeshoreFreeze`](tables/WorkTables/dbo.LakeshoreFreeze.md) | 420 |
| [`dbo.Lawrence Twp`](tables/WorkTables/dbo.Lawrence_Twp.md) | 322 |
| [`dbo.LBBlickItems`](tables/WorkTables/dbo.LBBlickItems.md) | 14 |
| [`dbo.Levittown`](tables/WorkTables/dbo.Levittown.md) | 910 |
| [`dbo.Lodi`](tables/WorkTables/dbo.Lodi.md) | 272 |
| [`dbo.Mamaroneck Music Items`](tables/WorkTables/dbo.Mamaroneck_Music_Items.md) | 846 |
| [`dbo.Mercer Construction`](tables/WorkTables/dbo.Mercer_Construction.md) | 311 |
| [`dbo.Mercer Cosmetology`](tables/WorkTables/dbo.Mercer_Cosmetology.md) | 303 |
| [`dbo.MidwestRocketryFreeze`](tables/WorkTables/dbo.MidwestRocketryFreeze.md) | 28 |
| [`dbo.MidwestTechnologyFreeze`](tables/WorkTables/dbo.MidwestTechnologyFreeze.md) | 674 |
| [`dbo.Millstone`](tables/WorkTables/dbo.Millstone.md) | 154 |
| [`dbo.Montville Users`](tables/WorkTables/dbo.Montville_Users.md) | 473 |
| [`dbo.Montville Users 240123`](tables/WorkTables/dbo.Montville_Users_240123.md) | 54 |
| [`dbo.Montville Users Before Update`](tables/WorkTables/dbo.Montville_Users_Before_Update.md) | 474 |
| [`dbo.MSMerge_contents`](tables/WorkTables/dbo.MSMerge_contents.md) | 4693660 |
| [`dbo.MSmerge_genHistory`](tables/WorkTables/dbo.MSmerge_genHistory.md) | 1 |
| [`dbo.Nasco 04232025 Update`](tables/WorkTables/dbo.Nasco_04232025_Update.md) | 45 |
| [`dbo.NascoMapping`](tables/WorkTables/dbo.NascoMapping.md) | 45 |
| [`dbo.Newburgh Music`](tables/WorkTables/dbo.Newburgh_Music.md) | 332 |
| [`dbo.NewVendorCodesFromSystems3000ForLongBranch`](tables/WorkTables/dbo.NewVendorCodesFromSystems3000ForLongBranch.md) | 4240 |
| [`dbo.No Bids with Catalog Entry`](tables/WorkTables/dbo.No_Bids_with_Catalog_Entry.md) | 745 |
| [`dbo.NullDescriptions`](tables/WorkTables/dbo.NullDescriptions.md) | 70631 |
| [`dbo.NY Office Preliminary Bid 13449 ODP exact`](tables/WorkTables/dbo.NY_Office_Preliminary_Bid_13449_ODP_exact.md) | 994 |
| [`dbo.NY State Contract 2022`](tables/WorkTables/dbo.NY_State_Contract_2022.md) | 70859 |
| [`dbo.NYContract`](tables/WorkTables/dbo.NYContract.md) | 14580 |
| [`dbo.OI_UserAccounts2022`](tables/WorkTables/dbo.OI_UserAccounts2022.md) | 957 |
| [`dbo.oldCharges`](tables/WorkTables/dbo.oldCharges.md) | 633 |
| [`dbo.PalosAfterFix`](tables/WorkTables/dbo.PalosAfterFix.md) | 1331 |
| [`dbo.Piscataway`](tables/WorkTables/dbo.Piscataway.md) | 76 |
| [`dbo.Pitsco-4-12-22`](tables/WorkTables/dbo.Pitsco-4-12-22.md) | 75 |
| [`dbo.POFreight`](tables/WorkTables/dbo.POFreight.md) | 22 |
| [`dbo.PP Deletes`](tables/WorkTables/dbo.PP_Deletes.md) | 343 |
| [`dbo.PreImageBidResults`](tables/WorkTables/dbo.PreImageBidResults.md) | 7157 |
| [`dbo.PreImageBidResults2`](tables/WorkTables/dbo.PreImageBidResults2.md) | 4482 |
| [`dbo.PreImageBidResults3`](tables/WorkTables/dbo.PreImageBidResults3.md) | 1961 |
| [`dbo.recheckList`](tables/WorkTables/dbo.recheckList.md) | 41355 |
| [`dbo.Renewals 2019`](tables/WorkTables/dbo.Renewals_2019.md) | 521 |
| [`dbo.ReprocList`](tables/WorkTables/dbo.ReprocList.md) | 596 |
| [`dbo.ReprocList1`](tables/WorkTables/dbo.ReprocList1.md) | 24 |
| [`dbo.Reqs9993`](tables/WorkTables/dbo.Reqs9993.md) | 2131 |
| [`dbo.Reqsb4Update_021320202`](tables/WorkTables/dbo.Reqsb4Update_021320202.md) | 42346 |
| [`dbo.RGSBidItems9275`](tables/WorkTables/dbo.RGSBidItems9275.md) | 209 |
| [`dbo.RGSDSSHolds`](tables/WorkTables/dbo.RGSDSSHolds.md) | 76 |
| [`dbo.rgsorders9275`](tables/WorkTables/dbo.rgsorders9275.md) | 2651 |
| [`dbo.RidgefieldPark`](tables/WorkTables/dbo.RidgefieldPark.md) | 118 |
| [`dbo.Ringwood`](tables/WorkTables/dbo.Ringwood.md) | 191 |
| [`dbo.Ringwood Conversion`](tables/WorkTables/dbo.Ringwood_Conversion.md) | 58 |
| [`dbo.s22 Breakroom`](tables/WorkTables/dbo.s22_Breakroom.md) | 1488 |
| [`dbo.s22 Core`](tables/WorkTables/dbo.s22_Core.md) | 327 |
| [`dbo.s22 Jan-San`](tables/WorkTables/dbo.s22_Jan-San.md) | 2617 |
| [`dbo.s22 Office Supplies`](tables/WorkTables/dbo.s22_Office_Supplies.md) | 6448 |
| [`dbo.s22 Paper`](tables/WorkTables/dbo.s22_Paper.md) | 518 |
| [`dbo.s22 Preferred Source Core List`](tables/WorkTables/dbo.s22_Preferred_Source_Core_List.md) | 26 |
| [`dbo.s22 Tech`](tables/WorkTables/dbo.s22_Tech.md) | 1415 |
| [`dbo.s22 Toner`](tables/WorkTables/dbo.s22_Toner.md) | 1407 |
| [`dbo.SA5-2`](tables/WorkTables/dbo.SA5-2.md) | 73 |
| [`dbo.Saratoga`](tables/WorkTables/dbo.Saratoga.md) | 762 |
| [`dbo.Sax 12270`](tables/WorkTables/dbo.Sax_12270.md) | 48010 |
| [`dbo.SaxBadVIC`](tables/WorkTables/dbo.SaxBadVIC.md) | 2196 |
| [`dbo.Sayerville`](tables/WorkTables/dbo.Sayerville.md) | 197 |
| [`dbo.SchoolSpecialty2023GeneralBids`](tables/WorkTables/dbo.SchoolSpecialty2023GeneralBids.md) | 3163 |
| [`dbo.SchoolSpecialty2023SpecialtyBids`](tables/WorkTables/dbo.SchoolSpecialty2023SpecialtyBids.md) | 8335 |
| [`dbo.ScotiaReqs`](tables/WorkTables/dbo.ScotiaReqs.md) | 73 |
| [`dbo.SearchData`](tables/WorkTables/dbo.SearchData.md) | 1130355 |
| [`dbo.SearchPos`](tables/WorkTables/dbo.SearchPos.md) | 3377469 |
| [`dbo.SearchReqs`](tables/WorkTables/dbo.SearchReqs.md) | 664343 |
| [`dbo.Segment`](tables/WorkTables/dbo.Segment.md) | 56 |
| [`dbo.SH Districts`](tables/WorkTables/dbo.SH_Districts.md) | 1557 |
| [`dbo.Sheet1$`](tables/WorkTables/dbo.Sheet1_.md) | 984 |
| [`dbo.SouthColonie`](tables/WorkTables/dbo.SouthColonie.md) | 688 |
| [`dbo.SS 0623 General Bids`](tables/WorkTables/dbo.SS_0623_General_Bids.md) | 8655 |
| [`dbo.SS 0623 Specialty Bids`](tables/WorkTables/dbo.SS_0623_Specialty_Bids.md) | 23702 |
| [`dbo.SS Bid Number Missing`](tables/WorkTables/dbo.SS_Bid_Number_Missing.md) | 144 |
| [`dbo.SS Codes`](tables/WorkTables/dbo.SS_Codes.md) | 677 |
| [`dbo.SS Disc 2024`](tables/WorkTables/dbo.SS_Disc_2024.md) | 12906 |
| [`dbo.ss Disc 22-MAY-2024`](tables/WorkTables/dbo.ss_Disc_22-MAY-2024.md) | 196 |
| [`dbo.SS Disc Apr 12`](tables/WorkTables/dbo.SS_Disc_Apr_12.md) | 1899 |
| [`dbo.SS Disc Bid Items 2024`](tables/WorkTables/dbo.SS_Disc_Bid_Items_2024.md) | 851 |
| [`dbo.SS Disc List`](tables/WorkTables/dbo.SS_Disc_List.md) | 7596 |
| [`dbo.SS Disc Mar 1`](tables/WorkTables/dbo.SS_Disc_Mar_1.md) | 1400 |
| [`dbo.SS Disc Mar 29`](tables/WorkTables/dbo.SS_Disc_Mar_29.md) | 5231 |
| [`dbo.SS Lower Prices`](tables/WorkTables/dbo.SS_Lower_Prices.md) | 78 |
| [`dbo.SS Missing URLs`](tables/WorkTables/dbo.SS_Missing_URLs.md) | 575 |
| [`dbo.SS Name Change`](tables/WorkTables/dbo.SS_Name_Change.md) | 24 |
| [`dbo.SS NJ SC 23`](tables/WorkTables/dbo.SS_NJ_SC_23.md) | 68 |
| [`dbo.SS NJ State 23`](tables/WorkTables/dbo.SS_NJ_State_23.md) | 68 |
| [`dbo.SS Repl 2024 Supl`](tables/WorkTables/dbo.SS_Repl_2024_Supl.md) | 27 |
| [`dbo.SS Repl 20240715`](tables/WorkTables/dbo.SS_Repl_20240715.md) | 398 |
| [`dbo.SS Replacements 2024`](tables/WorkTables/dbo.SS_Replacements_2024.md) | 515 |
| [`dbo.SS Web Frozen Items`](tables/WorkTables/dbo.SS_Web_Frozen_Items.md) | 2775 |
| [`dbo.SS ZZ 2022`](tables/WorkTables/dbo.SS_ZZ_2022.md) | 19271 |
| [`dbo.SS26 Disc`](tables/WorkTables/dbo.SS26_Disc.md) | 180 |
| [`dbo.SSL 25% LP`](tables/WorkTables/dbo.SSL_25__LP.md) | 494 |
| [`dbo.SSNY22`](tables/WorkTables/dbo.SSNY22.md) | 18896 |
| [`dbo.SSXS`](tables/WorkTables/dbo.SSXS.md) | 99 |
| [`dbo.Stafford Users`](tables/WorkTables/dbo.Stafford_Users.md) | 306 |
| [`dbo.Staples 2022 NY State Contract`](tables/WorkTables/dbo.Staples_2022_NY_State_Contract.md) | 14216 |
| [`dbo.Staples Account Codes 2023`](tables/WorkTables/dbo.Staples_Account_Codes_2023.md) | 650 |
| [`dbo.Staples Bid Update NJ`](tables/WorkTables/dbo.Staples_Bid_Update_NJ.md) | 110 |
| [`dbo.Staples Bid Update NY`](tables/WorkTables/dbo.Staples_Bid_Update_NY.md) | 85 |
| [`dbo.Staples Codes`](tables/WorkTables/dbo.Staples_Codes.md) | 622 |
| [`dbo.Staples Codes 06032024`](tables/WorkTables/dbo.Staples_Codes_06032024.md) | 685 |
| [`dbo.Staples discontinued 2022`](tables/WorkTables/dbo.Staples_discontinued_2022.md) | 3071 |
| [`dbo.Staples Discontinued 2025`](tables/WorkTables/dbo.Staples_Discontinued_2025.md) | 13508 |
| [`dbo.Staples FSC`](tables/WorkTables/dbo.Staples_FSC.md) | 20730 |
| [`dbo.Staples HP 2023`](tables/WorkTables/dbo.Staples_HP_2023.md) | 217 |
| [`dbo.Staples Kill`](tables/WorkTables/dbo.Staples_Kill.md) | 1339 |
| [`dbo.Staples NJ`](tables/WorkTables/dbo.Staples_NJ.md) | 344 |
| [`dbo.Staples NJ 2025`](tables/WorkTables/dbo.Staples_NJ_2025.md) | 2667 |
| [`dbo.Staples NJ All`](tables/WorkTables/dbo.Staples_NJ_All.md) | 1312 |
| [`dbo.staples NJ alternatives`](tables/WorkTables/dbo.staples_NJ_alternatives.md) | 110 |
| [`dbo.Staples NJ Multiple SKU Replacement`](tables/WorkTables/dbo.Staples_NJ_Multiple_SKU_Replacement.md) | 59 |
| [`dbo.Staples NJ New Replacement SKUs`](tables/WorkTables/dbo.Staples_NJ_New_Replacement_SKUs.md) | 88 |
| [`dbo.Staples NJ No Replacement SKUs`](tables/WorkTables/dbo.Staples_NJ_No_Replacement_SKUs.md) | 101 |
| [`dbo.Staples NJ Top 2000`](tables/WorkTables/dbo.Staples_NJ_Top_2000.md) | 2000 |
| [`dbo.Staples NJ Unit of Measure Change Replacem`](tables/WorkTables/dbo.Staples_NJ_Unit_of_Measure_Change_Replacem.md) | 11 |
| [`dbo.Staples NJ1`](tables/WorkTables/dbo.Staples_NJ1.md) | 344 |
| [`dbo.Staples Nov 25`](tables/WorkTables/dbo.Staples_Nov_25.md) | 1702 |
| [`dbo.Staples NY`](tables/WorkTables/dbo.Staples_NY.md) | 345 |
| [`dbo.Staples NY 12102024`](tables/WorkTables/dbo.Staples_NY_12102024.md) | 1702 |
| [`dbo.Staples NY 20241219`](tables/WorkTables/dbo.Staples_NY_20241219.md) | 1703 |
| [`dbo.Staples NY All`](tables/WorkTables/dbo.Staples_NY_All.md) | 1312 |
| [`dbo.staples NY alternatives`](tables/WorkTables/dbo.staples_NY_alternatives.md) | 86 |
| [`dbo.Staples NY Multiple SKU Replacement`](tables/WorkTables/dbo.Staples_NY_Multiple_SKU_Replacement.md) | 54 |
| [`dbo.Staples NY New Replacement SKUs`](tables/WorkTables/dbo.Staples_NY_New_Replacement_SKUs.md) | 90 |
| [`dbo.Staples NY No Replacement SKUs`](tables/WorkTables/dbo.Staples_NY_No_Replacement_SKUs.md) | 101 |
| [`dbo.Staples NY Top 2000`](tables/WorkTables/dbo.Staples_NY_Top_2000.md) | 1997 |
| [`dbo.Staples NY Unit of Measure Change Replacem`](tables/WorkTables/dbo.Staples_NY_Unit_of_Measure_Change_Replacem.md) | 12 |
| [`dbo.Staples Revised Nov 24`](tables/WorkTables/dbo.Staples_Revised_Nov_24.md) | 157 |
| [`dbo.Staples23All`](tables/WorkTables/dbo.Staples23All.md) | 7149 |
| [`dbo.Staples23Breakroom`](tables/WorkTables/dbo.Staples23Breakroom.md) | 1487 |
| [`dbo.Staples23Core`](tables/WorkTables/dbo.Staples23Core.md) | 238 |
| [`dbo.Staples23Office Supplies`](tables/WorkTables/dbo.Staples23Office_Supplies.md) | 4609 |
| [`dbo.Staples23Paper`](tables/WorkTables/dbo.Staples23Paper.md) | 693 |
| [`dbo.Staples23Remanufactured Ink Toner`](tables/WorkTables/dbo.Staples23Remanufactured_Ink_Toner.md) | 328 |
| [`dbo.Staples23Tech`](tables/WorkTables/dbo.Staples23Tech.md) | 1438 |
| [`dbo.Staples23Toner`](tables/WorkTables/dbo.Staples23Toner.md) | 1394 |
| [`dbo.StaplesDroppedDetail`](tables/WorkTables/dbo.StaplesDroppedDetail.md) | 322 |
| [`dbo.StaplesDroppedItems`](tables/WorkTables/dbo.StaplesDroppedItems.md) | 239 |
| [`dbo.StaplesDroppedItemsWithOld`](tables/WorkTables/dbo.StaplesDroppedItemsWithOld.md) | 123 |
| [`dbo.StaplesDroppedRefList`](tables/WorkTables/dbo.StaplesDroppedRefList.md) | 322 |
| [`dbo.Staples-NJ`](tables/WorkTables/dbo.Staples-NJ.md) | 2500 |
| [`dbo.Staples-NY`](tables/WorkTables/dbo.Staples-NY.md) | 1849 |
| [`dbo.Stapoles23Jan San`](tables/WorkTables/dbo.Stapoles23Jan_San.md) | 3188 |
| [`dbo.Storms`](tables/WorkTables/dbo.Storms.md) | 1893 |
| [`dbo.suppleBids`](tables/WorkTables/dbo.suppleBids.md) | 18 |
| [`dbo.tableMaxs`](tables/WorkTables/dbo.tableMaxs.md) | 286 |
| [`dbo.Tracks`](tables/WorkTables/dbo.Tracks.md) | 51840 |
| [`dbo.TranLog`](tables/WorkTables/dbo.TranLog.md) | 45613234 |
| [`dbo.United Codes`](tables/WorkTables/dbo.United_Codes.md) | 273 |
| [`dbo.United District Detail`](tables/WorkTables/dbo.United_District_Detail.md) | 714 |
| [`dbo.United Nov 24`](tables/WorkTables/dbo.United_Nov_24.md) | 206084 |
| [`dbo.United School Detail`](tables/WorkTables/dbo.United_School_Detail.md) | 2322 |
| [`dbo.UnitedNY22`](tables/WorkTables/dbo.UnitedNY22.md) | 27452 |
| [`dbo.UPCList`](tables/WorkTables/dbo.UPCList.md) | 767148 |
| [`dbo.UserImports`](tables/WorkTables/dbo.UserImports.md) | 328 |
| [`dbo.Vendor941Reqs`](tables/WorkTables/dbo.Vendor941Reqs.md) | 1337 |
| [`dbo.VendorNames`](tables/WorkTables/dbo.VendorNames.md) | 61 |
| [`dbo.Wanaque`](tables/WorkTables/dbo.Wanaque.md) | 115 |
| [`dbo.Washington Codes`](tables/WorkTables/dbo.Washington_Codes.md) | 506 |
| [`dbo.WBMasonNY22`](tables/WorkTables/dbo.WBMasonNY22.md) | 8140 |
| [`dbo.weeklytotals`](tables/WorkTables/dbo.weeklytotals.md) | 224 |
| [`dbo.WengerDetail`](tables/WorkTables/dbo.WengerDetail.md) | 30 |
| [`dbo.WSiisLogs`](tables/WorkTables/dbo.WSiisLogs.md) | 610929 |
| [`dbo.WTIds`](tables/WorkTables/dbo.WTIds.md) | 566 |
| [`dbo.XRefSchoolSpecialty2023GeneralBids`](tables/WorkTables/dbo.XRefSchoolSpecialty2023GeneralBids.md) | 10175 |
| [`dbo.XRefSchoolSpecialty2023SpecialtyBids`](tables/WorkTables/dbo.XRefSchoolSpecialty2023SpecialtyBids.md) | 264 |
| [`dbo.Z8 Del`](tables/WorkTables/dbo.Z8_Del.md) | 483 |
| [`dbo.Z9 Addons`](tables/WorkTables/dbo.Z9_Addons.md) | 575 |

### Leaf views

_None — all views are referenced by at least one other SQL object._

### Unreferenced routines

_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._

| Routine | Type |
|---------|------|
| `dbo.ufn_CalcField` | SCALAR FUNCTION |
