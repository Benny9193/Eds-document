# Function: scalar: `dbo.uf_IsRequisitionLocked2`

_Generated on 2026-05-04T13:04:24.267Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_IsRequisitionLocked2` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2026-02-19 22:31:09 |
| Modified | 2026-02-19 22:31:39 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pUserId` | IN | int |  |

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

_No other objects in this database reference it._

## Definition

```sql
create   function [dbo].[uf_IsRequisitionLocked2](@pRequisitionId int, @pUserId int = null)
Returns int
 
as
begin
declare @StatusId int,
	@StatusCode char(1),
	@Level int,
	@MaxLevel int,
	@Alterable int,
	@BudgetEditable int,
	@ApproverLevel int = null

  select top 1 @StatusId = isnull(Approvals.StatusId,0),
         @StatusCode = isnull(StatusTable.StatusCode,'H'),
		 @Level = isnull(Approvals.Level,0),
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

  if @pUserId is not null
  begin
	  select @ApproverLevel = coalesce(Users.ApprovalLevel,0)
		from Users
	   where Users.UserId = coalesce(@pUserId,0)
  end

  if isnull(@MaxLevel,0) = 0 or (coalesce(@Level,0) < coalesce(@ApproverLevel,0))
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
		   when @StatusCode in ('O','D','M','3','2') then 1
           when @Alterable = 1 and isnull(@BudgetEditable,0) = 1 then 0
           else 1
         end
  
end
```
