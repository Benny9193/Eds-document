# Table: `dbo.NotificationBlogs`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 20

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BlogID` | uniqueidentifier | NO |  | YES |
| 2 | `PostGUID` | uniqueidentifier | NO |  |  |
| 3 | `PostID` | bigint | NO |  |  |
| 4 | `Owner` | nvarchar(255) | YES |  |  |
| 5 | `PublicationDate` | datetime | NO |  |  |
| 6 | `CommentsUrl` | nvarchar(511) | YES |  |  |
| 7 | `CommentsCount` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_NotificationBlogs_BlogID` | `BlogID` | [`dbo.NotificationItems.NotificationID`](dbo.NotificationItems.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UK_NotificationBlogs` | YES | NONCLUSTERED | `PostGUID`, `PostID` |  |
