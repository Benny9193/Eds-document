# View: `dbo.vw_ActiveDistrictList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | YES |  |  |
| 2 | `Address` | varchar(50) | YES |  |  |
| 3 | `City` | varchar(50) | YES |  |  |
| 4 | `State` | varchar(2) | YES |  |  |
| 5 | `Zipcode` | varchar(10) | YES |  |  |
| 6 | `BAName` | varchar(174) | YES |  |  |
| 7 | `RTK` | int | YES |  |  |
| 8 | `CooperativeBids` | int | YES |  |  |
| 9 | `TimeAndMaterialBids` | int | YES |  |  |
| 10 | `DistrictId` | int | NO |  |  |
| 11 | `RepName` | varchar(30) | YES |  |  |
| 12 | `RepEmail` | varchar(128) | YES |  |  |
| 13 | `RepPhone` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ActiveDistrictList] as
select District.Name, case PATINDEX('%PAYABLE%',coalesce(DistrictContacts.Address1, District.Address1, '')) when 0 then coalesce(DistrictContacts.Address1, District.Address1,'') else coalesce(DistrictContacts.Address2, District.Address2,'') end Address, coalesce(DistrictContacts.City, District.City, '') City, coalesce(DistrictContacts.State, District.State, '') State, coalesce(DistrictContacts.Zipcode, District.Zipcode, '') Zipcode, case when coalesce(BAContact.FullName,'') = '' then coalesce(District.BAName,'') else BAContact.FullName end BAName, coalesce(District.RTK,0) RTK, coalesce(District.CooperativeBids,0) CooperativeBids, coalesce(District.TimeAndMaterialBids,0) TimeAndMaterialBids, District.DistrictId, CSRep.Name RepName, CSRep.EMail RepEmail, CSRep.Phone RepPhone
  from District with (nolock)
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
  left outer join DistrictContacts on DistrictContacts.DistrictId = District.DistrictId
                                  and DistrictContacts.DistrictContactId =
     (select Top 1 dc.DistrictContactId
        from DistrictContacts dc
       where dc.DistrictId = District.DistrictId
         and coalesce(dc.Address1 + dc.City + dc.State + dc.Zipcode,'') != ''
       order by case dc.DistrictContactTypeId when 2 then 0 when 5 then 1 when 1 then 2 when 3 then 3 when 4 then 4 when 6 then 5 else 9 end)
  left outer join DistrictContacts BAContact on BAContact.DistrictId = District.DistrictId
                                            and BAContact.DistrictContactId =
     (select Top 1 badc.DistrictContactId
        from DistrictContacts badc
       where badc.DistrictId = District.DistrictId
         and badc.DistrictContactTypeId = 1)
 where isnull(District.State,'') != ''
   and ISNULL(District.DistrictCode,'') != ''
   and ISNULL(District.County,'') != 'TEST'
   and District.Active = 1
```
