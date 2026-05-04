# Table: `dbo.CatalogAdminPermission`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `AllowDocView` | bit | NO | `((0))` |  |
| 3 | `AllowDocSearch` | bit | NO | `((0))` |  |
| 4 | `AllowDocBrowse` | bit | NO | `((0))` |  |
| 5 | `AllowDocAdd` | bit | NO | `((0))` |  |
| 6 | `AllowDocEdit` | bit | NO | `((0))` |  |
| 7 | `AllowDocMetaEdit` | bit | NO | `((0))` |  |
| 8 | `AllowDocDelete` | bit | NO | `((0))` |  |
| 9 | `AllowApprovalProcessAssign` | bit | NO | `((0))` |  |
| 10 | `AllowWorkQueueAssign` | bit | NO | `((0))` |  |
| 11 | `AllowRetentionOverride` | bit | NO | `((0))` |  |
| 12 | `AllowDocTypeAdmin` | bit | NO | `((0))` |  |
| 13 | `AllowApprovalProcessAdmin` | bit | NO | `((0))` |  |
| 14 | `AllowWorkQueueAdmin` | bit | NO | `((0))` |  |
| 15 | `AllowDocShare` | bit | NO | `((0))` |  |
| 16 | `AllowDocViewInApprovalQueue` | bit | NO | `((0))` |  |
| 17 | `AllowAnnotationWrite` | bit | NO | `((0))` |  |
| 18 | `AllowAnnotationPrint` | bit | NO | `((0))` |  |
| 19 | `AllowDocDownload` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
