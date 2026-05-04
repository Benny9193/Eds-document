# View: `dbo.RTK_Item_StructureView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_ItemsId` | int | NO |  |  |
| 2 | `AlternateDesc` | varchar(60) | NO |  |  |
| 3 | `ItemDesc` | varchar(512) | NO |  |  |
| 4 | `MSDSDetail` | nvarchar(max) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Items` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_MSDSDetail` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[RTK_Item_StructureView]
AS
SELECT RTK.RTK_ItemsId,
       Isnull(RTK.AlternateDesc,'') AlternateDesc,
       Case When Isnull(RTK.AlternateDesc,'')<>'' Then '' Else Isnull(Items.Description,'') End ItemDesc,
       Isnull( (SELECT Isnull(RTK_CASFileId,0) RTK_CASFileId, Isnull(MixturePercent,0) MixturePercent
                FROM RTK_MSDSDetail D
                Where D.RTK_ItemsID = RTK.RTK_ItemsId
                Order by D.RTK_CASFileId  -- this ensures entries ordered properly i.e. independent of sequence# etc.
                for xml path('')
               ), '' ) As MSDSDetail
FROM RTK_Items RTK
left outer Join Items ON Items.ItemId = RTK.ItemId
```
