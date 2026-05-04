# View: `dbo.vw_MSRPBidReqProductLine`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestProductLineId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidRequestManufacturerId` | int | NO |  |  |
| 4 | `ManufacturerProductLineId` | int | YES |  |  |
| 5 | `NameManufProdLine` | varchar(100) | NO |  |  |
| 6 | `AllFlag` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidRequestProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_MSRPBidReqProductLine]
AS
SELECT BRPL.BidRequestProductLineId, BRPL.Active, BRPL.BidRequestManufacturerId, BRPL.ManufacturerProductLineId,
       MPL.Name NameManufProdLine,
       Case When Upper(MPL.Name)='ALL' Then 1 Else 0 End AllFlag
FROM BidRequestProductLines BRPL
JOIN ManufacturerProductLines MPL ON MPL.ManufacturerProductLineId = BRPL.ManufacturerProductLineId
--WHERE BidRequestManufacturerId=11678
```
