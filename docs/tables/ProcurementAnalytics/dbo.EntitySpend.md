# Table: `dbo.EntitySpend`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12261

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntitySpendID` | int | NO |  | YES |
| 2 | `EntityID` | int | NO |  |  |
| 3 | `TransactionID` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__EntitySpe__Entit__123EB7A3` | `EntityID` | [`dbo.Entities.EntityID`](dbo.Entities.md) | NO_ACTION | NO_ACTION |
| `FK__EntitySpe__Trans__1332DBDC` | `TransactionID` | [`dbo.SpendTransactions.TransactionID`](dbo.SpendTransactions.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EntitySpend_EntityID` | no | NONCLUSTERED | `EntityID` |  |
| `IX_EntitySpend_TransactionID` | no | NONCLUSTERED | `TransactionID` |  |
| `UQ_EntitySpend` | YES | NONCLUSTERED | `EntityID`, `TransactionID` |  |
