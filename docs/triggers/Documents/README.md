# Triggers: `Documents`

_Generated 2026-05-04 &middot; 1 trigger(s) total_

[← back to triggers index](../README.md)

## Summary

| Table | Trigger | Events | Kind | State | Categories |
|-------|---------|--------|------|-------|------------|
| `dbo.DocumentFiles` | `trig_Insert` | INSERT | AFTER | enabled | cascade |

## Cascade / derived data (1)

> Propagates changes to related tables — inserts child rows, updates denormalised counts, or synchronises derived columns.

### `dbo.DocumentFiles` &mdash; `trig_Insert`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-02-23 &middot; **Modified:** 2015-02-23 &middot; **Also tagged:** —

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
