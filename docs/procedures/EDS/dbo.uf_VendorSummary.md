# Function: table-valued: `dbo.uf_VendorSummary`

_Generated on 2026-05-04T13:04:00.668Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_VendorSummary` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-07-17 11:59:27 |
| Modified | 2015-03-27 11:47:52 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `VendorContacts` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_districtsummary1` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function [dbo].[uf_VendorSummary](@pRSId int)
returns @VendorSummary table (
RSId	int null,
VendorId int null,
CategoryId int null,
BidHeaderId int null,
LineCount int null,
GrossCost money null,
DiscountAmount money null,
NetCost money null,
TotalLineCount int null,
TotalGrossCost money null,
TotalDiscountAmount money null,
TotalNetCost money null,
VendorName varchar(50) null,
VendorAddress varchar(500) null,
ContactInfo varchar(512) null,
BidInfo varchar(512) null,
DistrictName varchar(50) null)
 
AS
begin
declare @CategoryId int

declare CatCur cursor fast_forward read_only for
select Requisitions.CategoryId
  from ReportSessionLinks rsl
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
 group by Requisitions.CategoryId

open CatCur

fetch next from CatCur into @CategoryId

while @@fetch_status = 0
begin
  insert @VendorSummary (RSId, VendorId, CategoryId, BidHeaderId, LineCount, GrossCost, DiscountAmount, NetCost, VendorName, VendorAddress, ContactInfo, BidInfo, DistrictName)
    select ss.ListId, ss.VendorId, ss.CategoryId, ss.BidHeaderId, sum(ss.ItemCount), sum(isnull(ss.GrossCost,0)), sum(isnull(ss.DiscountAmount,0)), sum(isnull(ss.BidCost,0)),
      Vendors.Name, 
      case rtrim(isnull(VendorContacts.FullName,''))
        when '' then ''
        else VendorContacts.FullName + char(13) + char(10)
      end +
      case rtrim(isnull(VendorContacts.Address1,'')) 
        when '' then ''
        else rtrim(VendorContacts.Address1) + char(13) + char(10)
      end +
      case rtrim(isnull(VendorContacts.Address2,'')) 
        when '' then '' 
        else rtrim(VendorContacts.Address2) + char(13) + char(10)
      end + 
      rtrim(isnull(VendorContacts.City,'')) + ', ' + rtrim(isnull(VendorContacts.State,'')) + '  ' + rtrim(isnull(VendorContacts.Zipcode,'')) VendorAddress,
      case rtrim(isnull(VendorContacts.Phone,'')) 
        when '' then '' 
        else 'Phone: ' + rtrim(VendorContacts.Phone) + '  ' 
      end + 
      case rtrim(isnull(VendorContacts.Fax,'')) 
        when '' then '' 
        else 'Fax: ' + rtrim(VendorContacts.Fax) 
      end + 
      case rtrim(isnull(VendorContacts.EMail,'')) 
        when '' then '' 
        else char(13) + char(10) + 'Email: ' + rtrim(VendorContacts.EMail) end ContactInfo,
      'Ed-Data Vendor Code: ' + isnull(Vendors.Code,'') + char(13) + char(10) + 'District''s Vendor Code: ' + rtrim(isnull(DistrictVendor.Value,'________________')) + case rtrim(isnull(DistrictVendor.VendorsAccountCode,'')) when '' then '' else char(13) + char(10) + 'Vendor''s Account Code: ' + rtrim(DistrictVendor.VendorsAccountCode) end + char(13) + char(10) + 'Ed-Data Bid #: ' + convert(varchar(16),ss.BidHeaderId) + case isnull((Select top 1 Bids.VendorBidNumber from Bids where Bids.BidHeaderId = ss.BidHeaderId and Bids.VendorId = ss.VendorId and Bids.Active = 1 order by Bids.BidId desc),'') when '' then '' else char(13) + char(10) + 'Vendor Bid Number: ' + (Select top 1 Bids.VendorBidNumber from Bids where Bids.BidHeaderId = ss.BidHeaderId and Bids.VendorId = ss.VendorId and Bids.Active = 1 order by Bids.BidId desc) end BidInfo,
      isnull(District.Name,'')
      from (
        select ListId, DistrictId, VendorId, CategoryId, BidHeaderId, count(ItemCode) ItemCount, case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) end GrossCost, case UseGrossPrices when 0 then 0 else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100 end DiscountAmount, case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) - (sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100) end BidCost
          from dbo.uf_districtsummary1(@pRSId, @CategoryId)
         where VendorId != 7691
         group by ListId, DistrictId, VendorId, CategoryId, BidHeaderId, DiscountRate, UseGrossPrices) ss
     join Vendors on Vendors.VendorId = ss.VendorId
     join BidImports on BidImports.VendorId = ss.VendorId
                    and BidImports.BidHeaderId = ss.BidHeaderId
                    and BidImports.Active = 1
     left outer join VendorContacts on VendorContacts.VendorContactId = 
       case isnull(BidImports.POVendorContactId,0)
         when 0 then
		   (select top 1 vc.VendorContactId
			  from VendorContacts vc with (nolock)
			 where vc.VendorId = Vendors.VendorId
			   and vc.Active = 1
			 order by Vc.POContact desc, vc.VendorContactId)
	     else
		   (select top 1 vc.VendorContactId
			  from VendorContacts vc with (nolock)
			 where vc.VendorId = Vendors.VendorId
			   and vc.Active = 1
			   and vc.VendorContactId = BidImports.POVendorContactId)
       end	     
     join District on District.DistrictId = ss.DistrictId
     left outer join DistrictVendor on DistrictVendor.DistrictId = ss.DistrictId
                                   and DistrictVendor.VendorId = ss.VendorId
                                   and DistrictVendor.Active = 1
     group by ss.ListId, ss.DistrictId, ss.VendorId, ss.CategoryId, ss.BidHeaderId,
              Vendors.Name, VendorContacts.FullName, VendorContacts.Address1, VendorContacts.Address2, VendorContacts.City, VendorContacts.State, VendorContacts.Zipcode, VendorContacts.Phone, VendorContacts.Fax, VendorContacts.EMail, Vendors.Code,
              DistrictVendor.Value, DistrictVendor.VendorsAccountCode, isnull(District.Name,'')

  fetch next from CatCur into @CategoryId
end

close CatCur
deallocate CatCur

  Update @VendorSummary
     set TotalLineCount = ss.TotalLineCount,
         TotalGrossCost = ss.TotalGrossCost,
         TotalDiscountAmount = ss.TotalDiscountAmount,
         TotalNetCost = ss.TotalNetCost
    from @VendorSummary ds
    join (
      select RSId, BidHeaderId, sum(LineCount) TotalLineCount, sum(GrossCost) TotalGrossCost,
             sum(DiscountAmount) TotalDiscountAmount, sum(NetCost) TotalNetCost
        from @VendorSummary
       group by RSId, BidHeaderId
         ) ss on ss.RSId = ds.RSId and ss.BidHeaderId = ds.BidHeaderId 

return
end
```
