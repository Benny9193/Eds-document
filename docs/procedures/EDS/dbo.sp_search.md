# Procedure: `dbo.sp_search`

_Generated on 2026-05-04T13:04:24.183Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_search` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pRequisitionId` | IN | varchar(255) |  |
| 3 | `@pSearchData` | IN | varchar(255) |  |
| 4 | `@pCatalogId` | IN | varchar(255) |  |
| 5 | `@pOrderBy` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SessionTable` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.NewFF` | unresolved |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.SessionTable` | USER_TABLE |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE                    PROCEDURE sp_search @pSessionId varchar(255), @pRequisitionId varchar(255), @pSearchData varchar(255), @pCatalogId varchar(255), @pOrderBy varchar(255) AS

declare @CatalogId int

select @CatalogId = convert(int,isnull(@pCatalogId,'0'))

UPDATE SessionTable
   SET SessionLast = GetDate()
 WHERE SessionId = CONVERT(int,@pSessionId)
   AND SessionEnd is null
if @@rowcount = 0
begin
  RAISERROR('Invalid Session or Session has Timed Out',16,1)
end

if @pSearchData = ''
begin
  if @CatalogId = 999999 -- All Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  if @CatalogId = 999998 -- Old Ed-data Bid Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  begin
    -- Catalog Specific
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.CrossRefs.CatalogId = @CatalogId
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
end
else
begin
  if @CatalogId = 999999 -- All Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.CrossRefs.VendorItemCode = @pSearchData
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  if @CatalogId = 999998 -- Old Ed-Data Bid Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND dbo.NewFF.AwardId <> 0
         AND dbo.CrossRefs.VendorItemCode = @pSearchData
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  begin
    -- Catalog Specific
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
/*      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.CrossRefs.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.CrossRefs.VendorItemCode = @pSearchData
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
*/
      SELECT top 20 dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Requisitions on dbo.Requisitions.CategoryId = dbo.NewFF.CategoryId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.Requisitions.RequisitionId = CONVERT(int,@pRequisitionId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.CrossRefs.CatalogId = @CatalogId))
         AND dbo.CrossRefs.VendorItemCode = @pSearchData
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
end
```
