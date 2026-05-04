# Table: `dbo.CXmlSession`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 66748

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Punchout cXML session state (~67K rows). Captures the `PunchOutSetupRequest` envelope (from / to / sender domain & identity, payload ID, buyer cookie, BrowserFormPost) plus the EDS context (`RequisitionId`, `CategoryId`, `BudgetAccountId`, `Mode`) so the buyer can resume their requisition after returning from the supplier site.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  | YES |
| 2 | `payloadId` | varchar(255) | YES |  |  |
| 3 | `buyerCookie` | varchar(255) | YES |  |  |
| 4 | `BrowserFormPost` | varchar(255) | YES |  |  |
| 5 | `fromDomain` | varchar(255) | YES |  |  |
| 6 | `fromIdentity` | varchar(255) | YES |  |  |
| 7 | `toDomain` | varchar(255) | YES |  |  |
| 8 | `toIdentity` | varchar(255) | YES |  |  |
| 9 | `senderDomain` | varchar(255) | YES |  |  |
| 10 | `senderIdentity` | varchar(255) | YES |  |  |
| 11 | `fromUserAgent` | varchar(255) | YES |  |  |
| 12 | `OrigReqId` | int | YES |  |  |
| 13 | `RequisitionId` | int | YES |  |  |
| 14 | `CategoryId` | int | YES |  |  |
| 15 | `Mode` | int | YES |  |  |
| 16 | `BudgetAccountId` | int | YES |  |  |
| 17 | `UserAccountId` | int | YES |  |  |
| 18 | `AccountCode` | varchar(50) | YES |  |  |
| 19 | `BudgetId` | int | YES |  |  |
| 20 | `UniqueId` | uniqueidentifier | YES | `(newid())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
