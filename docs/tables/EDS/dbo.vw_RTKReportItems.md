# View: `dbo.vw_RTKReportItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictName` | varchar(50) | YES |  |  |
| 2 | `Year` | int | YES |  |  |
| 3 | `SiteId` | int | YES |  |  |
| 4 | `FacilityName` | varchar(50) | YES |  |  |
| 5 | `CategoryName` | varchar(50) | YES |  |  |
| 6 | `Quantity` | int | YES |  |  |
| 7 | `ItemCode` | varchar(50) | NO |  |  |
| 8 | `ItemDescription` | varchar(512) | NO |  |  |
| 9 | `AlternateDesc` | varchar(60) | NO |  |  |
| 10 | `ManuallyEntered` | int | NO |  |  |
| 11 | `ManualEntryYesNo` | varchar(3) | NO |  |  |
| 12 | `EDSItem` | int | NO |  |  |
| 13 | `EDSItemYesNo` | varchar(3) | NO |  |  |
| 14 | `RTK_ReportItemsId` | int | NO |  |  |
| 15 | `RTK_ItemsId` | int | NO |  |  |
| 16 | `RTK_SitesId` | int | NO |  |  |
| 17 | `ItemId` | int | NO |  |  |
| 18 | `CATEGORYID` | int | YES |  |  |
| 19 | `DistrictId` | int | YES |  |  |
| 20 | `MSDSId` | int | YES |  |  |
| 21 | `ContentCentralMSDSDocId` | varchar(36) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `Items` | USER_TABLE |
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |
| `RTK_Sites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTKReportItems] as
SELECT  F.Name DistrictName, A."Year", A.RTK_SITESID SiteId, C.FacilityName, E.NAME CategoryName, A.Quantity, Isnull(B.ITEMCODE,'') ItemCode, 
        Isnull(D.DESCRIPTION,'') ItemDescription, Isnull(B.ALTERNATEDESC,'') AlternateDesc, Isnull(A.ManuallyEntered,0) ManuallyEntered, 
        Case When Isnull(A.ManuallyEntered,0)=1 Then 'Yes' Else 'No' End ManualEntryYesNo, 
        Case When Isnull(A.ItemId,0)=0 Then 0 Else 1 End EDSItem, Case When Isnull(A.ItemId,0)=0 Then 'No' Else 'Yes' End EDSItemYesNo, 
        A.RTK_ReportItemsId, Isnull(A.RTK_ITEMSID,0) RTK_ItemsId, Isnull(A.RTK_SITESID,0) RTK_SitesId, Isnull(A.ITEMID,0) ItemId, A.CATEGORYID, A.DistrictId,
        M.MSDSId, Isnull(M.ContentCentralMSDSDocId,'') ContentCentralMSDSDocId
FROM  RTK_ReportItems A 
LEFT JOIN RTK_Items B ON  A.RTK_ITEMSID =  B.RTK_ITEMSID 
LEFT JOIN RTK_Sites C ON  C.RTK_SITESID =  A.RTK_SITESID 
LEFT JOIN Items D ON  A.ITEMID =  D.ITEMID 
LEFT JOIN Category E ON  A.CATEGORYID =  E.CATEGORYID 
LEFT JOIN District F ON F.DistrictId = A.DistrictId
LEFT JOIN MSDS M ON M.MSDSId = Case When Isnull(A.MSDSId,0)!=0 Then A.MSDSId Else B.MSDSId End

/*

--SELECT  F.Name DistrictName, A."Year", A.RTK_SITESID SiteId, C.FacilityName, E.NAME CategoryName, A.Quantity, Isnull(D.ITEMCODE,'') EDSItemCode, 
SELECT  F.Name DistrictName, A."Year", A.RTK_SITESID SiteId, C.FacilityName, E.NAME CategoryName, A.Quantity, Isnull(B.ITEMCODE,'') ItemCode, 
        Isnull(D.DESCRIPTION,'') ItemDescription, Isnull(B.ALTERNATEDESC,'') AlternateDesc, Isnull(A.ManuallyEntered,0) ManuallyEntered, 
        Case When Isnull(A.ManuallyEntered,0)=1 Then 'Yes' Else 'No' End ManualEntryYesNo, 
        Case When Isnull(A.ItemId,0)=0 Then 0 Else 1 End EDSItem, Case When Isnull(A.ItemId,0)=0 Then 'No' Else 'Yes' End EDSItemYesNo, 
        A.RTK_ReportItemsId, Isnull(A.RTK_ITEMSID,0) RTK_ItemsId, Isnull(A.RTK_SITESID,0) RTK_SitesId, Isnull(A.ITEMID,0) ItemId, A.CATEGORYID, A.DistrictId  
FROM  RTK_ReportItems A 
LEFT JOIN RTK_Items B ON  A.RTK_ITEMSID =  B.RTK_ITEMSID 
LEFT JOIN RTK_Sites C ON  C.RTK_SITESID =  A.RTK_SITESID 
LEFT JOIN Items D ON  A.ITEMID =  D.ITEMID 
LEFT JOIN Category E ON  A.CATEGORYID =  E.CATEGORYID 
LEFT JOIN District F ON F.DistrictId = A.DistrictId

*/
```
