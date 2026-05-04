# Lookup: `dbo.CON_WHATIF_IDX_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Rows:** 120 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| ID | RECOMMENDED_INDEX | DISMISSED | DISMISSED_DATE | DISMISSED_BY | DISMISSED_NOTE |
| --- | --- | --- | --- | --- | --- |
| 11 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[EmailBlastLog] ([EmailBlastId]) INCLUDE ([SendDate]) |  |  |  |  |
| 16 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Headings] ([Active],[Title]) |  |  |  |  |
| 21 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId]) INCLUDE ([ItemId],[Weight]) |  |  |  |  |
| 22 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidProductLines] ([BMAId]) INCLUDE ([ManufacturerProductLineId],[MSRPOptionId]) |  |  |  |  |
| 24 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidProductLines] ([BMAId]) INCLUDE ([ManufacturerProductLineId],[MSRPOptionId],[DiscountR… |  |  |  |  |
| 27 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[VendorContacts] ([Active],[BidContact]) INCLUDE ([VendorId],[EMail],[Password]) |  |  |  |  |
| 34 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[District] ([Active]) INCLUDE ([DistrictCode],[Name],[CSRepId]) |  |  |  |  |
| 35 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidRequestItems] ([BidHeaderId]) INCLUDE ([ItemId]) |  |  |  |  |
| 63 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([DateEntered]) INCLUDE ([BudgetId],[BidHeaderId]) |  |  |  |  |
| 64 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([BidHeaderId],[DateEntered]) INCLUDE ([BudgetId]) |  |  |  |  |
| 84 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[PricingAddenda] ([CategoryId]) INCLUDE ([CrossRefId],[CatalogId],[HeadingId],[KeywordId],… |  |  |  |  |
| 98 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Vendors] ([Active],[Code]) INCLUDE ([Name],[Address1],[Address2],[City],[State],[ZipCode]… |  |  |  |  |
| 112 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBooks] ([BidHeaderId]) |  |  |  |  |
| 114 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[VendorContacts] ([Active],[BidContact]) INCLUDE ([VendorId],[Address1],[Address2],[City],… |  |  |  |  |
| 159 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Users] ([Active]) INCLUDE ([Attention],[CometId],[ApproverId],[Email]) |  |  |  |  |
| 172 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[registrations] ([vendorid]) |  |  |  |  |
| 176 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[CalendarDates] ([CalendarId]) INCLUDE ([Description],[Date1],[Date2],[Date3],[Date4]) |  |  |  |  |
| 209 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaderDocument] ([BidHeaderId]) INCLUDE ([DisplaySequence]) |  |  |  |  |
| 223 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [dpa_EDSAdmin].[dbo].[CON_STATS_DAY_SUM_1] ([SQLHASH],[DATEHOUR]) INCLUDE ([TIMESECS],[EXECS]) |  |  |  |  |
| 262 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Users] ([Active]) INCLUDE ([Email]) |  |  |  |  |
| 303 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Budgets] ([StartDate],[EndDate]) |  |  |  |  |
| 328 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([Active],[BidType]) INCLUDE ([BidHeaderId],[CategoryId],[PricePlanId],[BidDa… |  |  |  |  |
| 392 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Users] ([Active]) INCLUDE ([DistrictId],[SchoolId],[Attention],[CometId],[Email]) |  |  |  |  |
| 398 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[CrossRefs] ([Active],[PackedCode]) INCLUDE ([ItemId],[VendorItemCode]) |  |  |  |  |
| 436 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([Active],[EffectiveUntil]) INCLUDE ([BidHeaderId],[CategoryId],[PricePlanId]… |  |  |  |  |
| 451 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId],[ItemId]) |  |  |  |  |
| 546 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidMgrTagFile] ([Usr],[Tbl]) INCLUDE ([Ptr]) |  |  |  |  |
| 572 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidImports] ([Active]) INCLUDE ([BidHeaderId],[Comments],[POVendorContactId],[BidVendorCo… |  |  |  |  |
| 622 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[ReportSessionLinks] ([RSId]) INCLUDE ([IntId],[AuxId]) |  |  |  |  |
| 657 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[VendorOrders] ([POId]) |  |  |  |  |
| 682 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Accounts] ([Active]) INCLUDE ([DistrictId],[SchoolId],[Code]) |  |  |  |  |
| 713 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidResults] ([BidImportId]) INCLUDE ([BidRequestItemId],[ItemId]) |  |  |  |  |
| 730 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[SessionTable] ([DistrictId],[SchoolId],[UserId]) INCLUDE ([SessionStart]) |  |  |  |  |
| 732 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[YearlyTotals] ([BudgetId]) |  |  |  |  |
| 747 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Users] ([Active]) INCLUDE ([SchoolId],[Attention],[ApprovalLevel],[CometId]) |  |  |  |  |
| 748 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DMSBidDocuments] ([BidHeaderId]) |  |  |  |  |
| 774 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([BidItemId]) INCLUDE ([RequisitionId],[ItemId],[BidPrice],[VendorId],[CrossRefId… |  |  |  |  |
| 778 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidResults] ([AIDate],[ItemBidType],[HashKey]) INCLUDE ([BidImportId]) |  |  |  |  |
| 797 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [Catalogs].[dbo].[Master Catalog] ([CatalogId]) INCLUDE ([Description],[PageNumber],[UnitCode],[Catalo… |  |  |  |  |
| 825 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([BidderCheckListId],[DocumentTypeId]) INCLUDE ([BidId],[VendorCo… |  |  |  |  |
| 826 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([BidderCheckListId],[DocumentTypeId]) INCLUDE ([BidId],[VendorCo… |  |  |  |  |
| 827 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([BidderCheckListId],[DocumentTypeId],[Id]) INCLUDE ([BidId],[Ven… |  |  |  |  |
| 829 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS_TEST].[dbo].[Users] ([Active]) INCLUDE ([DistrictId],[SchoolId],[Attention],[CometId],[Email]) |  |  |  |  |
| 855 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId],[Active]) INCLUDE ([ItemId],[BidItemId],[Weight],[Catalog… |  |  |  |  |
| 887 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DMSVendorBidDocuments] ([DistrictVisible]) INCLUDE ([VendorCode],[BidNbr],[DocType],[DocI… |  |  |  |  |
| 994 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([Id],[DocumentUploadId]) |  |  |  |  |
| 995 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([Id]) |  |  |  |  |
| 996 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[bidcalendar] ([active]) INCLUDE ([BSCId]) |  |  |  |  |
| 997 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[bidcalendar] ([active],[BSCId]) |  |  |  |  |
| 1018 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Vendors] ([Active],[VendorId]) INCLUDE ([Code],[Name],[DisplayAs]) |  |  |  |  |
| 1028 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId]) INCLUDE ([ItemId],[BidItemId]) |  |  |  |  |
| 1029 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId],[ItemId]) INCLUDE ([BidItemId]) |  |  |  |  |
| 1030 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[vendorbiditems] ([vendorbidid]) INCLUDE ([bidrequestitemid],[BidRequestItemId_Old]… |  |  |  |  |
| 1050 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictContinuances] ([BudgetId]) |  |  |  |  |
| 1053 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([VendorCode],[CreatedAt]) INCLUDE ([BidId],[VendorId],[BidderChe… |  |  |  |  |
| 1057 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Headings] ([Active],[CategoryId]) INCLUDE ([Code],[ExpandAll],[Title],[Description],[Dist… |  |  |  |  |
| 1058 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId]) INCLUDE ([VendorId]) |  |  |  |  |
| 1059 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Headings] ([Active],[CategoryId]) INCLUDE ([Code],[DistrictId]) |  |  |  |  |
| 1060 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaderCheckList] ([BidHeaderId]) INCLUDE ([DisplaySequence]) |  |  |  |  |
| 1062 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaderDocument] ([BidHeaderId]) |  |  |  |  |
| 1064 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DetailNotifications] ([DateCreated]) INCLUDE ([DetailId]) |  |  |  |  |
| 1065 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[OrderBookDetail] ([OrderBookId],[CatalogId]) INCLUDE ([CrossRefId]) |  |  |  |  |
| 1068 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidResults] ([BidImportId]) INCLUDE ([UnitPrice],[QuantityBid]) |  |  |  |  |
| 1070 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Items] ([CategoryId]) INCLUDE ([ItemCode],[Description],[UnitId],[HeadingId],[PackedCode]… |  |  |  |  |
| 1071 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[VendorContacts] ([VendorId]) INCLUDE ([Active],[BidContact]) |  |  |  |  |
| 1074 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[bidcalendar] ([active],[BSCId]) INCLUDE ([description],[comments],[priceplan],[tot… |  |  |  |  |
| 1090 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([BidType],[EffectiveFrom],[EffectiveUntil]) INCLUDE ([BidHeaderId],[Category… |  |  |  |  |
| 1125 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS_Test].[dbo].[POQueue] ([SendStarted]) |  |  |  |  |
| 1127 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictProposedCharges] ([BudgetId],[FrequencyData]) INCLUDE ([ChargeTypeId],[Amount]) |  |  |  |  |
| 1128 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictProposedCharges] ([FrequencyData]) INCLUDE ([BudgetId],[ChargeTypeId],[Amount]) |  |  |  |  |
| 1129 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictProposedCharges] ([FrequencyData]) INCLUDE ([BudgetId],[ChargeTypeId]) |  |  |  |  |
| 1130 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictProposedCharges] ([BudgetId]) |  |  |  |  |
| 1134 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidMSRPResultPrices] ([BidMSRPResultsProductLineId]) INCLUDE ([RangeBase]) |  |  |  |  |
| 1135 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([VendorId]) INCLUDE ([RequisitionId],[ItemId],[ItemCode],[Quantity],[Description… |  |  |  |  |
| 1136 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([VendorId]) INCLUDE ([RequisitionId],[ItemId],[ItemCode],[Quantity],[Description… |  |  |  |  |
| 1148 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[TMAwards] ([Active]) INCLUDE ([BidHeaderId],[BidTradeCountyId],[BidImportId],[VendorId]) |  |  |  |  |
| 1151 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [Catalogs].[dbo].[Master Catalog] ([CatalogId]) INCLUDE ([CatalogPrice],[GrossPrice],[NoDiscount],[Add… |  |  |  |  |
| 1164 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[District] ([State],[TimeAndMaterialBids],[County]) INCLUDE ([Name]) |  |  |  |  |
| 1165 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[regusers] ([email],[password]) |  |  |  |  |
| 1166 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [SearchData].[dbo].[PricingConsolidated] ([BidItemId]) INCLUDE ([CrossRefId],[BidHeaderId],[BidPrice]) |  |  |  |  |
| 1169 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [Catalogs].[dbo].[Master Catalog] ([CatalogId]) INCLUDE ([PackedCode],[UniqueItemNumber]) |  |  |  |  |
| 1174 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [Catalogs].[dbo].[Master Catalog] ([CatalogId]) INCLUDE ([PageNumber]) |  |  |  |  |
| 1175 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([Active]) INCLUDE ([BidHeaderId],[BidDate],[EffectiveFrom],[EffectiveUntil]) |  |  |  |  |
| 1176 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([EffectiveUntil]) INCLUDE ([BidHeaderId]) |  |  |  |  |
| 1191 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([VendorId]) INCLUDE ([RequisitionId],[BidHeaderId]) |  |  |  |  |
| 1192 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([BidHeaderId]) INCLUDE ([CategoryId]) |  |  |  |  |
| 1193 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([CategoryId],[BidHeaderId]) INCLUDE ([PricePlanId],[DistrictId]) |  |  |  |  |
| 1194 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaderCheckList] ([BidderCheckListId]) INCLUDE ([BidHeaderId]) |  |  |  |  |
| 1195 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictContinuances] ([DistrictId],[BudgetId]) INCLUDE ([Status],[SignedBy],[Comments],[… |  |  |  |  |
| 1196 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictProposedCharges] ([BudgetId],[ChargeTypeId]) |  |  |  |  |
| 1197 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[DistrictCharges] ([ChargeTypeId],[BudgetId]) |  |  |  |  |
| 1198 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([VendorId],[ItemCode]) INCLUDE ([RequisitionId],[Quantity],[Description],[BidPri… |  |  |  |  |
| 1199 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[TMAwards] ([Active],[BidTradeCountyId]) INCLUDE ([BidHeaderId],[BidImportId],[VendorId],[… |  |  |  |  |
| 1200 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaders] ([Active],[BidType],[EffectiveFrom],[EffectiveUntil]) INCLUDE ([BidHeaderId],… |  |  |  |  |
| 1201 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [dpa_EDSAdmin].[dbo].[CON_SQL_SUM_1] ([SQLHASH],[PERIOD],[DATEHOUR]) |  |  |  |  |
| 1202 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([StatusId]) |  |  |  |  |
| 1203 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([StatusId]) INCLUDE ([RequisitionNumber],[SchoolId]) |  |  |  |  |
| 1204 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[PO] ([PONumber]) |  |  |  |  |
| 1205 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Catalog] ([Active]) INCLUDE ([CategoryId],[VendorId],[Name],[CatalogYear]) |  |  |  |  |
| 1206 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Catalog] ([Active]) INCLUDE ([CategoryId],[VendorId]) |  |  |  |  |
| 1207 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[BidSchedule] ([OpeningDate]) INCLUDE ([DateAvailable],[State]) |  |  |  |  |
| 1208 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Catalog] ([Active],[Name]) |  |  |  |  |
| 1209 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[CXmlSession] ([UniqueId]) |  |  |  |  |
| 1210 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[EmailBlastLog] ([EmailBlastId]) INCLUDE ([EmailSentTo],[SendDate]) |  |  |  |  |
| 1211 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[PO] ([VendorId],[PODate]) INCLUDE ([RequisitionId],[Amount]) |  |  |  |  |
| 1212 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[TransactionLogCF] ([SessionId],[RequestStart]) INCLUDE ([RequestEnd],[TargetServer],[URL]… |  |  |  |  |
| 1213 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([VendorCode],[CreatedAt]) INCLUDE ([BidId],[VendorId],[BidderChe… |  |  |  |  |
| 1214 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([BidHeaderId]) INCLUDE ([RequisitionId],[AwardId],[POId],[Modified],[BidItemId]) |  |  |  |  |
| 1215 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[PO] ([PODate]) INCLUDE ([RequisitionId],[VendorId],[Amount],[ExportedToVendor],[Cancelled… |  |  |  |  |
| 1216 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidHeaderDetail] ([BidHeaderId]) INCLUDE ([RequisitionId]) |  |  |  |  |
| 1217 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [VendorBids].[dbo].[DocumentUploads] ([CreatedAt]) INCLUDE ([BidId],[VendorId],[BidderCheckListId],[St… |  |  |  |  |
| 1218 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[PO] ([PODate]) INCLUDE ([RequisitionId],[Amount],[ExportedToVendor],[Cancelled]) |  |  |  |  |
| 1219 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([Modified],[BidHeaderId]) |  |  |  |  |
| 1220 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[BidResults] ([BidHeaderId],[Active],[OriginalAwardedItem]) INCLUDE ([BidImportId],[Quanti… |  |  |  |  |
| 1221 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([DateEntered],[StatusId]) INCLUDE ([BudgetId],[CategoryId],[OrderDate],[Bi… |  |  |  |  |
| 1222 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Requisitions] ([BidHeaderId],[DateEntered]) INCLUDE ([BudgetId],[CategoryId],[StatusId],[… |  |  |  |  |
| 1223 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[Detail] ([VendorId]) INCLUDE ([RequisitionId],[Quantity],[BidPrice]) |  |  |  |  |
| 1224 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [Catalogs].[dbo].[Master Catalog] ([CatalogId]) INCLUDE ([VendorItemCode],[Description],[PageNumber],[… |  |  |  |  |
| 1225 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[CrossRefs] ([Active],[PackedCode]) INCLUDE ([ItemId],[VendorItemCode],[CatalogId]) |  |  |  |  |
| 1226 | CREATE NONCLUSTERED INDEX [DPA_RECIDX_${ID}] ON [EDS].[dbo].[ReportSessionLinks] ([IntId]) |  |  |  |  |
