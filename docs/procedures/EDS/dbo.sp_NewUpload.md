# Procedure: `dbo.sp_NewUpload`

_Generated on 2026-05-04T13:04:00.420Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_NewUpload` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-04-19 17:24:29 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Vendors` | USER_TABLE |  |
| `VendorUploads` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure dbo.sp_NewUpload @pVendorId int as

declare @FileName varchar(255),
	@HexBase char(16),
        @UploadId int,
	@UploadType int

set nocount on

select @UploadType = UploadType
  from Vendors
 where VendorId = @pVendorId

if @UploadType = 2
begin
  insert VendorUploads (DateCreated) values (getdate())
  select @UploadId = Scope_Identity()

  select @HexBase = '0123456789ABCDEF'

  select @FileName = 'POC' + substring(@HexBase,((@UploadId / 0x010000) & 0x0F) + 1,1) + substring(@HexBase,((@UploadId / 0x1000) & 0xF) + 1,1) + substring(@HexBase,((@UploadId / 0x100) & 0xF) + 1,1) + substring(@HexBase,((@UploadId / 0x10) & 0xF) + 1,1) + substring(@HexBase,(@UploadId & 0xF) + 1,1)

  update VendorUploads
     set FileName = @FileName
   where UploadId = @UploadId
end

if @UploadType = 1
begin
  insert VendorUploads (DateCreated) values (getdate())
  select @UploadId = Scope_Identity()

  select @HexBase = '0123456789ABCDEF'

  select @FileName = 'PED' + substring(@HexBase,((@UploadId / 0x010000) & 0x0F) + 1,1) + substring(@HexBase,((@UploadId / 0x1000) & 0xF) + 1,1) + substring(@HexBase,((@UploadId / 0x100) & 0xF) + 1,1) + substring(@HexBase,((@UploadId / 0x10) & 0xF) + 1,1) + substring(@HexBase,(@UploadId & 0xF) + 1,1)

  update VendorUploads
     set FileName = @FileName
   where UploadId = @UploadId
end

set nocount off

select *
  from VendorUploads
 where UploadId = @UploadId
```
