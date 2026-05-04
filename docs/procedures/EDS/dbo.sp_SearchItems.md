# Procedure: `dbo.sp_SearchItems`

_Generated on 2026-05-04T13:04:00.450Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SearchItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-11-12 21:58:36 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pCategoryId` | IN | varchar(255) |  |
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
| `dbo.SessionTable` | USER_TABLE |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE                 PROCEDURE sp_SearchItems @pSessionId varchar(255), @pCategoryId varchar(255), @pSearchData varchar(255), @pCatalogId varchar(255), @pOrderBy varchar(255) AS

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
  if CONVERT(int,@pCatalogId) = 999999 -- All Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  if CONVERT(int,@pCatalogId) = 999998 -- Old Ed-Data Specific
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
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
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
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
  if CONVERT(int,@pCatalogId) = 999999 -- All Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.CrossRefs.VendorItemCode = @pSearchData
       ORDER BY dbo.CrossRefs.VendorItemCode,dbo.NewFF.ItemCode
    end
    else
    begin
      RAISERROR('Invalid Order By Specified. Order By = %s',16,1,@pOrderBy)
    end
  end
  else
  if CONVERT(int,@pCatalogId) = 999998 -- Old Ed-Data Bid Items
  begin
    if CONVERT(int,@pOrderBy) = 1
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND dbo.NewFF.AwardId <> 0
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
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
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.NewFF.ItemCode = right('        ' + @pSearchData,8)
       ORDER BY dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 2
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId        JOIN dbo.Items on dbo.Items.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND FREETEXT(dbo.Items.Description,@pSearchData)
       ORDER BY dbo.NewFF.Description,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 3
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
         AND dbo.NewFF.Page = right('    ' + rtrim(dbo.uf_RemoveLeadingZeros(@pSearchData)),4)
       ORDER BY dbo.NewFF.Page,dbo.NewFF.ItemCode
    end
    else
    if CONVERT(int,@pOrderBy) = 4
    begin
      SELECT dbo.NewFF.ItemId, dbo.NewFF.ItemCode, dbo.NewFF.Description, dbo.NewFF.Code, ISNULL(dbo.NewFF.CatalogPrice,0) CatalogPrice, dbo.NewFF.Page, ISNULL(dbo.NewFF.BidPrice,0) BidPrice, dbo.NewFF.Name, dbo.NewFF.VendorName, dbo.NewFF.VendorItemCode
        FROM dbo.NewFF
        JOIN dbo.SessionTable on dbo.SessionTable.DistrictId = dbo.NewFF.DistrictId
        JOIN dbo.CrossRefs on dbo.CrossRefs.ItemId = dbo.NewFF.ItemId
       WHERE dbo.SessionTable.SessionId = CONVERT(int,@pSessionId)
         AND dbo.NewFF.CategoryId = CONVERT(int,@pCategoryId)
         AND (   (@CatalogId = 0 and dbo.NewFF.CatalogId = @CatalogId)
              OR (@CatalogId != 0 and dbo.NewFF.ParentCatalogId = @CatalogId))
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
