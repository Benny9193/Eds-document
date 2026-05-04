# Procedure: `dbo.usp_UpdateSurvey`

_Generated on 2026-05-04T13:43:24.521Z_

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_UpdateSurvey` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2017-07-27 11:08:02 |
| Modified | 2024-06-21 19:09:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@FacilityId` | IN | uniqueidentifier |  |
| 2 | `@Year` | IN | int |  |
| 3 | `@LastRunDate` | IN | datetime |  |
| 4 | `@FacilityNumber` | IN | varchar(50) |  |
| 5 | `@SurveyNumber` | IN | int |  |
| 6 | `@addLink` | IN | varchar(255) |  |
| 7 | `@createdBy` | IN | varchar(50) |  |
| 8 | `@dateCreated` | IN | datetime |  |
| 9 | `@dateLastChanged` | IN | datetime |  |
| 10 | `@editLink` | IN | varchar(255) |  |
| 11 | `@lastChangedBy` | IN | varchar(50) |  |
| 12 | `@status` | IN | varchar(50) |  |
| 13 | `@viewlink` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Surveys` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure usp_UpdateSurvey @FacilityId uniqueidentifier, @Year int, @LastRunDate datetime, @FacilityNumber varchar(50), @SurveyNumber int, @addLink varchar(255), @createdBy varchar(50), @dateCreated datetime, @dateLastChanged datetime, @editLink varchar(255), @lastChangedBy varchar(50), @status varchar(50), @viewlink varchar(255)
as
begin
declare @Id uniqueidentifier

	select @Id = Id
	  from Surveys
	 where FacilityId = @FacilityId
	   and Year = @Year

	if @@ROWCOUNT = 0
	begin
		insert Surveys (FacilityId, Year, LastRunDate, FacilityNumber, SurveyNumber, addLink, createdBy, dateCreated, dateLastChanged, editLink, lastChangedBy, status, viewlink)
		  values (@FacilityId, @Year, @LastRunDate, @FacilityNumber, @SurveyNumber, @addLink, @createdBy, @dateCreated, @dateLastChanged, @editLink, @lastChangedBy, @status, @viewlink)
	end
	else
	begin
		update Surveys
		   set LastRunDate = @LastRunDate,
		       FacilityNumber = @FacilityNumber,
		       SurveyNumber = @SurveyNumber,
		       addLink = @addLink,
		       createdBy = @createdBy,
		       dateCreated = @dateCreated,
		       dateLastChanged = @dateLastChanged,
		       editLink = @editLink,
		       lastChangedBy = @lastChangedBy,
		       status = @status,
		       viewLink = @viewlink
		 where Id = @Id
	end
end
```
