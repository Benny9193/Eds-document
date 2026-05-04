# Table: `dbo.DocTypeFieldRecognitionZone`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Enabled` | bit | NO | `((0))` |  |
| 3 | `LeftPosition` | decimal(7,2) | NO | `((0))` |  |
| 4 | `TopPosition` | decimal(7,2) | NO | `((0))` |  |
| 5 | `Width` | decimal(7,2) | NO | `((0))` |  |
| 6 | `Height` | decimal(7,2) | NO | `((0))` |  |
| 7 | `PageNumber` | int | NO | `((1))` |  |
| 8 | `ItemOrder` | int | NO | `((0))` |  |
| 9 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 10 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 11 | `RecognitionType` | nvarchar(50) | NO | `('')` |  |
| 12 | `DocBreakOnZonal` | bit | NO | `((0))` |  |
| 13 | `DocBreakOnZonalNewValue` | bit | NO | `((0))` |  |
| 14 | `CustomBarcodeType` | nvarchar(50) | NO | `('')` |  |
| 15 | `CustomBarcodeMinLength` | int | NO | `((0))` |  |
| 16 | `CustomBarcodeMaxLength` | int | NO | `((0))` |  |
| 17 | `ZonalRemovePage` | bit | NO | `((0))` |  |
| 18 | `UseRegularExpression` | bit | YES |  |  |
| 19 | `RegularExpression` | nvarchar(1500) | YES |  |  |
| 20 | `HorizontalTolerance` | decimal(7,2) | NO | `((0.5))` |  |
| 21 | `VerticalTolerance` | decimal(7,2) | NO | `((0.5))` |  |
| 22 | `RemoveSpaces` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocTypeFieldRecognitionZone_DocTypeField` | `DocTypeFieldId` | [`dbo.DocTypeField.Id`](dbo.DocTypeField.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureJobSinglePageImageItemZonal`](dbo.CaptureJobSinglePageImageItemZonal.md) | `DocTypeFieldRecognitionZoneId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocTypeFieldRecognitionZoneCondition`](dbo.DocTypeFieldRecognitionZoneCondition.md) | `DocTypeFieldRecognitionZoneId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocTypeFieldRecognitionZone_DocTypeFieldId` | no | NONCLUSTERED | `DocTypeFieldId` |  |
| `IX_DocTypeFieldRecognitionZone_DocTypeId` | no | NONCLUSTERED | `DocTypeId` |  |
