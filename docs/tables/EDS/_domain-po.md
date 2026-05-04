# PO Views — `EDS`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

33 views matched the **PO** domain by name.
A view may appear in more than one domain index (e.g. `vw_VendorBidLookup` is both Bid and Vendor).

| View | Schema | Description |
|------|--------|-------------|
| [`dbo.OrderBookDetailView`](dbo.OrderBookDetailView.md) | `dbo` |  |
| [`dbo.OrderBookView`](dbo.OrderBookView.md) | `dbo` |  |
| [`dbo.POAttentionList`](dbo.POAttentionList.md) | `dbo` |  |
| [`dbo.PODetail`](dbo.PODetail.md) | `dbo` |  |
| [`dbo.PODetail_old`](dbo.PODetail_old.md) | `dbo` |  |
| [`dbo.PODetail_Orig`](dbo.PODetail_Orig.md) | `dbo` |  |
| [`dbo.PODetailExport`](dbo.PODetailExport.md) | `dbo` |  |
| [`dbo.PODetailExport_old`](dbo.PODetailExport_old.md) | `dbo` |  |
| [`dbo.PODetailJavaExport`](dbo.PODetailJavaExport.md) | `dbo` |  |
| [`dbo.PODetailJavaExportNew`](dbo.PODetailJavaExportNew.md) | `dbo` |  |
| [`dbo.PODetailTest`](dbo.PODetailTest.md) | `dbo` |  |
| [`dbo.POHeader`](dbo.POHeader.md) | `dbo` |  |
| [`dbo.POHeader_Test`](dbo.POHeader_Test.md) | `dbo` |  |
| [`dbo.POHeaderSummary`](dbo.POHeaderSummary.md) | `dbo` |  |
| [`dbo.POHeaderSummary_04232018`](dbo.POHeaderSummary_04232018.md) | `dbo` |  |
| [`dbo.POHeaderTest`](dbo.POHeaderTest.md) | `dbo` |  |
| [`dbo.vw_MultiVendorPODistrictsAndBudgets`](dbo.vw_MultiVendorPODistrictsAndBudgets.md) | `dbo` |  |
| [`dbo.vw_POHeaderBidImports`](dbo.vw_POHeaderBidImports.md) | `dbo` |  |
| [`dbo.vw_POStatus`](dbo.vw_POStatus.md) | `dbo` |  |
| [`dbo.vw_POStatus_Test`](dbo.vw_POStatus_Test.md) | `dbo` |  |
| [`dbo.vw_VendorPODistrictList`](dbo.vw_VendorPODistrictList.md) | `dbo` |  |
| [`dbo.vw_VendorPODistricts`](dbo.vw_VendorPODistricts.md) | `dbo` |  |
| [`dbo.vw_VendorPODistrictsAndBudgets`](dbo.vw_VendorPODistrictsAndBudgets.md) | `dbo` |  |
| [`dbo.vw_VendorPODistrictsAndBudgetsCF`](dbo.vw_VendorPODistrictsAndBudgetsCF.md) | `dbo` |  |
| [`dbo.vw_VendorPODistrictsAndBudgetsOld`](dbo.vw_VendorPODistrictsAndBudgetsOld.md) | `dbo` |  |
| [`dbo.vw_VendorPODistrictsAndBudgetsTest`](dbo.vw_VendorPODistrictsAndBudgetsTest.md) | `dbo` |  |
| [`dbo.vw_VendorPOView`](dbo.vw_VendorPOView.md) | `dbo` |  |
| [`dbo.vw_VendorPOView1`](dbo.vw_VendorPOView1.md) | `dbo` |  |
| [`dbo.vw_VendorPOView2`](dbo.vw_VendorPOView2.md) | `dbo` |  |
| [`EDSIQWebUser.OrderBookDetailView`](EDSIQWebUser.OrderBookDetailView.md) | `EDSIQWebUser` | Reporting view exposing line-level OrderBook detail — the drill-through target from `OrderBookView`. |
| [`EDSIQWebUser.OrderBookView`](EDSIQWebUser.OrderBookView.md) | `EDSIQWebUser` | Reporting view over consolidated order data — top-level grain, suitable for dashboard summaries. |
| [`EDSIQWebUser.POAccountList`](EDSIQWebUser.POAccountList.md) | `EDSIQWebUser` | Reporting view listing PO line items by budget account — used for budget-utilization reports. |
| [`EDSIQWebUser.POAccountsUsed`](EDSIQWebUser.POAccountsUsed.md) | `EDSIQWebUser` |  |
