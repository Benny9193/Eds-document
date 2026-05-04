# Procedure: `dbo.sp_ReindexAll`

_Generated on 2026-05-04T13:07:57.517Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ReindexAll` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-07-07 02:12:00 |
| Modified | 2003-07-07 02:12:00 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDBName` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure dbo.sp_ReindexAll @pDBName varchar(255) as

declare @TableName varchar(255),
	@IndexName varchar(255),
	@Id int,
	@DynStr varchar(255)

print 'Beginning to Reindex Database ' + @pDBName

create table #TempTables (
sysid	int identity(1,1) not null,
[Name]	varchar(255) not null,
[Id]	int not null
)

select @DynStr = 'insert #TempTables ([Name], [Id]) select su.Name + ''.['' + so.name + '']'' TableName, so.id from ' + @pDBName + '..sysobjects so join ' + @pDBName + '..SysUsers su on su.Uid = so.Uid where so.xtype = ''U'' order by so.Name'

exec(@DynStr)

declare TableCursor CURSOR FORWARD_ONLY READ_ONLY FOR
select [Name], [Id] from #TempTables

open TableCursor

fetch next from TableCursor into @TableName, @Id

while @@fetch_status = 0
begin
  print 'Beginning to Reindex Table ' + @TableName + ' Id = ' + convert(varchar(16),@Id)

  DBCC DBREINDEX (@TableName)

  fetch next from TableCursor into @TableName, @Id
end

close TableCursor
deallocate TableCursor

drop Table #TempTables
```
