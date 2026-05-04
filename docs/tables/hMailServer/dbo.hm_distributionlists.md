# Table: `dbo.hm_distributionlists`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `distributionlistid` | int | NO |  | YES |
| 2 | `distributionlistdomainid` | int | NO |  |  |
| 3 | `distributionlistaddress` | nvarchar(255) | NO |  |  |
| 4 | `distributionlistenabled` | tinyint | NO |  |  |
| 5 | `distributionlistrequireauth` | tinyint | NO |  |  |
| 6 | `distributionlistrequireaddress` | nvarchar(255) | NO |  |  |
| 7 | `distributionlistmode` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_distributionlists_distributionlistdomainid` | no | CLUSTERED | `distributionlistdomainid` |  |
| `u_distributionlistaddress` | YES | NONCLUSTERED | `distributionlistaddress` |  |
