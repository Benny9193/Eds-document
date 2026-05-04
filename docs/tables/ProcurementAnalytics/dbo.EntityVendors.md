# Table: `dbo.EntityVendors`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 910

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Many-to-many of which vendors each entity transacts with, including the relationship start date and a primary-vendor flag.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityVendorID` | int | NO |  | YES |
| 2 | `EntityID` | int | NO |  |  |
| 3 | `VendorID` | int | NO |  |  |
| 4 | `RelationshipStart` | date | NO | `(getdate())` |  |
| 5 | `RelationshipStatus` | varchar(20) | NO | `('active')` |  |
| 6 | `IsPrimary` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__EntityVen__Entit__03F0984C` | `EntityID` | [`dbo.Entities.EntityID`](dbo.Entities.md) | NO_ACTION | NO_ACTION |
| `FK__EntityVen__Vendo__04E4BC85` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EntityVendors_EntityID` | no | NONCLUSTERED | `EntityID` |  |
| `IX_EntityVendors_VendorID` | no | NONCLUSTERED | `VendorID` |  |
| `UQ_EntityVendor` | YES | NONCLUSTERED | `EntityID`, `VendorID` |  |
