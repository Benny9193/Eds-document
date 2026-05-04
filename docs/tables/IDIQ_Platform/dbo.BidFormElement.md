# Table: `dbo.BidFormElement`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `sectionId` | nvarchar(1000) | NO |  |  |
| 3 | `type` | nvarchar(1000) | NO |  |  |
| 4 | `label` | nvarchar(1000) | NO |  |  |
| 5 | `required` | bit | NO | `((0))` |  |
| 6 | `helpText` | nvarchar(max) | YES |  |  |
| 7 | `order` | int | NO |  |  |
| 8 | `validation` | nvarchar(max) | YES |  |  |
| 9 | `options` | nvarchar(max) | YES |  |  |
| 10 | `tableConfig` | nvarchar(max) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 12 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidFormElement_sectionId_fkey` | `sectionId` | [`dbo.BidFormSection.id`](dbo.BidFormSection.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidFormElement_sectionId_idx` | no | NONCLUSTERED | `sectionId` |  |
