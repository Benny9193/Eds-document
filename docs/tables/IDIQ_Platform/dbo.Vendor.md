# Table: `dbo.Vendor`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 129

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | NO |  |  |
| 4 | `vendorCode` | nvarchar(1000) | YES |  |  |
| 5 | `registrationNumber` | nvarchar(1000) | YES |  |  |
| 6 | `taxId` | nvarchar(1000) | YES |  |  |
| 7 | `dunsNumber` | nvarchar(1000) | YES |  |  |
| 8 | `email` | nvarchar(1000) | YES |  |  |
| 9 | `phone` | nvarchar(1000) | YES |  |  |
| 10 | `address` | nvarchar(1000) | YES |  |  |
| 11 | `city` | nvarchar(1000) | YES |  |  |
| 12 | `state` | nvarchar(1000) | YES |  |  |
| 13 | `zipCode` | nvarchar(1000) | YES |  |  |
| 14 | `debarmentStatus` | nvarchar(1000) | NO | `('CLEAR')` |  |
| 15 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 16 | `updatedAt` | datetime2 | NO |  |  |
| 17 | `isOutOfState` | bit | NO | `((0))` |  |
| 18 | `custodianOfRecordsName` | nvarchar(1000) | YES |  |  |
| 19 | `custodianOfRecordsAddress` | nvarchar(500) | YES |  |  |
| 20 | `custodianOfRecordsPhone` | nvarchar(1000) | YES |  |  |
| 21 | `agentForServiceName` | nvarchar(1000) | YES |  |  |
| 22 | `agentForServiceAddress` | nvarchar(500) | YES |  |  |
| 23 | `agentForServicePhone` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ApprenticeshipCompliance`](dbo.ApprenticeshipCompliance.md) | `vendorId` | `id` | CASCADE | CASCADE |
| [`dbo.Bid`](dbo.Bid.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CertifiedPayroll`](dbo.CertifiedPayroll.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](dbo.CertifiedPayrollSubmission.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](dbo.ContractorPayrollViolation.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CooperativeVendorViolation`](dbo.CooperativeVendorViolation.md) | `vendorId` | `id` | NO_ACTION | CASCADE |
| [`dbo.FinalPaymentCertification`](dbo.FinalPaymentCertification.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.JobSitePosting`](dbo.JobSitePosting.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.MiniBid`](dbo.MiniBid.md) | `selectedVendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.MiniBidResponse`](dbo.MiniBidResponse.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.PayrollFailure`](dbo.PayrollFailure.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.PayrollFailureTracking`](dbo.PayrollFailureTracking.md) | `vendorId` | `id` | CASCADE | CASCADE |
| [`dbo.PayrollRecordWithholding`](dbo.PayrollRecordWithholding.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.PublicWorksContractorRegistration`](dbo.PublicWorksContractorRegistration.md) | `vendorId` | `id` | CASCADE | CASCADE |
| [`dbo.RecommendedVendor`](dbo.RecommendedVendor.md) | `vendorId` | `id` | SET_NULL | NO_ACTION |
| [`dbo.RetaliationComplaint`](dbo.RetaliationComplaint.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.StopWorkOrder`](dbo.StopWorkOrder.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Subcontractor`](dbo.Subcontractor.md) | `vendorId` | `id` | NO_ACTION | CASCADE |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](dbo.UnsuccessfulBidderClaim.md) | `claimantVendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.UnsuccessfulBidderClaim`](dbo.UnsuccessfulBidderClaim.md) | `defendantVendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.VendorCertification`](dbo.VendorCertification.md) | `vendorId` | `id` | CASCADE | CASCADE |
| [`dbo.VendorRelationship`](dbo.VendorRelationship.md) | `relatedVendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.VendorRelationship`](dbo.VendorRelationship.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.WorkerWageProtest`](dbo.WorkerWageProtest.md) | `vendorId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Vendor_debarmentStatus_idx` | no | NONCLUSTERED | `debarmentStatus` |  |
| `Vendor_isOutOfState_idx` | no | NONCLUSTERED | `isOutOfState` |  |
| `Vendor_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
