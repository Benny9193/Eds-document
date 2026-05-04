# Lookup: `dbo.CON_PLAN_PREDICATES_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Rows:** 343 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| PLANHASH | STEP_NUMBER | PTYPE | PTEXT |
| --- | --- | --- | --- |
| 2148191458 | 33 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bcp].[Active]=(1) |
| 2148191458 | 64 | SEEK | Seek Keys[1]: Prefix: [Documents].[dbo].[Documents].deletedAt as [Documents].deletedAt, [Documents].[dbo].[Documents].DocumentTypeId as [Documents].Do… |
| 2148191458 | 75 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bh].[Active]=(1) |
| 2191610850 | 22 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Keywords].Active = Scalar Operator((1)) |
| 2237320480 | 33 | OTHER | PROBE([Bitmap1075],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 2243017590 | 8 | OTHER | [EDS].[dbo].[BidItems].[BidResultsId]=[EDS].[dbo].[BidItems].[BidResultsId] |
| 2243017590 | 17 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 2273894662 | 127 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 2338581952 | 66 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 2344349263 | 44 | OTHER | PROBE([Bitmap1127],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 2344349263 | 46 | OTHER | PROBE([Bitmap1129],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 2349728527 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715353] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715353]… |
| 2368933622 | 72 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 2379850776 | 43 | OTHER | PROBE([Bitmap1129],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 2458360737 | 77 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Awards].Active = Scalar Operator((1)) |
| 2458360737 | 92 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Awards].Active = Scalar Operator((1)) |
| 2458360737 | 130 | OTHER | [EDS].[dbo].[Catalog].[Active] as [cat].[Active]=(1) |
| 2500134712 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716051] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716051]… |
| 2516125700 | 54 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 2553609625 | 8 | OTHER | [EDS].[dbo].[BidItems].[BidResultsId]=[EDS].[dbo].[BidItems].[BidResultsId] |
| 2553609625 | 17 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 2581313293 | 18 | OTHER | [Documents].[dbo].[Documents].[deletedAt] IS NULL |
| 2581313293 | 23 | INFO | Filter Predicate (from step 22): PROBE([Opt_Bitmap1025],[Documents].[dbo].[DocumentFiles].[Id]) |
| 2586733738 | 14 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 2586733738 | 15 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 2586733738 | 16 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 2602479081 | 29 | OTHER | [EDS].[dbo].[Bids].[Active]=(1) |
| 2791516939 | 35 | OTHER | PROBE([Opt_Bitmap1106],[EDS].[dbo].[Detail].[DetailId],N'[IN ROW]') |
| 2791516939 | 38 | OTHER | PROBE([Opt_Bitmap1106],[EDS].[dbo].[Detail].[DetailId],N'[IN ROW]') |
| 2791516939 | 40 | OTHER | PROBE([Bitmap1108],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 2815476429 | 72 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 2843250412 | 4 | INFO | Inner Join Predicate (from step 1): [EDS].[dbo].[BidHeaders].[BidHeaderId]=[EDS].[dbo].[Requisitions].[BidHeaderId] OR [EDS].[dbo].[BidHeaders].[Paren… |
| 2857518367 | 38 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Vendors].Active = Scalar Operator((1)) |
| 2899683453 | 104 | OTHER | [EDS].[dbo].[BidHeaders].[Active]=(1) AND [EDS].[dbo].[BidHeaders].[BidType]=(1) |
| 2955883104 | 94 | OTHER | PROBE([Bitmap1091],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3031667344 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715328] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715328]… |
| 3098339515 | 121 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 3139101306 | 36 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Keywords].Active as [Keywords].Active = Scalar Operator((1)) |
| 3139101306 | 76 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 3139101306 | 122 | OTHER | PROBE([Bitmap1128],[EDS].[dbo].[Units].[UnitId],N'[IN ROW]') |
| 3143442249 | 11 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 3143442249 | 12 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 3143442249 | 13 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 3156879061 | 41 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[ShipLocations].[ShippingId],N'[IN ROW]') |
| 3156879061 | 44 | OTHER | PROBE([Bitmap1054],[EDS].[dbo].[School].[SchoolId],N'[IN ROW]') |
| 3187282342 | 121 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 3196058181 | 55 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 3218263215 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715615] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715615]… |
| 3231734572 | 3 | OTHER | [EDS].[dbo].[TransactionLogCF].[RequestStart] as [tl].[RequestStart]>='2026-03-20 13:00:00.000' AND [EDS].[dbo].[TransactionLogCF].[RequestStart] as [… |
| 3248904959 | 34 | OTHER | getdate()>=[EDS].[dbo].[BidHeaders].[EffectiveFrom] as [bh].[EffectiveFrom] AND getdate()<=[EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh].[Effectiv… |
| 3248904959 | 34 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active as [bh].Active = Scalar Operator((1)) |
| 3268010679 | 28 | OTHER | [EDS].[dbo].[Requisitions].[DateEntered]>dateadd(year,(-2),getdate()) AND PROBE([Bitmap1025],[EDS].[dbo].[Requisitions].[BidHeaderId],N'[IN ROW]') |
| 3268010679 | 30 | OTHER | PROBE([Bitmap1026],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3270299909 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715742] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715742]… |
| 3274069241 | 56 | OTHER | PROBE([Bitmap1120],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3283796209 | 88 | OTHER | PROBE([Bitmap1087],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3314833792 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715268] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715268]… |
| 3332421588 | 20 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 3332421588 | 28 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3332421588 | 28 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 3334432320 | 4 | OTHER | [SearchData].[dbo].[PricingConsolidated].[VendorId]<>(7691) AND [SearchData].[dbo].[PricingConsolidated].[BidHeaderId] IS NOT NULL |
| 3366463490 | 19 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 3366463490 | 27 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3366463490 | 27 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 3366463490 | 34 | OTHER | PROBE([Bitmap1031],[EDS].[dbo].[Items].[ItemId],N'[IN ROW]') |
| 3366463490 | 34 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].Active = Scalar Operator((1)) |
| 3366463490 | 37 | OTHER | ([EDS].[dbo].[Headings].[DistrictId]=(0) OR isnull([EDS].[dbo].[Headings].[DistrictId],(0))=(0)) AND PROBE([Bitmap1033],[EDS].[dbo].[Headings].[Headin… |
| 3366463490 | 37 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active, [EDS].[dbo].[Headings].CategoryId = Scalar Operator((1)), Scalar Operator((7)) |
| 3401358775 | 8 | OTHER | [EDS].[dbo].[BidItems].[BidResultsId]=[EDS].[dbo].[BidItems].[BidResultsId] |
| 3401358775 | 17 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3410383335 | 24 | OTHER | [VendorBids].[dbo].[BidSchedule].[OpeningDate]>=dateadd(month,(-1),getdate()) |
| 3410383335 | 27 | OTHER | PROBE([Opt_Bitmap1020],[tempdb].[dbo].[#VendorCats].[CategoryId] as [VendorCats].[CategoryId],N'[IN ROW]') AND PROBE([Opt_Bitmap1021],[tempdb].[dbo].[… |
| 3410383335 | 29 | OTHER | PROBE([Bitmap1023],[VendorBids].[dbo].[registrations].[vendorid],N'[IN ROW]') |
| 3470142500 | 34 | OTHER | PROBE([Bitmap1109],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3477345670 | 36 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Keywords].Active as [Keywords].Active = Scalar Operator((1)) |
| 3477345670 | 76 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 3477345670 | 122 | OTHER | PROBE([Bitmap1129],[EDS].[dbo].[Units].[UnitId],N'[IN ROW]') |
| 3480290445 | 34 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bh].[Active]=(1) AND (getdate()>=[EDS].[dbo].[BidHeaders].[EffectiveFrom] as [bh].[EffectiveFrom] AND getdate()<… |
| 3485678868 | 29 | OTHER | [EDS].[dbo].[Bids].[Active]=(1) |
| 3488950576 | 12 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3541398563 | 54 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 3549353173 | 71 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 3559365550 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715493] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715493]… |
| 3577869775 | 89 | OTHER | PROBE([Bitmap1147],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3585266513 | 20 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].CategoryId = Scalar Operator((12)) |
| 3585266513 | 23 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715368] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715368]… |
| 3597722230 | 21 | OTHER | PROBE([Bitmap1137],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3597722230 | 85 | OTHER | PROBE([Bitmap1151],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3613975569 | 9 | OTHER | CONVERT(int,substring([EDS].[dbo].[Budgets].[Name],(1),(4)),0)>=datepart(year,getdate())-(3) |
| 3613975569 | 55 | INFO | Filter Predicate (from step 53): isnull([EDS].[dbo].[Requisitions].[StatusId],(0))<>(4) |
| 3626235338 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715310] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715310]… |
| 3646188462 | 27 | OTHER | [EDS].[dbo].[Budgets].[EditUntil]>getdate() |
| 3646188462 | 33 | OTHER | CONVERT_IMPLICIT(nvarchar(50),[EDS].[dbo].[Detail].[ItemCode],0)=[@P0] |
| 3647894452 | 8 | OTHER | [EDS].[dbo].[BidItems].[BidResultsId]=[EDS].[dbo].[BidItems].[BidResultsId] |
| 3647894452 | 17 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3673146759 | 92 | OTHER | PROBE([Bitmap1152],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3686017868 | 55 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 3714542214 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716177] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716177]… |
| 3720782781 | 36 | SEEK | Seek Keys[1]: Prefix: [Documents].[dbo].[Documents].deletedAt as [Documents].deletedAt, [Documents].[dbo].[Documents].DocumentTypeId as [Documents].Do… |
| 3720782781 | 41 | INFO | Filter Predicate (from step 40): PROBE([Opt_Bitmap1244],[Documents].[dbo].[DocumentFiles].[Id] as [DocumentFiles].[Id],[Documents].[dbo].[DocumentFile… |
| 3720782781 | 48 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bh].[Active]=(1) |
| 3722216758 | 6 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 3722216758 | 16 | OTHER | PROBE([Opt_Bitmap1007],[EDS].[dbo].[BidResults].[BidImportId],N'[IN ROW]') |
| 3732768546 | 25 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>=getdate() |
| 3732768546 | 25 | SEEK | Seek Keys[1]: End: [EDS].[dbo].[BidHeaders].EffectiveFrom <= Scalar Operator(getdate()) |
| 3732768546 | 31 | OTHER | CASE WHEN [EDS].[dbo].[Detail].[VendorId]=(0) THEN (7691) ELSE [EDS].[dbo].[Detail].[VendorId] END<>(7691) AND PROBE([Bitmap1031],[EDS].[dbo].[Detail]… |
| 3742338135 | 4 | OTHER | [EDS].[dbo].[TransactionLogCF].[RequestStart] as [tl].[RequestStart]>='2026-03-20 00:00:00.000' AND [EDS].[dbo].[TransactionLogCF].[RequestStart] as [… |
| 3744617744 | 104 | OTHER | [EDS].[dbo].[BidHeaders].[Active]=(1) AND [EDS].[dbo].[BidHeaders].[BidType]=(1) |
| 3855563796 | 104 | OTHER | [EDS].[dbo].[BidHeaders].[Active]=(1) AND [EDS].[dbo].[BidHeaders].[BidType]=(1) |
| 3857803650 | 11 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh2].[EffectiveUntil]>=[@now] |
| 3857803650 | 11 | SEEK | Seek Keys[1]: End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh2].EffectiveFrom <= Scalar Operator([@now]) |
| 3857803650 | 15 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh1].[EffectiveUntil]>=[@now] |
| 3857803650 | 15 | SEEK | Seek Keys[1]: End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh1].EffectiveFrom <= Scalar Operator([@now]) |
| 3857803650 | 25 | OTHER | [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(0) AND [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(7691) |
| 3866043271 | 94 | OTHER | PROBE([Bitmap1097],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3866043271 | 96 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) AND PROBE([Bitmap1098],[EDS].[dbo].[DistrictCategories].[DistrictId],[EDS].[dbo].[DistrictCategories].[C… |
| 3866043271 | 100 | OTHER | PROBE([Bitmap1101],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3866239382 | 24 | OTHER | [VendorBids].[dbo].[BidSchedule].[OpeningDate]>=dateadd(month,(-1),getdate()) |
| 3866239382 | 27 | OTHER | PROBE([Opt_Bitmap1020],[tempdb].[dbo].[#VendorCats].[CategoryId] as [VendorCats].[CategoryId],N'[IN ROW]') AND PROBE([Opt_Bitmap1021],[tempdb].[dbo].[… |
| 3866239382 | 29 | OTHER | PROBE([Bitmap1023],[VendorBids].[dbo].[registrations].[vendorid],N'[IN ROW]') |
| 3866239382 | 31 | OTHER | PROBE([Bitmap1024],[VendorBids].[dbo].[Regcalendar].[registrationid],[VendorBids].[dbo].[Regcalendar].[BSCId]) |
| 3884014226 | 70 | OTHER | PROBE([Bitmap1085],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 3884014226 | 89 | OTHER | @BidsList.[RequisitionId] as [bl].[RequisitionId]=[EDS].[dbo].[Requisitions].[RequisitionId] |
| 3893886153 | 34 | OTHER | PROBE([Bitmap1109],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 3919166020 | 47 | OTHER | PROBE([Opt_Bitmap1100],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') |
| 3919166020 | 47 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[CrossRefs].Active = Scalar Operator((1)) |
| 4004769630 | 21 | OTHER | PROBE([Bitmap1137],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 4004769630 | 85 | OTHER | PROBE([Bitmap1151],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 4068165181 | 36 | OTHER | PROBE([Bitmap1052],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 4068165181 | 43 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 4068165181 | 48 | OTHER | [EDS].[dbo].[Items].[DistrictId]>(0) |
| 4068165181 | 54 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND PROBE([Opt_Bitmap1047],[EDS].[dbo].[CrossRefs].[ItemId],N'[IN ROW]') AND PROBE([Opt_Bitmap1048],[EDS].[dbo].[… |
| 4086619307 | 3 | OTHER | [EDS].[dbo].[Users].[Active]=(1) AND CONVERT_IMPLICIT(nvarchar(255),[EDS].[dbo].[Users].[Email],0)=[@P2] |
| 4096449319 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715379] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715379]… |
| 4114225242 | 22 | OTHER | getdate()<=[EDS].[dbo].[BidHeaders].[EffectiveUntil] |
| 4114225242 | 22 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)), End: [EDS].[dbo].[BidHeaders].EffectiveFrom <= Scalar Operator(getdate()… |
| 4227211510 | 100 | OTHER | PROBE([Bitmap1125],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 4240706904 | 20 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].CategoryId = Scalar Operator((9)) |
| 4240706904 | 23 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715472] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715472]… |
| 4254304649 | 41 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[ShipLocations].[ShippingId],N'[IN ROW]') |
| 4254304649 | 44 | OTHER | PROBE([Bitmap1054],[EDS].[dbo].[School].[SchoolId],N'[IN ROW]') |
| 4261684757 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715691] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715691]… |
| 4275234339 | 8 | OTHER | [EDS].[dbo].[BidItems].[BidResultsId]=[EDS].[dbo].[BidItems].[BidResultsId] |
| 4275234339 | 17 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 4290045375 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715663] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715663]… |
| 4298383723 | 11 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh2].[EffectiveUntil]>=[@now] |
| 4298383723 | 11 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active as [bh2].Active = Scalar Operator((1)), End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh2].Eff… |
| 4298383723 | 15 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh1].[EffectiveUntil]>=[@now] |
| 4298383723 | 15 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active as [bh1].Active = Scalar Operator((1)), End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh1].Eff… |
| 4298383723 | 25 | OTHER | [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(0) AND [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(7691) |
| 4325514316 | 51 | OTHER | PROBE([Bitmap1081],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 4325514316 | 72 | OTHER | PROBE([Bitmap1083],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 4325514316 | 90 | OTHER | @BidsList.[RequisitionId] as [bl].[RequisitionId]=[EDS].[dbo].[Requisitions].[RequisitionId] |
| 4325514316 | 93 | OTHER | PROBE([Bitmap1085],[EDS].[dbo].[BidsCatalogList].[BidCatalogId],N'[IN ROW]') |
| 4325514316 | 95 | OTHER | PROBE([Bitmap1086],[EDS].[dbo].[Awards].[BidId],N'[IN ROW]') |
| 4325514316 | 97 | OTHER | PROBE([Bitmap1087],[EDS].[dbo].[Bids].[BidId],N'[IN ROW]') |
| 4352526932 | 90 | OTHER | PROBE([Bitmap1152],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 4362727794 | 12 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 4429175861 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715311] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715311]… |
| 4430292522 | 120 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 4484125593 | 23 | OTHER | getdate()>=[EDS].[dbo].[BidHeaders].[EffectiveFrom] AND getdate()<=[EDS].[dbo].[BidHeaders].[EffectiveUntil] |
| 4555466893 | 23 | OTHER | getdate()<=[EDS].[dbo].[BidHeaders].[EffectiveUntil] |
| 4555466893 | 23 | SEEK | Seek Keys[1]: End: [EDS].[dbo].[BidHeaders].EffectiveFrom <= Scalar Operator(getdate()) |
| 4575353979 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715382] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715382]… |
| 4614536826 | 104 | OTHER | [EDS].[dbo].[BidHeaders].[Active]=(1) AND [EDS].[dbo].[BidHeaders].[BidType]=(1) |
| 4617963429 | 54 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 4653059397 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716043] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716043]… |
| 4697179581 | 36 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 4697179581 | 43 | OTHER | [EDS].[dbo].[Items].[DistrictId]>(0) |
| 4697179581 | 52 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 4707941640 | 73 | OTHER | PROBE([Bitmap1088],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 4707941640 | 94 | OTHER | @BidsList.[RequisitionId] as [bl].[RequisitionId]=[EDS].[dbo].[Requisitions].[RequisitionId] |
| 4744693199 | 70 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 4754973536 | 10 | OTHER | [EDS].[dbo].[Headings].[DistrictId]=(0) OR isnull([EDS].[dbo].[Headings].[DistrictId],(0))=(0) |
| 4754973536 | 10 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active, [EDS].[dbo].[Headings].CategoryId = Scalar Operator((1)), Scalar Operator((7)) |
| 4754973536 | 21 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 4754973536 | 29 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() AND [EDS].[dbo].[BidHeaders].[Active]=(1) |
| 4754973536 | 36 | OTHER | PROBE([Bitmap1031],[EDS].[dbo].[Items].[ItemId],N'[IN ROW]') |
| 4754973536 | 36 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].Active = Scalar Operator((1)) |
| 4778872726 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716175] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716175]… |
| 4790765514 | 28 | OTHER | [EDS].[dbo].[CrossRefs].[Active] as [CrossRefs].[Active]=(1) AND isnull([EDS].[dbo].[CrossRefs].[CatalogId] as [CrossRefs].[CatalogId],(0))=(0) AND PR… |
| 4814260908 | 12 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 4819659823 | 70 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 4840933403 | 37 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 4840933403 | 44 | OTHER | [EDS].[dbo].[Items].[DistrictId]>(0) |
| 4840933403 | 53 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 4860889649 | 36 | OTHER | [EDS].[dbo].[CopyRequests].[StartTime] IS NULL |
| 4860889649 | 39 | OTHER | PROBE([Bitmap1037],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 4860889649 | 41 | OTHER | PROBE([Bitmap1038],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 4860889649 | 43 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) AND PROBE([Bitmap1039],[EDS].[dbo].[DistrictCategories].[DistrictId],[EDS].[dbo].[DistrictCategories].[C… |
| 4860889649 | 46 | OTHER | [EDS].[dbo].[Budgets].[Active] as [b15].[Active]=(1) AND [EDS].[dbo].[Budgets].[Name] as [b15].[Name] like CASE WHEN datepart(month,getdate())>=(10) A… |
| 4894464016 | 54 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[DistrictCategories].Active = Scalar Operator((1)) |
| 4895315483 | 20 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].CategoryId = Scalar Operator((9)) |
| 4895315483 | 23 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715358] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715358]… |
| 4977640048 | 23 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715443] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715443]… |
| 4989741943 | 59 | OTHER | PROBE([Bitmap1120],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5066492734 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715374] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715374]… |
| 5073573249 | 51 | OTHER | PROBE([Opt_Bitmap1101],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') AND PROBE([Opt_Bitmap1102],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') |
| 5073573249 | 51 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[CrossRefs].Active = Scalar Operator((1)) |
| 5078677249 | 56 | OTHER | PROBE([Bitmap1120],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5099165167 | 38 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Vendors].Active = Scalar Operator((1)) |
| 5112213179 | 52 | OTHER | PROBE([Bitmap1120],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5158609971 | 41 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[ShipLocations].[ShippingId],N'[IN ROW]') |
| 5158609971 | 45 | OTHER | PROBE([Bitmap1055],[EDS].[dbo].[School].[SchoolId],N'[IN ROW]') |
| 5159561576 | 36 | SEEK | Seek Keys[1]: Prefix: [Documents].[dbo].[Documents].DocumentTypeId, [Documents].[dbo].[Documents].deletedAt = Scalar Operator([Documents].[dbo].[Docum… |
| 5159561576 | 39 | INFO | Filter Predicate (from step 38): PROBE([Opt_Bitmap1099],[Documents].[dbo].[DocumentFiles].[Id]) |
| 5163628121 | 4 | OTHER | #Items.[Refs] as [I].[Refs]>(1) |
| 5178681701 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715613] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715613]… |
| 5193261722 | 24 | OTHER | PROBE([Bitmap1106],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 5193261722 | 81 | OTHER | PROBE([Bitmap1097],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 5193261722 | 105 | OTHER | PROBE([Bitmap1096],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5193261722 | 107 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) AND PROBE([Bitmap1098],[EDS].[dbo].[DistrictCategories].[DistrictId],[EDS].[dbo].[DistrictCategories].[C… |
| 5193261722 | 111 | OTHER | PROBE([Bitmap1101],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5210332991 | 10 | OTHER | [EDS].[dbo].[Headings].[DistrictId]=(0) OR isnull([EDS].[dbo].[Headings].[DistrictId],(0))=(0) |
| 5210332991 | 10 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active, [EDS].[dbo].[Headings].CategoryId = Scalar Operator((1)), Scalar Operator((7)) |
| 5210332991 | 21 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 5210332991 | 29 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 5210332991 | 29 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 5210332991 | 36 | OTHER | PROBE([Bitmap1031],[EDS].[dbo].[Items].[ItemId],N'[IN ROW]') |
| 5210332991 | 36 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].Active = Scalar Operator((1)) |
| 5224731305 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716028] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716028]… |
| 5243460995 | 20 | OTHER | [EDS].[dbo].[DistrictVendor].[Active]=(1) |
| 5243460995 | 33 | OTHER | [EDS].[dbo].[Bids].[Active]=(1) |
| 5243460995 | 68 | OTHER | PROBE([Opt_Bitmap1145],[EDS].[dbo].[Detail].[RequisitionId],N'[IN ROW]') |
| 5243460995 | 82 | OTHER | PROBE([Bitmap1174],[EDS].[dbo].[Budgets].[DistrictId] as [b].[DistrictId],N'[IN ROW]') |
| 5243460995 | 85 | OTHER | ([EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(1) OR [EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(2) OR [EDS].[dbo].[Requisitio… |
| 5243460995 | 121 | OTHER | [EDS].[dbo].[DistrictVendor].[Active]=(1) |
| 5243460995 | 134 | OTHER | [EDS].[dbo].[Bids].[Active]=(1) |
| 5243460995 | 169 | OTHER | PROBE([Opt_Bitmap1155],[EDS].[dbo].[Detail].[RequisitionId],N'[IN ROW]') |
| 5243460995 | 183 | OTHER | PROBE([Bitmap1179],[EDS].[dbo].[Budgets].[DistrictId] as [b].[DistrictId],N'[IN ROW]') |
| 5243460995 | 186 | OTHER | ([EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(1) OR [EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(2) OR [EDS].[dbo].[Requisitio… |
| 5243460995 | 188 | OTHER | PROBE([Bitmap1181],[EDS].[dbo].[Requisitions].[RequisitionId] as [r].[RequisitionId],N'[IN ROW]') |
| 5243460995 | 196 | OTHER | [EDS].[dbo].[Detail].[VendorId] as [dt].[VendorId]<>(7691) AND isnull([EDS].[dbo].[Detail].[ItemMustBeBid] as [dt].[ItemMustBeBid],(0))=(0) |
| 5245889023 | 23 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715325] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715325]… |
| 5251083941 | 11 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 5251083941 | 12 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 5251083941 | 13 | OTHER | [EDS].[dbo].[Users].[Active]=(1) |
| 5277832062 | 14 | OTHER | PROBE([Bitmap1076],[EDS].[dbo].[Budgets].[DistrictId] as [b].[DistrictId],N'[IN ROW]') |
| 5277832062 | 28 | OTHER | [EDS].[dbo].[DistrictVendor].[Active]=(1) |
| 5277832062 | 41 | OTHER | [EDS].[dbo].[Bids].[Active]=(1) |
| 5277832062 | 76 | OTHER | PROBE([Opt_Bitmap1066],[EDS].[dbo].[Detail].[RequisitionId],N'[IN ROW]') |
| 5277832062 | 81 | OTHER | ([EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(1) OR [EDS].[dbo].[Requisitions].[StatusId] as [r].[StatusId]=(2) OR [EDS].[dbo].[Requisitio… |
| 5288841109 | 51 | OTHER | PROBE([Opt_Bitmap1113],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') AND PROBE([Opt_Bitmap1114],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') |
| 5288841109 | 51 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[CrossRefs].Active = Scalar Operator((1)) |
| 5319546716 | 22 | OTHER | PROBE([Bitmap1137],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5319546716 | 87 | OTHER | PROBE([Bitmap1151],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 5367971146 | 42 | OTHER | PROBE([Bitmap1054],[EDS].[dbo].[ShipLocations].[ShippingId],N'[IN ROW]') |
| 5367971146 | 45 | OTHER | PROBE([Bitmap1055],[EDS].[dbo].[School].[SchoolId],N'[IN ROW]') |
| 5368710700 | 22 | OTHER | getdate()>=[EDS].[dbo].[BidHeaders].[EffectiveFrom] AND getdate()<=[EDS].[dbo].[BidHeaders].[EffectiveUntil] |
| 5368710700 | 22 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 5385286230 | 40 | OTHER | [EDS].[dbo].[Items].[DistrictId]>(0) |
| 5385286230 | 49 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5385286230 | 55 | OTHER | PROBE([Bitmap1053],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 5405044254 | 90 | OTHER | @BidsList.[RequisitionId] as [bl].[RequisitionId]=[EDS].[dbo].[Requisitions].[RequisitionId] |
| 5405044254 | 101 | OTHER | PROBE([Bitmap1095],[EDS].[dbo].[BidHeaders].[BidHeaderId],N'[IN ROW]') |
| 5422299364 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716066] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716066]… |
| 5445886872 | 71 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 5446522748 | 33 | OTHER | PROBE([Bitmap1109],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5449224162 | 24 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Accounts].Active as [A].Active = Scalar Operator((1)) |
| 5503668593 | 45 | OTHER | PROBE([Bitmap1129],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 5505512313 | 28 | OTHER | PROBE([Bitmap1041],[EDS].[dbo].[CrossRefs].[CrossRefId],N'[IN ROW]') |
| 5508043407 | 32 | OTHER | PROBE([Bitmap1109],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5508043407 | 34 | OTHER | PROBE([Bitmap1110],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 5512459709 | 14 | OTHER | PROBE([Bitmap1005],[EDS].[dbo].[TransactionLogCF].[SysId] as [tl].[SysId]) |
| 5519957092 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715274] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715274]… |
| 5614479338 | 6 | OTHER | #Items.[Refs] as [I].[Refs]>(1) |
| 5645929415 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716141] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716141]… |
| 5658426032 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715444] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715444]… |
| 5669815371 | 9 | OTHER | CONVERT(int,substring([EDS].[dbo].[Budgets].[Name],(1),(4)),0)>=datepart(year,getdate())-(3) |
| 5669815371 | 55 | INFO | Filter Predicate (from step 53): isnull([EDS].[dbo].[Requisitions].[StatusId],(0))<>(4) |
| 5669815371 | 63 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 79 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 94 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 100 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 106 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 112 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 118 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5669815371 | 124 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5703930327 | 25 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh2].[EffectiveUntil]>=[@now] |
| 5703930327 | 25 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active as [bh2].Active = Scalar Operator((1)), End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh2].Eff… |
| 5703930327 | 29 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil] as [bh1].[EffectiveUntil]>=[@now] |
| 5703930327 | 29 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active as [bh1].Active = Scalar Operator((1)), End: [EDS].[dbo].[BidHeaders].EffectiveFrom as [bh1].Eff… |
| 5703930327 | 39 | OTHER | [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(0) AND [EDS].[dbo].[Detail].[VendorId] as [d].[VendorId]<>(7691) |
| 5712999775 | 24 | OTHER | PROBE([Bitmap1107],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 5712999775 | 81 | OTHER | PROBE([Bitmap1098],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 5712999775 | 105 | OTHER | PROBE([Bitmap1097],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5712999775 | 107 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) AND PROBE([Bitmap1099],[EDS].[dbo].[DistrictCategories].[DistrictId],[EDS].[dbo].[DistrictCategories].[C… |
| 5712999775 | 111 | OTHER | PROBE([Bitmap1102],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 5714508794 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715365] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715365]… |
| 5724654366 | 66 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 5783616189 | 112 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 5795928186 | 20 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 5795928186 | 28 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 5795928186 | 28 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 5796125571 | 12 | OTHER | PROBE([Bitmap1003],[EDS].[dbo].[TransactionLogCF].[SysId] as [tl].[SysId]) |
| 5801124238 | 33 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bcp].[Active]=(1) |
| 5801124238 | 64 | SEEK | Seek Keys[1]: Prefix: [Documents].[dbo].[Documents].deletedAt as [Documents].deletedAt, [Documents].[dbo].[Documents].DocumentTypeId as [Documents].Do… |
| 5801124238 | 75 | OTHER | [EDS].[dbo].[BidHeaders].[Active] as [bh].[Active]=(1) |
| 5817688390 | 66 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 5827053421 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715314] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715314]… |
| 5848538308 | 40 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 5848538308 | 45 | OTHER | [EDS].[dbo].[Items].[DistrictId]>(0) |
| 5848538308 | 51 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND PROBE([Opt_Bitmap1047],[EDS].[dbo].[CrossRefs].[ItemId],N'[IN ROW]') AND PROBE([Opt_Bitmap1048],[EDS].[dbo].[… |
| 5848538308 | 55 | OTHER | PROBE([Bitmap1052],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 5897864836 | 23 | OTHER | ([EDS].[dbo].[Headings].[CategoryId] IS NULL OR [EDS].[dbo].[Headings].[CategoryId]=[EDS].[dbo].[Requisitions].[CategoryId]) AND ([EDS].[dbo].[Heading… |
| 5901704277 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716123] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716123]… |
| 6025273652 | 23 | OTHER | PROBE([Bitmap1137],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 6052954097 | 36 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Keywords].Active as [Keywords].Active = Scalar Operator((1)) |
| 6052954097 | 76 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Bids].Active = Scalar Operator((1)) |
| 6052954097 | 122 | OTHER | PROBE([Bitmap1126],[EDS].[dbo].[Units].[UnitId],N'[IN ROW]') |
| 6085983982 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716068] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716068]… |
| 6116220228 | 71 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) |
| 6122413993 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715726] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715726]… |
| 6123666649 | 9 | OTHER | CONVERT(int,substring([EDS].[dbo].[Budgets].[Name],(1),(4)),0)>=datepart(year,getdate())-(3) |
| 6123666649 | 55 | INFO | Filter Predicate (from step 53): isnull([EDS].[dbo].[Requisitions].[StatusId],(0))<>(4) |
| 6158715587 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715999] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715999]… |
| 6164459490 | 19 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2716172] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2716172]… |
| 6164459490 | 24 | OTHER | PROBE([Bitmap1015],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 6174981467 | 45 | OTHER | PROBE([Bitmap1129],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 6183126806 | 24 | OTHER | [EDS].[dbo].[CrossRefs].[Active]=(1) AND [EDS].[dbo].[CrossRefs].[PackedCode]>=[@Start2715554] AND [EDS].[dbo].[CrossRefs].[PackedCode]<=[@End2715554]… |
| 6207395144 | 126 | OTHER | [EDS].[dbo].[SafetyDataSheets].[Deleted] IS NULL AND [EDS].[dbo].[SafetyDataSheets].[SDSURL] like 'http%' |
| 6222160868 | 24 | OTHER | PROBE([Bitmap1105],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 6222160868 | 81 | OTHER | PROBE([Bitmap1097],[EDS].[dbo].[Budgets].[BudgetId],N'[IN ROW]') |
| 6222160868 | 105 | OTHER | PROBE([Bitmap1096],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 6222160868 | 107 | OTHER | [EDS].[dbo].[DistrictCategories].[Active]=(1) AND PROBE([Bitmap1098],[EDS].[dbo].[DistrictCategories].[DistrictId],[EDS].[dbo].[DistrictCategories].[C… |
| 6222160868 | 111 | OTHER | PROBE([Bitmap1101],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 6275345006 | 56 | OTHER | PROBE([Bitmap1120],[EDS].[dbo].[Requisitions].[RequisitionId],N'[IN ROW]') |
| 6283791575 | 39 | OTHER | [EDS].[dbo].[Detail].[VendorId]=(9) AND ([EDS].[dbo].[Detail].[ItemCode]='139F' OR [EDS].[dbo].[Detail].[ItemCode]='CAS031199') |
| 6305547587 | 48 | OTHER | PROBE([Opt_Bitmap1101],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') AND PROBE([Opt_Bitmap1102],[EDS].[dbo].[CrossRefs].[CatalogId],N'[IN ROW]') |
| 6305547587 | 48 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[CrossRefs].Active = Scalar Operator((1)) |
| 6310170313 | 33 | OTHER | PROBE([Bitmap1054],[EDS].[dbo].[Headings].[HeadingId],N'[IN ROW]') |
| 6310170313 | 54 | OTHER | [EDS].[dbo].[Catalog].[Active]=(1) AND [EDS].[dbo].[Catalog].[Name]='EDS' |
| 6339586093 | 9 | OTHER | [EDS].[dbo].[Headings].[Title]=[@Title] |
| 6339586093 | 9 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active = Scalar Operator((1)) |
| 6339586093 | 22 | OTHER | [EDS].[dbo].[Headings].[Title]=[@Title] |
| 6339586093 | 22 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active = Scalar Operator((1)) |
| 6365921684 | 19 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Catalog].Active = Scalar Operator((1)) |
| 6365921684 | 27 | OTHER | [EDS].[dbo].[BidHeaders].[EffectiveUntil]>getdate() |
| 6365921684 | 27 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[BidHeaders].Active = Scalar Operator((1)) |
| 6365921684 | 34 | OTHER | PROBE([Bitmap1031],[EDS].[dbo].[Items].[ItemId],N'[IN ROW]') |
| 6365921684 | 34 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Items].Active = Scalar Operator((1)) |
| 6365921684 | 37 | OTHER | ([EDS].[dbo].[Headings].[DistrictId]=(0) OR isnull([EDS].[dbo].[Headings].[DistrictId],(0))=(0)) AND PROBE([Bitmap1033],[EDS].[dbo].[Headings].[Headin… |
| 6365921684 | 37 | SEEK | Seek Keys[1]: Prefix: [EDS].[dbo].[Headings].Active, [EDS].[dbo].[Headings].CategoryId = Scalar Operator((1)), Scalar Operator((7)) |
