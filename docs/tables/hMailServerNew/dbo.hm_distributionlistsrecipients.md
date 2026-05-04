# Table: `dbo.hm_distributionlistsrecipients`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `distributionlistrecipientid` | int | NO |  | YES |
| 2 | `distributionlistrecipientlistid` | int | NO |  |  |
| 3 | `distributionlistrecipientaddress` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_distributionlistsrecipients_distributionlistrecipientlistid` | no | CLUSTERED | `distributionlistrecipientlistid` |  |
