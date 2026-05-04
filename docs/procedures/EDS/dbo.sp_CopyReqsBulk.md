# Procedure: `dbo.sp_CopyReqsBulk`

_Generated on 2026-05-04T13:04:24.100Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyReqsBulk` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-11-01 19:02:23 |
| Modified | 2018-05-02 08:47:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pReqList` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_CopyReqBulk` | SQL_STORED_PROCEDURE |  |

## Called by

| Caller | Type |
|--------|------|
| `null.sp_CopyReqs` | SQL_STORED_PROCEDURE |
| `dbo.sp_CopyReqs` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE  procedure [dbo].[sp_CopyReqsBulk] @pReqList varchar(255) as

declare @ReqId int,
	@ReqCount int,
	@ReqList int,
	@RSLId int,
	@DontDeleteNoBids int

--set nocount on
set transaction isolation level read uncommitted
select @ReqList = convert(int,@pReqList)
select @ReqCount = count(*) from ReportSessionLinks where RSId = @ReqList
insert DebugMsgs (Msg) values ('ReqList=' + convert(varchar(16),@ReqList) + ',' + @pReqList)
select @DontDeleteNoBids = 1

declare ReqListCur cursor read_only for
/*select IntId from ReportSessionLinks where RSId = @ReqList*/
select RSLId, IntId 
  from ReportSessionLinks 
  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
  outer apply (select Users.UserId from Users where Users.UserId = Requisitions.UserId and Users.Active = 1 union select NewUser.UserId from Users OldUser join Users NewUser on NewUser.DistrictId = OldUser.DistrictId and NewUser.CometId = OldUser.CometId and NewUser.Active = 1 where OldUser.UserId = Requisitions.UserId and isnull(OldUser.Active,0) = 0) Users
 where RSId = @ReqList
   and Users.UserId is not null
 order by RSLId

open ReqListCur

fetch next from ReqListCur into @RSLId, @ReqId

while @@fetch_status = 0
begin
  insert DebugMsgs (Msg) values ('Copying Requisition ' + isnull(convert(varchar(16),@ReqId),'<null>'))
  exec dbo.sp_CopyReqBulk @RSLId, @ReqId

  fetch next from ReqListCur into @RSLId, @ReqId
end

close ReqListCur
deallocate ReqListCur

set nocount off

  -- Copy Detail
  insert Detail (RequisitionId, ItemId, ItemCode, Quantity, LastYearsQuantity, Description)
    select rsl.AuxId, Detail.ItemId, Detail.ItemCode, Detail.Quantity, Detail.Quantity, Detail.Description
      from Detail with (nolock)
      join Items on Items.ItemId = Detail.ItemId
                and Items.Active = 1
      join ReportSessionLinks rsl on rsl.IntId = Detail.RequisitionId
                                 and rsl.RSId = @ReqList
     where Detail.RequisitionId = rsl.IntId
       and (Detail.VendorId != 7691 or Detail.ItemMustBeBid = 1)

-- Delete Bad Entries from Copy
delete Detail
  from Detail 
  join ReportSessionLinks rsl on rsl.IntId = Detail.RequisitionId
                             and rsl.RSId = @ReqList
 where RequisitionId = rsl.AuxId
   and ItemId is null

if @DontDeleteNoBids = 0
begin
  -- Delete No Bid Entries from Copy
  delete Detail
    from Detail
    join ReportSessionLinks rsl on rsl.IntId = Detail.RequisitionId
                               and rsl.RSId = @ReqList
   where RequisitionId = rsl.AuxId
     and isnull(VendorId,7691) = 7961

  -- Delete Zero Priced Items
  delete Detail
    from Detail
    join ReportSessionLinks rsl on rsl.IntId = Detail.RequisitionId
                               and rsl.RSId = @ReqList
   where RequisitionId = rsl.AuxId
     and isnull(BidPrice,0) = 0
end
```
