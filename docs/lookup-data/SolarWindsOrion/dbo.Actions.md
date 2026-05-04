# Lookup: `dbo.Actions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 96 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| ActionID | ActionTypeID | Title | Description | Enabled | SortOrder |
| --- | --- | --- | --- | --- | --- |
| 1 | WriteToNPMEventLog | NetPerfMon Event Log | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 2 | WriteToNPMEventLog | NetPerfMon Event Log | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 3 | WriteToNPMEventLog | NetPerfMon Event Log | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 4 | Email | Send an Email/Page (RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}<br/>CC: ${Default… | true | 2 |
| 5 | WriteToNPMEventLog | NetPerfMon Event Log : NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 6 | WriteToNPMEventLog | NetPerfMon Event Log : NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 7 | Email | Send an Email/Page (ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}<br/>CC: ${Default… | true | 2 |
| 8 | Email | Send an Email/Page (RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}.) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}.<br/>CC: ${Defaul… | true | 2 |
| 9 | WriteToNPMEventLog | NetPerfMon Event Log : NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 10 | WriteToNPMEventLog | NetPerfMon Event Log : NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 11 | Email | Send an Email/Page (ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}.) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}.<br/>CC: ${Defaul… | true | 2 |
| 12 | ExecuteExternalProgram | Run a PowerShell script to update the Amazon AWS Route53 zone | Execute a PowerShell script to update the Amazon AWS Route53 zone when the alert is triggered. | true | 1 |
| 13 | Email | Send an Email/Page (RESET: Packet loss for ${NodeName} is abnormally high) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: RESET: Packet loss for ${NodeName} is abnormally high CC: ${DefaultEmailCC} | true | 2 |
| 14 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName}'s packet loss has dropped from above 40% to below 5% and is currently ${Node.PercentLoss}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 15 | Email | Send an Email/Page (ALERT: High Response Time for ${NodeName}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: High Response Time for ${NodeName} CC: ${DefaultEmailCC} | true | 2 |
| 16 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName}'s packet loss has risen above 40% to ${Node.PercentLoss}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 17 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} has dropped its average response time from above 200ms to ${Node.AvgResponseTime} which falls below the 100ms … | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 18 | Email | Send an Email/Page (RESET: High Response Time for ${NodeName}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: RESET: High Response Time for ${NodeName} CC: ${DefaultEmailCC} | true | 2 |
| 19 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} has an average response time of ${Node.AvgResponseTime} which falls above the 200ms threshold. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 20 | Email | Send an Email/Page (ALERT: High Response Time for ${NodeName}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: High Response Time for ${NodeName} CC: ${DefaultEmailCC} | true | 2 |
| 21 | Email | Send an Email/Page (ALERT: IOS Image Changed on ${NodeName}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: IOS Image Changed on ${NodeName} CC: ${DefaultEmailCC} | true | 2 |
| 22 | WriteToNPMEventLog | NetPerfMon Event Log : The IOS Image Family has changed for node ${NodeName}. The new value is: ${IOSImage}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 23 | Email | Send an Email/Page (ALERT: IOS Version Changed on ${NodeName}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: IOS Version Changed on ${NodeName} CC: ${DefaultEmailCC} | true | 2 |
| 24 | WriteToNPMEventLog | NetPerfMon Event Log : The IOS Version changed for Node ${NodeName}. The new value is: ${IOSVersion}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 25 | WriteToNPMEventLog | NetPerfMon Event Log : ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 26 | WriteToNPMEventLog | NetPerfMon Event Log : ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 27 | WriteToNPMEventLog | NetPerfMon Event Log : ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 28 | WriteToNPMEventLog | NetPerfMon Event Log : ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 29 | Email | Send an Email/Page (Discovery has successfully completed) | To: ${DefaultEmailTo}<br/>From: ${DefaultEmailFrom}<br/>Subject: Discovery Complete. | true | 1 |
| 30 | Email | Send an Email/Page (Discovery has failed due to the following: "${N=SwisEntity;M=ResultDescription}") | To: ${DefaultEmailTo}<br/>From: ${DefaultEmailFrom}<br/>Subject: Discovery Failed | true | 1 |
| 31 | WriteToNPMEventLog | NetPerfMon Event Log : ${AuditEventMessage} | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 32 | Email | Send an Email/Page (ALERT: Node ${NodeName} has been deleted by ${AccountID}) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: ALERT: Node ${NodeName} has been deleted by ${AccountID}<br/>CC: ${DefaultEmailCC} | true | 2 |
| 33 | Email | Send an Email/Page (RESET: Managed Node ${NodeName} is successfully polling again.) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: RESET: Managed Node ${NodeName} is successfully polling again.<br/>CC: ${DefaultEmai… | true | 2 |
| 34 | Email | Send an Email/Page (ALERT: Managed Node ${NodeName} has not been polled in over 10 minutes) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: ALERT: Managed Node ${NodeName} has not been polled in over 10 minutes<br/>CC: ${Def… | true | 2 |
| 35 | Email | Send an Email/Page (Alert me when a managed node has not been polled during the last 5 tries) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: Alert me when a managed node has not been polled during the last 5 tries<br/>CC: ${D… | true | 2 |
| 36 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} is ${Status}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 37 | Email | Send an Email/Page (RESET: Node ${NodeName} is ${Status}.) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: RESET: Node ${NodeName} is ${Status}. CC: ${DefaultEmailCC} | true | 2 |
| 38 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} is ${Status}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 39 | Email | Send an Email/Page (ALERT: Node ${NodeName} is ${Status}) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: Node ${NodeName} is ${Status} CC: ${DefaultEmailCC} | true | 2 |
| 40 | Email | Send an Email/Page (ALERT: ${NodeName} has rebooted.) | To: ${DefaultEmailTo} From: ${DefaultEmailFrom} Subject: ALERT: ${NodeName} has rebooted. CC: ${DefaultEmailCC} | true | 2 |
| 41 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} has rebooted at ${LastBoot}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 42 | Email | Send an Email/Page (RESET: Orion Polling Engine ${ServerName} is updating again.) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: RESET: Orion Polling Engine ${ServerName} is updating again.<br/>CC: ${DefaultEmailC… | true | 2 |
| 43 | Email | Send an Email/Page (ALERT: Orion Polling Engine ${ServerName} is not updating.) | To: ${DefaultEmailTo} <br/>From: ${DefaultEmailFrom}<br/>Subject: ALERT: Orion Polling Engine ${ServerName} is not updating.<br/>CC: ${DefaultEmailCC} | true | 2 |
| 44 | Email | Send an Email/Page (Polling Limit Alert) | To: ${DefaultEmailTo}<br/>From: ${DefaultEmailFrom}<br/>Subject: Polling Limit Alert. | true | 1 |
| 45 | Email | Send an Email/Page (Number of available licenses is low.) | To: ${DefaultEmailTo}<br/>From: ${DefaultEmailFrom}<br/>Subject: Number of available licenses is low. | true | 1 |
| 46 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s PacketLoss value is under the warning level of 2.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 47 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s PacketLoss value is over the maximum value of 5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 48 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Failed Call Percentage is under the warning level of 15% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 49 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Failed Call Percentage is over the maximum value of 25% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 50 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Jitter value is under the warning level of 30 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 51 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Jitter value is over the threshold value of 50 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 52 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Latency value is under the warning level of 100 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 53 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s Latency value is over the threshold value of 150 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 54 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s MOS value is above the warning level of 3.75 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 55 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager ${N=SwisEntity;M=Caption}'s MOS value is under the minimum value of 3.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 56 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Failed call Percentage is under the warning level of 15% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 57 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Failed call Percentage is over the maximum value of 25% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 58 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Jitter value is under the warning level of 30 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 59 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Jitter value is over the threshold value of 50 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 60 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Latency value is under the warning level of 100 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 61 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s Latency value is over the threshold value of 150 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 62 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s MOS value is above the warning level of 3.75 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 63 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s MOS value is under the minimum value of 3.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 64 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s PacketLoss value is under the warning level of 2.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 65 | WriteToNPMEventLog | NetPerfMon Event Log : Phone ${N=SwisEntity;M=Name}'s PacketLoss value is over the maximum value of 5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 66 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Failed call percentage is under the warning level of 15% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 67 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Failed call percentage is over the maximum value of 25% | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 68 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Jitter value is under the warning level of 30 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 69 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Jitter value is over the threshold value of 50 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 70 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Latency value is under the warning level of 100 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 71 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s Latency value is over the threshold value of 150 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 72 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s MOS value is above the warning level of 3.75 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 73 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s MOS value is under the minimum value of 3.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 74 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s PacketLoss value is under the warning level of 2.5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 75 | WriteToNPMEventLog | NetPerfMon Event Log : Region ${N=SwisEntity;M=RegionName}'s PacketLoss value is over the maximum value of 5 | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 76 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} is ${N=SwisEntity;M=Node.Status}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 77 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 78 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 79 | WriteToNPMEventLog | NetPerfMon Event Log : Node ${NodeName} is ${N=SwisEntity;M=Node.Status}. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 80 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of rejected gateways of ${N=SwisEntity;M=CurrentStats.RejectedGatewaysPercentage}… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 81 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 82 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of rejected gateways of ${N=SwisEntity;M=CurrentStats.RejectedGatewaysPercentage}… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 83 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 84 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of rejected phones of ${N=SwisEntity;M=CurrentStats.RejectedPhonesPercentage}% wh… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 85 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 86 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 87 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of rejected phones of ${N=SwisEntity;M=CurrentStats.RejectedPhonesPercentage}% wh… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 88 | WriteToNPMEventLog | NetPerfMon Event Log : SIP Trunk ${N=SwisEntity;M=Name} on CallManager node ${N=SwisEntity;M=CCMMonitoring.Caption} is in Unknown state. | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 89 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 90 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactiveGatewaysPercentag… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 91 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 92 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of unregistered gateways of ${N=SwisEntity;M=CurrentStats.InactiveGatewaysPercent… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 93 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactivePhonesPercentage}… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 94 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
| 95 | WriteToNPMEventLog | NetPerfMon Event Log : CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactivePhonesPercentage}… | Log the Alert in the Network Performance Monitor Event Log | true | 1 |
| 96 | Email | Send an Email/Page () | To: nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25  From: nobody@nobody.com | true | 2 |
