# Table: `dbo.BidForm`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `title` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | YES |  |  |
| 5 | `allowSaveDraft` | bit | NO | `((1))` |  |
| 6 | `requireSignature` | bit | NO | `((1))` |  |
| 7 | `allowAmendments` | bit | NO | `((0))` |  |
| 8 | `autoPopulateVendorInfo` | bit | NO | `((1))` |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidForm_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidFormSection`](dbo.BidFormSection.md) | `bidFormId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidForm_solicitationId_key` | YES | NONCLUSTERED | `solicitationId` |  |
