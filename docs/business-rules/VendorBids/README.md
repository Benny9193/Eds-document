# Business rules: `VendorBids`

_Generated on 2026-05-04T15:27:09.688Z_

**Database:** `VendorBids`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 2 |
| Check constraints | 0 |
| Computed columns | 0 |
| Default constraints | 18 (3 non-trivial) |
| Filtered indexes | 0 |
| Unique constraints (non-PK) | 2 |
| Indexed views | 0 |
| Schema-bound views (non-indexed) | 0 |

## Triggers

**2** trigger(s).

| Table | Trigger | Events | Kind | State |
|-------|---------|--------|------|-------|
| `dbo.biddocumentacks` | `trig_bdaInsert` | INSERT | AFTER | enabled |
| `dbo.DocumentUploads` | `trig_DocumentUploads` | DELETE, INSERT, UPDATE | AFTER | enabled |

### Trigger definitions

#### `dbo.biddocumentacks` &mdash; `trig_bdaInsert`

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER dbo.trig_bdaInsert 
   ON  dbo.biddocumentacks
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    update biddocumentacks
       set ackdatetime = getdate(),
           ackname = vendorsessions.sessionuser
      from biddocumentacks
      join inserted on inserted.biddocumentackid = biddocumentacks.biddocumentackid
      join vendorsessions on vendorsessions.sessionid = inserted.sessionid
    set nocount off;
END
```

#### `dbo.DocumentUploads` &mdash; `trig_DocumentUploads`

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE   TRIGGER trig_DocumentUploads
   ON  DocumentUploads
   AFTER INSERT, Update, Delete
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Action for Inserted Rows
	Update DocumentUploads
	   set CreatedAt = CAST(coalesce(inserted.CreatedAt, getdate()) as DATETIME2(2))
	  from inserted
	  join DocumentUploads on DocumentUploads.DocumentUploadId = inserted.DocumentUploadId
	  left outer join deleted on deleted.DocumentUploadId = inserted.DocumentUploadId
	  left outer join DocumentUploads dud on dud.DocumentUploadId = deleted.DocumentUploadId
	 where dud.DocumentUploadId is null

    -- Action for Changed Rows
	Update DocumentUploads
	   set UpdatedAt = CAST(coalesce(inserted.UpdatedAt, getdate()) as DATETIME2(2))
	  from inserted
	  join deleted on deleted.DocumentUploadId = inserted.DocumentUploadId
	  join DocumentUploads on DocumentUploads.DocumentUploadId = inserted.DocumentUploadId
	  join DocumentUploads dud on dud.DocumentUploadId = deleted.DocumentUploadId

    -- Action for Deleted Rows
	Update DocumentUploads
	   set DeletedAt = CAST(coalesce(dud.DeletedAt, getdate()) as DATETIME2(2))
	  from deleted
	  join DocumentUploads dud on dud.DocumentUploadId = deleted.DocumentUploadId
	  left outer join inserted on inserted.DocumentUploadId = deleted.DocumentUploadId
	  left outer join DocumentUploads on DocumentUploads.DocumentUploadId = inserted.DocumentUploadId
	 where DocumentUploads.DocumentUploadId is null

END
```

## Check constraints

_None._

## Computed columns

_None._

## Default constraints

**18** total. **3** non-trivial (UDF / NEWID / etc.) shown below; 15 literal/timestamp defaults omitted.

| Table | Column | Constraint | Default |
|-------|--------|------------|---------|
| `dbo.DocumentUploads` | `CreatedAt` | `DF_DocumentUploads_CreatedAt` | `(CONVERT([datetime2](2),getdate()))` |
| `dbo.DocumentUploads` | `Id` | `DF__DocumentUplo__Id__4FC7B427` | `(newid())` |
| `dbo.TransmitLog` | `TransmitId` | `DF__TransmitL__Trans__7B51FC01` | `(newid())` |

## Filtered indexes

_None._

## Unique constraints (non-PK)

**2** alternate-key uniqueness rule(s).

| Table | Index | Source | Key columns |
|-------|-------|--------|-------------|
| `dbo.sysdiagrams` | `UK_principal_name` | UNIQUE constraint | [principal_id], [name] |
| `dbo.vendorbids` | `SKI_RegCal_VendorBidId` | unique index | [registrationid], [calendarid], [vendorbidid] |

## Indexed views (materialised)

_None._

## Schema-bound views (non-indexed)

_None._

## Source queries

Rendered from these catalog views:

- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies
- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)
- `sys.computed_columns` — derived columns (persisted vs. inline)
- `sys.default_constraints` — column defaults (filtered to non-trivial)
- `sys.indexes WHERE has_filter = 1` — filtered indexes
- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness
- `sys.views` joined to `sys.indexes` — indexed and schema-bound views
