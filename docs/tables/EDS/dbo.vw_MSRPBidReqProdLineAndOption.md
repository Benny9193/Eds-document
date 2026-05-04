# View: `dbo.vw_MSRPBidReqProdLineAndOption`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidRequestManufacturerId` | int | NO |  |  |
| 3 | `ManufacturerId` | int | YES |  |  |
| 4 | `ManufacturerName` | varchar(100) | YES |  |  |
| 5 | `BidRequestProductLineId` | int | NO |  |  |
| 6 | `ManufacturerProductLineId` | int | YES |  |  |
| 7 | `ProductLineName` | varchar(100) | YES |  |  |
| 8 | `BidRequestoptionId` | int | NO |  |  |
| 9 | `OptionName` | varchar(50) | YES |  |  |
| 10 | `SortKey` | varchar(512) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.BidRequestOptions`](dbo.BidRequestOptions.md) | USER_TABLE |
| [`dbo.BidRequestProductLines`](dbo.BidRequestProductLines.md) | USER_TABLE |
| [`dbo.ManufacturerProductLines`](dbo.ManufacturerProductLines.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from [MSRPBidRequestView] order by SortKey

/* and BRManuf.BidHeaderId = 5785 -- and BRManuf.BidRequestManufacturerId = 3582*/
create   view  [dbo].[vw_MSRPBidReqProdLineAndOption]
AS
SELECT BRManuf.BidHeaderId, 
       BRManuf.BidRequestManufacturerId, BRManuf.ManufacturerId, ltrim(rtrim(Manufacturers.Name)) ManufacturerName,
       BRProdLin.BidRequestProductLineId, BRProdLin.ManufacturerProductLineId, ltrim(rtrim(ManufacturerProductLines.Name)) ProductLineName,
       BROpt.BidRequestoptionId, ltrim(rtrim(BROpt.Name)) OptionName, cast(right('000000' + cast(isnull(BRManuf.BidHeaderId,0) as varchar),6) + isnull(ltrim(rtrim(upper(Manufacturers.Name))),'') + cast(case ISNULL(ltrim(rtrim(upper(ManufacturerProductLines.Name))),'') when 'ALL' then 0 else 1 end as CHAR(1)) + ISNULL(ltrim(rtrim(upper(ManufacturerProductLines.Name))),'') + isnull(ltrim(rtrim(upper(BROpt.Name))),'') as varchar(512)) as SortKey
FROM dbo.BidRequestManufacturer BRManuf      
JOIN dbo.Manufacturers ON Manufacturers.ManufacturerId = BRManuf.ManufacturerId 
                        --      and dbo.Manufacturers.Name != '(WRITEINS)'    -- removed 9-16-14 kjm
JOIN dbo.BidRequestProductLines BRProdLin ON BRProdLin.BidRequestManufacturerId = BRManuf.BidRequestManufacturerId
                                     and Isnull(BRProdLin.Active,0)=1
JOIN dbo.ManufacturerProductLines ON ManufacturerProductLines.ManufacturerProductLineId = BRProdLin.ManufacturerProductLineId 
JOIN dbo.BidRequestOptions BROpt ON BROpt.BidRequestProductLineId = BRProdLin.BidRequestProductLineId
                                     --and Isnull(BROpt.Active,0)=1
where BRManuf.Active = 1 
-- and BRManuf.BidHeaderId = 5785 
-- and BRManuf.BidRequestManufacturerId = ####
```
