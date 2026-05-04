# Table: `dbo.UserImports`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 328

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

User-import staging table (~328 rows). Excel-derived columns with literal spaces in their names (`User #`, `Approver User #`, `Approval Level (Teacher/Principal/BA)`, `Account Code`, `Amount`). Working set for batch creation of district users; promoted into `Users`, `UserAccounts`, and approval trees.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `School` | nvarchar(255) | YES |  |  |
| 2 | `User #` | nvarchar(255) | YES |  |  |
| 3 | `Attention` | nvarchar(255) | YES |  |  |
| 4 | `Approval Level (Teacher/Principal/BA)` | nvarchar(255) | YES |  |  |
| 5 | `Approver User #` | nvarchar(255) | YES |  |  |
| 6 | `Account Code` | nvarchar(255) | YES |  |  |
| 7 | `Amount` | float | YES |  |  |
| 8 | `SysId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
