# Procedure: `dbo.usp_getSDSItems`

_Generated on 2026-05-04T13:04:24.372Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_getSDSItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-08-03 12:32:01 |
| Modified | 2022-08-08 07:59:48 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Items` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.BidResults` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_getSDSItems as
begin
    select i.ItemId
        ,SDS_URL
        ,id.ItemDescription
        ,coalesce(ItemImage,'') as ItemImage
        ,ItemCode
        ,coalesce(a.Manufacturer,i.BrandName,'') as BrandName
        ,coalesce(a.ManufacturerPartNumber,i.[ManufacturorNumber],'') as [ManufacturorNumber]
    from Items i
    join vw_ItemDescription id on id.ItemId = i.ItemId
    join (
        select ItemId = cast(ItemId as char(20))
                ,SDS_URL as SDS_URL
                ,[ImageURL] as ItemImage
                ,ManufacturerBid as Manufacturer
                ,ManufPartNoBid as ManufacturerPartNumber
        from dbo.BidResults
--        ${strSDSUrls && `where SDS_URL in (${strSDSUrls})`}
        Union
        select ItemId = cast(ItemId as char(20))
                ,MSDSRef as SDS_URL
                ,[ImageURL] as ItemImage
                ,Manufacturor as Manufacturer
                ,ManufacturorPartNumber as ManufacturerPartNumber
        from dbo.CrossRefs
--        ${strSDSUrls && `where Active = 1 and MSDSRef in (${strSDSUrls})`}
    ) a on a.ItemId = i.ItemId
end
```
