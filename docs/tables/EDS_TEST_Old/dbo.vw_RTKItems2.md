# View: `dbo.vw_RTKItems2`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | NO |  |  |
| 2 | `ItemCode` | varchar(50) | NO |  |  |
| 3 | `LegacyCometCode` | varchar(16) | NO |  |  |
| 4 | `ItemDescription` | varchar(512) | NO |  |  |
| 5 | `AlternateDesc` | varchar(60) | NO |  |  |
| 6 | `CaseCount` | int | YES |  |  |
| 7 | `MeasurePct` | decimal(9,5) | YES |  |  |
| 8 | `ContainerCode` | char(2) | YES |  |  |
| 9 | `UOMCode` | char(1) | YES |  |  |
| 10 | `ReportQty` | int | YES |  |  |
| 11 | `RTK_ItemsId` | int | NO |  |  |
| 12 | `ContainerCodesID` | int | YES |  |  |
| 13 | `UOMCodesID` | int | YES |  |  |
| 14 | `ItemId` | int | YES |  |  |
| 15 | `CategoryId` | int | YES |  |  |
| 16 | `PurposeDesc` | varchar(50) | NO |  |  |
| 17 | `RTK_PurposeId` | int | YES |  |  |
| 18 | `Manufacturer` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `Items` | USER_TABLE |
| `RTK_ContainerCodes` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |
| `RTK_UOMCodes` | USER_TABLE |
| [`dbo.RTK_Purposes`](dbo.RTK_Purposes.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTKItems2]
AS
--SELECT Isnull(Category.Name,'') CategoryName, Isnull(Items.ItemCode,'') ItemCode, Isnull(RTK_Items.LegacyCometCode,'') LegacyCometCode, Isnull(Items.Description,'') ItemDescription, Isnull(RTK_Items.AlternateDesc,'') AlternateDesc, 
SELECT Isnull(Category.Name,'') CategoryName, Isnull(RTK_Items.ItemCode,'') ItemCode, Isnull(RTK_Items.LegacyCometCode,'') LegacyCometCode, Isnull(Items.Description,'') ItemDescription, Isnull(RTK_Items.AlternateDesc,'') AlternateDesc, 
       RTK_Items.CaseCount, RTK_Items.MeasurePct, RTK_ContainerCodes.ContainerCode, RTK_UOMCodes.UOMCode, 
       (SELECT COUNT(*) FROM RTK_ReportItems RRI 
        WHERE isnull(RRI.RTK_ItemsId,0)!=0 and RTK_Items.RTK_ItemsId = RRI.RTK_ItemsId  
        ) ReportQty, 
       RTK_Items.RTK_ItemsId, RTK_ContainerCodes.ContainerCodesID, RTK_UOMCodes.UOMCodesID, Items.ItemId, RTK_Items.CategoryId,
       Isnull(PUR.Description, '') PurposeDesc, RTK_Items.RTK_PurposeId,  -- added 1/7/15 kjm
       RTK_Items.Manufacturer  -- added 1/9/15     
FROM RTK_Items  with (nolock)
JOIN Category ON Category.CategoryId = RTK_Items.CategoryId  
LEFT JOIN RTK_ContainerCodes ON RTK_ContainerCodes.ContainerCodesID = RTK_Items.ContainerCodesId 
LEFT JOIN RTK_UOMCodes ON RTK_UOMCodes.UOMCodesID = RTK_Items.UOMCodesId 
LEFT JOIN Items ON RTK_Items.ItemId = Items.ItemId AND RTK_Items.CategoryId = Items.CategoryId  -- Warning: same as above
LEFT JOIN dbo.RTK_Purposes PUR ON PUR.RTK_PurposeID = RTK_Items.RTK_PurposeId  -- added 1/7/15 kjm
```
