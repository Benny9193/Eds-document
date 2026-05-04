# Function: scalar: `dbo.uf_DistrictBANameAndAddress`

_Generated on 2026-05-04T13:43:18.989Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictBANameAndAddress` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-02-09 16:03:28 |
| Modified | 2023-12-13 14:02:27 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `DistrictContacts` | USER_TABLE |  |
| `Salutations` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_DistrictPaymentSchedule` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBO` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictProposedFees` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_ProposedDistrictPaymentSchedule` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.vw_ContinuanceCharges` | VIEW |

## Definition

```sql
--select * from DistrictContactTypes
CREATE  function [dbo].[uf_DistrictBANameAndAddress] (@pDistrictId int)
returns varchar(1024)
 
as
begin
  return(select case isnull(BAS.Title,'')
                  when '' then ''
                  else BAS.Title
                end + coalesce(BAC.FullName,'') +
                char(13) + char(10) + rtrim(ltrim(isnull(District.Name,''))) + 
                case rtrim(ltrim(isnull(District.Address1,''))) 
                  when '' then '' 
                  when 'Accounts Payable' then ''
                  else char(13) +  char(10) + rtrim(ltrim(District.Address1))
                end +
                case rtrim(ltrim(isnull(District.Address2,''))) 
                  when '' then '' 
                  when 'Accounts Payable' then ''
                  else char(13) +  char(10) + rtrim(ltrim(District.Address2))
                end +
                case rtrim(ltrim(isnull(District.City,''))) + rtrim(ltrim(isnull(District.[State],''))) + rtrim(ltrim(isnull(District.Zipcode,'')))
                  when '' then '' 
                  else char(13) +  char(10) + rtrim(ltrim(isnull(District.City,''))) + ', ' + rtrim(ltrim(isnull(District.[State],''))) + '  ' + rtrim(ltrim(isnull(District.Zipcode,'')))
                end
           from District
           left outer join DistrictContacts BAC on BAC.DistrictContactId =
			 (select top 1 DistrictContactId
				from DistrictContacts with (nolock)
			   where DistrictContacts.DistrictId = District.DistrictId
				 and DistrictContacts.DistrictContactTypeId in (1, 2)
			   order by DistrictContacts.DistrictContactTypeId, DistrictContacts.DistrictContactId)
           left outer join Salutations BAS on BAS.SalutationId = BAC.SalutationId
          where District.DistrictId = @pDistrictId)
end
```
