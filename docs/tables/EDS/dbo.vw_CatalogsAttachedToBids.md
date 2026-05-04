# View: `dbo.vw_CatalogsAttachedToBids`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |
| 2 | `BidNumber` | int | YES |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `CatalogName` | varchar(50) | YES |  |  |
| 5 | `CrossRefCount` | int | YES |  |  |
| 6 | `DatePosted` | varchar(30) | NO |  |  |
| 7 | `LastAwardDate` | varchar(30) | NO |  |  |
| 8 | `AwardWarning` | varchar(58) | YES |  |  |
| 9 | `CatalogId` | int | NO |  |  |
| 10 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 11 | `AvgDiscPercent` | money | YES |  |  |
| 12 | `CatalogDiscountComments` | varchar(512) | YES |  |  |
| 13 | `BidItemDiscountRate` | decimal(9,5) | YES |  |  |
| 14 | `BidImportId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImportCatalogList` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `crossrefs` | USER_TABLE |
| `PostCatalogHeader` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[vw_CatalogsAttachedToBids] as
SELECT Category.Name CategoryName, BH.BidHeaderId BidNumber, V.Name VendorName, CAT.Name CatalogName, 
       (select count(*) from crossrefs where catalogid=CAT.CatalogId) AS CrossRefCount, 
       (isnull(convert(varchar, POST.PostDateComplete, 100),'No Post Date')) as DatePosted,  
       (isnull(convert(varchar, Bids.DateModified, 100),'Not Awarded')) as LastAwardDate,    
       --(isnull(convert(varchar, BH.ScheduledReaward, 100),'')) as ScheduledAwardDate,
       Case 
       -- if a catalog is posted 
       When IsNull(POST.PostDateComplete,0) > 0  
       Then 
         Case
         --  if the bid was Awarded 
         When IsNull(Bids.DateModified,0) > 0      
         Then 
           Case 
           -- if the post was after the last award date
           When IsNull(POST.PostDateComplete,0) > IsNull(Bids.DateModified,0)   
           Then 
             Case 
             -- if a Re-award is scheduled
             When isnull(ScheduledReaward,0)!=0                                    
             Then 'ReAward Needed - Scheduled: ' + convert(varchar, BH.ScheduledReaward, 100)  
             Else 'ReAward Needed' 
             End
           Else ''
           End
         Else -- the bid was not awarded
           Case 
           -- if an Award is scheduled
           When isnull(ScheduledReaward,0)!=0
           Then 'Award Needed - Scheduled: ' + convert(varchar, BH.ScheduledReaward, 100)        
           Else 'Award Needed' 
           End
         End
       Else '' 
       End as AwardWarning,
       CAT.CatalogId,
       BICL.DiscountRate,
	   ( Select Avg( (100*(CatalogPrice - GrossPrice)/CatalogPrice) ) from CrossRefs Xref Where catalogid=CAT.CatalogId and catalogprice != 0 ) AvgDiscPercent, -- kjm 3/5/2020
	   BI.CatalogDiscountComments,  -- kjm 3/5/2020
	   BI.BidItemDiscountRate,      -- kjm 1/26/2024
	   BI.BidImportId               -- kjm 1/26/2024
FROM BidHeaders BH 
JOIN Category ON Category.CategoryId = BH.CategoryId
JOIN BidImports BI ON BI.BidHeaderId = BH.BidHeaderId and BI.Active = 1 
JOIN Vendors V ON V.VendorId = BI.VendorId
JOIN BidImportCatalogList BICL ON BICL.BidImportId = BI.BidImportId
JOIN Catalog CAT ON CAT.CatalogId = BICL.CatalogId
LEFT JOIN PostCatalogHeader POST ON POST.PostCatalogHeaderId = 
     (Select Top 1 PostCatalogHeaderId From PostCatalogHeader Where CatalogId = CAT.CatalogId order by PostDateComplete Desc)
LEFT JOIN Bids ON Bids.BidHeaderId = BH.BidHeaderId 
              and Bids.VendorId = BI.VendorId 
              and Bids.Active = 1 
              and Bids.VendorId != 7691 
where GETDATE() between BH.EffectiveFrom and BH.EffectiveUntil 
--order by Category.Name, BH.BidHeaderId, V.Name, CAT.Name
```
