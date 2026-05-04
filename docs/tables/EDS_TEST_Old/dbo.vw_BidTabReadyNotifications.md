# View: `dbo.vw_BidTabReadyNotifications`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictNotificationId` | int | YES |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `CategoryId` | int | NO |  |  |
| 5 | `CategoryName` | varchar(50) | YES |  |  |
| 6 | `NotifyUser` | int | YES |  |  |
| 7 | `NotifyApprover` | int | YES |  |  |
| 8 | `NotifyBA` | int | YES |  |  |
| 9 | `NotifyPrimary` | int | YES |  |  |
| 10 | `NotifyAD` | int | YES |  |  |
| 11 | `NotifyBG` | int | YES |  |  |
| 12 | `OtherNotify` | varchar(4096) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictNotifications` | USER_TABLE |
| `dbo.RegExpMatch` | unresolved |
| [`master.dbo.RegExpMatch`](../master/dbo.RegExpMatch.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_BidTabReadyNotifications]
as
select DistrictNotifications.DistrictNotificationId, District.DistrictId, District.Name DistrictName, Category.CategoryId, Category.Name CategoryName, 
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{User}',1),0) end NotifyUser, 
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{Approver}',1),0) end NotifyApprover,
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{BA}',1),0) end NotifyBA,
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{Primary}',1),0) end NotifyPrimary,
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{AD}',1),0) end NotifyAD,
		case when DistrictNotifications.DistrictNotificationId is null then 1 else coalesce(master.dbo.RegExpMatch(NotifyList,'{BG}',1),0) end NotifyBG,
		coalesce(OtherNotify,'') OtherNotify
  from DistrictCategories
  join Category on Category.CategoryId = DistrictCategories.CategoryId
               and Category.Active = 1
  join District on District.DistrictId = DistrictCategories.DistrictId
  left outer join DistrictNotifications on DistrictNotifications.DistrictId = District.DistrictId
                                       and DistrictNotifications.CategoryId = Category.CategoryId
                                       and DistrictNotifications.NotificationType = 'BidTabReady'
 where DistrictCategories.Active = 1
   and DistrictCategories.AllowAddenda = 1
-- order by District.Name, Category.Name
```
