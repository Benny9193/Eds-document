# Business rules: `Documents`

_Generated on 2026-05-04T15:27:08.637Z_

**Database:** `Documents`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 1 |
| Check constraints | 0 |
| Computed columns | 0 |
| Default constraints | 35 (30 non-trivial) |
| Filtered indexes | 1 |
| Unique constraints (non-PK) | 1 |
| Indexed views | 0 |
| Schema-bound views (non-indexed) | 1 |

## Triggers

**1** trigger(s).

| Table | Trigger | Events | Kind | State |
|-------|---------|--------|------|-------|
| `dbo.DocumentFiles` | `trig_Insert` | INSERT | AFTER | enabled |

### Trigger definitions

#### `dbo.DocumentFiles` &mdash; `trig_Insert`

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER trig_Insert 
   ON  DocumentFiles
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    update Documents
       set DocumentFileId = inserted.Id
      from Inserted
      join Documents on Documents.Id = inserted.documentId
END
```

## Check constraints

_None._

## Computed columns

_None._

## Default constraints

**35** total. **30** non-trivial (UDF / NEWID / etc.) shown below; 5 literal/timestamp defaults omitted.

| Table | Column | Constraint | Default |
|-------|--------|------------|---------|
| `dbo.AccessTypes` | `Id` | `DF__AccessTyp__Acces__014935CB` | `(newid())` |
| `dbo.Audit` | `Id` | `DF__Audit__AuditId__060DEAE8` | `(newid())` |
| `dbo.DocumentFiles` | `Id` | `DF__DocumentF__Docum__2D27B809` | `(newid())` |
| `dbo.Documents` | `Id` | `DF__Documents__Docum__239E4DCF` | `(newid())` |
| `dbo.DocumentTypeFields` | `Id` | `DF__DocumentT__Docum__286302EC` | `(newid())` |
| `dbo.DocumentTypeLookupKeys` | `Id` | `DF__DocumentT__Docum__3C69FB99` | `(newid())` |
| `dbo.DocumentTypeLookupResults` | `Id` | `DF__DocumentT__Docum__412EB0B6` | `(newid())` |
| `dbo.DocumentTypeLookups` | `Id` | `DF__DocumentT__Docum__37A5467C` | `(newid())` |
| `dbo.DocumentTypes` | `Id` | `DF__DocumentT__Docum__45F365D3` | `(newid())` |
| `dbo.FieldData` | `Id` | `DF__FieldData__Field__4F7CD00D` | `(newid())` |
| `dbo.Fields` | `Id` | `DF__Fields__FieldId__59063A47` | `(newid())` |
| `dbo.FileTypes` | `Id` | `DF__FileTypes__FileT__5DCAEF64` | `(newid())` |
| `dbo.GroupMembers` | `Id` | `DF__GroupMemb__Group__6754599E` | `(newid())` |
| `dbo.Groups` | `Id` | `DF__Groups__GroupId__628FA481` | `(newid())` |
| `dbo.ImportTasks` | `Id` | `DF__ImportTasks__Id__57A801BA` | `(newid())` |
| `dbo.Modules` | `Id` | `DF__Modules__ModuleI__6C190EBB` | `(newid())` |
| `dbo.RecognitionFields` | `Id` | `DF__Recogniti__Recog__0A688BB1` | `(newid())` |
| `dbo.RecognitionZones` | `Id` | `DF__Recogniti__Recog__05A3D694` | `(newid())` |
| `dbo.SecurityToken` | `Id` | `DF__SecurityT__Secur__70DDC3D8` | `(newid())` |
| `dbo.Users` | `Id` | `DF__Users__UserId__7A672E12` | `(newid())` |
| `dbo.ViewFields` | `Id` | `DF__CabinetFi__Cabin__108B795B` | `(newid())` |
| `dbo.Views` | `Id` | `DF__Cabinets__Cabine__0BC6C43E` | `(newid())` |
| `dbo.WorkflowActions` | `Id` | `DF__WorkflowA__Workf__03F0984C` | `(newid())` |
| `dbo.Workflows` | `Id` | `DF__Workflows__Workf__7F2BE32F` | `(newid())` |
| `dbo.WorkflowSteps` | `Id` | `DF__WorkflowS__Workf__0D7A0286` | `(newid())` |
| `dbo.WorkflowTriggers` | `Id` | `DF__WorkflowT__Workf__08B54D69` | `(newid())` |
| `dbo.ZonalActions` | `Id` | `DF__ZonalActi__Zonal__123EB7A3` | `(newid())` |
| `dbo.ZonalAreas` | `Id` | `DF__ZonalArea__Zonal__1BC821DD` | `(newid())` |
| `dbo.ZonalEvents` | `Id` | `DF__ZonalEven__Zonal__1AFEE62D` | `(newid())` |
| `dbo.Zonals` | `Id` | `DF__Zonals__Id__67B44C51` | `(newid())` |

## Filtered indexes

**1** filtered index(es). The WHERE clause encodes a domain rule.

| Table | Index | Unique | Key columns | Filter |
|-------|-------|--------|-------------|--------|
| `dbo.FieldData` | `SKI_DocumentFieldUpdated` | no | [DocumentId], [FieldId], [deletedAt], [updatedAt] DESC | `([deletedAt] IS NULL)` |

## Unique constraints (non-PK)

**1** alternate-key uniqueness rule(s).

| Table | Index | Source | Key columns |
|-------|-------|--------|-------------|
| `dbo.sysdiagrams` | `UK_principal_name` | UNIQUE constraint | [principal_id], [name] |

## Indexed views (materialised)

_None._

## Schema-bound views (non-indexed)

**1** view(s) with WITH SCHEMABINDING but no clustered index — definition is locked against drift.

| View | Created | Modified |
|------|---------|----------|
| `dbo.vw_FieldDatas` | 2014-10-28 21:24:35 | 2024-06-21 20:33:45 |

## Source queries

Rendered from these catalog views:

- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies
- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)
- `sys.computed_columns` — derived columns (persisted vs. inline)
- `sys.default_constraints` — column defaults (filtered to non-trivial)
- `sys.indexes WHERE has_filter = 1` — filtered indexes
- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness
- `sys.views` joined to `sys.indexes` — indexed and schema-bound views
