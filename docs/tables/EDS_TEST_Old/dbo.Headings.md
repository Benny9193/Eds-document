# Table: `dbo.Headings`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 164214

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `HeadingId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `Code` | varchar(16) | YES |  |  |
| 5 | `ExpandAll` | tinyint | YES |  |  |
| 6 | `Title` | varchar(255) | YES |  |  |
| 7 | `Description` | varchar(4096) | YES |  |  |
| 8 | `DistrictId` | int | YES |  |  |
| 9 | `DateCreated` | datetime | YES | `(getdate())` |  |
| 10 | `DateUpdated` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Headings_7_1374679995__K1_K2_6` | no | NONCLUSTERED | `HeadingId`, `Active` | `Title` |
| `_dta_index_Headings_7_1374679995__K2_K1_6` | no | NONCLUSTERED | `Active`, `HeadingId` | `Title` |
| `SK_ActiveCategoryTitleDistrict` | no | NONCLUSTERED | `Active`, `CategoryId`, `Title`, `DistrictId` |  |
| `SKI_ExpandAll_Heading` | no | NONCLUSTERED | `ExpandAll` | `HeadingId` |
| `SKI_HeadingId_Title` | YES | NONCLUSTERED | `HeadingId` | `Title` |
