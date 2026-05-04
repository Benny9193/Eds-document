# Procedure: `dbo.usp_GetPODetail`

_Generated on 2026-05-04T13:04:00.714Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetPODetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-06-05 14:22:47 |
| Modified | 2025-09-11 16:06:24 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@POId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `oi` | unresolved |  |
| `oic` | unresolved |  |
| `pi` | unresolved |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `rp` | unresolved |  |
| `Units` | USER_TABLE |  |
| `VendorOrders` | USER_TABLE |  |
| `vw_ReqDetail` | VIEW |  |
| `dbo.uf_GetTrackingA` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_GetPODetail 717551465

--exec usp_GetPODetail_Test 717443521
--exec usp_GetPODetail_Test 717443510
CREATE     procedure [dbo].[usp_GetPODetail] @POId int
as
begin
/* This procedure gets the Ordered Detail for a PO along with the Stored Status of the order that came back from the Vendor */
declare @POLines	nvarchar(max),
		@POStatus	nvarchar(1024),
		@VendorId	int,
		@sslOrderNumber int

declare @POItems table (
POItemId		int identity(1,1) not null primary key,
sslOrderNumber	int null,
OrderLineId		int null,
OrderStatus			nvarchar(1024) null,
LineStatus			nvarchar(1024) null,
OrderedDescription	nvarchar(2048) null,
ShippedDescription	nvarchar(2048) null,
OrderedVendorItemCode	varchar(50) null,
ShippedVendorItemCode	varchar(50) null,
ItemCode		varchar(50) null,
UOM				varchar(50) null,
ItemTypeCode	nvarchar(50) null,
LineNumber		nvarchar(10) null,
ShipmentNumber	nvarchar(10) null,
ComponentNumber nvarchar(10) null,
CancelledReason nvarchar(255) null,
OrderedQuantity	int null,
ShippedQuantity int null,
CancelledQuantity int null,
FulfilledQuantity int null,
OrderedPrice	decimal(11,2) null,
ShippedPrice	decimal(11,2) null,
OrderedExtended decimal(11,2) null,
ShippedExtended decimal(11,2) null,
ShippedDate		datetime2 null,
Carrier			nvarchar(max) null,
WayBill			nvarchar(max) null,
TrackingURL		nvarchar(max) null)

-- Get Vendor
Select @VendorId = PO.VendorId
  from PO
 where PO.POId = @POId

-- Set Ordered Information
insert @POItems( OrderedDescription, OrderedVendorItemCode, ItemCode, UOM, OrderedQuantity, OrderedPrice, OrderedExtended)
SELECT	V.Description, V.VendorItemCode, V.ItemCode, U.Code AS UnitCode, V.Quantity, V.BidPrice, (V.Quantity * V.BidPrice) AS Extended
  FROM PO
  join PODetailItems pdi on pdi.POId = PO.POId
  join vw_ReqDetail V on v.DetailId = pdi.DetailId
  join Units U on u.UnitId = V.UnitID
 WHERE PO.POId = @POId

-- Check for School Specialty 
if @VendorId = 9
begin
	-- Get Status and Lines JSON Data
	Select top 1 @POStatus = VendorOrders.VendorStatus,
				@sslOrderNumber = json_value(VendorOrders.VendorData, '$.sslOrderNumber'),
				@POLines = json_query(VendorOrders.VendorData,'$.lines')
	  from VendorOrders
	 where VendorOrders.POId = @POId
	 order by VendorOrders.LastUpdated desc

	Select * into #orderItems
		from OpenJSON(@POLines)
				with (
					isReturnLine BIT,
					shippedLineId BIGINT,
					sslOrderNumber int,
					orderLineId BIGINT,
					lineNumber NVARCHAR(10),
					shipmentNumber NVARCHAR(10),
					componentNumber NVARCHAR(10),
					orderedSku NVARCHAR(50),
					shippedSku NVARCHAR(50),
					itemDescription nvarchar(1024),
					quantityOrdered INT,
					quantityShipped INT,
					quantityCancelled INT,
					quantityFulfilled INT,
					cancelledReason NVARCHAR(255),
					status NVARCHAR(50),
					itemTypeCode NVARCHAR(20),
					carrierName NVARCHAR(max),
					trackWayBill NVARCHAR(max),
					trackingURL NVARCHAR(max),
					shippedDate DATETIME2,
					returnableQty INT,
					price DECIMAL(18,2)) oj
    
	-- For now Delete The Return Lines
	delete oi
	  from #orderItems oi
	 where oi.isReturnLine = 1

	-- Look for Line items that have multiple shipments
	Select oi.sslOrderNumber, oi.LineNumber LineNumber, sum(oi.quantityOrdered) quantityOrdered,sum(oi.quantityShipped) quantityShipped, sum(oi.quantityCancelled) quantityCancelled, sum(oi.quantityFulfilled) quantityFulfilled,
		   string_Agg(cast(oi.carrierName as varchar(max)),'|') carrierName, string_Agg(cast(oi.trackWayBill as varchar(max)),'|') trackWayBill, string_Agg(cast(oi.trackingURL as varchar(max)),'|') trackingURL, max(oi.shippedDate) ShippedDate into #mergedRows
	  from #orderItems oi
	 group by oi.sslOrderNumber, oi.LineNumber
	 having count(*) > 1

	-- Merge Summarazied data into the first shipment of the line
	update oi
	   set quantityOrdered = mr.quantityOrdered,
	       quantityShipped = mr.quantityShipped,
		   quantityCancelled = mr.quantityCancelled,
		   quantityFulfilled = mr.quantityFulfilled,
		   carrierName = mr.carrierName,
		   trackWayBill = mr.trackWayBill,
		   trackingURL = mr.trackingURL,
		   ShippedDate = mr.shippedDate
	  from #orderItems oi
	  join #mergedRows mr on mr.LineNumber = oi.LineNumber
	 where oi.ShipmentNumber = 1

	-- Remove the other Shipments
	delete oi
	  from #orderItems oi
	  join #mergedRows mr on mr.LineNumber = oi.LineNumber
	 where oi.ShipmentNumber > 1

	select [pi].orderLineId, p.orderLineId replacementId into #replacements
	  from #OrderItems [pi]
	  outer apply (Select top 1 pr.orderLineId, pr.carrierName, pr.trackWayBill, pr.trackingURL, pr.shippedDate
	                 from #OrderItems pr
					where pr.OrderedSku = [pi].OrderedSku
					  and pr.price = 0
					  and pr.sslOrderNumber != [pi].sslOrderNumber) p
	 where p.orderLineId is not null

	-- Look for Replacement Items
	Update [pi]
	   set carrierName = coalesce([pi].carrierName,'') + coalesce('|(Replacement) ' + coalesce(pr.carrierName,''),''),
	       trackWayBill = coalesce([pi].trackWayBill,'') + coalesce('|' + pr.trackWayBill,''),
		   trackingURL = coalesce([pi].trackingURL,'') + coalesce('|' + pr.trackingURL,''),
		   shippedDate = case when coalesce([pi].shippedDate,cast('01/01/2000' as datetime2)) > coalesce(pr.ShippedDate,cast('01/01/2000' as datetime2)) then [pi].shippedDate else pr.ShippedDate end
	  from #OrderItems [pi]
	  join #Replacements r on r.orderLineId = [pi].orderLineId
	  join #OrderItems pr on pr.orderLineId = r.replacementId

	-- Delete Replacement Line
	delete rp
	  from #replacements r
	  join #OrderItems rp on rp.orderLineId = r.replacementId

	-- Look for included items and update parent-child relationship
	select oi.orderLineId, child.childId into #children
	  from #orderItems oi
	  outer apply (Select case 
	                        when oii.itemTypeCode = 'INCLUDED' then oii.orderLineId
							else null
						  end childId
					 from #orderItems oii
					where oii.lineNumber = oi.lineNumber
					  and oii.orderLineId != oi.orderLineId
					  and oii.componentNumber is not null) child
	 where oi.componentNumber is null
	   and child.childId is not null
	   
	-- Update Children Rows orderedSku to reflect parent-child
	Update oic
	   set orderedSku = trim(oi.orderedSku) + '-' + trim(oic.orderedSku)
	  from #orderItems oi
	  join #children children on children.orderLineId = oi.orderLineId
	  join #orderItems oic on oic.orderLineId = children.childId

	-- Look for Partial Ship Discontinued Items
	Select oi.orderLineId, oi.orderedSKU, di.discId into #discItems
	  from #orderItems oi
	  outer apply (select case 
							when oi.shippedSku = 'DISC-ITEM' then 
								(Select top 1 orderLineId 
								   from #orderItems oid
								  where oid.orderedSku = oi.orderedSku
									and oid.orderLineId != oi.orderLineId
								  order by orderLineId)
							else null
						  end discId) di
	 where di.discId is not null

	-- Update Ordered SKU to include Discontinued
	Update oi
	   set orderedSku = trim(oi.orderedSku) + '-Discontinued'
	  from #orderItems oi
	  join #discItems di on di.orderLineId = oi.orderLineId

	-- Look for Duplicate Items for Any Reason
	Select min(orderLineId) minOrderLineId, String_Agg(cast(oi.orderLineId as varchar),',') orderLineIds, shippedSku, 
	       sum(quantityOrdered) quantityOrdered, sum(quantityShipped) quantityShipped, sum(quantityCancelled) quantityCancelled, sum(quantityFulfilled) quantityFulfilled, 
		   string_Agg([status],',') [Status], itemTypeCode, string_Agg(carrierName,'|') carrierName, string_Agg(trackWayBill,'|') trackWayBill, string_Agg(trackingURL,'|') trackingURL, 
		   max(shippedDate) shippedDate, sum(returnableQty) returnableQty, price into #MergedItems
	  from (select top 10000 * from #OrderItems order by orderLineId) oi
	 group by shippedSku, itemTypeCode, price
	 
	-- Update First line with summarized data
	Update oi
	   set quantityOrdered = mi.quantityOrdered,
	       quantityShipped = mi.quantityShipped,
		   quantityCancelled = mi.quantityCancelled,
		   quantityFulfilled = mi.quantityFulfilled,
		   status = mi.status,
		   carrierName = mi.carrierName,
		   trackWayBill = mi.trackWayBill,
		   trackingURL = mi.trackingURL,
		   shippedDate = mi.shippedDate,
		   returnableQty = mi.returnableQty
	  from #orderItems oi
	  join #MergedItems mi on mi.minOrderLineId = oi.orderLineId

	-- delete other copies
	delete oi
	  from #orderItems oi
	 where oi.orderLineId in (Select cast(orderLineId as int) 
	                            from #MergedItems mi
								outer apply (Select value orderLineId from string_split(mi.OrderLineIds,',')) miss
							   where mi.minOrderLineId != miss.orderLineId)

	-- Handle Line level data
	Merge
	 into @POItems poi
	 using #orderItems dl
		on poi.OrderedVendorItemCode = dl.orderedSku
		when matched then
			Update set 
				sslOrderNumber = @sslOrderNumber,
				OrderStatus = @POStatus,
				OrderLineId = dl.orderLineId,
				ShippedVendorItemCode = dl.shippedSku,
				ShippedQuantity = dl.quantityShipped,
				CancelledQuantity = dl.quantityCancelled,
				FulfilledQuantity = dl.quantityFulfilled,
				ShippedPrice = dl.price,
				LineStatus = dl.[status],
				ItemTypeCode = dl.itemTypeCode,
				LineNumber = dl.lineNumber,
				ShipmentNumber = dl.shipmentNumber,
				ComponentNumber = dl.componentNumber,
				CancelledReason = dl.cancelledReason,
				Carrier = dl.carrierName,
				WayBill = dl.trackWayBill,
				TrackingURL = dl.trackingURL,
				ShippedDate = dl.shippedDate,
				OrderedExtended = OrderedPrice * OrderedQuantity,
				shippedExtended = dl.quantityShipped * dl.price
		when not matched by target then
			insert (sslOrderNumber,OrderStatus,OrderLineId,LineStatus,OrderedDescription,ShippedDescription,OrderedVendorItemCode,ShippedVendorItemCode,ItemCode,UOM,ItemTypeCode,
					LineNumber,ShipmentNumber,ComponentNumber,CancelledReason,OrderedQuantity,ShippedQuantity,CancelledQuantity,fulfilledQuantity,
					OrderedPrice,ShippedPrice,OrderedExtended,ShippedExtended,ShippedDate,Carrier,WayBill,TrackingURL)
				values(@sslOrderNumber, @POStatus, dl.orderLineId, dl.[status], null, dl.itemDescription, dl.orderedSku, dl.shippedSku, null, null, dl.itemTypeCode, dl.lineNumber, dl.shipmentNumber,
						dl.componentNumber, dl.cancelledReason, dl.quantityOrdered, dl.quantityShipped, dl.quantityCancelled, dl.quantityFulfilled,
						null, dl.price, null, dl.quantityShipped * dl.price, dl.shippedDate, dl.carrierName, dl.trackWayBill, dl.trackingURL);

		Select case when @sslOrderNumber is null then 'PO Not Received' when poil.orderLineId is null then 'Item No Longer Available' else coalesce(poil.LineStatus,'') end + case when coalesce(trim(y.Msg),'') > '' then '<br/>' + y.msg else '' end Status, coalesce(OrderedDescription,shippedDescription) Description, OrderedVendorItemCode VendorItemCode, ItemCode, UOM UnitCode, OrderedQuantity Quantity, OrderedPrice BidPrice, OrderedExtended Total
		  from @POItems poil
		  outer apply (Select string_agg(x.url,'<br/>') msg
						 from (
							Select top 1000 u.url url
							 from @POItems poi
							  outer apply (Select value url from string_split(dbo.uf_GetTrackingA(poi.Carrier,poi.WayBill,poi.TrackingURL,poi.ShippedDate),'|') ) u
							where poi.POItemId = poil.POItemId
							group by u.url
							order by u.url) x ) y
		 order by sslOrderNumber, LineNumber, ComponentNumber, POItemId
	end
	else
	begin
		Select 'PO Printed' Status, coalesce(OrderedDescription,'') Description, OrderedVendorItemCode VendorItemCode, ItemCode, UOM UnitCode, OrderedQuantity Quantity, OrderedPrice BidPrice, OrderedExtended Total
		  from @POItems poil
		 order by sslOrderNumber, LineNumber, ComponentNumber, POItemId
	end
end
```
