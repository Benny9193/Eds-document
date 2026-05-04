# Table: `dbo.ProjectTasks`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProjectTasksId` | int | NO |  | YES |
| 2 | `TaskSeqNum` | int | YES |  |  |
| 3 | `TaskDescription` | varchar(60) | YES |  |  |
| 4 | `PreReqSeqNum` | int | YES |  |  |
| 5 | `OnlineTask` | tinyint | YES |  |  |
| 6 | `BookletTask` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Seq` | no | NONCLUSTERED | `TaskSeqNum` |  |
