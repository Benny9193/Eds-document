# Table: `dbo.SecurityRoleKeys`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 65

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Junction `SecurityRole` ↔ `SecurityKey` (~65 rows). Defines which security keys (permission flags) belong to each role. `SecurityRoleUsers` then maps users to roles.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SecurityRoleKeyID` | int | NO |  | YES |
| 2 | `SecurityKeyID` | int | YES |  |  |
| 3 | `SecurityRoleID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
