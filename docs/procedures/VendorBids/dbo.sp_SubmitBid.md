# Procedure: `dbo.sp_SubmitBid`

_Generated on 2026-05-04T13:43:22.343Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SubmitBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-02-22 19:41:55 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@registrationid` | IN | int |  |
| 2 | `@calendarid` | IN | int |  |
| 3 | `@vendorbidid` | IN | int |  |
| 4 | `@sessionid` | IN | int |  |
| 5 | `@override` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbidsjournal` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure [dbo].[sp_SubmitBid] @registrationid int, @calendarid int, @vendorbidid int, @sessionid int, @override int
as
declare @status varchar(255),
		@CurrentStatus int,
		@RetVal int

  --Get Current Bid Status
    select @CurrentStatus = StatusId, 
           @status = case isnull(StatusId,0) 
					   when 2 then 'Already Submitted by ' + isnull(rtrim(VendorSessions.SessionUser),'<Unknown>') + ' at ' + cast(VendorBidsJournal.DateModified as varchar(50))
					   else 'OK'
					 end
      from vendorbidsjournal
      join VendorSessions on VendorSessions.SessionId = VendorBidsJournal.SessionId
     where vendorBidId = @vendorbidid
       and vbjid = 
       (select top 1 vbj.vbjid
          from vendorbidsjournal vbj
         where vbj.vendorbidid = vendorbidsjournal.vendorbidid
         order by vbj.datemodified desc)
  
  --Check if already submitted
  if isnull(@CurrentStatus,0) = 2
  begin
    --Aleady Submitted
    if isnull(@override,0) != 1
    begin
      select @status as [status] 
      return 1
    end
    else
    begin
      select @status = 'OK'
    end
  end
  
  insert vendorbidsjournal (vendorbidid, sessionid, statusid, biditemdiscountrate, vendorbidnumber, comments, catalogname, catalogdiscountrate, datemodified, active)
    select @vendorbidid, @sessionid, 2, biditemdiscountrate, vendorbidnumber, comments, catalogname, catalogdiscountrate, getdate(), 1
      from vendorbidsjournal
     where vendorBidId = @vendorbidid
       and vbjid = 
       (select top 1 vbj.vbjid
          from vendorbidsjournal vbj
         where vbj.vendorbidid = vendorbidsjournal.vendorbidid
         order by vbj.datemodified desc)

  if @@rowcount != 1
  begin
    select @status = 'Setting status inserted ' + cast(@@rowcount as varchar(20)) + ' rows'
  end

  if @status = 'OK'
    select @RetVal = 0
  else
    select @RetVal = 1
  
  select @status as [status] 
  return @RetVal
```
