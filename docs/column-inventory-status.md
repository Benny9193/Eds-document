# Column Inventory: `*status*`

_Generated on 2026-05-04T15:15:44.873Z_
_Output: `docs\column-inventory-status.md`_

Pattern `*status*` (SQL LIKE: `%status%`) — **151** distinct column names, **913** occurrences across **15** databases.

FK role key: `→ target` = this column is an FK source pointing outward; `← source` = this column is referenced by another table's FK.

_LIKE matching respects the database collation (typically case-insensitive on Azure SQL)._

## Summary

| Column | Occurrences | Databases |
|--------|-------------|-----------|
| [`Account Status`](#account-status) | 1 | `WorkTables` |
| [`AgentStatus`](#agentstatus) | 1 | `SolarWindsOrion` |
| [`AgentStatusData`](#agentstatusdata) | 1 | `SolarWindsOrion` |
| [`AgentStatusMessage`](#agentstatusmessage) | 1 | `SolarWindsOrion` |
| [`AgentStatusTimeStampUtc`](#agentstatustimestamputc) | 1 | `SolarWindsOrion` |
| [`aiVerificationStatus`](#aiverificationstatus) | 4 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`appealStatus`](#appealstatus) | 2 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`ApprovalsStatusId`](#approvalsstatusid) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`AvgStatus`](#avgstatus) | 3 | `SolarWindsOrion` |
| [`BaseStatus`](#basestatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`BestStatus`](#beststatus) | 1 | `SolarWindsOrion` |
| [`BidRequestStatus`](#bidrequeststatus) | 9 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`BidStatus`](#bidstatus) | 21 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`CatalogRequestStatusId`](#catalogrequeststatusid) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`CategoryStatusMap`](#categorystatusmap) | 1 | `SolarWindsOrion` |
| [`ChemicalInventoryStatus`](#chemicalinventorystatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`ChildStatus`](#childstatus) | 2 | `SolarWindsOrion` |
| [`ChildStatusMap`](#childstatusmap) | 1 | `SolarWindsOrion` |
| [`closeoutStatus`](#closeoutstatus) | 2 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`CONN_STATUS`](#conn-status) | 1 | `dpa_EDSAdmin` |
| [`ConnectionStatus`](#connectionstatus) | 1 | `SolarWindsOrion` |
| [`ConnectionStatusMessage`](#connectionstatusmessage) | 1 | `SolarWindsOrion` |
| [`ConnectionStatusTimeStampUtc`](#connectionstatustimestamputc) | 1 | `SolarWindsOrion` |
| [`ContainerStatusID`](#containerstatusid) | 5 | `SolarWindsOrion` |
| [`Contracted Freight Factor Status`](#contracted-freight-factor-status) | 1 | `WorkTables` |
| [`Contracted Marketing Adj Status`](#contracted-marketing-adj-status) | 1 | `WorkTables` |
| [`Current Status 3#16#23`](#current-status-3-16-23) | 2 | `WorkTables` |
| [`Current Status 6#19#23`](#current-status-6-19-23) | 2 | `WorkTables` |
| [`CurrentStatus`](#currentstatus) | 4 | `SolarWindsOrion` |
| [`CurrentStatusRevision`](#currentstatusrevision) | 2 | `SolarWindsOrion` |
| [`CurrentStatusTimestamp`](#currentstatustimestamp) | 4 | `SolarWindsOrion` |
| [`Customer Status`](#customer-status) | 1 | `WorkTables` |
| [`CustomStatus`](#customstatus) | 2 | `SolarWindsOrion` |
| [`debarmentStatus`](#debarmentstatus) | 4 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`DestCCMPhoneStatusDescription`](#destccmphonestatusdescription) | 2 | `SolarWindsOrion` |
| [`DestGatewayStatus`](#destgatewaystatus) | 2 | `SolarWindsOrion` |
| [`DocStatus`](#docstatus) | 5 | `EDS`, `EDS_TEST_Old`, `EDS_Test`, `VendorBids`, `VendorBids_TEST` |
| [`DocUploadStatus`](#docuploadstatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`EventStatus`](#eventstatus) | 4 | `Documents`, `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`ExpirationDateStatus`](#expirationdatestatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`FacilityStatus`](#facilitystatus) | 1 | `NJ_RTK` |
| [`filterStatus`](#filterstatus) | 14 | `VendorBids`, `VendorBids_TEST` |
| [`genstatus`](#genstatus) | 1 | `WorkTables` |
| [`Go Forward Status`](#go-forward-status) | 1 | `WorkTables` |
| [`GroupMemberStatusDescription`](#groupmemberstatusdescription) | 1 | `SolarWindsOrion` |
| [`GroupMemberStatusID`](#groupmemberstatusid) | 1 | `SolarWindsOrion` |
| [`GroupMemberStatusName`](#groupmemberstatusname) | 1 | `SolarWindsOrion` |
| [`GroupStatus`](#groupstatus) | 4 | `SolarWindsOrion` |
| [`GroupStatusCalculatorID`](#groupstatuscalculatorid) | 1 | `SolarWindsOrion` |
| [`GroupStatusCalculatorName`](#groupstatuscalculatorname) | 1 | `SolarWindsOrion` |
| [`GroupStatusDescription`](#groupstatusdescription) | 1 | `SolarWindsOrion` |
| [`GroupStatusID`](#groupstatusid) | 1 | `SolarWindsOrion` |
| [`GroupStatusName`](#groupstatusname) | 1 | `SolarWindsOrion` |
| [`GroupStatusRootCause`](#groupstatusrootcause) | 1 | `SolarWindsOrion` |
| [`HEALTH_STATUS`](#health-status) | 1 | `dpa_EDSAdmin` |
| [`ImportStatus`](#importstatus) | 3 | `SolarWindsOrion`, `VendorBids`, `VendorBids_TEST` |
| [`IncludeInStatusCalculation`](#includeinstatuscalculation) | 2 | `SolarWindsOrion` |
| [`ItemStatus`](#itemstatus) | 12 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`ItemSyncStatus`](#itemsyncstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`LastStatusPollRecordTimeUtc`](#laststatuspollrecordtimeutc) | 1 | `SolarWindsOrion` |
| [`LastStatusUpdatedUTC`](#laststatusupdatedutc) | 2 | `SolarWindsOrion` |
| [`LazyUpgradeStatusID`](#lazyupgradestatusid) | 1 | `SolarWindsOrion` |
| [`LicenseStatus`](#licensestatus) | 1 | `SolarWindsOrion` |
| [`LINESTATUSCODE`](#linestatuscode) | 1 | `WorkTables` |
| [`LINESTATUSDESC`](#linestatusdesc) | 1 | `WorkTables` |
| [`LoginStatus`](#loginstatus) | 4 | `ContentCentral`, `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`MaxStatus`](#maxstatus) | 3 | `SolarWindsOrion` |
| [`MinStatus`](#minstatus) | 3 | `SolarWindsOrion` |
| [`OperationStatus`](#operationstatus) | 1 | `SolarWindsOrion` |
| [`OperationStatusName`](#operationstatusname) | 1 | `SolarWindsOrion` |
| [`Order Status`](#order-status) | 1 | `WorkTables` |
| [`OrigCCMPhoneStatusDescription`](#origccmphonestatusdescription) | 2 | `SolarWindsOrion` |
| [`OriginGatewayStatus`](#origingatewaystatus) | 2 | `SolarWindsOrion` |
| [`PendingApprovals_StatusId`](#pendingapprovals-statusid) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`PollingStatus`](#pollingstatus) | 1 | `SolarWindsOrion` |
| [`POStatus`](#postatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`POStatusID`](#postatusid) | 12 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`PreferredStatus`](#preferredstatus) | 3 | `SolarWindsOrion` |
| [`PreferredStatusRevision`](#preferredstatusrevision) | 3 | `SolarWindsOrion` |
| [`PreferredStatusTimestamp`](#preferredstatustimestamp) | 3 | `SolarWindsOrion` |
| [`pricingStatus`](#pricingstatus) | 2 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`recipient_status`](#recipient-status) | 1 | `WorkTables` |
| [`RelationshipStatus`](#relationshipstatus) | 1 | `ProcurementAnalytics` |
| [`ReqStatus`](#reqstatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test`, `WorkTables` |
| [`RequestStatus`](#requeststatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`RequisitionStatus`](#requisitionstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`RequisitionSyncStatus`](#requisitionsyncstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`responseStatus`](#responsestatus) | 2 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`ResultsStatus`](#resultsstatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`scopeVerificationStatus`](#scopeverificationstatus) | 2 | `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`scStatus`](#scstatus) | 2 | `WorkTables` |
| [`scSubstatus`](#scsubstatus) | 2 | `WorkTables` |
| [`scWin32Status`](#scwin32status) | 2 | `WorkTables` |
| [`SendStatus`](#sendstatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`SipTrunkStatus`](#siptrunkstatus) | 2 | `SolarWindsOrion` |
| [`SKU Status`](#sku-status) | 1 | `WorkTables` |
| [`SortStatus`](#sortstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`SourceNodeStatus`](#sourcenodestatus) | 1 | `SolarWindsOrion` |
| [`Status`](#status) | 280 | `Catalogs`, `EDS`, `EDS_TEST_Old`, `EDS_Test`, `IDIQ_Platform`, `IDIQ_Platform_UAT`, `NJ_RTK`, `ProcurementAnalytics`, `SolarWindsOrion`, `VendorBids`, `VendorBids_TEST`, `WorkTables`, `dpa_EDSAdmin` |
| [`status_code`](#status-code) | 2 | `EDS_Test` |
| [`status_text`](#status-text) | 1 | `EDS_Test` |
| [`status_type`](#status-type) | 1 | `EDS_Test` |
| [`Status21`](#status21) | 1 | `SolarWindsOrion` |
| [`StatusAny_DurationInMinutes`](#statusany-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusAny_Percents`](#statusany-percents) | 1 | `SolarWindsOrion` |
| [`statusbits`](#statusbits) | 6 | `VendorBids`, `VendorBids_TEST` |
| [`StatusCalculatorID`](#statuscalculatorid) | 2 | `SolarWindsOrion` |
| [`statusCode`](#statuscode) | 29 | `EDS`, `EDS_TEST_Old`, `EDS_Test`, `IDIQ_Platform`, `IDIQ_Platform_UAT` |
| [`StatusCount`](#statuscount) | 3 | `SolarWindsOrion` |
| [`StatusCountCritical`](#statuscountcritical) | 1 | `SolarWindsOrion` |
| [`StatusCountDown`](#statuscountdown) | 1 | `SolarWindsOrion` |
| [`StatusCountUnknown`](#statuscountunknown) | 1 | `SolarWindsOrion` |
| [`StatusCountUp`](#statuscountup) | 1 | `SolarWindsOrion` |
| [`StatusCountWarning`](#statuscountwarning) | 1 | `SolarWindsOrion` |
| [`StatusDate`](#statusdate) | 33 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`StatusDesc`](#statusdesc) | 24 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`StatusDescription`](#statusdescription) | 7 | `SolarWindsOrion` |
| [`StatusId`](#statusid) | 102 | `EDS`, `EDS_TEST_Old`, `EDS_Test`, `SolarWindsOrion`, `VendorBids`, `VendorBids_TEST`, `WorkTables` |
| [`StatusLED`](#statusled) | 4 | `SolarWindsOrion` |
| [`StatusMessage`](#statusmessage) | 7 | `SolarWindsOrion` |
| [`StatusName`](#statusname) | 33 | `EDS`, `EDS_TEST_Old`, `EDS_Test`, `SolarWindsOrion` |
| [`StatusPartiallyRegistered_DurationInMinutes`](#statuspartiallyregistered-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusPartiallyRegistered_Percents`](#statuspartiallyregistered-percents) | 1 | `SolarWindsOrion` |
| [`statusReason`](#statusreason) | 5 | `IDIQ_Platform`, `IDIQ_Platform_UAT`, `SolarWindsOrion` |
| [`StatusRegistered_DurationInMinutes`](#statusregistered-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusRegistered_Percents`](#statusregistered-percents) | 1 | `SolarWindsOrion` |
| [`StatusRejected_DurationInMinutes`](#statusrejected-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusRejected_Percents`](#statusrejected-percents) | 1 | `SolarWindsOrion` |
| [`StatusStr`](#statusstr) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`statusText`](#statustext) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`StatusTimestampNotUpdatedInterval`](#statustimestampnotupdatedinterval) | 1 | `SolarWindsOrion` |
| [`StatusType`](#statustype) | 1 | `ContentCentral` |
| [`StatusUnknown_DurationInMinutes`](#statusunknown-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusUnknown_Percents`](#statusunknown-percents) | 1 | `SolarWindsOrion` |
| [`StatusUnRegistered_DurationInMinutes`](#statusunregistered-durationinminutes) | 2 | `SolarWindsOrion` |
| [`StatusUnRegistered_Percents`](#statusunregistered-percents) | 1 | `SolarWindsOrion` |
| [`StatusVariableOrOID`](#statusvariableoroid) | 1 | `SolarWindsOrion` |
| [`SurveyStatus`](#surveystatus) | 2 | `NJ_RTK` |
| [`SYNC_STATUS`](#sync-status) | 1 | `dpa_EDSAdmin` |
| [`SyncStatus`](#syncstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`TargetNodeStatus`](#targetnodestatus) | 1 | `SolarWindsOrion` |
| [`VendorDocRequestStatusId`](#vendordocrequeststatusid) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`VendorQueryMSRPStatusId`](#vendorquerymsrpstatusid) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`VendorQueryStatusId`](#vendorquerystatusid) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`VendorQueryTandMStatusId`](#vendorquerytandmstatusid) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`VendorStatus`](#vendorstatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`VlanStatus`](#vlanstatus) | 1 | `SolarWindsOrion` |
| [`VoipOperationStatusID`](#voipoperationstatusid) | 10 | `SolarWindsOrion` |
| [`VPOStatus`](#vpostatus) | 3 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |
| [`WorstStatus`](#worststatus) | 1 | `SolarWindsOrion` |
| [`writeStatus`](#writestatus) | 6 | `EDS`, `EDS_TEST_Old`, `EDS_Test` |

## `Account Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Henry Schein`](tables/WorkTables/dbo.Henry_Schein.md) | nvarchar(255) | YES |  |  | table |

## `AgentStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | int | NO |  |  | table |

## `AgentStatusData`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | nvarchar(max) | YES |  |  | table |

## `AgentStatusMessage`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | nvarchar(max) | NO |  |  | table |

## `AgentStatusTimeStampUtc`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | datetime | NO |  |  | table |

## `aiVerificationStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrderAmendment`](tables/IDIQ_Platform/dbo.TaskOrderAmendment.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrderAmendment`](tables/IDIQ_Platform_UAT/dbo.TaskOrderAmendment.md) | nvarchar(1000) | YES |  |  | table |

## `appealStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform/dbo.PayrollFailureTracking.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform_UAT/dbo.PayrollFailureTracking.md) | nvarchar(1000) | YES |  |  | table |

## `ApprovalsStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_Reqs_Assoc_With_Bid`](tables/EDS/dbo.vw_Reqs_Assoc_With_Bid.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_Reqs_Assoc_With_Bid`](tables/EDS_Test/dbo.vw_Reqs_Assoc_With_Bid.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_Reqs_Assoc_With_Bid`](tables/EDS_TEST_Old/dbo.vw_Reqs_Assoc_With_Bid.md) | int | NO |  |  | view |

## `AvgStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Hourly.md) | int | NO |  |  | table |

## `BaseStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS/dbo.vw_RequisitionStatus.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS/dbo.vw_RequisitionStatusBySession.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_Test/dbo.vw_RequisitionStatus.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_Test/dbo.vw_RequisitionStatusBySession.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatusBySession.md) | varchar(50) | NO |  |  | view |

## `BestStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.NodeChildStatus`](tables/SolarWindsOrion/dbo.NodeChildStatus.md) | int | NO |  |  | table |

## `BidRequestStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS/dbo.BidAnalysisDetail.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS/dbo.BidAnalysisDetailReq.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS/dbo.vw_BidAnalysisDetail.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_Test/dbo.BidAnalysisDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_Test/dbo.BidAnalysisDetailReq.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_Test/dbo.vw_BidAnalysisDetail.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.BidAnalysisDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_TEST_Old/dbo.BidAnalysisDetailReq.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisDetail.md) | varchar(50) | NO |  |  | view |

## `BidStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_ReqDetail`](tables/EDS/dbo.vw_ReqDetail.md) | varchar(14) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ReqDetail_BK20241205`](tables/EDS/dbo.vw_ReqDetail_BK20241205.md) | varchar(14) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ReqDetail_BK20241227`](tables/EDS/dbo.vw_ReqDetail_BK20241227.md) | varchar(14) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ReqDetail1`](tables/EDS/dbo.vw_ReqDetail1.md) | varchar(14) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS/dbo.vw_RequisitionStatus.md) | varchar(20) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS/dbo.vw_RequisitionStatus_orig.md) | varchar(20) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS/dbo.vw_RequisitionStatusBySession.md) | varchar(20) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ReqDetail`](tables/EDS_Test/dbo.vw_ReqDetail.md) | varchar(14) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ReqDetail_BK20241205`](tables/EDS_Test/dbo.vw_ReqDetail_BK20241205.md) | varchar(14) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ReqDetail_BK20241227`](tables/EDS_Test/dbo.vw_ReqDetail_BK20241227.md) | varchar(14) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ReqDetail1`](tables/EDS_Test/dbo.vw_ReqDetail1.md) | varchar(14) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_Test/dbo.vw_RequisitionStatus.md) | varchar(20) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_Test/dbo.vw_RequisitionStatus_orig.md) | varchar(20) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_Test/dbo.vw_RequisitionStatusBySession.md) | varchar(20) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ReqDetail`](tables/EDS_TEST_Old/dbo.vw_ReqDetail.md) | varchar(14) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ReqDetail_BK20241205`](tables/EDS_TEST_Old/dbo.vw_ReqDetail_BK20241205.md) | varchar(14) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ReqDetail_BK20241227`](tables/EDS_TEST_Old/dbo.vw_ReqDetail_BK20241227.md) | varchar(14) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ReqDetail1`](tables/EDS_TEST_Old/dbo.vw_ReqDetail1.md) | varchar(14) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus.md) | varchar(20) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus_orig.md) | varchar(20) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatusBySession.md) | varchar(20) | NO |  |  | view |

## `CatalogRequestStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS/dbo.CatalogRequestStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS/dbo.vw_CatalogRequestStatus.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_Test/dbo.CatalogRequestStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_Test/dbo.vw_CatalogRequestStatus.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.CatalogRequestStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.vw_CatalogRequestStatus.md) | int | YES |  |  | view |

## `CategoryStatusMap`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.StatusInfo`](tables/SolarWindsOrion/dbo.StatusInfo.md) | int | YES |  |  | table |

## `ChemicalInventoryStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.RTK_Sites`](tables/EDS/dbo.RTK_Sites.md) | tinyint | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_RTK_Sites`](tables/EDS/dbo.vw_RTK_Sites.md) | tinyint | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.RTK_Sites`](tables/EDS_Test/dbo.RTK_Sites.md) | tinyint | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_RTK_Sites`](tables/EDS_Test/dbo.vw_RTK_Sites.md) | tinyint | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.RTK_Sites`](tables/EDS_TEST_Old/dbo.RTK_Sites.md) | tinyint | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RTK_Sites`](tables/EDS_TEST_Old/dbo.vw_RTK_Sites.md) | tinyint | NO |  |  | view |

## `ChildStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | int | NO |  |  | table |

## `ChildStatusMap`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.StatusInfo`](tables/SolarWindsOrion/dbo.StatusInfo.md) | int | NO |  |  | table |

## `closeoutStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |

## `CONN_STATUS`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_REPLICA`](tables/dpa_EDSAdmin/dbo.CON_AG_REPLICA.md) | tinyint | YES |  |  | table |

## `ConnectionStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | int | NO |  |  | table |

## `ConnectionStatusMessage`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | nvarchar(max) | NO |  |  | table |

## `ConnectionStatusTimeStampUtc`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_Agents`](tables/SolarWindsOrion/dbo.AgentManagement_Agents.md) | datetime | NO |  |  | table |

## `ContainerStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_Daily`](tables/SolarWindsOrion/dbo.ContainerStatus_Daily.md) | bigint | NO | YES | ← `dbo.ContainerStatus_DailyData(ContainerStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_DailyData`](tables/SolarWindsOrion/dbo.ContainerStatus_DailyData.md) | bigint | NO | YES | → `dbo.ContainerStatus_Daily(ContainerStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_Detail`](tables/SolarWindsOrion/dbo.ContainerStatus_Detail.md) | bigint | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_Hourly`](tables/SolarWindsOrion/dbo.ContainerStatus_Hourly.md) | bigint | NO | YES | ← `dbo.ContainerStatus_HourlyData(ContainerStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_HourlyData`](tables/SolarWindsOrion/dbo.ContainerStatus_HourlyData.md) | bigint | NO | YES | → `dbo.ContainerStatus_Hourly(ContainerStatusID)` | table |

## `Contracted Freight Factor Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Henry Schein`](tables/WorkTables/dbo.Henry_Schein.md) | nvarchar(255) | YES |  |  | table |

## `Contracted Marketing Adj Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Henry Schein`](tables/WorkTables/dbo.Henry_Schein.md) | nvarchar(255) | YES |  |  | table |

## `Current Status 3#16#23`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.SchoolSpecialty2023GeneralBids`](tables/WorkTables/dbo.SchoolSpecialty2023GeneralBids.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.SchoolSpecialty2023SpecialtyBids`](tables/WorkTables/dbo.SchoolSpecialty2023SpecialtyBids.md) | nvarchar(255) | YES |  |  | table |

## `Current Status 6#19#23`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.SS 0623 General Bids`](tables/WorkTables/dbo.SS_0623_General_Bids.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.SS 0623 Specialty Bids`](tables/WorkTables/dbo.SS_0623_Specialty_Bids.md) | nvarchar(255) | YES |  |  | table |

## `CurrentStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_FacilitiesInstances`](tables/SolarWindsOrion/dbo.HA_FacilitiesInstances.md) | int | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_Pools`](tables/SolarWindsOrion/dbo.HA_Pools.md) | int | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolsView`](tables/SolarWindsOrion/dbo.HA_PoolsView.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | int | YES |  |  | table |

## `CurrentStatusRevision`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_FacilitiesInstances`](tables/SolarWindsOrion/dbo.HA_FacilitiesInstances.md) | bigint | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | bigint | YES |  |  | table |

## `CurrentStatusTimestamp`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_FacilitiesInstances`](tables/SolarWindsOrion/dbo.HA_FacilitiesInstances.md) | datetime2 | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_Pools`](tables/SolarWindsOrion/dbo.HA_Pools.md) | datetime2 | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolsView`](tables/SolarWindsOrion/dbo.HA_PoolsView.md) | datetime2 | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | datetime2 | YES |  |  | table |

## `Customer Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Henry Schein`](tables/WorkTables/dbo.Henry_Schein.md) | nvarchar(255) | YES |  |  | table |

## `CustomStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | bit | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | bit | NO |  |  | table |

## `debarmentStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.Vendor`](tables/IDIQ_Platform/dbo.Vendor.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Vendor`](tables/IDIQ_Platform_UAT/dbo.Vendor.md) | nvarchar(1000) | NO |  |  | table |

## `DestCCMPhoneStatusDescription`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetails`](tables/SolarWindsOrion/dbo.VoipCallDetails.md) | nvarchar(255) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetailsAlert`](tables/SolarWindsOrion/dbo.VoipCallDetailsAlert.md) | nvarchar(255) | YES |  |  | view |

## `DestGatewayStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetails`](tables/SolarWindsOrion/dbo.VoipCallDetails.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetailsAlert`](tables/SolarWindsOrion/dbo.VoipCallDetailsAlert.md) | int | YES |  |  | view |

## `DocStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS/dbo.vw_BidMgrBidderDocs.md) | char(1) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS_Test/dbo.vw_BidMgrBidderDocs.md) | char(1) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS_TEST_Old/dbo.vw_BidMgrBidderDocs.md) | char(1) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendordocumentsviewByUser`](tables/VendorBids/dbo.vendordocumentsviewByUser.md) | varchar(8) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendordocumentsviewByUser`](tables/VendorBids_TEST/dbo.vendordocumentsviewByUser.md) | varchar(8) | NO |  |  | view |

## `DocUploadStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS/dbo.vw_RptExpireDateBidDocs.md) | char(1) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS/dbo.vw_RptExpireDateBidDocsAndMore.md) | char(1) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocs.md) | char(1) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocsAndMore.md) | char(1) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocs.md) | char(1) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocsAndMore.md) | char(1) | NO |  |  | view |

## `EventStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `Documents` | `dbo` | [`dbo.ZonalEvents`](tables/Documents/dbo.ZonalEvents.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.ScanEvents`](tables/EDS/dbo.ScanEvents.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ScanEvents`](tables/EDS_Test/dbo.ScanEvents.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ScanEvents`](tables/EDS_TEST_Old/dbo.ScanEvents.md) | varchar(255) | YES |  |  | table |

## `ExpirationDateStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS/dbo.vw_RptExpireDateBidDocs.md) | varchar(46) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS/dbo.vw_RptExpireDateBidDocsAndMore.md) | varchar(46) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocs.md) | varchar(46) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocsAndMore.md) | varchar(46) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocs.md) | varchar(46) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocsAndMore.md) | varchar(46) | YES |  |  | view |

## `FacilityStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `NJ_RTK` | `dbo` | [`dbo.Facilities`](tables/NJ_RTK/dbo.Facilities.md) | varchar(50) | YES |  |  | table |

## `filterStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `VendorBids` | `dbo` | [`dbo.CategoryView`](tables/VendorBids/dbo.CategoryView.md) | varchar(9) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids/dbo.cfv_vendorbidsview.md) | varchar(9) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.filterCategories`](tables/VendorBids/dbo.filterCategories.md) | varchar(9) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.filterStates`](tables/VendorBids/dbo.filterStates.md) | int | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.filterStatuses`](tables/VendorBids/dbo.filterStatuses.md) | varchar(9) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids/dbo.vendorbidsview.md) | varchar(9) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids/dbo.vendorbidsviewByUser.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.CategoryView`](tables/VendorBids_TEST/dbo.CategoryView.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids_TEST/dbo.cfv_vendorbidsview.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.filterCategories`](tables/VendorBids_TEST/dbo.filterCategories.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.filterStates`](tables/VendorBids_TEST/dbo.filterStates.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.filterStatuses`](tables/VendorBids_TEST/dbo.filterStatuses.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids_TEST/dbo.vendorbidsview.md) | varchar(9) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids_TEST/dbo.vendorbidsviewByUser.md) | varchar(9) | NO |  |  | view |

## `genstatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.MSmerge_genHistory`](tables/WorkTables/dbo.MSmerge_genHistory.md) | tinyint | NO |  |  | table |

## `Go Forward Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Bid 13264`](tables/WorkTables/dbo.Bid_13264.md) | nvarchar(255) | YES |  |  | table |

## `GroupMemberStatusDescription`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(max) | YES |  |  | view |

## `GroupMemberStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | int | NO |  |  | view |

## `GroupMemberStatusName`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(50) | NO |  |  | view |

## `GroupStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_HistoricalContainerStatus`](tables/SolarWindsOrion/dbo.Containers_HistoricalContainerStatus.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | char(40) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | char(40) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPInterface`](tables/SolarWindsOrion/dbo.VoIPInterface.md) | char(40) | YES |  |  | view |

## `GroupStatusCalculatorID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | smallint | NO |  |  | view |

## `GroupStatusCalculatorName`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(1024) | NO |  |  | view |

## `GroupStatusDescription`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(max) | YES |  |  | view |

## `GroupStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | int | NO |  |  | view |

## `GroupStatusName`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(50) | NO |  |  | view |

## `GroupStatusRootCause`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers_AlertsAndReportsData`](tables/SolarWindsOrion/dbo.Containers_AlertsAndReportsData.md) | nvarchar(max) | YES |  |  | view |

## `HEALTH_STATUS`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_STATUS_SUMMARY`](tables/dpa_EDSAdmin/dbo.CON_AG_STATUS_SUMMARY.md) | smallint | NO |  |  | table |

## `ImportStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.DiscoveredNetObjectStatuses`](tables/SolarWindsOrion/dbo.DiscoveredNetObjectStatuses.md) | smallint | NO |  |  | table |
| `VendorBids` | `dbo` | [`dbo.vendorbiditemimports`](tables/VendorBids/dbo.vendorbiditemimports.md) | varchar(512) | YES |  |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbiditemimports`](tables/VendorBids_TEST/dbo.vendorbiditemimports.md) | varchar(512) | YES |  |  | table |

## `IncludeInStatusCalculation`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.DeletedAutoDependencies`](tables/SolarWindsOrion/dbo.DeletedAutoDependencies.md) | bit | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Dependencies`](tables/SolarWindsOrion/dbo.Dependencies.md) | bit | NO |  |  | table |

## `ItemStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS/dbo.BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS/dbo.BidAnalysisDetailReq.md) | varchar(max) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS/dbo.vw_BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ReqBidReview`](tables/EDS/dbo.vw_ReqBidReview.md) | varchar(65) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_Test/dbo.BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_Test/dbo.BidAnalysisDetailReq.md) | varchar(max) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_Test/dbo.vw_BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ReqBidReview`](tables/EDS_Test/dbo.vw_ReqBidReview.md) | varchar(65) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_TEST_Old/dbo.BidAnalysisDetailReq.md) | varchar(max) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisDetail.md) | varchar(max) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ReqBidReview`](tables/EDS_TEST_Old/dbo.vw_ReqBidReview.md) | varchar(65) | NO |  |  | view |

## `ItemSyncStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_Test/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_TEST_Old/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |

## `LastStatusPollRecordTimeUtc`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunks`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunks.md) | datetime | YES |  |  | table |

## `LastStatusUpdatedUTC`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMGateways`](tables/SolarWindsOrion/dbo.VoipCCMGateways.md) | datetime | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMH323Devices`](tables/SolarWindsOrion/dbo.VoipCCMH323Devices.md) | datetime | YES |  |  | table |

## `LazyUpgradeStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.LazyUpgradeStatusProgress`](tables/SolarWindsOrion/dbo.LazyUpgradeStatusProgress.md) | uniqueidentifier | NO | YES |  | table |

## `LicenseStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipConnectedPhonesReport`](tables/SolarWindsOrion/dbo.VoipConnectedPhonesReport.md) | bit | NO |  |  | view |

## `LINESTATUSCODE`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Staples Kill`](tables/WorkTables/dbo.Staples_Kill.md) | nvarchar(255) | YES |  |  | table |

## `LINESTATUSDESC`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.Staples Kill`](tables/WorkTables/dbo.Staples_Kill.md) | nvarchar(255) | YES |  |  | table |

## `LoginStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `ContentCentral` | `dbo` | [`dbo.LogEntry`](tables/ContentCentral/dbo.LogEntry.md) | nvarchar(7) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VPOLoginAttempts`](tables/EDS/dbo.VPOLoginAttempts.md) | int | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VPOLoginAttempts`](tables/EDS_Test/dbo.VPOLoginAttempts.md) | int | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VPOLoginAttempts`](tables/EDS_TEST_Old/dbo.VPOLoginAttempts.md) | int | NO |  |  | table |

## `MaxStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Hourly.md) | int | NO |  |  | table |

## `MinStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Daily`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Hourly.md) | int | NO |  |  | table |

## `OperationStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | varchar(100) | YES |  |  | table |

## `OperationStatusName`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoIPOperationCurrentStats.md) | varchar(100) | YES |  |  | view |

## `Order Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.SS Repl 2024 Supl`](tables/WorkTables/dbo.SS_Repl_2024_Supl.md) | nvarchar(255) | YES |  |  | table |

## `OrigCCMPhoneStatusDescription`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetails`](tables/SolarWindsOrion/dbo.VoipCallDetails.md) | nvarchar(255) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetailsAlert`](tables/SolarWindsOrion/dbo.VoipCallDetailsAlert.md) | nvarchar(255) | YES |  |  | view |

## `OriginGatewayStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetails`](tables/SolarWindsOrion/dbo.VoipCallDetails.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCallDetailsAlert`](tables/SolarWindsOrion/dbo.VoipCallDetailsAlert.md) | int | YES |  |  | view |

## `PendingApprovals_StatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.pa_ReqList`](tables/EDS/dbo.pa_ReqList.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.pa_ReqList`](tables/EDS_Test/dbo.pa_ReqList.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.pa_ReqList`](tables/EDS_TEST_Old/dbo.pa_ReqList.md) | int | YES |  |  | view |

## `PollingStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMMonitoring`](tables/SolarWindsOrion/dbo.VoipCCMMonitoring.md) | nvarchar(100) | YES |  |  | table |

## `POStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_POStatus`](tables/EDS/dbo.vw_POStatus.md) | varchar(125) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_POStatus_Test`](tables/EDS/dbo.vw_POStatus_Test.md) | varchar(125) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_POStatus`](tables/EDS_Test/dbo.vw_POStatus.md) | varchar(125) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_POStatus_Test`](tables/EDS_Test/dbo.vw_POStatus_Test.md) | varchar(125) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_POStatus`](tables/EDS_TEST_Old/dbo.vw_POStatus.md) | varchar(125) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_POStatus_Test`](tables/EDS_TEST_Old/dbo.vw_POStatus_Test.md) | varchar(125) | YES |  |  | view |

## `POStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `archive` | [`archive.PO`](tables/EDS/archive.PO.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.PO`](tables/EDS/dbo.PO.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.POStatus`](tables/EDS/dbo.POStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.POStatusTable`](tables/EDS/dbo.POStatusTable.md) | int | NO | YES |  | table |
| `EDS_Test` | `archive` | [`archive.PO`](tables/EDS_Test/archive.PO.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.PO`](tables/EDS_Test/dbo.PO.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.POStatus`](tables/EDS_Test/dbo.POStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.POStatusTable`](tables/EDS_Test/dbo.POStatusTable.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `archive` | [`archive.PO`](tables/EDS_TEST_Old/archive.PO.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.PO`](tables/EDS_TEST_Old/dbo.PO.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POStatus`](tables/EDS_TEST_Old/dbo.POStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POStatusTable`](tables/EDS_TEST_Old/dbo.POStatusTable.md) | int | NO | YES |  | table |

## `PreferredStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | int | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | int | NO |  |  | table |

## `PreferredStatusRevision`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | bigint | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | bigint | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | bigint | YES |  |  | table |

## `PreferredStatusTimestamp`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | datetime2 | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | datetime2 | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_ResourcesInstances`](tables/SolarWindsOrion/dbo.HA_ResourcesInstances.md) | datetime2 | YES |  |  | table |

## `pricingStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |

## `recipient_status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.AngelaEmails`](tables/WorkTables/dbo.AngelaEmails.md) | nvarchar(3000) | NO |  |  | table |

## `RelationshipStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `ProcurementAnalytics` | `dbo` | [`dbo.EntityVendors`](tables/ProcurementAnalytics/dbo.EntityVendors.md) | varchar(20) | NO |  |  | table |

## `ReqStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_RefList`](tables/EDS/dbo.vw_RefList.md) | varchar(255) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RefList`](tables/EDS_Test/dbo.vw_RefList.md) | varchar(255) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RefList`](tables/EDS_TEST_Old/dbo.vw_RefList.md) | varchar(255) | YES |  |  | view |
| `WorkTables` | `dbo` | [`dbo.EEItemsB4Reproc`](tables/WorkTables/dbo.EEItemsB4Reproc.md) | varchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.rgsorders9275`](tables/WorkTables/dbo.rgsorders9275.md) | varchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.StaplesDroppedRefList`](tables/WorkTables/dbo.StaplesDroppedRefList.md) | varchar(255) | YES |  |  | table |

## `RequestStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.ShippingRequests`](tables/EDS/dbo.ShippingRequests.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ShippingRequests`](tables/EDS_Test/dbo.ShippingRequests.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ShippingRequests`](tables/EDS_TEST_Old/dbo.ShippingRequests.md) | varchar(50) | YES |  |  | table |

## `RequisitionStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS/dbo.vw_ExistingRequisitions.md) | varchar(255) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS_Test/dbo.vw_ExistingRequisitions.md) | varchar(255) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS_TEST_Old/dbo.vw_ExistingRequisitions.md) | varchar(255) | YES |  |  | view |

## `RequisitionSyncStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_Test/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_TEST_Old/dbo.SDSSyncStatus.md) | varchar(50) | YES |  |  | table |

## `responseStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.WebhookDelivery`](tables/IDIQ_Platform/dbo.WebhookDelivery.md) | int | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.WebhookDelivery`](tables/IDIQ_Platform_UAT/dbo.WebhookDelivery.md) | int | YES |  |  | table |

## `ResultsStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS/dbo.BidAnalysisDetail.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS/dbo.vw_BidAnalysisDetail.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_Test/dbo.BidAnalysisDetail.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_Test/dbo.vw_BidAnalysisDetail.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.BidAnalysisDetail.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisDetail.md) | int | NO |  |  | view |

## `scopeVerificationStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | nvarchar(1000) | YES |  |  | table |

## `scStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.IISLogs`](tables/WorkTables/dbo.IISLogs.md) | int | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.WSiisLogs`](tables/WorkTables/dbo.WSiisLogs.md) | int | YES |  |  | table |

## `scSubstatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.IISLogs`](tables/WorkTables/dbo.IISLogs.md) | int | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.WSiisLogs`](tables/WorkTables/dbo.WSiisLogs.md) | int | YES |  |  | table |

## `scWin32Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.IISLogs`](tables/WorkTables/dbo.IISLogs.md) | int | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.WSiisLogs`](tables/WorkTables/dbo.WSiisLogs.md) | int | YES |  |  | table |

## `SendStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.POQueue`](tables/EDS/dbo.POQueue.md) | varchar(50) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.POQueueItems`](tables/EDS/dbo.POQueueItems.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.POQueue`](tables/EDS_Test/dbo.POQueue.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.POQueueItems`](tables/EDS_Test/dbo.POQueueItems.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POQueue`](tables/EDS_TEST_Old/dbo.POQueue.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POQueueItems`](tables/EDS_TEST_Old/dbo.POQueueItems.md) | varchar(255) | YES |  |  | table |

## `SipTrunkStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Detail`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Detail.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatuses`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatuses.md) | int | NO | YES |  | table |

## `SKU Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `WorkTables` | `dbo` | [`dbo.United Nov 24`](tables/WorkTables/dbo.United_Nov_24.md) | nvarchar(255) | YES |  |  | table |

## `SortStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.BidMgrView`](tables/EDS/dbo.BidMgrView.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidMgrView`](tables/EDS_Test/dbo.BidMgrView.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidMgrView`](tables/EDS_TEST_Old/dbo.BidMgrView.md) | int | YES |  |  | view |

## `SourceNodeStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoIPOperationCurrentStats.md) | char(20) | YES |  |  | view |

## `Status`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `Catalogs` | `dbo` | [`dbo.Master Catalog`](tables/Catalogs/dbo.Master_Catalog.md) | tinyint | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_ALERT_DB_RESULTS`](tables/dpa_EDSAdmin/dbo.CON_ALERT_DB_RESULTS.md) | varchar(10) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_CONTACT`](tables/dpa_EDSAdmin/dbo.CON_CONTACT.md) | char(1) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONAIQ_1`](tables/dpa_EDSAdmin/dbo.CONAIQ_1.md) | varchar(64) | YES |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.COND`](tables/dpa_EDSAdmin/dbo.COND.md) | varchar(10) | NO |  |  | table |
| `dpa_EDSAdmin` | `dbo` | [`dbo.CONV`](tables/dpa_EDSAdmin/dbo.CONV.md) | varchar(10) | NO |  |  | table |
| `EDS` | `archive` | [`archive.BidImports`](tables/EDS/archive.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS` | `archive` | [`archive.BidRequestItems`](tables/EDS/archive.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS` | `archive` | [`archive.BidResults`](tables/EDS/archive.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS/dbo.BidAnalysisDetail.md) | varchar(51) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS/dbo.BidAnalysisDetailReq.md) | varchar(51) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidCalendar`](tables/EDS/dbo.BidCalendar.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidImports`](tables/EDS/dbo.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidMgrBidRequestDetail`](tables/EDS/dbo.BidMgrBidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidMgrView`](tables/EDS/dbo.BidMgrView.md) | varchar(51) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidRequestDetail`](tables/EDS/dbo.BidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidRequestDetail1`](tables/EDS/dbo.BidRequestDetail1.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidRequestDetail2`](tables/EDS/dbo.BidRequestDetail2.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.BidRequestItems`](tables/EDS/dbo.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidRequestItems_Orig`](tables/EDS/dbo.BidRequestItems_Orig.md) | varchar(50) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidResults`](tables/EDS/dbo.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidResults_Orig`](tables/EDS/dbo.BidResults_Orig.md) | varchar(51) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.BidResultsView`](tables/EDS/dbo.BidResultsView.md) | varchar(51) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.DistrictContinuances`](tables/EDS/dbo.DistrictContinuances.md) | char(1) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.FreezeItems2015`](tables/EDS/dbo.FreezeItems2015.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.IPQueue`](tables/EDS/dbo.IPQueue.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.IPQueueUsers`](tables/EDS/dbo.IPQueueUsers.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.ScheduledTask`](tables/EDS/dbo.ScheduledTask.md) | nvarchar(50) | NO |  |  | table |
| `EDS` | `dbo` | [`dbo.UploadView`](tables/EDS/dbo.UploadView.md) | varchar(255) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.UserTrees`](tables/EDS/dbo.UserTrees.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorUploads`](tables/EDS/dbo.VendorUploads.md) | varchar(255) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS/dbo.vw_BidAnalysisDetail.md) | varchar(51) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS/dbo.vw_BidRequestItemsBidMgr.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS/dbo.vw_CatalogRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ContinuanceCharges`](tables/EDS/dbo.vw_ContinuanceCharges.md) | char(1) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_Financials`](tables/EDS/dbo.vw_Financials.md) | varchar(13) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_OverrideReferences`](tables/EDS/dbo.vw_OverrideReferences.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS/dbo.vw_RequisitionList.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_StatusDetailed`](tables/EDS/dbo.vw_StatusDetailed.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS/dbo.vw_VendorDocRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS/dbo.vw_VendorQueryMSRPStatus.md) | varchar(18) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS/dbo.vw_VendorQueryStatus.md) | varchar(18) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS/dbo.vw_VendorQueryTandMStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_Test` | `archive` | [`archive.BidImports`](tables/EDS_Test/archive.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `archive` | [`archive.BidRequestItems`](tables/EDS_Test/archive.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `archive` | [`archive.BidResults`](tables/EDS_Test/archive.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_Test/dbo.BidAnalysisDetail.md) | varchar(51) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_Test/dbo.BidAnalysisDetailReq.md) | varchar(51) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidCalendar`](tables/EDS_Test/dbo.BidCalendar.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidImports`](tables/EDS_Test/dbo.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidMgrBidRequestDetail`](tables/EDS_Test/dbo.BidMgrBidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidMgrView`](tables/EDS_Test/dbo.BidMgrView.md) | varchar(51) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidRequestDetail`](tables/EDS_Test/dbo.BidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidRequestDetail1`](tables/EDS_Test/dbo.BidRequestDetail1.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidRequestDetail2`](tables/EDS_Test/dbo.BidRequestDetail2.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.BidRequestItems`](tables/EDS_Test/dbo.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidRequestItems_Orig`](tables/EDS_Test/dbo.BidRequestItems_Orig.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidResults`](tables/EDS_Test/dbo.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidResults_Orig`](tables/EDS_Test/dbo.BidResults_Orig.md) | varchar(51) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.BidResultsView`](tables/EDS_Test/dbo.BidResultsView.md) | varchar(51) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.DistrictContinuances`](tables/EDS_Test/dbo.DistrictContinuances.md) | char(1) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.FreezeItems2015`](tables/EDS_Test/dbo.FreezeItems2015.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.IPQueue`](tables/EDS_Test/dbo.IPQueue.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.IPQueueUsers`](tables/EDS_Test/dbo.IPQueueUsers.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ScheduledTask`](tables/EDS_Test/dbo.ScheduledTask.md) | nvarchar(50) | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.UploadView`](tables/EDS_Test/dbo.UploadView.md) | varchar(255) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.UserTrees`](tables/EDS_Test/dbo.UserTrees.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorUploads`](tables/EDS_Test/dbo.VendorUploads.md) | varchar(255) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_Test/dbo.vw_BidAnalysisDetail.md) | varchar(51) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS_Test/dbo.vw_BidRequestItemsBidMgr.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_Test/dbo.vw_CatalogRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ContinuanceCharges`](tables/EDS_Test/dbo.vw_ContinuanceCharges.md) | char(1) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_Financials`](tables/EDS_Test/dbo.vw_Financials.md) | varchar(13) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_OverrideReferences`](tables/EDS_Test/dbo.vw_OverrideReferences.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS_Test/dbo.vw_RequisitionList.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_StatusDetailed`](tables/EDS_Test/dbo.vw_StatusDetailed.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_Test/dbo.vw_VendorDocRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_Test/dbo.vw_VendorQueryMSRPStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_Test/dbo.vw_VendorQueryStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_Test/dbo.vw_VendorQueryTandMStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_TEST_Old` | `archive` | [`archive.BidImports`](tables/EDS_TEST_Old/archive.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `archive` | [`archive.BidRequestItems`](tables/EDS_TEST_Old/archive.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `archive` | [`archive.BidResults`](tables/EDS_TEST_Old/archive.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.BidAnalysisDetail.md) | varchar(51) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidAnalysisDetailReq`](tables/EDS_TEST_Old/dbo.BidAnalysisDetailReq.md) | varchar(51) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidCalendar`](tables/EDS_TEST_Old/dbo.BidCalendar.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidImports`](tables/EDS_TEST_Old/dbo.BidImports.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidMgrBidRequestDetail`](tables/EDS_TEST_Old/dbo.BidMgrBidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidMgrView`](tables/EDS_TEST_Old/dbo.BidMgrView.md) | varchar(51) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidRequestDetail`](tables/EDS_TEST_Old/dbo.BidRequestDetail.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidRequestDetail1`](tables/EDS_TEST_Old/dbo.BidRequestDetail1.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidRequestDetail2`](tables/EDS_TEST_Old/dbo.BidRequestDetail2.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidRequestItems`](tables/EDS_TEST_Old/dbo.BidRequestItems.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidRequestItems_Orig`](tables/EDS_TEST_Old/dbo.BidRequestItems_Orig.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidResults`](tables/EDS_TEST_Old/dbo.BidResults.md) | varchar(51) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidResults_Orig`](tables/EDS_TEST_Old/dbo.BidResults_Orig.md) | varchar(51) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.BidResultsView`](tables/EDS_TEST_Old/dbo.BidResultsView.md) | varchar(51) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.DistrictContinuances`](tables/EDS_TEST_Old/dbo.DistrictContinuances.md) | char(1) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.FreezeItems2015`](tables/EDS_TEST_Old/dbo.FreezeItems2015.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.IPQueue`](tables/EDS_TEST_Old/dbo.IPQueue.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.IPQueueUsers`](tables/EDS_TEST_Old/dbo.IPQueueUsers.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ScheduledTask`](tables/EDS_TEST_Old/dbo.ScheduledTask.md) | nvarchar(50) | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.UploadView`](tables/EDS_TEST_Old/dbo.UploadView.md) | varchar(255) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.UserTrees`](tables/EDS_TEST_Old/dbo.UserTrees.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorUploads`](tables/EDS_TEST_Old/dbo.VendorUploads.md) | varchar(255) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidAnalysisDetail`](tables/EDS_TEST_Old/dbo.vw_BidAnalysisDetail.md) | varchar(51) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidRequestItemsBidMgr`](tables/EDS_TEST_Old/dbo.vw_BidRequestItemsBidMgr.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.vw_CatalogRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ContinuanceCharges`](tables/EDS_TEST_Old/dbo.vw_ContinuanceCharges.md) | char(1) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_Financials`](tables/EDS_TEST_Old/dbo.vw_Financials.md) | varchar(13) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_OverrideReferences`](tables/EDS_TEST_Old/dbo.vw_OverrideReferences.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS_TEST_Old/dbo.vw_RequisitionList.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_StatusDetailed`](tables/EDS_TEST_Old/dbo.vw_StatusDetailed.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.vw_VendorDocRequestStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryMSRPStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryStatus.md) | varchar(18) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryTandMStatus.md) | varchar(18) | YES |  |  | view |
| `IDIQ_Platform` | `dbo` | [`dbo.AddendumDistributionLog`](tables/IDIQ_Platform/dbo.AddendumDistributionLog.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.AdministrativeHearingRequest`](tables/IDIQ_Platform/dbo.AdministrativeHearingRequest.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.AIVerification`](tables/IDIQ_Platform/dbo.AIVerification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.ApprenticeshipCompliance`](tables/IDIQ_Platform/dbo.ApprenticeshipCompliance.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.AwardRecommendation`](tables/IDIQ_Platform/dbo.AwardRecommendation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.Bid`](tables/IDIQ_Platform/dbo.Bid.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform/dbo.CertifiedPayroll.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CertifiedPayrollReceipt`](tables/IDIQ_Platform/dbo.CertifiedPayrollReceipt.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform/dbo.CertifiedPayrollSubmission.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.Contract`](tables/IDIQ_Platform/dbo.Contract.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform/dbo.ContractorPayrollViolation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.ContractTermination`](tables/IDIQ_Platform/dbo.ContractTermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CooperativeDebarment`](tables/IDIQ_Platform/dbo.CooperativeDebarment.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CooperativeVendorViolation`](tables/IDIQ_Platform/dbo.CooperativeVendorViolation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform/dbo.CostEffectivenessDetermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.EmailLog`](tables/IDIQ_Platform/dbo.EmailLog.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.ESignatureEnvelope`](tables/IDIQ_Platform/dbo.ESignatureEnvelope.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.ESignatureSigner`](tables/IDIQ_Platform/dbo.ESignatureSigner.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform/dbo.FinalPaymentCertification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.JobReference`](tables/IDIQ_Platform/dbo.JobReference.md) | nvarchar(20) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.LowestBidCertification`](tables/IDIQ_Platform/dbo.LowestBidCertification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.MiniBid`](tables/IDIQ_Platform/dbo.MiniBid.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.MonthlyPublicPosting`](tables/IDIQ_Platform/dbo.MonthlyPublicPosting.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.NJWageHubSubmission`](tables/IDIQ_Platform/dbo.NJWageHubSubmission.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PayrollFailure`](tables/IDIQ_Platform/dbo.PayrollFailure.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform/dbo.PayrollFailureTracking.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform/dbo.PayrollRecordWithholding.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PublicPostingReport`](tables/IDIQ_Platform/dbo.PublicPostingReport.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform/dbo.PublicWorksContractorRegistration.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.RetaliationComplaint`](tables/IDIQ_Platform/dbo.RetaliationComplaint.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.Solicitation`](tables/IDIQ_Platform/dbo.Solicitation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform/dbo.SolicitationAddendum.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform/dbo.SolicitationAdvertisement.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.StopWorkOrder`](tables/IDIQ_Platform/dbo.StopWorkOrder.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.Subcontractor`](tables/IDIQ_Platform/dbo.Subcontractor.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform/dbo.TaskOrder.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.TaskOrderCostSavings`](tables/IDIQ_Platform/dbo.TaskOrderCostSavings.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform/dbo.UnsuccessfulBidderClaim.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.UserInvitation`](tables/IDIQ_Platform/dbo.UserInvitation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.VendorRelationship`](tables/IDIQ_Platform/dbo.VendorRelationship.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.WageRateDetermination`](tables/IDIQ_Platform/dbo.WageRateDetermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.WageRateImport`](tables/IDIQ_Platform/dbo.WageRateImport.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.WebhookDelivery`](tables/IDIQ_Platform/dbo.WebhookDelivery.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.WorkerWageProtest`](tables/IDIQ_Platform/dbo.WorkerWageProtest.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.AddendumDistributionLog`](tables/IDIQ_Platform_UAT/dbo.AddendumDistributionLog.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.AdministrativeHearingRequest`](tables/IDIQ_Platform_UAT/dbo.AdministrativeHearingRequest.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.AIVerification`](tables/IDIQ_Platform_UAT/dbo.AIVerification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ApprenticeshipCompliance`](tables/IDIQ_Platform_UAT/dbo.ApprenticeshipCompliance.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.AwardRecommendation`](tables/IDIQ_Platform_UAT/dbo.AwardRecommendation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Bid`](tables/IDIQ_Platform_UAT/dbo.Bid.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CertifiedPayroll`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayroll.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CertifiedPayrollReceipt`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollReceipt.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CertifiedPayrollSubmission`](tables/IDIQ_Platform_UAT/dbo.CertifiedPayrollSubmission.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Contract`](tables/IDIQ_Platform_UAT/dbo.Contract.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ContractorPayrollViolation`](tables/IDIQ_Platform_UAT/dbo.ContractorPayrollViolation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ContractTermination`](tables/IDIQ_Platform_UAT/dbo.ContractTermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CooperativeDebarment`](tables/IDIQ_Platform_UAT/dbo.CooperativeDebarment.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CooperativeVendorViolation`](tables/IDIQ_Platform_UAT/dbo.CooperativeVendorViolation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.CostEffectivenessDetermination`](tables/IDIQ_Platform_UAT/dbo.CostEffectivenessDetermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.EmailLog`](tables/IDIQ_Platform_UAT/dbo.EmailLog.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ESignatureEnvelope`](tables/IDIQ_Platform_UAT/dbo.ESignatureEnvelope.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ESignatureSigner`](tables/IDIQ_Platform_UAT/dbo.ESignatureSigner.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.FinalPaymentCertification`](tables/IDIQ_Platform_UAT/dbo.FinalPaymentCertification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.JobReference`](tables/IDIQ_Platform_UAT/dbo.JobReference.md) | nvarchar(20) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.LowestBidCertification`](tables/IDIQ_Platform_UAT/dbo.LowestBidCertification.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.MiniBid`](tables/IDIQ_Platform_UAT/dbo.MiniBid.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.MonthlyPublicPosting`](tables/IDIQ_Platform_UAT/dbo.MonthlyPublicPosting.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.NJWageHubSubmission`](tables/IDIQ_Platform_UAT/dbo.NJWageHubSubmission.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PayrollFailure`](tables/IDIQ_Platform_UAT/dbo.PayrollFailure.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PayrollFailureTracking`](tables/IDIQ_Platform_UAT/dbo.PayrollFailureTracking.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PayrollRecordWithholding`](tables/IDIQ_Platform_UAT/dbo.PayrollRecordWithholding.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PublicPostingReport`](tables/IDIQ_Platform_UAT/dbo.PublicPostingReport.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform_UAT/dbo.PublicWorksContractorRegistration.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.RetaliationComplaint`](tables/IDIQ_Platform_UAT/dbo.RetaliationComplaint.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Solicitation`](tables/IDIQ_Platform_UAT/dbo.Solicitation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.SolicitationAddendum`](tables/IDIQ_Platform_UAT/dbo.SolicitationAddendum.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.SolicitationAdvertisement`](tables/IDIQ_Platform_UAT/dbo.SolicitationAdvertisement.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.StopWorkOrder`](tables/IDIQ_Platform_UAT/dbo.StopWorkOrder.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.Subcontractor`](tables/IDIQ_Platform_UAT/dbo.Subcontractor.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrder`](tables/IDIQ_Platform_UAT/dbo.TaskOrder.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.TaskOrderCostSavings`](tables/IDIQ_Platform_UAT/dbo.TaskOrderCostSavings.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.UnsuccessfulBidderClaim`](tables/IDIQ_Platform_UAT/dbo.UnsuccessfulBidderClaim.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.UserInvitation`](tables/IDIQ_Platform_UAT/dbo.UserInvitation.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.VendorRelationship`](tables/IDIQ_Platform_UAT/dbo.VendorRelationship.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.WageRateDetermination`](tables/IDIQ_Platform_UAT/dbo.WageRateDetermination.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.WageRateImport`](tables/IDIQ_Platform_UAT/dbo.WageRateImport.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.WebhookDelivery`](tables/IDIQ_Platform_UAT/dbo.WebhookDelivery.md) | nvarchar(1000) | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.WorkerWageProtest`](tables/IDIQ_Platform_UAT/dbo.WorkerWageProtest.md) | nvarchar(1000) | NO |  |  | table |
| `NJ_RTK` | `dbo` | [`dbo.Surveys`](tables/NJ_RTK/dbo.Surveys.md) | varchar(50) | YES |  |  | table |
| `ProcurementAnalytics` | `dbo` | [`dbo.Contracts`](tables/ProcurementAnalytics/dbo.Contracts.md) | varchar(20) | YES |  |  | table |
| `ProcurementAnalytics` | `dbo` | [`dbo.Entities`](tables/ProcurementAnalytics/dbo.Entities.md) | varchar(20) | NO |  |  | table |
| `ProcurementAnalytics` | `dbo` | [`dbo.PurchaseOrders`](tables/ProcurementAnalytics/dbo.PurchaseOrders.md) | varchar(20) | NO |  |  | table |
| `ProcurementAnalytics` | `dbo` | [`dbo.Vendors`](tables/ProcurementAnalytics/dbo.Vendors.md) | varchar(20) | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ActiveDiagnosticsDetail`](tables/SolarWindsOrion/dbo.ActiveDiagnosticsDetail.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_AgentPlugins`](tables/SolarWindsOrion/dbo.AgentManagement_AgentPlugins.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.AlertImportLog`](tables/SolarWindsOrion/dbo.AlertImportLog.md) | bit | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.AlertTests`](tables/SolarWindsOrion/dbo.AlertTests.md) | char(1) | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerMemberSnapshots`](tables/SolarWindsOrion/dbo.ContainerMemberSnapshots.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_DailyData`](tables/SolarWindsOrion/dbo.ContainerStatus_DailyData.md) | int | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_Detail`](tables/SolarWindsOrion/dbo.ContainerStatus_Detail.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ContainerStatus_HourlyData`](tables/SolarWindsOrion/dbo.ContainerStatus_HourlyData.md) | int | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.DiscoveryProfiles`](tables/SolarWindsOrion/dbo.DiscoveryProfiles.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.ESI_Instance`](tables/SolarWindsOrion/dbo.ESI_Instance.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | int | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodeL2Connections`](tables/SolarWindsOrion/dbo.NodeL2Connections.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | char(20) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | char(20) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Sites`](tables/SolarWindsOrion/dbo.Sites.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipAlertQos`](tables/SolarWindsOrion/dbo.VoipAlertQos.md) | nchar(10) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMGatewayDetails`](tables/SolarWindsOrion/dbo.VoipCCMGatewayDetails.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMGateways`](tables/SolarWindsOrion/dbo.VoipCCMGateways.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMH323Devices`](tables/SolarWindsOrion/dbo.VoipCCMH323Devices.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMMonitoringDetail`](tables/SolarWindsOrion/dbo.VoipCCMMonitoringDetail.md) | char(20) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneDetails`](tables/SolarWindsOrion/dbo.VoipCCMPhoneDetails.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhones`](tables/SolarWindsOrion/dbo.VoipCCMPhones.md) | int | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneStats_Detail`](tables/SolarWindsOrion/dbo.VoipCCMPhoneStats_Detail.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksCurrentStatus`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksCurrentStatus.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipConnectedPhonesReport`](tables/SolarWindsOrion/dbo.VoipConnectedPhonesReport.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayAlertsAggregateLast1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayAlertsAggregateLast1Hour.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayDetails`](tables/SolarWindsOrion/dbo.VoipGatewayDetails.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayEndpointAlertsAggregateLast1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointAlertsAggregateLast1Hour.md) | int | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGateways`](tables/SolarWindsOrion/dbo.VoipGateways.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewaysDetail`](tables/SolarWindsOrion/dbo.VoipGatewaysDetail.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats`](tables/SolarWindsOrion/dbo.VoipGatewayStats.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats_Daily`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Daily.md) | int | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats_Detail`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Detail.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats_Hourly`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Hourly.md) | int | NO | YES |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPInterface`](tables/SolarWindsOrion/dbo.VoIPInterface.md) | char(20) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipTestInstance`](tables/SolarWindsOrion/dbo.VoipTestInstance.md) | nchar(10) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.Volumes`](tables/SolarWindsOrion/dbo.Volumes.md) | int | YES |  |  | table |
| `VendorBids` | `dbo` | [`dbo.bidcalendar`](tables/VendorBids/dbo.bidcalendar.md) | varchar(255) | YES |  |  | table |
| `VendorBids` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids/dbo.cfv_vendorbidsview.md) | varchar(23) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.DocumentUploads`](tables/VendorBids/dbo.DocumentUploads.md) | char(1) | YES |  |  | table |
| `VendorBids` | `dbo` | [`dbo.vendorbidsforimport`](tables/VendorBids/dbo.vendorbidsforimport.md) | varchar(255) | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsList`](tables/VendorBids/dbo.vendorbidsList.md) | varchar(255) | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids/dbo.vendorbidsview.md) | varchar(23) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids/dbo.vendorbidsviewByUser.md) | varchar(13) | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vw_DocumentUploads`](tables/VendorBids/dbo.vw_DocumentUploads.md) | char(1) | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.bidcalendar`](tables/VendorBids_TEST/dbo.bidcalendar.md) | varchar(255) | YES |  |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids_TEST/dbo.cfv_vendorbidsview.md) | varchar(23) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.DocumentUploads`](tables/VendorBids_TEST/dbo.DocumentUploads.md) | char(1) | YES |  |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsforimport`](tables/VendorBids_TEST/dbo.vendorbidsforimport.md) | varchar(255) | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsList`](tables/VendorBids_TEST/dbo.vendorbidsList.md) | varchar(255) | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids_TEST/dbo.vendorbidsview.md) | varchar(23) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids_TEST/dbo.vendorbidsviewByUser.md) | varchar(13) | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vw_DocumentUploads`](tables/VendorBids_TEST/dbo.vw_DocumentUploads.md) | char(1) | YES |  |  | view |
| `WorkTables` | `dbo` | [`dbo.bid9334bri`](tables/WorkTables/dbo.bid9334bri.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Bid9334dels`](tables/WorkTables/dbo.Bid9334dels.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.bid9339bri`](tables/WorkTables/dbo.bid9339bri.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Bid9339dels`](tables/WorkTables/dbo.Bid9339dels.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.bri12916`](tables/WorkTables/dbo.bri12916.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Carolina24`](tables/WorkTables/dbo.Carolina24.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Cascade Image Update`](tables/WorkTables/dbo.Cascade_Image_Update.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.hmailserver_awstats`](tables/WorkTables/dbo.hmailserver_awstats.md) | varchar(50) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.PP Deletes`](tables/WorkTables/dbo.PP_Deletes.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.SS Bid Number Missing`](tables/WorkTables/dbo.SS_Bid_Number_Missing.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.SSXS`](tables/WorkTables/dbo.SSXS.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Staples discontinued 2022`](tables/WorkTables/dbo.Staples_discontinued_2022.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Staples NJ 2025`](tables/WorkTables/dbo.Staples_NJ_2025.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Staples NY 20241219`](tables/WorkTables/dbo.Staples_NY_20241219.md) | nvarchar(255) | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Tracks`](tables/WorkTables/dbo.Tracks.md) | char(2) | YES |  |  | table |

## `status_code`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | nvarchar(10) | YES |  |  | table |
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_request_log`](tables/EDS_Test/EDSIQWebUser.cxml_request_log.md) | int | NO |  |  | table |

## `status_text`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_acks`](tables/EDS_Test/EDSIQWebUser.cxml_order_acks.md) | nvarchar(255) | YES |  |  | table |

## `status_type`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS_Test` | `EDSIQWebUser` | [`EDSIQWebUser.cxml_order_ack_items`](tables/EDS_Test/EDSIQWebUser.cxml_order_ack_items.md) | nvarchar(50) | YES |  |  | table |

## `Status21`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationInstancesSupport21`](tables/SolarWindsOrion/dbo.VoipOperationInstancesSupport21.md) | nchar(10) | YES |  |  | view |

## `StatusAny_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusAny_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `statusbits`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `VendorBids` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids/dbo.cfv_vendorbidsview.md) | int | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids/dbo.vendorbidsview.md) | int | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids/dbo.vendorbidsviewByUser.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids_TEST/dbo.cfv_vendorbidsview.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids_TEST/dbo.vendorbidsview.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids_TEST/dbo.vendorbidsviewByUser.md) | int | YES |  |  | view |

## `StatusCalculatorID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Containers`](tables/SolarWindsOrion/dbo.Containers.md) | smallint | NO |  | → `dbo.StatusCalculators(StatusCalculatorID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.StatusCalculators`](tables/SolarWindsOrion/dbo.StatusCalculators.md) | smallint | NO | YES | ← `dbo.Containers(StatusCalculatorID)` | table |

## `statusCode`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.ImageLog`](tables/EDS/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.SDSLog`](tables/EDS/dbo.SDSLog.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.StatusTable`](tables/EDS/dbo.StatusTable.md) | char(1) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS/dbo.vw_RptExpireDateBidDocs.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS/dbo.vw_RptExpireDateBidDocsAndMore.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.ImageLog`](tables/EDS_Test/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSLog`](tables/EDS_Test/dbo.SDSLog.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.StatusTable`](tables/EDS_Test/dbo.StatusTable.md) | char(1) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_Test/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_Test/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_Test/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_Test/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocs.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_Test/dbo.vw_RptExpireDateBidDocsAndMore.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.ImageLog`](tables/EDS_TEST_Old/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSLog`](tables/EDS_TEST_Old/dbo.SDSLog.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.StatusTable`](tables/EDS_TEST_Old/dbo.StatusTable.md) | char(1) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_TEST_Old/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocs`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocs.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RptExpireDateBidDocsAndMore`](tables/EDS_TEST_Old/dbo.vw_RptExpireDateBidDocsAndMore.md) | int | YES |  |  | view |
| `IDIQ_Platform` | `dbo` | [`dbo.ApiRequestLog`](tables/IDIQ_Platform/dbo.ApiRequestLog.md) | int | NO |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.ApiRequestLog`](tables/IDIQ_Platform_UAT/dbo.ApiRequestLog.md) | int | NO |  |  | table |

## `StatusCount`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats`](tables/SolarWindsOrion/dbo.VoipGatewayStats.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats_Daily`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayStats_Hourly`](tables/SolarWindsOrion/dbo.VoipGatewayStats_Hourly.md) | int | NO |  |  | table |

## `StatusCountCritical`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults`](tables/SolarWindsOrion/dbo.VoipOperationResults.md) | int | NO |  |  | view |

## `StatusCountDown`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults`](tables/SolarWindsOrion/dbo.VoipOperationResults.md) | int | NO |  |  | view |

## `StatusCountUnknown`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults`](tables/SolarWindsOrion/dbo.VoipOperationResults.md) | int | NO |  |  | view |

## `StatusCountUp`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults`](tables/SolarWindsOrion/dbo.VoipOperationResults.md) | int | NO |  |  | view |

## `StatusCountWarning`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults`](tables/SolarWindsOrion/dbo.VoipOperationResults.md) | int | NO |  |  | view |

## `StatusDate`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS/dbo.CatalogRequestStatus.md) | datetime | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.POStatus`](tables/EDS/dbo.POStatus.md) | datetime | NO |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS/dbo.VendorDocRequestStatus.md) | datetime | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS/dbo.VendorQueryMSRPStatus.md) | datetime | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS/dbo.VendorQueryStatus.md) | datetime | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS/dbo.VendorQueryTandMStatus.md) | datetime | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS/dbo.vw_CatalogRequestStatus.md) | datetime | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS/dbo.vw_VendorDocRequestStatus.md) | datetime | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS/dbo.vw_VendorQueryMSRPStatus.md) | datetime | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS/dbo.vw_VendorQueryStatus.md) | datetime | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS/dbo.vw_VendorQueryTandMStatus.md) | datetime | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_Test/dbo.CatalogRequestStatus.md) | datetime | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.POStatus`](tables/EDS_Test/dbo.POStatus.md) | datetime | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_Test/dbo.VendorDocRequestStatus.md) | datetime | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_Test/dbo.VendorQueryMSRPStatus.md) | datetime | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_Test/dbo.VendorQueryStatus.md) | datetime | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_Test/dbo.VendorQueryTandMStatus.md) | datetime | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_Test/dbo.vw_CatalogRequestStatus.md) | datetime | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_Test/dbo.vw_VendorDocRequestStatus.md) | datetime | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_Test/dbo.vw_VendorQueryMSRPStatus.md) | datetime | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_Test/dbo.vw_VendorQueryStatus.md) | datetime | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_Test/dbo.vw_VendorQueryTandMStatus.md) | datetime | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.CatalogRequestStatus.md) | datetime | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POStatus`](tables/EDS_TEST_Old/dbo.POStatus.md) | datetime | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.VendorDocRequestStatus.md) | datetime | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.VendorQueryMSRPStatus.md) | datetime | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_TEST_Old/dbo.VendorQueryStatus.md) | datetime | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.VendorQueryTandMStatus.md) | datetime | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.vw_CatalogRequestStatus.md) | datetime | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.vw_VendorDocRequestStatus.md) | datetime | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryMSRPStatus.md) | datetime | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryStatus.md) | datetime | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryTandMStatus.md) | datetime | YES |  |  | view |

## `StatusDesc`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS/dbo.vw_ApproveRequisitions.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS/dbo.vw_ApproveRequisitionsBySession.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS/dbo.vw_ApproveRequisitionsTest.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS/dbo.vw_ARStatuses.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS/dbo.vw_RequisitionStatus.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS/dbo.vw_RequisitionStatus_orig.md) | varchar(104) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS/dbo.vw_RequisitionStatusBySession.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_Test/dbo.vw_ApproveRequisitions.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_Test/dbo.vw_ApproveRequisitionsTest.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_Test/dbo.vw_ARStatuses.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_Test/dbo.vw_RequisitionStatus.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_Test/dbo.vw_RequisitionStatus_orig.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_Test/dbo.vw_RequisitionStatusBySession.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitions.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsTest.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_TEST_Old/dbo.vw_ARStatuses.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus_orig.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatusBySession.md) | varchar(104) | NO |  |  | view |

## `StatusDescription`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.DiscoveryProfiles`](tables/SolarWindsOrion/dbo.DiscoveryProfiles.md) | nvarchar(max) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.NodeChildStatus`](tables/SolarWindsOrion/dbo.NodeChildStatus.md) | nvarchar(100) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | nvarchar(2000) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | nvarchar(2000) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.Sites`](tables/SolarWindsOrion/dbo.Sites.md) | nvarchar(255) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMPhoneDetails`](tables/SolarWindsOrion/dbo.VoipCCMPhoneDetails.md) | nvarchar(255) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPInterface`](tables/SolarWindsOrion/dbo.VoIPInterface.md) | nvarchar(2000) | YES |  |  | view |

## `StatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `archive` | [`archive.Approvals`](tables/EDS/archive.Approvals.md) | int | YES |  |  | table |
| `EDS` | `archive` | [`archive.ApprovalsHistory`](tables/EDS/archive.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS` | `archive` | [`archive.Requisitions`](tables/EDS/archive.Requisitions.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.Approvals`](tables/EDS/dbo.Approvals.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.ApprovalsHistory`](tables/EDS/dbo.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS/dbo.CatalogRequestStatus.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.pa_Status`](tables/EDS/dbo.pa_Status.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.PendingApprovals`](tables/EDS/dbo.PendingApprovals.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.POStatus`](tables/EDS/dbo.POStatus.md) | int | NO |  |  | table |
| `EDS` | `dbo` | [`dbo.ReqDetail`](tables/EDS/dbo.ReqDetail.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.Requisitions`](tables/EDS/dbo.Requisitions.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.RequisitionsView`](tables/EDS/dbo.RequisitionsView.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.StatusTable`](tables/EDS/dbo.StatusTable.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS/dbo.VendorDocRequestStatus.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS/dbo.VendorQueryMSRPStatus.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS/dbo.VendorQueryStatus.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS/dbo.VendorQueryTandMStatus.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS/dbo.vw_ApproveRequisitions.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS/dbo.vw_ApproveRequisitionsBySession.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS/dbo.vw_ApproveRequisitionsBySession_Test.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS/dbo.vw_ApproveRequisitionsTest.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS/dbo.vw_FA_Requisitions.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS/dbo.vw_RequisitionList.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_Requisitions`](tables/EDS/dbo.vw_Requisitions.md) | int | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `EDS_Test` | `archive` | [`archive.Approvals`](tables/EDS_Test/archive.Approvals.md) | int | YES |  |  | table |
| `EDS_Test` | `archive` | [`archive.ApprovalsHistory`](tables/EDS_Test/archive.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS_Test` | `archive` | [`archive.Requisitions`](tables/EDS_Test/archive.Requisitions.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.Approvals`](tables/EDS_Test/dbo.Approvals.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ApprovalsHistory`](tables/EDS_Test/dbo.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_Test/dbo.CatalogRequestStatus.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.pa_Status`](tables/EDS_Test/dbo.pa_Status.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.PendingApprovals`](tables/EDS_Test/dbo.PendingApprovals.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.POStatus`](tables/EDS_Test/dbo.POStatus.md) | int | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ReqDetail`](tables/EDS_Test/dbo.ReqDetail.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.Requisitions`](tables/EDS_Test/dbo.Requisitions.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.RequisitionsView`](tables/EDS_Test/dbo.RequisitionsView.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.StatusTable`](tables/EDS_Test/dbo.StatusTable.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_Test/dbo.VendorDocRequestStatus.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_Test/dbo.VendorQueryMSRPStatus.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_Test/dbo.VendorQueryStatus.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_Test/dbo.VendorQueryTandMStatus.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_Test/dbo.vw_ApproveRequisitions.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession_Test.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_Test/dbo.vw_ApproveRequisitionsTest.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_Test/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS_Test/dbo.vw_FA_Requisitions.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS_Test/dbo.vw_RequisitionList.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_Requisitions`](tables/EDS_Test/dbo.vw_Requisitions.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_Test/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_Test/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_Test/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `archive` | [`archive.Approvals`](tables/EDS_TEST_Old/archive.Approvals.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `archive` | [`archive.ApprovalsHistory`](tables/EDS_TEST_Old/archive.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `archive` | [`archive.Requisitions`](tables/EDS_TEST_Old/archive.Requisitions.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.Approvals`](tables/EDS_TEST_Old/dbo.Approvals.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ApprovalsHistory`](tables/EDS_TEST_Old/dbo.ApprovalsHistory.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.CatalogRequestStatus`](tables/EDS_TEST_Old/dbo.CatalogRequestStatus.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.pa_Status`](tables/EDS_TEST_Old/dbo.pa_Status.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.PendingApprovals`](tables/EDS_TEST_Old/dbo.PendingApprovals.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.POStatus`](tables/EDS_TEST_Old/dbo.POStatus.md) | int | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ReqDetail`](tables/EDS_TEST_Old/dbo.ReqDetail.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.Requisitions`](tables/EDS_TEST_Old/dbo.Requisitions.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.RequisitionsView`](tables/EDS_TEST_Old/dbo.RequisitionsView.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.StatusTable`](tables/EDS_TEST_Old/dbo.StatusTable.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.VendorDocRequestStatus.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.VendorQueryMSRPStatus.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_TEST_Old/dbo.VendorQueryStatus.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.VendorQueryTandMStatus.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitions.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession_Test.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsTest.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ARStatuses`](tables/EDS_TEST_Old/dbo.vw_ARStatuses.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS_TEST_Old/dbo.vw_FA_Requisitions.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionList`](tables/EDS_TEST_Old/dbo.vw_RequisitionList.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_Requisitions`](tables/EDS_TEST_Old/dbo.vw_Requisitions.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatus_orig`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatus_orig.md) | int | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_RequisitionStatusBySession`](tables/EDS_TEST_Old/dbo.vw_RequisitionStatusBySession.md) | int | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.StatusInfo`](tables/SolarWindsOrion/dbo.StatusInfo.md) | int | NO | YES |  | table |
| `VendorBids` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids/dbo.cfv_vendorbidsview.md) | int | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.statustable`](tables/VendorBids/dbo.statustable.md) | int | NO | YES |  | table |
| `VendorBids` | `dbo` | [`dbo.vendorbidsforimport`](tables/VendorBids/dbo.vendorbidsforimport.md) | int | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsjournal`](tables/VendorBids/dbo.vendorbidsjournal.md) | int | YES |  |  | table |
| `VendorBids` | `dbo` | [`dbo.vendorbidsList`](tables/VendorBids/dbo.vendorbidsList.md) | int | YES |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids/dbo.vendorbidsview.md) | int | NO |  |  | view |
| `VendorBids` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids/dbo.vendorbidsviewByUser.md) | int | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.cfv_vendorbidsview`](tables/VendorBids_TEST/dbo.cfv_vendorbidsview.md) | int | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.statustable`](tables/VendorBids_TEST/dbo.statustable.md) | int | NO | YES |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsforimport`](tables/VendorBids_TEST/dbo.vendorbidsforimport.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsjournal`](tables/VendorBids_TEST/dbo.vendorbidsjournal.md) | int | YES |  |  | table |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsList`](tables/VendorBids_TEST/dbo.vendorbidsList.md) | int | YES |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsview`](tables/VendorBids_TEST/dbo.vendorbidsview.md) | int | NO |  |  | view |
| `VendorBids_TEST` | `dbo` | [`dbo.vendorbidsviewByUser`](tables/VendorBids_TEST/dbo.vendorbidsviewByUser.md) | int | NO |  |  | view |
| `WorkTables` | `dbo` | [`dbo.ReprocList1`](tables/WorkTables/dbo.ReprocList1.md) | int | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Reqs9993`](tables/WorkTables/dbo.Reqs9993.md) | int | YES |  |  | table |
| `WorkTables` | `dbo` | [`dbo.Reqsb4Update_021320202`](tables/WorkTables/dbo.Reqsb4Update_021320202.md) | int | YES |  |  | table |

## `StatusLED`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.Nodes`](tables/SolarWindsOrion/dbo.Nodes.md) | char(20) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.NodesData`](tables/SolarWindsOrion/dbo.NodesData.md) | char(20) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPInterface`](tables/SolarWindsOrion/dbo.VoIPInterface.md) | char(20) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.Volumes`](tables/SolarWindsOrion/dbo.Volumes.md) | varchar(20) | YES |  |  | table |

## `StatusMessage`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.AgentManagement_AgentPlugins`](tables/SolarWindsOrion/dbo.AgentManagement_AgentPlugins.md) | nvarchar(512) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembers`](tables/SolarWindsOrion/dbo.HA_PoolMembers.md) | nvarchar(max) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | nvarchar(max) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoIPOperationCurrentStats.md) | nvarchar(max) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | nvarchar(max) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationInstancesSupport21`](tables/SolarWindsOrion/dbo.VoipOperationInstancesSupport21.md) | nvarchar(max) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperations`](tables/SolarWindsOrion/dbo.VoIPOperations.md) | nvarchar(max) | YES |  |  | view |

## `StatusName`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.POStatusTable`](tables/EDS/dbo.POStatusTable.md) | varchar(50) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.vw_ApprovalsHistory`](tables/EDS/dbo.vw_ApprovalsHistory.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS/dbo.vw_ApproveRequisitions.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS/dbo.vw_ApproveRequisitionsBySession.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS/dbo.vw_ApproveRequisitionsTest.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS/dbo.vw_ExistingRequisitions.md) | varchar(50) | YES |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS/dbo.vw_FA_Requisitions.md) | varchar(50) | NO |  |  | view |
| `EDS` | `dbo` | [`dbo.vw_StatusHistory`](tables/EDS/dbo.vw_StatusHistory.md) | varchar(104) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.POStatusTable`](tables/EDS_Test/dbo.POStatusTable.md) | varchar(50) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_ApprovalsHistory`](tables/EDS_Test/dbo.vw_ApprovalsHistory.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_Test/dbo.vw_ApproveRequisitions.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_Test/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_Test/dbo.vw_ApproveRequisitionsTest.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS_Test/dbo.vw_ExistingRequisitions.md) | varchar(50) | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS_Test/dbo.vw_FA_Requisitions.md) | varchar(50) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_StatusHistory`](tables/EDS_Test/dbo.vw_StatusHistory.md) | varchar(104) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.POStatusTable`](tables/EDS_TEST_Old/dbo.POStatusTable.md) | varchar(50) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApprovalsHistory`](tables/EDS_TEST_Old/dbo.vw_ApprovalsHistory.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitions`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitions.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsBySession_Test`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsBySession_Test.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ApproveRequisitionsTest`](tables/EDS_TEST_Old/dbo.vw_ApproveRequisitionsTest.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_ExistingRequisitions`](tables/EDS_TEST_Old/dbo.vw_ExistingRequisitions.md) | varchar(50) | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_FA_Requisitions`](tables/EDS_TEST_Old/dbo.vw_FA_Requisitions.md) | varchar(50) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_StatusHistory`](tables/EDS_TEST_Old/dbo.vw_StatusHistory.md) | varchar(104) | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.StatusInfo`](tables/SolarWindsOrion/dbo.StatusInfo.md) | nvarchar(50) | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatuses`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatuses.md) | varchar(100) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayAlertsAggregateLast1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayAlertsAggregateLast1Hour.md) | nvarchar(50) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayDetails`](tables/SolarWindsOrion/dbo.VoipGatewayDetails.md) | nvarchar(50) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewayEndpointAlertsAggregateLast1Hour`](tables/SolarWindsOrion/dbo.VoipGatewayEndpointAlertsAggregateLast1Hour.md) | nvarchar(50) | YES |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipGatewaysDetail`](tables/SolarWindsOrion/dbo.VoipGatewaysDetail.md) | nvarchar(50) | YES |  |  | view |

## `StatusPartiallyRegistered_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusPartiallyRegistered_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `statusReason`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `IDIQ_Platform` | `dbo` | [`dbo.LowestBidCertification`](tables/IDIQ_Platform/dbo.LowestBidCertification.md) | nvarchar(max) | YES |  |  | table |
| `IDIQ_Platform` | `dbo` | [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform/dbo.PublicWorksContractorRegistration.md) | nvarchar(max) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.LowestBidCertification`](tables/IDIQ_Platform_UAT/dbo.LowestBidCertification.md) | nvarchar(max) | YES |  |  | table |
| `IDIQ_Platform_UAT` | `dbo` | [`dbo.PublicWorksContractorRegistration`](tables/IDIQ_Platform_UAT/dbo.PublicWorksContractorRegistration.md) | nvarchar(max) | YES |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMH323Devices`](tables/SolarWindsOrion/dbo.VoipCCMH323Devices.md) | int | NO |  |  | table |

## `StatusRegistered_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusRegistered_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `StatusRejected_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusRejected_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `StatusStr`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS/dbo.vw_BidMgrBidderDocs.md) | varchar(9) | NO |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS_Test/dbo.vw_BidMgrBidderDocs.md) | varchar(9) | NO |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_BidMgrBidderDocs`](tables/EDS_TEST_Old/dbo.vw_BidMgrBidderDocs.md) | varchar(9) | NO |  |  | view |

## `statusText`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.ImageLog`](tables/EDS/dbo.ImageLog.md) | varchar(512) | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.SDSLog`](tables/EDS/dbo.SDSLog.md) | varchar(512) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ImageLog`](tables/EDS_Test/dbo.ImageLog.md) | varchar(512) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSLog`](tables/EDS_Test/dbo.SDSLog.md) | varchar(512) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ImageLog`](tables/EDS_TEST_Old/dbo.ImageLog.md) | varchar(512) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSLog`](tables/EDS_TEST_Old/dbo.SDSLog.md) | varchar(512) | YES |  |  | table |

## `StatusTimestampNotUpdatedInterval`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.HA_PoolMembersView`](tables/SolarWindsOrion/dbo.HA_PoolMembersView.md) | int | YES |  |  | view |

## `StatusType`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `ContentCentral` | `dbo` | [`dbo.ApprovalProcessStatus`](tables/ContentCentral/dbo.ApprovalProcessStatus.md) | nvarchar(50) | NO |  |  | table |

## `StatusUnknown_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusUnknown_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `StatusUnRegistered_DurationInMinutes`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Daily`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Daily.md) | int | NO |  |  | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunkStatus_Hourly`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunkStatus_Hourly.md) | int | NO |  |  | table |

## `StatusUnRegistered_Percents`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipCCMSipTrunksStatusesTotalDurations`](tables/SolarWindsOrion/dbo.VoipCCMSipTrunksStatusesTotalDurations.md) | decimal(5,2) | YES |  |  | view |

## `StatusVariableOrOID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.TrapRulesDetail`](tables/SolarWindsOrion/dbo.TrapRulesDetail.md) | bit | NO |  |  | table |

## `SurveyStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `NJ_RTK` | `dbo` | [`dbo.Facilities`](tables/NJ_RTK/dbo.Facilities.md) | varchar(50) | YES |  |  | table |
| `NJ_RTK` | `dbo` | [`dbo.ReportSurveys`](tables/NJ_RTK/dbo.ReportSurveys.md) | varchar(50) | YES |  |  | table |

## `SYNC_STATUS`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `dpa_EDSAdmin` | `dbo` | [`dbo.CON_AG_DATABASE`](tables/dpa_EDSAdmin/dbo.CON_AG_DATABASE.md) | tinyint | YES |  |  | table |

## `SyncStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS/dbo.SDSSyncStatus.md) | varchar(50) | NO |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_Test/dbo.SDSSyncStatus.md) | varchar(50) | NO |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSSyncStatus`](tables/EDS_TEST_Old/dbo.SDSSyncStatus.md) | varchar(50) | NO |  |  | table |

## `TargetNodeStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoIPOperationCurrentStats.md) | char(20) | YES |  |  | view |

## `VendorDocRequestStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS/dbo.VendorDocRequestStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS/dbo.vw_VendorDocRequestStatus.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_Test/dbo.VendorDocRequestStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_Test/dbo.vw_VendorDocRequestStatus.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.VendorDocRequestStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorDocRequestStatus`](tables/EDS_TEST_Old/dbo.vw_VendorDocRequestStatus.md) | int | YES |  |  | view |

## `VendorQueryMSRPStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS/dbo.VendorQueryMSRPStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS/dbo.vw_VendorQueryMSRPStatus.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_Test/dbo.VendorQueryMSRPStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_Test/dbo.vw_VendorQueryMSRPStatus.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.VendorQueryMSRPStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryMSRPStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryMSRPStatus.md) | int | YES |  |  | view |

## `VendorQueryStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS/dbo.VendorQueryStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS/dbo.vw_VendorQueryStatus.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_Test/dbo.VendorQueryStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_Test/dbo.vw_VendorQueryStatus.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryStatus`](tables/EDS_TEST_Old/dbo.VendorQueryStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryStatus.md) | int | YES |  |  | view |

## `VendorQueryTandMStatusId`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS/dbo.VendorQueryTandMStatus.md) | int | NO | YES |  | table |
| `EDS` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS/dbo.vw_VendorQueryTandMStatus.md) | int | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_Test/dbo.VendorQueryTandMStatus.md) | int | NO | YES |  | table |
| `EDS_Test` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_Test/dbo.vw_VendorQueryTandMStatus.md) | int | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.VendorQueryTandMStatus.md) | int | NO | YES |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VendorQueryTandMStatus`](tables/EDS_TEST_Old/dbo.vw_VendorQueryTandMStatus.md) | int | YES |  |  | view |

## `VendorStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.VendorOrders`](tables/EDS/dbo.VendorOrders.md) | varchar(max) | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.VendorOrders`](tables/EDS_Test/dbo.VendorOrders.md) | varchar(max) | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.VendorOrders`](tables/EDS_TEST_Old/dbo.VendorOrders.md) | varchar(max) | YES |  |  | table |

## `VlanStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.NodeVlans`](tables/SolarWindsOrion/dbo.NodeVlans.md) | int | NO |  |  | table |

## `VoipOperationStatusID`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationAvailability`](tables/SolarWindsOrion/dbo.VoipOperationAvailability.md) | smallint | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperationCurrentStats`](tables/SolarWindsOrion/dbo.VoIPOperationCurrentStats.md) | smallint | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationInstances`](tables/SolarWindsOrion/dbo.VoipOperationInstances.md) | smallint | NO |  | → `dbo.VoipOperationStatuses(VoipOperationStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationInstancesSupport21`](tables/SolarWindsOrion/dbo.VoipOperationInstancesSupport21.md) | smallint | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResultHealthStats_Daily`](tables/SolarWindsOrion/dbo.VoipOperationResultHealthStats_Daily.md) | smallint | NO | YES | → `dbo.VoipOperationStatuses(VoipOperationStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResultHealthStats_Hourly`](tables/SolarWindsOrion/dbo.VoipOperationResultHealthStats_Hourly.md) | smallint | NO | YES | → `dbo.VoipOperationStatuses(VoipOperationStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationResults_Detail`](tables/SolarWindsOrion/dbo.VoipOperationResults_Detail.md) | smallint | NO |  | → `dbo.VoipOperationStatuses(VoipOperationStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoIPOperations`](tables/SolarWindsOrion/dbo.VoIPOperations.md) | smallint | NO |  |  | view |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipOperationStatuses`](tables/SolarWindsOrion/dbo.VoipOperationStatuses.md) | smallint | NO | YES | ← `dbo.VoipOperationInstances(VoipOperationStatusID)`<br>← `dbo.VoipOperationResultHealthStats_Daily(VoipOperationStatusID)`<br>← `dbo.VoipOperationResultHealthStats_Hourly(VoipOperationStatusID)`<br>← `dbo.VoipOperationResults_Detail(VoipOperationStatusID)`<br>← `dbo.VoipPathHopOperationHistoryResults(VoipOperationStatusID)` | table |
| `SolarWindsOrion` | `dbo` | [`dbo.VoipPathHopOperationHistoryResults`](tables/SolarWindsOrion/dbo.VoipPathHopOperationHistoryResults.md) | smallint | NO |  | → `dbo.VoipOperationStatuses(VoipOperationStatusID)` | table |

## `VPOStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.vw_VPOLoginCheck`](tables/EDS/dbo.vw_VPOLoginCheck.md) | tinyint | YES |  |  | view |
| `EDS_Test` | `dbo` | [`dbo.vw_VPOLoginCheck`](tables/EDS_Test/dbo.vw_VPOLoginCheck.md) | tinyint | YES |  |  | view |
| `EDS_TEST_Old` | `dbo` | [`dbo.vw_VPOLoginCheck`](tables/EDS_TEST_Old/dbo.vw_VPOLoginCheck.md) | tinyint | YES |  |  | view |

## `WorstStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `SolarWindsOrion` | `dbo` | [`dbo.NodeChildStatus`](tables/SolarWindsOrion/dbo.NodeChildStatus.md) | int | NO |  |  | table |

## `writeStatus`

| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |
|----------|--------|--------------|------|----------|----|---------|--------|
| `EDS` | `dbo` | [`dbo.ImageLog`](tables/EDS/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS` | `dbo` | [`dbo.SDSLog`](tables/EDS/dbo.SDSLog.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.ImageLog`](tables/EDS_Test/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS_Test` | `dbo` | [`dbo.SDSLog`](tables/EDS_Test/dbo.SDSLog.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.ImageLog`](tables/EDS_TEST_Old/dbo.ImageLog.md) | int | YES |  |  | table |
| `EDS_TEST_Old` | `dbo` | [`dbo.SDSLog`](tables/EDS_TEST_Old/dbo.SDSLog.md) | int | YES |  |  | table |
