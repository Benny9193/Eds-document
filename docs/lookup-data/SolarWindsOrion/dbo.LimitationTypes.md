# Lookup: `dbo.LimitationTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Rows:** 26 &nbsp;|&nbsp; **Generated:** 2026-05-04

[← back to index](../README.md)

| LimitationTypeID | LimitationTypeName | LimitationTypeTable | LimitationTypeField | Method | System | Advanced | Description | IsSwisLimitation | IsGroupOfEntity | EntityType |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Single Network Node | NodesData | NodeID | Selection | Y | N | Limit the Account to a Single Network Node | false | false | Orion.Nodes |
| 2 | Group of Nodes | NodesData | NodeID | Checkbox | Y | N | Limit the Account to a group of selected Nodes | false | true | Orion.Nodes |
| 3 | Node Name Pattern | NodesData | Caption | Pattern | Y | Y | Limit the Account to a group of Nodes with similar Node Names. The Node Name is the Name you assigned the Node within Web Node Management. This is usu… | false | false | Orion.Nodes |
| 4 | System Name Pattern | NodesData | SysName | Pattern | Y | Y | Limit the Account to a group of Nodes with similar System Names | false | false | Orion.Nodes |
| 5 | Group of Machine Types | NodesData | MachineType | Checkbox | Y | N | Limit the Account to specific Types of Devices | false | false | Orion.Nodes |
| 6 | Machine Type Pattern | NodesData | MachineType | Pattern | Y | Y | Limit the Account to specific types of devices based on a Device Type pattern | false | false | Orion.Nodes |
| 7 | Hardware Manufacturer | NodesData | Vendor | Checkbox | Y | N | Limit the Account to specific Hardware Manufacturers | false | false | Orion.Nodes |
| 8 | Device Status | NodesData | Status | Checkbox | Y | N | Limit the Account based on the Node's Status ( Up, Down, Warning ) | false | false | Orion.Nodes |
| 9 | System Location | NodesData | Location | Checkbox | Y | N | Limit the Account to a specific list of device Locations. The Node's System Location is discovered and used. | false | false | Orion.Nodes |
| 10 | System Location Pattern | NodesData | Location | Pattern | Y | Y | Limit the Account based on a Location pattern. The Node's System Location is discovered and used. | false | false | Orion.Nodes |
| 11 | System Contact | NodesData | Contact | Checkbox | Y | N | Limit the Account to a specific list of device Contacts. Each Node's System Contact is discovered and used. | false | false | Orion.Nodes |
| 12 | System Contact Pattern | NodesData | Contact | Pattern | Y | Y | Limit the Account based on a Contact pattern. Each Node's System Contact is discovered and used. | false | false | Orion.Nodes |
| 13 | Single Machine Type | NodesData | MachineType | Selection | Y | N | Limit the Account to a single Machine Type | false | false | Orion.Nodes |
| 14 | Single Hardware Manufacturer | NodesData | Vendor | Selection | Y | N | Limit the Account to a single Hardware Manufacturer | false | false | Orion.Nodes |
| 15 | IP Address Pattern | NodesData | IP_Address | Pattern | Y | Y | Limit the Account to Nodes within a specific Subnet or Network | false | false | Orion.Nodes |
| 16 | Node Category | NodesData | EffectiveCategory | Checkbox | Y | N | Limit nodes by category (Network device, Server, Other) | false | false | Orion.Nodes |
| 17 | Group of Volumes | Volumes | VolumeID | CheckBox | Y | N | Limit the Account to a selected Group of Volumes | false | true | Orion.Volumes |
| 18 | Single Group | Orion.Groups | ContainerID | Selection | Y | N | Limit the Account to a Single Group | true | false | Orion.Groups |
| 19 | Group of Groups | Orion.Groups | ContainerID | CheckBox | Y | N | Limit the Account to a group of selected Groups | true | false | Orion.Groups |
| 20 | Group Name Pattern | Orion.Groups | Name | Pattern | Y | Y | Limit the Account to a group of Groups with similar Group Names | true | false | Orion.Groups |
| 21 | Single Report | ReportDefinitions | ReportID | Selection | Y | N | Limit the Account to a single Report | false | false | Orion.Report |
| 22 | Group of Reports | ReportDefinitions | ReportID | Checkbox | Y | N | Limit the Account to a group of selected Reports | false | true | Orion.Report |
| 23 | Single Report Category | ReportDefinitions | Category | Selection | Y | N | Limit the Account to a single Report Category | false | false | Orion.Report |
| 24 | Group of Report Categories | ReportDefinitions | Category | Checkbox | Y | N | Limit the Account to a group of selected Report Categories | false | false | Orion.Report |
| 25 | Group of IpSla Operations | Orion.Iplsa.Operations | OperationInstanceID | CheckBox | Y | N | Limit the Account to a group of IpSla Operations | true | true | Orion.Ipsla.Operations |
| 26 | Group of CCM SIP Trunks | Orion.IpSla.CCMSipTrunk | SipTrunkId | CheckBox | Y | N | Limit the Account to a group of CCM SIP Trunks | true | true | Orion.IpSla.CCMSipTrunk |
