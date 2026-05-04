# View: `dbo.vw_Vendors`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  |  |
| 2 | `Code` | varchar(16) | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |
| 4 | `Address1` | varchar(50) | NO |  |  |
| 5 | `Address2` | varchar(50) | NO |  |  |
| 6 | `Address3` | varchar(1) | NO |  |  |
| 7 | `City` | varchar(50) | NO |  |  |
| 8 | `State` | char(2) | NO |  |  |
| 9 | `Zipcode` | varchar(10) | NO |  |  |
| 10 | `Phone` | varchar(25) | NO |  |  |
| 11 | `Fax` | varchar(20) | NO |  |  |
| 12 | `EMail` | varchar(255) | NO |  |  |
| 13 | `ShippingPercentage` | decimal(9,5) | NO |  |  |
| 14 | `ContactInfo` | varchar(548) | YES |  |  |
| 15 | `FullName` | varchar(150) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_AVBidsVendorsCategoriesBySession`](dbo.vw_AVBidsVendorsCategoriesBySession.md) | VIEW |
| [`dbo.vw_AVVendorsExport`](dbo.vw_AVVendorsExport.md) | VIEW |
| [`dbo.vw_AwardedVendorsAllCurrentAndFutureBids`](dbo.vw_AwardedVendorsAllCurrentAndFutureBids.md) | VIEW |
| [`dbo.vw_AwardedVendorsAllCurrentBids`](dbo.vw_AwardedVendorsAllCurrentBids.md) | VIEW |
| [`dbo.vw_VendorCategoryBids`](dbo.vw_VendorCategoryBids.md) | VIEW |

## Definition

```sql
CREATE   view  [dbo].[vw_Vendors] as
 select Vendors.VendorId, 
        isnull(Vendors.Code,'') Code, 
        coalesce(Vendors.DisplayAs,Vendors.Name,'') Name,
        ISNULL(VendorContacts.Address1,'') Address1,
        ISNULL(VendorContacts.Address2,'') Address2,
        '' Address3,
        isnull(VendorContacts.City,'') City,
        isnull(VendorContacts.State,'') State,
        isnull(VendorContacts.ZipCode,'') Zipcode,
        isnull(VendorContacts.Phone,'') Phone,
        isnull(VendorContacts.Fax,'') Fax,
        isnull(VendorContacts.EMail,'') EMail,
        isnull(Vendors.ShippingPercentage,0) ShippingPercentage,
        isnull(Vendors.Name,'') +
        case ISNULL(rtrim(VendorContacts.Address1),'')
          when '' then ''
          else char(13) + char(10) + rtrim(VendorContacts.Address1)
        end + 
        case ISNULL(rtrim(VendorContacts.Address2),'')
          when '' then ''
          else char(13) + char(10) + rtrim(VendorContacts.Address2)
        end + 
        char(13) + char(10) + ISNULL(rtrim(VendorContacts.City),'') + ', ' + ISNULL(VendorContacts.State,'') + '  ' + ISNULL(VendorContacts.Zipcode,'') +
        case ISNULL(rtrim(Vendors.Phone),'')
          when '' then ''
          else char(13) + char(10) + 'Phone: ' + RTRIM(VendorContacts.Phone)
        end +
        case ISNULL(Rtrim(VendorContacts.Fax),'')
          when '' then ''
          else char(13) + char(10) + 'Fax: ' + RTRIM(VendorContacts.Fax)
        end +
        case isnull(rtrim(VendorContacts.EMail),'')
          when '' then ''
          else char(13) + char(10) + 'E-Mail: ' + rtrim(VendorContacts.EMail)
        end ContactInfo,
		VendorContacts.FullName
  from Vendors with (nolock)
  left outer join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                                and VendorContacts.VendorContactId =
     (select Top 1 vc.VendorContactId
        from VendorContacts vc with (nolock)
       where vc.VendorId = Vendors.VendorId
         and vc.Active = 1
       Order by case 
                  when isnull(vc.POContact,0) = 1 then 0 
                  else 1
                end, 
                case 
                  when ISNULL(vc.BidContact,0) = 1 then 0
                  else 1
                end, 
                vc.VendorContactId)
 where Vendors.Active = 1
   and Vendors.VendorId != 7691
```
