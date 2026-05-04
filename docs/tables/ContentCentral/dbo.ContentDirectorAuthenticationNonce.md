# Table: `dbo.ContentDirectorAuthenticationNonce`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Nonce` | nvarchar(50) | NO | `(CONVERT([varchar](36),newid(),(0)))` |  |
| 3 | `CreatedUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ContentDirectorAuthenticationNonce_CreatedUtc` | no | NONCLUSTERED | `CreatedUtc` |  |
| `IX_ContentDirectorAuthenticationNonce_Nonce` | YES | NONCLUSTERED | `Nonce` |  |
