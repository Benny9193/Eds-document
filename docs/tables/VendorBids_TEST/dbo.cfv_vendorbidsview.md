# View: `dbo.cfv_vendorbidsview`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `pk_vbvid` | bigint | YES |  |  |
| 2 | `calendarid` | int | NO |  |  |
| 3 | `dateavailable` | datetime | NO |  |  |
| 4 | `openingdate` | datetime | NO |  |  |
| 5 | `description` | varchar(1281) | NO |  |  |
| 6 | `categoryname` | varchar(50) | NO |  |  |
| 7 | `comments` | varchar(4096) | NO |  |  |
| 8 | `status` | varchar(23) | NO |  |  |
| 9 | `state` | char(2) | NO |  |  |
| 10 | `priceplan` | varchar(16) | NO |  |  |
| 11 | `totalawardminimumdiscount` | decimal(9,5) | NO |  |  |
| 12 | `allowtotalaward` | tinyint | NO |  |  |
| 13 | `active` | tinyint | NO |  |  |
| 14 | `vendorbidid` | int | NO |  |  |
| 15 | `registrationid` | int | YES |  |  |
| 16 | `created` | datetime | NO |  |  |
| 17 | `biditemdiscountrate` | varchar(255) | NO |  |  |
| 18 | `catalogdiscountrate` | varchar(255) | NO |  |  |
| 19 | `datemodified` | datetime | NO |  |  |
| 20 | `vendorbidnumber` | varchar(255) | NO |  |  |
| 21 | `vendorbidcomments` | varchar(4096) | NO |  |  |
| 22 | `catalogname` | varchar(1024) | NO |  |  |
| 23 | `sessionid` | int | NO |  |  |
| 24 | `statusid` | int | NO |  |  |
| 25 | `bidpwd` | varchar(255) | YES |  |  |
| 26 | `requirevendoritemcode` | tinyint | NO |  |  |
| 27 | `requirepagenumber` | tinyint | NO |  |  |
| 28 | `requireitemsperunit` | tinyint | NO |  |  |
| 29 | `receivedat` | varchar(255) | NO |  |  |
| 30 | `bidactive` | tinyint | NO |  |  |
| 31 | `statusbits` | int | YES |  |  |
| 32 | `filterStatus` | varchar(9) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `BidScheduleView` | VIEW |
| `regcalendar` | USER_TABLE |
| `vendorbids` | USER_TABLE |
| `vendorbidsjournal` | USER_TABLE |
| `vendorsessions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vendorbidsview

create VIEW [dbo].[cfv_vendorbidsview] AS 
 SELECT cast((cast(BidScheduleView.BSCId as bigint) * 0x10000000) + (isnull(cast(bidcalendar.calendarid as bigint),0) * 524288)  + isnull(cast(vendorbids.vendorbidid as bigint),0) as bigint) as pk_vbvid, 
        isnull(bidcalendar.calendarid,0) calendarid, 
        isnull(BidScheduleView.DateAvailable,cast('1970-01-01 00:00:00.000' as datetime)) as dateavailable, 
        isnull(BidScheduleView.OpeningDate,cast('1970-01-01 00:00:00.000' as datetime)) as openingdate, 
        isnull(BidScheduleView.description,'') as description, 
        isnull(BidScheduleView.CategoryName,'') as categoryname, 
        isnull(bidcalendar.comments,'') as comments, 
        isnull(case 
                 when (BidScheduleView.DateAvailable > getdate() 
                       or BidScheduleView.DateAvailable is null)
                   or isnull(bidcalendar.calendarid,0) = 0
--                   or isnull(vendorbids.vendorbidid,0) = 0
                   then 'Not Available' 
                 when BidScheduleView.OpeningDate < getdate() then
                   'Closed - ' + 
                   case
                     when vendorbids.vendorbidid is null then 'Not Bid'
                     when isnull(vbj.active,0) = 0 and isnull(vendorbids.vendorbidid,0) != 0 then 'Deleted'
                     else
                       case vbj.statusid 
                         when 2 then 'Submitted' 
                         else 'Not Submitted'
                       end
                   end
                 when BidScheduleView.OpeningDate >= getdate()
                  and isnull(bidcalendar.calendarid,0) != 0 then
--                      vendorbids.vendorbidid is not null then
                   'Available - ' +
                   case
                     when vendorbids.vendorbidid is null then 'Not Started'
                     when isnull(vbj.active,0) = 0 and isnull(vendorbids.vendorbidid,0) != 0 then 'Deleted'
                     else
                       case vbj.statusid
                         when 2 then 'Submitted'
                         else 'Started'
                       end
                   end
                 else 'Unknown' 
               end,'') as status, 
        isnull(BidScheduleView.state,'') as state, 
        isnull(bidcalendar.priceplan,'') as priceplan, 
        isnull(bidcalendar.totalawardminimumdiscount,0) as totalawardminimumdiscount, 
        isnull(bidcalendar.allowtotalaward,0) as allowtotalaward, 
        isnull(bidcalendar.active,0) as active, 
        isnull(vendorbids.vendorbidid,0) as vendorbidid, 
        regcalendar.registrationid,  -- added kjm for testing
      --  isnull(vendorbids.registrationid,isnull(regcalendar.registrationid,0)) as registrationid, 
        isnull(vendorbids.created,cast('1970-01-01 00:00:00.000' as datetime)) as created, 
        isnull(cast(vbj.biditemdiscountrate as varchar(255)),'') as biditemdiscountrate, 
        isnull(cast(vbj.catalogdiscountrate as varchar(255)),'') as catalogdiscountrate, 
        isnull(vbj.datemodified,cast('1970-01-01 00:00:00.000' as datetime)) as datemodified, 
        isnull(cast(vbj.vendorbidnumber as varchar(255)),'') as vendorbidnumber, 
        isnull(cast(vbj.comments as varchar(4096)),'') AS vendorbidcomments, 
        isnull(cast(vbj.catalogname as varchar(1024)),'') as catalogname, 
        isnull(vendorsessions.sessionid,0) as sessionid, 
        isnull(vbj.statusid,0) as statusid, 
        cast('' as varchar(255)) as bidpwd,
        isnull(bidcalendar.requirevendoritemcode,0) as requirevendoritemcode,
        isnull(bidcalendar.requirepagenumber,0) as requirepagenumber,
        isnull(bidcalendar.requireitemsperunit,0) as requireitemsperunit,
        isnull(BidScheduleView.ReceivedAt,'') as receivedat,
        isnull(vbj.active,0) as bidactive,
        isnull(case 
                 when (BidScheduleView.DateAvailable > getdate() 
                       or BidScheduleView.DateAvailable is null)
                   or isnull(bidcalendar.calendarid,0) = 0
--                   or isnull(vendorbids.vendorbidid,0) = 0
                   then 32768
                 when BidScheduleView.OpeningDate < getdate() then
                   16384 + 
                   case
                     when vendorbids.vendorbidid is null then 1
                     when isnull(vbj.active,0) = 0 and isnull(vendorbids.vendorbidid,0) != 0 then 4
                     else
                       case vbj.statusid 
                         when 2 then 32 
                         else 16
                       end
                   end
                 when BidScheduleView.OpeningDate >= getdate() 
                  and isnull(bidcalendar.calendarid,0) != 0 then
--                  and vendorbids.vendorbidid is not null then
                   8192 +
                   case
                     when vendorbids.vendorbidid is not null then 2
                     else 0
                   end +
                   case
                     when isnull(vbj.active,0) = 0 and isnull(vendorbids.vendorbidid,0) != 0 then 4
                     else 0
                   end +
                   case vbj.statusid
                     when 2 then 32
                     else 16
                   end
                 else 0 
               end,0)
/*               0x8000 = 'Not Available'
               0x4000 = 'Closed'
               0x2000 = 'Available'
               0x0001 = 'Not Bid'
               0x0002 = 'Started'
               0x0004 = 'Deleted'
               0x0010 = 'Not Submitted'
               0x0020 = 'Submitted' */
        + (65536 * (select count(*)
           from VendorBids vb1 with (nolock)
           join VendorBidsJournal vbj1 on vbj1.vbjId = 
                ( SELECT top 1 vendorbidsjournal.vbjid
                    FROM vendorbidsjournal with (nolock)
                   WHERE vendorbidsjournal.vendorbidid = vb1.vendorbidid
                   ORDER BY vendorbidsjournal.datemodified DESC)
          where vb1.CalendarId = bidcalendar.calendarid
            and vb1.registrationid = regcalendar.registrationid
            and vbj1.Active = 1)) 
         as statusbits,
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
   FROM BidScheduleView with (nolock)
   /*left outer*/ join regcalendar on regcalendar.BSCId = BidScheduleView.BSCId
-- removed 1-7-11 dch/kjm                             and regcalendar.registrationid = isnull(vendorbids.registrationid,regcalendar.registrationid)
-- Removed Left outer to optimize performance and no longer needed
   join vendorsessions on vendorsessions.registrationid = regcalendar.registrationid
   left outer join bidcalendar on BidCalendar.BSCId = BidScheduleView.BSCId
   left outer JOIN vendorbids ON vendorbids.calendarid = bidcalendar.calendarid
                             and vendorbids.registrationid = regcalendar.registrationid
-- Added previous line to fix incorrect vendorbid being reflected 1-7-11 dch
   left outer JOIN vendorbidsjournal vbj ON vbj.vbjid = 
     ( SELECT top 1 vendorbidsjournal.vbjid
          FROM vendorbidsjournal with (nolock)
         WHERE vendorbidsjournal.vendorbidid = vendorbids.vendorbidid
         ORDER BY vendorbidsjournal.datemodified DESC)
```
