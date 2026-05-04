# Lookup: `dbo.ActionsProperties`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 619 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| ActionID | PropertyName | PropertyValue |
| --- | --- | --- |
| 1 | EscalationLevel | 0 |
| 1 | executionIfAknowledge | True |
| 1 | executionRepeatTimeSpan | 0 |
| 1 | Message | CPU on Node ${N=SwisEntity;M=Node.Caption} has less than 60 days of capacity left. |
| 2 | EscalationLevel | 0 |
| 2 | executionIfAknowledge | True |
| 2 | executionRepeatTimeSpan | 0 |
| 2 | Message | Memory of Node ${N=SwisEntity;M=Node.Caption} has less than 60 days of capacity left. |
| 3 | EscalationLevel | 0 |
| 3 | executionIfAknowledge | True |
| 3 | executionRepeatTimeSpan | 0 |
| 3 | Message | Volume ${N=SwisEntity;M=Volume.Caption} on Node ${N=SwisEntity;M=Volume.Node.Caption} has less than 60 days of capacity left. |
| 4 | EmailBCC |  |
| 4 | EmailCC | ${DefaultEmailCC} |
| 4 | EmailFrom | ${DefaultEmailFrom} |
| 4 | EmailMessage | RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status} Group was down for ${N=Alerting;M=DownTime} minutes. ${N=SwisEntity;M=DetailsUrl} |
| 4 | EmailTo | ${DefaultEmailTo} |
| 4 | EscalationLevel | 0 |
| 4 | executionIfAknowledge | False |
| 4 | executionRepeatTimeSpan | 0 |
| 4 | MessageContentType | 1 |
| 4 | Sender |  |
| 4 | SmtpServerID |  |
| 4 | Subject | RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status} |
| 5 | EscalationLevel | 0 |
| 5 | executionIfAknowledge | False |
| 5 | executionRepeatTimeSpan | 0 |
| 5 | Message | NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} |
| 6 | EscalationLevel | 0 |
| 6 | executionIfAknowledge | False |
| 6 | executionRepeatTimeSpan | 0 |
| 6 | Message | NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} |
| 7 | EmailBCC |  |
| 7 | EmailCC | ${DefaultEmailCC} |
| 7 | EmailFrom | ${DefaultEmailFrom} |
| 7 | EmailMessage | ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status} Group has currently been down for ${N=Alerting;M=DownTime} ${N=SwisEntity;M=Detai… |
| 7 | EmailTo | ${DefaultEmailTo} |
| 7 | EscalationLevel | 0 |
| 7 | executionIfAknowledge | False |
| 7 | executionRepeatTimeSpan | 0 |
| 7 | MessageContentType | 1 |
| 7 | Sender |  |
| 7 | SmtpServerID |  |
| 7 | Subject | ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status} |
| 8 | EmailBCC |  |
| 8 | EmailCC | ${DefaultEmailCC} |
| 8 | EmailFrom | ${DefaultEmailFrom} |
| 8 | EmailMessage | RESET: ${N=SwisEntity;M=Name} is a ${N=SwisEntity;M=Status;F=Status} state. Group was in a warning or critical state for ${N=Alerting;M=DownTime} min… |
| 8 | EmailTo | ${DefaultEmailTo} |
| 8 | EscalationLevel | 0 |
| 8 | executionIfAknowledge | False |
| 8 | executionRepeatTimeSpan | 0 |
| 8 | MessageContentType | 1 |
| 8 | Sender |  |
| 8 | SmtpServerID |  |
| 8 | Subject | RESET: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}. |
| 9 | EscalationLevel | 0 |
| 9 | executionIfAknowledge | False |
| 9 | executionRepeatTimeSpan | 0 |
| 9 | Message | NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} |
| 10 | EscalationLevel | 0 |
| 10 | executionIfAknowledge | False |
| 10 | executionRepeatTimeSpan | 0 |
| 10 | Message | NetPerMon Event Log: Group ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=StatusDescription} |
| 11 | EmailBCC |  |
| 11 | EmailCC | ${DefaultEmailCC} |
| 11 | EmailFrom | ${DefaultEmailFrom} |
| 11 | EmailMessage | ALERT: ${N=SwisEntity;M=Name} is a ${N=SwisEntity;M=Status;F=Status} state. Group has been in a Warning, Critical or Down state for ${N=Alerting;M=Do… |
| 11 | EmailTo | ${DefaultEmailTo} |
| 11 | EscalationLevel | 0 |
| 11 | executionIfAknowledge | False |
| 11 | executionRepeatTimeSpan | 0 |
| 11 | MessageContentType | 1 |
| 11 | Sender |  |
| 11 | SmtpServerID |  |
| 11 | Subject | ALERT: ${N=SwisEntity;M=Name} is ${N=SwisEntity;M=Status;F=Status}. |
| 12 | Credentials |  |
| 12 | EscalationLevel | 0 |
| 12 | executionIfAknowledge | True |
| 12 | executionRepeatTimeSpan | 0 |
| 12 | ProgramPath | powershell.exe -Command "&((Get-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\SolarWinds\Orion\Core).InstallPath + '/HighAvaila… |
| 13 | EmailBCC |  |
| 13 | EmailCC | ${DefaultEmailCC} |
| 13 | EmailFrom | ${DefaultEmailFrom} |
| 13 | EmailMessage | RESET: Packet loss for ${NodeName} is below ${Reset} ${NodeDetailsURL} |
| 13 | EmailTo | ${DefaultEmailTo} |
| 13 | EscalationLevel | 0 |
| 13 | executionIfAknowledge | False |
| 13 | executionRepeatTimeSpan | 0 |
| 13 | MessageContentType | 1 |
| 13 | Sender |  |
| 13 | SmtpServerID |  |
| 13 | Subject | RESET: Packet loss for ${NodeName} is abnormally high |
| 14 | EscalationLevel | 0 |
| 14 | executionIfAknowledge | False |
| 14 | executionRepeatTimeSpan | 0 |
| 14 | Message | Node ${NodeName}'s packet loss has dropped from above 40% to below 5% and is currently ${Node.PercentLoss}. |
| 15 | EmailBCC |  |
| 15 | EmailCC | ${DefaultEmailCC} |
| 15 | EmailFrom | ${DefaultEmailFrom} |
| 15 | EmailMessage | ALERT: Current packet loss for ${NodeName} is ${PercentLoss}.Average Response time is ${AvgResponseTime} and is varying from ${MinResponseTime} to ${M… |
| 15 | EmailTo | ${DefaultEmailTo} |
| 15 | EscalationLevel | 0 |
| 15 | executionIfAknowledge | False |
| 15 | executionRepeatTimeSpan | 0 |
| 15 | MessageContentType | 1 |
| 15 | Sender |  |
| 15 | SmtpServerID |  |
| 15 | Subject | ALERT: High Response Time for ${NodeName} |
| 16 | EscalationLevel | 0 |
| 16 | executionIfAknowledge | False |
| 16 | executionRepeatTimeSpan | 0 |
| 16 | Message | Node ${NodeName}'s packet loss has risen above 40% to ${Node.PercentLoss}. |
| 17 | EscalationLevel | 0 |
| 17 | executionIfAknowledge | False |
| 17 | executionRepeatTimeSpan | 0 |
| 17 | Message | Node ${NodeName} has dropped its average response time from above 200ms to ${Node.AvgResponseTime} which falls below the 100ms threshold. |
| 18 | EmailBCC |  |
| 18 | EmailCC | ${DefaultEmailCC} |
| 18 | EmailFrom | ${DefaultEmailFrom} |
| 18 | EmailMessage | RESET: Average Response Time of ${NodeName} is ${AvgResponseTime} and is varying from ${MinResponseTime} to ${MaxResponseTime}. ${NodeDetailsURL} |
| 18 | EmailTo | ${DefaultEmailTo} |
| 18 | EscalationLevel | 0 |
| 18 | executionIfAknowledge | False |
| 18 | executionRepeatTimeSpan | 0 |
| 18 | MessageContentType | 1 |
| 18 | Sender |  |
| 18 | SmtpServerID |  |
| 18 | Subject | RESET: High Response Time for ${NodeName} |
| 19 | EscalationLevel | 0 |
| 19 | executionIfAknowledge | False |
| 19 | executionRepeatTimeSpan | 0 |
| 19 | Message | Node ${NodeName} has an average response time of ${Node.AvgResponseTime} which falls above the 200ms threshold. |
| 20 | EmailBCC |  |
| 20 | EmailCC | ${DefaultEmailCC} |
| 20 | EmailFrom | ${DefaultEmailFrom} |
| 20 | EmailMessage | ALERT: ${NodeName} has exceptionally high response time. Average Response Time is ${AvgResponseTime} and is varying from ${MinResponseTime} to ${MaxRe… |
| 20 | EmailTo | ${DefaultEmailTo} |
| 20 | EscalationLevel | 0 |
| 20 | executionIfAknowledge | False |
| 20 | executionRepeatTimeSpan | 0 |
| 20 | MessageContentType | 1 |
| 20 | Sender |  |
| 20 | SmtpServerID |  |
| 20 | Subject | ALERT: High Response Time for ${NodeName} |
| 21 | EmailBCC |  |
| 21 | EmailCC | ${DefaultEmailCC} |
| 21 | EmailFrom | ${DefaultEmailFrom} |
| 21 | EmailMessage | ALERT: IOS Image for ${NodeName} has changed from ${N=SwisEntity;M=PREVIOUS(IOSImage)} to ${IOSImage} ${NodeDetailsURL} ${N=Alerting;M=AcknowledgeLi… |
| 21 | EmailTo | ${DefaultEmailTo} |
| 21 | EscalationLevel | 0 |
| 21 | executionIfAknowledge | False |
| 21 | executionRepeatTimeSpan | 0 |
| 21 | MessageContentType | 1 |
| 21 | Sender |  |
| 21 | SmtpServerID |  |
| 21 | Subject | ALERT: IOS Image Changed on ${NodeName} |
| 22 | EscalationLevel | 0 |
| 22 | executionIfAknowledge | False |
| 22 | executionRepeatTimeSpan | 0 |
| 22 | Message | The IOS Image Family has changed for node ${NodeName}. The new value is: ${IOSImage}. |
| 23 | EmailBCC |  |
| 23 | EmailCC | ${DefaultEmailCC} |
| 23 | EmailFrom | ${DefaultEmailFrom} |
| 23 | EmailMessage | ALERT: IOS Version for ${NodeName} has changed from ${N=SwisEntity;M=PREVIOUS(IOSVersion)} to ${IOSVersion} ${NodeDetailsURL} ${N=Alerting;M=Acknowl… |
| 23 | EmailTo | ${DefaultEmailTo} |
| 23 | EscalationLevel | 0 |
| 23 | executionIfAknowledge | False |
| 23 | executionRepeatTimeSpan | 0 |
| 23 | MessageContentType | 1 |
| 23 | Sender |  |
| 23 | SmtpServerID |  |
| 23 | Subject | ALERT: IOS Version Changed on ${NodeName} |
| 24 | EscalationLevel | 0 |
| 24 | executionIfAknowledge | False |
| 24 | executionRepeatTimeSpan | 0 |
| 24 | Message | The IOS Version changed for Node ${NodeName}. The new value is: ${IOSVersion}. |
| 25 | EscalationLevel | 0 |
| 25 | executionIfAknowledge | False |
| 25 | executionRepeatTimeSpan | 0 |
| 25 | Message | ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.Caption} is ${N=SwisEnt… |
| 26 | EscalationLevel | 0 |
| 26 | executionIfAknowledge | False |
| 26 | executionRepeatTimeSpan | 0 |
| 26 | Message | ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.Caption} is ${N=SwisEnt… |
| 27 | EscalationLevel | 0 |
| 27 | executionIfAknowledge | False |
| 27 | executionRepeatTimeSpan | 0 |
| 27 | Message | ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.Caption} is ${N=SwisEnt… |
| 28 | EscalationLevel | 0 |
| 28 | executionIfAknowledge | False |
| 28 | executionRepeatTimeSpan | 0 |
| 28 | Message | ${N=SwisEntity;M=OperationTypes.OperationType} IP SLA Operation  ${N=SwisEntity;M=OperationName} on Node ${N=SwisEntity;M=Node.Caption} is ${N=SwisEnt… |
| 29 | EmailBCC | ${DefaultEmailBCC} |
| 29 | EmailCC | ${DefaultEmailCC} |
| 29 | EmailFrom | ${DefaultEmailFrom} |
| 29 | EmailMessage | Discovery has successfully completed. The following objects have been imported and will be monitored:<br/><br/>${N=Discovery;M=DiscoveredItems} |
| 29 | EmailTo | ${DefaultEmailTo} |
| 29 | EscalationLevel | 0 |
| 29 | executionIfAknowledge | False |
| 29 | executionRepeatTimeSpan | 0 |
| 29 | MessageContentType | 0 |
| 29 | Sender |  |
| 29 | SmtpServerID |  |
| 29 | Subject | Discovery Complete. |
| 30 | EmailBCC | ${DefaultEmailBCC} |
| 30 | EmailCC | ${DefaultEmailCC} |
| 30 | EmailFrom | ${DefaultEmailFrom} |
| 30 | EmailMessage | Discovery has failed due to the following: ${N=SwisEntity;M=ResultDescription} |
| 30 | EmailTo | ${DefaultEmailTo} |
| 30 | EscalationLevel | 0 |
| 30 | executionIfAknowledge | False |
| 30 | executionRepeatTimeSpan | 0 |
| 30 | MessageContentType | 1 |
| 30 | Sender |  |
| 30 | SmtpServerID |  |
| 30 | Subject | Discovery Failed. |
| 31 | EscalationLevel | 0 |
| 31 | executionIfAknowledge | False |
| 31 | executionRepeatTimeSpan | 0 |
| 31 | Message | ${AuditEventMessage} |
| 32 | EmailBCC |  |
| 32 | EmailCC | ${DefaultEmailCC} |
| 32 | EmailFrom | ${DefaultEmailFrom} |
| 32 | EmailMessage | ALERT:  ${AuditEventMessage}  ${AuditingEventsDetailsURL} ${N=Alerting;M=AcknowledgeLink} |
| 32 | EmailTo | ${DefaultEmailTo} |
| 32 | EscalationLevel | 0 |
| 32 | executionIfAknowledge | False |
| 32 | executionRepeatTimeSpan | 0 |
| 32 | MessageContentType | 1 |
| 32 | Sender |  |
| 32 | SmtpServerID |  |
| 32 | Subject | ALERT: Node ${NodeName} has been deleted by ${AccountID} |
| 33 | EmailBCC |  |
| 33 | EmailCC | ${DefaultEmailCC} |
| 33 | EmailFrom | ${DefaultEmailFrom} |
| 33 | EmailMessage | RESET: Node ${NodeName} is being successfully polled. Time of last successful poll was at ${LastSync}. ${NodeDetailsURL} |
| 33 | EmailTo | ${DefaultEmailTo} |
| 33 | EscalationLevel | 0 |
| 33 | executionIfAknowledge | False |
| 33 | executionRepeatTimeSpan | 0 |
| 33 | MessageContentType | 1 |
| 33 | Sender |  |
| 33 | SmtpServerID |  |
| 33 | Subject | RESET: Managed Node ${NodeName} is successfully polling again. |
| 34 | EmailBCC |  |
| 34 | EmailCC | ${DefaultEmailCC} |
| 34 | EmailFrom | ${DefaultEmailFrom} |
| 34 | EmailMessage | ALERT: Node ${NodeName} has not been polled in over 10 minutes.  Time of last successful poll was at ${LastSync}.   ${NodeDetailsURL} ${N=Alerting;M… |
| 34 | EmailTo | ${DefaultEmailTo} |
| 34 | EscalationLevel | 0 |
| 34 | executionIfAknowledge | False |
| 34 | executionRepeatTimeSpan | 0 |
| 34 | MessageContentType | 1 |
| 34 | Sender |  |
| 34 | SmtpServerID |  |
| 34 | Subject | ALERT: Managed Node ${NodeName} has not been polled in over 10 minutes |
| 35 | EmailBCC |  |
| 35 | EmailCC | ${DefaultEmailCC} |
| 35 | EmailFrom | ${DefaultEmailFrom} |
| 35 | EmailMessage | The last 5 polling attempts on node ${NodeName} have been unsuccessful. |
| 35 | EmailTo | ${DefaultEmailTo} |
| 35 | EscalationLevel | 0 |
| 35 | executionIfAknowledge | False |
| 35 | executionRepeatTimeSpan | 0 |
| 35 | MessageContentType | 1 |
| 35 | Sender |  |
| 35 | SmtpServerID |  |
| 35 | Subject | Alert me when a managed node has not been polled during the last 5 tries |
| 36 | EscalationLevel | 0 |
| 36 | executionIfAknowledge | False |
| 36 | executionRepeatTimeSpan | 0 |
| 36 | Message | Node ${NodeName} is ${Status}. |
| 37 | EmailBCC |  |
| 37 | EmailCC | ${DefaultEmailCC} |
| 37 | EmailFrom | ${DefaultEmailFrom} |
| 37 | EmailMessage | RESET: Node ${NodeName} is ${Status}. Node was down for ${N=Alerting;M=DownTime} minutes. ${NodeDetailsURL} |
| 37 | EmailTo | ${DefaultEmailTo} |
| 37 | EscalationLevel | 0 |
| 37 | executionIfAknowledge | False |
| 37 | executionRepeatTimeSpan | 0 |
| 37 | MessageContentType | 1 |
| 37 | Sender |  |
| 37 | SmtpServerID |  |
| 37 | Subject | RESET: Node ${NodeName} is ${Status}. |
| 38 | EscalationLevel | 0 |
| 38 | executionIfAknowledge | False |
| 38 | executionRepeatTimeSpan | 0 |
| 38 | Message | Node ${NodeName} is ${Status}. |
| 39 | EmailBCC |  |
| 39 | EmailCC | ${DefaultEmailCC} |
| 39 | EmailFrom | ${DefaultEmailFrom} |
| 39 | EmailMessage | ALERT: Node ${NodeName} is ${Status}. ${NodeDetailsURL} ${N=Alerting;M=AcknowledgeLink} |
| 39 | EmailTo | ${DefaultEmailTo} |
| 39 | EscalationLevel | 0 |
| 39 | executionIfAknowledge | False |
| 39 | executionRepeatTimeSpan | 0 |
| 39 | MessageContentType | 1 |
| 39 | Sender |  |
| 39 | SmtpServerID |  |
| 39 | Subject | ALERT: Node ${NodeName} is ${Status} |
| 40 | EmailBCC |  |
| 40 | EmailCC | ${DefaultEmailCC} |
| 40 | EmailFrom | ${DefaultEmailFrom} |
| 40 | EmailMessage | ALERT: ${NodeName} rebooted at ${LastBoot} ${NodeDetailsURL} ${N=Alerting;M=AcknowledgeLink} |
| 40 | EmailTo | ${DefaultEmailTo} |
| 40 | EscalationLevel | 0 |
| 40 | executionIfAknowledge | False |
| 40 | executionRepeatTimeSpan | 0 |
| 40 | MessageContentType | 1 |
| 40 | Sender |  |
| 40 | SmtpServerID |  |
| 40 | Subject | ALERT: ${NodeName} has rebooted. |
| 41 | EscalationLevel | 0 |
| 41 | executionIfAknowledge | False |
| 41 | executionRepeatTimeSpan | 0 |
| 41 | Message | Node ${NodeName} has rebooted at ${LastBoot}. |
| 42 | EmailBCC |  |
| 42 | EmailCC | ${DefaultEmailCC} |
| 42 | EmailFrom | ${DefaultEmailFrom} |
| 42 | EmailMessage | RESET: Orion Polling Engine ${ServerName} at ${IP} was last updated ${KeepAlive} minutes ago. ${PollingEnginesDetailsURL} |
| 42 | EmailTo | ${DefaultEmailTo} |
| 42 | EscalationLevel | 0 |
| 42 | executionIfAknowledge | False |
| 42 | executionRepeatTimeSpan | 0 |
| 42 | MessageContentType | 1 |
| 42 | Sender |  |
| 42 | SmtpServerID |  |
| 42 | Subject | RESET: Orion Polling Engine ${ServerName} is updating again. |
| 43 | EmailBCC |  |
| 43 | EmailCC | ${DefaultEmailCC} |
| 43 | EmailFrom | ${DefaultEmailFrom} |
| 43 | EmailMessage | ALERT: Orion Polling Engine ${ServerName} at ${IP} has not updated in ${KeepAlive} minutes. ${PollingEnginesDetailsURL} ${N=Alerting;M=AcknowledgeLi… |
| 43 | EmailTo | ${DefaultEmailTo} |
| 43 | EscalationLevel | 0 |
| 43 | executionIfAknowledge | False |
| 43 | executionRepeatTimeSpan | 0 |
| 43 | MessageContentType | 1 |
| 43 | Sender |  |
| 43 | SmtpServerID |  |
| 43 | Subject | ALERT: Orion Polling Engine ${ServerName} is not updating. |
| 44 | EmailBCC | ${DefaultEmailBCC} |
| 44 | EmailCC | ${DefaultEmailCC} |
| 44 | EmailFrom | ${DefaultEmailFrom} |
| 44 | EmailMessage | The polling rate limit has reached its maximum rate. Review the following pollers and their current workloads: <<<&nbsp;&nbsp;&nbsp;• <b>${N=SwisEnti… |
| 44 | EmailTo | ${DefaultEmailTo} |
| 44 | EscalationLevel | 0 |
| 44 | executionIfAknowledge | True |
| 44 | executionRepeatTimeSpan | 0 |
| 44 | MessageContentType | 0 |
| 44 | Sender |  |
| 44 | SmtpServerID |  |
| 44 | Subject | Polling Limit Alert |
| 45 | EmailBCC | ${DefaultEmailBCC} |
| 45 | EmailCC | ${DefaultEmailCC} |
| 45 | EmailFrom | ${DefaultEmailFrom} |
| 45 | EmailMessage | The number of available licenses for ${N=SwisEntity;M=ElementType} is low. Maximum licenses allowed for ${N=SwisEntity;M=ElementType}: ${N=SwisEntity… |
| 45 | EmailTo | ${DefaultEmailTo} |
| 45 | EscalationLevel | 0 |
| 45 | executionIfAknowledge | True |
| 45 | executionRepeatTimeSpan | 0 |
| 45 | MessageContentType | 0 |
| 45 | Sender |  |
| 45 | SmtpServerID |  |
| 45 | Subject | Number of available licenses is low. |
| 46 | EscalationLevel | 0 |
| 46 | executionIfAknowledge | False |
| 46 | executionRepeatTimeSpan | 0 |
| 46 | Message | CallManager ${N=SwisEntity;M=Caption}'s PacketLoss value is under the warning level of 2.5 |
| 47 | EscalationLevel | 0 |
| 47 | executionIfAknowledge | False |
| 47 | executionRepeatTimeSpan | 0 |
| 47 | Message | CallManager ${N=SwisEntity;M=Caption}'s PacketLoss value is over the maximum value of 5 |
| 48 | EscalationLevel | 0 |
| 48 | executionIfAknowledge | False |
| 48 | executionRepeatTimeSpan | 0 |
| 48 | Message | CallManager ${N=SwisEntity;M=Caption}'s Failed Call Percentage is under the warning level of 15% |
| 49 | EscalationLevel | 0 |
| 49 | executionIfAknowledge | False |
| 49 | executionRepeatTimeSpan | 0 |
| 49 | Message | CallManager ${N=SwisEntity;M=Caption}'s Failed Call Percentage is over the maximum value of 25% |
| 50 | EscalationLevel | 0 |
| 50 | executionIfAknowledge | False |
| 50 | executionRepeatTimeSpan | 0 |
| 50 | Message | CallManager ${N=SwisEntity;M=Caption}'s Jitter value is under the warning level of 30 |
| 51 | EscalationLevel | 0 |
| 51 | executionIfAknowledge | False |
| 51 | executionRepeatTimeSpan | 0 |
| 51 | Message | CallManager ${N=SwisEntity;M=Caption}'s Jitter value is over the threshold value of 50 |
| 52 | EscalationLevel | 0 |
| 52 | executionIfAknowledge | False |
| 52 | executionRepeatTimeSpan | 0 |
| 52 | Message | CallManager ${N=SwisEntity;M=Caption}'s Latency value is under the warning level of 100 |
| 53 | EscalationLevel | 0 |
| 53 | executionIfAknowledge | False |
| 53 | executionRepeatTimeSpan | 0 |
| 53 | Message | CallManager ${N=SwisEntity;M=Caption}'s Latency value is over the threshold value of 150 |
| 54 | EscalationLevel | 0 |
| 54 | executionIfAknowledge | False |
| 54 | executionRepeatTimeSpan | 0 |
| 54 | Message | CallManager ${N=SwisEntity;M=Caption}'s MOS value is above the warning level of 3.75 |
| 55 | EscalationLevel | 0 |
| 55 | executionIfAknowledge | False |
| 55 | executionRepeatTimeSpan | 0 |
| 55 | Message | CallManager ${N=SwisEntity;M=Caption}'s MOS value is under the minimum value of 3.5 |
| 56 | EscalationLevel | 0 |
| 56 | executionIfAknowledge | False |
| 56 | executionRepeatTimeSpan | 0 |
| 56 | Message | Phone ${N=SwisEntity;M=Name}'s Failed call Percentage is under the warning level of 15% |
| 57 | EscalationLevel | 0 |
| 57 | executionIfAknowledge | False |
| 57 | executionRepeatTimeSpan | 0 |
| 57 | Message | Phone ${N=SwisEntity;M=Name}'s Failed call Percentage is over the maximum value of 25% |
| 58 | EscalationLevel | 0 |
| 58 | executionIfAknowledge | False |
| 58 | executionRepeatTimeSpan | 0 |
| 58 | Message | Phone ${N=SwisEntity;M=Name}'s Jitter value is under the warning level of 30 |
| 59 | EscalationLevel | 0 |
| 59 | executionIfAknowledge | False |
| 59 | executionRepeatTimeSpan | 0 |
| 59 | Message | Phone ${N=SwisEntity;M=Name}'s Jitter value is over the threshold value of 50 |
| 60 | EscalationLevel | 0 |
| 60 | executionIfAknowledge | False |
| 60 | executionRepeatTimeSpan | 0 |
| 60 | Message | Phone ${N=SwisEntity;M=Name}'s Latency value is under the warning level of 100 |
| 61 | EscalationLevel | 0 |
| 61 | executionIfAknowledge | False |
| 61 | executionRepeatTimeSpan | 0 |
| 61 | Message | Phone ${N=SwisEntity;M=Name}'s Latency value is over the threshold value of 150 |
| 62 | EscalationLevel | 0 |
| 62 | executionIfAknowledge | False |
| 62 | executionRepeatTimeSpan | 0 |
| 62 | Message | Phone ${N=SwisEntity;M=Name}'s MOS value is above the warning level of 3.75 |
| 63 | EscalationLevel | 0 |
| 63 | executionIfAknowledge | False |
| 63 | executionRepeatTimeSpan | 0 |
| 63 | Message | Phone ${N=SwisEntity;M=Name}'s MOS value is under the minimum value of 3.5 |
| 64 | EscalationLevel | 0 |
| 64 | executionIfAknowledge | False |
| 64 | executionRepeatTimeSpan | 0 |
| 64 | Message | Phone ${N=SwisEntity;M=Name}'s PacketLoss value is under the warning level of 2.5 |
| 65 | EscalationLevel | 0 |
| 65 | executionIfAknowledge | False |
| 65 | executionRepeatTimeSpan | 0 |
| 65 | Message | Phone ${N=SwisEntity;M=Name}'s PacketLoss value is over the maximum value of 5 |
| 66 | EscalationLevel | 0 |
| 66 | executionIfAknowledge | False |
| 66 | executionRepeatTimeSpan | 0 |
| 66 | Message | Region ${N=SwisEntity;M=RegionName}'s Failed call percentage is under the warning level of 15% |
| 67 | EscalationLevel | 0 |
| 67 | executionIfAknowledge | False |
| 67 | executionRepeatTimeSpan | 0 |
| 67 | Message | Region ${N=SwisEntity;M=RegionName}'s Failed call percentage is over the maximum value of 25% |
| 68 | EscalationLevel | 0 |
| 68 | executionIfAknowledge | False |
| 68 | executionRepeatTimeSpan | 0 |
| 68 | Message | Region ${N=SwisEntity;M=RegionName}'s Jitter value is under the warning level of 30 |
| 69 | EscalationLevel | 0 |
| 69 | executionIfAknowledge | False |
| 69 | executionRepeatTimeSpan | 0 |
| 69 | Message | Region ${N=SwisEntity;M=RegionName}'s Jitter value is over the threshold value of 50 |
| 70 | EscalationLevel | 0 |
| 70 | executionIfAknowledge | False |
| 70 | executionRepeatTimeSpan | 0 |
| 70 | Message | Region ${N=SwisEntity;M=RegionName}'s Latency value is under the warning level of 100 |
| 71 | EscalationLevel | 0 |
| 71 | executionIfAknowledge | False |
| 71 | executionRepeatTimeSpan | 0 |
| 71 | Message | Region ${N=SwisEntity;M=RegionName}'s Latency value is over the threshold value of 150 |
| 72 | EscalationLevel | 0 |
| 72 | executionIfAknowledge | False |
| 72 | executionRepeatTimeSpan | 0 |
| 72 | Message | Region ${N=SwisEntity;M=RegionName}'s MOS value is above the warning level of 3.75 |
| 73 | EscalationLevel | 0 |
| 73 | executionIfAknowledge | False |
| 73 | executionRepeatTimeSpan | 0 |
| 73 | Message | Region ${N=SwisEntity;M=RegionName}'s MOS value is under the minimum value of 3.5 |
| 74 | EscalationLevel | 0 |
| 74 | executionIfAknowledge | False |
| 74 | executionRepeatTimeSpan | 0 |
| 74 | Message | Region ${N=SwisEntity;M=RegionName}'s PacketLoss value is under the warning level of 2.5 |
| 75 | EscalationLevel | 0 |
| 75 | executionIfAknowledge | False |
| 75 | executionRepeatTimeSpan | 0 |
| 75 | Message | Region ${N=SwisEntity;M=RegionName}'s PacketLoss value is over the maximum value of 5 |
| 76 | EscalationLevel | 0 |
| 76 | executionIfAknowledge | False |
| 76 | executionRepeatTimeSpan | 0 |
| 76 | Message | Node ${NodeName} is ${N=SwisEntity;M=Node.Status}. |
| 77 | EmailFrom | nobody@nobody.com |
| 77 | EmailMessage |  |
| 77 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 77 | EscalationLevel | 0 |
| 77 | executionIfAknowledge | False |
| 77 | executionRepeatTimeSpan | 0 |
| 77 | MessageContentType | 1 |
| 77 | Sender | Network Performance Monitor |
| 77 | Subject |  |
| 78 | EmailFrom | nobody@nobody.com |
| 78 | EmailMessage |  |
| 78 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 78 | EscalationLevel | 0 |
| 78 | executionIfAknowledge | False |
| 78 | executionRepeatTimeSpan | 0 |
| 78 | MessageContentType | 1 |
| 78 | Sender | Network Performance Monitor |
| 78 | Subject |  |
| 79 | EscalationLevel | 0 |
| 79 | executionIfAknowledge | False |
| 79 | executionRepeatTimeSpan | 0 |
| 79 | Message | Node ${NodeName} is ${N=SwisEntity;M=Node.Status}. |
| 80 | EscalationLevel | 0 |
| 80 | executionIfAknowledge | False |
| 80 | executionRepeatTimeSpan | 0 |
| 80 | Message | CallManager node ${NodeName} has a percentage of rejected gateways of ${N=SwisEntity;M=CurrentStats.RejectedGatewaysPercentage}% which was above the t… |
| 81 | EmailFrom | nobody@nobody.com |
| 81 | EmailMessage |  |
| 81 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 81 | EscalationLevel | 0 |
| 81 | executionIfAknowledge | False |
| 81 | executionRepeatTimeSpan | 0 |
| 81 | MessageContentType | 1 |
| 81 | Sender | Network Performance Monitor |
| 81 | Subject |  |
| 82 | EscalationLevel | 0 |
| 82 | executionIfAknowledge | False |
| 82 | executionRepeatTimeSpan | 0 |
| 82 | Message | CallManager node ${NodeName} has a percentage of rejected gateways of ${N=SwisEntity;M=CurrentStats.RejectedGatewaysPercentage}% which is larger than … |
| 83 | EmailFrom | nobody@nobody.com |
| 83 | EmailMessage |  |
| 83 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 83 | EscalationLevel | 0 |
| 83 | executionIfAknowledge | False |
| 83 | executionRepeatTimeSpan | 0 |
| 83 | MessageContentType | 1 |
| 83 | Sender | Network Performance Monitor |
| 83 | Subject |  |
| 84 | EscalationLevel | 0 |
| 84 | executionIfAknowledge | False |
| 84 | executionRepeatTimeSpan | 0 |
| 84 | Message | CallManager node ${NodeName} has a percentage of rejected phones of ${N=SwisEntity;M=CurrentStats.RejectedPhonesPercentage}% which was above the thres… |
| 85 | EmailFrom | nobody@nobody.com |
| 85 | EmailMessage |  |
| 85 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 85 | EscalationLevel | 0 |
| 85 | executionIfAknowledge | False |
| 85 | executionRepeatTimeSpan | 0 |
| 85 | MessageContentType | 1 |
| 85 | Sender | Network Performance Monitor |
| 85 | Subject |  |
| 86 | EmailFrom | nobody@nobody.com |
| 86 | EmailMessage |  |
| 86 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 86 | EscalationLevel | 0 |
| 86 | executionIfAknowledge | False |
| 86 | executionRepeatTimeSpan | 0 |
| 86 | MessageContentType | 1 |
| 86 | Sender | Network Performance Monitor |
| 86 | Subject |  |
| 87 | EscalationLevel | 0 |
| 87 | executionIfAknowledge | False |
| 87 | executionRepeatTimeSpan | 0 |
| 87 | Message | CallManager node ${NodeName} has a percentage of rejected phones of ${N=SwisEntity;M=CurrentStats.RejectedPhonesPercentage}% which is larger than the … |
| 88 | EscalationLevel | 0 |
| 88 | executionIfAknowledge | True |
| 88 | executionRepeatTimeSpan | 0 |
| 88 | Message | SIP Trunk ${N=SwisEntity;M=Name} on CallManager node ${N=SwisEntity;M=CCMMonitoring.Caption} is in Unknown state. |
| 89 | EmailFrom | nobody@nobody.com |
| 89 | EmailMessage |  |
| 89 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 89 | EscalationLevel | 0 |
| 89 | executionIfAknowledge | False |
| 89 | executionRepeatTimeSpan | 0 |
| 89 | MessageContentType | 1 |
| 89 | Sender | Network Performance Monitor |
| 89 | Subject |  |
| 90 | EscalationLevel | 0 |
| 90 | executionIfAknowledge | False |
| 90 | executionRepeatTimeSpan | 0 |
| 90 | Message | CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactiveGatewaysPercentage}% which was above the… |
| 91 | EmailFrom | nobody@nobody.com |
| 91 | EmailMessage |  |
| 91 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 91 | EscalationLevel | 0 |
| 91 | executionIfAknowledge | False |
| 91 | executionRepeatTimeSpan | 0 |
| 91 | MessageContentType | 1 |
| 91 | Sender | Network Performance Monitor |
| 91 | Subject |  |
| 92 | EscalationLevel | 0 |
| 92 | executionIfAknowledge | False |
| 92 | executionRepeatTimeSpan | 0 |
| 92 | Message | CallManager node ${NodeName} has a percentage of unregistered gateways of ${N=SwisEntity;M=CurrentStats.InactiveGatewaysPercentage}% which is larger t… |
| 93 | EscalationLevel | 0 |
| 93 | executionIfAknowledge | False |
| 93 | executionRepeatTimeSpan | 0 |
| 93 | Message | CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactivePhonesPercentage}% which was above the t… |
| 94 | EmailFrom | nobody@nobody.com |
| 94 | EmailMessage |  |
| 94 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 94 | EscalationLevel | 0 |
| 94 | executionIfAknowledge | False |
| 94 | executionRepeatTimeSpan | 0 |
| 94 | MessageContentType | 1 |
| 94 | Sender | Network Performance Monitor |
| 94 | Subject |  |
| 95 | EscalationLevel | 0 |
| 95 | executionIfAknowledge | False |
| 95 | executionRepeatTimeSpan | 0 |
| 95 | Message | CallManager node ${NodeName} has a percentage of unregistered phones of ${N=SwisEntity;M=CurrentStats.InactivePhonesPercentage}% which is larger than … |
| 96 | EmailFrom | nobody@nobody.com |
| 96 | EmailMessage |  |
| 96 | EmailTo | nobody@nobody.com CC:nobody@nobody.com BCC: SMTPServer: SMTPPort:25 |
| 96 | EscalationLevel | 0 |
| 96 | executionIfAknowledge | False |
| 96 | executionRepeatTimeSpan | 0 |
| 96 | MessageContentType | 1 |
| 96 | Sender | Network Performance Monitor |
| 96 | Subject |  |
