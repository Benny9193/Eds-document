# Table: `dbo.QAThread`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 30

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `question` | nvarchar(max) | NO |  |  |
| 4 | `askedBy` | nvarchar(1000) | NO |  |  |
| 5 | `askedAt` | datetime2 | NO | `(getdate())` |  |
| 6 | `answer` | nvarchar(max) | YES |  |  |
| 7 | `answeredBy` | nvarchar(1000) | YES |  |  |
| 8 | `answeredAt` | datetime2 | YES |  |  |
| 9 | `amendmentNumber` | int | YES |  |  |
| 10 | `draftAnswer` | nvarchar(max) | YES |  |  |
| 11 | `draftGeneratedAt` | datetime2 | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `QAThread_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AddendumQAEntry`](dbo.AddendumQAEntry.md) | `sourceQaThreadId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `QAThread_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
