# Table: `dbo.PO`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2461718

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | NO |  | YES |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `PONumber` | varchar(24) | YES |  |  |
| 5 | `PODate` | datetime | YES |  |  |
| 6 | `DatePrinted` | datetime | YES |  |  |
| 7 | `DatePrintedDetail` | datetime | YES |  |  |
| 8 | `DateExported` | datetime | YES |  |  |
| 9 | `DateOrdered` | datetime | YES |  |  |
| 10 | `DateReceived` | datetime | YES |  |  |
| 11 | `Amount` | money | YES |  |  |
| 12 | `ItemCount` | int | YES |  |  |
| 13 | `AwardId` | int | YES |  |  |
| 14 | `DiscountAmount` | money | YES |  |  |
| 15 | `TotalGross` | money | YES |  |  |
| 16 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 17 | `ShippingAmount` | money | YES |  |  |
| 18 | `ExportedToVendor` | datetime | YES |  |  |
| 19 | `UploadId` | int | YES |  |  |
| 20 | `Cancelled` | tinyint | YES |  |  |
| 21 | `POStatusID` | int | YES |  |  |
| 22 | `isActualNumber` | tinyint | YES |  |  |
| 23 | `ePOSuppressed` | tinyint | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PO_Requisitions` | `RequisitionId` | [`dbo.Requisitions.RequisitionId`](dbo.Requisitions.md) | NO_ACTION | NO_ACTION |
| `FK_PO_Vendors` | `VendorId` | [`dbo.Vendors.VendorId`](dbo.Vendors.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PODetailItems`](dbo.PODetailItems.md) | `POId` | `POId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_PO_7_1070678912__K2_K1_K3_4_5_6_7_8_11_12_14_15_16_17_18` | no | NONCLUSTERED | `RequisitionId`, `POId`, `VendorId` | `PONumber`, `PODate`, `DatePrinted`, `DatePrintedDetail`, `DateExported`, `Amount`, `ItemCount`, `DiscountAmount`, `TotalGross`, `DiscountRate`, `ShippingAmount`, `ExportedToVendor` |
| `_dta_index_PO_7_1070678912__K3_K2_K19_K21` | no | NONCLUSTERED | `VendorId`, `RequisitionId`, `UploadId`, `Cancelled` |  |
| `SK__Vendor_ReqPONumber` | no | NONCLUSTERED | `VendorId` | `POId`, `RequisitionId`, `PONumber` |
| `SK_Requisition` | no | NONCLUSTERED | `RequisitionId` |  |
| `SK_ReqVen1` | no | NONCLUSTERED | `RequisitionId`, `VendorId`, `POId`, `PONumber`, `PODate`, `DatePrinted`, `DatePrintedDetail`, `DateExported`, `Amount`, `ItemCount`, `DiscountAmount`, `TotalGross`, `DiscountRate`, `ShippingAmount` |  |
| `SKI_Vendor_ReqUploadCancelled` | no | NONCLUSTERED | `VendorId` | `RequisitionId`, `UploadId`, `Cancelled` |
