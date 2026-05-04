# Table: `dbo.ContainerMemberSnapshots`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerMemberSnapshotID` | bigint | NO |  | YES |
| 2 | `ContainerID` | int | NO |  | YES |
| 3 | `Name` | nvarchar(400) | NO |  |  |
| 4 | `FullName` | nvarchar(400) | NO |  |  |
| 5 | `EntityDisplayName` | nvarchar(200) | NO |  |  |
| 6 | `EntityDisplayNamePlural` | nvarchar(200) | NO |  |  |
| 7 | `MemberUri` | nvarchar(400) | NO |  |  |
| 8 | `Status` | int | NO |  |  |
| 9 | `EntityType` | nvarchar(200) | NO |  | YES |
| 10 | `EntityID` | bigint | YES |  |  |
| 11 | `MemberAncestorDisplayNames` | nvarchar(max) | YES | `(NULL)` |  |
| 12 | `MemberAncestorDetailsUrls` | nvarchar(max) | YES | `(NULL)` |  |
| 13 | `Description` | nvarchar(max) | YES | `(NULL)` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ContainerMemberSnapshots_Containers` | `ContainerID` | [`dbo.Containers.ContainerID`](dbo.Containers.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ContainerMemberSnapshots_EntityType` | no | NONCLUSTERED | `EntityType`, `EntityID` |  |
| `IX_ContainerMemberSnapshots_MemberUri` | no | NONCLUSTERED | `MemberUri` |  |
