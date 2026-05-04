# Function: table-valued: `dbo.uf_DistrictPaymentScheduleBudget`

_Generated on 2026-05-04T13:04:00.535Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictPaymentScheduleBudget` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2014-03-20 15:54:32 |
| Modified | 2023-01-12 12:08:53 |
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
| `dbo.uf_DistrictBANameAndAddress` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_ExtractListEntry` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_DistrictPaymentScheduleBudget] (@pBudgetId int)
returns @PS table (
SysId		int identity(1,1) not null,
DistrictId	int,
BudgetId	int,
DistrictName	varchar(50),
DistrictNameAndAddress varchar(1024),
DearMsg		varchar(1024),
LMFeeMsg	varchar(1024),
RTKFeeMsg	varchar(1024),
ExplainationMsg	varchar(1024),
AcknowledgeMsg	varchar(1024),
ProgramName	varchar(50),
BudgetYear	varchar(50),
OrderYear	varchar(50),
CDateHeader	varchar(50),
LMAmountHeader	varchar(50),
RTKAmountHeader	varchar(50),
TotalLMCharges	money,
TotalLMChargesStr varchar(20),
TotalRTKCharges money,
TotalRTKChargesStr varchar(20),
CDate		datetime,
CDateStr	varchar(20),
ChargeId	int,
LMAmount	money,
LMAmountStr	varchar(20),
RTKAmount	money,
RTKAmountStr	varchar(20),
RTK		int,
AccountingDistrictCode	varchar(50),
LMChargeCode	varchar(50),
RTKChargeCode	varchar(50),
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
select District.DistrictId, AccountingDistrictCode, Budgets.BudgetId
  from District
  join Budgets on Budgets.DistrictId = District.DistrictId
              and Budgets.Active = 1 
              and Budgets.BudgetId = @pBudgetId
 where District.Active = 1
   and isnull(District.DistrictCode,'') != ''
   and isnull(District.State,'') != ''
   and isnull((select sum(Amount) 
                 from DistrictCharges 
                where DistrictCharges.BudgetId = Budgets.BudgetId),0) != 0
 order by District.Name, Budgets.BudgetId

open DistCur

fetch next from DistCur into @DistrictId, @AccountingDistrictCode, @BudgetId

while @@fetch_Status = 0
begin
  select @DistrictNameAndAddress = 
       dbo.uf_DistrictBANameAndAddress(District.DistrictId),
       @DistrictName = rtrim(ltrim(isnull(District.Name,''))),
       @TotalLMCharges = (select sum(isnull(Amount,0)) from DistrictCharges with (nolock) join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId and ChargeTypes.LM = 1 where DistrictCharges.BudgetId = @BudgetId),
       @TotalRTKCharges = (select sum(isnull(Amount,0)) from DistrictCharges with (nolock) join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId and ChargeTypes.RTK = 1 and isnull(ChargeTypes.LM,0) = 0 where DistrictCharges.BudgetId = @BudgetId),
--       @TotalLMCharges = (select sum(isnull(Amount,0)) from DistrictCharges with (nolock) where DistrictCharges.BudgetId = @BudgetId and DistrictCharges.ChargetypeId in (1,2)),
--       @TotalRTKCharges = (select sum(isnull(Amount,0)) from DistrictCharges with (nolock) where DistrictCharges.BudgetId = @BudgetId and DistrictCharges.ChargeTypeId = 3),
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

  declare CCur cursor read_only for
    select DistrictCharges.ChargeTypeId, DistrictCharges.Amount, DistrictCharges.Frequency, DistrictCharges.FrequencyData, case DistrictCharges.ChargeTypeId when 6 then case District.StateId when 2 then 'B2' else 'BY' end else case isnull(ChargeTypes.LM,0) when 1 then ChargeTypes.AccountingChargeCode else null end end, case when isnull(ChargeTypes.RTK,0) = 1 and isnull(ChargeTypes.LM,0) = 0 then ChargeTypes.AccountingChargeCode else null end, Budgets.StartDate,
	   coalesce(ChargeTypes.LM,0) LM,
	   coalesce(ChargeTypes.RTK,0) RTK
      from DistrictCharges
      join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId
--                  and Budgets.EndDate >= dateadd(year,1,@StartDate)
      join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId
      join District on District.DistrictId = Budgets.DistrictId
     where DistrictCharges.BudgetId = @BudgetId
       and DistrictCharges.Frequency > 0
       and DistrictCharges.Active = 1

  open CCur

  fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @LMChargeCode, @RTKChargeCode, @BudgetStartDate, @LM, @RTK

  while @@fetch_status = 0
  begin
    select @FreqPtr = 0, @WorkAmount = round(isnull(@Amount,0) / isnull(@Freq,1),2)
    while @FreqPtr < isnull(@Freq,1)
    begin
      select @FreqPtr = @FreqPtr + 1
      select @FreqMonth = convert(int,dbo.uf_ExtractListEntry(@FreqData,@FreqPtr)) - 1
      select @Workdate = dateadd(month,@FreqMonth,cast('07/01/' + cast(year(@BudgetStartDate)-1 as char(4)) as datetime))
      select @RecCounter = count(*)
        from @PS ps
       where BudgetId = @BudgetId
         and CDate = @WorkDate

      if isnull(@RecCounter,0) = 0
      begin
        insert @PS(DistrictId, BudgetId, ProgramName, BudgetYear, OrderYear, DistrictName, DistrictNameAndAddress, TotalLMCharges, TotalRTKCharges, CDate, LMAmount, RTKAmount, RTK, AccountingDistrictCode, LMChargeCode, RTKChargeCode, Street1, City, State, Zipcode)
          values (@DistrictId, @BudgetId, @ProgramName, (Select cast(Year(StartDate)-1 as char(4)) + '-' + cast(Year(StartDate) as char(4)) from Budgets with (nolock) where Budgets.BudgetId = @BudgetId), (Select cast(Year(StartDate) as char(4)) + '-' + cast(Year(StartDate)+1 as char(4)) from Budgets with (nolock) where Budgets.BudgetId = @BudgetId), @DistrictName, @DistrictNameAndAddress, 
                  @TotalLMCharges, @TotalRTKCharges, @Workdate, 
                  case @LM
                    when 1 then @WorkAmount 
                    else 0 
                  end, 
                  case 
                    when @RTK = 1 and @LM = 0 then @WorkAmount 
                    else 0 
                  end, 
                  @RTK,
                  @AccountingDistrictCode,
                  case @LM
                    when 1 then @LMChargeCode
                    else ''
                  end,
                  case 
                    when @RTK = 1 and @LM = 0 then @RTKChargeCode
                    else ''
                  end,
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
               RTK = @RTK,
               LMChargeCode = coalesce(case @LM
                                         when 1 then @LMChargeCode
                                         else null
                                       end,LMChargeCode),
               RTKChargeCode = coalesce(case 
                                          when @RTK = 1 and @LM = 0 then @RTKChargeCode
                                          else null
                                        end,RTKChargeCode)
          from @PS ps
         where BudgetId = @BudgetId
           and CDate = @WorkDate
      end
    end

    fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @LMChargeCode, @RTKChargeCode, @BudgetStartDate, @LM, @RTK
  end

  close CCur
  deallocate CCur

  fetch next from DistCur into @DistrictId, @AccountingDistrictCode, @BudgetId
end

close DistCur
deallocate DistCur

Update ps
   set DearMsg = '{\rtf1\ansi\deff0{{\fonttbl{\f0 Times New Roman;}}\fs24 Dear Board of Education:\par\par Thank you for your support in making the ' + ProgramName + ' Cooperative Bid Maintenance Program\plain  the largest and most successful shared services program of its kind.  This year participating districts received the lowest overall pricing for consumable school supplies in the state.\pard}}',
--   set DearMsg = '{\rtf1\ansi\deff0{\fonttbl{\f0\fnil Times New Roman;}{\f1\fnil\fcharset0 Times New Roman;}}{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\lang1033\f0\fs24 Dear Board of Education:\par\parThank you for your support in making the \ulth ' + ProgramName + ' Cooperative Bidding Program\ulnone  the largest and most successful shared services program of its kind.  This year participating districts received the lowest overall pricing for consumable school supplies in the state\f1 .\f0\pard} ',
       LMFeeMsg = 'The licensing and maintenance fee for the ' + BudgetYear + ' school year will be: ',
       AcknowledgeMsg = 'We look forward to continuing our mutually beneficial relationship with your district and look forward to another successful year.  Please acknowledge your membership below.',
       ExplainationMsg = 'The licensing fee refers to the use of our copyrighted bid specifications and interactive software.  The maintenance fee refers to the supplying of our cooperative bid prices, cross referenced awarded vendor catalogs, updated users and account codes. The above will be utilized in ordering ' + OrderYear + ' district school supplies.',
       RTKFeeMsg = case isnull(rtk,0) 
                     when 0 then ''
                     else case isnull(TotalRTKCharges,0)
                            when 0 then '(The Right to Know services are included in the fee amount.)'
                            else 'The Right to Know services for the ' + BudgetYear + ' school year will be:'
                          end
                   end,
       CDateHeader = 'Date',
       LMAmountHeader = 'L&M',
       RTKAmountHeader = case isnull(rtk,0)
                         when 0 then ''
                         else case isnull(TotalRTKCharges,0)
                                when 0 then ''
                                else 'RTK'
                              end
                       end,
       CDateStr = convert(varchar(20),CDate,101),
       LMAmountStr = '$' + convert(varchar(20),isnull(LMAmount,0),1),
       RTKAmountStr = case isnull(RTKAmount,0) 
                        when 0 then null
                        else '$' + convert(varchar(20),RTKAmount,1)
                      end,
       TotalLMChargesStr = '$' + convert(varchar(20),TotalLMCharges,1),
       TotalRTKChargesStr = case (select top 1 rtk from @PS ps1 where ps1.DistrictId = ps.DistrictId order by rtk desc)
                              when 0 then null
                              else case isnull(TotalRTKCharges,0)
                                     when 0 then null
                                     else '$' + convert(varchar(20),TotalRTKCharges,101)
                                   end
                             end,
       TotalLMCharges = isnull(TotalLMCharges,0),
       TotalRTKCharges = isnull(TotalRTKCharges,0)
  from @PS ps

return
end
```
