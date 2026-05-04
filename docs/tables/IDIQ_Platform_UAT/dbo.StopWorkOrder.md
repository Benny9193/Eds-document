# Table: `dbo.StopWorkOrder`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 5 | `contractId` | nvarchar(1000) | YES |  |  |
| 6 | `orderNumber` | nvarchar(1000) | YES |  |  |
| 7 | `issuedBy` | nvarchar(1000) | NO |  |  |
| 8 | `issuedAt` | datetime2 | NO |  |  |
| 9 | `effectiveDate` | datetime2 | NO |  |  |
| 10 | `reason` | nvarchar(max) | NO |  |  |
| 11 | `violationType` | nvarchar(1000) | NO |  |  |
| 12 | `relatedViolationIds` | nvarchar(1000) | YES |  |  |
| 13 | `siteAddress` | nvarchar(500) | NO |  |  |
| 14 | `siteCity` | nvarchar(1000) | YES |  |  |
| 15 | `siteCounty` | nvarchar(1000) | YES |  |  |
| 16 | `status` | nvarchar(1000) | NO | `('ACTIVE')` |  |
| 17 | `operatedUnderOrder` | bit | NO | `((0))` |  |
| 18 | `daysOperatedUnderOrder` | int | NO | `((0))` |  |
| 19 | `penaltyAmount` | decimal(18,2) | YES |  |  |
| 20 | `penaltyPaidAt` | datetime2 | YES |  |  |
| 21 | `liftedAt` | datetime2 | YES |  |  |
| 22 | `liftedReason` | nvarchar(max) | YES |  |  |
| 23 | `complianceDemonstrated` | bit | NO | `((0))` |  |
| 24 | `overdueWagesPaid` | bit | NO | `((0))` |  |
| 25 | `overdueWagesAmount` | decimal(18,2) | YES |  |  |
| 26 | `appealFiledAt` | datetime2 | YES |  |  |
| 27 | `appealHearingId` | nvarchar(1000) | YES |  |  |
| 28 | `appealDecision` | nvarchar(1000) | YES |  |  |
| 29 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 30 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `StopWorkOrder_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `StopWorkOrder_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `StopWorkOrder_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `StopWorkOrder_effectiveDate_idx` | no | NONCLUSTERED | `effectiveDate` |  |
| `StopWorkOrder_status_idx` | no | NONCLUSTERED | `status` |  |
| `StopWorkOrder_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `StopWorkOrder_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
