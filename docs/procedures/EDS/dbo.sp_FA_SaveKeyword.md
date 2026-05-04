# Procedure: `dbo.sp_FA_SaveKeyword`

_Generated on 2026-05-04T13:43:18.838Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SaveKeyword` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:48:22 |
| Modified | 2012-06-13 23:48:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@categoryID` | IN | int |  |
| 3 | `@districtID` | IN | int |  |
| 4 | `@headingID` | IN | int |  |
| 5 | `@keyword` | IN | varchar(50) |  |
| 6 | `@keywordID` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Keywords` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SaveKeyword] @sessionID int, @categoryID int, @districtID int, @headingID int, @keyword varchar(50), @keywordID int output

AS

INSERT INTO [EDS].[dbo].[Keywords]
           ([Active]
           ,[CategoryId]
           ,[HeadingId]
           ,[DistrictId]
           ,[Keyword])
     VALUES
           (1
           ,@categoryId
           ,@headingId
           ,@districtId
           ,@keyword)
           
SET @keywordID = (SELECT SCOPE_IDENTITY())
```
