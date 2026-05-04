# View: `dbo.vw_SavingsTotals5NonFiltered`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `Name` | varchar(30) | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `DistrictName` | varchar(189) | YES |  |  |
| 5 | `PastYearsCount` | int | YES |  |  |
| 6 | `GTSavings` | numeric(38,6) | YES |  |  |
| 7 | `CatalogExtended` | numeric(38,6) | YES |  |  |
| 8 | `BidExtended` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `vw_SavingsDetail1NonFiltered` | VIEW |
| `vw_SavingsDetail2NonFiltered` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SavingsTotals5NonFiltered] as
select B.BudgetId, B.Name, B.DistrictId, District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
       (select COUNT(*)
          from (select top 5 sd.BudgetId 
                  from vw_SavingsDetail1NonFiltered sd
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) > CAST(cast(substring(b.Name,1,4) as int) - 5 as CHAR(4))  
                 where sd.DistrictId = b.DistrictId 
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wc) PastYearsCount,
       (select SUM(Savings)
          from (select top 5 SUM(CatalogExtended - BidExtended) Savings
                  from vw_SavingsDetail1NonFiltered sd 
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) > CAST(cast(substring(b.Name,1,4) as int) - 5 as CHAR(4))  
                 where sd.DistrictId = b.DistrictId 
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wa) GTSavings,
        (select SUM(CatalogExtended)
          from (select top 5 SUM(CatalogExtended) CatalogExtended
                  from vw_SavingsDetail1NonFiltered sd 
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) > CAST(cast(substring(b.Name,1,4) as int) - 5 as CHAR(4))  
                 where sd.DistrictId = b.DistrictId 
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wa)CatalogExtended,
			(select SUM(BidExtended)
			  from (select top 5 SUM(BidExtended) BidExtended
					  from vw_SavingsDetail1NonFiltered sd 
					  join Budgets bs on bs.BudgetId = sd.BudgetId
									 and substring(bs.Name,1,4) > CAST(cast(substring(b.Name,1,4) as int) - 5 as CHAR(4))  
					 where sd.DistrictId = b.DistrictId 
					 group by sd.BudgetId 
					 order by sd.BudgetId desc) wa) BidExtended
  from Budgets B with (nolock)
  join District on District.DistrictId = B.DistrictId
  left outer join vw_SavingsDetail2NonFiltered s1 on s1.BudgetId = B.BudgetId
 where b.Active = 1
 group by B.BudgetId, B.Name, B.DistrictId, s1.DistrictName, s1.StateContractDiscount, District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'')
```
