# View: `dbo.vw_VendorsTable`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `Code` | varchar(16) | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(50) | NO |  |  |
| 6 | `Address2` | varchar(50) | NO |  |  |
| 7 | `Address3` | varchar(50) | NO |  |  |
| 8 | `City` | varchar(50) | NO |  |  |
| 9 | `State` | varchar(12) | NO |  |  |
| 10 | `ZipCode` | varchar(12) | NO |  |  |
| 11 | `Phone` | varchar(25) | NO |  |  |
| 12 | `Fax` | varchar(20) | NO |  |  |
| 13 | `EMail` | varchar(255) | NO |  |  |
| 14 | `UseGrossPrices` | tinyint | YES |  |  |
| 15 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 16 | `DistrictId` | int | YES |  |  |
| 17 | `Password` | varchar(50) | YES |  |  |
| 18 | `HostURL` | varchar(255) | YES |  |  |
| 19 | `HostPort` | int | YES |  |  |
| 20 | `HostDirectory` | varchar(255) | YES |  |  |
| 21 | `HostUserName` | varchar(255) | YES |  |  |
| 22 | `HostPassword` | varchar(255) | YES |  |  |
| 23 | `UploadEMailList` | varchar(4096) | YES |  |  |
| 24 | `UploadType` | int | YES |  |  |
| 25 | `BusinessUnit` | varchar(17) | YES |  |  |
| 26 | `POPassword` | varchar(50) | YES |  |  |
| 27 | `cXMLAddress` | varchar(255) | YES |  |  |
| 28 | `Emails` | varchar(2048) | YES |  |  |
| 29 | `Phones` | varchar(2048) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vendorcontacts` | USER_TABLE |
| `dbo.uf_VendorEmails` | SQL_SCALAR_FUNCTION |
| `dbo.uf_VendorPhones` | SQL_SCALAR_FUNCTION |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_Vendorstable where code = '0961'
create   view  [dbo].[vw_VendorsTable] as
SELECT [VendorId]
      ,[Active]
      ,[Code]
      ,[Name]
      ,case when (select count(*) from (select address1 from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by address1) ssvc) > 1 then '< Multiple >' else isnull((select top 1 address1 from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [Address1]
      ,case when (select count(*) from (select address2 from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by address2) ssvc) > 1 then '< Multiple >' else isnull((select top 1 address2 from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [Address2]
      ,isnull(Vendors.address3,'') [Address3]
      ,case when (select count(*) from (select city from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by city) ssvc) > 1 then '< Multiple >' else isnull((select top 1 city from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [City]
      ,case when (select count(*) from (select state from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by state) ssvc) > 1 then '< Multiple >' else isnull((select top 1 state from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [State]
      ,case when (select count(*) from (select zipcode from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by zipcode) ssvc) > 1 then '< Multiple >' else isnull((select top 1 zipcode from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [ZipCode]
      ,case when (select count(*) from (select phone from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by phone) ssvc) > 1 then '< Multiple >' else isnull((select top 1 phone from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [Phone]
      ,case when (select count(*) from (select fax from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by fax) ssvc) > 1 then '< Multiple >' else isnull((select top 1 fax from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [Fax]
      ,case when (select count(*) from (select email from vendorcontacts vc with (nolock) where vc.vendorid = Vendors.VendorId and vc.Active = 1 group by EMail) ssvc) > 1 then '< Multiple >' else isnull((select top 1 email from vendorcontacts vc with (nolock) where vc.VendorId = Vendors.VendorId and vc.Active = 1),'') end [EMail]
      ,[UseGrossPrices]
      ,[ShippingPercentage]
      ,[DistrictId]
      ,[Password]
      ,[HostURL]
      ,[HostPort]
      ,[HostDirectory]
      ,[HostUserName]
      ,[HostPassword]
      ,[UploadEMailList]
      ,[UploadType]
      ,[BusinessUnit]
      ,[POPassword]
      ,[cXMLAddress]
      ,dbo.uf_VendorEmails(Vendors.VendorId) [Emails]
      ,dbo.uf_VendorPhones(Vendors.VendorId) [Phones]
      
  FROM [EDS].[dbo].[Vendors]
```
