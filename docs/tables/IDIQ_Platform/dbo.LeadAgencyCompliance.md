# Table: `dbo.LeadAgencyCompliance`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `leadAgencyId` | nvarchar(1000) | NO |  |  |
| 3 | `isCompliant` | bit | NO | `((1))` |  |
| 4 | `isProhibited` | bit | NO | `((0))` |  |
| 5 | `prohibitionStartDate` | datetime2 | YES |  |  |
| 6 | `prohibitionEndDate` | datetime2 | YES |  |  |
| 7 | `prohibitionReason` | nvarchar(max) | YES |  |  |
| 8 | `prohibitedById` | nvarchar(1000) | YES |  |  |
| 9 | `lastComplianceCheckDate` | datetime2 | YES |  |  |
| 10 | `monthlyPostingComplete` | bit | NO | `((1))` |  |
| 11 | `debarmentChecksComplete` | bit | NO | `((1))` |  |
| 12 | `payrollRecordsComplete` | bit | NO | `((1))` |  |
| 13 | `terminationsComplete` | bit | NO | `((1))` |  |
| 14 | `complianceViolations` | int | NO | `((0))` |  |
| 15 | `lastViolationDate` | datetime2 | YES |  |  |
| 16 | `lastViolationDescription` | nvarchar(max) | YES |  |  |
| 17 | `hasActiveAppeal` | bit | NO | `((0))` |  |
| 18 | `appealFiledAt` | datetime2 | YES |  |  |
| 19 | `appealReason` | nvarchar(max) | YES |  |  |
| 20 | `appealDecision` | nvarchar(1000) | YES |  |  |
| 21 | `appealDecisionDate` | datetime2 | YES |  |  |
| 22 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 23 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `LeadAgencyCompliance_isCompliant_idx` | no | NONCLUSTERED | `isCompliant` |  |
| `LeadAgencyCompliance_isProhibited_idx` | no | NONCLUSTERED | `isProhibited` |  |
| `LeadAgencyCompliance_leadAgencyId_key` | YES | NONCLUSTERED | `leadAgencyId` |  |
