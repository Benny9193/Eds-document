# Table: `dbo.ContractorPayrollViolation`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 5 | `violationType` | nvarchar(1000) | NO |  |  |
| 6 | `weekEnding` | datetime2 | NO |  |  |
| 7 | `dueDate` | datetime2 | NO |  |  |
| 8 | `submittedDate` | datetime2 | YES |  |  |
| 9 | `description` | nvarchar(max) | YES |  |  |
| 10 | `documentKey` | nvarchar(1000) | YES |  |  |
| 11 | `status` | nvarchar(1000) | NO | `('OPEN')` |  |
| 12 | `disputedAt` | datetime2 | YES |  |  |
| 13 | `disputeReason` | nvarchar(max) | YES |  |  |
| 14 | `resolvedAt` | datetime2 | YES |  |  |
| 15 | `resolvedById` | nvarchar(1000) | YES |  |  |
| 16 | `resolutionNotes` | nvarchar(max) | YES |  |  |
| 17 | `countsAsStrike` | bit | NO | `((1))` |  |
| 18 | `createdById` | nvarchar(1000) | NO |  |  |
| 19 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 20 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ContractorPayrollViolation_createdById_fkey` | `createdById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `ContractorPayrollViolation_resolvedById_fkey` | `resolvedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `ContractorPayrollViolation_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `ContractorPayrollViolation_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `ContractorPayrollViolation_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ContractorPayrollViolation_countsAsStrike_idx` | no | NONCLUSTERED | `countsAsStrike` |  |
| `ContractorPayrollViolation_status_idx` | no | NONCLUSTERED | `status` |  |
| `ContractorPayrollViolation_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `ContractorPayrollViolation_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `ContractorPayrollViolation_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `ContractorPayrollViolation_weekEnding_idx` | no | NONCLUSTERED | `weekEnding` |  |
