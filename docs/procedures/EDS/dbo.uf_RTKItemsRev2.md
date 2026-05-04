# Function: inline table-valued: `dbo.uf_RTKItemsRev2`

_Generated on 2026-05-04T13:04:00.623Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RTKItemsRev2` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2013-07-26 16:55:38 |
| Modified | 2015-01-15 14:11:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DistrictId` | IN | int |  |
| 2 | `@RptYear` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Control` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |
| `RTK_ReportItems` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_RTKItemsRev2](@DistrictId int, @RptYear int)
returns table as

 return
( 
SELECT db1.RTK_SitesId, db1.ItemId, db1.CategoryId, sum(db1.Quantity) Quantity, db1.DistrictId,
       max(isnull(db1.ExactLocationOnSite,'')) ExactLocationOnSite, 
       --max(isnull(RTK_Items.Manufacturer,'')) Manufacturer,                  -- added 1/15/15 kjm
       --max(isnull(RTK_Purposes.Description,'')) PurposeDesc,                 -- added 1/15/15 kjm 
       CASE WHEN ISNULL(db1.MSDSId,0)!=0 THEN db1.MSDSId ELSE RTK_Items.MSDSId END MSDSId  -- If MSDSId 
FROM RTK_ReportItems db1 
LEFT JOIN RTK_Items ON RTK_Items.RTK_ItemsId = db1.RTK_ItemsId   
--LEFT JOIN RTK_Purposes ON RTK_Purposes.RTK_PurposeId = RTK_Items.RTK_PurposeId   -- added 1/15/15 kjm
WHERE db1.DistrictId = @DistrictId
  and db1.[Year] >= case (@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 when 0 then @RptYear-4 else @RptYear end
  and db1.[Year] <= @RptYear
  -- IF base year THEN report all items ELSE only report items that were not reported since the base year (inclusive)
  AND ( ( 1=case (@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 when 0 then 1 else 0 end ) 
             OR
             ( 
              isnull((     
              SELECT top 1 db2.RTK_ReportItemsId
              FROM [RTK_ReportItems] db2 
              WHERE db2.ItemId = db1.ItemId
                and db2.RTK_SitesId = db1.RTK_SitesId
                and [Year] >= @RptYear - ((@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5)
                and [Year] <= @RptYear - 1
              order by db2.RTK_ReportItemsId
              ),0) = 0
             )
            )     
GROUP BY db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.DistrictId, 
         CASE WHEN ISNULL(db1.MSDSId,0)!=0 THEN db1.MSDSId ELSE RTK_Items.MSDSId END  -- allows for multiple MSDS versions of an Item
)


/*   following replaced 8/20/13  Note: removed LegacyCometItemCode field
 return(SELECT db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.LegacyCometItemCode, sum(db1.Quantity) Quantity, db1.DistrictId,
                max(isnull(db1.ExactLocationOnSite,'')) ExactLocationOnSite, db1.MSDSId  -- added MSDSId 7/26/13 kjm
  FROM [RTK_ReportItems] db1 
 where db1.DistrictId = @DistrictId
   and db1.[Year] >= case (@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 when 0 then @RptYear-4 else @RptYear end
   and db1.[Year] <= @RptYear
   -- IF base year THEN report all items ELSE only report items that were not reported since the base year (inclusive)
   AND ( ( 1=case (@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5 when 0 then 1 else 0 end ) 
             OR
             ( 
              isnull((     
              SELECT top 1 db2.RTK_ReportItemsId
              FROM [RTK_ReportItems] db2 
              WHERE db2.ItemId = db1.ItemId
                and db2.RTK_SitesId = db1.RTK_SitesId
                and [Year] >= @RptYear - ((@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5)
                and [Year] <= @RptYear - 1
              order by db2.RTK_ReportItemsId
              ),0) = 0
             )
            )     
GROUP BY db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.LegacyCometItemCode, db1.DistrictId, db1.MSDSId  -- added MSDSId 7/26/13 kjm
)
*/
```
