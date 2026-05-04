# View: `dbo.vw_FA_CategoriesAndVendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryID` | int | NO |  |  |
| 2 | `CategoryName` | varchar(50) | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `VendorCategory` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FA_CategoriesAndVendors] AS

SELECT	C.CategoryID, C.Name AS CategoryName, V.VendorId, V.Name AS VendorName
FROM	Category C, VendorCategory VC, Vendors V
WHERE	V.VendorId = VC.VendorId
	AND	V.Active = 1
	AND	VC.CategoryId = C.CategoryID
```
