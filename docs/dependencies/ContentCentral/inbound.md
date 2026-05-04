# Cross-database inbound references: `ContentCentral`

_Generated on 2026-05-04T13:15:40.548Z_

**Target database:** `ContentCentral`

[← back to dependencies index](../README.md)

Routines, views, and triggers in *other* databases that reach into this database.

## Summary

| Source database | Distinct edges |
|-----------------|----------------|
| `EDS` | 68 |

## ← `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_retrieveTagset`](../../procedures/EDS/dbo.sp_retrieveTagset.md) | Procedure | `dbo.vw_ScannedDocumentDataAll` | `` | sed |
| [`dbo.sp_retrieveTagset`](../../procedures/EDS/dbo.sp_retrieveTagset.md) | Procedure | `dbo.vw_ScannedDocumentDataAll sd on sd` | `ContentCentral.dbo.vw_ScannedDocumentDataAll sd on sd` | text |
| [`dbo.uf_ScanDocSelectFields`](../../procedures/EDS/dbo.uf_ScanDocSelectFields.md) | Function (scalar) | `dbo.DocTypeField` | `` | sed |
| [`dbo.uf_ScanDocSelectFields`](../../procedures/EDS/dbo.uf_ScanDocSelectFields.md) | Function (scalar) | `dbo.DocTypeField DocTypeField on DocTypeField` | `ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField` | text |
| [`dbo.uf_ScanDocSelectFields`](../../procedures/EDS/dbo.uf_ScanDocSelectFields.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookupSelectItem` | `` | sed |
| [`dbo.uf_ScanDocSelectFields`](../../procedures/EDS/dbo.uf_ScanDocSelectFields.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookupSelectItem DocTypeFieldExternalLookupSelectItem` | `ContentCentral.dbo.DocTypeFieldExternalLookupSelectItem DocTypeFieldExternalLookupSelectItem` | text |
| [`dbo.uf_ScanDocSelectStatement`](../../procedures/EDS/dbo.uf_ScanDocSelectStatement.md) | Function (scalar) | `dbo.DocType` | `` | sed |
| [`dbo.uf_ScanDocSelectStatement`](../../procedures/EDS/dbo.uf_ScanDocSelectStatement.md) | Function (scalar) | `dbo.DocType DocType` | `ContentCentral.dbo.DocType DocType` | text |
| [`dbo.uf_ScanDocSelectStatement`](../../procedures/EDS/dbo.uf_ScanDocSelectStatement.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookup` | `` | sed |
| [`dbo.uf_ScanDocSelectStatement`](../../procedures/EDS/dbo.uf_ScanDocSelectStatement.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | `ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | text |
| [`dbo.uf_ScanDocWhereFields`](../../procedures/EDS/dbo.uf_ScanDocWhereFields.md) | Function (scalar) | `dbo.DocTypeField` | `` | sed |
| [`dbo.uf_ScanDocWhereFields`](../../procedures/EDS/dbo.uf_ScanDocWhereFields.md) | Function (scalar) | `dbo.DocTypeField DocTypeField on DocTypeField` | `ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField` | text |
| [`dbo.uf_ScanDocWhereFields`](../../procedures/EDS/dbo.uf_ScanDocWhereFields.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookupItem` | `` | sed |
| [`dbo.uf_ScanDocWhereFields`](../../procedures/EDS/dbo.uf_ScanDocWhereFields.md) | Function (scalar) | `dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem` | `ContentCentral.dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem` | text |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.Catalog` | `` | sed |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.Catalog Catalog on Catalog` | `ContentCentral.dbo.Catalog Catalog on Catalog` | text |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocType` | `` | sed |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocType DocType` | `ContentCentral.dbo.DocType DocType` | text |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeField` | `` | sed |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeField DocTypeField on DocTypeField` | `ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField` | text |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeFieldExternalLookup` | `` | sed |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | `ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | text |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeFieldExternalLookupItem` | `` | sed |
| `dbo.vw_ScanDocLookupFields` | View | `dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem on DocTypeFieldExternalLookupItem` | `ContentCentral.dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem on DocTypeFieldExternalLookupItem` | text |
| `dbo.vw_ScanDocLookups` | View | `dbo.Catalog` | `` | sed |
| `dbo.vw_ScanDocLookups` | View | `dbo.Catalog Catalog on Catalog` | `ContentCentral.dbo.Catalog Catalog on Catalog` | text |
| `dbo.vw_ScanDocLookups` | View | `dbo.DocType` | `` | sed |
| `dbo.vw_ScanDocLookups` | View | `dbo.DocType DocType` | `ContentCentral.dbo.DocType DocType` | text |
| `dbo.vw_ScanDocLookups` | View | `dbo.DocTypeFieldExternalLookup` | `` | sed |
| `dbo.vw_ScanDocLookups` | View | `dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | `ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | text |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.Catalog` | `` | sed |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.Catalog Catalog on Catalog` | `ContentCentral.dbo.Catalog Catalog on Catalog` | text |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocType` | `` | sed |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocType DocType` | `ContentCentral.dbo.DocType DocType` | text |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeField` | `` | sed |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeField DocTypeField on DocTypeField` | `ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField` | text |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeFieldExternalLookup` | `` | sed |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | `ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup` | text |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeFieldExternalLookupSelectItem` | `` | sed |
| `dbo.vw_ScanDocLookupTargets` | View | `dbo.DocTypeFieldExternalLookupSelectItem DocTypeFieldExternalLookupSelectItem on DocTypeFieldExternalLookupSelectItem` | `ContentCentral.dbo.DocTypeFieldExternalLookupSelectItem DocTypeFieldExternalLookupSelectItem on DocTypeFieldExternalLookupSelectItem` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.Catalog` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.Catalog Catalog with` | `ContentCentral.dbo.Catalog Catalog with` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocType` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocType DocType on DocType` | `ContentCentral.dbo.DocType DocType on DocType` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocTypeField` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocTypeField dtf` | `ContentCentral.dbo.DocTypeField dtf` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.Document` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.Document Document on Document` | `ContentCentral.dbo.Document Document on Document` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentField` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentField df on df` | `ContentCentral.dbo.DocumentField df on df` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentFolder` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentFolder DocumentFolder on DocumentFolder` | `ContentCentral.dbo.DocumentFolder DocumentFolder on DocumentFolder` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersion` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersion DocumentVersion on DocumentVersion` | `ContentCentral.dbo.DocumentVersion DocumentVersion on DocumentVersion` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersion dv with` | `ContentCentral.dbo.DocumentVersion dv with` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersionFile` | `` | sed |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersionFile DocumentVersionFile on DocumentVersionFile` | `ContentCentral.dbo.DocumentVersionFile DocumentVersionFile on DocumentVersionFile` | text |
| `dbo.vw_ScannedDocumentDataMSDS` | View | `dbo.DocumentVersionFile dvf on dvf` | `ContentCentral.dbo.DocumentVersionFile dvf on dvf` | text |
| `dbo.vw_ZonalItems` | View | `dbo.CaptureJob` | `` | sed |
| `dbo.vw_ZonalItems` | View | `dbo.CaptureJob CaptureJob on CaptureJob` | `ContentCentral.dbo.CaptureJob CaptureJob on CaptureJob` | text |
| `dbo.vw_ZonalItems` | View | `dbo.Catalog` | `` | sed |
| `dbo.vw_ZonalItems` | View | `dbo.Catalog on Catalog` | `ContentCentral.dbo.Catalog on Catalog` | text |
| `dbo.vw_ZonalItems` | View | `dbo.DocType` | `` | sed |
| `dbo.vw_ZonalItems` | View | `dbo.DocType DocType on DocType` | `ContentCentral.dbo.DocType DocType on DocType` | text |
| `dbo.vw_ZonalItems` | View | `dbo.DocTypeField` | `` | sed |
| `dbo.vw_ZonalItems` | View | `dbo.DocTypeField DocTypeField on DocTypeField` | `ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField` | text |
| `dbo.vw_ZonalItems` | View | `dbo.DocTypeFieldRecognitionZone` | `` | sed |
| `dbo.vw_ZonalItems` | View | `dbo.DocTypeFieldRecognitionZone DocTypeFieldRecognitionZone` | `ContentCentral.dbo.DocTypeFieldRecognitionZone DocTypeFieldRecognitionZone` | text |

## Source queries

See per-source-database `outbound.md` and the top-level `README.md` for the full method.
