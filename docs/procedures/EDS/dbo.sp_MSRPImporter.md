# Procedure: `dbo.sp_MSRPImporter`

_Generated on 2026-05-04T13:04:00.419Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MSRPImporter` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-11-05 12:32:23 |
| Modified | 2014-09-11 18:38:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `MSRPExcelImport` | USER_TABLE |  |
| `dbo.BidRequestManufacturer` | USER_TABLE | `eds` |
| `dbo.BidRequestOptions` | USER_TABLE | `eds` |
| `dbo.BidRequestPriceRanges` | USER_TABLE | `eds` |
| `dbo.BidRequestProductLines` | USER_TABLE | `eds` |
| `dbo.ManufacturerProductLines` | USER_TABLE | `eds` |
| `dbo.Manufacturers` | USER_TABLE | `eds` |
| `dbo.MSRPOptions` | USER_TABLE | `eds` |
| `dbo.PriceRanges` | USER_TABLE | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MSRPImporter] @BidHeaderId int
as
declare @CategoryId int/*,
		@Columns int*/
		
select @CategoryId = BidHeaders.CategoryId
  from BidHeaders
 where BidHeaders.BidHeaderId = @BidHeaderId

/*
select @Columns = case 
                    when max(ei.Base2) = 0 then 1
                    when max(ei.Base3) = 0 then 2
                    when max(ei.Base4) = 0 then 3
                    when max(ei.Base5) = 0 then 4
                    when max(ei.Base6) = 0 then 5
                    when max(ei.Base7) = 0 then 6
                    when max(ei.Base8) = 0 then 7
                    when max(ei.Base9) = 0 then 8
                    when max(ei.Base10) = 0 then 9
                    else
                      10
                  end
  from MSRPExcelImport ei
 where ei.BidNumber = @BidHeaderId
*/
 
insert eds.dbo.Manufacturers (Active, CategoryId, Name)
select 1, @CategoryId, rtrim(ltrim(MANUFACTURER))
  from MSRPExcelImport s
  left outer join eds.dbo.Manufacturers man on man.Name = rtrim(ltrim(s.MANUFACTURER))
                                           and man.CategoryId = @CategoryId
 where s.BidNumber = @BidHeaderId
   and man.ManufacturerId is null
 group by rtrim(ltrim(MANUFACTURER))
 order by rtrim(ltrim(MANUFACTURER))

update Man
   set Active = 1,
       WebsiteLink = case ISNULL(rtrim(ltrim(s.ManufWebsite)),'') when '' then WebsiteLink else rtrim(ltrim(s.ManufWebsite)) end
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
 where s.BidNumber = @BidHeaderId
   and (isnull(man.Active,0) = 0
        or ISNULL(WebSiteLink,'') != ISNULL(s.ManufWebsite,''))
       
insert eds.dbo.ManufacturerProductLines (Active, ManufacturerId, Name)
select 1, man.ManufacturerId, s.ProductLineGroup
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
  left outer join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                                      and mpl.Name = s.ProductLineGroup
 where s.BidNumber = @BidHeaderId
   and mpl.ManufacturerProductLineId is null
 group by man.ManufacturerId, s.ProductLineGroup
 order by man.ManufacturerId, s.ProductLineGroup

update mpl
   set Active = 1
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
                                and man.Active = 1
  join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                           and mpl.Name = s.ProductLineGroup
 where s.BidNumber = @BidHeaderId
   and isnull(mpl.Active,0) = 0

insert eds.dbo.MSRPOptions (Active, MSRPOPtionName) 
  select 1, s.DeliveryOption
    from MSRPExcelImport s
    left outer join eds.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
   where s.BidNumber = @BidHeaderId
     and mo.MSRPOptionId is null
   group by s.DeliveryOption

insert eds.dbo.PriceRanges (CategoryId, ManufacturerId, ManufacturerProductLineId, MSRPOptionId, RangeBase, RangeWeight)
  select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base1], [Weight1]
    from MSRPExcelImport s
    join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                  and man.CategoryId = @CategoryId
                                  and man.Active = 1
    join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                             and mpl.Name = s.ProductLineGroup
                                             and mpl.Active = 1
    join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                               and mo.Active = 1
    left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                          and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                          and pr.MSRPOptionId = mo.MSRPOptionId
                                          and pr.RangeBase = s.[Base1]
   where s.BidNumber = @BidHeaderId
     and isnull(s.[Base1],0) != 0
     and pr.PriceRangeId is null
   group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base1], s.[Weight1]
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base2], [Weight2]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base2]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base2],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base2], s.[Weight2]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base3], [Weight3]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base3]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base3],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base3], s.[Weight3]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base4], [Weight4]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base4]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base4],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base4], s.[Weight4]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base5], [Weight5]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base5]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base5],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base5], s.[Weight5]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base6], [Weight6]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base6]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base6],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base6], s.[Weight6]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base7], [Weight7]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base7]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base7],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base7], s.[Weight7]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base8], [Weight8]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base8]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base8],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base8], s.[Weight8]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base9], [Weight9]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base9]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base9],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base9], s.[Weight9]
  )
  union (
    select @CategoryId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base10], [Weight10]
      from MSRPExcelImport s
      join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                    and man.CategoryId = @CategoryId
                                    and man.Active = 1
      join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                               and mpl.Name = s.ProductLineGroup
                                               and mpl.Active = 1
      join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                                 and mo.Active = 1
      left outer join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                                            and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                                            and pr.MSRPOptionId = mo.MSRPOptionId
                                            and pr.RangeBase = s.[Base10]
     where s.BidNumber = @BidHeaderId
       and isnull(s.[Base10],0) != 0
       and pr.PriceRangeId is null
     group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, s.[Base10], s.[Weight10]
  )

update pr
   set Active = 1
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
                                and man.Active = 1
  join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                           and mpl.Name = s.ProductLineGroup
                                           and mpl.Active = 1
  join EDS.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                             and mo.Active = 1
  join eds.dbo.PriceRanges pr on pr.ManufacturerId = man.ManufacturerId
                             and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
                             and pr.MSRPOptionId = mo.MSRPOptionId
                             and pr.RangeBase in ( s.[Base1], s.[Base2], s.[Base3], s.[Base4], s.[Base5], s.[Base6], s.[Base7], s.[Base8], s.[Base9], s.[Base10] ) 
 where s.BidNumber = @BidHeaderId
   and ISNULL(pr.Active,0) = 0

insert eds.dbo.BidRequestManufacturer (Active, BidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
select 1, @BidHeaderId, man.ManufacturerId, 0, 0, 0
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
                                and man.Active = 1
  left outer join eds.dbo.BidRequestManufacturer brm on brm.BidHeaderId = @BidHeaderId
                                                    and brm.ManufacturerId = man.ManufacturerId
 where s.BidNumber = @BidHeaderId
   and brm.BidRequestManufacturerId is null
 group by man.ManufacturerId

update brm
   set Active = 1
  from MSRPExcelImport s
  join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                and man.CategoryId = @CategoryId
                                and man.Active = 1
  join eds.dbo.BidRequestManufacturer brm on brm.BidHeaderId = @BidHeaderId
                                         and brm.ManufacturerId = man.ManufacturerId
 where s.BidNumber = @BidHeaderId
   and isnull(brm.Active,0) = 0

insert eds.dbo.BidRequestProductLines (Active, BidRequestManufacturerId, ManufacturerProductLineId, UseOptions)
  select 1, brm.BidRequestManufacturerId, mpl.ManufacturerProductLineId, 0
    from MSRPExcelImport s
    join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                  and man.CategoryId = @CategoryId
                                  and man.Active = 1
    join eds.dbo.BidRequestManufacturer brm on brm.ManufacturerId = man.ManufacturerId
                                           and brm.BidHeaderId = @BidHeaderId
                                           and brm.Active = 1
    join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                             and mpl.Name = s.ProductLineGroup
                                             and mpl.Active = 1
    left outer join eds.dbo.BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                                       and brpl.ManufacturerProductLineId = mpl.ManufacturerProductLineId
   where s.BidNumber = @BidHeaderId
     and brpl.BidRequestProductLineId is null
   group by brm.BidRequestManufacturerId, mpl.ManufacturerProductLineId

UPDATE brpl
   set Active = 1
    from MSRPExcelImport s
    join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                  and man.CategoryId = @CategoryId
                                  and man.Active = 1
    join eds.dbo.BidRequestManufacturer brm on brm.ManufacturerId = man.ManufacturerId
                                           and brm.BidHeaderId = @BidHeaderId
                                           and brm.Active = 1
    join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                             and mpl.Name = s.ProductLineGroup
                                             and mpl.Active = 1
    join eds.dbo.BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.ManufacturerId
                                            and brpl.ManufacturerProductLineId = mpl.ManufacturerProductLineId
   where s.BidNumber = @BidHeaderId
     and isnull(brpl.Active,0) = 0

insert eds.dbo.BidRequestOptions (BidHeaderId, ManufacturerId, ManufacturerProductLineId, OptionId, BidRequestManufacturerId, BidRequestProductLineId, Name, Weight)
  select @BidHeaderId, man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, brm.BidRequestManufacturerId, brpl.BidRequestProductLineId, mo.MSRPOptionName, 1 
    from MSRPExcelImport s
    join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                  and man.CategoryId = @CategoryId
                                  and man.Active = 1
    join eds.dbo.BidRequestManufacturer brm on brm.ManufacturerId = man.ManufacturerId
                                           and brm.BidHeaderId = @BidHeaderId
                                           and brm.Active = 1
    join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                             and mpl.Name = s.ProductLineGroup
                                             and mpl.Active = 1
    join eds.dbo.BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                            and brpl.Active = 1
                                            and brpl.ManufacturerProductLineId = mpl.ManufacturerProductLineId
    join eds.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                               and mo.Active = 1
    left outer join eds.dbo.BidRequestOptions bro on bro.BidHeaderId = @BidHeaderId
                                                 and bro.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                                 and bro.BidRequestProductLineId = brpl.BidRequestProductLineId
                                                 and bro.OptionId = mo.MSRPOptionId
   where s.BidNumber = @BidHeaderId
     and bro.BidRequestOptionId is null
   group by man.ManufacturerId, mpl.ManufacturerProductLineId, mo.MSRPOptionId, brm.BidRequestManufacturerId, brpl.BidRequestProductLineId, mo.MSRPOptionName

insert eds.dbo.BidRequestPriceRanges (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, BidRequestMSRPOptionId, RangeBase, RangeWeight)
  select @BidHeaderId, brm.BidRequestManufacturerId, brpl.BidRequestProductLineId, bro.BidRequestOptionId, pr.RangeBase, pr.RangeWeight
    from MSRPExcelImport s
    join eds.dbo.Manufacturers man on man.Name = s.MANUFACTURER
                                  and man.CategoryId = @CategoryId
                                  and man.Active = 1
    join eds.dbo.BidRequestManufacturer brm on brm.ManufacturerId = man.ManufacturerId
                                           and brm.BidHeaderId = @BidHeaderId
                                           and brm.Active = 1
    join eds.dbo.ManufacturerProductLines mpl on mpl.ManufacturerId = man.ManufacturerId
                                             and mpl.Name = s.ProductLineGroup
                                             and mpl.Active = 1
    join eds.dbo.BidRequestProductLines brpl on brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                            and brpl.Active = 1
                                            and brpl.ManufacturerProductLineId = mpl.ManufacturerProductLineId
    join eds.dbo.MSRPOptions mo on mo.MSRPOptionName = s.DeliveryOption
                               and mo.Active = 1
    join eds.dbo.BidRequestOptions bro on bro.BidRequestProductLineId = brpl.BidRequestProductLineId
                                      and bro.OptionId = mo.MSRPOptionId
    join eds.dbo.PriceRanges pr on pr.CategoryId = @CategoryId
                               and pr.ManufacturerId = man.ManufacturerId
                               and pr.MSRPOptionId = mo.MSRPOptionId
                               and pr.ManufacturerProductLineId = mpl.ManufacturerProductLineId
    left outer join eds.dbo.BidRequestPriceRanges brpr on brpr.BidHeaderId = @BidHeaderId
                                                      and brpr.BidRequestManufacturerId = brm.BidRequestManufacturerId
                                                      and brpr.BidRequestProductLineId = brpl.BidRequestProductLineId
                                                      and brpr.BidRequestMSRPOptionId = bro.BidRequestOptionId
                                                      and brpr.RangeBase = pr.RangeBase
   where s.BidNumber = @BidHeaderId
     and brpr.BidRequestPriceRangeId is null
   group by brm.BidRequestManufacturerId, brpl.BidRequestProductLineId, bro.BidRequestOptionId, pr.RangeBase, pr.RangeWeight
```
