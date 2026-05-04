# Procedure: `dbo.sp_VBUpload`

_Generated on 2026-05-04T13:08:01.423Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VBUpload` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-08-04 23:47:30 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserCode` | IN | varchar(50) |  |
| 2 | `@pPassword` | IN | varchar(50) |  |
| 3 | `@pPassPhrase` | IN | varchar(50) |  |
| 4 | `@pTimeStamp` | IN | varchar(50) |  |
| 5 | `@pBidId` | IN | varchar(50) |  |
| 6 | `@pVendorBidNumber` | IN | varchar(50) |  |
| 7 | `@pTotalAwardDiscount` | IN | varchar(50) |  |
| 8 | `@pCatalogDiscount` | IN | varchar(50) |  |
| 9 | `@pVendorComments` | IN | varchar(512) |  |
| 10 | `@pOverwrite` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `bidcalendar` | USER_TABLE |  |
| `bidcalendaritems` | USER_TABLE |  |
| `debugmsgs` | USER_TABLE |  |
| `regusers` | USER_TABLE |  |
| `vendorbiditems` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |
| `vendorbidsjournal` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: August 4, 2011
-- Description:	Upload Bid Header
-- =============================================
CREATE PROCEDURE [dbo].[sp_VBUpload]
	-- Add the parameters for the stored procedure here
	@pUserCode varchar(50),
	@pPassword varchar(50),
	@pPassPhrase varchar(50),
	@pTimeStamp varchar(50),
	@pBidId varchar(50),
	@pVendorBidNumber varchar(50),
	@pTotalAwardDiscount varchar(50),
	@pCatalogDiscount varchar(50),
	@pVendorComments varchar(512),
	@pOverwrite varchar(50)
AS
BEGIN
declare @SessionId int,
		@RegistrationId int,
		@VendorBidId int,
		@addCalendar int,
		@PriorUploadCount int,
		@StatusMsg varchar(255)
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 insert debugmsgs (Msg) select 'UserCode=' + isnull(@pUserCode,'null') + ' Password=' + isnull(@pPassword,'null') + ' TS=' + isnull(@pTimeStamp,'null') + ' BidId=' + isnull(@pBidId,'null' + ' Overwrite=' + ISNULL(@pOverwrite,''))
 
	select @SessionId = 0, @VendorBidId = 0, @PriorUploadCount = 0, @StatusMsg = 'OK'
	
	select top 1 @RegistrationId = RegistrationId
  	  from regusers with (nolock)
--	 where Code = rtrim(@pUserCode)
	 where email = rtrim(@pUserCode)
	   and Password = rtrim(@pPassword)
	 order by RegistrationId

	if @@rowcount = 1
	begin
		insert VendorSessions (RegistrationId, SessionUser, StartTime, IPAddress)
		  values (@RegistrationId, @pUserCode, getdate(), @pTimeStamp)

		select @SessionId = SCOPE_IDENTITY()

        select @addCalendar = COUNT(*)
          from bidcalendar with (nolock)
         where calendarid = CAST(@pBidId as int)
         
        if @addCalendar < 1
        begin
          -- Manually Add Calendar Entry
          insert bidcalendar (active, calendarid)
            values (1, CAST(@pBidId as int))
        end

		select @PriorUploadCount = COUNT(*)
		  from vendorbids with (nolock)
		 where registrationid = @RegistrationId
		   and calendarid = cast(@pBidId as int)

		if isnull(@PriorUploadCount,0) = 0 or @pOverwrite = 'True'
		begin
			insert into vendorbids (active, registrationid, calendarid, bidpwd)
				values (1, @RegistrationId, cast(@pBidId as int), null)

			select @VendorBidId = scope_identity()

			--Must do this AFTER we know the vendorbidid
			update vendorbids
			   set bidpwd = EncryptByPassPhrase(@pPassPhrase, @pPassPhrase, 1, cast(@VendorBidId as varbinary)) 
			 where vendorbidid = @VendorBidId

			insert vendorbidsjournal (vendorbidid, sessionid, statusid, active, biditemdiscountrate, catalogdiscountrate, vendorbidnumber, comments)
			  select @VendorBidId, @SessionId, 1, 1,
			         EncryptByPassPhrase(@pPassPhrase, cast(isnull(cast(case rtrim(@pTotalAwardDiscount) when '' then 0 else @pTotalAwardDiscount end as decimal(9,5)),0) as varchar(255)), 1, cast(@VendorBidId as varbinary)), 
					 EncryptByPassPhrase(@pPassPhrase, cast(isnull(cast(case rtrim(@pCatalogDiscount) when '' then 0 else @pCatalogDiscount end as decimal(9,5)),0) as varchar(255)), 1, cast(@VendorBidId as varbinary)),
					 EncryptByPassPhrase(@pPassPhrase, @pVendorBidNumber, 1, cast(@VendorBidId as varbinary)), 
					 EncryptByPassPhrase(@pPassPhrase, @pVendorComments, 1, cast(@VendorBidId as varbinary))
			   
			insert into vendorbiditems (vendorbidid, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossrefstext)
			  select @VendorBidId, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossreftext
				from bidcalendaritems with (nolock)
			   where calendarid = cast(@pBidId as int)
		end
		else
		begin
		    select @StatusMsg = 'Cannot overwrite previous transmission without your permission.'
		end
	end

	select @SessionId as SessionId, @VendorBidId as VendorBidId, @StatusMsg as StatusMsg

END
```
