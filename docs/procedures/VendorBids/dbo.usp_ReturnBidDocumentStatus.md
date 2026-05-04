# Procedure: `dbo.usp_ReturnBidDocumentStatus`

_Generated on 2026-05-04T13:08:01.436Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_ReturnBidDocumentStatus` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2017-07-20 15:09:36 |
| Modified | 2022-03-16 16:36:02 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@xmlSrc` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DocumentUploads` | USER_TABLE |  |
| `Registrations` | USER_TABLE |  |
| `RegUsers` | USER_TABLE |  |
| `dbo.BidderCheckList` | unresolved | `eds` |
| `dbo.vw_DMSVendorBidDocuments` | unresolved | `EDS` |
| `dbo.vw_DMSVendorDocuments` | unresolved | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[usp_ReturnBidDocumentStatus] @xmlSrc varchar(max)
as
begin
declare @hDoc int,
		@UserCode varchar(255),
		@Password varchar(50),
		@VendorCode varchar(50),
		@BidId int,
		@RetXML varchar(max)

-- Prepare for XML Processing
exec sp_xml_preparedocument @hDoc output, @xmlSrc

-- Get Bid Info
select @BidId = BidId
   from OPENXML(@hDoc, '/BidDocumentQuery',2) with (BidId int '@BidId')

-- Get User Info
select @VendorCode = Registrations.code
  from OPENXML(@hDoc, '/BidDocumentQuery/VendorLogin') with ([UserCode] varchar(50) 'UserCode',
                                                             [Password] varchar(50) 'Password') vl
  join RegUsers on RegUsers.email = vl.UserCode
               and RegUsers.password = vl.Password
			   and RegUsers.Active = 1
  join Registrations on Registrations.registrationid = RegUsers.registrationid

select BidDocumentDetail.BidderCheckListId BidderCheckListId, 
       BidDocumentDetail.DocumentTypeId DocumentTypeId, 
       BidderCheckList.DocumentName DocumentName, 
       coalesce(convert(varchar(50),
                        case 
                          when DocumentUploads.Id is null then 
                            case 
                              when vbd.DocId is null then
                                vd.ExpirationDate
                              else
                                vbd.ExpirationDate
                            end
                          else DocumentUploads.ExpirationDate 
                        end,120),'') as ExpirationDate,
       coalesce(case 
                  when DocumentUploads.Id is null then 
                    case 
                      when vbd.DocId is null then
                        vd.DocumentNumber
                      else
                        vbd.DocumentNumber
                    end
                  else DocumentUploads.DocumentNumber 
                end,'') as DocumentNumber,
       coalesce(cast(case 
                       when DocumentUploads.Id is null then 
                         case 
                           when vbd.DocId is null then
                             vd.DocId
                           else
                             vbd.DocId
                         end
                       else DocumentUploads.Id 
                     end as varchar(64)),'') as DocumentId
  from OPENXML(@hDoc, '/BidDocumentQuery/BidDocumentDetail') 
  with (BidderCheckListId int 'BidderCheckListId',
		DocumentTypeId int 'DocumentTypeId') BidDocumentDetail
  left outer join eds.dbo.BidderCheckList BidderCheckList on BidderCheckList.DocumentTypeId = BidDocumentDetail.DocumentTypeId
										                 and BidderCheckList.BidderCheckListId = BidDocumentDetail.BidderCheckListId
  left outer join EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd.BidHeaderId = @BidId
													  and vbd.DocType = BidderCheckList.DocumentName
													  and vbd.VendorCode = @VendorCode
  left outer join EDS.dbo.vw_DMSVendorDocuments vd on vd.DocType = BidderCheckList.DocumentName
												  and vd.VendorCode = @VendorCode
  left outer join DocumentUploads on DocumentUploads.BidderCheckListId = BidDocumentDetail.BidderCheckListId
								 and DocumentUploads.DocumentTypeId = BidDocumentDetail.DocumentTypeId
								 and DocumentUploads.VendorCode = @VendorCode
								 and DocumentUploads.BidId = case when BidderCheckList.OnFileEligible = 1 then DocumentUploads.BidId else @BidId end
								 and isnull(DocumentUploads.Status,'') not in ('R','F')
								 and DocumentUploads.Id = 
	(select top 1 du.Id
	   from DocumentUploads du
	  where du.BidderCheckListId = BidDocumentDetail.BidderCheckListId
		and du.DocumentTypeId = BidDocumentDetail.DocumentTypeId
		and du.VendorCode = @VendorCode
		and du.BidId = case when BidderCheckList.OnFileEligible = 1 then du.BidId else @BidId end
		and isnull(du.Status,'') not in ('R','F')
	  order by coalesce(du.UpdatedAt, du.CreatedAt) desc)
  group by BidDocumentDetail.BidderCheckListId , 
       BidDocumentDetail.DocumentTypeId , 
       BidderCheckList.DocumentName , 
       coalesce(convert(varchar(50),
                        case 
                          when DocumentUploads.Id is null then 
                            case 
                              when vbd.DocId is null then
                                vd.ExpirationDate
                              else
                                vbd.ExpirationDate
                            end
                          else DocumentUploads.ExpirationDate 
                        end,120),''),
       coalesce(case 
                  when DocumentUploads.Id is null then 
                    case 
                      when vbd.DocId is null then
                        vd.DocumentNumber
                      else
                        vbd.DocumentNumber
                    end
                  else DocumentUploads.DocumentNumber 
                end,''),
       coalesce(cast(case 
                       when DocumentUploads.Id is null then 
                         case 
                           when vbd.DocId is null then
                             vd.DocId
                           else
                             vbd.DocId
                         end
                       else DocumentUploads.Id 
                     end as varchar(64)),'') 

-- Close up XML Processing
exec sp_xml_removedocument @hDoc

end
```
