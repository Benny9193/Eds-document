# View: `dbo.vw_ShortDescription`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `ShortDescription` | varchar(4096) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[vw_ShortDescription]-- with schemabinding
AS  
SELECT 
	   i.ItemId, i.VendorId,
	   COALESCE (c.ShortDescription, i.ShortDescription, i.Description, c.FullDescription, i.FullDescription) AS ShortDescription

FROM   dbo.Items AS i 
LEFT OUTER JOIN dbo.CrossRefs AS c ON c.ItemId = i.ItemId
WHERE (i.Active = 1)
  and COALESCE (c.ShortDescription, i.ShortDescription, i.Description, c.FullDescription, i.FullDescription) is not null
  and trim(COALESCE (c.ShortDescription, i.ShortDescription, i.Description, c.FullDescription, i.FullDescription)) <> ''
```
