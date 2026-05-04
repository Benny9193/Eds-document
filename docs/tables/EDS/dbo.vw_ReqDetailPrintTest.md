# View: `dbo.vw_ReqDetailPrintTest`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Alternate` | varchar(2050) | YES |  |  |
| 2 | `BidItemId` | int | NO |  |  |
| 3 | `BidPrice` | money | NO |  |  |
| 4 | `CatalogPage` | char(4) | NO |  |  |
| 5 | `CatalogPrice` | money | NO |  |  |
| 6 | `ShortDescription` | varchar(1024) | NO |  |  |
| 7 | `ExtraDescription` | varchar(1024) | NO |  |  |
| 8 | `ItemCode` | varchar(50) | NO |  |  |
| 9 | `Quantity` | int | NO |  |  |
| 10 | `RequisitionId` | int | NO |  |  |
| 11 | `SortSeq` | varchar(64) | NO |  |  |
| 12 | `UnitCode` | varchar(20) | NO |  |  |
| 13 | `VendorItemCode` | varchar(50) | NO |  |  |
| 14 | `ItemBidType` | varchar(16) | NO |  |  |
| 15 | `ExtendedBidPrice` | decimal(20,4) | YES |  |  |
| 16 | `AccountCode` | varchar(50) | NO |  |  |
| 17 | `Attention` | varchar(50) | NO |  |  |
| 18 | `DateEntered` | datetime | NO |  |  |
| 19 | `RequisitionNumber` | varchar(24) | NO |  |  |
| 20 | `ShippingCost` | money | NO |  |  |
| 21 | `TotalItemsCost` | money | NO |  |  |
| 22 | `TotalRequisitionCost` | money | NO |  |  |
| 23 | `CategoryName` | varchar(50) | YES |  |  |
| 24 | `BudgetName` | varchar(30) | NO |  |  |
| 25 | `DistrictName` | varchar(50) | NO |  |  |
| 26 | `DistrictCode` | varchar(4) | NO |  |  |
| 27 | `ShipToName` | varchar(50) | NO |  |  |
| 28 | `ShipToAddress1` | varchar(30) | NO |  |  |
| 29 | `ShipToAddress2` | varchar(30) | NO |  |  |
| 30 | `ShipToAddress3` | varchar(30) | NO |  |  |
| 31 | `ShipToCity` | varchar(25) | NO |  |  |
| 32 | `ShipToState` | varchar(2) | NO |  |  |
| 33 | `ShipToZipcode` | varchar(10) | NO |  |  |
| 34 | `UserNumber` | int | NO |  |  |
| 35 | `BidHeaderId` | int | NO |  |  |
| 36 | `BidMsg` | varchar(583) | YES |  |  |
| 37 | `FreeHandlingAmount` | money | NO |  |  |
| 38 | `HandlingAmount` | money | NO |  |  |
| 39 | `FreeHandlingStart` | datetime | NO |  |  |
| 40 | `FreeHandlingEnd` | datetime | NO |  |  |
| 41 | `VendorId` | int | NO |  |  |
| 42 | `VendorCode` | varchar(16) | NO |  |  |
| 43 | `VendorName` | varchar(50) | NO |  |  |
| 44 | `VendorContactName` | varchar(150) | NO |  |  |
| 45 | `VendorContactAddress1` | varchar(50) | NO |  |  |
| 46 | `VendorContactAddress2` | varchar(50) | NO |  |  |
| 47 | `VendorContactCity` | varchar(50) | NO |  |  |
| 48 | `VendorContactState` | char(2) | NO |  |  |
| 49 | `VendorContactZip` | varchar(10) | NO |  |  |
| 50 | `VendorContactPhone` | varchar(25) | NO |  |  |
| 51 | `VendorContactFax` | varchar(20) | NO |  |  |
| 52 | `VendorContactEmail` | varchar(255) | NO |  |  |
| 53 | `VendorBidNumber` | varchar(50) | NO |  |  |
| 54 | `VendorAwardMsg` | varchar(511) | NO |  |  |
| 55 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 56 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 57 | `FullDescription` | nvarchar(max) | YES |  |  |
| 58 | `FullVendorInfo` | varchar(726) | YES |  |  |
| 59 | `FullDistrictInfo` | varchar(420) | NO |  |  |
| 60 | `FullShipToInfo` | varchar(315) | YES |  |  |
| 61 | `CompliantAlert` | tinyint | NO |  |  |
| 62 | `SortKey` | varchar(121) | YES |  |  |
| 63 | `SortVendorKey` | varchar(51) | YES |  |  |
| 64 | `BidType` | tinyint | NO |  |  |
| 65 | `PrintBidAs` | tinyint | NO |  |  |
| 66 | `ItemsNotBid` | int | NO |  |  |
| 67 | `BidsThisVendor` | int | NO |  |  |
| 68 | `BelowMinimum` | int | NO |  |  |
| 69 | `AdditionalShipping` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `VendorCategory` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_ReqDetailPrint where RequisitionId = 58754765
--select * from vw_ReqDetailPrintTest where RequisitionId = 58754765 order by VendorId, BidHeaderId
--select * from Detail join BidItems on BidItems.BidItemId = Detail.BidItemId join Bids on Bids.BidId = BidItems.BidId where RequisitionId = 58754765 and Detail.VendorId = 9
--select * from BidsCatalogList join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId and CrossRefs.PackedCode = '1570373' where BidsCatalogList.BidId = 2477064

CREATE     view  [dbo].[vw_ReqDetailPrintTest] as
select isnull(Detail.Alternate,'') +
       case isnull(Detail.ExtraDescription,'') 
         when '' then '' 
         else 
           case isnull(Detail.Alternate,'') 
             when '' then '' 
             else CHAR(13) + CHAR(10) 
           end + Detail.ExtraDescription
       end as Alternate, 
       isnull(Detail.BidItemId,0) BidItemId, 
--       case when isnull(Detail.ItemMustBeBid,0) = 0 or Category.Type = 2 then isnull(Detail.BidPrice,0) else cast(0 as money) end BidPrice, DCH Removed 11/6/13 per Alan&Gerard
       isnull(Detail.BidPrice,0) BidPrice,
       isnull(Detail.CatalogPage,'') CatalogPage,
       isnull(Detail.CatalogPrice,0) CatalogPrice,
       isnull(Detail.Description,'') ShortDescription,
       isnull(Detail.ExtraDescription,'') ExtraDescription,
--dch 5/20/13       isnull(Detail.ItemCode,'') ItemCode,
       case isnull(Detail.ItemMustBeBid,0)
         when 1 then isnull(Detail.ItemCode,'')
         else
           case isnull(Detail.BidItemId,0)
             when 0 then
               case isnull(Detail.VendorId,7691)
                 when 7691 then isnull(Detail.ItemCode,'')
                 else isnull(Detail.VendorItemCode,'')
               end
             else ISNULL(Detail.ItemCode,'')
           end
       end ItemCode,
       isnull(Detail.Quantity,0) Quantity,
       isnull(Detail.RequisitionId,0) RequisitionId,
       isnull(Detail.SortSeq,'') SortSeq,
       isnull(Detail.UnitCode,'') UnitCode,
       isnull(Detail.VendorItemCode,'') VendorItemCode,
       case isnull(detail.BidItemId,0)
         when 0 then
           case Detail.ItemMustBeBid
             when 1 then 'Item Not Bid'
             else
               case Detail.VendorId
                 when 7691 then 'No Bid'
                 else 'Catalog Item'
               end
           end
         else
           case ISNULL(substring(otb.ItemBidType,1,1),'')
             when 'C' then 'Compliant Item' 
             when 'A' then 'Bid As Specified'
             else ''
           end 
       end ItemBidType, 
--       case when isnull(Detail.ItemMustBeBid,0) = 0 or Category.Type = 2 then isnull(Detail.Quantity * Detail.BidPrice,0) else CAST(0 as money) end ExtendedBidPrice, -- Altered 11/6/13 per Alan&Gerard
       isnull(Detail.Quantity * Detail.BidPrice,0) + case when Detail.AdditionalShipping = 1 then coalesce(Detail.ShippingCost,0) else 0 end ExtendedBidPrice,
       isnull(Accounts.Code,'') /*isnull(Requisitions.AccountCode,'') */ AccountCode,
       isnull(Requisitions.Attention,'') Attention,
       isnull(Requisitions.DateEntered,CAST('01/01/1970' as datetime)) DateEntered,
       isnull(Requisitions.RequisitionNumber,'') RequisitionNumber,
       isnull(Requisitions.ShippingCost,0) ShippingCost,
       isnull(Requisitions.TotalItemsCost,0) TotalItemsCost,
       isnull(Requisitions.TotalRequisitionCost,0) TotalRequisitionCost,
       trim(coalesce(DistrictCategories.Title,Category.Name,'')) CategoryName,
       isnull(Budgets.Name,'') BudgetName,
       isnull(District.Name,'') DistrictName,
       isnull(District.DistrictCode,'') DistrictCode,
       isnull(ShipLocations.Name,'') ShipToName,
       isnull(ShipLocations.Address1,'') ShipToAddress1,
       isnull(ShipLocations.Address2,'') ShipToAddress2,
       isnull(ShipLocations.Address3,'') ShipToAddress3,
       isnull(ShipLocations.City,'') ShipToCity,
       isnull(ShipLocations.State,'') ShipToState,
       isnull(ShipLocations.ZipCode,'') ShipToZipcode,
       isnull(Users.CometId,0) UserNumber,
       isnull(BidHeaders.BidHeaderId,0) BidHeaderId,
       isnull(BidHeaders.Description,'') + case when isnull(BidHeaders.Description,'') = '' then '' else char(10) end + case when BidHeaders.EffectiveFrom is null or BidHeaders.EffectiveUntil is null then 'Bid period has not been set' else 'Bid Pricing Valid From ' + convert(varchar(20),BidHeaders.EffectiveFrom,101) + ' until ' + convert(varchar(20),BidHeaders.EffectiveUntil,101) end BidMsg,
       isnull(LatestBid.FreeHandlingAmount,0) FreeHandlingAmount,
	   isnull(LatestBid.AdditionalHandlingAmount,0) HandlingAmount,
       isnull(LatestBid.FreeHandlingStart,cast('01/01/1970' as datetime)) FreeHandlingStart,
       isnull(LatestBid.FreeHandlingEnd,cast('01/01/1970' as datetime)) FreeHandlingEnd,
       ISNULL(Vendors.VendorId,7691) VendorId,
       isnull(Vendors.Code,'') VendorCode,
       ISNULL(Vendors.Name,case ISNULL(Detail.BidItemId,0) when 0 then case Detail.ItemMustBeBid when 1 then '*** Items Not Bid ***' else '** No Bid **' end else '*** Missing Vendor Name ***' end ) VendorName,
       isnull(VendorContacts.FullName,'') VendorContactName,
       isnull(VendorContacts.Address1,'') VendorContactAddress1,
       isnull(VendorContacts.Address2,'') VendorContactAddress2,
       isnull(VendorContacts.City,'') VendorContactCity,
       isnull(VendorContacts.State,'') VendorContactState,
       isnull(VendorContacts.Zipcode,'') VendorContactZip,
       isnull(VendorContacts.Phone,'') VendorContactPhone,
       isnull(VendorContacts.Fax,'') VendorContactFax,
       isnull(VendorContacts.EMail,'') VendorContactEmail,
       isnull(LatestBid.VendorBidNumber,'') VendorBidNumber,
       isnull(LatestBid.Description,'') VendorAwardMsg,
       isnull(DistrictVendor.Value,'') DistrictVendorCode,
       isnull(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode,
       coalesce(dd.ShortDescription, dd.ItemDescription,'') FullDescription,
       ISNULL(Vendors.Name,case ISNULL(Detail.BidItemId,0) when 0 then case Detail.ItemMustBeBid when 1 then '*** Items Not Bid ***' else '** No Bid **' end else '*** Missing Vendor Name ***' end ) + '<br/>' + 
       case ISNULL(VendorContacts.Address1,'') 
         when '' then '' 
         else VendorContacts.Address1 + '<br/>' 
       end +
       case ISNULL(VendorContacts.Address2,'') 
         when '' then '' 
         else VendorContacts.Address2 + '<br/>' 
       end +
       case ISNULL(VendorContacts.City,'') + ISNULL(VendorContacts.State,'') + ISNULL(VendorContacts.Zipcode,'')
         when '' then '' 
         else isnull(VendorContacts.City,'') + ', ' + ISNULL(VendorContacts.State,'') + ' ' + ISNULL(VendorContacts.Zipcode,'') + '<br/>' 
       end +
       case ISNULL(replace(VendorContacts.FullName,'&','&amp;'),'')
         when '' then ''
         else 'Attn: ' + VendorContacts.FullName + '<br/>'
       end +
       case ISNULL(VendorContacts.Phone,'')
         when '' then ''
         else 'Phone: ' + VendorContacts.Phone + '<br/>'
       end +
       case ISNULL(VendorContacts.Fax,'')
         when '' then ''
         else 'Fax: ' + VendorContacts.Fax + '<br/>'
       end + 
       case ISNULL(VendorContacts.EMail,'')
         when '' then ''
         else 'E-Mail: ' + VendorContacts.EMail
       end FullVendorInfo,
       ISNULL(District.Name,'') + '<br/>' +
       case 
         when ISNULL(DistrictContacts.Address1,'') = '' then ''
         when ISNULL(DistrictContacts.Address1,'') like '%PAY%' then ''
         else ISNULL(DistrictContacts.Address1,'') + '<br/>'
       end +
       case 
         when ISNULL(DistrictContacts.Address2,'') = '' then ''
         when ISNULL(DistrictContacts.Address2,'') like '%PAY%' then ''
         else ISNULL(DistrictContacts.Address2,'') + '<br/>'
       end +
       case ISNULL(DistrictContacts.City,'') + isnull(DistrictContacts.State,'') + ISNULL(DistrictContacts.Zipcode,'')
         when '' then ''
         else ISNULL(DistrictContacts.City,'') + ', ' + isnull(DistrictContacts.State,'') + ' ' + ISNULL(DistrictContacts.Zipcode,'') + '<br/>'
       end +
       case isnull(DistrictContacts.FullName,'')
         when '' then ''
         else 'Attn: ' + ISNULL(DistrictContacts.FullName,'') + '<br/>'
       end FullDistrictInfo,
       isnull(ShipLocations.Name,'') + '<br/>' +
       case ISNULL(ShipLocations.Address1,'')
         when '' then ''
         else ShipLocations.Address1 + '<br/>'
       end +
       case ISNULL(ShipLocations.Address2,'')
         when '' then ''
         else ShipLocations.Address2 + '<br/>'
       end +
       case ISNULL(ShipLocations.Address3,'')
         when '' then ''
         else ShipLocations.Address3 + '<br/>'
       end +
       case ISNULL(ShipLocations.City,'') + ISNULL(ShipLocations.State,'') + ISNULL(ShipLocations.Zipcode,'')
         when '' then ''
         else ISNULL(ShipLocations.City,'') + ', ' + ISNULL(ShipLocations.State,'') + ' ' + ISNULL(ShipLocations.Zipcode,'') + '<br/>'
       end +
       case ISNULL(Requisitions.Attention,'')
         when '' then ''
         else 'Attn: ' + Requisitions.Attention + '<br/>'
       end +
       case 
         when Users.CometId is null then ''
         else 'User #: ' + right('00000' + cast(Users.CometId as varchar(10)),5) + '<br/>'
       end +
       'Mark For: R' + cast(Requisitions.RequisitionId as varchar(20)) FullShipToInfo,
       isnull(BidHeaders.CompliantAlert,0) CompliantAlert,
       cast(case ISNULL(Detail.ItemMustBeBid,0)
              when 1 then 9
              when 0 then
                case ISNULL(Detail.VendorId,0)
                  when 0 then 8
                  when 7691 then 8
                  when 7692 then 8
                  else 0
                end
            end
            AS CHAR(1)) +
            ISNULL(Vendors.Name,case ISNULL(Detail.BidItemId,0) when 0 then case Detail.ItemMustBeBid when 1 then '*** Items Not Bid ***' else '** No Bid **' end else '*** Missing Vendor Name ***' end ) +
			coalesce(right('000000' + cast(BidHeaders.BidHeaderId as varchar),6),'000000') +
            isnull(Detail.SortSeq,'') SortKey,
             cast(case ISNULL(Detail.ItemMustBeBid,0)
              when 1 then 9
              when 0 then
                case ISNULL(Detail.VendorId,0)
                  when 0 then 8
                  when 7691 then 8
                  when 7692 then 8
                  else 0
                end
            end
            AS CHAR(1)) +
            ISNULL(Vendors.Name,case ISNULL(Detail.BidItemId,0) when 0 then case Detail.ItemMustBeBid when 1 then '*** Items Not Bid ***' else '** No Bid **' end else '*** Missing Vendor Name ***' end ) SortVendorKey,
            ISNULL(BidHeaders.BidType,2) BidType,
            ISNULL(District.PrintBidAs,0) PrintBidAs,
            isnull((select COUNT(*) from Detail d with (nolock) where d.RequisitionId = Requisitions.RequisitionId and d.ItemMustBeBid = 1),0) ItemsNotBid,
            ISNULL((select COUNT(*) from (select bh.BidHeaderId from BidHeaders bh join Detail d on d.RequisitionId = Requisitions.RequisitionId and d.BidItemId is null and d.VendorId = Vendors.VendorId where bh.BidHeaderId = Requisitions.BidHeaderId union (select b1.BidHeaderId from Detail d1 join BidItems bi on bi.BidItemId = d1.BidItemId join Bids b1 on b1.BidId = bi.BidId where d1.RequisitionId = Requisitions.RequisitionId and d1.VendorId = Vendors.VendorId )) vs),0) BidsThisVendor,
            case 
              when isnull(District.MinimumPOAmount,0) > 0 
               and ISNULL((select SUM(d.Quantity * d.BidPrice) 
                             from Detail d
                            where d.RequisitionId = Requisitions.RequisitionId 
                              and d.VendorId = Vendors.VendorId 
                              and (   d.ItemMustBeBid = 0 
                                   or d.ItemMustBeBid is null)
                           ),0) < District.MinimumPOAmount then 1 
              else 0 
            end BelowMinimum,
			coalesce(Detail.AdditionalShipping,0) AdditionalShipping
  FROM dbo.Detail  with (nolock)
  join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
  join Items on Items.ItemId = Detail.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Category on Category.CategoryId = Requisitions.CategoryId
--  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
--  left outer join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
--  left outer join Bids on Bids.BidId = BidItems.BidId
  left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  left outer join Users on Users.UserId = Requisitions.UserId
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  left outer join Accounts on Accounts.AccountId = UserAccounts.AccountId
  left outer JOIN Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) 
                                                  when 0 then Detail.VendorId 
                                                  else 0 
                                                end
  outer apply (Select top 1 vc.VendorName
                 from VendorCategory vc
				where vc.VendorId = Vendors.VendorId
				  and vc.CategoryId = Category.CategoryId
				order by vc.VCId) VendorCategory
  outer apply (Select top 1 dv.Value, dv.VendorsAccountCode
                 from DistrictVendor dv
				where dv.DistrictId = Budgets.DistrictId
				  and dv.VendorId = Vendors.VendorId
				order by dv.DistrictVendorId) DistrictVendor
  outer apply (Select top 1 dc.Title
                 from DistrictCategories dc
				where dc.DistrictId = District.DistrictId
				  and dc.CategoryId = Requisitions.CategoryId
				order by dc.DistrictCategoryId) DistrictCategories
  outer apply (Select b1.BidHeaderId, bh1.BidAwardDate, b1.BidImportId, b1.BidId, bi1.ItemBidType
                 from BidItems bi1
				 join Bids b1 on b1.BidId = bi1.BidId
				 join BidHeaders bh1 on bh1.BidHeaderId = B1.BidHeaderId
				where bi1.BidItemId = Detail.BidItemId) otb
/*  outer apply (select top 1 bhdbh.BidHeaderId, bhdbh.BidAwardDate
                 from BidHeaderDetail bhd
				 join BidHeaders bhdbh on bhdbh.BidHeaderId = bhd.BidHeaderId
									  and bhdbh.Active = 1
				                      and bhdbh.BidDate is not null
									  and bhdbh.BidAwardDate is not null
				where bhd.DetailId = Detail.DetailId
				order by bhdbh.BidHeaderId desc) otb
*/
--  left outer join BidHeaders bh on bh.BidHeaderId = coalesce(otb.BidHeaderId, case when isnull(Detail.BidHeaderId,0) = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId)
  outer apply (Select top 1 bh.BidHeaderId, bh. Description, bh.EffectiveFrom, bh.EffectiveUntil, bh.BidType, bh.CompliantAlert
                 from BidHeaders bh
				where bh.BidHeaderId = coalesce(otb.BidHeaderId, case when isnull(Detail.BidHeaderId,0) = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId)) BidHeaders
  outer apply (Select top 1 b.BidImportId, b.BidId
                 from Bids b
				where b.BidHeaderId = coalesce(case when isnull(Detail.BidHeaderId,0) = 0 then null else Detail.BidHeaderId end, Requisitions.BidHeaderId)
				  and b.VendorId = Detail.VendorId
				  and b.Active = 1) bin
  outer apply (select top 1 bi.POVendorContactId
                 from BidImports bi
				where bi.BidImportId = coalesce(otb.BidImportId, bin.BidImportId)) BidImports
  outer apply (Select top 1 b.FreeHandlingAmount, b.AdditionalHandlingAmount, b.FreeHandlingStart, b.FreeHandlingEnd, a.VendorBidNumber, a.Description
                 from Bids b
				 join Awards a on a.BidId = b.BidId
				where b.BidId = coalesce(otb.BidId, bin.BidId)) LatestBid
  outer apply (Select top 1 *
                 from VendorContacts vc
				where vc.VendorId = Vendors.VendorId
				  and vc.Active = 1
				  and vc.VendorContactId = case when isnull(BidImports.POVendorContactId,0) = 0 then vc.VendorContactId else BidImports.POVendorContactId end
                order by vc.POContact desc, vc.VendorContactId) VendorContacts
  outer apply (select Top 1 DC.*
       from DistrictContacts DC with (nolock)
      where DC.DistrictId = District.DistrictId
        and DC.DistrictContactTypeId in(2, 5)
      order by DC.DistrictContactTypeId desc, DC.DistrictContactId) DistrictContacts

/*  from Detail with (nolock)
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
--  join vw_DetailDescriptionPrint dd on dd.DetailId = Detail.DetailId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer join Bids on Bids.BidId = BidItems.BidId
  left outer join BidImports on BidImports.BidImportId = Bids.BidImportId
  left outer join BidHeaders on BidHeaders.BidHeaderId = case when isnull(Bids.BidHeaderId,0) != 0 then Bids.BidHeaderId when ISNULL(Detail.BidHeaderId,0) = 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
  left outer join Bids LatestBid on LatestBid.BidId = (select Top 1 b.BidId
                                                         from Bids b
                                                        where b.BidHeaderId = BidHeaders.BidHeaderId
                                                          and b.VendorId = Detail.VendorId
                                                          and b.Active = 1
                                                        order by b.BidId desc)
  left outer join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  left outer join District on District.DistrictId = Budgets.DistrictId
  left outer join Users on Users.UserId = Requisitions.UserId
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  left outer join Accounts on Accounts.AccountId = UserAccounts.AccountId
  left outer join Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) when 1 then null else Detail.VendorId end
  left outer join Awards on Awards.AwardId = Detail.AwardId
  left outer join DistrictVendor on DistrictVendor.DistrictId = District.DistrictId
                                and DistrictVendor.VendorId = Vendors.VendorId
                                and DistrictVendor.Active = 1
  left outer join DistrictCategories on DistrictCategories.CategoryId = Requisitions.CategoryId
                                    and DistrictCategories.DistrictId = Budgets.DistrictId
  left outer join DistrictContacts on DistrictContacts.DistrictContactId =
    (select Top 1 DC.DistrictContactId
       from DistrictContacts DC with (nolock)
      where DC.DistrictId = District.DistrictId
        and DC.DistrictContactTypeId in(2, 5)
      order by DC.DistrictContactTypeId desc, DC.DistrictContactId)
  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId =
    case isnull(BidImports.POVendorContactId,0)
      when 0 then
		(select Top 1 VC.vendorContactId 
		   from VendorContacts VC with (nolock)
		  where VC.VendorId = Vendors.VendorId
			and VC.Active = 1
			and VC.POContact = 1
		  order by VC.VendorContactId)
	  else
	    (select Top 1 VC.vendorContactId 
		   from VendorContacts VC with (nolock)
		  where VC.VendorId = Vendors.VendorId
			and VC.Active = 1
			and VC.VendorContactId = BidImports.POVendorContactId)
    end
*/
```
