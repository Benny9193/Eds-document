# Table: `dbo.CaptureJobInputItem`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11041

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `CaptureJobId` | uniqueidentifier | NO |  |  |
| 3 | `Name` | nvarchar(260) | NO | `('')` |  |
| 4 | `LastWriteTimeUtcTicks` | bigint | NO | `((0))` |  |
| 5 | `ItemGroup` | uniqueidentifier | NO | `(newid())` |  |
| 6 | `ItemOrder` | int | NO |  |  |
| 7 | `LastItemInGroup` | bit | NO | `((0))` |  |
| 8 | `SinglePageSplitComplete` | bit | NO | `((0))` |  |
| 9 | `NoQCardMessageSent` | bit | NO | `((0))` |  |
| 10 | `QCardId` | int | YES |  |  |
| 11 | `EmailCaptureFieldsXml` | nvarchar(max) | NO | `('')` |  |
| 12 | `DirectScanLastPage` | bit | NO | `((0))` |  |
| 13 | `Priority` | int | YES |  |  |
| 14 | `DisableXmlOdbcLookup` | bit | YES |  |  |
| 15 | `DisableXmlWorkflowProcessing` | bit | YES |  |  |
| 16 | `QueuedForSplit` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CaptureJobInputItem_CaptureJob` | `CaptureJobId` | [`dbo.CaptureJob.Id`](dbo.CaptureJob.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CaptureJobInputItemData`](dbo.CaptureJobInputItemData.md) | `CaptureJobInputItemId` | `Id` | CASCADE | CASCADE |
| [`dbo.CaptureJobSinglePageImageItem`](dbo.CaptureJobSinglePageImageItem.md) | `CaptureJobInputItemId` | `Id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CaptureJobInputItem_CaptureJobId` | no | NONCLUSTERED | `CaptureJobId` |  |
| `IX_CaptureJobInputItem_ItemOrder` | YES | NONCLUSTERED | `ItemOrder` |  |
