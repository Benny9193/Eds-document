# Table: `dbo.SolicitationRequiredDocument`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 645

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | YES |  |  |
| 5 | `category` | nvarchar(1000) | YES |  |  |
| 6 | `isRequired` | bit | NO | `((1))` |  |
| 7 | `sortOrder` | int | NO | `((0))` |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `formType` | nvarchar(1000) | YES |  |  |
| 10 | `templateUrl` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationRequiredDocument_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidDocument`](dbo.BidDocument.md) | `requiredDocumentId` | `id` | SET_NULL | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationRequiredDocument_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
