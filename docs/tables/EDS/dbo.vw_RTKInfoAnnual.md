# View: `dbo.vw_RTKInfoAnnual`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Year` | int | YES |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |
| 4 | `NJEIN` | varchar(20) | YES |  |  |
| 5 | `FacilityId` | varchar(1) | NO |  |  |
| 6 | `FacilityName` | varchar(50) | YES |  |  |
| 7 | `CoMunCode` | varchar(5) | YES |  |  |
| 8 | `ExposedEmployeesCount` | int | YES |  |  |
| 9 | `FacilityEmergencyContact` | varchar(100) | YES |  |  |
| 10 | `EmergencyPhone` | varchar(50) | YES |  |  |
| 11 | `Location` | varchar(406) | YES |  |  |
| 12 | `MailingAddress` | varchar(406) | YES |  |  |
| 13 | `EmailResponsibleOfficial` | varchar(200) | YES |  |  |
| 14 | `PhoneResponsibleOfficial` | varchar(50) | YES |  |  |
| 15 | `TitleResponsibleOfficial` | varchar(100) | YES |  |  |
| 16 | `AlternateDesc` | varchar(60) | YES |  |  |
| 17 | `Manufacturer` | varchar(50) | NO |  |  |
| 18 | `MSDSId` | int | YES |  |  |
| 19 | `Quantity` | int | YES |  |  |
| 20 | `InventoryCode` | char(2) | YES |  |  |
| 21 | `InventoryDesc` | varchar(25) | YES |  |  |
| 22 | `ProductLocation` | varchar(50) | NO |  |  |
| 23 | `ProductExposedEmployees` | int | YES |  |  |
| 24 | `Purpose` | varchar(50) | YES |  |  |
| 25 | `RTK_PurposeID` | int | YES |  |  |
| 26 | `UOMCode` | char(1) | YES |  |  |
| 27 | `UOM` | varchar(20) | YES |  |  |
| 28 | `SubstanceNo` | char(4) | YES |  |  |
| 29 | `CASChemicalName` | varchar(50) | YES |  |  |
| 30 | `CASRegNo` | varchar(11) | NO |  |  |
| 31 | `DOT_Id` | char(4) | YES |  |  |
| 32 | `MixturePercentCode` | char(2) | YES |  |  |
| 33 | `MixtureDesc` | varchar(12) | YES |  |  |
| 34 | `SpecHazCodes` | varchar(36) | YES |  |  |
| 35 | `ContainerCode` | char(2) | YES |  |  |
| 36 | `ContainerDesc` | varchar(30) | YES |  |  |
| 37 | `CategoryId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `MSDS` | USER_TABLE |
| `MSDSDetail` | USER_TABLE |
| `RTK_CASFile` | USER_TABLE |
| `RTK_ContainerCodes` | USER_TABLE |
| `RTK_InventoryRangeCodes` | USER_TABLE |
| `RTK_MixtureCodes` | USER_TABLE |
| `RTK_Purposes` | USER_TABLE |
| `RTK_Sites` | USER_TABLE |
| `RTK_UOMCodes` | USER_TABLE |
| `vw_RTKItemsAnnual` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTKInfoAnnual] as
select rri.Year, District.DistrictId, District.Name, rs.NJEIN, '' /*rs.FacilityId*/ FacilityId, rs.FacilityName, rs.CoMunCode, rs.ExposedEmployeesCount, 
       rs.FacilityEmergencyContact, rs.EmergencyPhone, 
       case isnull(rtrim(ltrim(rs.FacilityLocation1)),'') when '' then '' else isnull(rtrim(ltrim(rs.FacilityLocation1)),'') end + case isnull(rtrim(ltrim(rs.FacilityLocation2)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.FacilityLocation2)),'') end + case isnull(rtrim(ltrim(rs.FacilityLocation3)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.FacilityLocation3)),'') end + case isnull(rtrim(ltrim(rs.FacilityLocation4)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.FacilityLocation4)),'') end Location,
       case isnull(rtrim(ltrim(rs.MailingAddress1)),'') when '' then '' else isnull(rtrim(ltrim(rs.MailingAddress1)),'') end + case isnull(rtrim(ltrim(rs.MailingAddress2)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.MailingAddress2)),'') end + case isnull(rtrim(ltrim(rs.MailingAddress3)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.MailingAddress3)),'') end + case isnull(rtrim(ltrim(rs.MailingAddress4)),'') when '' then '' else char(13) + char(10) + isnull(rtrim(ltrim(rs.MailingAddress4)),'') end MailingAddress,
       rs.EmailResponsibleOfficial, rs.PhoneResponsibleOfficial, rs.TitleResponsibleOfficial,
       rri.RTKDescription AlternateDesc, rri.Manufacturer, rri.MSDSId, rri.Quantity, irc.RangeCode InventoryCode, irc.Description InventoryDesc, isnull(rri.ExactLocationOnSite,'') ProductLocation, rs.ExposedEmployeesCount ProductExposedEmployees, rp.Description Purpose, rp.RTK_PurposeID, ru.UOMCode, ru.Description UOM,
       cf.SubstanceNo, cf.CASChemicalName, cf.CASRegNo, cf.DOT_Id, md.MixturePercentCode, mc.Description MixtureDesc,
       case when cf.SpecialHealthHazard = 1 then right(case cf.Carcinogen when 1 then ', CA' else '' end + Case cf.Mutagen when 1 then ', MU' else '' end + Case cf.Teratogen when 1 then ', TE' else '' end + Case cf.Corrosive when 1 then ', CO' else '' end + Case cf.F4_Flammable4th when 1 then ', F4' else '' end + Case cf.F3_Flammable3rd when 1 then ', F3' else '' end + Case cf.R4_Reactive4th when 1 then ', R4' else '' end + Case cf.R3_Reactive3rd when 1 then ', R3' else '' end + Case cf.R2_Reactive2nd when 1 then ', R2' else '' end,LEN(case cf.Carcinogen when 1 then ', CA' else '' end + Case cf.Mutagen when 1 then ', MU' else '' end + Case cf.Teratogen when 1 then ', TE' else '' end + Case cf.Corrosive when 1 then ', CO' else '' end + Case cf.F4_Flammable4th when 1 then ', F4' else '' end + Case cf.F3_Flammable3rd when 1 then ', F3' else '' end + Case cf.R4_Reactive4th when 1 then ', R4' else '' end + Case cf.R3_Reactive3rd when 1 then ', R3' else '' end + Case cf.R2_Reactive2nd when 1 then ', R2' else '' end) - 2) else '' end SpecHazCodes,
       cc.ContainerCode, cc.ContainerDesc, rri.CategoryId
  from (
    select r2.DistrictId, r2.RTK_SitesId, r2.Year, r2.ExactLocationOnSite, isnull(r2.Manufacturer,'') Manufacturer, r2.ContainerCodesId, r2.UOMCodesId, r2.RTK_PurposeId, r2.MSDSId, r2.RTKDescription, SUM(r2.Quantity) Quantity, r2.CategoryId 
      from vw_RTKItemsAnnual r2
     group by r2.DistrictId, r2.RTK_SitesId, r2.Year, r2.ExactLocationOnSite, isnull(r2.Manufacturer,''), r2.ContainerCodesId, r2.UOMCodesId, r2.RTK_PurposeId, r2.MSDSId, r2.RTKDescription, r2.CategoryId
       ) rri
  join District on District.DistrictId = rri.DistrictId
  join RTK_Sites rs on rs.RTK_SitesId = rri.RTK_SitesId
                   and rs.Active = 1
--  join RTK_Items ri on ri.RTK_ItemsId = rri.RTK_ItemsId
  join MSDS on MSDS.MSDSId = rri.MSDSId
  join (
	select MSDSDetail.MSDSID, RTK_CASFile.SubstanceNo, max(MSDSDetail.MixturePercentCode) MixturePercentCode
	  from MSDSDetail
	  join RTK_CASFile on RTK_CASFile.RTK_CASFileId = MSDSDetail.RTK_CASFileId
	                  and RTK_CASFile.SubstanceNo != ''
	 group by MSDSDetail.MSDSID, RTK_CASFile.SubstanceNo
		) md on md.MSDSID = MSDS.MSDSId
  join RTK_CASFile cf on cf.RTK_CASFileId = (
	select Top 1 RTK_CASFile.RTK_CASFileId
	  from RTK_CASFile
	 where RTK_CASFile.SubstanceNo = md.SubstanceNo
	 order by RTK_CASFile.CASRegNo)
 -- join Items on Items.ItemId = rri.ItemId
  left outer join RTK_ContainerCodes cc on cc.ContainerCodesID = rri.ContainerCodesId
  left outer join RTK_Purposes rp on rp.RTK_PurposeID = isnull(rri.RTK_PurposeId,35)
  left outer join RTK_UOMCodes ru on ru.UOMCodesID = rri.UOMCodesId
  left outer join RTK_MixtureCodes mc on mc.MixtureCode = md.MixturePercentCode
  left outer join RTK_InventoryRangeCodes irc on irc.InventoryRangeCodesID =
    (select Top 1 RTK_InventoryRangeCodes.InventoryRangeCodesID from RTK_InventoryRangeCodes where rri.Quantity between RTK_InventoryRangeCodes.BegRange and RTK_InventoryRangeCodes.EndRange)
 where ISNULL(rri.RTKDescription,'') != ''
```
