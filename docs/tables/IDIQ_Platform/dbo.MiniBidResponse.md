# Table: `dbo.MiniBidResponse`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `miniBidId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `bidId` | nvarchar(1000) | NO |  |  |
| 5 | `totalQuote` | decimal(18,2) | NO |  |  |
| 6 | `notes` | nvarchar(max) | YES |  |  |
| 7 | `submittedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `MiniBidResponse_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | NO_ACTION | NO_ACTION |
| `MiniBidResponse_miniBidId_fkey` | `miniBidId` | [`dbo.MiniBid.id`](dbo.MiniBid.md) | CASCADE | CASCADE |
| `MiniBidResponse_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `MiniBidResponse_miniBidId_idx` | no | NONCLUSTERED | `miniBidId` |  |
| `MiniBidResponse_miniBidId_vendorId_key` | YES | NONCLUSTERED | `miniBidId`, `vendorId` |  |
| `MiniBidResponse_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
