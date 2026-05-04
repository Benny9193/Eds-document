# View: `dbo.vw_RTK_MSDSandCC`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Active` | tinyint | YES |  |  |
| 2 | `RevisionDate` | datetime | YES |  |  |
| 3 | `AlternateDescription` | varchar(60) | YES |  |  |
| 4 | `EDSItemCode` | varchar(100) | YES |  |  |
| 5 | `ManufacturerName` | varchar(100) | YES |  |  |
| 6 | `ProductName` | varchar(100) | YES |  |  |
| 7 | `ManufacturerPartNumber` | varchar(500) | YES |  |  |
| 8 | `EPARegistrationNumber` | varchar(100) | YES |  |  |
| 9 | `MSDSId` | int | NO |  |  |
| 10 | `CurrentVersionMSDSId` | int | YES |  |  |
| 11 | `ContentCentralMSDSDocId` | varchar(36) | YES |  |  |
| 12 | `FullFileName` | varchar(520) | YES |  |  |
| 13 | `DefaultVersion` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `MSDS` | USER_TABLE |
| `vw_RTKContentCentralMSDS` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTK_MSDSandCC] as
SELECT MSDS.Active, CC.RevisionDate, MSDS.AlternateDescription, 
       CC.EDSItemCode, CC.ManufacturerName, CC.ProductName, CC.ManufacturerPartNumber, CC.EPARegistrationNumber,
       MSDS.MSDSId, MSDS.CurrentVersionMSDSId, MSDS.ContentCentralMSDSDocId, CC.FullFileName, 
       Case when Isnull(MSDS.CurrentVersionMSDSId,0)=MSDS.MSDSId Then 1 Else 0 End DefaultVersion
FROM MSDS
LEFT JOIN vw_RTKContentCentralMSDS CC ON CC.DocId = case 
                                                    when MSDS.ContentCentralMSDSDocId<>'' 
                                                    then MSDS.ContentCentralMSDSDocId 
                                                    else null 
                                                    end
```
