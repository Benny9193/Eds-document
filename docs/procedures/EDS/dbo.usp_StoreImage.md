# Procedure: `dbo.usp_StoreImage`

_Generated on 2026-05-04T14:49:07.485Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_StoreImage` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-05-03 22:02:21 |
| Modified | 2021-05-03 22:02:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@imageURL` | IN | varchar(512) |  |
| 2 | `@imageActualURL` | IN | varchar(512) |  |
| 3 | `@pHash` | IN | char(64) |  |
| 4 | `@imageSize` | IN | int |  |
| 5 | `@imageFormat` | IN | varchar(20) |  |
| 6 | `@width` | IN | int |  |
| 7 | `@height` | IN | int |  |
| 8 | `@imageSpace` | IN | varchar(20) |  |
| 9 | `@channels` | IN | int |  |
| 10 | `@depth` | IN | varchar(20) |  |
| 11 | `@density` | IN | int |  |
| 12 | `@statusCode` | IN | int |  |
| 13 | `@statusText` | IN | varchar(512) |  |
| 14 | `@contentType` | IN | varchar(50) |  |
| 15 | `@headers` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ImageLog` | USER_TABLE |  |
| `Images` | USER_TABLE |  |
| `dbo.Images` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[usp_StoreImage] @imageURL varchar(512), 
                                                 @imageActualURL varchar(512), 
												 @pHash char(64), 
												 @imageSize int, 
												 @imageFormat varchar(20), 
												 @width int, 
												 @height int, 
												 @imageSpace varchar(20), 
												 @channels int, 
												 @depth varchar(20), 
												 @density int,
												 @statusCode int,
												 @statusText varchar(512),
												 @contentType varchar(50),
												 @headers varchar(max)
as
begin
declare @imageId bigint,
		@imageLogId bigint

	-- Look for having already uploaded Image
	select top 1 @imageId = ImageId
	  from Images
	 where pHash = @pHash
	   and (   ImageURL = @imageURL
	        or ImageActualURL = @imageActualURL)
	   and imageFormat = @imageFormat
	   and imageSize = @imageSize
	 order by dateLoaded desc

	if @@ROWCOUNT = 0
	begin
		insert Images(imageURL, imageActualURL, pHash, imageSize, imageFormat, width, height, imageSpace, channels, depth, density)
		  values(@imageURL, @imageActualURL, @pHash, @imageSize, @imageFormat, @width, @height, @imageSpace, @channels, @depth, @density)

		select @imageId = scope_identity()

		update Images
		   set imagePath = formatmessage('\%04X\%06X\%08X.%s',cast(@imageId/(4096*512) as int),cast(@imageId/512 as int),cast(@imageId as int),@imageFormat),
		       imageResized = formatmessage('\%04X\%06X\R%08X.%s',cast(@imageId/(4096*512) as int),cast(@imageId/512 as int),cast(@imageId as int),@imageFormat),
			   imageThumbnail = formatmessage('\%04X\%06X\T%08X.%s',cast(@imageId/(4096*512) as int),cast(@imageId/512 as int),cast(@imageId as int),@imageFormat)
		 where imageId = @imageId
	end

	insert ImageLog(imageId, imageURL, imageActualURL, statusCode, statusText, contentType, headers)
	  values(@imageId, @imageURL, @imageActualURL, @statusCode, @statusText, @ContentType, @Headers)

	select @imageLogId = scope_identity()

	SELECT [imageId]
		  ,[imageURL]
		  ,[imageActualURL]
		  ,[imagePath]
		  ,[imageResized]
		  ,[imageThumbnail]
		  ,[pHash]
		  ,[bipHash]
		  ,[imageSize]
		  ,[imageFormat]
		  ,[width]
		  ,[height]
		  ,[imageSpace]
		  ,[channels]
		  ,[depth]
		  ,[density]
		  ,[dateLoaded]
		  ,[dateChecked]
		  ,[dateDeleted]
		  ,@ImageLogId ImageLogId
	  FROM [dbo].[Images]
	 where imageId = @imageId
end
```
