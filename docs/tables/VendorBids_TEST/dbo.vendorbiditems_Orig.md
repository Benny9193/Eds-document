# Table: `dbo.vendorbiditems_Orig`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 20031681

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vendorbiditemid` | int | NO |  | YES |
| 2 | `vendorbidid` | int | NO |  |  |
| 3 | `bidrequestitemid` | int | NO |  |  |
| 4 | `BidRequestItemId_Old` | int | YES |  |  |
| 5 | `itemid` | int | NO |  |  |
| 6 | `itemcode` | varchar(50) | YES |  |  |
| 7 | `units` | varchar(16) | YES |  |  |
| 8 | `quantity` | int | YES |  |  |
| 9 | `sortseq` | varchar(64) | YES |  |  |
| 10 | `description` | varchar(1024) | YES |  |  |
| 11 | `shiplocations` | int | YES |  |  |
| 12 | `heading` | varchar(50) | YES |  |  |
| 13 | `districtname` | varchar(50) | YES |  |  |
| 14 | `crossrefstext` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VendorBidItems_VendorBids` | `vendorbidid` | [`dbo.vendorbids.vendorbidid`](dbo.vendorbids.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.vendorbiditemsjournal`](dbo.vendorbiditemsjournal.md) | `vendorbiditemid` | `vendorbiditemid` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Vendorbidid_VendorbiditemidBidrequestitemid` | no | NONCLUSTERED | `vendorbidid` | `vendorbiditemid`, `bidrequestitemid` |
