# Table: `dbo.JobSitePosting`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `tenantId` | nvarchar(1000) | NO |  |  |
| 5 | `jobSiteAddress` | nvarchar(500) | NO |  |  |
| 6 | `jobSiteCity` | nvarchar(1000) | YES |  |  |
| 7 | `jobSiteCounty` | nvarchar(1000) | YES |  |  |
| 8 | `wageRatesPosted` | bit | NO | `((0))` |  |
| 9 | `postingLocation` | nvarchar(500) | YES |  |  |
| 10 | `postingDate` | datetime2 | YES |  |  |
| 11 | `verifiedAt` | datetime2 | YES |  |  |
| 12 | `verifiedById` | nvarchar(1000) | YES |  |  |
| 13 | `verificationMethod` | nvarchar(1000) | YES |  |  |
| 14 | `verificationPhotoKey` | nvarchar(1000) | YES |  |  |
| 15 | `verificationNotes` | nvarchar(max) | YES |  |  |
| 16 | `isCompliant` | bit | NO | `((0))` |  |
| 17 | `nonComplianceDate` | datetime2 | YES |  |  |
| 18 | `correctionDeadline` | datetime2 | YES |  |  |
| 19 | `correctionCompletedAt` | datetime2 | YES |  |  |
| 20 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 21 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `JobSitePosting_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | CASCADE | CASCADE |
| `JobSitePosting_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `JobSitePosting_isCompliant_idx` | no | NONCLUSTERED | `isCompliant` |  |
| `JobSitePosting_taskOrderId_key` | YES | NONCLUSTERED | `taskOrderId` |  |
| `JobSitePosting_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `JobSitePosting_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
