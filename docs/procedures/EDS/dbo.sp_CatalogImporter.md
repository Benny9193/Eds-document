# Procedure: `dbo.sp_CatalogImporter`

_Generated on 2026-05-04T13:04:00.315Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogImporter` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-11-14 19:57:29 |
| Modified | 2012-11-14 20:04:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@xmlMap` | IN | xml(max) |  |
| 2 | `@xmlFile` | IN | xml(max) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
--declare @xml xml,@map xml select @map = '<Map></Map>', @xml = '<Catalog id="1234"><Row index="1"><Column index="1">I1</Column><Column index="2">Item #1</Column><Column index="3">1</Column><Column index="4">12.34</Column><Column index="5">10.95</Column></Row><Row index="2"><Column index="1">I2</Column><Column index="2">Item #2</Column><Column index="3">2</Column><Column index="4">1.34</Column><Column index="5">2.95</Column></Row></Catalog>' exec sp_CatalogImporter @map, @xml
CREATE procedure sp_CatalogImporter @xmlMap xml, @xmlFile xml as
/*
Things the catalog importer should do.
1.	Check for # Records being within 10%
2.	Check for Prices being within 20%, report exceptions
3.	Check for # of Matches on existing items vs New Items
4.	Strip Special Characters
5.	Check for Missing Data in Required Fields
6.	Validate Data types (money, Page Numbers
7.	Check for Duplicate Entries
8.	Post File once Acceptable
*/
declare @hMap int, @hFile int
declare @FileMap varchar(max)

exec sp_xml_prepareDocument @hFile output, @xmlFile

select @FileMap = ''
select *
  from OPENXML(@hFile, '/Catalog')
```
