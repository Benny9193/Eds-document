# Table: `dbo.vendorbidsjournal`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 59741

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vbjid` | int | NO |  | YES |
| 2 | `vendorbidid` | int | NO |  |  |
| 3 | `sessionid` | int | NO |  |  |
| 4 | `statusid` | int | YES |  |  |
| 5 | `biditemdiscountrate` | varbinary(255) | YES |  |  |
| 6 | `vendorbidnumber` | varbinary(255) | YES |  |  |
| 7 | `comments` | varbinary(max) | YES |  |  |
| 8 | `catalogname` | varbinary(max) | YES |  |  |
| 9 | `catalogdiscountrate` | varbinary(255) | YES |  |  |
| 10 | `datemodified` | datetime | YES | `(getdate())` |  |
| 11 | `submitDate` | datetime | YES |  |  |
| 12 | `active` | tinyint | YES |  |  |
| 13 | `CatalogDiscountComments` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VendorBidsJournal_VendorBids` | `vendorbidid` | [`dbo.vendorbids.vendorbidid`](dbo.vendorbids.md) | NO_ACTION | NO_ACTION |
| `FK_VendorBidsJournal_VendorSessions` | `sessionid` | [`dbo.vendorsessions.sessionid`](dbo.vendorsessions.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_VendorBidId_VBJID` | no | NONCLUSTERED | `vendorbidid`, `datemodified` | `vbjid` |
