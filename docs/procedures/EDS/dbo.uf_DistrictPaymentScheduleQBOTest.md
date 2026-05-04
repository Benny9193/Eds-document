# Function: table-valued: `dbo.uf_DistrictPaymentScheduleQBOTest`

_Generated on 2026-05-04T13:04:24.250Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictPaymentScheduleQBOTest` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2024-11-20 11:50:22 |
| Modified | 2024-11-20 11:50:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RunCycle` | IN | int |  |
| 2 | `@Suffix` | IN | varchar(20) |  |
| 3 | `@Type` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `ChargeTypes` | USER_TABLE |  |
| `Control` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCharges` | USER_TABLE |  |
| `dbo.uf_DistrictBANameAndAddress` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_ExtractListEntry` | SQL_SCALAR_FUNCTION |  |
| `dbo.ufn_DistrictInvoiceAddress` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from ChargeTypes
--select * from Months
--select * from dbo.uf_DistrictPaymentScheduleQBO(11) where Item = 'Time and Materials Bids' order by DistrictName
create   function [dbo].[uf_DistrictPaymentScheduleQBOTest] (@RunCycle int, @Suffix varchar(20) = '', @Type tinyint = 3)
returns @PS table (
--SysId		int identity(200000,1) not null,
InvoiceNo		varchar(20),
Customer	varchar(50),
InvoiceDate	varchar(20),
DueDate	varchar(20),
Terms	varchar(20),
Location varchar(20),
Memo	varchar(500),
[Item(Product/Service)]	varchar(50),
ItemDescription varchar(250),
ItemQuantity int,
ItemRate	money,
ItemAmount money,
[Shipping address] varchar(250),
[Ship via] varchar(20),
[Shipping date] varchar(20),
[Tracking no.] varchar(50),
[Shipping Charge] money,
[Service Date] varchar(20)
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
	@Customer varchar(50),
	@TotalLMCharges money,
	@TotalRTKCharges money,
	@MinSysId int,
	@CDate datetime,
	@ProgramName varchar(50),
	@BudgetYear varchar(50),
	@OrderYear varchar(50),
	@BillingYear varchar(50),
	@PayMentMsg varchar(50),
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
	@MonthName varchar(50),
	@InvoiceNo int = 0

select top 1 @StartDate = convert(datetime,'07/01/' + convert(char(4),BillingYear)),
       @BudgetYear = convert(char(4),BillingYear) + '-' + convert(char(4),BillingYear + 1),
       @OrderYear = convert(char(4),BillingYear + 1) + '-' + convert(char(4),BillingYear + 2),
	   @BillingYear = convert(char(4),BillingYear-1) + '-' + convert(char(4),BillingYear)
  from Control

declare DistCur cursor read_only for
select District.DistrictId, AccountingDistrictCode, Budgets.BudgetId
  from District
  join Budgets on Budgets.DistrictId = District.DistrictId
              and year(Budgets.StartDate) = Year(@StartDate)
              and Budgets.Active = 1  
 where District.Active = 1
   and isnull(District.DistrictCode,'') != ''
   and isnull(District.State,'') != ''
   and isnull((select sum(Amount) 
                 from DistrictCharges 
				 join ChargeTypes ct on ct.ChargeTypeId = DistrictCharges.ChargeTypeId
                where DistrictCharges.BudgetId = Budgets.BudgetId
				  and case 
				        when @Type = 3 then 1
				        when @Type = 1 then 
						  case 
						    when ct.lm = 1 or ct.rtk = 1 then 1 
							else 0 
						  end 
						when @Type = 2 then
						  case
						    when ct.lm = 1 or ct.RTK = 1 then 0
						    else 1
						  end
						else 0 -- Unknown
					  end = 1 
				  and exists(Select * from String_Split(DistrictCharges.FrequencyData,',') where value = @RunCycle)),0) != 0
 order by District.Name, Budgets.BudgetId

open DistCur

fetch next from DistCur into @DistrictId, @AccountingDistrictCode, @BudgetId

while @@fetch_Status = 0
begin
  select @DistrictNameAndAddress = 
       dbo.uf_DistrictBANameAndAddress(District.DistrictId),
       @Customer = rtrim(ltrim(isnull(District.Name,''))),
       @TotalLMCharges = (select sum(isnull(Amount,0)) 
	                        from DistrictCharges with (nolock) 
							join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId 
							            and @StartDate = Budgets.StartDate 
							join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId 
							                and ChargeTypes.LM = 1 
											and (@Type = 1 or @Type = 3)
						   where DistrictCharges.DistrictId = District.DistrictId),
       @TotalRTKCharges = (select sum(isnull(Amount,0)) 
	                         from DistrictCharges with (nolock) 
							 join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId 
							             and @StartDate = Budgets.StartDate 
							 join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId 
							                 and ChargeTypes.RTK = 1 
											 and ChargeTypes.LM = 0 
											 and (@Type = 1 or @Type = 3)
							where DistrictCharges.DistrictId = District.DistrictId),
       @ProgramName = case isnull(District.State,'') 
                        when 'NJ' then 'New Jersey'
                        when 'NY' then 'New York'
                        else 'Educational Data Services'
                      end,
       @Street1 = isnull(District.Address1,''),
       @City = isnull(District.City,''),
       @State = isnull(District.State,''),
       @Zipcode = isnull(District.Zipcode,''),
	   @InvoiceNo = @InvoiceNo + 1
   from District
  where District.DistrictId = @DistrictId
    and District.Active = 1
    and exists(select dc.DistrictChargeId 
	             from DistrictCharges dc 
				 join ChargeTypes ct on ct.ChargeTypeId = dc.ChargeTypeId
				where dc.DistrictId = District.DistrictId 
				  and case 
				        when @Type = 3 then 1
				        when @Type = 1 then 
						  case 
						    when ct.lm = 1 or ct.rtk = 1 then 1 
							else 0 
						  end 
						when @Type = 2 then
						  case
						    when ct.lm = 1 or ct.RTK = 1 then 0
						    else 1
						  end
						else 0 -- Unknown
					  end = 1 
				  and exists(Select * from String_Split(dc.FrequencyData,',') where value = @RunCycle))

  declare CCur cursor read_only for
    select DistrictCharges.ChargeTypeId, DistrictCharges.Amount, DistrictCharges.Frequency, DistrictCharges.FrequencyData, 
			ChargeTypes.AccountingChargeCode,
           Budgets.StartDate
      from DistrictCharges
      join Budgets on Budgets.BudgetId = DistrictCharges.BudgetId
--                  and Budgets.EndDate >= dateadd(year,1,@StartDate)
      join ChargeTypes on ChargeTypes.ChargeTypeId = DistrictCharges.ChargeTypeId
      join District on District.DistrictId = Budgets.DistrictId
     where DistrictCharges.BudgetId = @BudgetId
       and DistrictCharges.Frequency > 0
       and DistrictCharges.Active = 1
		and case 
			when @Type = 3 then 1
			when @Type = 1 then 
				case 
				when ChargeTypes.lm = 1 or ChargeTypes.rtk = 1 then 1 
				else 0 
				end 
			when @Type = 2 then
				case
				when ChargeTypes.lm = 1 or ChargeTypes.RTK = 1 then 0
				else 1
				end
			else 0 -- Unknown
			end = 1 
	 order by isnull(ChargeTypes.LM,0) desc, isnull(ChargeTypes.RTK,0) desc, ChargeTypes.Description

  open CCur
  fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @ChargeCode, @BudgetStartDate

  while @@fetch_status = 0
  begin
    select @FreqPtr = 0, @WorkAmount = round(isnull(@Amount,0) / isnull(@Freq,1),2)
    while @FreqPtr < isnull(@Freq,1)
    begin
      select @FreqPtr = @FreqPtr + 1
      select @FreqMonth = convert(int,dbo.uf_ExtractListEntry(@FreqData,@FreqPtr)) - 1
	  if @FreqMonth + 1 = @RunCycle
	  begin
		  select @MonthName = case @FreqMonth + 1 when 1 then 'July' when 4 then 'October' when 7 then 'January' when 10 then 'April' when 11 then 'May' else 'Unknown ' + cast(@FreqMonth as varchar) end
		  select @Workdate = dateadd(month,@FreqMonth,cast('07/01/' + cast(year(@BudgetStartDate)-1 as char(4)) as datetime))
		  select @paymentMsg = ''--'( ' + cast(@FreqPtr as varchar) + ' of ' + cast((select count(*) from string_split(@FreqData,',')) as varchar) + ' )'
			insert @PS(InvoiceNo, Customer,InvoiceDate,DueDate,Terms,Location,Memo,[Item(Product/Service)],ItemDescription,ItemQuantity,ItemRate,ItemAmount,[Shipping address],[Ship via],[Shipping date],[Tracking no.],[Shipping Charge],[Service Date])
			  values (right(cast(year(@WorkDate) as varchar),2) + right('00' + cast(month(@WorkDate) as varchar),2) + '-' + case when @Suffix != '' then @Suffix else '' end + right('00000' + cast(@InvoiceNo as varchar),5),
			            @Customer, convert(varchar(20),@Workdate,101), convert(varchar(20),@Workdate,101), 'Due on receipt','',
						'Please see the attached invoice for the 2023-2024 School Year.  Services associated with this billing are detailed on the attached invoice. Checks should be made payable to Educational Data Services, Inc. Don''t hesitate to contact me with any questions at michellem@ed-data.com.  Thank you for your business and have a great day! Educational Data Services, Inc.',
						case @ChargeCode
							when 'B' then 'License and Maintenance'
							when 'B2' then 'License and Maintenance with Right-To-Know'
							when 'R1' then 'Right-To-Know'
							when 'BC' then 'Purchase Order File'
							when 'BY' then 'Time and Materials Bids'
							when 'AA' then 'Generic Continuous Feed Purchase Orders'
							when 'R7' then 'e-PO Module, Support & Maintenance Fee'
							when 'BT' then 'License and Maintenance with T&M'
							when 'BR' then 'License and Maintenance with RTK and T&M'
							when 'AB' then 'Apple Computer Products Bid Access and Support'
							when 'FilingPrep' then 'Right to Know Annual State Filing Preparation'
							when 'LE' then 'License and Maintenance with e-PO'
							else 'Unknown'
						end,
						case @ChargeCode
							when 'B' then 'License and Maintenance for co-op school supply purchasing service ' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg
							when 'B2' then 'License and Maintenance for co-op school supply purchasing services, with Right-To-Know Services (MSDS sheets, labeling, and annual report) ' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg
							when 'R1' then 'Right-To-Know services covering SDS sheets, labeling, and annual report preparation ' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg
							when 'BC' then 'Purchase order file preparation covering annual school supply orders for upload and encumbrance in district’s financial software'
							when 'BY' then 'Access to co-op time and material skilled trades and services bids from 04/01/' + cast(year(@StartDate) as varchar) + ' to 03/31/' + cast(year(@StartDate) + 1 as varchar)
							when 'AA' then 'Provide generic purchase order stock for annual school supply ordering'
							when 'R7' then 'e-PO provides the business office with electronic transmittal capability for approved POs from Ed-Data to eligible vendors'
							when 'BT' then 'License and Maintenance for co-op school supply purchasing services, including time and material skilled trades and services bids' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg
							when 'BR' then 'License and Maintenance for co-op school supply purchasing services, Right-To-Know Services (MSDS sheets, labeling, and annual report), and Time & Material (skilled trades and services bids) ' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg
							when 'AB' then 'Ed-Data portal access and support for the Apple US Education Institution Hardware & Software Price List Bid'
							when 'LE' then 'License and Maintenance for co-op school supply purchasing service ' + @BillingYear + ' ' + @MonthName + ' Payment ' + @PaymentMsg + ' including e-PO which provides the business office with electronic transmittal capability for approved POs from Ed-Data to eligible vendors'
							when 'FilingPrep' then 'Electronically update data for annual Right-to-Know survey reports'
							else 'Unknown'
						end,
						1,
						@WorkAmount,
						@WorkAmount,
						dbo.ufn_DistrictInvoiceAddress(@DistrictId),
						'',
						'',
						'',
						0,
						'')
		end
    end

    fetch next from CCur into @ChargeId, @Amount, @Freq, @FreqData, @ChargeCode, @BudgetStartDate
  end

  close CCur
  deallocate CCur

  fetch next from DistCur into @DistrictId, @AccountingDistrictCode, @BudgetId
end

close DistCur
deallocate DistCur


return
end
```
