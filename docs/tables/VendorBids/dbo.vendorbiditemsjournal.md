# Table: `dbo.vendorbiditemsjournal`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5300470

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vbijid` | int | NO |  | YES |
| 2 | `vendorbiditemid` | int | NO |  |  |
| 3 | `sessionid` | int | NO |  |  |
| 4 | `datemodified` | datetime | YES | `(getdate())` |  |
| 5 | `itembidtype` | varbinary(255) | YES |  |  |
| 6 | `unitprice` | varbinary(255) | YES |  |  |
| 7 | `cost` | varbinary(255) | YES |  |  |
| 8 | `vendoritemcode` | varbinary(255) | YES |  |  |
| 9 | `quantitybid` | varbinary(255) | YES |  |  |
| 10 | `alternate` | varbinary(1024) | YES |  |  |
| 11 | `itemsperunit` | varbinary(255) | YES |  |  |
| 12 | `pageno` | varbinary(255) | YES |  |  |
| 13 | `Manufacturer` | varbinary(1024) | YES |  |  |
| 14 | `ManufacturerPartNumber` | varbinary(1024) | YES |  |  |
| 15 | `LinerGaugeMicrons` | varbinary(255) | YES |  |  |
| 16 | `LinerGaugeMil` | varbinary(255) | YES |  |  |
| 17 | `LinerCaseWeight` | varbinary(255) | YES |  |  |
| 18 | `LinerDimWidth` | varbinary(255) | YES |  |  |
| 19 | `LinerDimDepth` | varbinary(255) | YES |  |  |
| 20 | `LinerDimLength` | varbinary(255) | YES |  |  |
| 21 | `SDS_URL` | varbinary(1024) | YES |  |  |
| 22 | `ImageURL` | varbinary(1024) | YES |  |  |
| 23 | `UPC_ISBN` | varbinary(255) | YES |  |  |
| 24 | `UniqueItemNumber` | varbinary(255) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VendorBidItemsJournal_VendorBidItems` | `vendorbiditemid` | [`dbo.vendorbiditems_Orig.vendorbiditemid`](dbo.vendorbiditems_Orig.md) | NO_ACTION | NO_ACTION |
| `FK_VendorBidItemsJournal_VendorSessions` | `sessionid` | [`dbo.vendorsessions.sessionid`](dbo.vendorsessions.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_VendorBidItems` | no | NONCLUSTERED | `vendorbiditemid`, `vbijid` |  |
