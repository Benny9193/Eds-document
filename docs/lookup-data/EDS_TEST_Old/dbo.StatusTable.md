# Lookup: `dbo.StatusTable`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Rows:** 53 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| StatusId | StatusCode | Name | RequiredLevel | OptionValue | UserVisibilityLevel | IsPrint | ScriptURL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | H | On Hold | 1 | 1 | 0 |  |  |
| 2 | P | Pending Approval | 1 | 2 | 0 |  |  |
| 3 | A | Approved | 1 | 3 | 0 |  |  |
| 4 | R | Rejected | 1 | 4 | 0 |  |  |
| 5 | I | At EDS | 5 | 5 | 0 |  |  |
| 6 | O | PO Printed | 9 | 6 | 5 |  |  |
| 7 |  | Export To Comet | 99 | -2 | 99 |  |  |
| 8 |  | Print Screen Summary | 1 | -1 | 5 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&ReportFile=SummaryReports.xml&ReportName=Requisitions Summary&RecordSource=select * from dbo.uf_Requ… |
| 9 |  | Create PO | 5 | -3 | 5 |  |  |
| 10 |  | Update Next PO Number | 5 | -4 | 5 |  | edsiq/UpdateNextNumber.asp?SessionId={SessionID}&DistrictId={DistrictID}&BudgetId={BudgetID}&IdType=P |
| 11 |  | District Summary | 5 | -5 | 5 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=DistrictSummary.xml&ReportName=District Summary |
| 12 |  | Textbook Bid Report | 5 | -6 | 5 | true | edsiq/EDSIQ/CreateTextBookBidRequest.asp?RSID={RSID}&Prompt=Yes |
| 13 |  | Delete Requisition | 5 | -12 | 5 |  |  |
| 14 |  | Textbook Savings Report | 5 | -7 | 5 | true | edsiq/EDSIQ/BidHeaderReport.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=SummaryReports.xml&ReportName=Textbook Savings Report |
| 15 |  | Textbook Distribution Report | 5 | -8 | 5 | true | edsiq/EDSIQ/BidHeaderReport.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=SummaryReports.xml&ReportName=Textbook Distribution Report |
| 16 |  | Create Textbook POs | 5 | -9 | 5 |  |  |
| 17 |  | Textbook Usage Report | 5 | -10 | 5 | true | edsiq/EDSIQ/BidHeaderReport.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=SummaryReports.xml&ReportName=Textbook Usage Report |
| 18 |  | Copy Requisitions Forward | 10 | -11 | 5 |  |  |
| 19 |  | Print Requisition(s) | 1 | -13 | 5 | true | /ReportHandler7/ReportHandlerO?SessionId={SessionID}&ReportName=Requisitions&RSID={RSID} |
| 20 |  | Combine Requisitions | 5 | -14 | 5 |  |  |
| 21 |  | School Summary | 10 | -15 | 5 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=SchoolSummary.xml&ReportName=School Summary |
| 22 |  | Schedule SBS | 10 | -16 | 5 | true |  |
| 23 | S | SBS Printed | 10 | 8 | 5 |  |  |
| 24 | 1 | SBS Pending | 10 | 7 | 5 |  |  |
| 25 | J | Just Converted | 9 | 9 | 5 |  |  |
| 26 |  | Create Acct File | 9 | -17 | 5 |  |  |
| 27 | B | Ready to Bid | 9 | 10 | 0 |  |  |
| 28 | C | On Hold - Bid Completed | 5 | 11 | 0 |  |  |
| 29 | W | Out to Bid - Waiting Response | 9 | 12 | 0 |  |  |
| 30 |  | Item Distribution Report | 1 | -18 | 1 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=POReports.xml&ReportName=Item Distribution Report |
| 31 |  | Download Requisition(s) | 1 | -19 | 1 |  | edsiq/SendReqFile.asp?SessionId={SessionID}&RSId={RSID} |
| 32 | E | Changes at EDS | 5 | 13 | 5 |  |  |
| 33 |  | Reprocess Requisition(s) | 5 | -20 | 5 |  |  |
| 34 |  | No Bid Report | 5 | -21 | 5 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=SummaryReports.xml&ReportName=No Bid Items |
| 35 | D | Requisition Downloaded | 9 | 14 | 0 |  |  |
| 36 |  | Queued Copy Forward | 5 | -22 | 5 |  |  |
| 37 |  | Print Selective Screen Summary | 1 | -23 | 1 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&ReportFile=SummaryReports.xml&ReportName=Requisitions Summary Selective&RecordSource=select * from d… |
| 38 |  | Audit Report | 1 | -24 | 1 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=Requisition.xml&ReportName=Requisition Audit Report |
| 39 |  | Print Award Letter | 1 | -25 | 1 | true | /ReportHandler7/ReportHandlerO?RSId={RSID}&ReportName=Award Letters |
| 40 |  | Vendor Summary | 1 | -26 | 1 | true | edsiq/Reports/ReportsV8.asp?SessionId={SessionID}&RSID={RSID}&ReportFile=DistrictSummary.xml&ReportName=Vendor Summary |
| 41 |  | Bid Analysis | 5 | -27 | 5 | true | /ReportHandler7/ReportHandlerO?ReportName=Requisition Analysis&RSId={RSID} |
| 42 |  | Print My Users | 9 | -28 | 9 | true | edsiq/Reports/ReportsBudgetSchool.asp?SessionId={SessionID}&BudgetId={BudgetID}&ApproverId={UserID}&ReportFile=UserCodes.xml&ReportName=User Tree |
| 43 |  | Combine Reqs by Vendor | 5 | -29 | 5 |  |  |
| 45 | M | Manually Processed PO | 1 | 15 | 1 |  |  |
| 46 |  | E-Mail to Vendor | 9 | -30 | 9 |  |  |
| 48 | 3 | PO Sent | 9 | 17 | 9 | false |  |
| 49 | 2 | Requisition Printed for POs | 9 | 16 | 0 | false |  |
| 54 |  | Pre PO Verification | 5 | -31 | 5 | true | /ReportHandler7/ReportHandlerO?RSId={RSID}&ReportName=Pre PO Verification |
| 55 |  | Print Requisition(s) Bid Tab | 1 | -32 | 1 | true | /ReportHandler7/ReportHandlerO?RSId={RSID}&ReportName=Requisition Analysis |
| 56 |  | Export Spend Summary | 1 | -33 | 1 | true | exports/ExportSpendSummary?RSID={RSID} |
| 57 |  | Export Vendor Summary | 5 | -34 | 5 | true | exports/ExportVendorSummary?RSID={RSID} |
| 58 |  | Delete Purchase Order(s) | 10 | -35 | 10 |  |  |
| 59 |  | Export Tagged Incidental Orders | 5 | -36 | 5 | true | exportTaggedIncidentalOrders |
