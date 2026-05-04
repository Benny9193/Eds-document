# Procedure: `dbo.usp_StoreVendorOrder`

_Generated on 2026-05-04T13:07:57.812Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_StoreVendorOrder` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-06-06 19:51:03 |
| Modified | 2025-07-25 11:35:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@VendorId` | IN | int |  |
| 2 | `@POId` | IN | int |  |
| 3 | `@VendorData` | IN | nvarchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `VendorOrders` | USER_TABLE |  |
| `dbo.uf_GetTrackingA` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_StoreVendorOrder] @VendorId int, @POId int, @VendorData nvarchar(max)
as
begin
declare @VendorOrderId int
declare @POLines	nvarchar(max),
		@POStatus	nvarchar(1024),
		@RetMsg		nvarchar(max)

	select @RetMsg = ''

	Insert VendorOrders(VendorId, POId, lastUpdated, VendorData)
	values(@VendorId, @POId, getdate(), @VendorData)

	Select @VendorOrderId = scope_identity()

	-- Check for School Specialty 
	if @VendorId = 9
	begin
		-- Get Status JSON Data
		Select top 1 @POStatus = json_Value(VendorOrders.VendorData, '$.status'),
					@POLines = json_query(VendorOrders.VendorData,'$.lines')
		  from VendorOrders
		 where VendorOrders.POId = @POId
		 order by VendorOrders.LastUpdated desc

	    if @@ROWCOUNT = 0
		begin
			Select @RetMsg = 'Order Not Found'
		end
		else
		begin
			 Select @RetMsg = string_Agg(url,'<br/>')
			   from (
				Select top 1000 cn.Value url
				  from OpenJSON(@POLines)
							with (
								carrierName NVARCHAR(255),
								trackWayBill NVARCHAR(255),
								trackingURL NVARCHAR(500),
								shippedDate datetime2) oj
				  outer apply (Select value from string_split(dbo.uf_GetTrackingA(oj.carrierName,oj.trackWayBill,oj.TrackingURL,oj.shippedDate),'|')) cn
				where coalesce(trim(oj.carrierName),'') > ''
				group by cn.Value
				order by cn.Value) x
        end
		Select @RetMsg = coalesce(trim(@POStatus),'') + case when coalesce(trim(@RetMsg),'') = '' then '' else ' - Shipped Via<br/>' + @RetMsg end 

	end

	-- Update Order Status in PO Row
	Update VendorOrders
		set VendorStatus = @RetMsg
	  from VendorOrders with (updlock,rowlock)
	 where VendorOrders.VendorOrderId = @VendorOrderId

	Select @RetMsg Status
end
```
