# Lookup: `dbo.ScheduledTask`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Rows:** 12 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| TaskId | TaskName | Description | ScheduleExpression | TaskType | Status | LastRunTime | NextRunTime | MaxRetries | CurrentRetries | CreatedBy | CreatedAt | UpdatedBy | UpdatedAt |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ProduceDocumentIdMessage | Task to produce document ID messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 2 | ConsumeDocumentIdMessage | Task to consume document ID messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 3 | ConsumeDocumentMetaMessage | Task to consume document metadata messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 4 | ProduceDocumentMetaMessage | Task to produce document metadata messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 5 | ResetElasticSearchIndex | Task to reset Elasticsearch index | 0 2 * * * | Maintenance | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 6 | RefreshElasticSearchIndex | Task to refresh Elasticsearch index | 0 3 * * * | Maintenance | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 7 | TestTask | Task for testing purposes | * * * * * | Test | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 8 | ConsumeRequisitionMessage | Task to consume requisition messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 9 | ConsumeItemDetailMessage | Task to consume item detail messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 10 | ConsumeRequisitionDetailMessage | Task to consume requisition detail messages | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 11 | ConsumeRequisitionDetailFailedBatchMessage | Task to consume failed requisition detail batches | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
| 12 | ConsumeItemDetailFailedBatchMessage | Task to consume failed item detail batches | * * * * * | System | Done |  |  | 3 | 0 | System | 2024-12-10 22:48:48 |  |  |
