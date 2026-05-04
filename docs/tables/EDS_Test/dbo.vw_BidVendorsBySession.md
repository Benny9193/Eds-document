# View: `dbo.vw_BidVendorsBySession`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `VendorBidComments` | varchar(1541) | NO |  |  |
| 4 | `VendorCountyBidComments` | varchar(1) | NO |  |  |
| 5 | `BidHeaderId` | int | YES |  |  |
| 6 | `BidCounty` | varchar(50) | NO |  |  |
| 7 | `BidState` | varchar(50) | YES |  |  |
| 8 | `AwardType` | varchar(15) | NO |  |  |
| 9 | `VendorCode` | varchar(16) | NO |  |  |
| 10 | `VendorName` | varchar(50) | YES |  |  |
| 11 | `ContactName` | varchar(150) | NO |  |  |
| 12 | `ContactPhone` | varchar(25) | NO |  |  |
| 13 | `ContactFax` | varchar(20) | NO |  |  |
| 14 | `ContactEmail` | varchar(255) | NO |  |  |
| 15 | `Address1` | varchar(50) | NO |  |  |
| 16 | `Address2` | varchar(50) | NO |  |  |
| 17 | `City` | varchar(50) | NO |  |  |
| 18 | `State` | char(2) | NO |  |  |
| 19 | `Zipcode` | varchar(10) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_BidVendorsBySession] as
select SessionTable.SessionId, BidImports.BidImportId, 
       isnull(BidImports.Comments,'') +
       case 
         when isnull(BidImports.Comments,'') != '' and isnull(BidImports.CatalogDiscountComments,'') != '' then '<br/>'
         else ''
       end + isnull(BidImports.CatalogDiscountComments,'') VendorBidComments,
       '' VendorCountyBidComments,
       BidHeaders.BidHeaderId, Counties.Name BidCounty, States.Name BidState,
       case (select count(*) from Bids b with (nolock) where b.BidHeaderId = BidHeaders.BidHeaderId and b.VendorId != 7691 and b.Active = 1) when 0 then 'No Awards' when 1 then 'Total Award' else 'Line Item Award' end AwardType,
       isnull(Vendors.Code,'') VendorCode, coalesce(Vendors.DisplayAs,Vendors.Name,'') VendorName, 
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactName 
                else VendorContacts.FullName
              end,'') ContactName,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactPhone
                else VendorContacts.Phone
              end,'') ContactPhone,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactFax
                else VendorContacts.Fax
              end,'') ContactFax,
       isnull(case isnull(BidImports.UseVendorContactInfo,0) 
                when 0 then BidImports.ContactEmail
                else VendorContacts.EMail
              end,'') ContactEmail,
       isnull(VendorContacts.Address1,'') Address1,
       isnull(VendorContacts.Address2,'') Address2,
       isnull(VendorContacts.City,'') City,
       isnull(VendorContacts.State,'') State,
       isnull(VendorContacts.Zipcode,'') Zipcode
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join States on States.code = District.State
  join Counties on Counties.Name = District.County
               and Counties.StateId = States.StateId
  join BidHeaders on BidHeaders.StateId = States.StateId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3, 4)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.VendorId != 7691
           and Bids.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
  left outer join BidImports on BidImports.BidImportId = Bids.BidImportId
  left outer join VendorContacts on VendorContacts.VendorContactId =
    (select Top 1 VendorContactId
       from VendorContacts vc with (nolock)
      where vc.VendorId = Vendors.VendorId
        and vc.POContact = 1
      order by vc.VendorContactId)
 where BidHeaders.Active = 1
```
