# Table: `dbo.DocumentCheckedOut`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `UserId` | uniqueidentifier | NO |  |  |
| 4 | `CheckedOutUtc` | datetime | NO | `(getutcdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentCheckedOut_Document` | `DocumentId` | [`dbo.Document.Id`](dbo.Document.md) | CASCADE | CASCADE |
| `FK_DocumentCheckedOut_User` | `UserId` | [`dbo.User.Id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DocumentCheckedOut_CheckedOutUtc` | no | NONCLUSTERED | `CheckedOutUtc` |  |
| `IX_DocumentCheckedOut_DocumentId` | no | NONCLUSTERED | `DocumentId` |  |
| `IX_DocumentCheckedOut_UserId` | no | NONCLUSTERED | `UserId` |  |
