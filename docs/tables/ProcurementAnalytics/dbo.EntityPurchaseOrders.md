# Table: `dbo.EntityPurchaseOrders`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4035

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityPOID` | int | NO |  | YES |
| 2 | `EntityID` | int | NO |  |  |
| 3 | `POID` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__EntityPur__Entit__17036CC0` | `EntityID` | [`dbo.Entities.EntityID`](dbo.Entities.md) | NO_ACTION | NO_ACTION |
| `FK__EntityPurc__POID__17F790F9` | `POID` | [`dbo.PurchaseOrders.POID`](dbo.PurchaseOrders.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EntityPOs_EntityID` | no | NONCLUSTERED | `EntityID` |  |
| `IX_EntityPOs_POID` | no | NONCLUSTERED | `POID` |  |
| `UQ_EntityPO` | YES | NONCLUSTERED | `EntityID`, `POID` |  |
