# Table: `dbo.hm_routes`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `routeid` | int | NO |  | YES |
| 2 | `routedomainname` | nvarchar(255) | NO |  |  |
| 3 | `routedescription` | nvarchar(255) | NO |  |  |
| 4 | `routetargetsmthost` | nvarchar(255) | NO |  |  |
| 5 | `routetargetsmtport` | int | NO |  |  |
| 6 | `routenooftries` | int | NO |  |  |
| 7 | `routeminutesbetweentry` | int | NO |  |  |
| 8 | `routealladdresses` | tinyint | NO |  |  |
| 9 | `routeuseauthentication` | tinyint | NO |  |  |
| 10 | `routeauthenticationusername` | nvarchar(255) | NO |  |  |
| 11 | `routeauthenticationpassword` | nvarchar(255) | NO |  |  |
| 12 | `routetreatsecurityaslocal` | tinyint | NO |  |  |
| 13 | `routeconnectionsecurity` | tinyint | NO |  |  |
| 14 | `routetreatsenderaslocaldomain` | tinyint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `u_routedomainname` | YES | NONCLUSTERED | `routedomainname` |  |
