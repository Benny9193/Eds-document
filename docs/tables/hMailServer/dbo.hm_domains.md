# Table: `dbo.hm_domains`

**Database:** `hMailServer` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `domainid` | int | NO |  | YES |
| 2 | `domainname` | nvarchar(80) | NO |  |  |
| 3 | `domainactive` | tinyint | NO |  |  |
| 4 | `domainpostmaster` | nvarchar(80) | NO |  |  |
| 5 | `domainmaxsize` | int | NO |  |  |
| 6 | `domainaddomain` | nvarchar(255) | NO |  |  |
| 7 | `domainmaxmessagesize` | int | NO |  |  |
| 8 | `domainuseplusaddressing` | tinyint | NO |  |  |
| 9 | `domainplusaddressingchar` | nvarchar(1) | NO |  |  |
| 10 | `domainantispamoptions` | int | NO |  |  |
| 11 | `domainenablesignature` | tinyint | NO |  |  |
| 12 | `domainsignaturemethod` | tinyint | NO |  |  |
| 13 | `domainsignatureplaintext` | ntext(1073741823) | NO |  |  |
| 14 | `domainsignaturehtml` | ntext(1073741823) | NO |  |  |
| 15 | `domainaddsignaturestoreplies` | tinyint | NO |  |  |
| 16 | `domainaddsignaturestolocalemail` | tinyint | NO |  |  |
| 17 | `domainmaxnoofaccounts` | int | NO |  |  |
| 18 | `domainmaxnoofaliases` | int | NO |  |  |
| 19 | `domainmaxnoofdistributionlists` | int | NO |  |  |
| 20 | `domainlimitationsenabled` | int | NO |  |  |
| 21 | `domainmaxaccountsize` | int | NO |  |  |
| 22 | `domaindkimselector` | nvarchar(255) | NO |  |  |
| 23 | `domaindkimprivatekeyfile` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `idx_hm_domains` | no | CLUSTERED | `domainname` |  |
| `u_domainname` | YES | NONCLUSTERED | `domainname` |  |
