# Table: `dbo.ApprenticeshipCompliance`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `vendorId` | nvarchar(1000) | NO |  |  |
| 3 | `craft` | nvarchar(1000) | NO |  |  |
| 4 | `complianceMethod` | nvarchar(1000) | NO |  |  |
| 5 | `cbaUnionName` | nvarchar(1000) | YES |  |  |
| 6 | `cbaLocalNumber` | nvarchar(1000) | YES |  |  |
| 7 | `cbaExpirationDate` | datetime2 | YES |  |  |
| 8 | `cbaDocumentKey` | nvarchar(1000) | YES |  |  |
| 9 | `programName` | nvarchar(1000) | YES |  |  |
| 10 | `programSponsorId` | nvarchar(1000) | YES |  |  |
| 11 | `programApprovalDate` | datetime2 | YES |  |  |
| 12 | `programDocumentKey` | nvarchar(1000) | YES |  |  |
| 13 | `apprenticeName` | nvarchar(1000) | YES |  |  |
| 14 | `apprenticeOjtHours` | int | YES |  |  |
| 15 | `apprenticeStartDate` | datetime2 | YES |  |  |
| 16 | `apprenticeDocumentKey` | nvarchar(1000) | YES |  |  |
| 17 | `otherMethodDescription` | nvarchar(max) | YES |  |  |
| 18 | `otherMethodApprovalDoc` | nvarchar(1000) | YES |  |  |
| 19 | `annualOjtHours` | int | YES |  |  |
| 20 | `classroomHours` | int | YES |  |  |
| 21 | `status` | nvarchar(1000) | NO | `('COMPLIANT')` |  |
| 22 | `verifiedAt` | datetime2 | YES |  |  |
| 23 | `verifiedById` | nvarchar(1000) | YES |  |  |
| 24 | `expirationDate` | datetime2 | YES |  |  |
| 25 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 26 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ApprenticeshipCompliance_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ApprenticeshipCompliance_complianceMethod_idx` | no | NONCLUSTERED | `complianceMethod` |  |
| `ApprenticeshipCompliance_craft_idx` | no | NONCLUSTERED | `craft` |  |
| `ApprenticeshipCompliance_status_idx` | no | NONCLUSTERED | `status` |  |
| `ApprenticeshipCompliance_vendorId_craft_key` | YES | NONCLUSTERED | `vendorId`, `craft` |  |
| `ApprenticeshipCompliance_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
