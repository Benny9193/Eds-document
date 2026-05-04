# View: `dbo.InstructionBookView09`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `DistrictCode` | varchar(4) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 5 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 6 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 7 | `DistrictCity` | varchar(25) | YES |  |  |
| 8 | `DistrictState` | varchar(2) | YES |  |  |
| 9 | `DistrictZipcode` | varchar(10) | YES |  |  |
| 10 | `SchoolId` | int | NO |  |  |
| 11 | `SchoolName` | varchar(50) | YES |  |  |
| 12 | `SchoolAddress1` | varchar(30) | YES |  |  |
| 13 | `SchoolAddress2` | varchar(30) | YES |  |  |
| 14 | `SchoolAddress3` | varchar(30) | YES |  |  |
| 15 | `SchoolCity` | varchar(25) | YES |  |  |
| 16 | `SchoolState` | varchar(2) | YES |  |  |
| 17 | `SchoolZipcode` | varchar(10) | YES |  |  |
| 18 | `UserId` | int | NO |  |  |
| 19 | `UserName` | varchar(50) | YES |  |  |
| 20 | `CometId` | int | YES |  |  |
| 21 | `AccountCode` | varchar(50) | YES |  |  |
| 22 | `AccountCount` | int | YES |  |  |
| 23 | `BudgetStartDate` | datetime | YES |  |  |
| 24 | `BudgetEndDate` | datetime | YES |  |  |
| 25 | `ItemCount` | int | YES |  |  |
| 26 | `CategoryId` | int | YES |  |  |
| 27 | `OrderBookId` | int | YES |  |  |
| 28 | `CategoryDescription` | varchar(15) | YES |  |  |
| 29 | `PricePlanDescription` | int | YES |  |  |
| 30 | `UsesBooklet` | int | NO |  |  |
| 31 | `UsesOnline` | int | NO |  |  |
| 32 | `RepMsg` | varchar(237) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `States` | USER_TABLE |
| [`dbo.Accounts`](dbo.Accounts.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.DistrictTypes`](dbo.DistrictTypes.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |
| [`dbo.States`](dbo.States.md) | USER_TABLE |
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | USER_TABLE |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from InstructionBookView where DistrictName like 'Salem%'


create   view  [dbo].[InstructionBookView09]   AS
/*
select null DistrictId,
       '  ' DistrictCode, 
       '' DistrictName, 
       '' DistrictAddress1,
       '' DistrictAddress2,
       '' DistrictAddress3,
       '' DistrictCity,
       '' DistrictState,
       '' DistrictZipcode,
       null SchoolId,
       '' SchoolName, 
       '' SchoolAddress1,
       '' SchoolAddress2,
       '' SchoolAddress3,
       '' SchoolCity,
       '' SchoolState,
       '' SchoolZipcode,
       null UserId,
       '' UserName,
       0 CometId, 
       '' AccountCode, 
       0 AccountCount,
       case datepart(mm,getdate())
         when 1 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 2 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 3 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 4 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 5 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 6 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate()) - 1))
         when 7 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 8 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 9 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 10 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 11 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 12 then convert(datetime,'07/01/' + convert(varchar(10),datepart(yyyy,getdate())))
       end BudgetStartDate,
       case datepart(mm,getdate())
         when 1 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 2 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 3 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 4 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 5 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 6 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate())))
         when 7 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
         when 8 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
         when 9 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
         when 10 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
         when 11 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
         when 12 then convert(datetime,'06/30/' + convert(varchar(10),datepart(yyyy,getdate()) + 1))
       end BudgetEndDate,
       0 ItemCount,
       null CategoryId,
       null OrderBookId,
       null CategoryDescription,
       null PricePlanDescription
union all (
*/
select District.DistrictId,
       District.DistrictCode DistrictCode, 
       District.Name DistrictName, 
       District.Address1 DistrictAddress1,
       District.Address2 DistrictAddress2,
       District.Address3 DistrictAddress3,
       District.City DistrictCity,
       District.State DistrictState,
       District.Zipcode DistrictZipcode,
       School.SchoolId SchoolId,
       School.Name SchoolName, 
       School.Address1 SchoolAddress1,
       School.Address2 SchoolAddress2,
       School.Address3 SchoolAddress3,
       School.City SchoolCity,
       School.State SchoolState,
       School.Zipcode SchoolZipcode,
       Users.UserId UserId,
       Users.Attention UserName,
       Users.CometId CometId,        min(Accounts.Code) AccountCode, 
       count(Accounts.AccountId) AccountCount,       Budgets.StartDate BudgetStartDate,
       Budgets.EndDate BudgetEndDate,
       BatchCount.Counter ItemCount,
       (select top 1 Requisitions.CategoryId
          from dbo.Requisitions with (nolock)
          join dbo.Category on Category.CategoryId = Requisitions.CategoryId
          join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                          and Budgets.StartDate <= getdate()
                          and Budgets.EndDate >= getdate()
         where Requisitions.CategoryId in (12, 44, 45)
         group by Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId
         order by Requisitions.CategoryId
        ) CategoryId,
/*
       (select top 1 Documents.DocumentId
          from dbo.Documents Documents with (nolock)
         where isnull(Documents.CategoryId,0) =
             isnull((select top 1 Requisitions.CategoryId
                       from dbo.Requisitions with (nolock)
                       join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                       join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                       and Budgets.StartDate <= getdate()
                                       and Budgets.EndDate >= getdate()
                      where Requisitions.CategoryId in (12, 44)
                      group by Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId
                      order by Requisitions.CategoryId),0)
          and isnull(Documents.ApprovalLevel,0) = isnull(Users.ApprovalLevel,0)
          and isnull(Documents.PriorReqs,0) = 
              isnull((select count(*)
                        from dbo.Requisitions with (nolock)
                        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                        and Budgets.StartDate <= getdate()
                                        and Budgets.EndDate >= getdate()
                       where Requisitions.UserId = Users.UserId),0)
) */
 case isnull(Users.ApprovalLevel,0) when 0 then 
   case isnull((select top 1 Requisitions.CategoryId
                  from dbo.Requisitions with (nolock)
                  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                  and Budgets.StartDate <= getdate()
                                  and Budgets.EndDate >= getdate()
                 where Requisitions.UserId = Users.UserId
                   and Requisitions.CategoryId in (12, 44, 45)),case District.DistrictId when 520 then 45 else 0 end)
     when 0 then 
       case isnull((select top 1 1
                      from dbo.Requisitions with (nolock)
                      join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                      and Budgets.StartDate <= getdate()
                                      and Budgets.EndDate >= getdate()
                     where Requisitions.UserId = Users.UserId),0)
        when 0 then 1
        else 2
      end
    when 12 then 3
    when 44 then 4
    when 45 then 5
  end
  else
    6
 end
 OrderBookId,
/*
       (select top 1 Documents.FileName
          from dbo.Documents Documents with (nolock)
         where isnull(Documents.CategoryId,0) =
             isnull((select top 1 Requisitions.CategoryId
                       from dbo.Requisitions with (nolock)
                       join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                       join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                       and Budgets.StartDate <= getdate()
                                       and Budgets.EndDate >= getdate()
                      where Requisitions.CategoryId in (12, 44)
                      group by Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId
                      order by Requisitions.CategoryId),0)
          and isnull(Documents.ApprovalLevel,0) = isnull(Users.ApprovalLevel,0)
          and isnull(Documents.PriorReqs,0) = 
              isnull((select count(*)
                        from dbo.Requisitions with (nolock)
                        join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                        and Budgets.StartDate <= getdate()
                                        and Budgets.EndDate >= getdate()
                       where Requisitions.UserId = Users.UserId),0)
)*/
 case isnull(Users.ApprovalLevel,0) when 0 then 
   case isnull((select top 1 Requisitions.CategoryId
                  from dbo.Requisitions with (nolock)
                  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                  and Budgets.StartDate <= getdate()
                                  and Budgets.EndDate >= getdate()
                 where Requisitions.UserId = Users.UserId
                   and Requisitions.CategoryId in (12, 44, 45)),case District.DistrictId when 520 then 45 when 538 then 45 else 0 end)
     when 0 then 
       case isnull(VerifySBSOnline,0)
         when 1 then
           '.\EDSU' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF' --'.\EDSPR.RTF'
         else
           case isnull(DistrictTypes.UsePriorYearReqs,0)
             when 0 then
               '.\EDSU' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'  --'.\EDSNR.RTF'
             else
               case isnull((select top 1 1
                              from dbo.Requisitions with (nolock)
                              join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                              join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                              and Budgets.StartDate <= dateadd(year,1,getdate())
                                              and Budgets.EndDate >= dateadd(year,1,getdate())
                             where Requisitions.UserId = Users.UserId),0)
                 when 0 then 
                   '.\EDSU' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'  --'.\EDSNR.RTF'
                 else 
		   '.\EDSU' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF' --'.\EDSPR.RTF'
               end
           end
      end
    when 12 then '.\EDSC' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'
    when 44 then '.\EDSA' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'
    when 45 then '.\EDSV' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'
  end
  else
    '.\EDSADM' + States.Code + CAST(isnull(District.ScheduleId,0) as CHAR(1)) + '.RTF'
 end
 CategoryDescription,
       null PricePlanDescription,
  case DistrictTypes.UsesBooklet when 0 then 1 else 0 end UsesBooklet,
  case DistrictTypes.UsesOnline when 0 then 0 else 1 end UsesOnline,
 case rtrim(isnull(CSRep.Name,'')) when '' then '' else 'Your customer service representative is ' + rtrim(isnull(CSRep.Name,'not yet assigned')) + '.' + char(13) + char(10) end +
 'Phone: ' + rtrim(isnull(CSRep.Phone,'(973) 340-8800')) + 
 case rtrim(isnull(CSRep.Email,'')) when '' then '' else char(13) + char(10) + 'EMail: ' + rtrim(CSRep.EMail) end as RepMsg
  from dbo.District  with (nolock)
  join dbo.DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
  join dbo.School on School.DistrictId = District.DistrictId
                 and School.Active = 1
  join dbo.Users on Users.SchoolId = School.SchoolId
                and Users.Active = 1
  join dbo.Budgets on Budgets.DistrictId = District.DistrictId
                  and Budgets.Active = 1
                  AND Budgets.StartDate <= dateadd(year,1,getdate())
                  and Budgets.EndDate >= dateadd(year,1,getdate())
  join dbo.States on States.StateId = case isnull(District.StateId,0) when 0 then (select Top 1 s.StateId from States s where s.Code = isnull(District.State,'NJ') and States.Active = 1) else District.StateId end
  left outer join dbo.UserAccounts on UserAccounts.UserId = Users.UserId
                                  and UserAccounts.BudgetId = Budgets.BudgetId
                                  and UserAccounts.Active = 1
  left outer join dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
                              and Accounts.Active = 1
  left outer join (
    select Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId, count(*) Counter
      from dbo.Requisitions with (nolock)
      join dbo.Category on Category.CategoryId = Requisitions.CategoryId
      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                      and Budgets.StartDate <= dateadd(year,1,getdate())
                      and Budgets.EndDate >= dateadd(year,1,getdate())
      join dbo.District on District.DistrictId = Budgets.DistrictId
      join dbo.DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
     where DistrictTypes.UsesOnline = 1
     group by Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId
                  ) BatchCount on BatchCount.DistrictId = District.DistrictId
--                              and BatchCount.CategoryId = Category.CategoryId
                              and BatchCount.UserId = Users.UserId
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
 where District.Active = 1
 group by District.DistrictId,
       District.DistrictCode, 
       District.Name, 
       District.Address1,
       District.Address2,
       District.Address3,
       District.City,
       District.State,
       District.Zipcode,       DistrictTypes.UsePriorYearReqs,
       DistrictTypes.VerifySBSOnline,
       School.SchoolId,
       School.Name, 
       School.Address1,
       School.Address2,
       School.Address3,
       School.City,
       School.State,
       School.Zipcode,
       Users.UserId,
       Users.Attention,
       Users.CometId,
       Users.ApprovalLevel,
       Budgets.StartDate,
       Budgets.EndDate,
       BatchCount.Counter,
       DistrictTypes.UsesBooklet,
       DistrictTypes.UsesOnline,
       CSRep.Name,
       CSRep.Phone,
       CSRep.EMail,
       States.Code,
       isnull(District.ScheduleId,0)
/*)*/
```
