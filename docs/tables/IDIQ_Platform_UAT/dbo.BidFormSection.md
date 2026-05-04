# Table: `dbo.BidFormSection`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidFormId` | nvarchar(1000) | NO |  |  |
| 3 | `title` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | YES |  |  |
| 5 | `order` | int | NO |  |  |
| 6 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 7 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidFormSection_bidFormId_fkey` | `bidFormId` | [`dbo.BidForm.id`](dbo.BidForm.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidFormElement`](dbo.BidFormElement.md) | `sectionId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidFormSection_bidFormId_idx` | no | NONCLUSTERED | `bidFormId` |  |
