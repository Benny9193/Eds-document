# View: `dbo.UserContactProblemView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserName` | varchar(10) | YES |  |  |
| 2 | `Attention` | varchar(50) | YES |  |  |
| 3 | `ErrorMessage` | varchar(270) | NO |  |  |
| 4 | `DistrictName` | varchar(50) | YES |  |  |
| 5 | `DistrictId` | int | NO |  |  |
| 6 | `RepName` | varchar(30) | YES |  |  |
| 7 | `CSRepId` | int | NO |  |  |
| 8 | `Active` | tinyint | YES |  |  |
| 9 | `SchoolId` | int | YES |  |  |
| 10 | `UserId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CSRep`](dbo.CSRep.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| `dbo.IsValidEmail` | SQL_SCALAR_FUNCTION |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
/*order by A.Name, B.Email */
create   view  [dbo].[UserContactProblemView]
AS
SELECT  A.UserName, A.Attention,
        CASE
        WHEN IsNull(A.EMAIL,'')='' THEN 'Missing Email'
        WHEN IsNull(A.EMAIL,'')<>'' AND dbo.IsValidEmail(IsNull(A.EMAIL,''))=0 THEN 'Invalid Email: ' + IsNull(A.EMAIL,'')
        --WHEN IsNull(A.EMAIL,'') like 'one@test.com' AND dbo.IsValidEmail(IsNull(A.EMAIL,''))=0 THEN 'Fake Email: ' + IsNull(A.EMAIL,'')
        ELSE ''
        END ErrorMessage,
        B.Name DistrictName, 
        B.DistrictId,
        C.Name RepName, 
        C.CSRepId,
        A.Active,
        A.SchoolId,
        A.UserId
FROM dbo.Users A
join dbo.District B ON B.DistrictId = A.DistrictId 
join dbo.CSRep C ON C.CSRepId = B.CSRepId
WHERE (Isnull(A.Active,0)=1) and (Isnull(B.Active,0)=1)  
        -- and b.districtid=299 and ErrorMessage <> ''
```
