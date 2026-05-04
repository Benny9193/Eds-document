# Table: `dbo.PublicWorksContractorRegistration`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `vendorId` | nvarchar(1000) | NO |  |  |
| 3 | `registrationNumber` | nvarchar(1000) | NO |  |  |
| 4 | `effectiveDate` | datetime2 | NO |  |  |
| 5 | `expirationDate` | datetime2 | NO |  |  |
| 6 | `renewalType` | nvarchar(1000) | YES |  |  |
| 7 | `registrationFee` | decimal(10,2) | YES |  |  |
| 8 | `status` | nvarchar(1000) | NO | `('ACTIVE')` |  |
| 9 | `statusReason` | nvarchar(max) | YES |  |  |
| 10 | `suspensionEndDate` | datetime2 | YES |  |  |
| 11 | `verifiedAt` | datetime2 | YES |  |  |
| 12 | `verifiedMethod` | nvarchar(1000) | YES |  |  |
| 13 | `verificationDocument` | nvarchar(1000) | YES |  |  |
| 14 | `lastRenewalDate` | datetime2 | YES |  |  |
| 15 | `nextRenewalDeadline` | datetime2 | YES |  |  |
| 16 | `renewalReminderSent` | bit | NO | `((0))` |  |
| 17 | `priorInterestDisclosed` | bit | NO | `((0))` |  |
| 18 | `priorInterestDetails` | nvarchar(max) | YES |  |  |
| 19 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 20 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `PublicWorksContractorRegistration_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PublicWorksContractorRegistration_expirationDate_idx` | no | NONCLUSTERED | `expirationDate` |  |
| `PublicWorksContractorRegistration_registrationNumber_idx` | no | NONCLUSTERED | `registrationNumber` |  |
| `PublicWorksContractorRegistration_status_idx` | no | NONCLUSTERED | `status` |  |
| `PublicWorksContractorRegistration_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `PublicWorksContractorRegistration_vendorId_registrationNumber_key` | YES | NONCLUSTERED | `vendorId`, `registrationNumber` |  |
