# Table: `dbo.WageRateDetermination`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 4 | `contractId` | nvarchar(1000) | YES |  |  |
| 5 | `solicitationId` | nvarchar(1000) | YES |  |  |
| 6 | `confirmationNumber` | nvarchar(1000) | YES |  |  |
| 7 | `requestedAt` | datetime2 | YES |  |  |
| 8 | `requestedById` | nvarchar(1000) | YES |  |  |
| 9 | `projectName` | nvarchar(1000) | NO |  |  |
| 10 | `projectDescription` | nvarchar(max) | YES |  |  |
| 11 | `projectAddress` | nvarchar(1000) | YES |  |  |
| 12 | `county` | nvarchar(1000) | NO |  |  |
| 13 | `estimatedValue` | decimal(18,2) | YES |  |  |
| 14 | `estimatedStartDate` | datetime2 | YES |  |  |
| 15 | `status` | nvarchar(1000) | NO | `('PENDING_REQUEST')` |  |
| 16 | `determinationNumber` | nvarchar(1000) | YES |  |  |
| 17 | `receivedAt` | datetime2 | YES |  |  |
| 18 | `effectiveDate` | datetime2 | YES |  |  |
| 19 | `expirationDate` | datetime2 | YES |  |  |
| 20 | `documentKey` | nvarchar(1000) | YES |  |  |
| 21 | `extractedRates` | nvarchar(max) | YES |  |  |
| 22 | `extractionConfidence` | float | YES |  |  |
| 23 | `extractedAt` | datetime2 | YES |  |  |
| 24 | `ratesImported` | int | NO | `((0))` |  |
| 25 | `confirmedAt` | datetime2 | YES |  |  |
| 26 | `confirmedById` | nvarchar(1000) | YES |  |  |
| 27 | `inboundEmailAddress` | nvarchar(1000) | YES |  |  |
| 28 | `emailReceivedAt` | datetime2 | YES |  |  |
| 29 | `emailMessageId` | nvarchar(1000) | YES |  |  |
| 30 | `emailFrom` | nvarchar(1000) | YES |  |  |
| 31 | `emailSubject` | nvarchar(1000) | YES |  |  |
| 32 | `emailBodyKey` | nvarchar(1000) | YES |  |  |
| 33 | `emailHtmlKey` | nvarchar(1000) | YES |  |  |
| 34 | `hasAttachment` | bit | NO | `((0))` |  |
| 35 | `attachmentFilename` | nvarchar(1000) | YES |  |  |
| 36 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 37 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `WageRateDetermination_confirmedById_fkey` | `confirmedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `WageRateDetermination_requestedById_fkey` | `requestedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `WageRateDetermination_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | SET_NULL | NO_ACTION |
| `WageRateDetermination_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WageRateDetermination_confirmationNumber_idx` | no | NONCLUSTERED | `confirmationNumber` |  |
| `WageRateDetermination_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `WageRateDetermination_determinationNumber_idx` | no | NONCLUSTERED | `determinationNumber` |  |
| `WageRateDetermination_emailMessageId_idx` | no | NONCLUSTERED | `emailMessageId` |  |
| `WageRateDetermination_inboundEmailAddress_idx` | no | NONCLUSTERED | `inboundEmailAddress` |  |
| `WageRateDetermination_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `WageRateDetermination_status_idx` | no | NONCLUSTERED | `status` |  |
| `WageRateDetermination_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `WageRateDetermination_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
