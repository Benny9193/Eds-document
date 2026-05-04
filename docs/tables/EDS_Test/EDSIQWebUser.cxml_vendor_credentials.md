# Table: `EDSIQWebUser.cxml_vendor_credentials`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `vendor_id` | int | NO |  |  |
| 3 | `from_domain` | nvarchar(100) | NO |  |  |
| 4 | `from_identity` | nvarchar(255) | NO |  |  |
| 5 | `shared_secret` | nvarchar(255) | NO |  |  |
| 6 | `cxml_enabled` | bit | NO | `((1))` |  |
| 7 | `created_at` | datetime2 | NO | `(getutcdate())` |  |
| 8 | `updated_at` | datetime2 | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UQ_cxml_vendor_credentials_identity` | YES | NONCLUSTERED | `from_domain`, `from_identity` |  |
| `UQ_cxml_vendor_credentials_vendor` | YES | NONCLUSTERED | `vendor_id` |  |
