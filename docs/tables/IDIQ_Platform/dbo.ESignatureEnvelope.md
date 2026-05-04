# Table: `dbo.ESignatureEnvelope`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `provider` | nvarchar(1000) | NO |  |  |
| 4 | `externalId` | nvarchar(1000) | NO |  |  |
| 5 | `status` | nvarchar(1000) | NO | `('CREATED')` |  |
| 6 | `documentType` | nvarchar(1000) | NO |  |  |
| 7 | `documentId` | nvarchar(1000) | NO |  |  |
| 8 | `documentTitle` | nvarchar(1000) | NO |  |  |
| 9 | `sentAt` | datetime2 | YES |  |  |
| 10 | `completedAt` | datetime2 | YES |  |  |
| 11 | `voidedAt` | datetime2 | YES |  |  |
| 12 | `expiresAt` | datetime2 | YES |  |  |
| 13 | `signedDocumentKey` | nvarchar(1000) | YES |  |  |
| 14 | `auditTrail` | nvarchar(max) | YES |  |  |
| 15 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 16 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ESignatureSigner`](dbo.ESignatureSigner.md) | `envelopeId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ESignatureEnvelope_documentType_documentId_idx` | no | NONCLUSTERED | `documentType`, `documentId` |  |
| `ESignatureEnvelope_provider_externalId_key` | YES | NONCLUSTERED | `provider`, `externalId` |  |
| `ESignatureEnvelope_status_idx` | no | NONCLUSTERED | `status` |  |
| `ESignatureEnvelope_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
