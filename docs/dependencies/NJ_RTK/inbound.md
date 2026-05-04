# Cross-database inbound references: `NJ_RTK`

_Generated on 2026-05-04T13:15:40.570Z_

**Target database:** `NJ_RTK`

[← back to dependencies index](../README.md)

Routines, views, and triggers in *other* databases that reach into this database.

## Summary

| Source database | Distinct edges |
|-----------------|----------------|
| `EDS` | 16 |

## ← `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.Employers` | `NJ_RTK.dbo.Employers` | sed, text |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.Facilities` | `` | sed |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.Facilities on Facilities` | `NJ_RTK.dbo.Facilities on Facilities` | text |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.ReportProducts` | `` | sed |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.ReportProducts on ReportProducts` | `NJ_RTK.dbo.ReportProducts on ReportProducts` | text |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.ReportSurveys` | `` | sed |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.ReportSurveys on ReportSurveys` | `NJ_RTK.dbo.ReportSurveys on ReportSurveys` | text |
| [`dbo.ufn_GetMSDSSheets`](../../procedures/EDS/dbo.ufn_GetMSDSSheets.md) | Function (table-valued) | `dbo.ReportSurveys rs` | `NJ_RTK.dbo.ReportSurveys rs` | text |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.Employers` | `NJ_RTK.dbo.Employers` | sed, text |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.Facilities` | `` | sed |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.Facilities on Facilities` | `NJ_RTK.dbo.Facilities on Facilities` | text |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.ReportProducts` | `` | sed |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.ReportProducts on ReportProducts` | `NJ_RTK.dbo.ReportProducts on ReportProducts` | text |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.ReportSurveys` | `` | sed |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.ReportSurveys on ReportSurveys` | `NJ_RTK.dbo.ReportSurveys on ReportSurveys` | text |
| [`dbo.usp_GetMSDSSheets`](../../procedures/EDS/dbo.usp_GetMSDSSheets.md) | Procedure | `dbo.ReportSurveys rs` | `NJ_RTK.dbo.ReportSurveys rs` | text |

## Source queries

See per-source-database `outbound.md` and the top-level `README.md` for the full method.
