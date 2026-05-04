# Function: scalar: `dbo.uf_GetTrackingA`

_Generated on 2026-05-04T13:43:19.016Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_GetTrackingA` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2025-06-06 14:14:10 |
| Modified | 2025-06-10 10:01:27 |
| Encrypted | no |
| Returns | nvarchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@CarrierName` | IN | nvarchar(max) |  |
| 2 | `@TrackingNumber` | IN | nvarchar(max) |  |
| 3 | `@TrackingURL` | IN | nvarchar(max) |  |
| 4 | `@ShippedDate` | IN | datetime2 |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.usp_GetPODetail` | SQL_STORED_PROCEDURE |
| `dbo.usp_GetPODetail_Test` | SQL_STORED_PROCEDURE |
| `dbo.usp_StoreVendorOrder` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE   function [dbo].[uf_GetTrackingA](
	@CarrierName NVARCHAR(MAX),
    @TrackingNumber NVARCHAR(MAX),
    @TrackingURL NVARCHAR(MAX),
    @ShippedDate datetime2
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Result NVARCHAR(MAX) = '';

    DECLARE @CarrierTable TABLE (Id INT IDENTITY(1,1), Carrier NVARCHAR(256));
    DECLARE @NumberTable TABLE (Id INT IDENTITY(1,1), Number NVARCHAR(256));
    DECLARE @URLTable TABLE (Id INT IDENTITY(1,1), URL NVARCHAR(MAX));

    DECLARE @Carrier NVARCHAR(MAX) = coalesce(trim(@CarrierName),'') + '|';
    DECLARE @Number NVARCHAR(MAX) = coalesce(trim(@TrackingNumber),'') + '|';
    DECLARE @URL NVARCHAR(MAX) = coalesce(trim(@TrackingURL),'') + '|';

    DECLARE @pos INT;

    WHILE CHARINDEX('|', @Carrier) > 0
    BEGIN
        SET @pos = CHARINDEX('|', @Carrier);
        INSERT INTO @CarrierTable(Carrier) VALUES (LTRIM(RTRIM(LEFT(@Carrier, @pos - 1))));
        SET @Carrier = STUFF(@Carrier, 1, @pos, '');
    END

    WHILE CHARINDEX('|', @Number) > 0
    BEGIN
        SET @pos = CHARINDEX('|', @Number);
        INSERT INTO @NumberTable(Number) VALUES (LTRIM(RTRIM(LEFT(@Number, @pos - 1))));
        SET @Number = STUFF(@Number, 1, @pos, '');
    END

    WHILE CHARINDEX('|', @URL) > 0
    BEGIN
        SET @pos = CHARINDEX('|', @URL);
        INSERT INTO @URLTable(URL) VALUES (LTRIM(RTRIM(LEFT(@URL, @pos - 1))));
        SET @URL = STUFF(@URL, 1, @pos, '');
    END

    DECLARE @Count INT = (SELECT COUNT(*) FROM @CarrierTable);
    DECLARE @i INT = 1;

    WHILE @i <= @Count
    BEGIN
        DECLARE @CurrCarrier NVARCHAR(256);
        DECLARE @CurrNumber NVARCHAR(256);
        DECLARE @CurrURL NVARCHAR(MAX);

        SELECT @CurrCarrier = Carrier FROM @CarrierTable WHERE Id = @i;
        SELECT @CurrNumber = Number FROM @NumberTable WHERE Id = @i;
        SELECT @CurrURL = URL FROM @URLTable WHERE Id = @i;

        SET @Result = @Result + 
            CASE WHEN @i > 1 THEN '|' ELSE '' END +
            '<a href="' + @CurrURL + '" target="_blank" title="Shipped: ' + coalesce(convert(varchar,@ShippedDate,22),'Not Shipped') + '">' + @CurrCarrier + ' ' + @CurrNumber + '</a>';

        SET @i = @i + 1
    END

    RETURN @Result;
END
```
