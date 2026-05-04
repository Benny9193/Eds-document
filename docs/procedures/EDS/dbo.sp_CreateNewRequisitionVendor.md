# Procedure: `dbo.sp_CreateNewRequisitionVendor`

_Generated on 2026-05-04T14:49:07.247Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewRequisitionVendor` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-04-11 21:23:14 |
| Modified | 2025-04-16 03:31:15 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pVendorId` | IN | int |  |
| 4 | `@pBudgetId` | IN | int |  |
| 5 | `@ReqId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_NewRequisitionId` | unresolved |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_CreateNewRequisitionVendor 
    @pSessionId INT, @pCategoryId INT, @pVendorId INT, @pBudgetId INT, @ReqId INT OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DistrictId INT,
            @SchoolId INT,
            @BudgetId INT,
            @UserId INT,
            @UseSchool TINYINT,
            @ReqNumber VARCHAR(50),
            @StartDate VARCHAR(32),
            @CurrentBudgetId INT,
            @NextBudgetId INT,
            @IncidentalCategories INT,
            @CategoryId INT,
            @CXmlSessionId INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE SessionTable WITH (ROWLOCK, UPDLOCK)
           SET VendorId = ISNULL(@pVendorId, 0)
         WHERE SessionId = @pSessionId;

        SELECT @DistrictId = DistrictId,
               @SchoolId = SchoolId,
               @UserId = UserId,
               @CategoryId = ISNULL(@pCategoryId, 0),
               @BudgetId = COALESCE(@pBudgetId, SessionTable.BudgetId, 0),
               @CurrentBudgetId = ISNULL(CurrentBudgetId, 0),
               @NextBudgetId = ISNULL(NextBudgetId, 0)
          FROM SessionTable
         WHERE SessionId = @pSessionId;

        IF @@ROWCOUNT > 0
        BEGIN
            IF @BudgetId != 0 AND @BudgetId = CASE @CurrentBudgetId WHEN 0 THEN @BudgetId ELSE @CurrentBudgetId END
            BEGIN
                SELECT @IncidentalCategories = COUNT(*)
                  FROM DistrictCategories
                  JOIN SessionTable ON SessionTable.SessionId = @pSessionId
                  LEFT OUTER JOIN Users ON Users.UserId = SessionTable.UserId
                 WHERE DistrictCategories.DistrictId = @DistrictId
                   AND DistrictCategories.CategoryId = @CategoryId
                   AND DistrictCategories.Active = 1
                   AND (DistrictCategories.AllowIncidentals = 1
                        OR ((ISNULL(Users.AllowEarlyAccess, 0) = 1
                             OR ISNULL(SessionTable.ApprovalLevel, 0) > 1)
                            AND ISNULL(DistrictCategories.EarlyAccess, 0) = 1));

                IF ISNULL(@IncidentalCategories, 0) = 0
                BEGIN
                    SELECT @BudgetId = 0;
                END;
            END
            ELSE IF @BudgetId != @NextBudgetId
            BEGIN
                SELECT @BudgetId = 0;
            END;

            IF @BudgetId = 0 
            BEGIN
                SELECT TOP 1 @BudgetId = BudgetId
                  FROM Budgets
                  JOIN Users ON Users.DistrictId = Budgets.DistrictId
                            AND Users.UserId = @UserId
                  JOIN DistrictCategories ON DistrictCategories.DistrictId = Budgets.DistrictId
                                         AND DistrictCategories.CategoryId = @CategoryId
                 WHERE Budgets.DistrictId = @DistrictId
                   AND GETDATE() BETWEEN CASE WHEN (ISNULL(Users.AllowEarlyAccess, 0) = 1 OR ISNULL(Users.ApprovalLevel, 0) > 1) AND ISNULL(DistrictCategories.EarlyAccess, 0) = 1 THEN COALESCE(Budgets.EarlyAccess, Budgets.VisibleFrom) ELSE Budgets.VisibleFrom END AND Budgets.VisibleUntil
                   AND Budgets.Active = 1
                 ORDER BY StartDate DESC, EndDate DESC;

                IF @@ROWCOUNT = 0
                BEGIN
                    SELECT TOP 1 @BudgetId = BudgetId
                      FROM Budgets
                     WHERE DistrictId = @DistrictId AND Active = 1
                     ORDER BY StartDate DESC, EndDate DESC;
                END;
            END;

            EXECUTE sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @ReqId OUTPUT;
  
            IF @CategoryId != 0 AND ISNULL(@ReqId, 0) != 0
            BEGIN
                UPDATE Requisitions WITH (ROWLOCK)
                   SET CategoryId = @CategoryId
                 WHERE RequisitionId = @ReqId;
            END;
        END
        ELSE
        BEGIN
            ROLLBACK TRANSACTION;
            RAISERROR('Unable to Locate Session.', 16, 1);
            RETURN;
        END;

        COMMIT TRANSACTION;

        SELECT @ReqId AS RequisitionId;

        SELECT @CXmlSessionId = ISNULL(CXmlSession.SessionId, 0)
          FROM SessionTable
          LEFT OUTER JOIN CXmlSession ON CXmlSession.SessionId = SessionTable.SessionId
         WHERE SessionTable.SessionId = @pSessionId;

        IF ISNULL(@CXmlSessionId, 0) != 0 AND @@ROWCOUNT > 0 AND ISNULL(@ReqId, 0) > 0
        BEGIN
            UPDATE Requisitions WITH (ROWLOCK)
               SET CategoryId = CXmlSession.CategoryId,
                   BudgetId = CXmlSession.BudgetId,
                   BudgetAccountId = CXmlSession.BudgetAccountId,
                   UserAccountId = CXmlSession.UserAccountId,
                   AccountCode = CXmlSession.AccountCode
              FROM Requisitions
              JOIN CXmlSession ON CXmlSession.SessionId = @CXmlSessionId
             WHERE Requisitions.RequisitionId = @ReqId;
        END;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
```
