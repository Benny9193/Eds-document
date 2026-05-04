# Procedure: `dbo.sp_RTK_Build_MSDS_and_MSDSDetail`

_Generated on 2026-05-04T13:43:18.903Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RTK_Build_MSDS_and_MSDSDetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-08-13 14:53:24 |
| Modified | 2015-11-24 23:37:38 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Duplicate_RTK_Items_Temp` | unresolved |  |
| `MSDS` | USER_TABLE |  |
| `MSDSDetail` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |
| `RTK_MSDSDetail` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_RTK_Build_MSDS_and_MSDSDetail] as

declare @vRTK_ItemsId int,
        @vAlternateDesc varchar(60),
        @NewMSDSId int

-- ************ remember to build/rebuild Duplicate_RTK_Items_Temp table FIRST ************************* 
-- to build Duplicate_RTK_Items_Temp table use 
-- sql script: 
-- ScriptToCreateDuplicateRTK_ItemsMappingTable.sql
--
-- if rebuilding, then use following script:
-- use sql script:
-- ScriptToClearAndRebuildMSDSandMSDSDetail.sql
 

-- FIRST: process all non-duplicate RTK_Items 
declare cursorRTK cursor fast_forward read_only for
SELECT RTK_ItemsId, Isnull(AlternateDesc,'') AlternateDesc
FROM RTK_Items with (nolock)
Where RTK_ItemsId Not In (Select Dupe_RTK_ItemsId From Duplicate_RTK_Items_Temp)

set nocount on

set transaction isolation level read uncommitted

open cursorRTK

fetch next from cursorRTK 
into @vRTK_ItemsId, @vAlternateDesc

while @@fetch_status = 0
begin
  -- create the new MSDS record
  insert into MSDS (Active, AlternateDescription) Values (1, @vAlternateDesc)

  Select @NewMSDSId = Scope_Identity() --DCH 11/24/2015 @@Identity

  -- update the RTK_Items record with the new MSDS record id
  UPDATE RTK_Items SET MSDSId = @NewMSDSId WHERE RTK_ItemsId = @vRTK_ItemsId 
 
  -- create/copy the new MSDSDetail records from the old RTK_MSDSDetail table
  insert into MSDSDetail 
         (MSDSID,     SeqNum, RTK_CASFileId, MixturePercent, LegacyCASRegNo, MixturePercentCode)
  SELECT  @NewMSDSId, SeqNum, RTK_CASFileId, MixturePercent, LegacyCASRegNo, MixturePercentCode
  FROM RTK_MSDSDetail with (nolock)
  WHERE RTK_ItemsID = @vRTK_ItemsId

  fetch next from cursorRTK 
  into @vRTK_ItemsId, @vAlternateDesc
end

close cursorRTK
deallocate cursorRTK

-- SECOND: populate MSDSId in all duplicate RTK_Items records
UPDATE RTK_Items
   SET MSDSId = ss.NewMSDSId
From
--select * from
(
SELECT RTK1.RTK_ItemsId RTK_ItemsId_ToUpdate, RTK1.MSDSId OldMSDSId, RTK2.RTK_ItemsId RTK_ItemsId_Unique, RTK2.MSDSId NewMSDSId 
FROM RTK_Items RTK1 with (nolock)
JOIN Duplicate_RTK_Items_Temp Dupes ON Dupes.Dupe_RTK_ItemsId = RTK1.RTK_ItemsId 
JOIN RTK_Items RTK2 ON RTK2.RTK_ItemsId = Dupes.Uniq_RTK_ItemsId
where RTK1.MSDSId is null  -- just in case
) ss 
where ss.RTK_ItemsId_ToUpdate = RTK_Items.RTK_ItemsId 


set nocount off

return
```
