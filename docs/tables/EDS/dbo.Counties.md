# Table: `dbo.Counties`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 78

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

U.S. counties lookup (~78 rows). Tiny reference — `(State, Name)` per `CountyId` with a `StateId` link. Referenced by `BidTradeCounties`, trades-bid scoping, and address rollups.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CountyId` | int | NO |  | YES |
| 2 | `State` | char(2) | NO |  |  |
| 3 | `Name` | varchar(50) | NO |  |  |
| 4 | `StateId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_StateIDName` | no | NONCLUSTERED | `Name`, `StateId` |  |
| `SK_StateName` | no | NONCLUSTERED | `State`, `Name` |  |
