# Table: `dbo.UnsuccessfulBidderClaim`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 4 | `claimantVendorId` | nvarchar(1000) | NO |  |  |
| 5 | `claimantName` | nvarchar(1000) | NO |  |  |
| 6 | `claimantContact` | nvarchar(500) | YES |  |  |
| 7 | `defendantVendorId` | nvarchar(1000) | NO |  |  |
| 8 | `defendantName` | nvarchar(1000) | NO |  |  |
| 9 | `claimDate` | datetime2 | NO |  |  |
| 10 | `claimDescription` | nvarchar(max) | NO |  |  |
| 11 | `allegedViolations` | nvarchar(max) | NO |  |  |
| 12 | `actualDamages` | decimal(18,2) | YES |  |  |
| 13 | `attorneyFees` | decimal(18,2) | YES |  |  |
| 14 | `tripleDamagesSought` | bit | NO | `((0))` |  |
| 15 | `totalClaimAmount` | decimal(18,2) | YES |  |  |
| 16 | `status` | nvarchar(1000) | NO | `('FILED')` |  |
| 17 | `courtCaseNumber` | nvarchar(1000) | YES |  |  |
| 18 | `courtName` | nvarchar(1000) | YES |  |  |
| 19 | `filingDate` | datetime2 | YES |  |  |
| 20 | `resolution` | nvarchar(1000) | YES |  |  |
| 21 | `resolutionDate` | datetime2 | YES |  |  |
| 22 | `settlementAmount` | decimal(18,2) | YES |  |  |
| 23 | `judgmentAmount` | decimal(18,2) | YES |  |  |
| 24 | `resolutionNotes` | nvarchar(max) | YES |  |  |
| 25 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 26 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `UnsuccessfulBidderClaim_claimantVendorId_fkey` | `claimantVendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |
| `UnsuccessfulBidderClaim_defendantVendorId_fkey` | `defendantVendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |
| `UnsuccessfulBidderClaim_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UnsuccessfulBidderClaim_claimantVendorId_idx` | no | NONCLUSTERED | `claimantVendorId` |  |
| `UnsuccessfulBidderClaim_defendantVendorId_idx` | no | NONCLUSTERED | `defendantVendorId` |  |
| `UnsuccessfulBidderClaim_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `UnsuccessfulBidderClaim_status_idx` | no | NONCLUSTERED | `status` |  |
| `UnsuccessfulBidderClaim_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
