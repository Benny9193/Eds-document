# Table: `dbo.Reqs9993`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2131

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `BudgetId` | int | YES |  |  |
| 7 | `BudgetAccountId` | int | YES |  |  |
| 8 | `UserAccountId` | int | YES |  |  |
| 9 | `CategoryId` | int | YES |  |  |
| 10 | `ShippingId` | int | YES |  |  |
| 11 | `Attention` | varchar(50) | YES |  |  |
| 12 | `AccountCode` | varchar(50) | YES |  |  |
| 13 | `DateEntered` | datetime | YES |  |  |
| 14 | `ShippingPercent` | decimal(9,5) | YES |  |  |
| 15 | `DiscountPercent` | decimal(9,5) | YES |  |  |
| 16 | `ShippingCost` | money | YES |  |  |
| 17 | `TotalItemsCost` | money | YES |  |  |
| 18 | `TotalRequisitionCost` | money | YES |  |  |
| 19 | `Comments` | varchar(1023) | YES |  |  |
| 20 | `ApprovalRequired` | tinyint | YES |  |  |
| 21 | `ApprovalId` | int | YES |  |  |
| 22 | `ApprovalLevel` | tinyint | YES |  |  |
| 23 | `StatusId` | int | YES |  |  |
| 24 | `OrderDate` | datetime | YES |  |  |
| 25 | `DateExported` | datetime | YES |  |  |
| 26 | `BidId` | int | YES |  |  |
| 27 | `BookId` | int | YES |  |  |
| 28 | `SourceId` | int | YES |  |  |
| 29 | `BidHeaderId` | int | YES |  |  |
| 30 | `LastAlteredSessionId` | int | YES |  |  |
| 31 | `DateUpdated` | datetime | YES |  |  |
| 32 | `OrderType` | tinyint | YES |  |  |
| 33 | `NotesCount` | int | YES |  |  |
| 34 | `AddendaTotal` | money | YES |  |  |
| 35 | `ApprovalCount` | int | YES |  |  |
| 36 | `AdditionalFreight` | tinyint | YES |  |  |
| 37 | `HistoryCount` | int | YES |  |  |
| 38 | `POCount` | int | YES |  |  |
| 39 | `LowPOCount` | int | YES |  |  |
| 40 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
