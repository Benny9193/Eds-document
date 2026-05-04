# View: `dbo.UsersApprovees`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `CometId` | int | YES |  |  |
| 3 | `Attention` | varchar(50) | YES |  |  |
| 4 | `DisableNewRequisition` | tinyint | NO |  |  |
| 5 | `DistrictAcctgCode` | varchar(20) | YES |  |  |
| 6 | `SchoolName` | varchar(50) | YES |  |  |
| 7 | `ApprovalLevelDescription` | varchar(50) | YES |  |  |
| 8 | `ApproverId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ApprovalLevels` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[UsersApprovees] as

SELECT Users.UserId, Users.CometId, Users.Attention, isnull(DisableNewRequisition,0) DisableNewRequisition, Users.DistrictAcctgCode, School.Name SchoolName, ApprovalLevels.Description ApprovalLevelDescription, Users.ApproverId
FROM Users with (nolock)
JOIN School ON School.SchoolId = Users.SchoolId
left outer join ApprovalLevels on ApprovalLevels.ApprovalLevel = isnull(Users.ApprovalLevel,0)
WHERE Users.Active = 1
```
