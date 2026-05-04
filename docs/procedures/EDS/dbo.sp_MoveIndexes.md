# Procedure: `dbo.sp_MoveIndexes`

_Generated on 2026-05-04T13:04:00.416Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MoveIndexes` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-01-30 19:54:57 |
| Modified | 2004-01-30 19:54:57 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDBName` | IN | varchar(255) |  |
| 2 | `@pNewFileGroup` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_MoveIndexes @pDBName varchar(255), @pNewFileGroup varchar(255) as

declare @IndexName varchar(255),
	@TableName varchar(255),
	@ColumnName varchar(255),
	@SQLCommand varchar(1024),
	@id int,
	@indid int,
	@Keyno int

declare ci cursor fast_forward read_only for
select su.name + '.[' + so.name + ']' TableName, si.Name IndexName, so.id, si.indid
  from eds..sysindexkeys sik
  join eds..sysobjects so on so.id = sik.id
  join eds..sysusers su on su.uid = so.uid
  join eds..sysindexes si on si.id = sik.id
                         and si.indid = sik.indid
where so.xtype = 'U'
  and si.status in ( 2097152 , 18450)
group by su.Name, so.Name, si.Name, so.id, si.indid
order by TableName, IndexName

open ci

fetch next from ci into @TableName, @IndexName, @id, @indid

while @@fetch_status = 0
begin
  if @indid = 1
  begin
    select @SQLCommand = 'create unique clustered index [' + @IndexName + '] on ' + @TableName + ' ( '
  end
  else
  begin
    select @SQLCommand = 'create index [' + @IndexName + '] on ' + @TableName + ' ( '
  end

  declare cc cursor fast_forward read_only for
  select sc.name ColumnName, sik.keyno
    from eds..sysindexkeys sik
    join eds..sysobjects so on so.id = sik.id
    join eds..sysusers su on su.uid = so.uid
    join eds..sysindexes si on si.id = sik.id
                           and si.indid = sik.indid
    join eds..syscolumns sc on sc.id = sik.id
                           and sc.colid = sik.colid
  where so.xtype = 'U'
    and si.status in ( 2097152 , 18450)
    and sik.id = @id
    and sik.indid = @indid
  order by sik.keyno

  open cc

  fetch next from cc into @ColumnName, @keyno

  while @@fetch_status = 0
  begin
    if @keyno = 1
    begin
      select @SQLCommand = @SQLCommand + '[' + @ColumnName + ']'
    end
    else
    begin
      select @SQLCommand = @SQLCommand + ', [' + @ColumnName + ']'
    end
    
    fetch next from cc into @ColumnName, @keyno
  end

  close cc
  deallocate cc

  select @SQLCommand = @SQLCommand + ' ) with drop_existing on [' + @pNewFileGroup + ']'

  print @SQLCommand
  exec(@SQLCommand)

  fetch next from ci into @TableName, @IndexName, @id, @indid
end

close ci
deallocate ci
```
