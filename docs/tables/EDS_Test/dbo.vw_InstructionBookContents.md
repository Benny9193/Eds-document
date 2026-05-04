# View: `dbo.vw_InstructionBookContents`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `UserId` | int | NO |  |  |
| 3 | `Priority` | int | YES |  |  |
| 4 | `Title` | varchar(255) | YES |  |  |
| 5 | `TitleInTOC` | tinyint | YES |  |  |
| 6 | `Body` | varchar(4096) | YES |  |  |
| 7 | `HeaderAttributes` | int | YES |  |  |
| 8 | `IBCId` | int | NO |  |  |
| 9 | `SubReportName` | varchar(1024) | YES |  |  |
| 10 | `HTMLBody` | varchar(max) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `InstructionBookContents` | USER_TABLE |
| `InstructionBookTypes` | USER_TABLE |
| `InstructionBookView` | VIEW |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_InstructionBookContents] as
select District.DistrictId, Users.UserId, InstructionBookContents.Priority, InstructionBookContents.Title, InstructionBookContents.TitleInTOC, InstructionBookContents.Body, InstructionBookContents.HeaderAttributes, InstructionBookContents.IBCId, InstructionBookContents.SubReportName, isnull(InstructionBookContents.HTMLBody,'') HTMLBody
  from InstructionBookView with (nolock)
  join Users on Users.UserId = InstructionBookView.UserId
            and Users.Active = 1
  join District on District.DistrictId = Users.DistrictId
               and District.Active = 1
  join InstructionBookTypes on InstructionBookTypes.IBTypeId = InstructionBookView.IBTypeId
  join InstructionBookContents on InstructionBookContents.IBTypeId = InstructionBookTypes.IBTypeId
                              and case isnull(InstructionBookContents.DistrictId,0) when 0 then isnull(District.DistrictId,0) else ISNULL(InstructionBookContents.DistrictId,0) end = isnull(District.DistrictId,0)
union (
select District.DistrictId, Users.UserId, InstructionBookContents.Priority, InstructionBookContents.Title, InstructionBookContents.TitleInTOC, InstructionBookContents.Body, InstructionBookContents.HeaderAttributes, InstructionBookContents.IBCId, InstructionBookContents.SubReportName, isnull(InstructionBookContents.HTMLBody,'') HTMLBody
  from InstructionBookView with (nolock)
  join Users on Users.UserId = InstructionBookView.UserId
            and Users.Active = 1
  join District on District.DistrictId = Users.DistrictId
               and District.Active = 1
  join InstructionBookTypes on InstructionBookTypes.ShowInAllBooks = 1
  join InstructionBookContents on InstructionBookContents.IBTypeId = InstructionBookTypes.IBTypeId
                              and case isnull(InstructionBookContents.DistrictId,0) when 0 then isnull(District.DistrictId,0) else ISNULL(InstructionBookContents.DistrictId,0) end = isnull(District.DistrictId,0)
) 
union (
select District.DistrictId, 0 UserId, InstructionBookContents.Priority, InstructionBookContents.Title, InstructionBookContents.TitleInTOC, InstructionBookContents.Body, InstructionBookContents.HeaderAttributes, InstructionBookContents.IBCId, InstructionBookContents.SubReportName, isnull(InstructionBookContents.HTMLBody,'') HTMLBody
  from District with (nolock)
  join InstructionBookTypes on InstructionBookTypes.IBTypeId = 1
  join InstructionBookContents on InstructionBookContents.IBTypeId = InstructionBookTypes.IBTypeId
                              and case isnull(InstructionBookContents.DistrictId,0) when 0 then isnull(District.DistrictId,0) else ISNULL(InstructionBookContents.DistrictId,0) end = isnull(District.DistrictId,0)
 where District.Active = 1
)
union (
select District.DistrictId, 0 UserId, InstructionBookContents.Priority, InstructionBookContents.Title, InstructionBookContents.TitleInTOC, InstructionBookContents.Body, InstructionBookContents.HeaderAttributes, InstructionBookContents.IBCId, InstructionBookContents.SubReportName, isnull(InstructionBookContents.HTMLBody,'') HTMLBody
  from District with (nolock)
  join InstructionBookTypes on InstructionBookTypes.ShowInAllBooks = 1
  join InstructionBookContents on InstructionBookContents.IBTypeId = InstructionBookTypes.IBTypeId
                              and case isnull(InstructionBookContents.DistrictId,0) when 0 then isnull(District.DistrictId,0) else ISNULL(InstructionBookContents.DistrictId,0) end = isnull(District.DistrictId,0)
 where District.Active = 1
)
```
