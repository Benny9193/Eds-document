# Table: `dbo.SessionTable`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12807071

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Active and recent user-session state (~12.8M rows). Holds the user's current district, school, requisition, PO, budget, mode, and screen state. Hot during business hours; queried heavily on every page load.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `UserId` | int | NO |  |  |
| 5 | `RequisitionId` | int | YES |  |  |
| 6 | `POId` | int | YES |  |  |
| 7 | `BudgetId` | int | YES |  |  |
| 8 | `ReqMode` | int | YES |  |  |
| 9 | `OrderBy` | int | YES |  |  |
| 10 | `CatalogId` | int | YES |  |  |
| 11 | `Mode` | int | YES |  |  |
| 12 | `SessionStart` | datetime | YES | `(getdate())` |  |
| 13 | `SessionEnd` | datetime | YES |  |  |
| 14 | `SessionLast` | datetime | YES |  |  |
| 15 | `CSRepId` | int | YES |  |  |
| 16 | `RepUserId` | int | YES |  |  |
| 17 | `ApprovalLevel` | tinyint | YES |  |  |
| 18 | `Attention` | varchar(50) | YES |  |  |
| 19 | `ResolutionX` | int | YES |  |  |
| 20 | `ResolutionY` | int | YES |  |  |
| 21 | `TabSelected` | varchar(32) | YES |  |  |
| 22 | `ReloadPage` | tinyint | YES |  |  |
| 23 | `TempUserId` | int | YES |  |  |
| 24 | `CurrentBudgetId` | int | YES |  |  |
| 25 | `NextBudgetId` | int | YES |  |  |
| 26 | `AllowIncidentals` | tinyint | YES |  |  |
| 27 | `VendorId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SessionTable_SessionId` | no | NONCLUSTERED | `SessionId` | `DistrictId`, `SchoolId`, `UserId`, `BudgetId`, `CurrentBudgetId`, `NextBudgetId` |
| `SK_Budget` | no | NONCLUSTERED | `BudgetId` |  |
| `SKI_DistrictEnd_UserRepLevel` | no | NONCLUSTERED | `DistrictId`, `SessionEnd` | `UserId`, `CSRepId`, `ApprovalLevel` |
