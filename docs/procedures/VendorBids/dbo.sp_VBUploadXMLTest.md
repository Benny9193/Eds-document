# Procedure: `dbo.sp_VBUploadXMLTest`

_Generated on 2026-05-04T13:43:22.350Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VBUploadXMLTest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-10-17 15:50:07 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pXML` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `bidcalendar` | USER_TABLE |  |
| `bidcalendaritems` | USER_TABLE |  |
| `debugmsgs` | USER_TABLE |  |
| `registrations` | USER_TABLE |  |
| `regusers` | USER_TABLE |  |
| `vendorbiditems` | USER_TABLE |  |
| `vendorbiditemsjournal` | USER_TABLE |  |
| `VendorBidMSRPPriceRanges` | USER_TABLE |  |
| `VendorBidMSRPResults` | USER_TABLE |  |
| `VendorBidMSRPResultsJournal` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |
| `vendorbidsjournal` | USER_TABLE |  |
| `VendorBidTMAnswers` | USER_TABLE |  |
| `VendorBidTMAnswersJournal` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |
| `dbo.uf_vendorbiditemsview` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |
| `dbo.VendorBidMSRPResultsJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: August 4, 2011
-- Description:	Upload Bid Header
-- =============================================
create PROCEDURE [dbo].[sp_VBUploadXMLTest]
	-- Add the parameters for the stored procedure here
	@pXML varchar(max)
AS
BEGIN
declare @hDoc int,
		@SessionId int,
		@RegistrationId int,
		@VendorBidId int,
		@addCalendar int,
		@PriorUploadCount int,
		@StatusMsg varchar(255),
		@StatusCode varchar(50),
	@pUserCode varchar(50),
	@pPassword varchar(50),
	@pPassPhrase varchar(50),
	@VendorCode varchar(50),
	@pTimeStamp varchar(50),
	@pBidId varchar(50),
	@pVendorBidNumber varchar(50),
	@pTotalAwardDiscount varchar(50),
	@pCatalogDiscount varchar(50),
	@pCatalogDiscountComments varchar(512),
	@pVendorComments varchar(512),
	@pOverwrite varchar(50),
	@TotalBidCost varchar(50),
	@NumberItemsBid varchar(50),
	@BidCost money,
	@ItemCount int,
	@CategoryType int
		
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 exec sp_xml_preparedocument @hDoc output, @pXML
 select @pPassPhrase = EncryptionCode,
	    @pVendorBidNumber = VendorBidNumber,
	    @pTotalAwardDiscount = TotalAwardDiscount,
	    @pCatalogDiscount = CatalogDiscount,
	    @pVendorComments = VendorComments,
	    @TotalBidCost = TotalBidCost,
	    @NumberItemsBid = NumberItemsBid,
	    @pTimeStamp = [Timestamp],
	    @pBidId = BidId,
	    @pOverwrite = Overwrite,
	    @pCatalogDiscountComments = CatalogDiscountComments
   from OPENXML(@hDoc, '/BidResults') 
   with (EncryptionCode varchar(50) 'EncryptionCode',
		 VendorBidNumber varchar(50) 'VendorBidNumber',
		 TotalAwardDiscount varchar(50) 'TotalAwardDiscount',
		 CatalogDiscount varchar(50) 'CatalogDiscount',
		 CatalogDiscountComments varchar(512) 'CatalogDiscountComments',
		 VendorComments varchar(512) 'VendorBidComments',
		 TotalBidCost varchar(50) 'TotalBidCost',
		 NumberItemsBid varchar(50) 'NumberItemsBid',
         [Timestamp] varchar(50) '@TimeStamp',
		 BidId varchar(50) '@BidId',
		 Overwrite varchar(50) '@Overwrite') 
	    
 select @CategoryType = CategoryType
   from bidcalendar with (nolock)
  where calendarid = @pBidId
  
 select @pUserCode = UserCode,
	    @pPassword = Password,
	    @VendorCode = VendorCode
   from OPENXML(@hDoc, '/BidResults/VendorLogin') with ([UserCode] varchar(50) 'UserCode',
													    [Password] varchar(50) 'Password',
													    [VendorCode] varchar(50) 'VendorCode')
			
insert debugmsgs (Msg) select @pXML
									    
insert debugmsgs (Msg) select 'UserCode=' + isnull(@pUserCode,'null') + ' Password=' + isnull(@pPassword,'null') + ' VendorCode=' + isnull(@VendorCode,'') + ' TS=' + isnull(@pTimeStamp,'null') + ' BidId=' + isnull(@pBidId,'null' + ' Overwrite=' + ISNULL(@pOverwrite,'null'))
 
	select @SessionId = 0, @VendorBidId = 0, @PriorUploadCount = 0, @StatusMsg = 'OK', @StatusCode = '200'
	
	if @CategoryType = 3 and @pUserCode like '%ed-data.com%' 
	begin
		select top 1 @RegistrationId = regusers.RegistrationId
  		  from regusers with (nolock)
  		  join registrations on registrations.registrationid = regusers.registrationid
  		                    and registrations.active = 1
  		                    and registrations.code = isnull(@VendorCode,'')
--  		  join DownloadLog on DownloadLog.reguserid = regusers.reguserId
--  		                  and DownloadLog.calendarid = @pBidId
	--	 where Code = rtrim(@pUserCode)
		 where regusers.active = 1
		 order by regusers.RegistrationId
	end
	else
	begin
		select top 1 @RegistrationId = RegistrationId
  		  from regusers with (nolock)
	--	 where Code = rtrim(@pUserCode)
		 where email = rtrim(@pUserCode)
		   and Password = rtrim(@pPassword)
		 order by RegistrationId
    end
	if @@rowcount = 1 and isnull(@pUserCode,'') != '' and ISNULL(@pPassword,'') != ''
	begin
		insert VendorSessions (RegistrationId, SessionUser, StartTime, IPAddress)
		  values (@RegistrationId, @pUserCode, getdate(), @pTimeStamp)

		select @SessionId = SCOPE_IDENTITY()

        select @CategoryType = CategoryType, 
               @addCalendar = COUNT(*)
          from bidcalendar with (nolock)
         where calendarid = CAST(@pBidId as int)
         group by CategoryType
            
        if @addCalendar < 1
        begin
          -- Manually Add Calendar Entry
          insert bidcalendar (active, calendarid)
            values (1, CAST(@pBidId as int))
        end

		select @PriorUploadCount = COUNT(*)
		  from vendorbids with (nolock)
		 where registrationid = @RegistrationId
		   and calendarid = cast(@pBidId as int)

		if isnull(@PriorUploadCount,0) = 0 or @pOverwrite = 'True'
		begin
			insert into vendorbids (active, registrationid, calendarid, bidpwd)
				values (1, @RegistrationId, cast(@pBidId as int), null)

			select @VendorBidId = scope_identity()

			--Must do this AFTER we know the vendorbidid
			update vendorbids
			   set bidpwd = EncryptByPassPhrase(@pPassPhrase, @pPassPhrase, 1, cast(@VendorBidId as varbinary)) 
			 where vendorbidid = @VendorBidId

			-- Insert Data
			insert vendorbidsjournal (vendorbidid, sessionid, statusid, active, biditemdiscountrate, catalogdiscountrate, vendorbidnumber, comments, catalogdiscountcomments)
			  select @VendorBidId, @SessionId, 1, 1,
			         EncryptByPassPhrase(@pPassPhrase, cast(isnull(cast(case rtrim(@pTotalAwardDiscount) when '' then '0' else @pTotalAwardDiscount end as decimal(9,5)),cast(0 as decimal(9,5))) as varchar(255)), 1, cast(@VendorBidId as varbinary)), 
					 EncryptByPassPhrase(@pPassPhrase, cast(isnull(cast(case rtrim(@pCatalogDiscount) when '' then '0' else @pCatalogDiscount end as decimal(9,5)),cast(0 as decimal(9,5))) as varchar(255)), 1, cast(@VendorBidId as varbinary)),
					 EncryptByPassPhrase(@pPassPhrase, @pVendorBidNumber, 1, cast(@VendorBidId as varbinary)), 
					 EncryptByPassPhrase(@pPassPhrase, @pVendorComments, 1, cast(@VendorBidId as varbinary)),
					 EncryptByPassPhrase(@pPassPhrase, @pCatalogDiscountComments, 1, cast(@VendorBidId as varbinary))
			
			if @CategoryType = 3
			begin
			  insert into VendorBidTMAnswers (VendorBidId, BidQuestionId, CountyId, BidTradeId)
			    select VendorBids.vendorbidid, x.BidQuestionId, x.CountyId, x.BidTradeId
 				  from OPENXML(@hDoc, '/BidResults/TradeBidResponse') 
				  with (BidQuestionId varchar(50) 'BidQuestionId',
				   	    CountyId varchar(50) 'CountyId',
						BidTradeId varchar(50) 'BidTradeId',
						BidAnswer varchar(512) 'BidAnswer',
						BidAnswerExtended varchar(512) 'BidExtdCalc') x
				   join vendorbids on VendorBids.vendorbidid = @VendorBidId
				   left outer join VendorBidTMAnswers on VendorBidTMAnswers.VendorBidId = VendorBids.VendorBidId
				                                     and VendorBidTMAnswers.BidQuestionId = x.BidQuestionId
				                                     and VendorBidTMAnswers.CountyId = x.CountyId
				                                     and VendorBidTMAnswers.BidTradeId = x.BidTradeId
				  where VendorBidTMAnswers.VendorBidTMAnswerId is null

			  insert into VendorBidTMAnswersJournal (VendorBidTMAnswerId, SessionId, BidAnswer, BidAnswerExtended)
			    select VendorBidTMAnswers.VendorBidTMAnswerId, @SessionId, EncryptByPassPhrase(@pPassPhrase, x.BidAnswer, 1, cast(@VendorBidId as varbinary)), EncryptByPassPhrase(@pPassPhrase, x.BidAnswerExtended, 1, cast(@VendorBidId as varbinary))
 				  from OPENXML(@hDoc, '/BidResults/TradeBidResponse') 
				  with (BidQuestionId varchar(50) 'BidQuestionId',
				   	    CountyId varchar(50) 'CountyId',
						BidTradeId varchar(50) 'BidTradeId',
						BidAnswer varchar(512) 'BidAnswer',
						BidAnswerExtended varchar(512) 'BidExtdCalc') x
				   join vendorbids on VendorBids.vendorbidid = @VendorBidId
				   join VendorBidTMAnswers on VendorBidTMAnswers.VendorBidId = VendorBids.VendorBidId
				                          and VendorBidTMAnswers.BidQuestionId = x.BidQuestionId
				                          and VendorBidTMAnswers.CountyId = x.CountyId
				                          and VendorBidTMAnswers.BidTradeId = x.BidTradeId
			  
			end
			else
			if @CategoryType = 5
			begin
			  insert into VendorBidMSRPResults (VendorBidId, BidRequestManufacturerId, ManufacturerName, WriteInManufacturer, PriceListType, BidRequestProductLineId, ProductLineName, WriteInProductLine, BidRequestOptionId, OptionName)
			    select VendorBids.vendorbidid, x.BidRequestManufacturerId, x.ManufacturerName, x.WriteInManufacturer, x.PriceListType, x.BidRequestProductLineId, x.ProductLineName, x.WriteInProductLine, x.BidRequestOptionId, x.OptionName
 				  from OPENXML(@hDoc, '/BidResults/MSRPManufacturers/MSRPManufacturer/ProductLinesWithOptions/ProductLine/Option') 
				  with (BidRequestManufacturerId varchar(50) '../../../BidRequestManufacturerId',
				   	    ManufacturerName varchar(50) '../../../ManufacturerName',
						WriteInManufacturer varchar(50) '../../../ManufacturerWriteIn',
						PriceListType varchar(512) '../../../PriceListType',
						BidRequestProductLineId varchar(512) '../BidRequestProductLineId',
						ProductLineName varchar(512) '../ProductLineName',
						WriteInProductLine varchar(512) '../ProductLineWriteIn',
						BidRequestOptionId varchar(512) 'BidRequestOptionId',
						OptionName varchar(512) 'OptionName') x
				   join vendorbids on VendorBids.vendorbidid = @VendorBidId
				   left outer join VendorBidMSRPResults on VendorBidMSRPResults.VendorBidId = VendorBids.VendorBidId
				                                       and VendorBidMSRPResults.BidRequestManufacturerId = x.BidRequestManufacturerId
				                                       and VendorBidMSRPResults.ManufacturerName = x.ManufacturerName
				                                       and VendorBidMSRPResults.BidRequestProductLineId = x.BidRequestProductLineId
				                                       and VendorBidMSRPResults.ProductLineName = x.ProductLineName
				                                       and VendorBidMSRPResults.BidRequestOptionId = x.BidRequestOptionId
				                                       and VendorBidMSRPResults.OptionName = x.OptionName
				  where VendorBidMSRPResults.VendorBidMSRPResultsId is null

			  insert into VendorBidMSRPResultsJournal (VendorBidMSRPResultsId, SessionId, WeightedDiscount)
			    select VendorBidMSRPResults.VendorBidMSRPResultsId, @SessionId, EncryptByPassPhrase(@pPassPhrase, x.WeightedDiscount, 1, cast(VendorBidMSRPResults.VendorBidMSRPResultsId as varbinary))
 				  from OPENXML(@hDoc, '/BidResults/MSRPManufacturers/MSRPManufacturer/ProductLinesWithOptions/ProductLine/Option') 
				  with (BidRequestManufacturerId varchar(50) '../../../BidRequestManufacturerId',
				   	    ManufacturerName varchar(50) '../../../ManufacturerName',
						WriteInManufacturer varchar(50) '../../../ManufacturerWriteIn',
						PriceListType varchar(512) '../../../PriceListType',
						BidRequestProductLineId varchar(512) '../BidRequestProductLineId',
						ProductLineName varchar(512) '../ProductLineName',
						WriteInProductLine varchar(512) '../ProductLineWriteIn',
						BidRequestOptionId varchar(512) 'BidRequestOptionId',
						OptionName varchar(512) 'OptionName',
						WeightedDiscount varchar(512) 'PriceRanges/AvgWeightedDiscount') x
				   join vendorbids on VendorBids.vendorbidid = @VendorBidId
				   join VendorBidMSRPResults on VendorBidMSRPResults.VendorBidId = VendorBids.VendorBidId
				                            and VendorBidMSRPResults.BidRequestManufacturerId = x.BidRequestManufacturerId
				                            and VendorBidMSRPResults.ManufacturerName = x.ManufacturerName
				                            and VendorBidMSRPResults.BidRequestProductLineId = x.BidRequestProductLineId
				                            and VendorBidMSRPResults.ProductLineName = x.ProductLineName
				                            and VendorBidMSRPResults.BidRequestOptionId = x.BidRequestOptionId
				                            and VendorBidMSRPResults.OptionName = x.OptionName

			  insert into VendorBidMSRPPriceRanges (VendorBidMSRPResultsJournalId, BidRequestPriceRangeId, PriceRangeLow, PriceRangeWeight, PriceRangeDiscount)
			    select VendorBidMSRPResultsJournal.VendorBidMSRPResultsJournalId, BidRequestPriceRangeId, PriceRangeLow, PriceRangeWeight, EncryptByPassPhrase(@pPassPhrase, x.PriceRangeDiscount, 1, cast(VendorBidMSRPResults.VendorBidMSRPResultsId as varbinary))
 				  from OPENXML(@hDoc, '/BidResults/MSRPManufacturers/MSRPManufacturer/ProductLinesWithOptions/ProductLine/Option/PriceRanges/PriceRange') 
				  with (BidRequestManufacturerId varchar(50) '../../../../../BidRequestManufacturerId',
				   	    ManufacturerName varchar(50) '../../../../../ManufacturerName',
						WriteInManufacturer varchar(50) '../../../../../ManufacturerWriteIn',
						PriceListType varchar(512) '../../../../../PriceListType',
						BidRequestProductLineId varchar(512) '../../../BidRequestProductLineId',
						ProductLineName varchar(512) '../../../ProductLineName',
						WriteInProductLine varchar(512) '../../../ProductLineWriteIn',
						BidRequestOptionId varchar(512) '../../BidRequestOptionId',
						OptionName varchar(512) '../../OptionName',
						WeightedDiscount varchar(512) '../AvgWeightedDiscount',
						BidRequestPriceRangeId varchar(512) 'BidRequestPriceRangeId',
						PriceRangeLow varchar(512) 'PriceRangeLow',
						PriceRangeWeight varchar(512) 'PriceRangeWeight',
						PriceRangeDiscount varchar(512) 'Discount') x
				   join vendorbids on VendorBids.vendorbidid = @VendorBidId
				   join VendorBidMSRPResults on VendorBidMSRPResults.VendorBidId = VendorBids.VendorBidId
				                            and VendorBidMSRPResults.BidRequestManufacturerId = x.BidRequestManufacturerId
				                            and VendorBidMSRPResults.ManufacturerName = x.ManufacturerName
				                            and VendorBidMSRPResults.BidRequestProductLineId = x.BidRequestProductLineId
				                            and VendorBidMSRPResults.ProductLineName = x.ProductLineName
				                            and VendorBidMSRPResults.BidRequestOptionId = x.BidRequestOptionId
				                            and VendorBidMSRPResults.OptionName = x.OptionName
				   join VendorBidMSRPResultsJournal on VendorBidMSRPResultsJournal.VendorBidMSRPResultsJournalId =
				     (select top 1 vbmrj.VendorBidMSRPResultsJournalId
				        from dbo.VendorBidMSRPResultsJournal vbmrj with (nolock)
				       where vbmrj.VendorBidMSRPResultsId = VendorBidMSRPResults.VendorBidMSRPResultsId
				       order by vbmrj.VendorBidMSRPResultsJournalId desc)
			end
			else
			begin
				-- Initialize Vendor Bid Items
				insert into vendorbiditems (vendorbidid, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossrefstext)
				  select @VendorBidId, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossreftext
					from bidcalendaritems with (nolock)
				   where calendarid = cast(@pBidId as int)

				-- Add base row is not present for some reason
				insert vendorbiditems (vendorbidid, bidrequestitemid, quantity, itemid)
				  select vendorbids.vendorbidid, CAST(x.BidRequestItemId as int), CAST(x.QuantityBid as int), 1
 					from OPENXML(@hDoc, '/BidResults/BidResultDetail') 
					with (BidRequestItemId varchar(50) 'BidRequestItemId',
				 		  Alternate varchar(512) 'Alternate',
						  ItemBidType varchar(50) 'ItemBidType',
						  UnitPrice varchar(50) 'UnitPrice',
						  Cost varchar(50) 'Cost',
						  VendorItemCode varchar(50) 'VendorItemCode',
						  QuantityBid varchar(50) 'QuantityBid',
						  ItemsPerUnit varchar(50) 'ItemsPerUnit',
						  PageNo varchar(50) 'PageNo',
						  Manufacturer varchar(512) 'ManufacturerBid',
						  ManufacturerPartNumber varchar(50) 'ManufPartNoBid') x
					join vendorbids on VendorBids.vendorbidid = @VendorBidId
					left outer join vendorbiditems on vendorbiditems.vendorbidid = vendorbids.vendorbidid
												  and vendorbiditems.bidrequestitemid = CAST(x.BidRequestItemId as int)
				   where vendorbids.vendorbidid = @VendorBidId
					 and vendorbiditems.vendorbiditemid is null                                      

				-- add journal entry
				insert vendorbiditemsjournal (vendorbiditemid, sessionid, itembidtype, unitprice, cost, vendoritemcode, quantitybid, alternate, itemsperunit, pageno, Manufacturer, ManufacturerPartNumber, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength)
				  select vendorbiditems.vendorbiditemid,
						 @SessionId,
						 EncryptByPassPhrase(@pPassPhrase, x.ItemBidType, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.UnitPrice, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.Cost, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.VendorItemCode, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.QuantityBid, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.Alternate, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.ItemsPerUnit, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.PageNo, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.Manufacturer, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.ManufacturerPartNumber, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerGaugeMicrons, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerGaugeMil, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerCaseWeight, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerDimWidth, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerDimDepth, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
						 EncryptByPassPhrase(@pPassPhrase, x.LinerDimLength, 1, cast(vendorbiditems.vendorBidItemId as varbinary))
 					from OPENXML(@hDoc, '/BidResults/BidResultDetail') 
					with (BidRequestItemId varchar(50) 'BidRequestItemId',
				 		  Alternate varchar(512) 'Alternate',
						  ItemBidType varchar(50) 'ItemBidType',
						  UnitPrice varchar(50) 'UnitPrice',
						  Cost varchar(50) 'Cost',
						  VendorItemCode varchar(50) 'VendorItemCode',
						  QuantityBid varchar(50) 'QuantityBid',
						  ItemsPerUnit varchar(50) 'ItemsPerUnit',
						  PageNo varchar(50) 'PageNo',
						  Manufacturer varchar(512) 'ManufacturerBid',
						  ManufacturerPartNumber varchar(50) 'ManufPartNoBid',
						  LinerGaugeMicrons varchar(50) 'LinerGaugeMicrons',
						  LinerGaugeMil varchar(50) 'LinerGaugeMil',
						  LinerCaseWeight varchar(50) 'LinerCaseWeight',
						  LinerDimWidth varchar(50) 'LinerDimWidth',
						  LinerDimDepth varchar(50) 'LinerDimDepth',
						  LinerDimLength varchar(50) 'LinerDimLength') x
					join vendorbiditems on vendorbiditems.bidrequestitemid = cast(x.BidRequestItemId as int)
				   where vendorbiditems.vendorbidid = @VendorBidId
			
				select @BidCost = SUM(cast(Cost as money)),
					   @ItemCount = COUNT(*)
				  from dbo.uf_vendorbiditemsview(@pPassPhrase,@VendorBidId) vbiv
				 where ISNULL(vbiv.vbijid,0) != 0
			      
				if @BidCost != cast(@TotalBidCost as money) 
				begin
				  select @StatusMsg = 'Calculated Cost does not equal Expected Cost. Expected=' + @TotalBidCost + '  Calculated=' + cast(@BidCost as varchar(50)), @StatusCode = '500'
				end
				else
				if @ItemCount != @NumberItemsBid
				begin
				  select @StatusMsg = 'Number of Items received does not equal Number of Items Expected. Expected=' + @NumberItemsBid + '  Recieved=' + cast(@ItemCount as varchar(50)), @StatusCode = '500'
				end
			end
		end
		else
		begin
		    select @StatusMsg = 'Cannot overwrite previous transmission without your permission.', @StatusCode = '500'
		end
	end
	else
	begin
	  insert debugmsgs (Msg) values ('@CategoryType=''' + isnull(CAST(@CategoryType as varchar),'<null>') + ''' @pUserCode=''' + ISNULL(@pUserCode,'<null>') + '''')
	  select @StatusMsg = 'Security Credentials are incorrect.', @StatusCode = '500'
	end

    exec sp_xml_removedocument @hDoc
	select @SessionId as SessionId, @VendorBidId as VendorBidId, @StatusMsg as StatusMsg, @StatusCode as StatusCode, @pUserCode as UserCode, @pBidId as BidId
    insert debugmsgs (Msg) select 'VendorBidId=' + CAST(@VendorBidId as varchar(50)) + ' StatusMsg=' + ISNULL(@StatusMsg,'') + ' StatusCode=' + ISNULL(@StatusCode,'')
    

END
```
