# View: `dbo.InstructionBookView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 28 | `CategoryDescription` | varchar(14) | YES |  |  |
| 29 | `PricePlanDescription` | int | YES |  |  |
| 30 | `UsesBooklet` | int | NO |  |  |
| 31 | `UsesOnline` | int | NO |  |  |
| 32 | `RepMsg` | varchar(237) | YES |  |  |
| 33 | `IBTypeId` | int | NO |  |  |
| 34 | `BookType` | varchar(50) | NO |  |  |
| 35 | `StateName` | varchar(50) | NO |  |  |
| 36 | `ScheduleGroup` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `InstructionBookTypes` | USER_TABLE |
| `ScheduleTypes` | USER_TABLE |
| `States` | USER_TABLE |
| [`dbo.Accounts`](dbo.Accounts.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.DistrictTypes`](dbo.DistrictTypes.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.School`](dbo.School.md) | USER_TABLE |
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | USER_TABLE |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_InstructionBookCalendar`](dbo.vw_InstructionBookCalendar.md) | VIEW |
| [`dbo.vw_InstructionBookContents`](dbo.vw_InstructionBookContents.md) | VIEW |

## Definition

```sql
--select * from InstructionBookView where DistrictName like 'Salem%'


CREATE      view [dbo].[InstructionBookView]   AS
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
                                  and dateadd(year,-1,getdate()) between Budgets.StartDate and Budgets.EndDate
                 where Requisitions.UserId = Users.UserId
                   and Requisitions.CategoryId in (12, 44, 45)),case District.DistrictId when 520 then 45 else 0 end)
     when 0 then 
       case isnull((select top 1 1
                      from dbo.Requisitions with (nolock)
                      join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                      and dateadd(year,-1,getdate()) between Budgets.StartDate and Budgets.EndDate
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
           '.\EDS30.RTF' --'.\EDSPR.RTF'
         else
           case isnull(DistrictTypes.UsePriorYearReqs,0)
             when 0 then
               '.\EDS30.RTF' --'.\EDSNR.RTF'
             else
               case isnull((select top 1 1
                              from dbo.Requisitions with (nolock)
                              join dbo.Category on Category.CategoryId = Requisitions.CategoryId
                              join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                                              and Budgets.StartDate <= dateadd(year,1,getdate())
                                              and Budgets.EndDate >= dateadd(year,1,getdate())
                             where Requisitions.UserId = Users.UserId),0)
                 when 0 then 
                   '.\EDS30.RTF' --'.\EDSNR.RTF'
                 else 
		   '.\EDS30.RTF' --'.\EDSPR.RTF'
               end
           end
      end
    when 12 then '.\EDSCUS.RTF'
    when 44 then '.\EDSATH.RTF'
    when 45 then '.\EDSVOT.RTF'
  end
  else
    '.\EDSADMIN.RTF'
 end
 CategoryDescription,
       null PricePlanDescription,
  case DistrictTypes.UsesBooklet when 0 then 1 else 0 end UsesBooklet,
  case DistrictTypes.UsesOnline when 0 then 0 else 1 end UsesOnline,
 case rtrim(isnull(CSRep.Name,'')) when '' then '' else 'Your customer service representative is ' + rtrim(isnull(CSRep.Name,'not yet assigned')) + '.' + char(13) + char(10) end +
 'Phone: ' + rtrim(isnull(CSRep.Phone,'(973) 340-8800')) + 
 case rtrim(isnull(CSRep.Email,'')) when '' then '' else char(13) + char(10) + 'EMail: ' + rtrim(CSRep.EMail) end as RepMsg,
 isnull(InstructionBookTypes.IBTypeId,1) IBTypeId,
 ISNULL(InstructionBookTypes.Description,'User') BookType,
 isnull(States.Name,'') StateName,
 isnull(ScheduleTypes.Name,'') ScheduleGroup
  from dbo.District  with (nolock)
  join dbo.DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
  join dbo.School on School.DistrictId = District.DistrictId
                 and School.Active = 1
  join dbo.Users on Users.SchoolId = School.SchoolId
                and Users.Active = 1
  join dbo.Budgets on Budgets.DistrictId = District.DistrictId
                  and Budgets.Active = 1
                  AND dateadd(year,1,getdate()) between Budgets.StartDate and Budgets.EndDate
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
                      and dateadd(year,1,getdate()) between Budgets.StartDate and Budgets.EndDate
      join dbo.District on District.DistrictId = Budgets.DistrictId
      join dbo.DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
     where DistrictTypes.UsesOnline = 1
     group by Budgets.DistrictId, Requisitions.UserId, Requisitions.CategoryId
                  ) BatchCount on BatchCount.DistrictId = District.DistrictId
--                              and BatchCount.CategoryId = Category.CategoryId
                              and BatchCount.UserId = Users.UserId
  left outer join CSRep on CSRep.CSRepId = District.CSRepId
  LEFT outer join States on States.StateId = District.StateId
  LEFT Outer Join ScheduleTypes on ScheduleTypes.ScheduleId = case ISNULL(District.ScheduleId,0) when 0 then case ISNULL(District.StateId,0) when 0 then 1 when 1 then 1 when 2 then 3 end else District.ScheduleId end
  LEFT outer join InstructionBookTypes on InstructionBookTypes.IBTypeId =
	 case 
	   when ISNULL(Users.IBTypeId,0) != 0 then Users.IBTypeId
	   when isnull(Users.ApprovalLevel,0) = 0 then 1
/* Removed 5/15/2018 DCH so undefined users are normal users
	   case isnull((select top 1 Requisitions.CategoryId
					  from dbo.Requisitions with (nolock)
					  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
					  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
									  and getdate() between Budgets.StartDate and Budgets.EndDate
					 where Requisitions.UserId = Users.UserId
					   and Requisitions.CategoryId in (12, 44, 45)),case District.DistrictId when 520 then 45 when 538 then 45 else 0 end)
		 when 0 then 
		   case isnull(VerifySBSOnline,0)
			 when 1 then
			   1
			 else
			   case isnull(DistrictTypes.UsePriorYearReqs,0)
				 when 0 then
				   1
				 else
				   case isnull((select top 1 1
								  from dbo.Requisitions with (nolock)
								  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
								  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
												  and dateadd(year,1,getdate()) between Budgets.StartDate and Budgets.EndDate
								 where Requisitions.UserId = Users.UserId),0)
					 when 0 then 
					   1
					 else 
						1
				   end
			   end
		  end
		when 12 then 4
		when 44 then 3
		when 45 then 5
	  end
*/
	  else
		2
	end  
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
       States.Name,
       ScheduleTypes.Name,
       InstructionBookTypes.IBTypeId,
       InstructionBookTypes.Description
/*)*/
```
