# View: `dbo.vw_SDSItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | YES |  |  |
| 2 | `MSDSId` | int | YES |  |  |
| 3 | `DocId` | uniqueidentifier | NO |  |  |
| 4 | `SDSURL` | varchar(99) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |
| `vw_DMSSDSDocuments` | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_LookupItemCodeByReqVendor` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_SDSDocs` | SQL_STORED_PROCEDURE |
| [`dbo.vw_ReqDetail`](dbo.vw_ReqDetail.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241205`](dbo.vw_ReqDetail_BK20241205.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241227`](dbo.vw_ReqDetail_BK20241227.md) | VIEW |

## Definition

```sql
CREATE view [dbo].[vw_SDSItems] as
select ss.ItemId, ss.MSDSId, sds.DocId, 'https://edsiq.ed-data.com/SDS/SDSDocViewer?DocId=' + cast(sds.DocId as varchar(50)) SDSURL
  from (
	select ItemId, MSDSId
	  from RTK_Items
	 where MSDSId is not null
	   and MSDSId != 0
	union
	select ItemId, MSDSId
	  from RTK_ReportItems
	 where MSDSId is not null
	   and MSDSId != 0
	) ss
  join vw_DMSSDSDocuments sds on sds.MSDSId = ss.MSDSId
group by ss.ItemId, ss.MSDSId, sds.DocId
```
