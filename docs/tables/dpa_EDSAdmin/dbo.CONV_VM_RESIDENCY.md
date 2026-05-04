# Table: `dbo.CONV_VM_RESIDENCY`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VMID` | bigint | NO |  |  |
| 2 | `HOSTID` | bigint | NO |  |  |
| 3 | `STARTDATE` | datetime | YES |  |  |
| 4 | `ENDDATE` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CONV_VM_RESIDENCY` | no | NONCLUSTERED | `VMID`, `STARTDATE`, `ENDDATE` |  |
