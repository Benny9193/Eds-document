# View: `dbo.vw_ZonalItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CaptureName` | nvarchar(50) | NO |  |  |
| 2 | `Folder` | nvarchar(260) | YES |  |  |
| 3 | `CatalogName` | nvarchar(50) | NO |  |  |
| 4 | `DocCategory` | nvarchar(50) | NO |  |  |
| 5 | `DocType` | nvarchar(50) | NO |  |  |
| 6 | `DocTypeFieldId` | uniqueidentifier | NO |  |  |
| 7 | `TopLeftX` | decimal(8,2) | YES |  |  |
| 8 | `TopLeftY` | decimal(8,2) | YES |  |  |
| 9 | `TopRightX` | decimal(9,2) | YES |  |  |
| 10 | `TopRightY` | decimal(8,2) | YES |  |  |
| 11 | `BottomLeftX` | decimal(8,2) | YES |  |  |
| 12 | `BottomLeftY` | decimal(9,2) | YES |  |  |
| 13 | `BottomRightX` | decimal(9,2) | YES |  |  |
| 14 | `BottomRightY` | decimal(9,2) | YES |  |  |
| 15 | `ZonalRemovePage` | bit | NO |  |  |
| 16 | `UseRegularExpression` | bit | YES |  |  |
| 17 | `RegularExpression` | nvarchar(1500) | YES |  |  |
| 18 | `DocTypeFieldRecognitionZoneId` | uniqueidentifier | NO |  |  |
| 19 | `ScanJobId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.CaptureJob` | unresolved |
| [`dbo.Catalog`](dbo.Catalog.md) | unresolved |
| `dbo.DocType` | unresolved |
| `dbo.DocTypeField` | unresolved |
| `dbo.DocTypeFieldRecognitionZone` | unresolved |
| [`dbo.ScanJobs`](dbo.ScanJobs.md) | USER_TABLE |
| [`dbo.ScannerZones`](dbo.ScannerZones.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ZonalItems] as
select CaptureJob.Name CaptureName, CaptureJob.Folder, Catalog.Name CatalogName, DocType.Name DocCategory, DocTypeField.Name DocType, DocTypeField.Id DocTypeFieldId,
sz.LeftPosition - sz.HorizontalTolerance TopLeftX,
sz.TopPosition - sz.VerticalTolerance TopLeftY,
sz.LeftPosition + sz.Width + sz.HorizontalTolerance TopRightX,
sz.TopPosition - sz.VerticalTolerance TopRightY,
sz.LeftPosition - sz.HorizontalTolerance BottomLeftX,
sz.TopPosition + sz.Height + sz.VerticalTolerance BottomLeftY,
sz.LeftPosition + sz.Width + sz.HorizontalTolerance BottomRightX,
sz.TopPosition + sz.Height + sz.VerticalTolerance BottomRightY,
DocTypeFieldRecognitionZone.ZonalRemovePage,
DocTypeFieldRecognitionZone.UseRegularExpression,
DocTypeFieldRecognitionZone.RegularExpression,
sz.DocTypeFieldRecognitionZoneId,
sj.ScanJobId
  from ContentCentral.dbo.DocTypeFieldRecognitionZone DocTypeFieldRecognitionZone
  join dbo.ScannerZones sz on sz.DocTypeFieldRecognitionZoneId = DocTypeFieldRecognitionZone.Id
  join dbo.ScanJobs sj on sj.ScanJobId = sz.ScanJobId
  join ContentCentral.dbo.DocType DocType on DocType.Id = DocTypeFieldRecognitionZone.DocTypeId
  join ContentCentral.dbo.Catalog on Catalog.Id = DocType.CatalogId
  join ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField.Id = DocTypeFieldRecognitionZone.DocTypeFieldId
  join ContentCentral.dbo.CaptureJob CaptureJob on CaptureJob.DocTypeId = DocType.Id
                 and CaptureJob.InputSource = 'Folder'
                 and CaptureJob.DescriptorType = 'Zonal'
                 and CaptureJob.Id = sj.CCCaptureJobId
```
