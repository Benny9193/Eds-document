# Procedure: `dbo.usp_DetailedIdentityColumnsReport`

_Generated on 2026-05-04T13:07:57.761Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_DetailedIdentityColumnsReport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-08-05 06:05:36 |
| Modified | 2021-08-05 06:21:13 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- ================================================================
-- Author:      Eli Leiba
-- Create date: 06-2018
-- Description:
--   Produce a Detailed Identity columns report for the whole database
--   That includes the database, schema, table, column, type, 
--   Seed, increment and the data type value limit
-- ================================================================
CREATE PROCEDURE dbo.usp_DetailedIdentityColumnsReport
AS
SELECT A.TABLE_CATALOG AS CATALOG,
   A.TABLE_SCHEMA AS "SCHEMA",
   A.TABLE_NAME AS "TABLE",
   B.COLUMN_NAME AS "COLUMN",
   IDENT_SEED (A.TABLE_NAME) AS Seed,
   IDENT_INCR (A.TABLE_NAME) AS Increment,
   IDENT_CURRENT (A.TABLE_NAME) AS Curr_Value,
   B.DATA_TYPE as "Type",
   Type_Limit = CASE lower (B.DATA_TYPE)
      WHEN 'bigint'
         THEN '9,223,372,036,854,775,807'
      WHEN 'int'
         THEN '2,147,483,647'
      WHEN 'smallint'
         THEN '32,767'
      WHEN 'tinyint'
         THEN '255'
      WHEN 'decimal'  
         THEN REPLICATE ('9', B.NUMERIC_PRECISION)
      WHEN 'numeric'  
         THEN REPLICATE ('9', B.NUMERIC_PRECISION)
      END
	,PercentFull = (IDENT_CURRENT (A.TABLE_NAME)  / (CASE lower (B.DATA_TYPE)
													  WHEN 'bigint'
														 THEN cast('9223372036854775807' as bigint)
													  WHEN 'int'
														 THEN cast('2147483647' as int)
													  --WHEN 'smallint'
														 --THEN '32,767'
													  --WHEN 'tinyint'
														 --THEN '255'
													  --WHEN 'decimal'  
														 --THEN REPLICATE ('9', B.NUMERIC_PRECISION)
													  --WHEN 'numeric'  
														 --THEN REPLICATE ('9', B.NUMERIC_PRECISION)
													END)*100)
FROM INFORMATION_SCHEMA.TABLES A, INFORMATION_SCHEMA.COLUMNS B
WHERE A.TABLE_CATALOG = B.TABLE_CATALOG AND 
      A.TABLE_SCHEMA = B.TABLE_SCHEMA AND 
     A.TABLE_NAME = B.TABLE_NAME AND 
     COLUMNPROPERTY (OBJECT_ID (B.TABLE_NAME), B.COLUMN_NAME, 'IsIdentity') = 1 AND 
     OBJECTPROPERTY (OBJECT_ID (A.TABLE_NAME), 'TableHasIdentity') = 1 AND 
     A.TABLE_TYPE = 'BASE TABLE'
ORDER BY A.TABLE_SCHEMA, A.TABLE_NAME
```
