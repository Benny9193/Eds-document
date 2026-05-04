# Table: `dbo.Tracks`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 51840

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Storm` | int | NO |  |  |
| 3 | `Datestamp` | datetime | NO |  |  |
| 4 | `RowType` | char(1) | YES |  |  |
| 5 | `Status` | char(2) | YES |  |  |
| 6 | `Lat` | decimal(4,1) | NO |  |  |
| 7 | `Long` | decimal(4,1) | NO |  |  |
| 8 | `MaxWinds` | int | YES |  |  |
| 9 | `MinPressure` | int | YES |  |  |
| 10 | `W34NE` | int | YES |  |  |
| 11 | `W34SE` | int | YES |  |  |
| 12 | `W34SW` | int | YES |  |  |
| 13 | `W34NW` | int | YES |  |  |
| 14 | `W50NE` | int | YES |  |  |
| 15 | `W50SE` | int | YES |  |  |
| 16 | `W50SW` | int | YES |  |  |
| 17 | `W50NW` | int | YES |  |  |
| 18 | `W64NE` | int | YES |  |  |
| 19 | `W64SE` | int | YES |  |  |
| 20 | `W64SW` | int | YES |  |  |
| 21 | `W64NW` | int | YES |  |  |
| 22 | `Location` | geography(max) | YES |  |  |
| 23 | `Wind34` | geography(max) | YES |  |  |
| 24 | `Wind50` | geography(max) | YES |  |  |
| 25 | `Wind64` | geography(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
