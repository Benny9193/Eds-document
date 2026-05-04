# Table: `dbo.MiniBid`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `contractId` | nvarchar(1000) | NO |  |  |
| 4 | `countyId` | nvarchar(1000) | NO |  |  |
| 5 | `title` | nvarchar(1000) | NO |  |  |
| 6 | `description` | nvarchar(max) | YES |  |  |
| 7 | `dueDate` | datetime2 | NO |  |  |
| 8 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 9 | `evaluationMethod` | nvarchar(1000) | NO | `('LOWEST_PRICE')` |  |
| 10 | `priceWeight` | int | YES |  |  |
| 11 | `qualificationsWeight` | int | YES |  |  |
| 12 | `createdById` | nvarchar(1000) | NO |  |  |
| 13 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 14 | `updatedAt` | datetime2 | NO |  |  |
| 15 | `selectedVendorId` | nvarchar(1000) | YES |  |  |
| 16 | `selectedBidId` | nvarchar(1000) | YES |  |  |
| 17 | `selectedAt` | datetime2 | YES |  |  |
| 18 | `selectionReason` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `MiniBid_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `MiniBid_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | CASCADE |
| `MiniBid_createdById_fkey` | `createdById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `MiniBid_selectedVendorId_fkey` | `selectedVendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.MiniBidLineItem`](dbo.MiniBidLineItem.md) | `miniBidId` | `id` | CASCADE | CASCADE |
| [`dbo.MiniBidResponse`](dbo.MiniBidResponse.md) | `miniBidId` | `id` | CASCADE | CASCADE |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `miniBidId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `MiniBid_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `MiniBid_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `MiniBid_status_idx` | no | NONCLUSTERED | `status` |  |
| `MiniBid_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
