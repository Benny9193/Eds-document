# Procedure: `dbo.sp_refreshFacility`

_Generated on 2026-05-04T13:43:24.514Z_

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_refreshFacility` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-01-13 19:54:07 |
| Modified | 2024-06-21 19:09:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@EmployerId` | IN | uniqueidentifier |  |
| 2 | `@EIN` | IN | varchar(50) |  |
| 3 | `@FacilityNumber` | IN | varchar(50) |  |
| 4 | `@Name` | IN | varchar(50) |  |
| 5 | `@County` | IN | varchar(50) |  |
| 6 | `@HazardousChemicalsReported` | IN | varchar(50) |  |
| 7 | `@SurveyStatus` | IN | varchar(50) |  |
| 8 | `@FacilityStatus` | IN | varchar(50) |  |
| 9 | `@SurveyLink` | IN | varchar(255) |  |
| 10 | `@Municipality` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Employers` | USER_TABLE |  |
| `Facilities` | USER_TABLE |  |
| `dbo.RTK_Sites` | unresolved | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_refreshFacility] @EmployerId uniqueidentifier, @EIN varchar(50), @FacilityNumber varchar(50), @Name varchar(50), @County varchar(50), @HazardousChemicalsReported varchar(50), @SurveyStatus varchar(50), @FacilityStatus varchar(50), @SurveyLink varchar(255), @Municipality varchar(50)
as
begin
declare @FacilityId uniqueidentifier,
		@DistrictId int

select @FacilityId = Facilities.Id, @DistrictId = Employers.DistrictId
  from Employers
  join Facilities on Facilities.EmployerId = Employers.Id
                 and  Facilities.FacilityNumber = @FacilityNumber
                 and Facilities.deletedAt is null
 where Employers.Id = @EmployerId
 
if @@ROWCOUNT = 0
begin
  select @FacilityId = NEWID()
  insert Facilities(Id, EmployerId, EIN, FacilityNumber, Name, County, HazardousChemicalsReported, SurveyStatus, FacilityStatus, SurveyLink, Municipality)
    values (@FacilityId, @EmployerId, @EIN, @FacilityNumber, @Name, @County, @HazardousChemicalsReported, @SurveyStatus, @FacilityStatus, @SurveyLink, @Municipality)
end
else
begin
  update Facilities
     set EIN = @EIN,
         FacilityNumber = @FacilityNumber,
         Name = @Name,
         County = @County,
         HazardousChemicalsReported = @HazardousChemicalsReported,
         SurveyStatus = @SurveyStatus,
         FacilityStatus = @FacilityStatus,
         SurveyLink = @SurveyLink,
         Municipality = @Municipality,
	     lastRefreshed = GETDATE()
    from Facilities
   where Facilities.FacilityNumber = @FacilityNumber
end

if @DistrictId is null
begin
  select @DistrictId = (select top 1 DistrictId
                          from EDS.dbo.RTK_Sites
                         where RTK_Sites.NJEIN = @FacilityNumber
                           and RTK_Sites.Active = 1)
                          
  update Employers
     set DistrictId = @DistrictId
   where Employers.Id = @EmployerId
end

select @FacilityId as FacilityId, @DistrictId as DistrictId

end
```
