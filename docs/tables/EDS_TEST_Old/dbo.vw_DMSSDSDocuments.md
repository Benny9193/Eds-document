# View: `dbo.vw_DMSSDSDocuments`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSId` | int | NO |  |  |
| 2 | `DocId` | uniqueidentifier | NO |  |  |
| 3 | `PagesCaptured` | int | YES |  |  |
| 4 | `DocName` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DMSSDSDocuments` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_LookupItemCodeByReqVendor` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.ufn_GetMSDSSheetsNonHazardous` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.ufn_GetMSDSSheetsNotScanned` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_mySDS` | SQL_STORED_PROCEDURE |
| `dbo.usp_SDSDocs` | SQL_STORED_PROCEDURE |
| [`dbo.vw_ReqDetail`](dbo.vw_ReqDetail.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241205`](dbo.vw_ReqDetail_BK20241205.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241227`](dbo.vw_ReqDetail_BK20241227.md) | VIEW |
| [`dbo.vw_SDSImportView`](dbo.vw_SDSImportView.md) | VIEW |
| [`dbo.vw_SDSItems`](dbo.vw_SDSItems.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_DMSSDSDocuments] as
SELECT	MSDSId, DocId, PagesCaptured, DocName
FROM	DMSSDSDocuments
```
