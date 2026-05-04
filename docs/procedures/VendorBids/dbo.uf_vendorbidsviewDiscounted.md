# Function: inline table-valued: `dbo.uf_vendorbidsviewDiscounted`

_Generated on 2026-05-04T13:08:01.435Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_vendorbidsviewDiscounted` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2011-06-26 20:16:16 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@PassPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidId` | IN | int |  |
| 3 | `@DiscountRate` | IN | decimal(9,5) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `bidcalendar` | USER_TABLE |  |
| `bidcalendaritems` | USER_TABLE |  |
| `BidScheduleView` | VIEW |  |
| `regcalendar` | USER_TABLE |  |
| `registrations` | USER_TABLE |  |
| `vendorbiditemsview` | VIEW |  |
| `vendorbids` | USER_TABLE |  |
| `vendorbidsjournal` | USER_TABLE |  |
| `dbo.uf_vendorbiditemsview` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_vendorbidsviewDiscounted] (@PassPhrase varchar(255), @VendorBidId int, @DiscountRate decimal (9,5))
returns table as
return (SELECT cast((cast(BidScheduleView.BSCId as bigint) * 0x10000000) + (isnull(cast(bidcalendar.calendarid as bigint),0) * 524288)  + isnull(cast(vendorbids.vendorbidid as bigint),0) as bigint) as pk_vbvid, 
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
        isnull(cast(cast(DecryptByPassPhrase(@PassPhrase, vbj.biditemdiscountrate, 1, cast(vbj.vendorbidid as varbinary)) as varchar(50)) as decimal(9,5)),cast(0 as decimal(9,5))) as biditemdiscountrate,
        isnull(cast(cast(DecryptByPassPhrase(@PassPhrase, vbj.catalogdiscountrate, 1, cast(vbj.vendorbidid as varbinary)) as varchar(50)) as decimal(9,5)),cast(0 as decimal(9,5))) as catalogdiscountrate, 
        isnull(vbj.datemodified,cast('1970-01-01 00:00:00.000' as datetime)) as datemodified, 
        isnull(cast(DecryptByPassPhrase(@PassPhrase, vbj.vendorbidnumber, 1, cast(vbj.vendorbidid as varbinary)) as varchar),'') as vendorbidnumber, 
        isnull(cast(DecryptByPassPhrase(@PassPhrase, vbj.comments, 1, cast(vbj.vendorbidid as varbinary)) as varchar),'') AS vendorbidcomments, 
        isnull(cast(DecryptByPassPhrase(@PassPhrase, vbj.catalogname, 1, cast(vbj.vendorbidid as varbinary)) as varchar),'') as catalogname, 
        isnull(vbj.sessionid,0) as sessionid, 
        isnull(vbj.statusid,0) as statusid, 
        isnull(cast(DecryptByPassPhrase(@PassPhrase, vendorbids.bidpwd, 1, cast(vbj.vendorbidid as varbinary)) as varchar(50)),'') as bidpwd, 
--        cast(isnull(vendorbids.bidpwd,'') as varchar(255)) as bidpwd,
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
               end,'') as filterStatus,
        isnull(registrations.code,'') registrationcode,
        isnull(registrations.name,'') registrationname,
        (select count(*) from bidcalendaritems with (nolock) where bidcalendaritems.calendarid = bidcalendar.calendarid) TotalItems,
        (select count(*) from vendorbiditemsview with (nolock) where vendorbiditemsview.vendorbidid = vendorbids.vendorbidid and vendorbiditemsview.itemhasbeenbid = 1) ItemsBid,
        (select sum(vbiv.QuantityBid * (cast(vbiv.UnitPrice as money)) - round(cast(vbiv.UnitPrice as money) * @DiscountRate / 100,2)) from dbo.uf_vendorbiditemsview(@PassPhrase, @VendorBidId) vbiv) TotalCost
   FROM BidScheduleView with (nolock)
   join regcalendar on regcalendar.BSCId = BidScheduleView.BSCId
   join registrations on registrations.registrationid = regcalendar.registrationid
-- removed 1-7-11 dch/kjm                             and regcalendar.registrationid = isnull(vendorbids.registrationid,regcalendar.registrationid)
-- Removed Left outer to optimize performance and no longer needed
   join bidcalendar on BidCalendar.BSCId = BidScheduleView.BSCId
   JOIN vendorbids ON vendorbids.calendarid = bidcalendar.calendarid
                  and vendorbids.registrationid = regcalendar.registrationid
-- Added previous line to fix incorrect vendorbid being reflected 1-7-11 dch
   left outer JOIN vendorbidsjournal vbj ON vbj.vbjid = 
     ( SELECT top 1 vendorbidsjournal.vbjid
          FROM vendorbidsjournal with (nolock)
         WHERE vendorbidsjournal.vendorbidid = vendorbids.vendorbidid
         ORDER BY vendorbidsjournal.datemodified DESC)
  where vendorbids.vendorbidid = @VendorBidId)
```
