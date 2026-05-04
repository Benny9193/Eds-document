# Table: `dbo.BidMgrTagFile`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4314063

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMgrTagFileId` | int | NO |  | YES |
| 2 | `Usr` | int | YES |  |  |
| 3 | `Tbl` | int | YES |  |  |
| 4 | `Ptr` | int | YES |  |  |
| 5 | `Val` | char(10) | YES |  |  |
| 6 | `OrigVal` | char(10) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BidMgrTagFile_Usr_Tbl` | no | NONCLUSTERED | `Usr`, `Tbl` |  |
| `SK_BidMgrTagFile_Usr_Tbl_Ptr` | no | NONCLUSTERED | `Usr`, `Tbl`, `Ptr` |  |
| `SKI_Ptr_TagUsrTblVal` | no | NONCLUSTERED | `Ptr` | `BidMgrTagFileId`, `Usr`, `Tbl`, `Val` |
