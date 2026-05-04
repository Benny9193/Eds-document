# Table: `dbo.MonthlyPublicPosting`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `postingMonth` | int | NO |  |  |
| 4 | `postingYear` | int | NO |  |  |
| 5 | `contractingUnitName` | nvarchar(1000) | NO |  |  |
| 6 | `cooperativeContractNumber` | nvarchar(1000) | YES |  |  |
| 7 | `contractorName` | nvarchar(1000) | NO |  |  |
| 8 | `projectDescription` | nvarchar(max) | YES |  |  |
| 9 | `projectCost` | decimal(18,2) | NO |  |  |
| 10 | `certifiedPayrollReceived` | bit | NO | `((0))` |  |
| 11 | `certifiedPayrollReceivedDate` | datetime2 | YES |  |  |
| 12 | `certifiedPayrollDocumentKey` | nvarchar(1000) | YES |  |  |
| 13 | `contractId` | nvarchar(1000) | YES |  |  |
| 14 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 15 | `vendorId` | nvarchar(1000) | YES |  |  |
| 16 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 17 | `postedAt` | datetime2 | YES |  |  |
| 18 | `postedUrl` | nvarchar(1000) | YES |  |  |
| 19 | `dueDate` | datetime2 | NO |  |  |
| 20 | `documentKey` | nvarchar(1000) | YES |  |  |
| 21 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 22 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `MonthlyPublicPosting_dueDate_idx` | no | NONCLUSTERED | `dueDate` |  |
| `MonthlyPublicPosting_postingYear_postingMonth_idx` | no | NONCLUSTERED | `postingYear`, `postingMonth` |  |
| `MonthlyPublicPosting_status_idx` | no | NONCLUSTERED | `status` |  |
| `MonthlyPublicPosting_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `MonthlyPublicPosting_tenantId_postingMonth_postingYear_contractorName_key` | YES | NONCLUSTERED | `tenantId`, `postingMonth`, `postingYear`, `contractorName` |  |
