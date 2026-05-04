# Table: `dbo.CertifiedPayrollSubmission`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `certifiedPayrollId` | nvarchar(1000) | NO |  |  |
| 3 | `tenantId` | nvarchar(1000) | NO |  |  |
| 4 | `vendorId` | nvarchar(1000) | NO |  |  |
| 5 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 6 | `wagePaymentDate` | datetime2 | NO |  |  |
| 7 | `submissionDeadline` | datetime2 | NO |  |  |
| 8 | `actualSubmissionDate` | datetime2 | YES |  |  |
| 9 | `submittedToWageHub` | bit | NO | `((0))` |  |
| 10 | `wageHubConfirmation` | nvarchar(1000) | YES |  |  |
| 11 | `submittedToContractingUnit` | bit | NO | `((0))` |  |
| 12 | `isOnTime` | bit | YES |  |  |
| 13 | `daysLate` | int | YES |  |  |
| 14 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 15 | `isViolation` | bit | NO | `((0))` |  |
| 16 | `violationRecordedAt` | datetime2 | YES |  |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |
| 19 | `contractingUnitNotifiedAt` | datetime2 | YES |  |  |
| 20 | `njDolConfirmationNumber` | nvarchar(1000) | YES |  |  |
| 21 | `njDolSubmittedAt` | datetime2 | YES |  |  |
| 22 | `notificationNotes` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CertifiedPayrollSubmission_certifiedPayrollId_fkey` | `certifiedPayrollId` | [`dbo.CertifiedPayroll.id`](dbo.CertifiedPayroll.md) | CASCADE | CASCADE |
| `CertifiedPayrollSubmission_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `CertifiedPayrollSubmission_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CertifiedPayrollSubmission_certifiedPayrollId_key` | YES | NONCLUSTERED | `certifiedPayrollId` |  |
| `CertifiedPayrollSubmission_isViolation_idx` | no | NONCLUSTERED | `isViolation` |  |
| `CertifiedPayrollSubmission_status_idx` | no | NONCLUSTERED | `status` |  |
| `CertifiedPayrollSubmission_submissionDeadline_idx` | no | NONCLUSTERED | `submissionDeadline` |  |
| `CertifiedPayrollSubmission_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `CertifiedPayrollSubmission_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `CertifiedPayrollSubmission_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
