# Lookup: `dbo.LimitationTableRelation`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 51 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| Module | Table | TableColumn | ParentTable | ParentTableColumn | NoNulls | AlwaysInject | IsEntityModel |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Core | dbo.Volumes | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.ActiveAlerts | NodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoipCCMSipTrunkDestinations | SipTrunkId | dbo.VoipCCMSipTrunks | SipTrunkId | true | false |  |
| Core | dbo.SysLog | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.Traps | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodeWebCommunityStrings | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodeWebUri | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodeVlans | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.CiscoBuffers | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.CPULoad | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.CPUMultiLoad | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.ResponseTime | NodeID | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodesCpuLoadThreshold | InstanceId | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodesPercentLossThreshold | InstanceId | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodesPercentMemoryUsedThreshold | InstanceId | dbo.NodesData | NodeID | true | false |  |
| Core | dbo.NodesResponseTimeThreshold | InstanceId | dbo.NodesData | NodeID | true | false |  |
| VIM | dbo.VIM_HostNodes | NodeID | dbo.NodesData | NodeID | false | false |  |
| VIM | dbo.VIM_VirtualMachineNodes | NodeID | dbo.NodesData | NodeID | false | false |  |
| VIM | dbo.VIM_VCenterNodes | NodeID | dbo.NodesData | NodeID | true | false |  |
| NPM | dbo.Interfaces | NodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoipSites | NodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoIPOperationInstances | SourceNodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoIPOperationInstances | TargetNodeID | dbo.NodesData | NodeID | false | false |  |
| VoIP | dbo.VoIPOperations | SourceNodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoIPOperations | TargetNodeID | dbo.NodesData | NodeID | false | false |  |
| VoIP | dbo.VoIPOperationCurrentStats | SourceNodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoipOperationResults | SourceNodeID | dbo.NodesData | NodeID | true | false |  |
| VoIP | dbo.VoipOperationResults | TargetNodeID | dbo.NodesData | NodeID | false | false |  |
| APM | dbo.APM_Application | NodeID | dbo.NodesData | NodeID | true | false |  |
| APM | dbo.APM_Component | ApplicationID | dbo.APM_Application | ID | true | false |  |
| APM | dbo.APM_GenericApplications | ID | dbo.APM_Application | ID | true | false |  |
| APM | dbo.APM_SqlBbApplications | ID | dbo.APM_Application | ID | true | false |  |
| APM | dbo.APM_ExBbMailboxServers | ID | dbo.APM_Application | ID | true | false |  |
| APM | dbo.APM_WstmBbApplications | ID | dbo.APM_Application | ID | true | false |  |
| Core | dbo.AlertConfigurations | Category | dbo.Accounts | AlertCategory | true | false | false |
| Core | dbo.AlertConfigurations | AlertID | dbo.AlertConfigurationsCustomProperties | AlertID | true | false | false |
| Core | Orion.AlertObjects | AlertID | dbo.AlertConfigurations | AlertID | true | false | false |
| Core | dbo.AlertActive | AlertObjectID | Orion.AlertObjects | AlertObjectID | true | false | false |
| Core | Orion.Container | ContainerID | Orion.ContainerMembers | ContainerID | true | false | true |
| Core | Orion.Container | ContainerID | dbo.ContainerCustomProperties | ContainerID | true | false | false |
| Core | Orion.AlertConfigurations | Category | Orion.Accounts | AlertCategory | true | false | true |
| Core | Orion.AlertConfigurations | AlertID | Orion.AlertConfigurationsCustomProperties | AlertID | true | false | true |
| Core | Orion.AlertObjects | AlertID | Orion.AlertConfigurations | AlertID | true | false | true |
| Core | Orion.AlertActive | AlertObjectID | Orion.AlertObjects | AlertObjectID | true | false | true |
| Core | dbo.NodesData | NodeID | dbo.NodesCustomProperties | NodeID | true | false | false |
| Core | dbo.Nodes | NodeID | dbo.NodesCustomProperties | NodeID | true | false | false |
| Core | dbo.NodesForecastCapacity | InstanceId | dbo.NodesData | NodeID | true | false | false |
| Core | dbo.VolumesForecastCapacity | InstanceId | dbo.Volumes | VolumeID | true | false | false |
| Core | Orion.Nodes | InstanceSiteID | Orion.Sites | SiteID | true | false | true |
| VoIP | dbo.VoipCCMSipTrunks | VoipCCMMonitoringId | dbo.VoipCCMMonitoring | ID | true | false |  |
| VoIP | dbo.VoipCCMMonitoring | NodeID | dbo.NodesData | NodeID | true | false |  |
