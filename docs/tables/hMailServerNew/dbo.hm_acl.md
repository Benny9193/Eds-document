# Table: `dbo.hm_acl`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `aclid` | bigint | NO |  | YES |
| 2 | `aclsharefolderid` | bigint | NO |  |  |
| 3 | `aclpermissiontype` | tinyint | NO |  |  |
| 4 | `aclpermissiongroupid` | bigint | NO |  |  |
| 5 | `aclpermissionaccountid` | bigint | NO |  |  |
| 6 | `aclvalue` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `hm_acl_unique` | YES | NONCLUSTERED | `aclsharefolderid`, `aclpermissiontype`, `aclpermissiongroupid`, `aclpermissionaccountid` |  |
