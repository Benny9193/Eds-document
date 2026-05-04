# Procedure: `dbo.usp_mySDS`

_Generated on 2026-05-04T13:04:00.730Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_mySDS` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-03-15 16:05:09 |
| Modified | 2019-03-15 16:05:09 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DistrictId` | IN | int |  |
| 2 | `@ShippingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `MSDS` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |
| `RTK_ReportItems` | USER_TABLE |  |
| `SDSDocs` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `vw_DMSSDSDocuments` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_mySDS @DistrictId int, @ShippingId int
as

  select Detail.ItemId, ShipLocations.Name ShipLocation, Detail.Description 
    into #myItems
	from Detail
	join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
					and Requisitions.DateEntered > dateadd(year,-8,getdate())
	join Budgets on Budgets.BudgetId = Requisitions.BudgetId
				and Budgets.DistrictId = 204
	left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
   group by Detail.ItemId, ShipLocations.Name, Detail.Description


  select coalesce(ss.Description, s.Description, i.Description,'') AlternateDesc, coalesce(s.Manufacturer, i.Manufacturer, '') Manufacturer, coalesce(s.MSDSId, i.MSDSId) MSDSId, coalesce(s.DocId, i.DocId) DocId, String_Agg(mi.ShipLocation,'<br/>') Locations
    from #myItems mi
	outer apply (select top 1 ri.AlternateDesc Description, ri.Manufacturer, MSDS.MSDSId, vw_DMSSDSDocuments.DocId, rri.ItemId 
			        from RTK_ReportItems rri 
			        join RTK_Items ri on ri.RTK_ItemsId = rri.RTK_ItemsId 
					join MSDS on MSDS.MSDSId = ri.MSDSId
			        join vw_DMSSDSDocuments on vw_DMSSDSDocuments.MSDSId = MSDS.MSDSId 
			        where rri.ItemId = mi.ItemId 
			        and rri.Year >= year(getdate()) - 7 
			        order by ri.Manufacturer desc) i
	outer apply (select SDSDocs.Description, SDSDocs.Manufacturer, SDSDocs.MSDSId, SDSDocs.Id DocId 
			        from SDSDocs 
			    where SDSDocs.ItemId = mi.ItemId) s
	where coalesce(s.DocId, i.DocId) is not null
	  and coalesce(s.Description, i.Description,'') != ''
	group by coalesce(ss.Description, s.Description, i.Description,''), coalesce(s.Manufacturer, i.Manufacturer, ''), coalesce(s.MSDSId, i.MSDSId), coalesce(s.DocId, i.DocId) 
	order by AlternateDesc, Manufacturer, MSDSId, DocId

  select ShipLocation
	from #myItems mi
   group by ShipLocation
   order by ShipLocation
```
