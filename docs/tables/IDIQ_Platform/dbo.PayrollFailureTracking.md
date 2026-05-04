# Table: `dbo.PayrollFailureTracking`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `vendorId` | nvarchar(1000) | NO |  |  |
| 3 | `totalFailures` | int | NO | `((0))` |  |
| 4 | `failuresSinceReset` | int | NO | `((0))` |  |
| 5 | `status` | nvarchar(1000) | NO | `('GOOD_STANDING')` |  |
| 6 | `prohibitedAt` | datetime2 | YES |  |  |
| 7 | `prohibitionReason` | nvarchar(max) | YES |  |  |
| 8 | `appealFiledAt` | datetime2 | YES |  |  |
| 9 | `appealStatus` | nvarchar(1000) | YES |  |  |
| 10 | `remediationCompletedAt` | datetime2 | YES |  |  |
| 11 | `reinstatedAt` | datetime2 | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PayrollFailureTracking_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PayrollFailure`](dbo.PayrollFailure.md) | `trackingId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PayrollFailureTracking_status_idx` | no | NONCLUSTERED | `status` |  |
| `PayrollFailureTracking_totalFailures_idx` | no | NONCLUSTERED | `totalFailures` |  |
| `PayrollFailureTracking_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `PayrollFailureTracking_vendorId_key` | YES | NONCLUSTERED | `vendorId` |  |
