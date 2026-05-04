# View: `dbo.vendorbidsList`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `calendarid` | int | NO |  |  |
| 2 | `dateavailable` | datetime | YES |  |  |
| 3 | `openingdate` | datetime | YES |  |  |
| 4 | `description` | varchar(255) | YES |  |  |
| 5 | `categoryname` | varchar(255) | YES |  |  |
| 6 | `comments` | varchar(4096) | YES |  |  |
| 7 | `status` | varchar(255) | YES |  |  |
| 8 | `state` | char(2) | YES |  |  |
| 9 | `priceplan` | varchar(16) | YES |  |  |
| 10 | `vendorbidid` | int | YES |  |  |
| 11 | `registrationid` | int | YES |  |  |
| 12 | `created` | datetime | YES |  |  |
| 13 | `datemodified` | datetime | YES |  |  |
| 14 | `sessionid` | int | YES |  |  |
| 15 | `statusid` | int | YES |  |  |
| 16 | `bidpwd` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `vendorbids` | USER_TABLE |
| `vendorbidsjournal` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE        VIEW dbo.vendorbidsList AS 
 SELECT bidcalendar.calendarid, bidcalendar.dateavailable, bidcalendar.openingdate, bidcalendar.description, bidcalendar.categoryname, bidcalendar.comments, bidcalendar.status, bidcalendar.state, bidcalendar.priceplan, vendorbids.vendorbidid, vendorbids.registrationid, vendorbids.created, vbj.datemodified, vbj.sessionid, vbj.statusid, cast(vendorbids.bidpwd as varchar(255)) as bidpwd
   FROM bidcalendar
   LEFT JOIN vendorbids ON vendorbids.calendarid = bidcalendar.calendarid
   LEFT JOIN vendorbidsjournal vbj ON vbj.vbjid = 
     (( SELECT top 1 vendorbidsjournal.vbjid
          FROM vendorbidsjournal
         WHERE vendorbidsjournal.vendorbidid = vendorbids.vendorbidid
         ORDER BY vendorbidsjournal.datemodified DESC))
```
