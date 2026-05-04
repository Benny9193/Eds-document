# Table: `dbo.BidMappedItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1035546

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Audit of item remapping decisions made during bid setup. Records the original `OrigItemId`, the chosen `NewItemId`, a `ReasonCode`, and the date — so award lineage stays explicit when a bid line is re-pointed at a different master item.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMappedItemId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `OrigItemId` | int | NO |  |  |
| 4 | `NewItemId` | int | NO |  |  |
| 5 | `ReasonCode` | varchar(20) | YES |  |  |
| 6 | `MapDate` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeader_OrigNew` | no | NONCLUSTERED | `BidHeaderId` | `OrigItemId`, `NewItemId` |
| `SKI_BidHeaderReason_BidMappedItem` | no | NONCLUSTERED | `BidHeaderId`, `ReasonCode` | `BidMappedItemId` |
