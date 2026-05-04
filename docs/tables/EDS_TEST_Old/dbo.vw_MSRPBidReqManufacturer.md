# View: `dbo.vw_MSRPBidReqManufacturer`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestManufacturerId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `SequenceNumber` | int | YES |  |  |
| 6 | `AllowAdditionalProductLines` | tinyint | YES |  |  |
| 7 | `UseOptions` | tinyint | YES |  |  |
| 8 | `Name` | varchar(100) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_MSRPBidReqManufacturer]
AS
SELECT     dbo.BidRequestManufacturer.BidRequestManufacturerId, dbo.BidRequestManufacturer.Active, dbo.BidRequestManufacturer.BidHeaderId, 
                      dbo.BidRequestManufacturer.ManufacturerId, dbo.BidRequestManufacturer.SequenceNumber, 
                      dbo.BidRequestManufacturer.AllowAdditionalProductLines, dbo.BidRequestManufacturer.UseOptions, dbo.Manufacturers.Name
FROM         dbo.BidRequestManufacturer 
INNER JOIN   dbo.Manufacturers ON dbo.BidRequestManufacturer.ManufacturerId = dbo.Manufacturers.ManufacturerId
                       --       and dbo.Manufacturers.Name != '(WRITEINS)'   -- removed 9-16-2014 kjm
```
