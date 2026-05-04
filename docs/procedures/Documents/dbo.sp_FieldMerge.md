# Procedure: `dbo.sp_FieldMerge`

_Generated on 2026-05-04T14:49:10.290Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FieldMerge` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-10-08 14:39:03 |
| Modified | 2024-06-21 20:33:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SourceFieldId` | IN | uniqueidentifier |  |
| 2 | `@TargetFieldId` | IN | uniqueidentifier |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DocumentTypeFields` | USER_TABLE |  |
| `DocumentTypeLookupKeys` | USER_TABLE |  |
| `DocumentTypeLookupResults` | USER_TABLE |  |
| `FieldData` | USER_TABLE |  |
| `Fields` | USER_TABLE |  |
| `ViewFields` | USER_TABLE |  |
| `ViewSelectors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_FieldMerge @SourceFieldId uniqueidentifier, @TargetFieldId uniqueidentifier
as
	/* Update Lookup Fields */
	Update DocumentTypeLookupResults
	   set TargetFieldId = @TargetFieldId
	  from DocumentTypeLookupResults
	 where DocumentTypeLookupResults.TargetFieldId = @SourceFieldId
	 
	 /* Update Lookup Keys */
	 Update DocumentTypeLookupKeys
	    set MatchData = CAST(@TargetFieldId as varchar(255))
	   from DocumentTypeLookupKeys
	  where isnull(DocumentTypeLookupKeys.Constant,0) = 0
	    and DocumentTypeLookupKeys.MatchData = cast(@SourceFieldId as varchar(255))

	/* Update View Fields */
	Update ViewFields
	   set FieldId = @TargetFieldId
	  from ViewFields
	 where ViewFields.FieldId = @SourceFieldId

	/* Update View Selectors */
	Update ViewSelectors
	   set FieldId = @TargetFieldId
	  from ViewSelectors
	 where ViewSelectors.FieldId = @SourceFieldId

	  /* Update Document Type Fields */
	  Update DocumentTypeFields
	     set FieldId = @TargetFieldId
	    from DocumentTypeFields
	   where DocumentTypeFields.FieldId = @SourceFieldId
	  
	  /* Update Field Data */
  	  Update FieldData
  	     set FieldId = @TargetFieldId
  	    from FieldData
  	   where FieldData.FieldId = @SourceFieldId

	  /* Delete Source Field */
	  Update Fields
	     set deletedAt = GETDATE()
	    from Fields
	   where Fields.Id = @SourceFieldId
```
