# Procedure: `dbo.sp_QueueIPs`

_Generated on 2026-05-04T13:07:57.512Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_QueueIPs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-12-18 13:04:05 |
| Modified | 2012-12-18 14:51:36 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pXml` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `IPQueue` | USER_TABLE |  |
| `IPQueueUsers` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_QueueIPs] @pXml varchar(max)
as
declare @hXml int,
		@IPQueueId int

--Prepare XML Document
exec sp_xml_preparedocument @hXml output, @pXML

--Build Queue Header
insert IPQueue (Queue, Email, SingleFile, ToUser)
  select Device, Email, SingleFile, ToUser
    from OPENXML(@hXml, '/InstructionPackets')
    with (Device varchar(50) '@device',
	      EMail varchar(255) '@Email',
          SingleFile tinyint '@SingleFile',
          ToUser tinyint '@ToUser')

--Get IPQueueId
select @IPQueueId = SCOPE_IDENTITY()

--Add Users Requested
insert IPQueueUsers (IPQueueId, UserId)
  select @IPQueueId, UserId
    from OPENXML(@hXml, '/InstructionPackets/User',1)
    with (UserId int 'text()')

exec sp_xml_removedocument @hXml

select @IPQueueId 'IPQueueId'
```
