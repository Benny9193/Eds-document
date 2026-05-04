# Table: `dbo.DocTypeFieldRecognitionZoneCondition`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocTypeFieldRecognitionZoneId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocTypeFieldValue` | nvarchar(256) | YES | `(NULL)` |  |
| 3 | `ConditionOperator` | nvarchar(50) | NO | `('')` |  |
| 4 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 5 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldRecognitionZoneCondition_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |
| `FK_DocTypeFieldRecognitionZoneCondition_DocTypeFieldRecognitionZone` | `DocTypeFieldRecognitionZoneId` | [`dbo.DocTypeFieldRecognitionZone.Id`](dbo.DocTypeFieldRecognitionZone.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldRecognitionZoneCondition_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeFieldRecognitionZoneCondition_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
