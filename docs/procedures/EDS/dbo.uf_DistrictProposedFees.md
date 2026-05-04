# Function: table-valued: `dbo.uf_DistrictProposedFees`

_Generated on 2026-05-04T13:07:57.610Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictProposedFees` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2016-01-12 23:16:10 |
| Modified | 2023-01-12 12:07:36 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `ChargeTypes` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCharges` | USER_TABLE |  |
| `DistrictProposedCharges` | USER_TABLE |  |
| `dbo.uf_DistrictBANameAndAddress` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_DistrictProposedFees] (@pBudgetId int)
returns @PS table (
SysId		int identity(1,1) not null,
DistrictId	int,
BudgetId	int,
DistrictName	varchar(50),
DistrictNameAndAddress varchar(1024),
ExplainationMsg	varchar(2048),
ProgramName	varchar(50),
BudgetYear	varchar(50),
OrderYear	varchar(50),
CDateHeader	varchar(50),
TotalCharges	money,
TotalLMCharges	money,
TotalRTKCharges money,
CDate		datetime,
LMAmount	money,
RTKAmount	money,
RTK		int,
Street1			varchar(50),
City			varchar(50),
State			varchar(10),
Zipcode			varchar(10)
)
 
as
begin
declare @ChargeId int,
	@Amount money,
	@Freq int,
	@FreqData varchar(50),
	@FreqPtr int,
	@FreqMonth int,
	@StartDate datetime,
	@Workdate datetime,
	@WorkAmount money,
	@DistrictId int,
	@DistrictNameAndAddress varchar(1024),
	@DistrictName varchar(50),
	@TotalLMCharges money,
	@TotalRTKCharges money,
	@TotalCharges money,
	@PrevTotalCharges money,
	@TotalPercentage float,
	@MinSysId int,
	@CDate datetime,
	@ProgramName varchar(50),
	@BudgetYear varchar(50),
	@OrderYear varchar(50),
	@RecCounter int,
	@LMChargeCode varchar(50),
	@RTKChargeCode varchar(50),
	@AccountingDistrictCode varchar(50),
	@ChargeCode varchar(50),
	@Street1 varchar(50),
	@City varchar(50),
	@State varchar(10),
	@Zipcode varchar(10),
	@BudgetId int,
	@BudgetStartDate datetime,
	@LM int,
	@RTK int

select top 1 @StartDate = convert(datetime,'07/01/' + convert(char(4),year(Budgets.StartDate))),
       @BudgetYear = convert(char(4),year(Budgets.StartDate)) + '-' + convert(char(4),year(Budgets.EndDate)),
       @OrderYear = convert(char(4),year(Budgets.StartDate)) + '-' + convert(char(4),year(Budgets.EndDate))
  from Budgets
 where Budgets.BudgetId = @pBudgetId

declare DistCur cursor read_only for
select District.DistrictId, Budgets.BudgetId
  from District
  join Budgets on Budgets.DistrictId = District.DistrictId
              and Budgets.Active = 1 
              and Budgets.BudgetId = @pBudgetId
 where District.Active = 1
   and isnull(District.DistrictCode,'') != ''
   and isnull(District.State,'') != ''
   and isnull((select sum(Amount) 
                 from DistrictProposedCharges 
                where DistrictProposedCharges.BudgetId = Budgets.BudgetId),0) != 0
 order by District.Name, Budgets.BudgetId

open DistCur

fetch next from DistCur into @DistrictId, @BudgetId

while @@fetch_Status = 0
begin
  select @DistrictNameAndAddress = 
       dbo.uf_DistrictBANameAndAddress(District.DistrictId),
       @DistrictName = rtrim(ltrim(isnull(District.Name,''))),
       @TotalCharges = (select sum(isnull(Amount,0)) from DistrictProposedCharges with (nolock) join Budgets on Budgets.BudgetId = DistrictProposedCharges.BudgetId and @StartDate = Budgets.StartDate join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictProposedCharges.ChargeTypeId and (ChargeTypes.LM = 1 or ChargeTypes.RTK = 1) where DistrictProposedCharges.DistrictId = District.DistrictId),
       @PrevTotalCharges = (select sum(isnull(Amount,0)) from DistrictCharges with (nolock) join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId and dateadd(year,-1,@StartDate) = Budgets.StartDate join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId and (ChargeTypes.LM = 1 or ChargeTypes.RTK = 1) where DistrictCharges.DistrictId = District.DistrictId and DistrictCharges.ChargetypeId in (1,2,3)),
       @ProgramName = case isnull(District.State,'') 
                        when 'NJ' then 'New Jersey'
                        when 'NY' then 'New York'
                        else 'Educational Data Services'
                      end,
       @Street1 = isnull(District.Address1,''),
       @City = isnull(District.City,''),
       @State = isnull(District.State,''),
       @Zipcode = isnull(District.Zipcode,'')
   from District
  where District.DistrictId = @DistrictId

  --Calculate Increase Percentage
  select @TotalPercentage = case isnull(@PrevTotalCharges,0) when 0 then 0 else ((@TotalCharges - @PrevTotalCharges) * 100) / @TotalCharges end
  
  declare CCur cursor read_only for
    select DistrictProposedCharges.ChargeTypeId, DistrictProposedCharges.Amount, Budgets.StartDate,
	   coalesce(ChargeTypes.LM,0) LM,
	   coalesce(ChargeTypes.RTK,0) RTK
      from DistrictProposedCharges
      join Budgets on Budgets.BudgetId = DistrictProposedCharges.BudgetId
      join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictProposedCharges.ChargeTypeId
      join District on District.DistrictId = Budgets.DistrictId
     where DistrictProposedCharges.BudgetId = @BudgetId

  open CCur

  fetch next from CCur into @ChargeId, @Amount, @BudgetStartDate, @LM, @RTK

  while @@fetch_status = 0
  begin
--    select @FreqPtr = 0, @WorkAmount = round(isnull(@Amount,0) / isnull(@Freq,1),2)
--    while @FreqPtr < isnull(@Freq,1)
    begin
--      select @FreqPtr = @FreqPtr + 1
--      select @FreqMonth = convert(int,dbo.uf_ExtractListEntry(@FreqData,@FreqPtr)) - 1
      select @Workdate = dateadd(month,@FreqMonth,cast('07/01/' + cast(year(@BudgetStartDate)-1 as char(4)) as datetime))
      select @RecCounter = count(*)
        from @PS ps
       where BudgetId = @BudgetId
--         and CDate = @WorkDate

      if isnull(@RecCounter,0) = 0
      begin
        insert @PS(DistrictId, BudgetId, ProgramName, BudgetYear, OrderYear, DistrictName, DistrictNameAndAddress, TotalCharges, TotalLMCharges, TotalRTKCharges, CDate, LMAmount, RTKAmount, RTK, Street1, City, State, Zipcode)
          values (@DistrictId, @BudgetId, @ProgramName, 
                  (Select cast(Year(StartDate)-1 as char(4)) + '-' + cast(Year(StartDate) as char(4)) from Budgets with (nolock) where Budgets.BudgetId = @BudgetId), 
                  (Select cast(Year(StartDate) as char(4)) + '-' + cast(Year(StartDate)+1 as char(4)) from Budgets with (nolock) where Budgets.BudgetId = @BudgetId), 
                  @DistrictName, @DistrictNameAndAddress, 
                  @TotalCharges, @TotalLMCharges, @TotalRTKCharges, @Workdate, 
                  case @LM
                    when 1 then @WorkAmount 
                    else 0 
                  end, 
                  case 
                    when @RTK = 1 and @LM = 0 then @WorkAmount 
                    else 0 
                  end, 
                  @RTK,
                  @Street1,
                  @City,
                  @State,
                  @Zipcode)
      end
      else
      begin
        Update ps
           set LMAmount = isnull(LMAmount,0) + case @LM
                                                 when 1 then @WorkAmount
                                                 else 0
                                               end,
               RTKAmount = isnull(RTKAmount,0) + case 
                                                   when @RTK = 1 and @LM = 0 then @WorkAmount
                                                   else 0
                                                 end,
               RTK = @RTK
          from @PS ps
         where BudgetId = @BudgetId
           and CDate = @WorkDate
      end

    end
    fetch next from CCur into @ChargeId, @Amount, @BudgetStartDate, @LM, @RTK
  end

  close CCur
  deallocate CCur

  fetch next from DistCur into @DistrictId, @BudgetId
end

close DistCur
deallocate DistCur

Update ps
   set ExplainationMsg = '{\rtf1\ansi\deff0{{\fonttbl{\f0 Times New Roman;}}\fs24 Dear ' + + ':\par\parAs you know we greatly value your membership in the cooperative.  We are proud to offer our co-op members quality service, and the most effective purchasing platform available in the state.\par\par' + 
						 'In order to continually provide quality services, maintain and enhance your online requisition platform, and provide quality customer service, it is necessary to pass along a nominal fee increase for the coming year.  We have held fees for a number of years, but escalating operational costs makes this a hardship moving forward.\par\par' +
						 'For 2016/17 we are proposing an increase of $' + convert(varchar(20),(@TotalCharges - isnull(@PrevTotalCharges,0)),1) + ' an increase of ' + cast(cast(cast(@TotalPercentage as decimal(9,2)) as float) as varchar(20)) + '%.  The new fee would take affect July 1, 2016.  By contacting you now we are hoping to provide enough time to plan and budget for the increase.  Please see the attached acknowledgment, (along with a report detailing your savings), which can be faxed or emailed back to (973) 340-0078 or alivelli@ed-data.com.  Should this cause and extreme hardship to your district budget please feel free to contact me to discuss.\par\par' +
						 'Thank you for being a part of the largest and most cost effective cooperative in the state.\pard'
  from @PS ps

return
end
```
