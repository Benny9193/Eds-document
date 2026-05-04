# Table: `dbo.RTK_Items`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 64627

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Right-To-Know item catalog (~65K rows). Chemical-inventory items linked to `Items.ItemId` with NJ-RTK-specific attributes (CAS percent, container/UOM codes, legacy COMET code, manufacturer). Joined with `RTK_MSDSDetail` for chemical composition and `RTK_ReportItems` for survey output.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_ItemsId` | int | NO |  | YES |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `LegacyCometCode` | varchar(16) | YES |  |  |
| 5 | `AlternateDesc` | varchar(60) | YES |  |  |
| 6 | `CaseCount` | int | YES |  |  |
| 7 | `MeasurePct` | decimal(9,5) | YES |  |  |
| 8 | `ContainerCodesId` | int | YES |  |  |
| 9 | `UOMCodesId` | int | YES |  |  |
| 10 | `OtherContainerDesc` | varchar(20) | YES |  |  |
| 11 | `LegacyCometDesc` | varchar(60) | YES |  |  |
| 12 | `MSDSId` | int | YES |  |  |
| 13 | `ItemCode` | varchar(50) | YES |  |  |
| 14 | `RTK_PurposeId` | int | YES |  |  |
| 15 | `Manufacturer` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `KeyLegacyCometCode` | no | NONCLUSTERED | `LegacyCometCode` |  |
| `SK_CategoryItem` | no | NONCLUSTERED | `CategoryId`, `ItemId` |  |
| `SKI_Item_Codes` | no | NONCLUSTERED | `ItemId` | `RTK_ItemsId`, `ContainerCodesId`, `UOMCodesId`, `MSDSId` |
| `SKI_MSDS_ItemId` | no | NONCLUSTERED | `MSDSId` | `RTK_ItemsId`, `ItemId` |
| `SKI_MSDSCategory_Item` | no | NONCLUSTERED | `MSDSId`, `CategoryId` | `RTK_ItemsId` |
| `SKI_MSDSItemCode_Id` | no | NONCLUSTERED | `MSDSId`, `ItemCode` | `RTK_ItemsId` |
