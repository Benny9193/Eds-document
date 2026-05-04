# Database: `Catalogs`

[← back to top](../../../SCHEMA.md)

## Schema: `dbo`

### Tables

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.Abilitations 2014 Configurables`](dbo.Abilitations_2014_Configurables.md) | 3351 |  |
| [`dbo.Cascade Image URLs`](dbo.Cascade_Image_URLs.md) | 27691 |  |
| [`dbo.Cascade MSDS`](dbo.Cascade_MSDS.md) | 10102 |  |
| [`dbo.CatalogImports`](dbo.CatalogImports.md) | 405 | Catalog-import job audit (~405 rows) — one row per upload run, capturing source, status, and outcome counts. |
| [`dbo.ChildCraft 2014 Configurables`](dbo.ChildCraft_2014_Configurables.md) | 7840 |  |
| [`dbo.Grainger Feb 2018`](dbo.Grainger_Feb_2018.md) | 1444539 |  |
| [`dbo.Grainger Jan 2015`](dbo.Grainger_Jan_2015.md) | 1217944 |  |
| [`dbo.Grainger Jan 2016`](dbo.Grainger_Jan_2016.md) | 1239903 |  |
| [`dbo.Grainger Jan 2017`](dbo.Grainger_Jan_2017.md) | 1325502 |  |
| [`dbo.Grainger Jan 2017 Revised`](dbo.Grainger_Jan_2017_Revised.md) | 1361077 |  |
| [`dbo.Grainger Jan 2019`](dbo.Grainger_Jan_2019.md) | 1471345 | Frozen snapshot of the Grainger January 2019 catalog feed (~1.5M rows). One of several Grainger snapshots in this DB (`Grainger Jan 2015`, `…Jan 2016`, `…Jan… |
| [`dbo.Grainger May 2016`](dbo.Grainger_May_2016.md) | 1325502 |  |
| [`dbo.Grainger May 2017`](dbo.Grainger_May_2017.md) | 1371372 |  |
| [`dbo.Grainger May 2018`](dbo.Grainger_May_2018.md) | 1445499 |  |
| [`dbo.Master Catalog`](dbo.Master_Catalog.md) | 144403830 | Consolidated cross-vendor master catalog used as the import target for catalog file processing (~144M rows — the largest table on the server). Read-heavy; re… |
| [`dbo.Middletown K-5 ETA 2015`](dbo.Middletown_K-5_ETA_2015.md) | 114 |  |
| [`dbo.Middletown K-5 Scott Foresman 2015`](dbo.Middletown_K-5_Scott_Foresman_2015.md) | 21 |  |
| [`dbo.Middletown MS ETA 2015`](dbo.Middletown_MS_ETA_2015.md) | 35 |  |
| [`dbo.Middletown MS Prentice Hall 2015`](dbo.Middletown_MS_Prentice_Hall_2015.md) | 8 |  |
| [`dbo.Middletown Science ETA 2015`](dbo.Middletown_Science_ETA_2015.md) | 43 |  |
| [`dbo.MSRPTechnologyBlastTemp`](dbo.MSRPTechnologyBlastTemp.md) | 999 |  |
| [`dbo.Sax 2014 Configurables`](dbo.Sax_2014_Configurables.md) | 12875 |  |
| [`dbo.School Specialty 2014 Configurables`](dbo.School_Specialty_2014_Configurables.md) | 50377 |  |
| [`dbo.Sportime 2014 Configurables`](dbo.Sportime_2014_Configurables.md) | 5747 |  |
| [`dbo.uniqueCodes`](dbo.uniqueCodes.md) | 331388 | Dedup helper for catalog imports (~331K rows) — tracks unique vendor part / item codes already seen so subsequent runs can skip duplicates. |

## Routines

| Schema | Name | Type | Returns |
|--------|------|------|---------|
| `dbo` | `dt_addtosourcecontrol` | PROCEDURE |  |
| `dbo` | `dt_addtosourcecontrol_u` | PROCEDURE |  |
| `dbo` | `dt_adduserobject` | PROCEDURE |  |
| `dbo` | `dt_adduserobject_vcs` | PROCEDURE |  |
| `dbo` | `dt_checkinobject` | PROCEDURE |  |
| `dbo` | `dt_checkinobject_u` | PROCEDURE |  |
| `dbo` | `dt_checkoutobject` | PROCEDURE |  |
| `dbo` | `dt_checkoutobject_u` | PROCEDURE |  |
| `dbo` | `dt_displayoaerror` | PROCEDURE |  |
| `dbo` | `dt_displayoaerror_u` | PROCEDURE |  |
| `dbo` | `dt_droppropertiesbyid` | PROCEDURE |  |
| `dbo` | `dt_dropuserobjectbyid` | PROCEDURE |  |
| `dbo` | `dt_generateansiname` | PROCEDURE |  |
| `dbo` | `dt_getobjwithprop` | PROCEDURE |  |
| `dbo` | `dt_getobjwithprop_u` | PROCEDURE |  |
| `dbo` | `dt_getpropertiesbyid` | PROCEDURE |  |
| `dbo` | `dt_getpropertiesbyid_u` | PROCEDURE |  |
| `dbo` | `dt_getpropertiesbyid_vcs` | PROCEDURE |  |
| `dbo` | `dt_getpropertiesbyid_vcs_u` | PROCEDURE |  |
| `dbo` | `dt_isundersourcecontrol` | PROCEDURE |  |
| `dbo` | `dt_isundersourcecontrol_u` | PROCEDURE |  |
| `dbo` | `dt_removefromsourcecontrol` | PROCEDURE |  |
| `dbo` | `dt_setpropertybyid` | PROCEDURE |  |
| `dbo` | `dt_setpropertybyid_u` | PROCEDURE |  |
| `dbo` | `dt_validateloginparams` | PROCEDURE |  |
| `dbo` | `dt_validateloginparams_u` | PROCEDURE |  |
| `dbo` | `dt_vcsenabled` | PROCEDURE |  |
| `dbo` | `dt_verstamp006` | PROCEDURE |  |
| `dbo` | `dt_whocheckedout` | PROCEDURE |  |
| `dbo` | `dt_whocheckedout_u` | PROCEDURE |  |
| `dbo` | `sp_CatalogCopy` | PROCEDURE |  |
| `dbo` | `sp_CatalogPrepareForPost` | PROCEDURE |  |
| `dbo` | `sp_CatalogPrePostXRef` | PROCEDURE |  |
| `dbo` | `sp_CreateHybrid` | PROCEDURE |  |
| `dbo` | `sp_MergeCatalogs` | PROCEDURE |  |
| `dbo` | `sp_PostCatalog` | PROCEDURE |  |
| `dbo` | `sp_PostCatalog6` | PROCEDURE |  |
| `dbo` | `sp_PostCatalogBackup` | PROCEDURE |  |
| `dbo` | `sp_PostCatalogBG2013` | PROCEDURE |  |
| `dbo` | `sp_PostCatalogLarge` | PROCEDURE |  |
| `dbo` | `sp_PostCatalogNew` | PROCEDURE |  |
| `dbo` | `sp_PostCatalogOrig` | PROCEDURE |  |
| `dbo` | `sp_ProcessMiddletownCatalog` | PROCEDURE |  |
| `dbo` | `sp_ReimportCatalog` | PROCEDURE |  |
| `dbo` | `sp_SyncCatalog` | PROCEDURE |  |
| `dbo` | `uf_HasExtdASCIIChars` | FUNCTION | int |
| `dbo` | `uf_HasNonPrintableChars` | FUNCTION | int |
| `dbo` | `uf_RemoveNonPrintableChars` | FUNCTION | varchar |
| `dbo` | `uf_ReplaceNonPrintableChars` | FUNCTION | varchar |
| `dbo` | `uf_TeachersDiscoveryItemCode` | FUNCTION | varchar |
| `dbo` | `uf_Trim` | FUNCTION | varchar |
| `dbo` | `uf_ViewDifferentChars` | FUNCTION | varchar |
| `dbo` | `uf_ViewNonPrintableChars` | FUNCTION | varchar |
