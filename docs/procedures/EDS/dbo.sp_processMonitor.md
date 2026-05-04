# Procedure: `dbo.sp_processMonitor`

_Generated on 2026-05-04T13:04:24.168Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_processMonitor` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-02-19 12:25:04 |
| Modified | 2012-12-27 17:33:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pType` | IN | char(1) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
--sp_ProcessMonitor ''
CREATE  procedure [dbo].[sp_processMonitor] @pType char(1) as

select es.session_id spid, 
       isnull(er.blocking_session_id,0) Blocked, 
       isnull(er.wait_type,'') WaitType,
       isnull(er.wait_time,0) WaitTime,
       isnull(er.wait_resource,'') WaitResource,
       es.cpu_time cpu,
       es.logical_reads physical_io,
       isnull(er.granted_query_memory,0) memusage,
       es.last_request_start_time Last_Batch,
       isnull(er.open_transaction_count,0) open_tran,
       es.[status] [Status],
       ISNULL(er.command,'') Cmd,
       es.host_name hostname,
       0 LockCount,
       '' WaitingLock,
       isnull(est.text,'') LastCmd,
       cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int) as BlockingCount,
       cast(case 
                 when isnull(cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int),0) > 0 then 'Blocking'
                 when isnull(er.blocking_session_id,0) > 0 then 'Blocked'
                 when substring(es.[status],1,3) = 'run' then 'Active'
                 else 'Idle'
               end as varchar(64)) as State,
       cast(case 
                   when isnull(cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int),0) > 0 then 'RED'
                   when isnull(er.blocking_session_id,0) > 0 then 
                     case 
                       when isnull(er.blocking_session_id,0) = es.session_id then 'ORANGE'
                       else 'YELLOW'
                     end
                   when substring(es.[status],1,3) = 'run' then '#00EE00'
                   else 'WHITE'
                 end as varchar(32)) as BGColor,
       cast(case 
                     when isnull(cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int),0) > 0 then 'WHITE'
                     when isnull(er.blocking_session_id,0) > 0 then 'BLACK'
                     when substring(es.[status],1,3) = 'run' then 'BLACK'
                     else 'BLACK'
                   end as varchar(32)) as TextColor,
       cast(case
                   when isnull(cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int),0) > 0 then '4'
                   when isnull(er.blocking_session_id,0) > 0 then 
                     case 
                       when isnull(er.blocking_session_id,0) = es.session_id then '2'
                       else '3'
                     end
                   when substring(es.[status],1,3) = 'run' then '1'
                   else '0'
                 end + 
                 right('0000' + cast(9999 - er.blocking_session_id as varchar(16)),4) +
                 right('0000' + cast(9999 - cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int) as varchar(16)),4) +
                 convert(varchar(64),es.last_request_start_time,121) +
                 right('0000' + cast(es.session_id as varchar(16)),4) as varchar(128)) as SortKey,
       es.login_time, es.login_name, es.last_request_start_time, es.last_request_end_time, es.reads, es.writes, es.logical_reads, es.row_count
  from sys.dm_exec_sessions es
  left outer join sys.dm_exec_requests er on er.session_id = es.session_id
  outer apply sys.dm_exec_sql_text(er.plan_handle) est
 order by cast(case
                   when isnull(cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int),0) > 0 then '4'
                   when isnull(er.blocking_session_id,0) > 0 then 
                     case 
                       when isnull(er.blocking_session_id,0) = es.session_id then '2'
                       else '3'
                     end
                   when substring(es.[status],1,3) = 'run' then '1'
                   else '0'
                 end + 
                 right('0000' + cast(9999 - er.blocking_session_id as varchar(16)),4) +
                 right('0000' + cast(9999 - cast((select COUNT(*) from sys.dm_exec_requests er1 where er1.blocking_session_id = es.session_id) as int) as varchar(16)),4) +
                 convert(varchar(64),es.last_request_start_time,121) +
                 right('0000' + cast(es.session_id as varchar(16)),4) as varchar(128)) desc
```
