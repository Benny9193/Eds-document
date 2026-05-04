# Table: `dbo.VendorPerformance`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4712

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PerformanceID` | int | NO |  | YES |
| 2 | `VendorID` | int | NO |  |  |
| 3 | `EvaluationPeriod` | varchar(10) | NO |  |  |
| 4 | `OnTimeDeliveryPct` | decimal(5,2) | YES |  |  |
| 5 | `QualityScore` | decimal(5,2) | YES |  |  |
| 6 | `DefectRate` | decimal(5,2) | YES |  |  |
| 7 | `ResponsivenessScore` | decimal(5,2) | YES |  |  |
| 8 | `CostCompetitiveness` | decimal(5,2) | YES |  |  |
| 9 | `OverallScore` | decimal(5,2) | YES |  |  |
| 10 | `EvaluatorNotes` | nvarchar(1000) | YES |  |  |
| 11 | `EvaluationDate` | date | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__VendorPer__Vendo__628FA481` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VPerf_Period` | no | NONCLUSTERED | `EvaluationPeriod` |  |
| `IX_VPerf_VendorID` | no | NONCLUSTERED | `VendorID` |  |
| `UQ_VendorPerf` | YES | NONCLUSTERED | `VendorID`, `EvaluationPeriod` |  |
