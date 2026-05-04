# Table: `dbo.FinalPaymentCertification`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `tenantId` | nvarchar(1000) | NO |  |  |
| 5 | `finalPaymentAmount` | decimal(18,2) | NO |  |  |
| 6 | `paymentRequestedAt` | datetime2 | NO |  |  |
| 7 | `certificationRequired` | bit | NO | `((1))` |  |
| 8 | `allWagesPaidCertified` | bit | NO | `((0))` |  |
| 9 | `certificationDate` | datetime2 | YES |  |  |
| 10 | `certifierName` | nvarchar(1000) | YES |  |  |
| 11 | `certifierTitle` | nvarchar(1000) | YES |  |  |
| 12 | `certificationDocumentKey` | nvarchar(1000) | YES |  |  |
| 13 | `hasUnpaidWages` | bit | NO | `((0))` |  |
| 14 | `unpaidWagesStatement` | nvarchar(max) | YES |  |  |
| 15 | `unpaidWagesAmount` | decimal(18,2) | YES |  |  |
| 16 | `amountWithheld` | decimal(18,2) | YES |  |  |
| 17 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 18 | `paymentApprovedAt` | datetime2 | YES |  |  |
| 19 | `paymentApprovedById` | nvarchar(1000) | YES |  |  |
| 20 | `paymentReleasedAt` | datetime2 | YES |  |  |
| 21 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 22 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FinalPaymentCertification_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | CASCADE | CASCADE |
| `FinalPaymentCertification_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `FinalPaymentCertification_status_idx` | no | NONCLUSTERED | `status` |  |
| `FinalPaymentCertification_taskOrderId_key` | YES | NONCLUSTERED | `taskOrderId` |  |
| `FinalPaymentCertification_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `FinalPaymentCertification_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
