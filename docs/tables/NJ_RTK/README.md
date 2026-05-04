# Database: `NJ_RTK`

[← back to top](../../../SCHEMA.md)

## Schema: `dbo`

### Tables

| Table | Rows |
|-------|------|
| [`dbo.CAS`](dbo.CAS.md) | 3322 |
| [`dbo.Employers`](dbo.Employers.md) | 62 |
| [`dbo.Facilities`](dbo.Facilities.md) | 496 |
| [`dbo.Products`](dbo.Products.md) | 0 |
| [`dbo.ReportProducts`](dbo.ReportProducts.md) | 216812 |
| [`dbo.ReportSubstances`](dbo.ReportSubstances.md) | 206295 |
| [`dbo.ReportSurveys`](dbo.ReportSurveys.md) | 1982 |
| [`dbo.Substances`](dbo.Substances.md) | 0 |
| [`dbo.Surveys`](dbo.Surveys.md) | 1978 |

### Views

| View |
|------|
| [`dbo.vw_DMSCheck`](dbo.vw_DMSCheck.md) |
| [`dbo.vw_InventoryRange`](dbo.vw_InventoryRange.md) |
| [`dbo.vw_reportedData`](dbo.vw_reportedData.md) |
| [`dbo.vw_RTKChanges`](dbo.vw_RTKChanges.md) |
| [`dbo.vw_RTKChangesOrig`](dbo.vw_RTKChangesOrig.md) |
| [`dbo.vw_RTKData`](dbo.vw_RTKData.md) |

## Routines

| Schema | Name | Type | Returns |
|--------|------|------|---------|
| `dbo` | `sp_refreshEmployer` | PROCEDURE |  |
| `dbo` | `sp_refreshFacility` | PROCEDURE |  |
| `dbo` | `uf_SanitizeData` | FUNCTION | varchar |
| `dbo` | `uf_SanitizeDataTest` | FUNCTION | varchar |
| `dbo` | `usp_UpdateSurvey` | PROCEDURE |  |
