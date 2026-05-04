# View: `dbo.BidMgrCategoryByBidScheduleIdVendorId`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidScheduleId` | int | NO |  |  |
| 2 | `vendorid` | int | YES |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidSchedule` | USER_TABLE |
| `BidScheduleCats` | USER_TABLE |
| `RegCalendar` | USER_TABLE |
| `Registrations` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_BidCategories` | SQL_SCALAR_FUNCTION |

## Definition

```sql
CREATE  VIEW [dbo].[BidMgrCategoryByScheduleIdVendorId] AS 
select BS.BidScheduleId, Reg.vendorid, BSC.CategoryName
from BidSchedule  BS 
join BidScheduleCats BSC on BSC.BidScheduleId = BS.BidScheduleId
join RegCalendar RegCal on RegCal.BSCId = BSC.BSCId
join Registrations Reg on Reg.RegistrationId = RegCal.RegistrationId AND Reg.Active=1
--where BS.BidScheduleId=51 AND Reg.vendorid=11562  -- test
group by BS.BidScheduleId, Reg.vendorid, BSC.CategoryName
```
