# Function: table-valued: `dbo.uf_DistrictPaymentHistoryBudget`

_Generated on 2026-05-04T14:49:07.365Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictPaymentHistoryBudget` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-06-05 10:35:02 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Control` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCharges` | USER_TABLE |  |
| `ps` | unresolved |  |
| `dbo.uf_DistrictNameAndAddress` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_ExtractListEntry` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function dbo.uf_DistrictPaymentHistoryBudget (@pBudgetId int)
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
RTK		int
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
	@BudgetId int,
	@DistrictNameAndAddress varchar(1024),
	@DistrictName varchar(50),
	@TotalLMCharges money,
	@TotalRTKCharges money,
	@MinSysId int,
	@CDate datetime,
	@ProgramName varchar(50),
	@BudgetYear varchar(50),
	@OrderYear varchar(50),
	@RecCounter int

select top 1 @StartDate = convert(datetime,'07/01/' + convert(char(4),BillingYear)),
       @BudgetYear = convert(char(4),BillingYear) + '-' + convert(char(4),BillingYear + 1),
       @OrderYear = convert(char(4),BillingYear + 1) + '-' + convert(char(4),BillingYear + 2)
  from Control

declare DistCur cursor read_only for
select District.DistrictId, Budgets.BudgetId
  from District
  join Budgets on Budgets.DistrictId = District.DistrictId
              and Budgets.BudgetId = @pBudgetId
 where isnull((select sum(Amount) 
                 from DistrictCharges 
                where DistrictCharges.BudgetId = Budgets.BudgetId),0) != 0
 order by District.Name, Budgets.BudgetId

open DistCur

fetch next from DistCur into @DistrictId, @BudgetId

while @@fetch_Status = 0
begin
  select @DistrictNameAndAddress = 
       case rtrim(ltrim(isnull(District.BAName,''))) 
         when '' then '' 
         else rtrim(ltrim(District.BANAme)) + char(13) + char(10) 
       end + 
       dbo.uf_DistrictNameAndAddress(District.DistrictId),
       @DistrictName = rtrim(ltrim(isnull(District.Name,''))),
       @TotalLMCharges = (select sum(Amount) from DistrictCharges with (nolock) join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId and Budgets.StartDate <= dateadd(year,1,@StartDate) and Budgets.EndDate >= dateadd(year,1,@StartDate) where DistrictCharges.DistrictId = District.DistrictId and DistrictCharges.ChargetypeId in (1,2)),
       @TotalRTKCharges = (select sum(Amount) from DistrictCharges with (nolock) join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId and Budgets.StartDate <= dateadd(year,1,@StartDate) and Budgets.EndDate >= dateadd(year,1,@StartDate) where DistrictCharges.DistrictId = District.DistrictId and DistrictCharges.ChargeTypeId = 3),
       @ProgramName = case isnull(District.State,'') 
                        when 'NJ' then 'New Jersey'
                        when 'NY' then 'New York'
                        else 'Educational Data Services'
                      end
   from District
  where District.DistrictId = @DistrictId

  declare CCur cursor read_only for
    select ChargeTypeId, Amount, Frequency, FrequencyData, Budgets.StartDate
      from DistrictCharges
      join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId
                  and Budgets.BudgetId = @BudgetId
     where DistrictCharges.DistrictId = @DistrictId
       and DistrictCharges.Frequency > 0

  open CCur

  fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @StartDate

  while @@fetch_status = 0
  begin
    select @FreqPtr = 0, @WorkAmount = round(@Amount / @Freq,2)
    while @FreqPtr < @Freq
    begin
      select @FreqPtr = @FreqPtr + 1
      select @FreqMonth = convert(int,dbo.uf_ExtractListEntry(@FreqData,@FreqPtr)) - 1
      select @Workdate = @StartDate --dateadd(month,@FreqMonth,@StartDate)
      select @RecCounter = count(*)
        from @PS ps
       where DistrictId = @DistrictId
         and CDate = @WorkDate

      if isnull(@RecCounter,0) = 0
      begin
        insert @PS(DistrictId, BudgetId, ProgramName, BudgetYear, OrderYear, DistrictName, DistrictNameAndAddress, TotalLMCharges, TotalRTKCharges, CDate, LMAmount, RTKAmount, RTK)
          values (@DistrictId, @BudgetId, @ProgramName, @BudgetYear, @OrderYear, @DistrictName, @DistrictNameAndAddress, 
                  @TotalLMCharges, @TotalRTKCharges, @Workdate, 
                  case @ChargeId 
                    when 1 then @WorkAmount 
                    when 2 then @WorkAmount 
                    else 0 
                  end, 
                  case @ChargeId 
                    when 3 then @WorkAmount 
                    else 0 
                  end, 
                  case @ChargeId 
                    when 2 then 1 
                    when 3 then 1 
                    else 0 
                  end)
      end
      else
      begin
        Update ps
           set LMAmount = isnull(LMAmount,0) + case @ChargeId
                                                 when 1 then @WorkAmount
                                                 when 2 then @WorkAmount
                                                 else 0
                                               end,
               RTKAmount = isnull(RTKAmount,0) + case @ChargeId
                                                   when 3 then @WorkAmount
                                                   else 0
                                                 end,
               RTK = isnull(RTK,0) | case @ChargeId
                                       when 2 then 1
                                       when 3 then 1
                                       else 0
                                     end
          from @PS ps
         where DistrictId = @DistrictId
           and CDate = @WorkDate
      end
    end

    fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @StartDate
  end

  close CCur
  deallocate CCur

  fetch next from DistCur into @DistrictId, @BudgetId
end

close DistCur
deallocate DistCur

Update ps
   set DearMsg = '{\rtf1\ansi\deff0{{\fonttbl{\f0 Times New Roman;}}\fs24 Dear Board of Education:\par\par Thank you for your support in making the ' + ProgramName + ' Cooperative Bidding Program\plain  the largest and most successful shared services program of its kind.  This year participating districts received the lowest overall pricing for consumable school supplies in the state.\pard}}',
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
       LMAmountStr = '$' + convert(varchar(20),LMAmount,1),
       RTKAmountStr = case isnull(RTKAmount,0) 
                        when 0 then null
                        else '$' + convert(varchar(20),RTKAmount,1)
                      end,
       TotalLMChargesStr = '$' + convert(varchar(20),TotalLMCharges,1),
       TotalRTKChargesStr = case (select top 1 rtk from @PS ps1 where ps1.BudgetId = ps.BudgetId order by rtk desc)
                              when 0 then null
                              else case isnull(TotalRTKCharges,0)
                                     when 0 then null
                                     else '$' + convert(varchar(20),TotalRTKCharges,101)
                                   end
                             end
  from @PS ps

return
end
```
