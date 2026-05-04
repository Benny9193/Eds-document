# Table: `dbo.Users`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FirstName` | varchar(50) | YES |  |  |
| 3 | `LastName` | varchar(50) | YES |  |  |
| 4 | `Email` | varchar(255) | YES |  |  |
| 5 | `Theme` | varchar(50) | YES |  |  |
| 6 | `Password` | varchar(50) | YES |  |  |
| 7 | `EncryptionKey` | varbinary(max) | YES |  |  |
| 8 | `SecurityLevel` | int | YES |  |  |
| 9 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.GroupMembers`](dbo.GroupMembers.md) | `UserId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
