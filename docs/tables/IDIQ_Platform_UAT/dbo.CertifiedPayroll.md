# Table: `dbo.CertifiedPayroll`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `weekEnding` | datetime2 | NO |  |  |
| 5 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 6 | `workers` | nvarchar(max) | NO |  |  |
| 7 | `totalHours` | decimal(10,2) | NO |  |  |
| 8 | `totalGrossPay` | decimal(18,2) | NO |  |  |
| 9 | `validationErrors` | nvarchar(max) | YES |  |  |
| 10 | `validatedAt` | datetime2 | YES |  |  |
| 11 | `submittedAt` | datetime2 | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CertifiedPayroll_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `CertifiedPayroll_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CertifiedPayrollSubmission`](dbo.CertifiedPayrollSubmission.md) | `certifiedPayrollId` | `id` | CASCADE | CASCADE |
| [`dbo.NJWageHubSubmission`](dbo.NJWageHubSubmission.md) | `certifiedPayrollId` | `id` | SET_NULL | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CertifiedPayroll_status_idx` | no | NONCLUSTERED | `status` |  |
| `CertifiedPayroll_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `CertifiedPayroll_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `CertifiedPayroll_weekEnding_idx` | no | NONCLUSTERED | `weekEnding` |  |
