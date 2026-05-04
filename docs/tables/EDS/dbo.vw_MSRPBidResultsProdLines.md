# View: `dbo.vw_MSRPBidResultsProdLines`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 2 | `BidMSRPResultsId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `ProdLineOrWriteIn` | varchar(100) | NO |  |  |
| 5 | `WriteInProductLineFlag` | tinyint | YES |  |  |
| 6 | `BidRequestProductLineId` | int | YES |  |  |
| 7 | `BidRequestOptionId` | int | YES |  |  |
| 8 | `MSRPOptionId` | int | YES |  |  |
| 9 | `OptionName` | varchar(50) | YES |  |  |
| 10 | `WeightedDiscount` | decimal(9,5) | YES |  |  |
| 11 | `Modified` | datetime | YES |  |  |
| 12 | `SortKey` | varchar(512) | YES |  |  |
| 13 | `ManufacturerProductLineId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResultsProductLines` | USER_TABLE |
| `BidRequestProductLines` | USER_TABLE |
| [`dbo.ManufacturerProductLines`](dbo.ManufacturerProductLines.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrMSRP2VendorReportView`](dbo.BidMgrMSRP2VendorReportView.md) | VIEW |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](dbo.BidMgrMSRP2VendorReportViewTemp.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPBidResultsProdLines]
AS
SELECT BidResPL.BidMSRPResultsProductLineId,
       BidResPL.BidMSRPResultsId,
       BidResPL.Active,
       ISNULL(ltrim(rtrim(upper( case when BidResPL.WriteInProductLineFlag=1 then BidResPL.WriteInProductLineName else ManufPL.Name end ))),'') ProdLineOrWriteIn, 
       BidResPL.WriteInProductLineFlag,
       BidResPL.BidRequestProductLineId,
      -- BidResPL.WriteInProductLineName,
       BidResPL.BidRequestOptionId,
       BidResPL.MSRPOptionId,
       BidResPL.OptionName,
       BidResPL.WeightedDiscount,
       BidResPL.Modified,
       cast(
       cast(case ISNULL(ltrim(rtrim(upper( case when BidResPL.WriteInProductLineFlag=1 then BidResPL.WriteInProductLineName else ManufPL.Name end ))),'') when 'ALL' then 0 else 1 end as CHAR(1)) + 
       ISNULL(ltrim(rtrim(upper( case when BidResPL.WriteInProductLineFlag=1 then BidResPL.WriteInProductLineName else ManufPL.Name end ))),'') + 
       isnull(ltrim(rtrim(upper(  BidResPL.OptionName  ))),'') as varchar(512)) as SortKey,
       Isnull(BidResPL.ManufacturerProductLineId,0) ManufacturerProductLineId
  FROM BidMSRPResultsProductLines BidResPL
  LEFT JOIN BidRequestProductLines BidReqPL ON BidReqPL.BidRequestProductLineId = BidResPL.BidRequestProductLineId
  LEFT JOIN dbo.ManufacturerProductLines ManufPL ON ManufPL.ManufacturerProductLineId = BidReqPL.ManufacturerProductLineId
--  where [BidMSRPResultsId]=18809
```
