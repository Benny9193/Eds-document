# View: `dbo.vw_VendorBidInfoStats`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |
| 4 | `ItemsWon` | int | YES |  |  |
| 5 | `UPC_ISBN_Provided` | int | YES |  |  |
| 6 | `SDS_URLsProvided` | int | YES |  |  |
| 7 | `URLsProvided` | int | YES |  |  |
| 8 | `Max_URL_Duplicate_Count` | int | NO |  |  |
| 9 | `Max_Duplicate_URL` | varchar(300) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `bidresults` | USER_TABLE |
| `Vendors` | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| `dbo.uf_LowestPriceId` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_VendorBidInfoStats]
AS

Select BI.BidHeaderId, BI.BidImportId, V.Name, 
       (Select Count(*)
        from BidResults BR 
        LEFT OUTER JOIN dbo.BidRequestItems BRI ON  BRI.BIDREQUESTITEMID = BR.BIDREQUESTITEMID 
        WHERE dbo.uf_LowestPriceId(BR.BidRequestItemId) = BR.BidResultsId AND BRI.Active = 1
          and BR.BIDIMPORTID = BI.BidImportId
	    ) ItemsWon,
       (Select Count(*)
        from BidResults BR 
        LEFT OUTER JOIN dbo.BidRequestItems BRI ON  BRI.BIDREQUESTITEMID = BR.BIDREQUESTITEMID 
        WHERE dbo.uf_LowestPriceId(BR.BidRequestItemId) = BR.BidResultsId AND BRI.Active = 1
          and BR.BIDIMPORTID = BI.BidImportId
		  and Isnull(BR.UPC_ISBN,'') != ''
	    ) UPC_ISBN_Provided,
       (Select Count(*)
        from BidResults BR 
        LEFT OUTER JOIN dbo.BidRequestItems BRI ON  BRI.BIDREQUESTITEMID = BR.BIDREQUESTITEMID 
        WHERE dbo.uf_LowestPriceId(BR.BidRequestItemId) = BR.BidResultsId AND BRI.Active = 1
          and BR.BIDIMPORTID = BI.BidImportId
		  and Isnull(BR.SDS_URL,'') != ''
	    ) SDS_URLsProvided,
       (Select Count(*)
        from BidResults BR 
        LEFT OUTER JOIN dbo.BidRequestItems BRI ON  BRI.BIDREQUESTITEMID = BR.BIDREQUESTITEMID 
        WHERE dbo.uf_LowestPriceId(BR.BidRequestItemId) = BR.BidResultsId AND BRI.Active = 1
          and BR.BIDIMPORTID = BI.BidImportId
		  and Isnull(BR.ImageURL,'') != ''
	    ) URLsProvided,
		Isnull(Max_URL_Duplicate_Count,0) Max_URL_Duplicate_Count,
		Isnull(Max_Duplicate_URL,'') Max_Duplicate_URL
From BidImports BI
Join Vendors V ON V.VendorId = BI.VendorId
outer apply
(
select Top 1 Count(*) Max_URL_Duplicate_Count, ImageURL Max_Duplicate_URL 
from bidresults
where bidimportid = BI.BidImportId and isnull(imageurl,'') != ''
group by ImageURL having count(*) > 1
order by count(*) desc
) DuplicateURLs 
Where BI.Active = 1
-- and BI.BidHeaderId = 11056
```
