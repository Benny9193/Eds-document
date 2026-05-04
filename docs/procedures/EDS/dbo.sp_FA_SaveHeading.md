# Procedure: `dbo.sp_FA_SaveHeading`

_Generated on 2026-05-04T13:07:57.468Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SaveHeading` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:48:40 |
| Modified | 2012-06-13 23:48:40 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@districtID` | IN | int |  |
| 3 | `@categoryID` | IN | int |  |
| 4 | `@title` | IN | varchar(255) |  |
| 5 | `@headingID` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Headings` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SaveHeading] @sessionID int, @districtID int, @categoryID int, @title varchar(255), @headingID int output

AS

INSERT INTO [EDS].[dbo].[Headings]
           ([Active]
           ,[CategoryId]
           ,[Code]
           ,[ExpandAll]
           ,[Title]
           ,[Description]
           ,[DistrictId])
     VALUES
           (1
           ,@categoryID
           ,NULL
           ,0
           ,@title
           ,NULL
           ,@districtID)

SELECT	@headingID = SCOPE_IDENTITY()
```
