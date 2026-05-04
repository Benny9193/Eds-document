# Table: `dbo.ESignatureSigner`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `envelopeId` | nvarchar(1000) | NO |  |  |
| 3 | `email` | nvarchar(1000) | NO |  |  |
| 4 | `name` | nvarchar(1000) | NO |  |  |
| 5 | `role` | nvarchar(1000) | NO |  |  |
| 6 | `order` | int | NO | `((1))` |  |
| 7 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 8 | `signedAt` | datetime2 | YES |  |  |
| 9 | `declinedAt` | datetime2 | YES |  |  |
| 10 | `declineReason` | nvarchar(1000) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 12 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ESignatureSigner_envelopeId_fkey` | `envelopeId` | [`dbo.ESignatureEnvelope.id`](dbo.ESignatureEnvelope.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ESignatureSigner_email_idx` | no | NONCLUSTERED | `email` |  |
| `ESignatureSigner_envelopeId_idx` | no | NONCLUSTERED | `envelopeId` |  |
