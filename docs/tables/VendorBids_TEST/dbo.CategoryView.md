# View: `dbo.CategoryView`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryId` | int | YES |  |  |
| 2 | `CategoryName` | varchar(50) | YES |  |  |
| 3 | `filterStatus` | varchar(9) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `BidScheduleView` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create view CategoryView as
select bidscheduleview.CategoryId, bidscheduleview.CategoryName,
        isnull(case 
                 when BidScheduleView.OpeningDate < getdate()
                   then 'Closed'
                 when (BidScheduleView.DateAvailable > getdate() 
                       or BidScheduleView.DateAvailable is null)
                   or isnull(bidcalendar.calendarid,0) = 0
                   then 'Future' 
                 when BidScheduleView.OpeningDate >= getdate()  
                  and isnull(bidcalendar.calendarid,0) != 0 
                   then 'Available'
                 else 'Unknown' 
               end,'') as filterStatus
  from BidScheduleView with (nolock)
  left outer join bidcalendar on BidCalendar.BSCId = BidScheduleView.BSCId
 group by bidscheduleview.CategoryId, bidscheduleview.CategoryName,         isnull(case 
                 when BidScheduleView.OpeningDate < getdate()
                   then 'Closed'
                 when (BidScheduleView.DateAvailable > getdate() 
                       or BidScheduleView.DateAvailable is null)
                   or isnull(bidcalendar.calendarid,0) = 0
                   then 'Future' 
                 when BidScheduleView.OpeningDate >= getdate()  
                  and isnull(bidcalendar.calendarid,0) != 0 
                   then 'Available'
                 else 'Unknown' 
               end,'')
```
