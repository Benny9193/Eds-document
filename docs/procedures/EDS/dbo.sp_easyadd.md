# Procedure: `dbo.sp_easyadd`

_Generated on 2026-05-04T14:49:07.263Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_easyadd` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2013-05-22 14:41:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@pItemCode` | IN | varchar(25) |  |
| 4 | `@pCatalogId` | IN | varchar(255) |  |
| 5 | `@pQuantity` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `dbo.sp_ReqAdd` | SQL_STORED_PROCEDURE |  |
| `dbo.uf_LookupItemCodeByReq` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE            PROCEDURE [dbo].[sp_easyadd] @pSessionId int, @pRequisitionId int, @pItemCode varchar(25), @pCatalogId varchar(255), @pQuantity int AS

declare @ReturnValue int,
	@ItemId int,
	@DistrictId int,
	@DetailId int,
	@CategoryId int,
	@CatalogId int,
        @BudgetAccountId int,
	@BidHeaderId int,
	@TotalCost money,
	@TodaysDate datetime,
	@paddedItemCode varchar(16),
	@ItemCount int,
	@VendorId int,
	@DistrictVendorCode varchar(50),
	@BrowserFormPost varchar(255),
	@ReturnMsg varchar(1024),
	@CatalogName varchar(50),
	@VendorName varchar(50),
	@UseEDSVendorCodes tinyint

--BEGIN TRANSACTION
set transaction isolation level read uncommitted

select @ReturnValue = 0
select @CatalogId = ISNULL(convert(int,@pCatalogId),0)
select @TodaysDate = getdate()

select @DistrictId = DistrictId
  from SessionTable with (nolock)
 where SessionId = @pSessionId

if @@rowcount = 0
begin
  select @ReturnValue = 0
end
else
begin
  select @CategoryId = CategoryId,
         @BudgetAccountId = BudgetAccountId,
         @BidHeaderId = isnull(BidHeaderId,0)
    from Requisitions with (nolock)
   where RequisitionId = @pRequisitionId

  if @@rowcount = 0
  begin
    select @ReturnValue = 2,
           @ReturnMsg = 'Unable to Locate Requisition in System'
  end
  else
  begin
    if @CatalogId > 0
    begin
      select @CatalogId = CatalogId,
             @CatalogName = Name
        from Catalog with (nolock)
       where CatalogId = @CatalogId

      if @@rowcount = 0
      begin
        select @ReturnValue = 3,
               @ReturnMsg = 'Unable to Locate specified Catalog in System'
      end
    end

    if @ReturnValue = 0
    begin
      update SessionTable
         set CatalogId = @CatalogId
       where SessionId = @pSessionId
    end

--    if @ReturnValue = 0 and @CatalogId = 0
--    begin
--      exec sp_EDSItems @pItemCode, @CategoryId, @DistrictId, @ReturnValue output, @ItemId output
--    end
--    else
--    if @ReturnValue = 0 and @CatalogId > 0
--    begin
      select @ItemId = isnull(lp.ItemId,0),
             @ItemCount = lp.ItemCount,
             @VendorId = lp.VendorId,
             @VendorName = lp.VendorName
        from dbo.uf_LookupItemCodeByReq(@pRequisitionId, @pItemCode, @CatalogId) lp
--        from dbo.uf_LookupItemCodeByBH(@pItemCode, @CategoryId, @CatalogId, @BidHeaderId) lp
--        from dbo.uf_LookupItemCode(@pItemCode, @CategoryId, @CatalogId, @TodaysDate, 0, @DistrictId) lp

--      print 'Item Code = ''' + @pItemCode + ''' Category = ' + convert(varchar(16),@CategoryId) + ' Catalog = ' + convert(varchar(16),@CatalogId) + ' Date=' + convert(varchar(32),@TodaysDate,101) + ' DistrictId = ' + convert(varchar(16),@DistrictId)

--    end
    if @@rowcount = 0 or @ItemCount = 0
    begin
      select @ReturnValue = 4,
             @ReturnMsg = 'The Item "' + isnull(rtrim(@pItemCode),'') + '" does not exist in the "' + isnull(@CatalogName,'Unspecified') + '" Catalog.'
    end

    if @ItemCount > 1
    begin
      print 'Item Count = ' + convert(varchar(16),@ItemCount)
      select @ReturnValue = 5,
             @ReturnMsg = 'The Item "' + isnull(rtrim(@pItemCode),'') + '" has ' + cast(isnull(@ItemCount,0) as varchar(16)) + ' references in the "' + isnull(@CatalogName,'Unspecified') + '" Catalog.'
    end

    if @ReturnValue = 0 and @ItemId = 0
    begin
      select @ReturnValue = 4,
             @ReturnMsg = 'The Item "' + isnull(rtrim(@pItemCode),'') + '" does not exist in the "' + isnull(@CatalogName,'Unspecified') + '" Catalog.'
    end

    if @ReturnValue = 0
    begin
      select @UseEDSVendorCodes = isnull(District.UseEDSVendorCodes,0)
        from District
       where District.DistrictId = @DistrictId
       
      select @BrowserFormPost = BrowserFormPost
        from CXmlSession
       where SessionId = @pSessionId

      if @@rowcount != 0 and
         isnull(@BrowserFormPost,'') != '' and
         @VendorId != 7691 and
         @UseEDSVendorCodes = 0
      begin
        select @DistrictVendorCode = isnull(DistrictVendor.Value,'')
          from DistrictVendor
         where DistrictId = @DistrictId
           and VendorId = @VendorId
           and Active = 1

        if @@rowcount = 0 or
           isnull(@DistrictVendorCode,'') = ''
        begin
          select @ReturnValue = 6,
                 @ReturnMsg = 'The Item "' + isnull(rtrim(@pItemCode),'') + '" is Awarded to Vendor "' + isnull(@VendorName,'Not Bid') + '" which does not have a District Vendor Code associated with it. Please contact your District Accounting and have them provide this code to EDS. Once this has been updated you will be able to order items from this vendor.'
        end
        else
        begin
          exec dbo.sp_ReqAdd @pRequisitionId, @pQuantity, @ItemId, @DistrictId, @BudgetAccountId, @CatalogId, @pSessionId
        end
      end
      else
      begin
        exec dbo.sp_ReqAdd @pRequisitionId, @pQuantity, @ItemId, @DistrictId, @BudgetAccountId, @CatalogId, @pSessionId
      end
    end
  end
end

select ISNULL(@ReturnValue,0) as RetVal, isnull(@ReturnMsg,'Item Selected OK') as RetMsg

--COMMIT TRANSACTION
```
