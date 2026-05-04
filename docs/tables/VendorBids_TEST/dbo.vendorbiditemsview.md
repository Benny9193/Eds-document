# View: `dbo.vendorbiditemsview`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbiditemid` | int | NO |  |  |
| 2 | `vendorbidid` | int | NO |  |  |
| 3 | `itemcode` | varchar(50) | NO |  |  |
| 4 | `units` | varchar(16) | NO |  |  |
| 5 | `description` | varchar(1024) | NO |  |  |
| 6 | `shiplocations` | int | NO |  |  |
| 7 | `quantity` | int | NO |  |  |
| 8 | `heading` | varchar(50) | NO |  |  |
| 9 | `districtname` | varchar(50) | NO |  |  |
| 10 | `crossrefstext` | varchar(1024) | NO |  |  |
| 11 | `sortseq` | varchar(64) | NO |  |  |
| 12 | `vbijid` | int | NO |  |  |
| 13 | `itembidtype` | varchar(255) | NO |  |  |
| 14 | `unitprice` | varchar(255) | NO |  |  |
| 15 | `cost` | varchar(255) | NO |  |  |
| 16 | `vendoritemcode` | varchar(255) | NO |  |  |
| 17 | `quantitybid` | varchar(255) | NO |  |  |
| 18 | `alternate` | varchar(4096) | NO |  |  |
| 19 | `itemsperunit` | varchar(255) | NO |  |  |
| 20 | `pageno` | varchar(255) | NO |  |  |
| 21 | `datemodified` | datetime | YES |  |  |
| 22 | `itemhasbeenbid` | int | NO |  |  |
| 23 | `itemid` | int | NO |  |  |
| 24 | `bidrequestitemid` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vendorbiditems` | USER_TABLE |
| `vendorbiditemsjournal` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_vendorbidsview` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_vendorbidsviewDiscounted` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE        view [dbo].[vendorbiditemsview]
as
select vbi.vendorbiditemid, vbi.vendorbidid, isnull(vbi.itemcode,'') as itemcode, isnull(vbi.units,'') as units, isnull(vbi.description,'') as description, isnull(vbi.shiplocations,0) as shiplocations, isnull(vbi.quantity,0) as quantity, isnull(vbi.heading,'') as heading, isnull(vbi.districtname,'') as districtname, isnull(vbi.crossrefstext,'') as crossrefstext, isnull(vbi.sortseq,'') as sortseq,
       isnull(vbij.vbijid,0) as vbijid, isnull(cast(vbij.itembidtype as varchar(255)),'') as itembidtype, isnull(cast(vbij.unitprice as varchar(255)),'') as unitprice, isnull(cast(vbij.cost as varchar(255)),'') as cost, isnull(cast(vbij.vendoritemcode as varchar(255)),'') as vendoritemcode, isnull(cast(vbij.quantitybid as varchar(255)),'') as quantitybid, isnull(cast(vbij.alternate as varchar(4096)),'') as alternate, isnull(cast(vbij.itemsperunit as varchar(255)),'') as itemsperunit, isnull(cast(vbij.pageno as varchar(255)),'') as pageno, isnull(vbij.datemodified,cast('1970-01-01 00:00:00.000' as datetime)) as datemodified, case isnull(cast(vbij.itembidtype as varchar(20)),'') when '' then 0 else 1 end as itemhasbeenbid, vbi.itemid, vbi.bidrequestitemid
  from vendorbiditems as vbi
  left outer join vendorbiditemsjournal as vbij on vbij.vbijid = 
    (select top 1 vendorbiditemsjournal.vbijid 
       from vendorbiditemsjournal
      where vendorbiditemsjournal.vendorbiditemid = vbi.vendorbiditemid
      order by vendorbiditemsjournal.vbijid desc)
```
