# Procedure: `dbo.sp_DefragAll`

_Generated on 2026-05-04T13:43:18.796Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DefragAll` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-11-28 11:09:20 |
| Modified | 2001-11-28 11:09:20 |
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
CREATE   procedure sp_DefragAll @pDBName varchar(255) as

declare @TableName varchar(255),
	@IndexName varchar(255),
	@Id int,
	@DynStr varchar(255)

print 'Beginning to Defrag Database ' + @pDBName

create table #TempTables (
sysid	int identity(1,1) not null,
[Name]	varchar(255) not null,
[Id]	int not null
)

select @DynStr = 'insert #TempTables ([Name], [Id]) select name, id from ' + @pDBName + '..sysobjects where xtype = ''U'' order by Name'
exec(@DynStr)

declare TableCursor CURSOR FORWARD_ONLY READ_ONLY FOR
select [Name], [Id] from #TempTables

open TableCursor

fetch next from TableCursor into @TableName, @Id

while @@fetch_status = 0
begin
  print 'Beginning to Defrag Table ' + @TableName + ' Id = ' + convert(varchar(16),@Id)

  create table #TempIndexes (
  sysid		int identity(1,1) not null,
  [Name]	varchar(255) not null
  )

  select @DynStr = 'insert #TempIndexes ([Name]) select name from ' + @pDBName + '..sysindexes where id = ' + convert(varchar(16),@Id)
  exec(@DynStr)

  declare IndexCursor CURSOR FORWARD_ONLY READ_ONLY FOR
  select [Name] from #TempIndexes

  open IndexCursor

  fetch next from IndexCursor into @IndexName

  while @@fetch_status = 0
  begin
    print 'Beginning to Defrag Index ' + @IndexName

    DBCC INDEXDEFRAG (@pDBName, @TableName, @IndexName)
  
    fetch next from IndexCursor into @IndexName
  end

  close IndexCursor
  deallocate IndexCursor

  drop table #TempIndexes

  fetch next from TableCursor into @TableName, @Id
end

close TableCursor
deallocate TableCursor

drop Table #TempTables
```
