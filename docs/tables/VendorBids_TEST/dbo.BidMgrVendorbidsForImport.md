# View: `dbo.BidMgrVendorbidsForImport`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `calendarid` | int | NO |  |  |
| 2 | `VendorCode` | varchar(16) | YES |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `vendorbidid` | int | NO |  |  |
| 5 | `created` | datetime | YES |  |  |
| 6 | `BidImportExists` | int | NO |  |  |
| 7 | `registrationid` | int | NO |  |  |
| 8 | `bidpwd` | varchar(255) | YES |  |  |
| 9 | `VendorChange` | varchar(27) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `Registrations` | USER_TABLE |
| `vendorbids` | USER_TABLE |
| `dbo.bidimports` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE  VIEW [dbo].[BidMgrVendorbidsForImport] AS 
 SELECT bidcalendar.calendarid, registrations.code VendorCode, registrations.name VendorName, vendorbids.vendorbidid, vendorbids.created, 
        -- changed 12/30/2022
        --( case when (select count(*) from eds.dbo.Bidimports 
        --             where BidHeaderId = bidcalendar.calendarid and vendorId=Registrations.VendorId) > 0
		(case when exists (select bi.BidImportId from eds.dbo.bidimports bi
                     where bi.BidHeaderId = bidcalendar.calendarid and bi.VendorBidId = vendorbids.vendorbidid) 
          then 1 
          else 0
          end
        ) BidImportExists,
        vendorbids.registrationid, cast(vendorbids.bidpwd as varchar(255)) as bidpwd,
		-- added 12/30/2022
		case when exists (select bi.BidImportId from eds.dbo.bidimports bi
		                  where bi.BidHeaderId = bidcalendar.calendarid and bi.vendorbidid = vendorbids.vendorbidid and registrations.vendorid != bi.VendorId) 
		then 'Vendor Changed after import'
		else ''
		end VendorChange 
-- SELECT bidcalendar.calendarid, bidcalendar.dateavailable, bidcalendar.openingdate, bidcalendar.description, bidcalendar.categoryname, bidcalendar.comments, bidcalendar.status, bidcalendar.state, bidcalendar.priceplan, vendorbids.vendorbidid, vendorbids.registrationid, vendorbids.created, cast(vendorbids.bidpwd as varchar(255)) as bidpwd
   FROM bidcalendar
   join (select vb1.calendarid, vb1.registrationid 
           from vendorbids vb1 with (nolock) 
          group by vb1.calendarid, vb1.registrationid) ss on ss.calendarid = bidcalendar.calendarid
   JOIN vendorbids ON vendorbids.VendorBidId = 
     (select top 1 VendorBidId
        from vendorbids vb with (nolock)
       where vb.calendarid = bidcalendar.calendarid
         and vb.registrationid = ss.registrationid
       order by vb.vendorbidid desc)
   JOIN Registrations ON Registrations.RegistrationId = vendorbids.RegistrationId
/*   JOIN vendorbidsjournal vbj ON vbj.vbjid = 
     (( SELECT top 1 vendorbidsjournal.vbjid
          FROM vendorbidsjournal
         WHERE vendorbidsjournal.vendorbidid = vendorbids.vendorbidid
         ORDER BY vendorbidsjournal.datemodified DESC)) */
--  group by bidcalendar.calendarid, bidcalendar.dateavailable, bidcalendar.openingdate, bidcalendar.description, bidcalendar.categoryname, bidcalendar.comments, bidcalendar.status, bidcalendar.state, bidcalendar.priceplan, vendorbids.vendorbidid, vendorbids.registrationid, vendorbids.created, cast(vendorbids.bidpwd as varchar(255))
```
