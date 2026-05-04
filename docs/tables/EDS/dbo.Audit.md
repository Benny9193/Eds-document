# Table: `dbo.Audit`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2568656

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Generic audit log (~2.6M rows) — application-level events (logins, permission changes, data exports, admin actions). Distinct from the change-log tables, which are field-level.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AuditId` | int | NO |  | YES |
| 2 | `AuditDate` | datetime | YES | `(getdate())` |  |
| 3 | `AuditBy` | int | YES |  |  |
| 4 | `AuditAction` | int | YES |  |  |
| 5 | `AuditFile` | varchar(50) | YES |  |  |
| 6 | `AuditRecord` | int | YES |  |  |
| 7 | `AuditMessage` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
