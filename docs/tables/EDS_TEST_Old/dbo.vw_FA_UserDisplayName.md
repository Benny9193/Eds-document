# View: `dbo.vw_FA_UserDisplayName`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserID` | int | NO |  |  |
| 2 | `UserDisplayName` | varchar(56) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Users` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_FA_Requisitions` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| [`dbo.vw_ApproveRequisitions`](dbo.vw_ApproveRequisitions.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsBySession`](dbo.vw_ApproveRequisitionsBySession.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsBySession_Test`](dbo.vw_ApproveRequisitionsBySession_Test.md) | VIEW |
| [`dbo.vw_ApproveRequisitionsTest`](dbo.vw_ApproveRequisitionsTest.md) | VIEW |
| [`dbo.vw_FA_EDSUser`](dbo.vw_FA_EDSUser.md) | VIEW |
| [`dbo.vw_FA_Requisitions`](dbo.vw_FA_Requisitions.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_FA_UserDisplayName]

AS

	SELECT	UserID, right('00000' + cast(isnull(Users.CometId,0) as varchar),5) + ' ' + ISNULL(Users.Attention,'') AS UserDisplayName
	FROM	Users
```
