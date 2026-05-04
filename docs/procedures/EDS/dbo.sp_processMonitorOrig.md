# Procedure: `dbo.sp_processMonitorOrig`

_Generated on 2026-05-04T14:49:07.311Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_processMonitorOrig` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-12-27 16:43:35 |
| Modified | 2012-12-27 16:43:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pType` | IN | char(1) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `pt` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--sp_ProcessMonitor ''
create  procedure [dbo].[sp_processMonitorOrig] @pType char(1) as

declare @spid int,
	@Cmd varchar(1024),
        @EventInfo varchar(255)

set nocount on
set transaction isolation level read uncommitted

select sp.spid, sp.blocked, sp.waittype, sp.waittime, sp.waitresource, sp.cpu, sp.physical_io, sp.memusage, sp.last_batch, sp.open_tran, sp.status, sp.cmd, sp.hostname, 
       (select count(*) from master.dbo.syslockinfo sli where sli.req_spid = sp.spid) LockCount, 
       (select top 1 sli.rsc_text from master.dbo.syslockinfo sli where sli.req_spid = sp.spid and sli.req_status = 3 order by sli.req_refcnt) WaitingLock, 
       cast('' as varchar(4096)) as LastCmd,
       cast(0 as int) as BlockingCount,
       cast('' as varchar(64)) as State,
       cast('' as varchar(32)) as BGColor,
       cast('' as varchar(32)) as TextColor,
       cast('' as varchar(128)) as SortKey
  into #ProcessTable 
  from master.dbo.sysprocesses sp  

if isnull(rtrim(@pType),'') <> '' 
begin
  if @pType = 'B'
  begin
    delete #ProcessTable
     where Blocked = 0
  end
  else
  if @ptype = 'R'
  begin
    delete #ProcessTable
     where substring(status,1,3) <> 'run'
  end
  else
  if @pType = 'I'
  begin
    delete #ProcessTable
     where substring(status,1,3) = 'run'
  end
  else
  if @ptype = 'L'
  begin
    delete #ProcessTable
     where LockCount = 0
  end
  else
  if @ptype = 'X'
  begin
    delete #ProcessTable
     where spid not in (select Blocked from #ProcessTable)
  end
end

declare ptcur cursor read_only for
select spid from #Processtable

create table #WorkTab (EventType varchar(255), Parameters int null, EventInfo varchar(4096))

open ptcur

fetch next from ptcur into @spid

while @@fetch_status = 0
begin
  select @Cmd = 'dbcc inputbuffer (' + cast(@spid as varchar) + ') with NO_INFOMSGS'
  insert into #Worktab
    execute(@Cmd)

  Update pt
     set LastCmd = wt.EventInfo,
         BlockingCount = (select count(*) from #ProcessTable pta where pta.blocked = pt.spid)
    from #ProcessTable pt, #Worktab wt
   where pt.Spid = @spid

  truncate table #Worktab

  fetch next from ptcur into @spid
end

close ptcur
deallocate ptcur

drop table #WorkTab

Update pt
   set BlockingCount = (select count(*) from #ProcessTable pta where pta.blocked = pt.spid and pta.Blocked != pta.Spid)
  from #ProcessTable pt

Update #ProcessTable
   set State = case 
                 when isnull(BlockingCount,0) > 0 then 'Blocking'
                 when isnull(Blocked,0) > 0 then 'Blocked'
                 when substring(Status,1,3) = 'run' then 'Active'
                 else 'Idle'
               end,
       BGColor = case 
                   when isnull(BlockingCount,0) > 0 then 'RED'
                   when isnull(Blocked,0) > 0 then 
                     case 
                       when isnull(Blocked,0) = Spid then 'ORANGE'
                       else 'YELLOW'
                     end
                   when substring(Status,1,3) = 'run' then '#00EE00'
                   else 'WHITE'
                 end,
       TextColor = case 
                     when isnull(BlockingCount,0) > 0 then 'WHITE'
                     when isnull(Blocked,0) > 0 then 'BLACK'
                     when substring(Status,1,3) = 'run' then 'BLACK'
                     else 'BLACK'
                   end,
       SortKey = case
                   when isnull(BlockingCount,0) > 0 then '4'
                   when isnull(Blocked,0) > 0 then 
                     case 
                       when isnull(Blocked,0) = Spid then '2'
                       else '3'
                     end
                   when substring(Status,1,3) = 'run' then '1'
                   else '0'
                 end + 
                 right('0000' + cast(9999 - Blocked as varchar(16)),4) +
                 right('0000' + cast(9999 - blockingCount as varchar(16)),4) +
                 convert(varchar(64),last_batch,121) +
                 right('0000' + cast(spid as varchar(16)),4)

select * from #ProcessTable order by SortKey desc

drop table #ProcessTable

set nocount off
```
