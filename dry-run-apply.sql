-- Dry run: BEGIN TRAN, apply all 86 description statements, verify, ROLLBACK.
-- Connection ends with NO COMMITTED CHANGES.
SET NOCOUNT ON;
GO

BEGIN TRAN ApplyDescriptionsDryRun;
GO

-- Pre-state snapshot (tables vs columns) on the targets we're about to touch.
SELECT
  (SELECT COUNT(*) FROM EDS.sys.extended_properties WHERE name=N'MS_Description' AND class=1 AND minor_id=0) AS eds_table_descs_before,
  (SELECT COUNT(*) FROM EDS.sys.extended_properties WHERE name=N'MS_Description' AND class=1 AND minor_id>0) AS eds_column_descs_before;
GO

:r apply-descriptions.sql
GO

-- Post-state snapshot
SELECT
  (SELECT COUNT(*) FROM EDS.sys.extended_properties WHERE name=N'MS_Description' AND class=1 AND minor_id=0) AS eds_table_descs_after,
  (SELECT COUNT(*) FROM EDS.sys.extended_properties WHERE name=N'MS_Description' AND class=1 AND minor_id>0) AS eds_column_descs_after;
GO

-- Sample three updated table descriptions and three column descriptions
SELECT 'TABLE' AS kind, s.name AS [schema], o.name AS [object], NULL AS [column], CAST(ep.value AS NVARCHAR(2000)) AS new_desc
FROM EDS.sys.extended_properties ep
JOIN EDS.sys.objects o ON ep.major_id = o.object_id AND ep.minor_id = 0
JOIN EDS.sys.schemas s ON o.schema_id = s.schema_id
WHERE ep.name = N'MS_Description' AND s.name = 'dbo' AND o.name IN ('Vendors','CrossRefs','Detail')
UNION ALL
SELECT 'COLUMN', s.name, o.name, c.name, CAST(ep.value AS NVARCHAR(2000))
FROM EDS.sys.extended_properties ep
JOIN EDS.sys.objects o  ON ep.major_id = o.object_id
JOIN EDS.sys.columns c  ON c.object_id = o.object_id AND c.column_id = ep.minor_id
JOIN EDS.sys.schemas s  ON o.schema_id = s.schema_id
WHERE ep.name = N'MS_Description' AND ep.minor_id > 0
  AND s.name = 'dbo' AND o.name = 'Vendors' AND c.name IN ('Active','UseGrossPrices','DistrictId')
ORDER BY kind, [object], [column];
GO

ROLLBACK TRAN ApplyDescriptionsDryRun;
GO

PRINT 'Dry run complete; transaction rolled back.';
GO
