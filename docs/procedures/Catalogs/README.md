# Procedures & Functions: `Catalogs`

_Generated on 2026-05-04T13:07:58.758Z_

**Database:** `Catalogs`

[← back to procedures index](../README.md)

## Summary

- Procedures: **45**
- Functions: **8**
- Encrypted: **0**

## Procedures

| Name | Parameters | Created | Modified | Encrypted |
|------|------------|---------|----------|-----------|
| [`dbo.dt_addtosourcecontrol`](dbo.dt_addtosourcecontrol.md) | 5 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_addtosourcecontrol_u`](dbo.dt_addtosourcecontrol_u.md) | 5 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_adduserobject`](dbo.dt_adduserobject.md) | 0 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_adduserobject_vcs`](dbo.dt_adduserobject_vcs.md) | 1 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_checkinobject`](dbo.dt_checkinobject.md) | 10 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_checkinobject_u`](dbo.dt_checkinobject_u.md) | 10 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_checkoutobject`](dbo.dt_checkoutobject.md) | 7 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_checkoutobject_u`](dbo.dt_checkoutobject_u.md) | 7 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_displayoaerror`](dbo.dt_displayoaerror.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_displayoaerror_u`](dbo.dt_displayoaerror_u.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_droppropertiesbyid`](dbo.dt_droppropertiesbyid.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_dropuserobjectbyid`](dbo.dt_dropuserobjectbyid.md) | 1 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_generateansiname`](dbo.dt_generateansiname.md) | 1 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getobjwithprop`](dbo.dt_getobjwithprop.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getobjwithprop_u`](dbo.dt_getobjwithprop_u.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getpropertiesbyid`](dbo.dt_getpropertiesbyid.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getpropertiesbyid_u`](dbo.dt_getpropertiesbyid_u.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getpropertiesbyid_vcs`](dbo.dt_getpropertiesbyid_vcs.md) | 3 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_getpropertiesbyid_vcs_u`](dbo.dt_getpropertiesbyid_vcs_u.md) | 3 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_isundersourcecontrol`](dbo.dt_isundersourcecontrol.md) | 3 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_isundersourcecontrol_u`](dbo.dt_isundersourcecontrol_u.md) | 3 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_removefromsourcecontrol`](dbo.dt_removefromsourcecontrol.md) | 0 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_setpropertybyid`](dbo.dt_setpropertybyid.md) | 4 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_setpropertybyid_u`](dbo.dt_setpropertybyid_u.md) | 4 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_validateloginparams`](dbo.dt_validateloginparams.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_validateloginparams_u`](dbo.dt_validateloginparams_u.md) | 2 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_vcsenabled`](dbo.dt_vcsenabled.md) | 0 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_verstamp006`](dbo.dt_verstamp006.md) | 0 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_whocheckedout`](dbo.dt_whocheckedout.md) | 4 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.dt_whocheckedout_u`](dbo.dt_whocheckedout_u.md) | 4 | 2003-07-19 15:20:41 | 2003-07-19 15:20:41 | no |
| [`dbo.sp_CatalogCopy`](dbo.sp_CatalogCopy.md) | 2 | 2012-11-20 11:58:35 | 2025-02-03 14:24:32 | no |
| [`dbo.sp_CatalogPrepareForPost`](dbo.sp_CatalogPrepareForPost.md) | 1 | 2015-03-09 14:10:39 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_CatalogPrePostXRef`](dbo.sp_CatalogPrePostXRef.md) | 1 | 2015-03-17 15:11:25 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_CreateHybrid`](dbo.sp_CreateHybrid.md) | 3 | 2013-12-17 22:42:57 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_MergeCatalogs`](dbo.sp_MergeCatalogs.md) | 2 | 2013-12-18 23:59:47 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_PostCatalog`](dbo.sp_PostCatalog.md) | 1 | 2015-03-27 17:30:59 | 2024-09-10 16:54:39 | no |
| [`dbo.sp_PostCatalog6`](dbo.sp_PostCatalog6.md) | 1 | 2026-02-26 21:08:21 | 2026-02-26 21:08:21 | no |
| [`dbo.sp_PostCatalogBackup`](dbo.sp_PostCatalogBackup.md) | 1 | 2013-01-13 19:20:45 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_PostCatalogBG2013`](dbo.sp_PostCatalogBG2013.md) | 1 | 2013-02-19 14:16:48 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_PostCatalogLarge`](dbo.sp_PostCatalogLarge.md) | 1 | 2015-01-22 15:24:46 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_PostCatalogNew`](dbo.sp_PostCatalogNew.md) | 1 | 2018-12-16 21:20:38 | 2023-02-14 15:58:21 | no |
| [`dbo.sp_PostCatalogOrig`](dbo.sp_PostCatalogOrig.md) | 1 | 2023-02-02 17:04:50 | 2023-02-02 17:04:50 | no |
| [`dbo.sp_ProcessMiddletownCatalog`](dbo.sp_ProcessMiddletownCatalog.md) | 3 | 2016-03-07 15:57:44 | 2018-01-22 20:51:48 | no |
| [`dbo.sp_ReimportCatalog`](dbo.sp_ReimportCatalog.md) | 1 | 2014-01-08 23:30:48 | 2018-01-23 12:24:17 | no |
| [`dbo.sp_SyncCatalog`](dbo.sp_SyncCatalog.md) | 2 | 2014-01-07 01:22:56 | 2018-01-23 12:24:17 | no |

## Functions

| Name | Kind | Parameters | Created | Modified | Encrypted |
|------|------|------------|---------|----------|-----------|
| [`dbo.uf_HasExtdASCIIChars`](dbo.uf_HasExtdASCIIChars.md) | Function (scalar) | 1 | 2011-06-09 13:56:35 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_HasNonPrintableChars`](dbo.uf_HasNonPrintableChars.md) | Function (scalar) | 1 | 2006-02-02 17:53:36 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_RemoveNonPrintableChars`](dbo.uf_RemoveNonPrintableChars.md) | Function (scalar) | 1 | 2006-02-02 17:45:46 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_ReplaceNonPrintableChars`](dbo.uf_ReplaceNonPrintableChars.md) | Function (scalar) | 1 | 2006-10-25 14:34:21 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_TeachersDiscoveryItemCode`](dbo.uf_TeachersDiscoveryItemCode.md) | Function (scalar) | 1 | 2010-03-02 19:02:31 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_Trim`](dbo.uf_Trim.md) | Function (scalar) | 1 | 2004-09-30 14:20:44 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_ViewDifferentChars`](dbo.uf_ViewDifferentChars.md) | Function (scalar) | 2 | 2010-11-17 17:56:37 | 2020-01-23 21:35:00 | no |
| [`dbo.uf_ViewNonPrintableChars`](dbo.uf_ViewNonPrintableChars.md) | Function (scalar) | 1 | 2006-02-03 14:24:26 | 2020-01-23 21:35:00 | no |

## Source queries

This page is rendered from the following catalog views:

- `INFORMATION_SCHEMA.ROUTINES` — routine kind and return type
- `INFORMATION_SCHEMA.PARAMETERS` — parameter list, mode, type
- `sys.objects` — object kind code (`P`/`FN`/`IF`/`TF`), create/modify dates
- `sys.sql_modules` — full T-SQL definition + `is_encrypted` flag
- `sys.parameters` — parameter defaults (not exposed via `INFORMATION_SCHEMA`)
- `sys.sql_expression_dependencies` — depends-on and called-by relationships
