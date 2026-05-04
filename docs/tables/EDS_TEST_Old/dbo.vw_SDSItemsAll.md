# View: `dbo.vw_SDSItemsAll`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SafetyDataSheetId` | bigint | NO |  |  |
| 2 | `SDSURL` | varchar(512) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `SafetyDataSheets` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_SDSDocs` | SQL_STORED_PROCEDURE |
| [`dbo.vw_ReqDetail`](dbo.vw_ReqDetail.md) | VIEW |

## Definition

```sql
create   view vw_SDSItemsAll
as
select SafetyDataSheets.SafetyDataSheetId, SafetyDataSheets.SDSURL
  from SafetyDataSheets
 where SafetyDataSheets.Deleted is null
   and SafetyDataSheets.SDSURL like 'http%'
```
