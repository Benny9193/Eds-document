# Table: `dbo.Subcontractor`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 4 | `vendorId` | nvarchar(1000) | NO |  |  |
| 5 | `name` | nvarchar(1000) | NO |  |  |
| 6 | `ein` | nvarchar(1000) | YES |  |  |
| 7 | `njRegistration` | nvarchar(1000) | YES |  |  |
| 8 | `address` | nvarchar(1000) | YES |  |  |
| 9 | `city` | nvarchar(1000) | YES |  |  |
| 10 | `state` | nvarchar(2) | YES |  |  |
| 11 | `zipCode` | nvarchar(1000) | YES |  |  |
| 12 | `contactName` | nvarchar(1000) | YES |  |  |
| 13 | `contactEmail` | nvarchar(1000) | YES |  |  |
| 14 | `contactPhone` | nvarchar(1000) | YES |  |  |
| 15 | `tradeClassification` | nvarchar(1000) | YES |  |  |
| 16 | `scopeOfWork` | nvarchar(max) | YES |  |  |
| 17 | `subcontractValue` | decimal(18,2) | YES |  |  |
| 18 | `debarmentStatus` | nvarchar(1000) | NO | `('CLEAR')` |  |
| 19 | `lastDebarmentCheck` | datetime2 | YES |  |  |
| 20 | `debarmentRecordId` | nvarchar(1000) | YES |  |  |
| 21 | `status` | nvarchar(1000) | NO | `('ACTIVE')` |  |
| 22 | `startDate` | datetime2 | YES |  |  |
| 23 | `endDate` | datetime2 | YES |  |  |
| 24 | `terminationReason` | nvarchar(1000) | YES |  |  |
| 25 | `terminatedAt` | datetime2 | YES |  |  |
| 26 | `terminatedById` | nvarchar(1000) | YES |  |  |
| 27 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 28 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Subcontractor_debarmentRecordId_fkey` | `debarmentRecordId` | [`dbo.DebarmentRecord.id`](dbo.DebarmentRecord.md) | SET_NULL | CASCADE |
| `Subcontractor_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | CASCADE |
| `Subcontractor_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | CASCADE |
| `Subcontractor_terminatedById_fkey` | `terminatedById` | [`dbo.User.id`](dbo.User.md) | SET_NULL | CASCADE |
| `Subcontractor_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `subcontractorId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Subcontractor_debarmentStatus_idx` | no | NONCLUSTERED | `debarmentStatus` |  |
| `Subcontractor_ein_idx` | no | NONCLUSTERED | `ein` |  |
| `Subcontractor_njRegistration_idx` | no | NONCLUSTERED | `njRegistration` |  |
| `Subcontractor_status_idx` | no | NONCLUSTERED | `status` |  |
| `Subcontractor_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `Subcontractor_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `Subcontractor_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
