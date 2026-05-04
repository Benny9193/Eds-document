# Procedure: `dbo.usp_MissingHeaders`

_Generated on 2026-05-04T13:04:24.374Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_MissingHeaders` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-09-05 09:35:55 |
| Modified | 2019-09-05 09:35:55 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure usp_MissingHeaders as

select CSRep.Name, District.Name, Category.Name, Items.ItemCode, Items.Description, Units.Code, isnull(Headings.Title,''), isnull(Keywords.Keyword,'')
  from Items
  join BidRequestItems on BidRequestItems.ItemId = Items.ItemId
  join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
                 and BidHeaders.EffectiveUntil > dateadd(year,-3,getdate())
  join District on District.DistrictId = Items.DistrictId
  join CSRep on CSRep.CSRepId = District.CsRepId
  join Units on Units.UnitId = Items.UnitId
  join Category on Category.CategoryId = Items.CategoryId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
 where Items.DistrictId > 0
   and Items.Active = 1
   and (Headings.HeadingId is null or Headings.Title like 'Misc%')
 group by CSRep.Name, District.Name, Category.Name, Items.ItemCode, Items.Description, Units.Code, isnull(Headings.Title,''), isnull(Keywords.Keyword,''), Items.SortSeq
 order by CSRep.Name, District.Name, Category.Name, Items.SortSeq
```
