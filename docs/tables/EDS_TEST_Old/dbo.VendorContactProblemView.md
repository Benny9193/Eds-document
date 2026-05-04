# View: `dbo.VendorContactProblemView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorName` | varchar(50) | YES |  |  |
| 2 | `CODE` | varchar(16) | YES |  |  |
| 3 | `ErrorMessage` | varchar(270) | NO |  |  |
| 4 | `BidContactCount` | int | YES |  |  |
| 5 | `POContactCount` | int | YES |  |  |
| 6 | `FULLNAME` | varchar(150) | YES |  |  |
| 7 | `EMAIL` | varchar(255) | YES |  |  |
| 8 | `BIDCONTACT` | tinyint | YES |  |  |
| 9 | `POCONTACT` | tinyint | YES |  |  |
| 10 | `VENDORID` | int | NO |  |  |
| 11 | `VENDORCONTACTID` | int | YES |  |  |
| 12 | `Active` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.IsValidEmail` | SQL_SCALAR_FUNCTION |
| [`dbo.VendorContacts`](dbo.VendorContacts.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
/*order by A.Name, B.Email */
create   view  [dbo].[VendorContactProblemView]
AS
SELECT  A.NAME VendorName, A.CODE,
        CASE 
        WHEN VendorContactId IS NOT NULL THEN 
          CASE
          WHEN IsNull(B.EMAIL,'')='' THEN 'Missing Email'
          WHEN IsNull(B.EMAIL,'')<>'' AND dbo.IsValidEmail(IsNull(B.EMAIL,''))=0 THEN 'Invalid Email: ' + IsNull(B.EMAIL,'')
          ELSE ''
          END
        ELSE 'Missing Contact'
        END ErrorMessage,
       (SELECT COUNT(*) 
        FROM dbo.VendorContacts VC1 
        WHERE VC1.VendorId = A.VendorId  AND Isnull(VC1.Active,0)=1 AND Isnull(VC1.BidContact,0)=1
        ) BidContactCount,
       (SELECT COUNT(*) 
        FROM dbo.VendorContacts VC2 
        WHERE VC2.VendorId = A.VendorId  AND Isnull(VC2.Active,0)=1 AND Isnull(VC2.POContact,0)=1
        ) POContactCount,
        B.FULLNAME, B.EMAIL, B.BIDCONTACT, B.POCONTACT,
        A.VENDORID, 
        B.VENDORCONTACTID, 
        A.Active
FROM dbo.Vendors A
LEFT OUTER join dbo.VendorContacts B ON B.VendorId = A.VendorId AND Isnull(B.Active,0)=1
WHERE (Isnull(A.Active,0)=1)
```
