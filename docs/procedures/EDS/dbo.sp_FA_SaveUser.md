# Procedure: `dbo.sp_FA_SaveUser`

_Generated on 2026-05-04T13:07:57.473Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SaveUser` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:51:30 |
| Modified | 2024-12-01 08:26:37 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@UserID` | IN | int |  |
| 2 | `@FirstName` | IN | varchar(100) |  |
| 3 | `@LastName` | IN | varchar(100) |  |
| 4 | `@Email` | IN | varchar(255) |  |
| 5 | `@Password` | IN | varchar(50) |  |
| 6 | `@DistrictID` | IN | int |  |
| 7 | `@SchoolID` | IN | int |  |
| 8 | `@ApproverID` | IN | int |  |
| 9 | `@Attention` | IN | varchar(50) |  |
| 10 | `@ApprovalLevel` | IN | tinyint |  |
| 11 | `@DistrictAcctgCode` | IN | varchar(20) |  |
| 12 | `@NotificationOptionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SecurityRoleUsers` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     PROCEDURE [dbo].[sp_FA_SaveUser] @UserID int, @FirstName varchar(100), @LastName varchar(100), @Email varchar(255), @Password varchar(50), @DistrictID int, @SchoolID int, @ApproverID int, @Attention varchar(50),@ApprovalLevel tinyint, @DistrictAcctgCode varchar(20), @NotificationOptionId int

AS

	DECLARE @ShippingId int ,@Active tinyint ,@UserName varchar (10),@DisableNewRequisition tinyint ,/*@DistrictAcctgCode varchar (20),*/@NewRequisitionButton int ,@AllowIncidentals tinyint ,@AllowVendorChanges tinyint ,@AllowShipToChanges tinyint ,@AllowTM tinyint ,@SecurityRoleId int ,@Use20 tinyint ,@EmailByPassDate date

	SET @ShippingId = null;
	SET @Active = 1;
	SET @UserName = NULL;
	SET @DisableNewRequisition = NULL;
--	SET @DistrictAcctgCode = NULL;
	SET @NewRequisitionButton = 1;
	SET @AllowIncidentals = 1;
	SET @AllowVendorChanges = NULL;
	SET @AllowShipToChanges = NULL;
	SET @AllowTM = 0;
	SET @SecurityRoleId = NULL;
	SET @Use20 = NULL;
	SET @EmailByPassDate = NULL;
	
	IF @UserID = 0

		BEGIN
			
			INSERT INTO Users
			   ([DistrictId]
			   ,[SchoolId]
			   ,[ShippingId]
			   ,[Active]
			   ,[UserName]
--			   ,[Password]
			   ,[Attention]
			   ,[ApprovalLevel]
			   ,[DisableNewRequisition]
			   ,[DistrictAcctgCode]
			   ,[ApproverId]
			   ,[NewRequisitionButton]
			   ,[AllowIncidentals]
			   ,[AllowVendorChanges]
			   ,[AllowShipToChanges]
			   ,[AllowTM]
			   ,[Email]
			   ,[SecurityRoleId]
			   ,[Use20]
			   ,[EmailByPassDate]
			   ,[FirstName]
			   ,[LastName]
			   ,[NotificationType])
			VALUES
			   (@DistrictId
				,@SchoolId
				,@ShippingId
				,@Active
				,@UserName
--				,@Password
				,@Attention
				,@ApprovalLevel
				,@DisableNewRequisition
				,@DistrictAcctgCode
				,@ApproverId
				,@NewRequisitionButton
				,@AllowIncidentals
				,@AllowVendorChanges
				,@AllowShipToChanges
				,@AllowTM
				,@Email
				,@SecurityRoleId
				,@Use20
				,@EmailByPassDate
				,@FirstName
				,@LastName
				,@NotificationOptionId)
		
		SELECT	@UserID = SCOPE_IDENTITY()

		INSERT INTO SecurityRoleUsers
           ([SecurityRoleId]
           ,[UserId])
		VALUES
           (1
           ,@UserID)
	
			
		END
	ELSE
		BEGIN
			UPDATE	Users
				SET	FirstName = @FirstName
					, LastName = @LastName
					, Email = @Email
--					, [Password] = @Password
					, DistrictID = @DistrictID
					, SchoolID = @SchoolID
					, ApproverID = @ApproverID
					, Attention = @Attention
					, ApprovalLevel = @ApprovalLevel
					, DistrictAcctgCode = @DistrictAcctgCode
					, NotificationType = @NotificationOptionId
			WHERE	UserID = @UserID
			
		END

SELECT	@UserID AS UserID
```
