# Lookup: `dbo.POLayoutFields`

**Database:** `EDS` &nbsp;|&nbsp; **Rows:** 56 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

PO-layout field catalog (~56 rows). Defines each field that can be placed on a PO (`POLayoutField` name, type, `POLayoutSource` SQL fragment to resolve the value, and `DetailField` flag for line-item-vs-header). Referenced by `POLayoutDetail.POLayoutFieldId`.

| POLayoutFieldId | POLayoutField | POLayoutSource | POLayoutFieldType | DetailField |
| --- | --- | --- | --- | --- |
| 1 | Vendor Name | Vendors.[Name] | 1 |  |
| 2 | School Name | School.[Name] | 1 |  |
| 3 | Total Items | PO.Items | 1 |  |
| 4 | Total Dollars | PO.Amount | 1 |  |
| 5 | PO Date | PO.PODate | 1 |  |
| 6 | Account Code | Accounts.Code | 1 |  |
| 8 | PO Number | PO.PONumber | 1 |  |
| 9 | Vendor Bid Number | Awards.VendorBidNumber | 1 |  |
| 10 | Message |  | 0 |  |
| 11 | Customer Service Number | Vendors.Phone | 1 |  |
| 12 | Vendor Bid Comments | Awards.Comments | 1 |  |
| 13 | Attention | POHeader.Attention | 1 |  |
| 14 | District Vendor Code | POHeader.DistrictVendorCOde | 1 |  |
| 15 | Shipping Address | POHeader.ShipNameAddress | 1 |  |
| 16 | Accounts Used | POAccountsUsed | 1 |  |
| 17 | Accounts List | POAccountList | 1 |  |
| 18 | District Message | NextNumber.FFMessage | 1 |  |
| 19 | Accounts Amount | POAccountsUsed | 1 |  |
| 20 | Total Items With Message | PO.Items | 1 |  |
| 21 | Total Dollars With Message | PO.Items | 1 |  |
| 22 | Customer Service Number With Message | PO.Items | 1 |  |
| 23 | Vendor Bid Number With Message | PO.Items | 1 |  |
| 24 | Quantity | POItems.Quantity | 1 | 1 |
| 25 | Item Code | POItems.ItemCode | 1 | 1 |
| 26 | Vendor Item Code | POItems.VendorItemCode | 1 | 1 |
| 27 | Description | POItems.Description | 1 | 1 |
| 28 | Unit Code | POItems.UnitCode | 1 | 1 |
| 29 | Unit Price | POItems.BidPrice | 1 | 1 |
| 30 | Extended Price | POItems.Extended | 1 | 1 |
| 31 | Detail Print Area |  | 1 | 0 |
| 32 | Attention List | POAttentionList | 1 |  |
| 33 | District Message (Detail Area) | NextNumber.FFMessage | 1 | 1 |
| 34 | Total Items With Message (Detail Area) | PO.Items | 1 | 1 |
| 35 | Total Dollars With Message (Detail Area) | PO.Amount | 1 | 1 |
| 36 | Total Items (Detail Area) | PO.Items | 1 | 1 |
| 37 | Total Dollars (Detail Area) | PO.Amount | 1 | 1 |
| 38 | Vendor Bid Comments (Detail Area) | Awards.Comments | 1 | 1 |
| 39 | Shipping Amount (Detail Area) | PO.ShippingAmount | 1 | 1 |
| 40 | Shipping Amount | PO.ShippingAmount | 1 |  |
| 41 | Shipping Percentage |  | 1 |  |
| 42 | Shipping Percentage (Detail Area) |  | 1 | 1 |
| 43 | Net Amount | PO.Amount | 1 |  |
| 44 | Net Amount (Detail Area) | PO.Amount | 1 | 1 |
| 45 | Message (Detail Area) |  | 0 | 1 |
| 46 | District Name | PO.DistrictNameAndAddress | 1 |  |
| 47 | Mark For | PO.POId | 1 |  |
| 48 | Customer Service Number With Message (Detail Area) |  | 1 | 1 |
| 49 | Vendor Bid Number With Message (Detail Area) |  | 1 | 1 |
| 50 | Account Code (Deptford Format) |  | 1 |  |
| 51 | Requisition Number |  | 1 |  |
| 52 | Page Number | g:PageNumber | 1 |  |
| 53 | Budget Name | POHeader:BudgetName | 1 |  |
| 54 | Account Code (Detail Area) | POHeader:AccountCode | 1 | 1 |
| 55 | Signature | POLayoutDetail.Image | 2 |  |
| 90056 | Eddata Bid Number | POHeader:AwardsBidHeaderId | 1 |  |
| 90057 | Eddata Bid Number With Message | POHeader:AwardsBidHeaderId | 1 |  |
