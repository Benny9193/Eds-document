# Table: `dbo.PayrollFailure`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `trackingId` | nvarchar(1000) | YES |  |  |
| 3 | `tenantId` | nvarchar(1000) | NO |  |  |
| 4 | `vendorId` | nvarchar(1000) | NO |  |  |
| 5 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 6 | `contractId` | nvarchar(1000) | YES |  |  |
| 7 | `failureDate` | datetime2 | NO |  |  |
| 8 | `weekEnding` | datetime2 | YES |  |  |
| 9 | `failureType` | nvarchar(1000) | NO |  |  |
| 10 | `description` | nvarchar(max) | YES |  |  |
| 11 | `status` | nvarchar(1000) | NO | `('PENDING_REPORT')` |  |
| 12 | `submissionId` | nvarchar(1000) | YES |  |  |
| 13 | `documentKey` | nvarchar(1000) | YES |  |  |
| 14 | `notificationSentAt` | datetime2 | YES |  |  |
| 15 | `reportedToDolAt` | datetime2 | YES |  |  |
| 16 | `dolCaseNumber` | nvarchar(1000) | YES |  |  |
| 17 | `reportedBy` | nvarchar(1000) | YES |  |  |
| 18 | `reportMethod` | nvarchar(1000) | YES |  |  |
| 19 | `reportConfirmation` | nvarchar(1000) | YES |  |  |
| 20 | `disputeReason` | nvarchar(max) | YES |  |  |
| 21 | `disputedAt` | datetime2 | YES |  |  |
| 22 | `resolved` | bit | NO | `((0))` |  |
| 23 | `resolvedAt` | datetime2 | YES |  |  |
| 24 | `resolutionNotes` | nvarchar(max) | YES |  |  |
| 25 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PayrollFailure_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `PayrollFailure_trackingId_fkey` | `trackingId` | [`dbo.PayrollFailureTracking.id`](dbo.PayrollFailureTracking.md) | NO_ACTION | NO_ACTION |
| `PayrollFailure_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PayrollFailure_failureDate_idx` | no | NONCLUSTERED | `failureDate` |  |
| `PayrollFailure_failureType_idx` | no | NONCLUSTERED | `failureType` |  |
| `PayrollFailure_status_idx` | no | NONCLUSTERED | `status` |  |
| `PayrollFailure_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `PayrollFailure_trackingId_idx` | no | NONCLUSTERED | `trackingId` |  |
| `PayrollFailure_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
