# View: `dbo.ContainerTreeSnapshot`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerID` | int | YES |  |  |
| 2 | `MemberContainerID` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.ContainerMemberSnapshots`](dbo.ContainerMemberSnapshots.md) | USER_TABLE |
| [`dbo.Containers`](dbo.Containers.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[ContainerTreeSnapshot] AS
WITH Tree(TContainerID, TEntityID, Chain) As
(
	 SELECT c.ContainerID, c.ContainerID as MemberContainerID, (':'+CAST(c.ContainerID as varchar(max))+':') as Chain
		FROM [dbo].[Containers] AS c WITH (INDEX(1))
	 UNION ALL 
	 SELECT t.TContainerID as TContainerID, CAST(s.EntityID AS INT) as TEntityID, (t.Chain + ':'+CAST(s.EntityID as varchar(20))+':' ) as Chain
		FROM [dbo].[ContainerMemberSnapshots] AS s WITH (FORCESEEK, INDEX(1))
		JOIN Tree AS t ON t.TEntityID=s.ContainerID
		WHERE s.EntityType='Orion.Groups' AND CHARINDEX(':'+CAST(s.EntityID as varchar(20))+':', Chain) = 0
) 
SELECT DISTINCT TContainerID AS ContainerID, TEntityID AS MemberContainerID FROM [Tree]
```
