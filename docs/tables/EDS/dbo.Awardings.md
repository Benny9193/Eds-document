# Table: `dbo.Awardings`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11450

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-award run header (~11K rows). One row per (`BidHeaderId`, `StartTimestamp`) recording when an award computation ran, when it ended, how many notifications were created, and when they were sent. Operational header — the actual award rows land in `Awards`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AwardingId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `StartTimestamp` | datetime | NO | `(getdate())` |  |
| 4 | `EndTimestamp` | datetime | YES |  |  |
| 5 | `NotificationsCreated` | bigint | YES |  |  |
| 6 | `NotificationsSent` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
