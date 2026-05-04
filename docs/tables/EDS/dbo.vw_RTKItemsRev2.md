# View: `dbo.vw_RTKItemsRev2`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_SitesId` | int | YES |  |  |
| 2 | `Quantity` | int | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `year` | int | YES |  |  |
| 5 | `RTKDescription` | varchar(60) | YES |  |  |
| 6 | `ExactLocationOnSite` | varchar(50) | YES |  |  |
| 7 | `Manufacturer` | varchar(50) | YES |  |  |
| 8 | `ContainerCodesId` | int | YES |  |  |
| 9 | `RTK_PurposeId` | int | YES |  |  |
| 10 | `UOMCodesId` | int | YES |  |  |
| 11 | `MSDSId` | int | YES |  |  |
| 12 | `CategoryId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Control` | USER_TABLE |
| `Items` | USER_TABLE |
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RTKInfo`](dbo.vw_RTKInfo.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_RTKItemsRev2] as
SELECT db1.RTK_SitesId, sum(db1.Quantity) Quantity, db1.DistrictId, ys.[year], CASE isnull(MSDS.AlternateDescription,'') WHEN '' THEN Left(Isnull(Items.Description,''),60) ELSE MSDS.AlternateDescription END RTKDescription,
       max(isnull(db1.ExactLocationOnSite,'')) ExactLocationOnSite, RTK_Items.Manufacturer, RTK_Items.ContainerCodesId, RTK_Items.RTK_PurposeId, RTK_Items.UOMCodesId,
       CASE WHEN ISNULL(db1.MSDSId,0)!=0 THEN db1.MSDSId ELSE RTK_Items.MSDSId END MSDSId, db1.CategoryId  -- If MSDSId 
FROM 
(select ys1.[Year], 
             case (ys1.[Year] - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 
                 when 0 then 1 
                 else 0 
             end ReportType,
             (select top 1 RTKBaseYear from Control order by ControlId) + (cast((ys1.[Year] - (select top 1 RTKBaseYear from Control order by ControlId)) / 5 as int) * 5) baseYear,
             case (ys1.[Year] - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 
                 when 0 then (select top 1 RTKBaseYear from Control order by ControlId) + (cast((ys1.[Year] - (select top 1 RTKBaseYear from Control order by ControlId)) / 5 as int) * 5) - 4
                 else ys1.[Year]
             end RangeLow
        from RTK_ReportItems ys1, [Control]
       group by ys1.[year]) ys
join RTK_ReportItems db1 on db1.[Year] between ys.RangeLow and ys.Year
LEFT JOIN RTK_Items ON RTK_Items.RTK_ItemsId = db1.RTK_ItemsId 
left outer join Items on Items.ItemId = db1.ItemId
left outer join MSDS on MSDS.MSDSId = CASE WHEN ISNULL(db1.MSDSId,0)!=0 THEN db1.MSDSId ELSE RTK_Items.MSDSId END
WHERE ( ( 1=ys.ReportType ) 
             OR
             ( 
              not exists(     
              SELECT db2.RTK_ReportItemsId
              FROM [RTK_ReportItems] db2 
              WHERE db2.ItemId = db1.ItemId
                and db2.RTK_SitesId = db1.RTK_SitesId
                and db2.[Year] between ys.baseYear and ys.[Year] - 1
              ) 
             )
            )     
GROUP BY db1.RTK_SitesId, db1.DistrictId, ys.[Year], 
         CASE isnull(MSDS.AlternateDescription,'') WHEN '' THEN Left(Isnull(Items.Description,''),60) ELSE MSDS.AlternateDescription END, 
         RTK_Items.Manufacturer, RTK_Items.ContainerCodesId, RTK_Items.RTK_PurposeId, RTK_Items.UOMCodesId,
         CASE WHEN ISNULL(db1.MSDSId,0)!=0 THEN db1.MSDSId ELSE RTK_Items.MSDSId END, db1.CategoryId  -- allows for multiple MSDS versions of an Item
```
