# Table: `dbo.SolicitationCounty`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 693

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `countyId` | nvarchar(1000) | NO |  |  |
| 4 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationCounty_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | CASCADE |
| `SolicitationCounty_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationCounty_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `SolicitationCounty_solicitationId_countyId_key` | YES | NONCLUSTERED | `solicitationId`, `countyId` |  |
| `SolicitationCounty_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
