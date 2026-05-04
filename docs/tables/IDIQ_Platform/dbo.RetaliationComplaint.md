# Table: `dbo.RetaliationComplaint`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `workerName` | nvarchar(1000) | NO |  |  |
| 5 | `workerContact` | nvarchar(500) | YES |  |  |
| 6 | `originalComplaintId` | nvarchar(1000) | YES |  |  |
| 7 | `originalComplaintDate` | datetime2 | NO |  |  |
| 8 | `originalComplaintDescription` | nvarchar(max) | YES |  |  |
| 9 | `retaliationType` | nvarchar(1000) | NO |  |  |
| 10 | `retaliationDate` | datetime2 | NO |  |  |
| 11 | `retaliationDescription` | nvarchar(max) | NO |  |  |
| 12 | `status` | nvarchar(1000) | NO | `('FILED')` |  |
| 13 | `filedAt` | datetime2 | NO | `(getdate())` |  |
| 14 | `investigationStartedAt` | datetime2 | YES |  |  |
| 15 | `investigatorNotes` | nvarchar(max) | YES |  |  |
| 16 | `resolution` | nvarchar(1000) | YES |  |  |
| 17 | `resolutionDate` | datetime2 | YES |  |  |
| 18 | `resolutionNotes` | nvarchar(max) | YES |  |  |
| 19 | `isFirstViolation` | bit | YES |  |  |
| 20 | `penaltyAmount` | decimal(10,2) | YES |  |  |
| 21 | `penaltyPaidAt` | datetime2 | YES |  |  |
| 22 | `referredToDolAt` | datetime2 | YES |  |  |
| 23 | `dolCaseNumber` | nvarchar(1000) | YES |  |  |
| 24 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 25 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `RetaliationComplaint_originalComplaintId_fkey` | `originalComplaintId` | [`dbo.WorkerWageProtest.id`](dbo.WorkerWageProtest.md) | NO_ACTION | NO_ACTION |
| `RetaliationComplaint_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `RetaliationComplaint_status_idx` | no | NONCLUSTERED | `status` |  |
| `RetaliationComplaint_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `RetaliationComplaint_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
