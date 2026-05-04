# Table: `dbo.ContractTermination`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `terminationType` | nvarchar(1000) | NO |  |  |
| 4 | `contractId` | nvarchar(1000) | YES |  |  |
| 5 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 6 | `subcontractorId` | nvarchar(1000) | YES |  |  |
| 7 | `vendorId` | nvarchar(1000) | NO |  |  |
| 8 | `debarmentRecordId` | nvarchar(1000) | NO |  |  |
| 9 | `debarmentDate` | datetime2 | NO |  |  |
| 10 | `terminationDate` | datetime2 | NO |  |  |
| 11 | `effectiveDate` | datetime2 | NO |  |  |
| 12 | `noticeDate` | datetime2 | YES |  |  |
| 13 | `reason` | nvarchar(max) | NO |  |  |
| 14 | `noticeDocumentKey` | nvarchar(1000) | YES |  |  |
| 15 | `remainingValue` | decimal(18,2) | YES |  |  |
| 16 | `completedValue` | decimal(18,2) | YES |  |  |
| 17 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 18 | `terminatedById` | nvarchar(1000) | NO |  |  |
| 19 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 20 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ContractTermination_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_debarmentRecordId_fkey` | `debarmentRecordId` | [`dbo.DebarmentRecord.id`](dbo.DebarmentRecord.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_subcontractorId_fkey` | `subcontractorId` | [`dbo.Subcontractor.id`](dbo.Subcontractor.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_terminatedById_fkey` | `terminatedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `ContractTermination_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ContractTermination_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `ContractTermination_debarmentRecordId_idx` | no | NONCLUSTERED | `debarmentRecordId` |  |
| `ContractTermination_status_idx` | no | NONCLUSTERED | `status` |  |
| `ContractTermination_subcontractorId_idx` | no | NONCLUSTERED | `subcontractorId` |  |
| `ContractTermination_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `ContractTermination_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `ContractTermination_terminationDate_idx` | no | NONCLUSTERED | `terminationDate` |  |
| `ContractTermination_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
