# Lookup: `dbo.Settings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 193 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| SettingID | Name | Description | Units | Minimum | Maximum | CurrentValue | DefaultValue | Hint |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Action-DefaultTimeOut | Define how maximally long action can run |  | minutes | 1 | 60 | 22 | 22 |  |
| AgentManagement-AutoApproveAgents | Automatically approve connected agents | Automatically approve any agent that connects to this server | Boolean | 0 | 1 | 1 | 1 |  |
| AgentManagement-AutoCreateNode | Automatically create node | Automatically create orion node when an agent registers | Boolean | 0 | 1 | 1 | 1 |  |
| AgentManagement-AutoUpdateAgents | Automatically update connected agents | Automatically update any agent that connects to this server | Boolean | 0 | 1 | 1 | 1 |  |
| AgentManagement-FeatureEnable-LinuxAgent | Enable Linux Agent Feature | If this setting is set to 1 the Linux Agent feature is enabled. | Boolean | 0 | 1 | 1 | 1 |  |
| AgentManagement-HowLongIsAgentDisplayedAsNew | How long is agent displayed as new | How long should newly registered agents be displayed as new in the Manage agents table. | Hours | 0 | 168 | 24 | 24 |  |
| AlertEngine-AlertAcknowledgeUrlText | Alert Acknowledge Url Text | Click here to acknowledge this alert |  | 0 | 0 | 0 | 0 |  |
| AlertEngine-AlertSuppressionEntityMaintenanceIntervalInHours | Alert Suppression Entity Maintenance Interval | Interval in hours how often to perform Orion.AlertSuppression entity maintenance, zero to disable |  | 0 | 168 | 24 | 24 |  |
| AlertEngine-AutoClearAlertIntervalInMinutes | Time interval for acknowledged alerts to be re-triggered automatically. | Time interval for acknowledged alerts to be re-triggered automatically. Depends also on setting "AlertEngine-ClearAlertTimerIntervalInMinutes". | minutes | 10 | 144000 | 14400 | 14400 |  |
| AlertEngine-ClearAlertTimerIntervalInMinutes | Timer for checking of acknowledged alerts to be re-triggered. | Timer for checking of acknowledged alerts to be re-triggered. Zero means that checking is disabled. | minutes | 0 | 14400 | 0 | 0 |  |
| AlertEngine-ConcurrencyMultiplicatorForMaxParallelTaskThrottling | Multiplicator of AlertEngine-ConditionsConcurrencyLimit which gives a maximum parallel task per second | Multiplicator of AlertEngine-ConditionsConcurrencyLimit which gives a maximum parallel task per second | count | 0 | 1024 | 4 | 4 |  |
| AlertEngine-ConditionsConcurrencyLimit | Property to limit maximum count of concurrent conditions evaluating. | Property to limit maximum count of concurrent conditions evaluating. | count | 0 | 16 | 0 | 0 |  |
| AlertEngine-ConditionsStateHolderUseMemoryProxy | Property to enable usage of memory proxy in ConditionStateHolder. | Property to enable usage of memory proxy in ConditionStateHolder. | boolean | 0 | 1 | 1 | 1 |  |
| AlertEngine-ConsiderTimeOfDaySettingsForReset | Property to enable considering time of day settings for reset actions. | Property to enable considering time of day settings for reset actions | boolean | 0 | 1 | 0 | 0 |  |
| AlertEngine-LimitCustomResetByTriggeredObjects | Enable limiting of custom reset query by triggered objects | Enable limiting of custom reset query by triggered objects | boolean | 0 | 1 | 1 | 1 |  |
| AlertEngine-MaxAlertExecutionTimeout | Maximum value in seconds of alert execution | If alert execution process takes more then this value it will be disabled | seconds | 10 | 300 | 60 | 60 |  |
| AlertEngine-MaxIntervalWithoutSleepInSeconds | Interval for which one task (thread) can work without interrupting (sleeping) | Interval for which one task (thread) can work without interrupting (sleeping) | seconds | 0 | 86400 | 60 | 60 |  |
| AlertEngine-MaxParallelTaskThrottlingExceededSleepTimeInMs | Wait (sleep) interval when maximum parallel task per second was exceeded | Wait (sleep) interval when maximum parallel task per second was exceeded | ms | 0 | 10000 | 200 | 200 |  |
| AlertEngine-MaxTaskThrottlingSleepTimeInMs | Maximal wait (sleep) interval when one task (thread) was working without interrupting see AlertEngine-MaxIntervalWithoutSleepInSeconds | Maximal wait (sleep) interval when one task (thread) was working without interrupting see AlertEngine-MaxIntervalWithoutSleepInSeconds | ms | 0 | 300000 | 9000 | 9000 |  |
| AlertEngine-MinTaskThrottlingSleepTimeInMs | Minimal wait (sleep) interval when one task (thread) was working without interrupting see AlertEngine-MaxIntervalWithoutSleepInSeconds | Minimal wait (sleep) interval when one task (thread) was working without interrupting see AlertEngine-MaxIntervalWithoutSleepInSeconds | ms | 0 | 300000 | 6000 | 6000 |  |
| AlertEngine-OverloadCounterOnThresholdDelaySeconds | Overload counter threshold delay in seconds | Specify how much time in seconds will we wait, before we will execute another action if number of executed action during specified time (AlertEngine-O… | seconds | 0 | 3600 | 120 | 120 |  |
| AlertEngine-OverloadCounterThreshold | Overload counter threshold | Specify maximum number of allowed action in specified OverloadCounterTimeWindowSeconds interval, before we will start to delay them. | count | 0 | 10000 | 120 | 120 |  |
| AlertEngine-OverloadCounterTimeWindowSeconds | Overload counter time window in seconds | Time in which we count maximum allowed executed action before we will start delay other actions. | seconds | 0 | 86400 | 3600 | 3600 |  |
| AlertEngine-PauseActionsOfAllAlerts | Pause actions of all alerts | Will pause for all alert definitions executing actions |  | 0 | 1 | 0 | 0 |  |
| AlertEngine-ProcessUnmanagedObjects | Process alert actions for objects in Unmanaged state | If TRUE, then Alerting Engine will execute actions for objects in Unmanaged state | boolean | 0 | 1 | 0 | 0 |  |
| AlertExpressionBuilder-MaxSuggestedItems | Maximum count of suggested items in alert expression builder | Maximum count of suggested items in alert expression builder on trigger condion step |  | 0 | 10000 | 100 | 100 |  |
| AssetInventory-PollIntervalDays | Default Asset Inventory Poll Interval | Check asset inventory every configured time interval | days | 1 | 3650 | 1 | 1 |  |
| AutomaticGeolocation-Enable | Enable automatic geolocation | If TRUE, then automatic geolocation is enabled | boolean | 0 | 1 | 0 | 0 |  |
| AutoResetLogLevelsEnabled | Enable / Disable auto reset for logging levels | If TRUE, then Maintenance automatically reset logging levels to defaults | Boolean | 0 | 1 | 1 | 1 |  |
| BroadBand-Codeword-Error | Broadband Interface Codewords - Critical Level | When a Broadband Upstream Interface's received CodeWord error level is above this setting, the Interface will be including in "Codeword Error" reports… | % | 0 | 100 | 10 | 10 |  |
| BroadBand-Codeword-Warning | Broadband Interface Codewords - Warning Level | When a Broadband Upstream Interface's received CodeWord error level is above this setting, the Interface will be including in "Codeword Error" reports… | % | 0 | 100 | 5 | 5 |  |
| BroadBand-SNR-Error | Broadband Interface Signal/Noise Ratio - Low Level | When a Broadband Upstream Interface's Signal/Noise Ratio is below this setting, the Interface will be included in "Low Signal Quality" reports and col… | db | -40 | 40 | 20 | 20 |  |
| BroadBand-SNR-Warning | Broadband Interface Signal/Noise Ratio - Warning Level | When a Broadband Upstream Interface's Signal/Noise Ratio is below this setting, the Interface will be included in "Low Signal Quality" reports and col… | db | -40 | 40 | 25 | 25 |  |
| CustomerPortalIntegration-Enabled | Property to enable/disable Customer Portal Integration. | Property to enable/disable Customer Portal Integration. | boolean | 0 | 1 | 1 | 1 |  |
| DailyRemoveTemporaryJetFiles | Enable / Disable daily removal of JET****.tmp files | If TRUE, then Maintenance automatically removes temporary JET****.tmp files in system temporary directories - c:\Windows\Temp and c:\Windows\Temp | Boolean | 0 | 1 | 1 | 1 |  |
| Database-Beta-Blocker | Block beta database upgrade | Upgrades from Beta are not supported. If TRUE then beta database was configured. |  | 0 | 0 | 0 | 0 |  |
| DatabaseDetails-WarnRowsNumber | Warning rows number in statistics tables | Define how many rows should be in stats table to see warning message | units | 10000 | 100000000 | 10000000 | 10000000 |  |
| DatabaseDetails-WarnRowsNumberEnabled | Enable / Disable warning message for huge tables | Define if warning message for table rows count threshold enabled or disabled | boolean | 0 | 1 | 1 | 0 |  |
| dbm-defragmentation-applyPatternsToChecking | Should be index selection patterns used also for checking. | Should be index selection patterns used also for checking. | Boolean | 0 | 1 | 1 | 1 |  |
| dbm-defragmentation-checkingEnabled | Is checking of defragmentation enabled? | Is checking of defragmentation enabled? | Boolean | 0 | 1 | 1 | 1 |  |
| dbm-defragmentation-checkingRowLimit | Minimal number of rows for indexes which will be checked. | Minimal number of rows for indexes which will be checked. Indexes with number of rows below this will not be checked |  | 0 | 100000000 | 100000 | 100000 |  |
| dbm-defragmentation-cleanuplevel | Change in fragmentation considered to be good enough for clean up penalty flag. | Change in fragmentation considered to be good enough for clean up penalty flag. | Percent | 0 | 100 | 5 | 5 |  |
| dbm-defragmentation-criticalFragmentationLevel | Fragmentation level which is considered to be bad. | Fragmentation level which is considered to be bad and user will be informed about it. | Percent | 0 | 100 | 90 | 90 |  |
| dbm-defragmentation-difflevel | Change in fragmentation considered to be good enough. | Change in fragmentation considered to be good enough. | Percent | 0 | 100 | 1 | 1 |  |
| dbm-defragmentation-enabled | Is defragmentation enabled? | Is defragmentation enabled? | Boolean | 0 | 1 | 1 | 1 |  |
| dbm-defragmentation-maxfrag | Maximum tolerable fragmentation | Indexes with higher fragmentation are considered to be fragmented. | Percent | 0 | 100 | 20 | 20 |  |
| dbm-defragmentation-searchIndexesCaseSensitive | Should be index selection patterns case-sensitive. | Should be index selection patterns case-sensitive. | Boolean | 0 | 1 | 0 | 0 |  |
| dbm-defragmentation-timeout | Timeout for defragmentation | Timeout for defragmentation | Seconds | 1 | 50000 | 3600 | 3600 |  |
| DiscoveredNodesLimit | Enable / Disable limiting Scheduled Discovery Results |  | boolean | 0 | 1 | 1 | 1 |  |
| DiscoveredNodesLimitNumber | Max number or rows to display in Scheduled Discovery Results |  | units | 100 | 20000 | 1000 | 1000 |  |
| Discovery-Import-DNSDeDuplicator-Priority | Execution order of import duplicate detector | Execution order of duplicate detection during discovery - import phase, 0 value turn off detection | order | 0 | 0 | 50 | 50 |  |
| Discovery-Import-DNSDeDuplicator-Weight | Weight - vote right during Discovery - import duplicate detection | Weight of duplicate detector, higher value has higher vote - 0 is neutral | weight | 0 | 100 | 27 | 27 |  |
| Discovery-Import-MacDuplicateDetector-Priority | Execution order of import duplicate detector | Execution order of duplicate detection during discovery - import phase, 0 value turn off detection | order | 0 | 0 | 60 | 60 |  |
| Discovery-Import-MacDuplicateDetector-Weight | Weight - vote right during Discovery - import duplicate detection | Weight of duplicate detector, higher value has higher vote - 0 is neutral | weight | 0 | 100 | 26 | 26 |  |
| Discovery-Import-SysNameDeDuplicator-Priority | Execution order of import duplicate detector | Execution order of duplicate detection during discovery - import phase, 0 value turn off detection | order | 0 | 0 | 70 | 70 |  |
| Discovery-Import-SysNameDeDuplicator-Weight | Weight - vote right during Discovery - import duplicate detection | Weight of duplicate detector, higher value has higher vote - 0 is neutral | weight | 0 | 100 | 25 | 25 |  |
| Discovery-NotifyAboutRemovableVolumes | Enable notification about new removable volumes | If TRUE, then Network Discovery will notify about new removable volumes | boolean | 0 | 1 | 0 | 0 |  |
| EvaluationExpiration-Check | Check Evaluation Expiration | If TRUE, then periodic check for Evaluation expiration is performed |  | 0 | 1 | 1 | 1 |  |
| FailOver-FailOverTime | Fail Over Time | The age of the Keepalive at which a primary is considered down | seconds | 30 | 21600 | 120 | 120 |  |
| FailOver-ReNotifyInterval | Re-notification Rate | The interval at which the alert action for Fail Over repeated | minutes | 1 | 1440 | 60 | 60 |  |
| ForecastCoefficients-Recalculation-Enabled | Enable Forecast Coefficients Recalculation | Calculate forecast coefficients periodically. | boolean | 0 | 1 | 1 | 1 |  |
| ForecastMinDays | Forecast Minimal Days | How old data we need to enable displaying the data? | days | 0 | 99999 | 7 | 7 |  |
| HA-DefaultPoolIntervalMemberDown | Default interval to consider a member as down in a pool | If a member has not updated its health status during this interval it is considered as down | s | 15 | 60 | 32 | 32 |  |
| HA-DefaultPoolIntervalPoolTask | Default interval to run management tasks in a pool | The management tasks run once every interval | s | 1 | 10 | 8 | 8 |  |
| HA-DefaultPoolIntervalSuicideRule | Default interval to commit member suicide rule | If a member has no connection to whole pool for more then this interval then the member commit suicide | s | 15 | 60 | 29 | 29 |  |
| HA-EmailMeOnFacilityStatusChange | Email me when facility status is changed (e.g. MSMQ) | Specify if email notification is send when facility (e.g. MSMQ) status is changed | boolean | 0 | 1 | 0 | 0 |  |
| HA-EmailMeOnResourceStatusChange | Email me when resource status is changed (e.g. Polling) | Specify if email notification is send when resource (e.g. Polling) status is changed | boolean | 0 | 1 | 0 | 0 |  |
| HA-EmailMeOnServerStatusChange | Email me when server status is changed | Specify if email notification is send when server status is changed | boolean | 0 | 1 | 1 | 1 |  |
| HA-EnableHighAvailability | Enable High Availability | Specify if High Availability is enabled by user or not | boolean | 0 | 1 | 1 | 1 |  |
| HA-IntervalTakeoverRetention | Keep the secondary server disabled for a period of time after a failover event to prevent continuous failover | The interval for disabling failed pool member after takeover | minutes | 0 | 30 | 10 | 10 |  |
| HA-ShutdownTimeout | Shut Down Time Out | The time out in milliseconds for High Availability service to shut down | ms | 100 | 10000 | 1000 | 1000 |  |
| IncidentIntegration-Enabled | Incident Integration Enabled | Enables incident integration to with Orion alerting | boolean | 0 | 1 | 0 | 0 |  |
| LicenseSaturation-Disable | Disable license saturation check | If TRUE, then License Saturation checking functionality will be disabled | boolean | 0 | 1 | 0 | 0 |  |
| LicenseSaturation-WarningPercentage | License saturation percentage | Threshold for license saturation warning notification. | Percent | 0 | 100 | 90 | 90 |  |
| Licensing_LicenseRefreshJournal_RetainDays | License Refresh Journal retention period | The duration of the license refresh entries. Entries older than the retention period will be removed by Database Maintenance. | days | 14 | 28 | 21 | 21 |  |
| MaintenanceExpiration-Check | Check Maintenance Expiration | If TRUE, check maintenance expiration |  | 0 | 1 | 1 | 1 |  |
| MaintenanceRenewals-Check | Check Maintenance Renewals | If TRUE, check  available Maintenance Renewals |  | 0 | 1 | 1 | 1 |  |
| MaintenanceRenewals-Disable | Disable maintenance renewals | If TRUE, then Maintenance Renewals functionality will be disabled | boolean | 0 | 1 | 0 | 0 |  |
| MaintenanceRenewals-ShowIgnored | Show Ignored | If TRUE, show ignored |  | 0 | 1 | 0 | 0 |  |
| NetPerfMon-BufferMisses-Error | Cisco Buffer Misses - Critical Level | Nodes with Buffer Misses above this number will appear Bold Red on Cisco Buffer resources. |  | 1 | 1000000 | 100 | 100 |  |
| NetPerfMon-BufferMisses-Warning | Cisco Buffer Misses - Warning Level | Nodes with Buffer Misses above this number will appear Red on Cisco Buffer resources. |  | 1 | 1000000 | 10 | 10 |  |
| NetPerfMon-CPULoad-Error | CPU Load - Critical Level | Nodes with CPU Load above this level will appear on "High CPU Load" reports. The Gauges will also be colored Bold Red. | % | 1 | 100 | 90 | 90 |  |
| NetPerfMon-CPULoad-Warning | CPU Load - Warning Level | Nodes with CPU Load above this level will appear on "High CPU Load" reports. The Gauges will also be colored Red. | % | 1 | 100 | 80 | 80 |  |
| NetPerfMon-DiskSpace-Error | Disk Usage - Critical Level | Disk Usage will be colored Bold Red and appear on "High Disk Usage" reports when Percent Disk Usage is above this level. | % | 1 | 100 | 95 | 95 |  |
| NetPerfMon-DiskSpace-Warning | Disk Usage - Warning Level | Disk Usage will be colored Red and appear on "High Disk Usage" reports when Percent Disk Usage is above this level. | % | 1 | 100 | 80 | 80 |  |
| NetPerfMon-ErrorsDiscards-Error | Interface Errors and Discards - Critical Level | Interfaces with Errors+Discards above this level will appear on "High Errors and Discards" reports. |  | 1 | 50000 | 2500 | 2500 |  |
| NetPerfMon-ErrorsDiscards-Warning | Interface Errors and Discards - Warning Level | Interfaces with Errors+Discards above this level will appear on "High Errors and Discards" reports. |  | 1 | 50000 | 1000 | 1000 |  |
| NetPerfMon-Forecast-Capacity | Global Capacity Threshold. | Specify the global threshold for maximal capacity. This typically should be 100% | % | 1 | 100 | 100 | 100 |  |
| NetPerfMon-PercentLoss-Error | Percent Packet Loss - Critical Level | Nodes with Percent Packet Loss above this level will appear on "High Percent Loss" reports. The Percent Loss Gauges will also be colored Red. | % | 1 | 100 | 50 | 50 |  |
| NetPerfMon-PercentLoss-Warning | Percent Packet Loss - Warning Level | Nodes with Percent Packet Loss above this level will appear on "High Percent Loss" reports. The Percent Loss Gauges will also be colored Red. | % | 1 | 100 | 30 | 30 |  |
| NetPerfMon-PercentMemoryUsed-Error | Percent Memory Used - Critical Level | Nodes with Percent Memory Used above this level will appear on "Percent Memory Used" reports. | % | 1 | 100 | 90 | 90 |  |
| NetPerfMon-PercentMemoryUsed-Warning | Percent Memory Used - Warning Level | Nodes with Percent Memory Used above this level will appear on "Percent Memory Used" reports. | % | 1 | 100 | 80 | 80 |  |
| NetPerfMon-PercentUtilization-Error | Interface Percent Utilization - Critical Level | Interfaces with Current Percent Utilization above this level will appear on "High Percent Utilization" reports. The Gauges will also be colored Bold R… | % | 1 | 100 | 90 | 90 |  |
| NetPerfMon-PercentUtilization-Warning | Interface Percent Utilization - Warning Level | Interfaces with Current Percent Utilization above this level will appear on "High Percent Utilization" reports. The Gauges will also be colored Red. | % | 1 | 100 | 80 | 80 |  |
| NetPerfMon-ResponseTime-Error | Response Time - Critical Level | Nodes responding above this level will appear on "High Response Time" reports. The Gauges will also be colored Bold Red. | ms | 1 | 5000 | 1000 | 1000 |  |
| NetPerfMon-ResponseTime-Warning | Response Time - Warning Level | Nodes responding above this level will appear on "High Response Time" reports. The Gauges will also be colored Red. | ms | 1 | 5000 | 500 | 500 |  |
| PluginInstanceSeparateProcess-AttemptsToRestart | Attempts count to restart load plugin | Attempts count to restart load plugin |  | 1 | 10 | 3 | 3 |  |
| PluginInstanceSeparateProcess-AttemptsToWait | Attemts to wait until plugin loaded | Attemts to wait until plugin loaded. Increment by aim timeout |  | 1 | 10 | 3 | 3 |  |
| PluginInstanceSeparateProcess-WaitProcessTimeout | Timeout for loading plugin | Timeout for loading plugin while loading plugin | ms | 1000 | 60000 | 10000 | 10000 |  |
| PollerLimit-Check | Check Poller Limit | If TRUE, check poller limit |  | 0 | 1 | 1 | 1 |  |
| PollerLimitReachedScaleFactor | Poller limit reached scale factor | LimitReached level for polling engine usage value | % | 1 | 100 | 100 | 100 |  |
| PollerLimitWarningScaleFactor | Poller limit warning scale factor | Warning level for polling engine usage value | % | 1 | 100 | 85 | 85 |  |
| ProductsBlog-Disable | Disable products blog | If TRUE, then Product Blog functionality will be disabled | boolean | 0 | 1 | 0 | 0 |  |
| ProductsBlog-EnableContent | Enable products blog  content | If TRUE, store latest product posts |  | 0 | 1 | 1 | 1 |  |
| ProductsBlog-StoredPostsCount | Enable products blog content  count | Count of stored posts |  | 0 | 1000000 | 20 | 20 |  |
| RabbitMQLogRotateKeepFiles | Number of rotated RabbitMQ log files | Number of rotated RabbitMQ log files to keep in the logs folder |  | 0 | 50 | 5 | 5 |  |
| RabbitMQLogRotateMaxFileSize | Maximum RabbitMQ log file size in Mb | Rotate RabbitMQ file size threshold | Mb | 1 | 100 | 20 | 20 |  |
| RecommendationEngine-Enabled | Property to enable/disable RecommendationEngine Engine. | Property to enable/disable RecommendationEngine Engine. | boolean | 0 | 1 | 1 | 1 |  |
| StatisticalBaseline-Recalculation-Enabled | Enable Statistical Baseline Recalculation | Calculate statistical baseline data every day. | boolean | 0 | 1 | 1 | 1 |  |
| SWNetPerfMon_Downtime_History_Retention | Downtime History Retention | Downtime History will be deleted from the database after configured days. | days | 1 | 60 | 7 | 7 |  |
| SWNetPerfMon-AuditingTrails | Enable Audit Trails | Enable audit trails | boolean | 0 | 1 | 1 | 1 |  |
| SWNetPerfMon-Settings-Archive Time | Archive Time | The time of day to run the Orion Database Maintenance process. |  | 0 | 0 | 0.09375 | 0.09375 |  |
| SWNetPerfMon-Settings-AutoDependency Enabled | Enable Auto Dependencies | Enable Periodical Auto Dependency Calculation | boolean | 0 | 1 | 0 | 0 |  |
| SWNetPerfMon-Settings-Availability Calculation | Availability Calculation | 1 for Node Status. 2 for Percent Packet Loss. | method | 1 | 2 | 1 | 1 |  |
| SWNetPerfMon-Settings-Baseline AllowSecureData | Allow Secure Data On Web | If TRUE, Allow Secure Data On Web. | boolean | 0 | 1 | 0 | 0 |  |
| SWNetPerfMon-Settings-Baseline Calculation | Baseline Calculation | NPM can throttle traffic to routers for the initial baseline calculation. | boolean | 0 | 1 | 1 | 1 |  |
| SWNetPerfMon-Settings-Baseline Collection Duration | Baseline Data Collection Duration | Specify how many days of data to include in the baseline. | days | 1 | 60 | 7 | 7 |  |
| SWNetPerfMon-Settings-Counter Rollover | Counter Rollover | Method 2 |  | 0 | 0 | 0 | 0 |  |
| SWNetPerfMon-Settings-Default Fast Poll Interval | Node Warning Level | Mark devices as Down that have not responded for configured time. | s | 10 | 1200 | 120 | 120 |  |
| SWNetPerfMon-Settings-Default Interface Poll Interval | Deafult Poll Interval for Interfaces | Check response time and status every configured time interval. | s | 10 | 1200 | 120 | 120 |  |
| SWNetPerfMon-Settings-Default Interface Stat Poll Interval | Default Interface Statistics Poll Interval | Collect Statistics for Interfaces every configured time interval. | m | 1 | 120 | 9 | 9 |  |
| SWNetPerfMon-Settings-Default Node Poll Interval | Default Node Poll Interval | Check response time and status every configured time interval. | s | 10 | 1200 | 120 | 120 |  |
| SWNetPerfMon-Settings-Default Node Stat Poll Interval | Default Node Stat Poll Interval | Collect Statistics for Nodes every configured time interval. | m | 1 | 120 | 10 | 10 |  |
| SWNetPerfMon-Settings-Default Node Topology Poll Interval | Default Node Topology Poll Interval | Default Node Topology Poll Interval | m | 1 | 1440 | 120 | 120 |  |
| SWNetPerfMon-Settings-Default Preferred AddressFamily DHCP | Default Preferred IP Version | Preferred IP version. |  | 4 | 6 | 4 | 4 |  |
| SWNetPerfMon-Settings-Default Rediscovery Interval | Default Rediscovery Interval | Default Rediscovery Interval | m | 1 | 120 | 30 | 30 |  |
| SWNetPerfMon-Settings-Default Topology Throttling | Default Node Topology Throttling Delay | Default Node Topology Throttling Delay | ms | 0 | 1000 | 50 | 50 |  |
| SWNetPerfMon-Settings-Default Volume Poll Interval | Default Volume Poll Interval | Check response time and status every configured time interval. | s | 10 | 1200 | 120 | 120 |  |
| SWNetPerfMon-Settings-Default Volume Stat Poll Interval | Default Volume Stat Poll Interval | Collect Statistics for Volumes every configured time interval. | m | 1 | 150 | 15 | 15 |  |
| SWNetPerfMon-Settings-DHCP EnableRDNS | Perform reverse DNS lookup | Standard poller will perform reverse DNS lookup for DHCP nodes. | boolean | 0 | 1 | 1 | 1 |  |
| SWNetPerfMon-Settings-EnableDowntimeMonitoring | Enable/disable downtime monitoring backend | If true, downtime monitoring will store downtime data on each NetObject status change | boolean | 0 | 1 | 1 | 1 |  |
| SWNetPerfMon-Settings-ESX API Timeout | ESX API Timeout | Maximum time to wait for ESX web service response. | ms | 1000 | 60000 | 30000 | 30000 |  |
| SWNetPerfMon-Settings-Forecast Collection Duration | Forecast Data Collection Duration | Specify how many days of data to be included in the forecast coefficients calculation. | days | 3 | 365 | 180 | 180 |  |
| SWNetPerfMon-Settings-ICMP Data | ICMP Data | SolarWinds Status Query |  | 0 | 0 | 0 | 0 |  |
| SWNetPerfMon-Settings-ICMP Timeout | ICMP Timeout | These settings control all ICMP packets sent by NPM. | ms | 500 | 25000 | 2500 | 2500 |  |
| SWNetPerfMon-Settings-Interface Baseline Calculation Frequency | Interface Baseline Calculation Frequency | Specify calculation frequency for Interface Baseline. 0 means everyday and -1 means never. 1..7 denotes once per week calculation on Sunday..Saturday. |  | -1 | 7 | 1 | 1 |  |
| SWNetPerfMon-Settings-Invalid Dynamic IP | Default Assigned IP Address |  |  | 0 | 0 | 0 | 0 |  |
| SWNetPerfMon-Settings-Keep Alive Timeout | Report Polling Engine Status as Warning | Polling Engine status is reported as Down if keep-alive field wasn't updated in last 1.5 * keep alive timeout seconds. | seconds | 10 | 600 | 60 | 60 |  |
| SWNetPerfMon-Settings-Last Archive | Last Archive Time |  |  | 0 | 0 | 43531.30078125 | 0 |  |
| SWNetPerfMon-Settings-MaxMaintenanceThreads | Max Number of DBM Threads | Allows you to change the number of threads used during database maintenance. | threads | 1 | 8 | 1 | 1 |  |
| SWNetPerfMon-Settings-Retain Auditing Trails | Auditing Trails Statistics Retention | Auditing Trails statistics will be deleted from the database after configured days. | days | 30 | 3650 | 365 | 365 |  |
| SWNetPerfMon-Settings-Retain Container Daily | Container Daily Statistics Retention | Daily Containers statistics will be deleted from the database after configured days. | days | 30 | 3650 | 365 | 365 |  |
| SWNetPerfMon-Settings-Retain Container Detail | Container Detailed Statistics Retention | Detailed Container statistics will be summarized into hourly statistics after configured days. | days | 1 | 60 | 7 | 7 |  |
| SWNetPerfMon-Settings-Retain Container Hourly | Container Hourly Statistics Retention | Hourly Containers statistics will be summarized into daily statistics after configured days. | days | 1 | 120 | 30 | 30 |  |
| SWNetPerfMon-Settings-Retain Daily | Daily Statistics Retention | Daily statistics will be deleted from the database after configured days. | days | 30 | 3650 | 365 | 365 |  |
| SWNetPerfMon-Settings-Retain Detail | Detailed Statistics Retention | Detailed statistics will be summarized into hourly statistics after configured days. | days | 1 | 60 | 7 | 7 |  |
| SWNetPerfMon-Settings-Retain Discovery | Discovery Retention | Discovery profiles will be deleted from the database after configured days. | days | 1 | 365 | 60 | 60 |  |
| SWNetPerfMon-Settings-Retain Events | Events Retention | Network Events will be deleted from the database after configured days. | days | 1 | 365 | 30 | 30 |  |
| SWNetPerfMon-Settings-Retain Hourly | Hourly Statistics Retention | Hourly statistics will be summarized into daily statistics after configured days. | days | 1 | 120 | 30 | 30 |  |
| SWNetPerfMon-Settings-SNMP Retries | SNMP Retries | Maximum count to retry SNMP attempts. | count | 1 | 5 | 2 | 2 |  |
| SWNetPerfMon-Settings-SNMP Timeout | SNMP Timeout | Maximum time to wait for SNMP response. | ms | 500 | 10000 | 2500 | 2500 |  |
| SWNetPerfMon-Settings-SNMP-SocketRecyclingInterval | SNMP Socket Retention | SNMP Socket Retention. | seconds | 0 | 100000 | 30 | 30 |  |
| SWNetPerfMon-Settings-UCS API Timeout | UCS API Timeout | Maximum time to wait for UCS manager to respond. | seconds | 1 | 600 | 240 | 240 |  |
| SWNetPerfMon-Settings-VulnerabilityCheckDisabled | Disable HTML Encoding for Polled Data | Do not HTML encode polled data (less secure) | boolean | 0 | 1 | 0 | 0 |  |
| SWNetPerfMon-Settings-WMI Auto Correct Reverse DNS | WMI Auto Correct Reverse DNS Inconsistency | Whether use a hack to overcome reverse DNS inconsistency. | boolean | 0 | 1 | 0 | 0 |  |
| SWNetPerfMon-Settings-WMI Retries | WMI Retries | Maximum count to retry WMI attempts. | count | 0 | 5 | 2 | 2 |  |
| SWNetPerfMon-Settings-WMI Retries One Time Job | WMI Retries | Maximum count to retry WMI attempts. | count | 0 | 5 | 1 | 1 |  |
| SWNetPerfMon-Settings-WMI Retry Interval | WMI Retry Interval | Interval between each WMI attempt. | ms | 1000 | 15000 | 10000 | 10000 |  |
| SWNetPerfMon-Settings-WMI Retry Interval One Time Job | WMI Retry Interval | Interval between each WMI attempt. | ms | 1000 | 15000 | 10000 | 10000 |  |
| SysLog-DNSCacheTimeout | SysLog Service- DNS Cache Time | The number of minutes a DNS Host Name lookup will be cached within the service | minutes | 0 | 1440 | 60 | 60 |  |
| SysLog-EnableRfcRelay | SysLog Server - Enable RFC 3164 relay specifications | If TRUE, then the Syslog server will obey RFC 3164 sections 4.3.* by fixing all messages to conform to standard format. | boolean | 0 | 1 | 0 | 0 |  |
| SysLog-MaxMessageAge | SysLog Service - Delete Messages older than MaxMessageAge | If Message is older than threshold it will be deleted from the database to save space | Days | 1 | 5000 | 7 | 7 |  |
| SysLog-MaxRowCount | SysLog - Warn after table reaches given row count | If Syslog table reaches given count of rows, warning event is produced | rows | 0 | 0 | 1000000 | 1000000 |  |
| SysLog-MultitaskMessageProcessing | SysLog Server - Multitask Rule Processing | Allows the processing of multiple messages concurrently.  Improves scalability, however messages may not be processed exactly in the order received | boolean | 0 | 1 | 1 | 1 |  |
| SysLog-StripDateTime | SysLog Server - Remove Date and Time from SysLog messages | If TRUE, then the Date and Time will be removed from SysLog messages | boolean | 0 | 1 | 1 | 1 |  |
| SysLog-StripDomain | SysLog Server - Remove Domain Name from DNS lookups | If TRUE, then the Domain Name  will be removed from DNS lookups | boolean | 0 | 1 | 1 | 1 |  |
| SysLog-StripHostname | SysLog Server - Remove Hostname name from SysLog messages | If TRUE, then the Hostname will be removed from SysLog messages | boolean | 0 | 1 | 1 | 1 |  |
| SysLog-StripMessageType | SysLog Server - Remove Message Type from SysLog Messages | If TRUE, then the Message Type will be removed from SysLog Messages | boolean | 0 | 1 | 1 | 1 |  |
| SysLog-TCPListenPort | SysLog Service - TCP Port | The TCP Port the service will listen for new TCP Sessions | port | 0 | 65535 | 0 | 0 |  |
| SysLog-TriggerSysLogEvents | SysLog Service - Trigger SysLog Events | Trigger Syslog events. | boolean | 0 | 1 | 0 | 0 |  |
| SysLog-UDPListenPort | SysLog Service -  UDP Port | The UDP Port the service will listen for UDP Messages | port | 0 | 65535 | 514 | 514 |  |
| Topology-IgnoreUnknownPorts | Topology - Ignore Connections to Unknown Ports | Topology - Ignore connections which have unknown (unmapped) source or destination interface | boolean | 0 | 1 | 1 | 1 |  |
| Trap-MaxMessageAge | Trap Service - Delete Traps older than MaxMessageAge | If Trap is older than threshold it will be deleted from the database to save space | Days | 1 | 5000 | 7 | 7 |  |
| Traps-MaxRowCount | Traps - Warn after table reaches given row count | If Traps table reaches given count of rows, warning event is produced | rows | 0 | 0 | 1000000 | 1000000 |  |
| Trap-TriggerTrapEvents | Trap Service - Trigger Trap Events | Trigger Trap events. | boolean | 0 | 1 | 0 | 0 |  |
| TrapVarbinds-MaxRowCount | TrapVarbinds - Warn after table reaches given row count | If TrapVarbinds table reaches given count of rows, warning event is produced | rows | 0 | 0 | 5000000 | 5000000 |  |
| VMware-RediscoverAll | Rediscover all VMware ESX servers after BL starts | If TRUE, then rediscover all VMware ESX after BL starts | boolean | 0 | 1 | 1 | 1 |  |
| Web-AlertMaxMsgPerPage | Maximum number of alerts to show on page | Maximum number of alerts to show on page |  | 0 | 5000 | 250 | 250 |  |
| Web-ChartAspectRatio | Chart Aspect Ratio | The Chart Aspect ratio is the Height/Width ratio of the Charts. A ratio of 1 will make the Charts the same height as width. A ratio of .5 will make … |  | 0.10000000149011612 | 5 | 0.6200000047683716 | 0.6200000047683716 |  |
| Web-ChartCacheTimeout | Chart Cache Timeout | Cache timeout for Web Charts. | minutes | 1 | 30 | 4 | 4 |  |
| Web-ChartFontSize | Font Size on Charts | Size of the Text on Charts. Large=0, Medium=1, Small=2 |  | 0 | 2 | 1 | 1 |  |
| Web-ChartPercentile | Chart Percentile | Setting this value will add Percentile Annotation lines to Traffic, CPU Load, Memory, and Response Time charts. Set this value to 95 to display 95th … | % | 0 | 99 | 95 | 95 |  |
| Web-DisplayProductBlogOnAdmin | Display Product Blog on Admin Page | If TRUE, then the Product Blog will be displayed on Admin Page | boolean | 0 | 1 | 0 | 0 |  |
| Web-Gauge-MaxReponseTime | Response Time Gauges Maximum | Maximum value for Response Time Gauges | ms | 100 | 5000 | 2500 | 2500 |  |
| Web-MapCacheTimeout | Map Cache Timeout | Cache timeout for Network Maps and Gauges | seconds | 1 | 600 | 36 | 36 |  |
| Web-MaxEvents | Maximum Events | The Maximum number of Events to display on a web view. | Events | 100 | 10000 | 250 | 250 |  |
| Web-MaximalNumberOfSeriesInChart | Maximal Number Of SeriesInChart | Limited number of series displayed. | series | 0 | 1000 | 10 | 10 |  |
| Web-OrionMessagesMaxMsgPerPage | Maximum number of orion messages to show on page | Maximum number of Orion messages to show on page |  | 0 | 5000 | 250 | 250 |  |
| Web-ReportCacheTimeout | Report Cache Timeout | Cache timeout for Web Reports. | seconds | 1 | 600 | 126 | 126 |  |
| Web-ShowDataPointsOnLines | Show data points on lines | On line charts, add a dot for every data point on the line. | boolean | 0 | 1 | 1 | 1 |  |
| Web-SyslogMaxMsgPerPage | Maximum number of syslogs to show on page | Maximum number of syslogs to show on page |  | 0 | 5000 | 250 | 250 |  |
| Web-ThumbnailAspectRatio | Thumbnail Aspect Ratio | The Thumbnail Aspect ratio is the Height/Width ratio of the Chart Thumbnails. A ratio of 1 will make the Thumbnails the same height as width. A rati… |  | 0.10000000149011612 | 5 | 0.6000000238418579 | 0.6000000238418579 |  |
| Web-TrapMaxMsgPerPage | Maximum number of traps to show on page | Maximum number of traps to show on page |  | 0 | 5000 | 250 | 250 |  |
