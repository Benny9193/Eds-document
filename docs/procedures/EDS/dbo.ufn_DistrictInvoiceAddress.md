# Function: scalar: `dbo.ufn_DistrictInvoiceAddress`

_Generated on 2026-05-04T13:04:00.671Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_DistrictInvoiceAddress` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2022-11-16 19:18:25 |
| Modified | 2022-11-16 19:18:48 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `DistrictContacts` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_DistrictPaymentScheduleQBO` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_DistrictPaymentScheduleQBOTest` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
create   function dbo.ufn_DistrictInvoiceAddress(@DistrictId int)
returns varchar(255)
as
begin
return (
select District.Name + ',' +
		case
		  when coalesce(trim(dca.Address1),'') != '' and trim(dca.Address1) not like 'Acc%' then trim(dca.Address1)
		  when coalesce(trim(dca.Address2),'') != '' and trim(dca.Address2) not like 'Acc%' then trim(dca.Address2)
		  when coalesce(trim(District.Address1),'') != '' and trim(District.Address1) not like 'Acc%' then trim(District.Address1)
		  when coalesce(trim(District.Address2),'') != '' and trim(District.Address2) not like 'Acc%' then trim(District.Address2)
		  else ''
		end + ',' +
		case
		  when coalesce(trim(dca.City),'') != '' then trim(dca.City)
		  when coalesce(trim(District.City),'') != '' then trim(District.City)
		  else ''
		end + ',' +
		case
		  when coalesce(trim(dca.State),'') != '' then trim(dca.State)
		  when coalesce(trim(District.State),'') != '' then trim(District.State)
		  else ''
		end + ',' +
		case
		  when coalesce(trim(dca.Zipcode),'') != '' then trim(dca.Zipcode)
		  when coalesce(trim(District.Zipcode),'') != '' then trim(District.Zipcode)
		  else ''
		end
  from District
  Outer apply (Select top 1 *
                 from DistrictContacts dc
				where dc.DistrictId = District.DistrictId
				  and dc.DistrictContactTypeId in (2,5,8)
				  and isnull(trim(dc.Address1),'') != ''
				  and isnull(trim(dc.Address2),'') != ''
				order by case when dc.DistrictContactTypeId = 2 then 0 when dc.DistrictContactTypeId = 5 then 1 else 3 end) dca
 where District.DistrictId = @DistrictId)
end
```
