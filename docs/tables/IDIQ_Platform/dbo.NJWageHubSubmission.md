# Table: `dbo.NJWageHubSubmission`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `certifiedPayrollId` | nvarchar(1000) | YES |  |  |
| 4 | `projectName` | nvarchar(1000) | NO |  |  |
| 5 | `contractorName` | nvarchar(1000) | NO |  |  |
| 6 | `weekEnding` | datetime2 | NO |  |  |
| 7 | `submittedAt` | datetime2 | YES |  |  |
| 8 | `status` | nvarchar(1000) | NO | `('UNKNOWN')` |  |
| 9 | `verifiedAt` | datetime2 | YES |  |  |
| 10 | `scrapedAt` | datetime2 | NO | `(getdate())` |  |
| 11 | `rawData` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `NJWageHubSubmission_certifiedPayrollId_fkey` | `certifiedPayrollId` | [`dbo.CertifiedPayroll.id`](dbo.CertifiedPayroll.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NJWageHubSubmission_certifiedPayrollId_idx` | no | NONCLUSTERED | `certifiedPayrollId` |  |
| `NJWageHubSubmission_contractorName_idx` | no | NONCLUSTERED | `contractorName` |  |
| `NJWageHubSubmission_projectName_idx` | no | NONCLUSTERED | `projectName` |  |
| `NJWageHubSubmission_status_idx` | no | NONCLUSTERED | `status` |  |
| `NJWageHubSubmission_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `NJWageHubSubmission_weekEnding_idx` | no | NONCLUSTERED | `weekEnding` |  |
