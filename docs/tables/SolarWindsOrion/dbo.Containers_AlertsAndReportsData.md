# View: `dbo.Containers_AlertsAndReportsData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GroupMemberSnapshotID` | bigint | NO |  |  |
| 2 | `GroupID` | int | NO |  |  |
| 3 | `GroupOwner` | nvarchar(1024) | NO |  |  |
| 4 | `GroupName` | nvarchar(1024) | NO |  |  |
| 5 | `GroupStatusCalculatorID` | smallint | NO |  |  |
| 6 | `GroupStatusCalculatorName` | nvarchar(1024) | NO |  |  |
| 7 | `GroupStatusID` | int | NO |  |  |
| 8 | `GroupStatusName` | nvarchar(50) | NO |  |  |
| 9 | `GroupStatusDescription` | nvarchar(max) | YES |  |  |
| 10 | `GroupFrequency` | int | NO |  |  |
| 11 | `GroupMemberName` | nvarchar(400) | NO |  |  |
| 12 | `GroupMemberFullName` | nvarchar(400) | NO |  |  |
| 13 | `GroupMemberDisplayName` | nvarchar(200) | NO |  |  |
| 14 | `GroupMemberDisplayNamePlural` | nvarchar(200) | NO |  |  |
| 15 | `GroupMemberUri` | nvarchar(400) | NO |  |  |
| 16 | `GroupMemberStatusID` | int | NO |  |  |
| 17 | `GroupMemberStatusName` | nvarchar(50) | NO |  |  |
| 18 | `GroupMemberStatusDescription` | nvarchar(max) | YES |  |  |
| 19 | `EntityType` | nvarchar(200) | NO |  |  |
| 20 | `EntityID` | bigint | YES |  |  |
| 21 | `GroupPercentAvailability` | int | NO |  |  |
| 22 | `GroupMemberPercentAvailability` | int | NO |  |  |
| 23 | `GroupStatusRootCause` | nvarchar(max) | YES |  |  |
| 24 | `NodeID` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ContainerMemberSnapshots` | USER_TABLE |
| `Containers` | USER_TABLE |
| `StatusCalculators` | USER_TABLE |
| `StatusInfo` | USER_TABLE |
| `dbo.sw_GetGroupMembersWorstStatus` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[Containers_AlertsAndReportsData] AS

SELECT
	cms.ContainerMemberSnapshotID AS [GroupMemberSnapshotID],
	cms.ContainerID AS [GroupID],
	c.Owner AS [GroupOwner],
	c.Name AS [GroupName],
	c.StatusCalculatorID AS [GroupStatusCalculatorID],
	sc.Name AS [GroupStatusCalculatorName],
	c.Status AS [GroupStatusID],
	si.StatusName AS [GroupStatusName],
	si.ShortDescription AS [GroupStatusDescription],
	c.Frequency AS [GroupFrequency],
	cms.Name AS [GroupMemberName],
	cms.FullName AS [GroupMemberFullName],
	cms.EntityDisplayName AS [GroupMemberDisplayName],
	cms.EntityDisplayNamePlural AS [GroupMemberDisplayNamePlural],
	cms.MemberUri AS [GroupMemberUri],
	msi.StatusId AS [GroupMemberStatusID],
	msi.StatusName AS [GroupMemberStatusName],
	msi.ShortDescription AS [GroupMemberStatusDescription],
	cms.EntityType, 
    cms.EntityID,
	CASE 
		WHEN c.Status IN (1, 3, 14) THEN 100 -- 'Up', 'Warning', 'Critical'
		ELSE 0
	END	AS [GroupPercentAvailability],
	CASE 
		WHEN cms.Status IN (1, 3, 14) THEN 100 -- 'Up', 'Warning', 'Critical'
		ELSE 0
	END	AS [GroupMemberPercentAvailability],
	CASE 
		WHEN c.Status = 1 THEN 'Group does not have problems.'
		ELSE dbo.sw_GetGroupMembersWorstStatus (cms.[ContainerID]) 
	END	AS [GroupStatusRootCause],
    	null AS [NodeID]
FROM ContainerMemberSnapshots cms
INNER JOIN Containers c ON	cms.ContainerID = c.ContainerID
INNER JOIN StatusCalculators sc ON	c.StatusCalculatorID = sc.StatusCalculatorID
INNER JOIN StatusInfo si ON c.Status = si.StatusId
INNER JOIN StatusInfo msi ON cms.Status = msi.StatusId 
WHERE c.Owner = 'Core'
```
