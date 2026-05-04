# Table: `dbo.CooperativeDebarment`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `cooperativeId` | nvarchar(1000) | NO |  |  |
| 3 | `isDebarred` | bit | NO | `((0))` |  |
| 4 | `debarmentStartDate` | datetime2 | YES |  |  |
| 5 | `debarmentEndDate` | datetime2 | YES |  |  |
| 6 | `triggeringViolationId` | nvarchar(1000) | YES |  |  |
| 7 | `triggeringVendorId` | nvarchar(1000) | YES |  |  |
| 8 | `triggeringVendorName` | nvarchar(1000) | YES |  |  |
| 9 | `reason` | nvarchar(max) | YES |  |  |
| 10 | `njDolNotificationDate` | datetime2 | YES |  |  |
| 11 | `njDolCaseNumber` | nvarchar(1000) | YES |  |  |
| 12 | `status` | nvarchar(1000) | NO | `('ACTIVE')` |  |
| 13 | `appealedAt` | datetime2 | YES |  |  |
| 14 | `appealReason` | nvarchar(max) | YES |  |  |
| 15 | `appealDecision` | nvarchar(1000) | YES |  |  |
| 16 | `appealDecisionDate` | datetime2 | YES |  |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CooperativeDebarment_cooperativeId_key` | YES | NONCLUSTERED | `cooperativeId` |  |
| `CooperativeDebarment_debarmentEndDate_idx` | no | NONCLUSTERED | `debarmentEndDate` |  |
| `CooperativeDebarment_isDebarred_idx` | no | NONCLUSTERED | `isDebarred` |  |
| `CooperativeDebarment_status_idx` | no | NONCLUSTERED | `status` |  |
