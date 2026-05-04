# Table: `dbo.WorkerWageProtest`

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
| 5 | `contractId` | nvarchar(1000) | YES |  |  |
| 6 | `workerName` | nvarchar(1000) | NO |  |  |
| 7 | `workerAddress` | nvarchar(500) | YES |  |  |
| 8 | `workerPhone` | nvarchar(1000) | YES |  |  |
| 9 | `workerEmail` | nvarchar(1000) | YES |  |  |
| 10 | `occurrenceDate` | datetime2 | NO |  |  |
| 11 | `wagesPaidDate` | datetime2 | YES |  |  |
| 12 | `statuteOfLimitationsEnd` | datetime2 | NO |  |  |
| 13 | `claimedClassification` | nvarchar(1000) | YES |  |  |
| 14 | `actualClassification` | nvarchar(1000) | YES |  |  |
| 15 | `claimedHourlyRate` | decimal(10,2) | YES |  |  |
| 16 | `actualHourlyRate` | decimal(10,2) | YES |  |  |
| 17 | `hoursAffected` | decimal(10,2) | YES |  |  |
| 18 | `underpaymentAmount` | decimal(18,2) | YES |  |  |
| 19 | `protestDescription` | nvarchar(max) | NO |  |  |
| 20 | `supportingDocuments` | nvarchar(1000) | YES |  |  |
| 21 | `status` | nvarchar(1000) | NO | `('FILED')` |  |
| 22 | `filedAt` | datetime2 | NO | `(getdate())` |  |
| 23 | `acknowledgedAt` | datetime2 | YES |  |  |
| 24 | `resolution` | nvarchar(1000) | YES |  |  |
| 25 | `resolutionDate` | datetime2 | YES |  |  |
| 26 | `resolutionAmount` | decimal(18,2) | YES |  |  |
| 27 | `resolutionNotes` | nvarchar(max) | YES |  |  |
| 28 | `referredToDolAt` | datetime2 | YES |  |  |
| 29 | `dolCaseNumber` | nvarchar(1000) | YES |  |  |
| 30 | `dolDecision` | nvarchar(max) | YES |  |  |
| 31 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 32 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `WorkerWageProtest_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `WorkerWageProtest_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | NO_ACTION | NO_ACTION |
| `WorkerWageProtest_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.RetaliationComplaint`](dbo.RetaliationComplaint.md) | `originalComplaintId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WorkerWageProtest_status_idx` | no | NONCLUSTERED | `status` |  |
| `WorkerWageProtest_statuteOfLimitationsEnd_idx` | no | NONCLUSTERED | `statuteOfLimitationsEnd` |  |
| `WorkerWageProtest_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `WorkerWageProtest_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `WorkerWageProtest_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
