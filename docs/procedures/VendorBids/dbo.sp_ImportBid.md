# Procedure: `dbo.sp_ImportBid`

_Generated on 2026-05-04T13:43:22.335Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ImportBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-07-25 22:54:49 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SessionId` | IN | int |  |
| 2 | `@VendorBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbidimports` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: July 25, 2011
-- Description:	Import Bid Header
-- =============================================
CREATE PROCEDURE [dbo].[sp_ImportBid]
	-- Add the parameters for the stored procedure here
	@SessionId int,
	@VendorBidId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert vendorbidimports (vendorbidid, SessionId) values (@VendorBidId, @SessionId)
	select scope_identity() vendorbidimportid
END
```
