# View: `dbo.vw_VPOVendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorSessionId` | int | NO |  |  |
| 2 | `VPORegistrationId` | int | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Vendors` | USER_TABLE |
| `VendorSessions` | USER_TABLE |
| `VPOVendorLinks` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VPOVendors] as
select VendorSessions.VendorSessionId, VendorSessions.VPORegistrationId, Vendors.VendorId, Vendors.Name
  from VendorSessions with (nolock)
  join VPOVendorLinks on VPOVendorLinks.VPORegistrationId = VendorSessions.VPORegistrationId
  join Vendors on Vendors.VendorId = VPOVendorLinks.VendorId
              and Vendors.Active = 1
 group by VendorSessions.VendorSessionId, VendorSessions.VPORegistrationId, Vendors.VendorId, Vendors.Name
```
