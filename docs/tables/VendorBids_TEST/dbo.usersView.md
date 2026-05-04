# View: `dbo.usersView`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `reguserid` | int | NO |  |  |
| 2 | `email` | varchar(255) | NO |  |  |
| 3 | `password` | varchar(255) | NO |  |  |
| 4 | `UserName` | varchar(50) | NO |  |  |
| 5 | `role` | varchar(20) | YES |  |  |
| 6 | `registrationid` | int | NO |  |  |
| 7 | `CompanyName` | varchar(50) | YES |  |  |
| 8 | `VendorCode` | varchar(16) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `registrations` | USER_TABLE |
| `regusers` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view usersView
as
select regusers.reguserid, regusers.email, regusers.password, regusers.name UserName, regusers.role, regusers.registrationid, registrations.name CompanyName, registrations.code VendorCode
  from regusers with (nolock)
  join registrations on registrations.registrationid = regusers.registrationid
 where regusers.active = 1
```
