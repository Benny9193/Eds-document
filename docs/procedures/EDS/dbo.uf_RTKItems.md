# Function: inline table-valued: `dbo.uf_RTKItems`

_Generated on 2026-05-04T13:43:19.082Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RTKItems` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2005-02-17 15:56:58 |
| Modified | 2012-05-17 16:26:37 |
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
| `RTK_ReportItems` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_RTKItems](@DistrictId int, @RptYear int)
returns table as

 return(SELECT db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.LegacyCometItemCode, sum(db1.Quantity) Quantity, db1.DistrictId
                , max(isnull(db1.ExactLocationOnSite,'')) ExactLocationOnSite -- add 5/17/12 kjm   hold until verified
-- FROM [EDS].[dbo].[RTK_ReportItems] db1 
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
--              FROM [EDS].[dbo].[RTK_ReportItems] db2 
              FROM [RTK_ReportItems] db2 
              WHERE db2.ItemId = db1.ItemId
                and db2.RTK_SitesId = db1.RTK_SitesId
                and [Year] >= @RptYear - ((@RptYear - (select top 1 RTKBaseYear from Control order by ControlId)) % 5)
                and [Year] <= @RptYear - 1
              order by db2.RTK_ReportItemsId
              ),0) = 0
             )
            )     
GROUP BY db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.LegacyCometItemCode, db1.DistrictId
-- ORDER BY db1.RTK_SitesId, db1.ItemId, db1.CategoryId, db1.LegacyCometItemCode
)
```
