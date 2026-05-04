# Triggers: `VendorBids`

_Generated 2026-05-04 &middot; 2 trigger(s) total_

[← back to triggers index](../README.md)

## Summary

| Table | Trigger | Events | Kind | State | Categories |
|-------|---------|--------|------|-------|------------|
| `dbo.biddocumentacks` | `trig_bdaInsert` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.DocumentUploads` | `trig_DocumentUploads` | DELETE, INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |

## Date-stamping (2)

> Sets a timestamp column (DateCreated, DateModified, etc.) via GETDATE() or similar.

### `dbo.biddocumentacks` &mdash; `trig_bdaInsert`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2009-11-13 &middot; **Modified:** 2011-05-20 &middot; **Also tagged:** cascade

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

### `dbo.DocumentUploads` &mdash; `trig_DocumentUploads`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-11-23 &middot; **Modified:** 2020-11-23 &middot; **Also tagged:** cascade

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
