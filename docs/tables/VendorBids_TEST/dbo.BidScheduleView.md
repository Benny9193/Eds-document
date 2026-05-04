# View: `dbo.BidScheduleView`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `bscid` | int | NO |  |  |
| 2 | `BidScheduleId` | int | NO |  |  |
| 3 | `CoopName` | varchar(50) | YES |  |  |
| 4 | `DateAdvertised` | datetime | YES |  |  |
| 5 | `DateAvailable` | datetime | YES |  |  |
| 6 | `OpeningDate` | datetime | YES |  |  |
| 7 | `State` | char(2) | YES |  |  |
| 8 | `ReceivedAt` | varchar(255) | YES |  |  |
| 9 | `CategoryId` | int | YES |  |  |
| 10 | `CategoryName` | varchar(50) | YES |  |  |
| 11 | `Description` | varchar(1281) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidSchedule` | USER_TABLE |
| `BidScheduleCats` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidDocumentsViewByUser`](dbo.BidDocumentsViewByUser.md) | VIEW |
| [`dbo.CategoryView`](dbo.CategoryView.md) | VIEW |
| [`dbo.cfv_vendorbidsview`](dbo.cfv_vendorbidsview.md) | VIEW |
| `dbo.uf_vendorbidsview` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_vendorbidsviewDiscounted` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| [`dbo.vendorbidsview`](dbo.vendorbidsview.md) | VIEW |
| [`dbo.vendorbidsviewByUser`](dbo.vendorbidsviewByUser.md) | VIEW |
| [`dbo.vendordocumentsviewByUser`](dbo.vendordocumentsviewByUser.md) | VIEW |

## Definition

```sql
CREATE view [dbo].[BidScheduleView] as
select BidScheduleCats.bscid, BidSchedule.BidScheduleId, BidSchedule.CoopName, BidSchedule.DateAdvertised, BidSchedule.DateAvailable, BidSchedule.OpeningDate, BidSchedule.State, BidSchedule.ReceivedAt, BidScheduleCats.CategoryId, BidScheduleCats.CategoryName, isnull(BidSchedule.Description,'') + case rtrim(isnull(BidSchedule.Description,'')) when '' then '' else char(13) + char(10) end + isnull(BidScheduleCats.Description,'') Description
  from BidSchedule
  join BidScheduleCats on BidScheduleCats.BidScheduleId = BidSchedule.BidScheduleId --and ISNULL(BidScheduleCats.Active,0)=1
```
