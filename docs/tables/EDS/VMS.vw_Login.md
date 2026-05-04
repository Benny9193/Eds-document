# View: `VMS.vw_Login`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `VMS`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Vendor-portal login lookup view. Used by the vendor-management UI to authenticate and resolve a vendor's accessible bids.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorContactId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `FullName` | varchar(150) | YES |  |  |
| 4 | `LastName` | varchar(50) | YES |  |  |
| 5 | `FirstName` | varchar(50) | YES |  |  |
| 6 | `EMail` | varchar(255) | YES |  |  |
| 7 | `Password` | varchar(50) | YES |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
