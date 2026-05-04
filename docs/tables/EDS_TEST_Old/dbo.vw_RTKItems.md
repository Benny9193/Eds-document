# View: `dbo.vw_RTKItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `ItemCode` | varchar(50) | NO |  |  |
| 3 | `ItemDescription` | varchar(512) | NO |  |  |
| 4 | `RTK_ItemsId` | int | NO |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `ItemId` | int | YES |  |  |
| 7 | `LegacyCometCode` | varchar(16) | YES |  |  |
| 8 | `AlternateDesc` | varchar(60) | YES |  |  |
| 9 | `CaseCount` | int | YES |  |  |
| 10 | `MeasurePct` | decimal(9,5) | YES |  |  |
| 11 | `ContainerCodesId` | int | YES |  |  |
| 12 | `UOMCodesId` | int | YES |  |  |
| 13 | `OtherContainerDesc` | varchar(20) | YES |  |  |
| 14 | `LegacyCometDesc` | varchar(60) | YES |  |  |
| 15 | `PurposeDesc` | varchar(50) | NO |  |  |
| 16 | `RTK_PurposeId` | int | YES |  |  |
| 17 | `Manufacturer` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.RTK_Items`](dbo.RTK_Items.md) | USER_TABLE |
| [`dbo.RTK_Purposes`](dbo.RTK_Purposes.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTKItems] as
--SELECT CAT.Name CategoryName, Isnull(ITE.ItemCode,'') ItemCode,  -- changed 8/9/13
SELECT CAT.Name CategoryName, Isnull(RTK.ItemCode,'') ItemCode,
       Isnull(ITE.Description,'') ItemDescription,
       RTK.RTK_ItemsId, RTK.CategoryId, RTK.ItemId, RTK.LegacyCometCode, RTK.AlternateDesc, RTK.CaseCount, RTK.MeasurePct,
       RTK.ContainerCodesId, RTK.UOMCodesId, RTK.OtherContainerDesc, RTK.LegacyCometDesc,
       Isnull(PUR.Description, '') PurposeDesc, RTK.RTK_PurposeId,  -- added 1/7/15 kjm
       RTK.Manufacturer  -- added 1/9/15     
FROM dbo.RTK_Items RTK
JOIN dbo.Category CAT ON Isnull(CAT.Active,0) = 1 and CAT.CategoryId = RTK.CategoryId 
LEFT JOIN dbo.Items ITE ON ITE.CategoryId = RTK.CategoryId AND ITE.ItemId = RTK.ItemId
LEFT JOIN dbo.RTK_Purposes PUR ON PUR.RTK_PurposeID = RTK.RTK_PurposeId  -- added 1/7/15 kjm
```
