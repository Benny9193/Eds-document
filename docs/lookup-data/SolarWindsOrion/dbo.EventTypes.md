# Lookup: `dbo.EventTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 87 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| EventType | Name | Bold | BackColor | Icon | Sort | Notify | Record | Sound | Mute | NotifyMessage | NotifySubject | OrionFeatureName |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Node Down | true | 12632319 | Red | 2 | true | true |  | false | %NODENAME down %DATE %TIME |  |  |
| 2 | Node Warning | false | 12648447 | Warn | 3 | false | false |  | false |  |  |  |
| 5 | Node Up | false | 12648384 | Green | 3 | false | true |  | false | %NODENAME up %DATE %TIME |  |  |
| 8 | Node Removed | false | 12648447 | Warn | 5 | false | true |  | true | %NODENAME deleted %DATE %TIME |  |  |
| 9 | Node Added | false | 14474460 | Add | 9 | false | true |  | true | %MESSAGE %DATE %TIME |  |  |
| 14 | Node Rebooted | false | 12648447 | Warn | 10 | false | true |  | false |  |  |  |
| 15 | Critical System Error | true | 8421631 | Critical | 1 | false | true |  | true |  |  |  |
| 20 | Monitoring Started | false | 16761024 | Start | 10 | false | true |  | true | %MESSAGE %DATE %TIME |  |  |
| 21 | Monitoring Stopped | true | 8421631 | Critical | 6 | true | true |  | true | %MESSAGE %DATE %TIME |  |  |
| 30 | Application Stopped | true | 12632319 | RedAlert | 12 | false | true |  | false |  |  |  |
| 31 | Application Restart | true | 12648447 | Green | 12 | false | true |  | false |  |  |  |
| 40 | Unmanage Node | false | 12648447 | Unmanage | 15 | false | true |  | false |  |  |  |
| 41 | Manage Node | false | 16761024 | Unmanage | 15 | false | true |  | false |  |  |  |
| 50 | Group Down | false | 12632319 | Red | 4 | false | true |  | false |  |  |  |
| 51 | Group Warning | false | 12648447 | Warn | 5 | false | true |  | false |  |  |  |
| 52 | Group Up | false | 12648384 | Green | 5 | false | true |  | false |  |  |  |
| 53 | Group Members Changed | false | 12648447 | Warn | 4 | false | true |  | false |  |  |  |
| 56 | Group Created | false | 12648384 | Green | 5 | false | true |  | false |  |  |  |
| 57 | Group Removed | false | 12632319 | Red | 5 | false | true |  | false |  |  |  |
| 58 | Group Critical | false | 9109504 | Critical | 1 | false | true |  | false |  |  |  |
| 59 | Group External | false | 8388736 | External | 4 | false | true |  | false |  |  |  |
| 60 | Group Shutdown | false | 11119017 | Shutdown | 4 | false | true |  | false |  |  |  |
| 61 | Group Testing | false | 8421504 | Testing | 4 | false | true |  | false |  |  |  |
| 62 | Group Unknown | false | 8421504 | Unknown | 4 | false | true |  | false |  |  |  |
| 63 | Group Unmanaged | false | 139 | Unmanaged | 4 | false | true |  | false |  |  |  |
| 64 | Group Unreachable | false | 0 | Unreachable | 2 | false | true |  | false |  |  |  |
| 65 | Group Unplugged | false | 11393254 | Unplugged | 4 | false | true |  | false |  |  |  |
| 66 | Group Disabled | false | 8421504 | Disabled | 4 | false | true |  | false |  |  |  |
| 67 | Group Not Running | false | 15128749 | NotRunning | 4 | false | true |  | false |  |  |  |
| 70 | Discovery profile succeeded. | false | 12648384 | Green | 4 | false | true |  | false |  |  |  |
| 71 | Discovery profile failed. | false | 12632319 | Red | 4 | false | true |  | false |  |  |  |
| 99 | Polling Method Changed | false | 12648447 | Warn | 8 | false | true |  | false |  |  |  |
| 100 | Node Changed | false | 12648447 | Warn | 8 | true | true |  | true | %MESSAGE %DATE %TIME |  |  |
| 200 | Volume Remapped | false | 12648447 | Warn | 10 | false | true |  | false | %MESSAGE %DATE %TIME |  |  |
| 201 | Volume Changed | false | 12648447 | Warn | 10 | false | true |  | false | %MESSAGE %DATE %TIME |  |  |
| 202 | Volume Added | false | 14474460 | Add | 10 | false | true |  | false | %MESSAGE %DATE %TIME |  |  |
| 203 | Volume Removed | false | 12648447 | Warn | 10 | false | true |  | true | %MESSAGE %DATE %TIME |  |  |
| 210 | Volume Disappeared | false | 12648447 | RedYield | 10 | false | true |  | false | %MESSAGE %DATE %TIME |  |  |
| 211 | Volume Reappeared | false | 12648447 | Green | 10 | false | true |  | false | %MESSAGE %DATE %TIME |  |  |
| 400 | VoIP and Network Quality Manager Service Started | false | 16761024 | Start | 10 | false | true |  | false |  |  |  |
| 401 | VoIP and Network Quality Manager Service Stopped | true | 8421631 | Critical | 6 | false | true |  | false |  |  |  |
| 402 | VoIP and Network Quality Manager Critical | false | 12632319 | Critical | 4 | true | true |  | true |  |  |  |
| 403 | VoIP and Network Quality Manager Licensing | true | 16761024 | Warn | 10 | false | true |  | false |  |  |  |
| 404 | IP SLA Error | true | 12648447 | Warn | 10 | false | true |  | false |  |  |  |
| 405 | VoIP CallManager Error | true | 12648447 | Warn | 10 | false | true |  | false |  |  |  |
| 1000 | Informational | false | 14474460 | Warn | 11 | false | true |  | true |  |  |  |
| 1001 | Warning | false | 12648447 | Warn | 7 | false | true |  | true |  |  |  |
| 1002 | Critical | true | 12632319 | Critical | 4 | true | true |  | true |  |  |  |
| 1500 | CoreBL Service Started | true | 16761024 | Start | 4 | true | true |  | true |  |  |  |
| 1501 | CoreBL Service Stopped | true | 8421631 | Critical | 4 | true | true |  | true |  |  |  |
| 1502 | CoreBL Licensing | false | 14474460 | Warn | 7 | false | true |  | true |  |  |  |
| 1503 | BL Plugin Failed To Start | true | 8421631 | Critical | 4 | true | true |  | true |  |  |  |
| 5000 | Alert Triggered | false | 12648447 | RedYield | 12 | false | true |  | false |  |  |  |
| 5001 | Alert Reset | false | 16761024 | Start | 12 | false | true |  | false |  |  |  |
| 6300 | Agent Added | false | 14013909 | Green | 5 | false | true |  | false |  |  |  |
| 6301 | Agent Removed | false | 14548991 | Red | 5 | false | true |  | false |  |  |  |
| 6302 | Agent Unavailable | false | 12632319 | Red | 5 | false | true |  | false |  |  |  |
| 6303 | Agent Available | false | 13628634 | Green | 5 | false | true |  | false |  |  |  |
| 6304 | Agent Plugin Failed to Start | false | 12632319 | Red | 5 | false | true |  | false |  |  |  |
| 6500 | HA Pool Failover | false | 12648447 | Warn | 10 | false | true |  | false |  |  |  |
| 6800 | UPS Battery needs replacing | false | 12632319 | Red | 1 | false | true |  | false |  |  | PCU |
| 6801 | UPS Battery does not need replacing | false | 12648384 | Green | 2 | false | true |  | false |  |  | PCU |
| 6802 | UPS Last Fail Cause has changed | false | 12648447 | Warn | 3 | false | true |  | false |  |  | PCU |
| 6803 | UPS Batery In Fault Condition | false | 12632319 | Red | 4 | false | true |  | false |  |  | PCU |
| 6804 | UPS Battery Low | false | 12648447 | Warn | 5 | false | true |  | false |  |  | PCU |
| 6805 | UPS Battery Normal | false | 12648384 | Green | 6 | false | true |  | false |  |  | PCU |
| 6806 | UPS Battery Unknown | false | 14474460 | Unknown | 7 | false | true |  | false |  |  | PCU |
| 6807 | UPS Unknown | false | 14474460 | Unknown | 8 | false | true |  | false |  |  | PCU |
| 6808 | UPS On Line | false | 12648384 | Green | 9 | false | true |  | false |  |  | PCU |
| 6809 | UPS On Battery | false | 12648447 | Warn | 10 | false | true |  | false |  |  | PCU |
| 6810 | UPS On Smart Boost | false | 12648447 | Warn | 11 | false | true |  | false |  |  | PCU |
| 6811 | UPS Timed Sleeping | false | 12648447 | Warn | 12 | false | true |  | false |  |  | PCU |
| 6812 | UPS Software Bypass | false | 12648447 | Warn | 13 | false | true |  | false |  |  | PCU |
| 6813 | UPS Off | false | 12632319 | Red | 14 | false | true |  | false |  |  | PCU |
| 6814 | UPS Rebooting | false | 12648447 | Warn | 15 | false | true |  | false |  |  | PCU |
| 6815 | UPS Switched Bypass | false | 12648447 | Warn | 16 | false | true |  | false |  |  | PCU |
| 6816 | UPS Hardware Failure Bypass | false | 12648447 | Warn | 17 | false | true |  | false |  |  | PCU |
| 6817 | UPS Sleeping Until Power Return | false | 12648447 | Warn | 18 | false | true |  | false |  |  | PCU |
| 6818 | UPS On Smart Trim | false | 12648447 | Warn | 19 | false | true |  | false |  |  | PCU |
| 6819 | UPS Eco Mode | false | 12648384 | Green | 20 | false | true |  | false |  |  | PCU |
| 6820 | UPS Hot Stand By | false | 12648384 | Green | 21 | false | true |  | false |  |  | PCU |
| 6821 | UPS On Battery Test | false | 14474460 | Unknown | 22 | false | true |  | false |  |  | PCU |
| 7200 | Administration Service was updated. | false | 16761024 | Start | 4 | false | true |  | false |  |  |  |
| 7201 | Administration Service will be updated. | false | 16761024 | Start | 4 | false | true |  | false |  |  |  |
| 7700 | License Restored | false | 13628634 | Green | 4 | false | true |  | false |  |  |  |
| 7701 | License Error | false | 12632319 | Red | 4 | false | true |  | false |  |  |  |
| 7702 | License Store Corrupt | false | 12632319 | Red | 4 | false | true |  | false |  |  |  |
