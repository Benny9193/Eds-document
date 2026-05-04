# Table: `EDSIQWebUser.UnsubscriptionEmail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Email` | varchar(100) | NO |  |  |
| 3 | `CreatedAt` | datetime | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UnsubscriptionEmail_uindex` | YES | NONCLUSTERED | `Email` |  |
