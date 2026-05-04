# Table: `dbo.RTK_ReportItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1006046

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_ReportItemsId` | int | NO |  | YES |
| 2 | `Year` | int | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `RTK_SitesId` | int | YES |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `ItemId` | int | YES |  |  |
| 7 | `Quantity` | int | YES |  |  |
| 8 | `LegacyLocnCode` | char(5) | YES |  |  |
| 9 | `LegacyCometItemCode` | char(8) | YES |  |  |
| 10 | `DetailId` | int | YES |  |  |
| 11 | `ManuallyEntered` | int | YES |  |  |
| 12 | `ExactLocationOnSite` | varchar(50) | YES |  |  |
| 13 | `MSDSId` | int | YES |  |  |
| 14 | `RTK_ItemsId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_RTK_ReportItems_byDistrictId` | no | NONCLUSTERED | `DistrictId` |  |
| `IX_RTK_ReportItems_byItemId` | no | NONCLUSTERED | `ItemId` |  |
| `IX_RTK_ReportItems_byYear` | no | NONCLUSTERED | `Year` | `RTK_ReportItemsId`, `ItemId` |
| `SKI_ItemSiteYear_Id` | no | NONCLUSTERED | `ItemId`, `RTK_SitesId`, `Year` | `RTK_ReportItemsId` |
| `SKI_ItemYear_DistrictSite` | no | NONCLUSTERED | `RTK_ItemsId`, `Year` | `DistrictId`, `RTK_SitesId` |
| `SKI_MSDS_ItemId` | no | NONCLUSTERED | `MSDSId` | `RTK_ReportItemsId`, `ItemId` |
| `SKI_Year_All` | no | NONCLUSTERED | `Year`, `DistrictId`, `RTK_SitesId` | `RTK_ReportItemsId`, `ItemId`, `CategoryId`, `Quantity`, `ExactLocationOnSite`, `MSDSId`, `RTK_ItemsId` |
