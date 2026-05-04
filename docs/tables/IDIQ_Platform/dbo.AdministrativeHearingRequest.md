# Table: `dbo.AdministrativeHearingRequest`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `hearingType` | nvarchar(1000) | NO |  |  |
| 4 | `entityType` | nvarchar(1000) | NO |  |  |
| 5 | `entityId` | nvarchar(1000) | NO |  |  |
| 6 | `cooperativeDebarmentId` | nvarchar(1000) | YES |  |  |
| 7 | `leadAgencyComplianceId` | nvarchar(1000) | YES |  |  |
| 8 | `vendorDebarmentRecordId` | nvarchar(1000) | YES |  |  |
| 9 | `vendorRelationshipId` | nvarchar(1000) | YES |  |  |
| 10 | `requestDate` | datetime2 | NO | `(getdate())` |  |
| 11 | `requestedById` | nvarchar(1000) | YES |  |  |
| 12 | `requestReason` | nvarchar(max) | NO |  |  |
| 13 | `supportingDocuments` | nvarchar(max) | YES |  |  |
| 14 | `aljAssigned` | nvarchar(1000) | YES |  |  |
| 15 | `aljAssignedDate` | datetime2 | YES |  |  |
| 16 | `oalCaseNumber` | nvarchar(1000) | YES |  |  |
| 17 | `hearingDate` | datetime2 | YES |  |  |
| 18 | `hearingLocation` | nvarchar(1000) | YES |  |  |
| 19 | `hearingType2` | nvarchar(1000) | YES |  |  |
| 20 | `decision` | nvarchar(1000) | YES |  |  |
| 21 | `decisionDate` | datetime2 | YES |  |  |
| 22 | `decisionDocument` | nvarchar(1000) | YES |  |  |
| 23 | `decisionSummary` | nvarchar(max) | YES |  |  |
| 24 | `directorReview` | bit | NO | `((0))` |  |
| 25 | `directorDecision` | nvarchar(1000) | YES |  |  |
| 26 | `directorDecisionDate` | datetime2 | YES |  |  |
| 27 | `directorDecisionNotes` | nvarchar(max) | YES |  |  |
| 28 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 29 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 30 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AdministrativeHearingRequest_entityId_idx` | no | NONCLUSTERED | `entityId` |  |
| `AdministrativeHearingRequest_hearingDate_idx` | no | NONCLUSTERED | `hearingDate` |  |
| `AdministrativeHearingRequest_hearingType_idx` | no | NONCLUSTERED | `hearingType` |  |
| `AdministrativeHearingRequest_oalCaseNumber_idx` | no | NONCLUSTERED | `oalCaseNumber` |  |
| `AdministrativeHearingRequest_status_idx` | no | NONCLUSTERED | `status` |  |
| `AdministrativeHearingRequest_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
