# Table: `dbo.MSmerge_genHistory`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `guidsrc` | uniqueidentifier | NO |  |  |
| 2 | `pubid` | uniqueidentifier | YES |  |  |
| 3 | `generation` | bigint | NO |  |  |
| 4 | `art_nick` | int | YES |  |  |
| 5 | `nicknames` | varbinary(1001) | NO |  |  |
| 6 | `coldate` | datetime | NO |  |  |
| 7 | `genstatus` | tinyint | NO |  |  |
| 8 | `changecount` | int | NO |  |  |
| 9 | `subscriber_number` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `nc2MSmerge_genhistory` | no | NONCLUSTERED | `genstatus`, `art_nick`, `changecount` |  |
