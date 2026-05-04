# Table: `dbo.hm_accounts`

**Database:** `hMailServerNew` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `accountid` | int | NO |  | YES |
| 2 | `accountdomainid` | int | NO |  |  |
| 3 | `accountadminlevel` | tinyint | NO |  |  |
| 4 | `accountaddress` | nvarchar(255) | NO |  |  |
| 5 | `accountpassword` | nvarchar(255) | NO |  |  |
| 6 | `accountactive` | int | NO |  |  |
| 7 | `accountisad` | int | NO |  |  |
| 8 | `accountaddomain` | nvarchar(255) | NO |  |  |
| 9 | `accountadusername` | nvarchar(255) | NO |  |  |
| 10 | `accountmaxsize` | int | NO |  |  |
| 11 | `accountvacationmessageon` | tinyint | NO |  |  |
| 12 | `accountvacationmessage` | nvarchar(1000) | NO |  |  |
| 13 | `accountvacationsubject` | nvarchar(200) | NO |  |  |
| 14 | `accountpwencryption` | tinyint | NO |  |  |
| 15 | `accountforwardenabled` | tinyint | NO |  |  |
| 16 | `accountforwardaddress` | nvarchar(255) | NO |  |  |
| 17 | `accountforwardkeeporiginal` | tinyint | NO |  |  |
| 18 | `accountenablesignature` | tinyint | NO |  |  |
| 19 | `accountsignatureplaintext` | ntext(1073741823) | NO |  |  |
| 20 | `accountsignaturehtml` | ntext(1073741823) | NO |  |  |
| 21 | `accountlastlogontime` | datetime | NO |  |  |
| 22 | `accountvacationexpires` | tinyint | NO |  |  |
| 23 | `accountvacationexpiredate` | datetime | NO |  |  |
| 24 | `accountpersonfirstname` | nvarchar(60) | NO |  |  |
| 25 | `accountpersonlastname` | nvarchar(60) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_accounts` | no | CLUSTERED | `accountaddress` |  |
| `u_accountaddress` | YES | NONCLUSTERED | `accountaddress` |  |
