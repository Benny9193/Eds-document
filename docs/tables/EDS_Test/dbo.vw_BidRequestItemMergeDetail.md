# View: `dbo.vw_BidRequestItemMergeDetail`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemCode` | varchar(50) | YES |  |  |
| 3 | `ItemDesc` | varchar(512) | YES |  |  |
| 4 | `BidRequestItemId` | int | NO |  |  |
| 5 | `ItemId` | int | YES |  |  |
| 6 | `BidRequest` | int | YES |  |  |
| 7 | `Active` | tinyint | YES |  |  |
| 8 | `RequisitionCount` | int | YES |  |  |
| 9 | `BidRequestAmount` | money | YES |  |  |
| 10 | `Checksum` | int | YES |  |  |
| 11 | `UnitCode` | varchar(20) | YES |  |  |
| 12 | `SortSeq` | varchar(64) | YES |  |  |
| 13 | `DistrictName` | varchar(50) | YES |  |  |
| 14 | `Heading` | varchar(308) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `District` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Keywords` | USER_TABLE |
| `Units` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
-- Temporary View created by Kevin 8-5-15
--  this view defines the fields for import to clarion of the corresponding sproc 

create   view  [dbo].[vw_BidRequestItemMergeDetail]  
AS

SELECT BRI.BidHeaderId
	  ,I.ItemCode
	  ,I.[Description] as ItemDesc
	  ,BRI.BidRequestItemId
      ,BRI.ItemId
      ,BidRequest
      ,BRI.Active
      ,RequisitionCount
      ,BidRequestAmount
      ,[Checksum]
	  ,U.Code as UnitCode
	  ,I.SortSeq
	  ,D.Name as DistrictName
	  --,dbo.uf_CrossRefs2Text(I.ItemId) CrossRefText
		-- note: the following field differs from how it is defined in BidRequestDetail (as used in the desktop version of the bid program)
       ,isnull(Headings.Title,'') + case isnull(rtrim(Keywords.Keyword),'') when '' then '' else ' - ' + rtrim(ltrim(Keywords.Keyword)) end as Heading
		-- Note this view longer matches the stored procedure "usp_BidRequestItemMergeDetail" 
		-- if re-importing to the clarion dct, will need to update   
FROM BidRequestItems BRI (nolock) Inner Join
	 BidHeaders  (nolock) BH On BRI.BidHeaderId = BH.BidHeaderId INNER JOIN
	 Items I  (nolock) On I.ItemId = BRI.ItemId INNER JOIN
	 Units U on U.UnitId = I.UnitId LEFT OUTER JOIN
	 District D on D.DistrictId = I.DistrictId LEFT OUTER JOIN
	 Headings on Headings.HeadingId = I.HeadingId LEFT OUTER JOIN
     Keywords Keywords on Keywords.KeywordId = I.KeywordId
--Where BRI.ItemId = @ItemId 
--	  And Bri.BidHeaderId = @BidHeaderId
--	  And NOT BidRequestItemId = @BidRequestItemId
```
