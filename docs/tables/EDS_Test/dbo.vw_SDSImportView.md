# View: `dbo.vw_SDSImportView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSId` | int | NO |  |  |
| 2 | `MSDSRef` | varchar(255) | YES |  |  |
| 3 | `ItemDescription` | varchar(512) | YES |  |  |
| 4 | `ItemList` | varchar(max) | YES |  |  |
| 5 | `Manufacturer` | varchar(max) | YES |  |  |
| 6 | `ManufacturerPartNumber` | varchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CrossRefs` | USER_TABLE |
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |
| `vw_DMSSDSDocuments` | VIEW |
| `dbo.ufn_GetMSDSSheet` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.ufn_MSDSItems` | SQL_SCALAR_FUNCTION |
| `dbo.ufn_MSDSManufacturers` | SQL_SCALAR_FUNCTION |
| `dbo.ufn_MSDSMPNs` | SQL_SCALAR_FUNCTION |
| `dbo.ufn_RegExIsMatch` | unresolved |
| [`master.dbo.ufn_RegExIsMatch`](../master/dbo.ufn_RegExIsMatch.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_SDSImportView]
as
select MSDS.MSDSId, CrossRefs.MSDSRef, (select ItemDescription from dbo.ufn_GetMSDSSheet(MSDS.MSDSId)) ItemDescription, dbo.ufn_MSDSItems(MSDS.MSDSId) ItemList, dbo.ufn_MSDSManufacturers(MSDS.MSDSId) Manufacturer, dbo.ufn_MSDSMPNs(MSDS.MSDSId) ManufacturerPartNumber
  from CrossRefs 
  join RTK_Items ri on ri.ItemId = CrossRefs.ItemId
  join RTK_ReportItems rri on rri.ItemId = CrossRefs.ItemId
  join MSDS on MSDS.MSDSId = coalesce(rri.MSDSId, ri.MSDSId)
 --          and MSDS.ContentCentralMSDSDocId is null
  left outer join vw_DMSSDSDocuments sds on sds.MSDSId = MSDS.MSDSId
 where MSDSRef is not null 
   and MSDSRef like 'http%'
   and MSDSRef like '%.pdf'
   and sds.DocId is null
   and master.dbo.ufn_RegExIsMatch(MSDSRef,'^(?:http(?:s){0,1}://(?:[0-9]{1,3}){1}\.(?:[0-9]{1,3}){1}\.(?:[0-9]{1,3}){1}\.(?:[0-9]{1,3}){1})/.*$',1) = 0
 group by MSDS.MSDSId, CrossRefs.MSDSRef
```
