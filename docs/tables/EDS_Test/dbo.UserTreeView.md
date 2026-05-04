# View: `dbo.UserTreeView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `ShippingId` | int | YES |  |  |
| 5 | `UserName` | varchar(50) | YES |  |  |
| 6 | `Password` | varchar(11) | NO |  |  |
| 7 | `Attention` | varchar(50) | YES |  |  |
| 8 | `ApprovalLevel` | tinyint | YES |  |  |
| 9 | `CometId` | int | YES |  |  |
| 10 | `DisableNewRequisition` | tinyint | YES |  |  |
| 11 | `DistrictAcctgCode` | varchar(20) | YES |  |  |
| 12 | `ApproverId` | int | YES |  |  |
| 13 | `Children` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[UserTreeView]
as
select UserId, DistrictId, SchoolId, ShippingId, UserName, '<Encrypted>' Password, Attention, ApprovalLevel, CometId, DisableNewRequisition, DistrictAcctgCode, ApproverId, (Select count(*) from Users u1 where u1.ApproverId = Users.UserId and Active = 1) Children
  from Users with (nolock)
 where Active = 1
```
