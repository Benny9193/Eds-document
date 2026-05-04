# Table: `dbo.CSMessages`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12205

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-user customer-service / banner messages (~12K rows). Free-text `CSMessage` shown to a specific `UserID` on login. Lightweight in-app notification channel, distinct from the email-driven `EmailBlast`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CSMessageID` | int | NO |  | YES |
| 2 | `UserID` | int | NO |  |  |
| 3 | `CSMessage` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
