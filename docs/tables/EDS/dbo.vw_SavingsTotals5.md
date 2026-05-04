# View: `dbo.vw_SavingsTotals5`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 6 | `GTSavings` | numeric(38,6) | NO |  |  |
| 7 | `CatalogExtended` | numeric(38,6) | NO |  |  |
| 8 | `BidExtended` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `vw_SavingsDetail1` | VIEW |
| `vw_SavingsDetail2` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_SavingsTotals5NJ`](dbo.vw_SavingsTotals5NJ.md) | VIEW |

## Definition

```sql
--select * from vw_SavingsTotals5 st where st.DistrictId = 659 order by BudgetId


create   view  [dbo].[vw_SavingsTotals5] as
select B.BudgetId, B.Name, B.DistrictId, District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
       (select COUNT(*)
          from (select top 5 sd.BudgetId 
                  from vw_SavingsDetail1 sd
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) between CAST(cast(substring(b.Name,1,4) as int) - 4 as CHAR(4)) and CAST(cast(substring(b.Name,1,4) as int) as CHAR(4)) 
                 where sd.DistrictId = b.DistrictId 
                   and sd.Discount < .95
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wc) PastYearsCount,
       isnull((select SUM(Savings)
          from (select top 5 round(SUM(CatalogExtended - BidExtended),0) Savings
                  from vw_SavingsDetail1 sd 
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) between CAST(cast(substring(b.Name,1,4) as int) - 4 as CHAR(4)) and CAST(cast(substring(b.Name,1,4) as int) as CHAR(4))
                 where sd.DistrictId = b.DistrictId 
                   and sd.Discount < .95
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wa),0) GTSavings,
        isnull((select SUM(CatalogExtended)
          from (select top 5 round(SUM(CatalogExtended),0) CatalogExtended
                  from vw_SavingsDetail1 sd 
                  join Budgets bs on bs.BudgetId = sd.BudgetId
                                 and substring(bs.Name,1,4) between CAST(cast(substring(b.Name,1,4) as int) - 4 as CHAR(4)) and CAST(cast(substring(b.Name,1,4) as int) as CHAR(4))  
                 where sd.DistrictId = b.DistrictId 
                   and sd.Discount < .95
                 group by sd.BudgetId 
                 order by sd.BudgetId desc) wa),0) CatalogExtended,
			isnull((select SUM(BidExtended)
			  from (select top 5 round(SUM(BidExtended),0) BidExtended
					  from vw_SavingsDetail1 sd 
					  join Budgets bs on bs.BudgetId = sd.BudgetId
									 and substring(bs.Name,1,4) between CAST(cast(substring(b.Name,1,4) as int) - 4 as CHAR(4)) and CAST(cast(substring(b.Name,1,4) as int) as CHAR(4))  
					 where sd.DistrictId = b.DistrictId 
                       and sd.Discount < .95
					 group by sd.BudgetId 
					 order by sd.BudgetId desc) wa),0) BidExtended
  from Budgets B with (nolock)
  join District on District.DistrictId = B.DistrictId
  left outer join vw_SavingsDetail2 s1 on s1.BudgetId = B.BudgetId
 where b.Active = 1
 group by B.BudgetId, B.Name, B.DistrictId, s1.DistrictName, s1.StateContractDiscount, District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'')
```
