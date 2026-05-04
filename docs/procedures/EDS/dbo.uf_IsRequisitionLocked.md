# Function: scalar: `dbo.uf_IsRequisitionLocked`

_Generated on 2026-05-04T13:07:57.632Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_IsRequisitionLocked` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-05-11 09:36:26 |
| Modified | 2023-04-11 15:59:23 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.Approvals` | USER_TABLE |  |
| `dbo.StatusTable` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_GetUserRequisitions` | SQL_STORED_PROCEDURE |
| `dbo.vw_Requisitions` | VIEW |

## Definition

```sql
CREATE function [dbo].[uf_IsRequisitionLocked](@pRequisitionId int)
Returns int
 
as
begin
declare @StatusId int,
	@StatusCode char(1),
	@MaxLevel int,
	@Alterable int,
	@BudgetEditable int

  select top 1 @StatusId = isnull(Approvals.StatusId,0),
         @StatusCode = isnull(StatusTable.StatusCode,'H'),
         @MaxLevel = (select top 1 Level
                        from dbo.Approvals a1 with (nolock)
                       where a1.RequisitionId = Approvals.RequisitionId
                       order by ApprovalDate desc)
    from dbo.Approvals with (nolock)
    join dbo.StatusTable on StatusTable.StatusId = Approvals.StatusId
   where Approvals.RequisitionId = @pRequisitionId
   order by Approvals.ApprovalDate desc

  if @@rowcount = 0
  begin
    select @MaxLevel = 0, @StatusCode = 'H'
  end
  else
  begin
    if @StatusCode = 'R' or @StatusCode = 'C'
    begin
      select @MaxLevel = 0, @StatusCode = 'H'
    end
    else
    if @StatusCode = 'B' or @StatusCode = 'W' or @StatusCode = 'M'
    begin
      select @MaxLevel = 1
    end
  end

  if isnull(@MaxLevel,0) = 0
  begin
    select @Alterable = 1
  end
  else
  begin
    select @Alterable = 0
  end

  select @BudgetEditable = case 
                             when Budgets.EditFrom is null and Budgets.EditUntil is null then 1
                             when getdate() between Budgets.EditFrom and Budgets.EditUntil then 1
                             when getdate() between (select case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.EditFrom) else Budgets.EditFrom end from Requisitions join Users on Users.UserId = Requisitions.UserId join DistrictCategories on DistrictCategories.DistrictId = Users.DistrictId and DistrictCategories.CategoryId = Requisitions.CategoryId where Requisitions.RequisitionId = @pRequisitionId) and Budgets.EditUntil then 1
                             else 0
                           end
    from Requisitions with (nolock)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where Requisitions.RequisitionId = @pRequisitionId
   
  return case 
           when @Alterable = 1 and isnull(@BudgetEditable,0) = 1 then 0
           else 1
         end
  
end
```
