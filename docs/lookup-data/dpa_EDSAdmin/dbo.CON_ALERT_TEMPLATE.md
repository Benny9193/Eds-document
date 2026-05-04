# Lookup: `dbo.CON_ALERT_TEMPLATE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Rows:** 88 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| ID | TEMPLATEID | NAME | DESCRIPTION |
| --- | --- | --- | --- |
| 1 | 52 | Database Instance Wait Time Anomaly | Alert when the wait time of an instance was abnormally high during the most recently completed hours. The wait time status is calculated at the top of… |
| 2 | 1 | Total Database Instance Wait Time | Total wait time (in seconds) for entire database instance |
| 3 | 2 | Total SQL Wait Time for a Single SQL | Total execution time (in seconds) for the specified SQL |
| 4 | 3 | Average Wait Time for a Single SQL | Average execution time (in seconds) for the specified SQL |
| 5 | 4 | Total SQL Wait Time for Single Wait | Wait time (in seconds) on the specified wait |
| 6 | 5 | Total SQL Wait Time - Program | Execution time (in seconds) on the specified Program |
| 7 | 6 | Total SQL Wait Time - Database User | Execution time (in seconds) on the specified Database User |
| 8 | 7 | Total SQL Wait Time - O/S User | Execution time (in seconds) on the specified O/S User |
| 9 | 8 | Total SQL Wait Time - Machine | Execution time (in seconds) on the specified Machine |
| 10 | 13 | Total SQL Wait Time - Database | Execution time (in seconds) on the specified Database in the Instance |
| 11 | 9 | Total SQL Wait Time - Custom for Oracle | Execution time (in seconds) for a combination of factors |
| 12 | 11 | Total SQL Wait Time - Custom for SQL Server/Azure SQL MI/Sybase | Execution time (in seconds) for a combination of factors |
| 13 | 128 | Total SQL Wait Time - Custom for Azure SQL Database | Execution time (in seconds) for a combination of factors |
| 14 | 117 | Total SQL Wait Time - Custom for MySQL/MariaDB | Execution time (in seconds) for a combination of factors |
| 15 | 12 | Total SQL Wait Time - Custom for Db2 | Execution time (in seconds) for a combination of factors. The 'Database' field will be ignored when monitoring a single database. |
| 16 | 129 | Total SQL Wait Time - Custom for PostgreSQL | Execution time (in seconds) for a combination of factors |
| 17 | 10 | RAC Overhead Wait Time | Wait time (in seconds) for RAC events |
| 18 | 21 | Database Instance Availability | This alert determines if a monitored database instance is available by attempting to connect to the instance from DPA. It returns true if the instance… |
| 19 | 22 | Database Freespace | This SQL Server, Azure SQL DB, Azure SQL MI, Sybase and Db2 alert determines the percent of free space in each database of the instance or the single … |
| 20 | 20 | Database Instance Parameter Changes | This alert determines if any database instance parameter settings have changed. |
| 21 | 23 | Tablespace Freespace | This Oracle and Db2 alert determines the percent of free space in each tablespace of the monitored database. For Db2, only database managed tablespace… |
| 22 | 24 | Transaction Log Freespace | This SQL Server, Azure SQL MI, Sybase and Db2 alert determines the percent of free space in the transaction log of each database of the instance. |
| 23 | 36 | Oracle PDB Move | This alert is triggered when a monitored PDB database instance is moved to or from a CDB container. |
| 24 | 35 | Oracle PDB Database Instance Availability | This alert determines if a monitored PDB database instance is available by attempting to connect to the instance from DPA (Returns true if instance is… |
| 25 | 30 | Oracle Alert Log Entries | This Oracle (11g and up) alert searches for the specified string in the alert log (from the x$dbgalertext table) and returns all unique matching entri… |
| 26 | 40 | Oracle Long Running Transaction | This Oracle alert queries the length of time that active transactions have been running.  To limit the result set and reduce DPA Repository space, set… |
| 27 | 25 | Oracle Percent Redo Logs Unarchived | This Oracle alert determines the current percentage of unarchived redo logs. |
| 28 | 29 | Oracle Redo Log Switching Frequency | This Oracle alert will determine the number of log switches that occurred within the last X minutes (X = alert execution frequency). Specify the hours… |
| 29 | 28 | Oracle Session Limit | This Oracle alert compares the number of active sessions to the maximum number of sessions as configured in the v$parameter 'sessions' row.  The resul… |
| 30 | 44 | Oracle Stale Statistics | This Oracle (10g and up) alert will return a list of all tables and indexes that have stale or empty statistics. All tables and indexes meeting this c… |
| 31 | 34 | Oracle Archiver Errors | This Oracle alert indicates that the archiver process has received an error while trying to archive a redo log or the online log files aren’t being ar… |
| 32 | 32 | Windows Service Not Running - SQL Server | This SQL Server (2005 and up) alert runs against the SQL Server monitored instance, and triggers if the specified Windows service is not running. |
| 33 | 31 | SQL Server Abnormal Mirroring Status | This SQL Server (2005 and up) alert will trigger if the SQL Server mirroring status is anything other than Synchronized. |
| 34 | 48 | SQL Server Availability Group Failover | This SQL Server (2012 and later) alert determines if an availability group has failed over from one instance to another. |
| 35 | 49 | SQL Server Availability Group Status Change | This SQL Server (2012 and later) alert determines if an availability group has had a change in status to Partially Healthy or Not Healthy. An Alert Le… |
| 36 | 47 | SQL Server Deadlocks | This SQL Server (2008 and later) and Azure SQL MI alert will report the number of deadlocks that occurred on the instance. |
| 37 | 43 | SQL Server Error Log Alert | This SQL Server (2005 and up) and Azure SQL MI alert will report error log entries containing a specified string or pair of strings. |
| 38 | 46 | SQL Server/Azure SQL Ineffective Statistics | This SQL Server (2005 and up), Azure SQL MI and Azure SQL DB alert detects indexes with ineffective statistics.  It uses criteria such as time since l… |
| 39 | 33 | SQL Server Job Failure | This SQL Server and Azure SQL MI alert will report jobs that have failed since the last time this alert executed. |
| 40 | 56 | SQL Server Backup Frequency | This SQL Server alert determines whether the amount of time since the last successful backup exceeds the configured threshold for a particular backup … |
| 41 | 57 | SQL Server Recovery Backup Assets Size | This SQL Server alert determines whether the size of all backup assets required to recover a database exceeds the configured threshold in MB for any o… |
| 42 | 58 | SQL Server Backup Jobs Running | This SQL Server alert determines whether the number of currently running backup jobs for the instance exceeds the configured threshold. |
| 43 | 59 | SQL Server Backup Time Allotted | This SQL Server alert determines whether the time of the last backup exceeds the configured time threshold for a particular backup type (Full, Diff, T… |
| 44 | 41 | SQL Server Log has Many Virtual Logs | This SQL Server (2005 and up) and Azure SQL MI alert will report databases that have a high number of Virtual Logs.  To limit the result set and reduc… |
| 45 | 42 | Total Blocking Wait Time | This Oracle, SQL Server, Azure SQL DB, Azure SQL MI, Sybase, MySQL and PostgreSQL alert will report the amount of time that sessions waited due to blo… |
| 46 | 45 | SQL Server Long Running Jobs | This SQL Server (2005 and up) and Azure SQL MI alert detects jobs (in SQL Agent) that are running longer than 2 standard deviations from the mean exec… |
| 47 | 26 | DPA Database Instance Monitor Errors | This alert determines if any errors occurred while monitoring a database instance. |
| 48 | 27 | DPA Resource Collection Errors | This alert determines if any errors occurred while collecting resource data for a database instance. |
| 49 | 113 | MySQL/MariaDB Temporary Tables Creation Rate | This alert determines if MySQL or MariaDB Temporary Tables Creation Rate is too high during evaluated period. |
| 50 | 114 | MySQL/MariaDB Temporary Tables on Disk Creation Rate | This alert determines if MySQL or MariaDB Temporary Tables on Disk Creation Rate is too high during evaluated period. |
| 51 | 127 | MySQL/MariaDB Schema Freespace | This MySQL/MariaDB alert determines the percent of free space in each schema of a monitored database. Free space should be within given limits as it r… |
| 52 | 115 | MySQL/MariaDB Table Freespace | This MySQL/MariaDB alert determines the percent of free space in each table of a monitored database. Free space should be within given limits as it re… |
| 53 | 116 | MySQL/MariaDB Oversized Index | This alert determines if any of the MySQL or MariaDB tables has defined indexes that occupy more overall space than the predefined fraction. |
| 54 | 118 | MySQL/MariaDB Tables Missing Primary Key | This alert determines if any of the MySQL or MariaDB tables does not have PK defined |
| 55 | 119 | MySQL/MariaDB Latest Deadlock Alert | This alert determines if there is an unseen dead-lock in MySQL or MariaDB database. |
| 56 | 120 | MySQL/MariaDB InnoDB Buffer Pool Utilization Alert | This alert determines if the ratio of free to all MySQL or MariaDB buffer pages is too low. Data reflects activity against tables managed by the InnoD… |
| 57 | 121 | MySQL/MariaDB InnoDB Log File Size Alert | This alert determines if the MySQL or MariaDB REDO log file size is too small. Data reflects activity against tables managed by the InnoDB (or an Inno… |
| 58 | 122 | MySQL/MariaDB File Sorts on Disk Alert | This alert determines if MySQL or MariaDB database uses too often disk for sorting its result |
| 59 | 123 | MySQL/MariaDB Replication Seconds Behind Master Alert | This alert determines if replication (slave) MySQL or MariaDB instance is too much behind master |
| 60 | 124 | MySQL/MariaDB Replication Threads Availability Alert | This alert determines if replication (slave) MySQL or MariaDB database threads (I/O and slave) are unavailable |
| 61 | 125 | MySQL/MariaDB Redundant Indexes Alert | This alert determines if a MySQL or MariaDB database has tables containing redundant indexes |
| 62 | 126 | MySQL/MariaDB Duplicate Indexes Alert | This alert determines if a MySQL or MariaDB database has tables containing duplicate indexes |
| 63 | 50 | Single Resource Metric | Evaluates a specified resource metric's values over a period of time. |
| 64 | 51 | All Metrics in a Category | Evaluates all resource metrics in a specified category over a period of time. |
| 65 | 100 | Custom SQL Alert - Single Numeric Return | Executes a user-defined SQL statement that will return a single numeric value |
| 66 | 101 | Custom SQL Alert - Multiple Numeric Return | Executes a user-defined SQL statement that will return one or more name/numeric value pairs |
| 67 | 102 | Custom SQL Alert - Single Boolean Return | Executes a user-defined SQL statement that will return a single string value ('TRUE' or 'FALSE') |
| 68 | 104 | Custom SQL Alert - Single Alert Status Return | Executes a user-defined SQL statement that will return a single string value that represents an alert status. Valid values are: NORMAL, INFO, LOW, MED… |
| 69 | 110 | Custom Procedure Alert - Single Numeric Return | Executes a user-defined stored procedure that will return a single numeric value |
| 70 | 111 | Custom Procedure Alert - Single Boolean Return | Executes a user-defined stored procedure that will return a single string value ('TRUE' or 'FALSE') |
| 71 | 112 | Custom Procedure Alert - Single Alert Status Return | Executes a user-defined stored procedure that will return a single string value that represents an alert status. Valid values are: NORMAL, INFO, LOW, … |
| 72 | 130 | PostgreSQL Autovacuum Status | This PostgreSQL alert is triggered if the autovacuum daemon is OFF. The autovacuum daemon helps prevent table bloat. |
| 73 | 131 | PostgreSQL Track Counts Status | This PostgreSQL alert is triggered if the track_counts setting is OFF. The track_counts setting must be ON to allow PostgreSQL to collect statistics o… |
| 74 | 132 | PostgreSQL Track Activities Status | This PostgreSQL alert is triggered if the track_activities setting is OFF. The track_activities setting enables tracking of currently executing SQL st… |
| 75 | 133 | PostgreSQL Last Analyze | If the PostgreSQL autovacuum process is disabled, it does not automatically trigger an analyze operation to update statistics. This alert warns you if… |
| 76 | 134 | PostgreSQL Last AutoAnalyze | The PostgreSQL autovacuum process can automatically trigger an analyze operation, which updates the statistics used to determine query plans. This ale… |
| 77 | 135 | PostgreSQL Last Vacuum | If the PostgreSQL autovacuum process is disabled, it does not run automatically to remove dead tuples (outdated versions of rows that are no longer ne… |
| 78 | 136 | PostgreSQL Last AutoVacuum | The PostgreSQL autovacuum process runs automatically to remove dead tuples (outdated versions of rows that are no longer needed). This alert warns you… |
| 79 | 137 | PostgreSQL Long Running Vacuum | This alert notifies you when a vacuum operation runs for longer than the specified threshold. |
| 80 | 138 | PostgreSQL Long Running Query | This alert notifies you when any query other than the autovacuum process runs for longer than the specified threshold. |
| 81 | 139 | PostgreSQL Dead Tuple | This alert monitors the row count or percentage of dead tuples in the database instance. A high percentage can indicate that the PostgreSQL vacuuming … |
| 82 | 140 | PostgreSQL Total Idle in Transaction Connections | Each PostgreSQL instance has a maximum number of connections (max_connections in pg_settings). This alert warns you when a high percentage of the avai… |
| 83 | 141 | PostgreSQL Total Connections | Each PostgreSQL instance has a maximum number of connections (max_connections in pg_settings). This alert warns you when a high percentage of the avai… |
| 84 | 142 | PostgreSQL User Role Expiry | This alert notifies you when a user role expired or will expire in the specified number of days. |
| 85 | 143 | PostgreSQL Total Table Bloat In Database | This alert warns you if the percentage of bloat (unused space that was not reclaimed) exceeds a threshold. |
| 86 | 144 | PostgreSQL Collect Database Size | This alert collects the size of each database in a PostgreSQL cluster. This alert is never triggered. The collected data is used as input for the Post… |
| 87 | 145 | PostgreSQL Collect Relation Table Size | This alert collects the size of each relation (table) in a PostgreSQL cluster. This alert is never triggered. The collected data is used as input for … |
| 88 | 146 | PostgreSQL Database/Table Percentage Growth | This alert warns you if the size of the database or the size of all relations increase by more than the specified percentage during an execution inter… |
