# View: `dbo.vw_ActiveVendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `Code` | varchar(16) | YES |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Address1` | varchar(50) | YES |  |  |
| 6 | `Address2` | varchar(50) | YES |  |  |
| 7 | `Address3` | varchar(50) | YES |  |  |
| 8 | `City` | varchar(25) | YES |  |  |
| 9 | `State` | varchar(2) | YES |  |  |
| 10 | `ZipCode` | varchar(10) | YES |  |  |
| 11 | `Phone` | varchar(20) | YES |  |  |
| 12 | `Fax` | varchar(20) | YES |  |  |
| 13 | `EMail` | varchar(255) | YES |  |  |
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
| 28 | `VendorLogo` | varbinary(max) | YES |  |  |
| 29 | `cXMLFromDomain` | varchar(50) | YES |  |  |
| 30 | `cXMLFromIdentity` | varchar(50) | YES |  |  |
| 31 | `cXMLToDomain` | varchar(50) | YES |  |  |
| 32 | `cXMLToIdentity` | varchar(50) | YES |  |  |
| 33 | `cXMLSenderDomain` | varchar(50) | YES |  |  |
| 34 | `cXMLSenderIdentity` | varchar(50) | YES |  |  |
| 35 | `cXMLSenderSharedSecret` | varchar(50) | YES |  |  |
| 36 | `rowguid` | uniqueidentifier | NO |  |  |
| 37 | `Contact` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `VendorCategoryPP` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ActiveVendors]
as
select *, case when Vendors.Address1 like 'Attn:%' then rtrim(ltrim(substring(Vendors.Address1,6,LEN(Vendors.Address1)-5))) when Vendors.Address2 like 'Attn:%' then rtrim(ltrim(substring(Vendors.Address2,6,LEN(Vendors.Address2)-5))) else '' end Contact
  from Vendors with (nolock)
 where Vendors.Active = 1
   and isnull(Vendors.Code,'') != ''
   and Vendors.VendorId != 7691
   and substring(Vendors.Code,1,1) not in ('T','F')
   and Vendors.VendorId IN (select vc.VendorId
                              from VendorCategoryPP vc with (nolock)
                              join Category c on c.CategoryId = vc.CategoryId
                                             and c.Type != 2
                              join Vendors v on v.VendorId = vc.VendorId
                              join District on District.DistrictId = case isnull(vc.DistrictId,0) when 0 then District.DistrictId else vc.DistrictId end
                             group by vc.VendorId)
```
