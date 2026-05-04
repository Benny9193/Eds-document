# Table: `dbo.CertifiedPayrollReceipt`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `certifiedPayrollId` | nvarchar(1000) | YES |  |  |
| 4 | `vendorId` | nvarchar(1000) | NO |  |  |
| 5 | `contractId` | nvarchar(1000) | YES |  |  |
| 6 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 7 | `weekEnding` | datetime2 | NO |  |  |
| 8 | `receivedDate` | datetime2 | NO |  |  |
| 9 | `receivedById` | nvarchar(1000) | YES |  |  |
| 10 | `documentKey` | nvarchar(1000) | YES |  |  |
| 11 | `retentionExpiresAt` | datetime2 | NO |  |  |
| 12 | `isVerified` | bit | NO | `((0))` |  |
| 13 | `verifiedAt` | datetime2 | YES |  |  |
| 14 | `verifiedById` | nvarchar(1000) | YES |  |  |
| 15 | `verificationNotes` | nvarchar(max) | YES |  |  |
| 16 | `status` | nvarchar(1000) | NO | `('RECEIVED')` |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CertifiedPayrollReceipt_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `CertifiedPayrollReceipt_retentionExpiresAt_idx` | no | NONCLUSTERED | `retentionExpiresAt` |  |
| `CertifiedPayrollReceipt_status_idx` | no | NONCLUSTERED | `status` |  |
| `CertifiedPayrollReceipt_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `CertifiedPayrollReceipt_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `CertifiedPayrollReceipt_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `CertifiedPayrollReceipt_weekEnding_idx` | no | NONCLUSTERED | `weekEnding` |  |
