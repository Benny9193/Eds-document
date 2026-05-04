# Table: `dbo.StackParticipation`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 30

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  |  |
| 2 | `SystemUuid` | uniqueidentifier | YES |  |  |
| 3 | `UiOrder` | int | YES |  |  |
| 4 | `UserOverride` | bit | YES |  |  |
| 5 | `RequiresInstall` | bit | NO |  |  |
| 6 | `Stack` | nvarchar(20) | NO |  |  |
| 7 | `Category` | nvarchar(60) | NO |  |  |
| 8 | `CategoryDisplayToken` | nvarchar(200) | YES |  |  |
| 9 | `EntityType` | nvarchar(200) | YES |  |  |
| 10 | `MembershipJoins` | nvarchar(max) | YES |  |  |
| 11 | `MembershipInclude` | nvarchar(max) | YES |  |  |
| 12 | `MembershipExclude` | nvarchar(max) | YES |  |  |
| 13 | `Comment` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
