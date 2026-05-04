# Table: `dbo.PayrollRecordWithholding`

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
| 6 | `recordsRequestedAt` | datetime2 | NO |  |  |
| 7 | `recordsRequestedBy` | nvarchar(1000) | NO |  |  |
| 8 | `recordsDueDate` | datetime2 | NO |  |  |
| 9 | `recordsProvidedAt` | datetime2 | YES |  |  |
| 10 | `recordsProvided` | bit | NO | `((0))` |  |
| 11 | `withholdingOrdered` | bit | NO | `((0))` |  |
| 12 | `withholdingOrderedAt` | datetime2 | YES |  |  |
| 13 | `withholdingPercentage` | decimal(5,2) | YES |  |  |
| 14 | `withholdingAmount` | decimal(18,2) | YES |  |  |
| 15 | `followUpDate` | datetime2 | YES |  |  |
| 16 | `followUpWithholdingOrdered` | bit | NO | `((0))` |  |
| 17 | `withholdingReleasedAt` | datetime2 | YES |  |  |
| 18 | `releaseReason` | nvarchar(max) | YES |  |  |
| 19 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 20 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 21 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PayrollRecordWithholding_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `PayrollRecordWithholding_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `PayrollRecordWithholding_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PayrollRecordWithholding_recordsDueDate_idx` | no | NONCLUSTERED | `recordsDueDate` |  |
| `PayrollRecordWithholding_status_idx` | no | NONCLUSTERED | `status` |  |
| `PayrollRecordWithholding_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `PayrollRecordWithholding_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
