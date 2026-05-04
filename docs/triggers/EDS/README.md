# Triggers: `EDS`

_Generated 2026-05-04 &middot; 52 trigger(s) total_

[← back to triggers index](../README.md)

## Summary

| Table | Trigger | Events | Kind | State | Categories |
|-------|---------|--------|------|-------|------------|
| `dbo.Approvals` | `trig_Approvals` | DELETE, INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.AwardsCatalogList` | `trig_AwardsCatalogListUpdate` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.BidAnswers` | `BidAnswers_trig` | INSERT | AFTER | enabled | cascade |
| `dbo.BidHeaders` | `trig_BidHeadersDateCreated` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.BidImportCatalogList` | `trig_BICLUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.BidImports` | `trig_BidImportUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp |
| `dbo.BidItems` | `trig_BidItemsUpdate` | UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.BidItems_Old` | `trig_BidItemsUpdate_old` | UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.BidMSRPResults` | `trig_BidMSRPResults` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.BidRequestItems_Orig` | `trig_BidRequestItems` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.BidRequestManufacturer` | `trig_BidRequestManufacturer` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.BidResults` | `trig_BidResultsUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Bids` | `trig_BidsUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.BidsCatalogList` | `trig_BCLUpdate` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.BudgetAccounts` | `trig_BudgetAccountUpdate` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.Budgets` | `trig_BudgetsUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Catalog` | `trig_CatalogCreateDate` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.Catalog` | `trig_CatalogPostDate` | UPDATE | AFTER | enabled | date-stamp |
| `dbo.Category` | `TRIG_CategoryCode` | INSERT, UPDATE | AFTER | enabled | audit, cascade |
| `dbo.Category` | `TRIG_DistrictCategoriesCategory` | DELETE, INSERT | AFTER | enabled | cascade |
| `dbo.CopyRequests` | `trig_CopyInsert` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.CrossRefs` | `trig_CrossRefs` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Detail` | `trig_DetailAuditDelete` | DELETE | AFTER | **disabled** | date-stamp, audit, cascade |
| `dbo.Detail` | `trig_DetailAuditUpdate` | INSERT, UPDATE | AFTER | **disabled** | date-stamp, audit, cascade |
| `dbo.Detail` | `trig_DetailDelete` | DELETE | AFTER | enabled | cascade |
| `dbo.Detail` | `trig_DetailUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.District` | `TRIG_District` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.District` | `TRIG_DistrictCategories` | DELETE, INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.DistrictCategories` | `trig_DCUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.DistrictCharges` | `trig_DistrictCharges` | UPDATE | AFTER | enabled | cascade |
| `dbo.DistrictNotes` | `trig_DistrictNotes` | INSERT, UPDATE | AFTER | enabled | date-stamp |
| `dbo.DistrictProposedCharges` | `trig_DistrictProposedCharges` | DELETE, INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.DMSVendorBidDocuments` | `trig_DMSVendorBidDocuments` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.DMSVendorDocuments` | `trig_DMSVendorDocuments` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Headings` | `trig_Headings` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Items` | `trig_Items` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.Keywords` | `trig_Keywords` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.MSDS` | `trig_MSDSInserted` | INSERT | AFTER | enabled | cascade |
| `dbo.OrderBooks` | `trig_OrderBookCreate` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.PricingAddenda` | `trig_PricingAddenda` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.RequisitionNotes` | `trig_RequisitionNotes` | DELETE, INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.Requisitions` | `trig_RequisitionsDelete` | DELETE | AFTER | enabled | cascade |
| `dbo.Requisitions` | `trig_RequisitionsUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, validation, cascade |
| `dbo.RTK_CASFile` | `trig_SetSpecialHealthHazard` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.RTK_Items` | `trig_MSDS` | INSERT | AFTER | enabled | cascade |
| `dbo.RTK_Items` | `trig_RTK_Items_ReportItems` | DELETE, INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.RTK_ReportItems` | `trig_RTK_ReportItems` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.TMSurvey` | `TMSurvey_Trig` | INSERT | AFTER | enabled | date-stamp, cascade |
| `dbo.UserAccounts` | `trig_UserAccountUpdate` | INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.Users` | `trig_UsersUpdate` | INSERT, UPDATE | AFTER | enabled | date-stamp, cascade |
| `dbo.VendorContacts` | `trig_Update` | DELETE, INSERT, UPDATE | AFTER | enabled | cascade |
| `dbo.Vendors` | `trig_VendorUpdate` | INSERT, UPDATE | AFTER | enabled | cascade |

## Date-stamping (28)

> Sets a timestamp column (DateCreated, DateModified, etc.) via GETDATE() or similar.

### `dbo.BidHeaders` &mdash; `trig_BidHeadersDateCreated`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-06 &middot; **Modified:** 2022-01-14 &middot; **Also tagged:** cascade

```sql
CREATE TRIGGER [dbo].[trig_BidHeadersDateCreated]
ON [dbo].[BidHeaders]
FOR INSERT not for replication 
AS 
BEGIN
set nocount on
  
  Declare @BidHeaderId int = (Select Max(BidHeaderId) From BidHeaders)

  Update BidHeaders
     set CompliantAlert = 1--case when inserted.CategoryId in (12,44) then 1 else 0 end
	    ,BidHeaderId = @BidHeaderId + 1
    from BidHeaders
    join inserted on inserted.BidHeaderKey = BidHeaders.BidHeaderKey


  if Update(DateCreated)
  begin
    update dbo.BidHeaders
       --set DateCreated = getdate()
       set DateCreated = CAST(GetDate() AS DATETIME2(2))
      from dbo.BidHeaders BidHeaders
      join inserted on inserted.BidHeaderKey = BidHeaders.BidHeaderKey
  end
/*  if Update(UpdateHold)
  begin
    Update Detail
       set Reproc = 1
      from Requisitions with (nolock)
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
      join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                     and BidHeaders.UpdateHold is null
      join Inserted on Inserted.BidHeaderId = BidHeaders.BidHeaderId
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where PO.POId is null
  end
*/    
set nocount off
END
```

### `dbo.BidImportCatalogList` &mdash; `trig_BICLUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** cascade

```sql
CREATE  trigger trig_BICLUpdate on dbo.BidImportCatalogList 
for insert, update not for replication 
as

set nocount on
update BidImportCatalogList
   set DateModified = getdate()
  from Inserted
  join BidImportCataloglist on BidImportCatalogList.BidImportCatalogId = Inserted.BidImportCatalogId
set nocount off
```

### `dbo.BidImports` &mdash; `trig_BidImportUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-05-23 &middot; **Modified:** 2018-10-04 &middot; **Also tagged:** —

```sql
CREATE  trigger [dbo].[trig_BidImportUpdate] on [dbo].[BidImports]
for insert, update not for replication 
as

set nocount on

update BidImports
   -- set DateModified = getdate(),    -- round to 1/100th second for clarion compatibility - KJM 10/4/18
   set DateModified = CAST(GetDate() AS DATETIME2(2)), 
   BidHeaderKey = IsNull(BidImports.BidHeaderKey,(Select BidHeaderKey From BidHeaders Where BidHeaders.BidHeaderId = BidImports.BidHeaderID))
  from Inserted
  join BidImports on BidImports.BidImportId = Inserted.BidImportId
set nocount off
```

### `dbo.BidItems` &mdash; `trig_BidItemsUpdate`

**Events:** UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2018-03-19 &middot; **Modified:** 2018-03-19 &middot; **Also tagged:** cascade

```sql
create trigger [dbo].[trig_BidItemsUpdate] on [dbo].[BidItems] for /*insert, */ update not for replication as
set nocount on

Update BidItems
   set DateUpdated = getdate()
  from BidItems with (nolock)
  join inserted on inserted.BidItemId = BidItems.BidItemId

/*
if update(ItemId) or update(Price) or update(AwardId) or update(VendorItemCode)
begin
  Update Detail
     set Reproc = 1
    from Inserted with (nolock)
    join BidItems on BidItems.BidItemId = Inserted.BidItemId
    join Detail on Detail.ItemId = BidItems.ItemId
    join Bids on Bids.BidId = BidItems.BidId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join District on District.DistrictId = Budgets.DistrictId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
    join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                   and BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                   and BidHeaders.UpdateHold is null
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
end

*/
set nocount off
```

### `dbo.BidItems_Old` &mdash; `trig_BidItemsUpdate_old`

**Events:** UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2018-03-19 &middot; **Modified:** 2018-03-19 &middot; **Also tagged:** cascade

```sql
create trigger [dbo].[trig_BidItemsUpdate_old] on [dbo].[BidItems_Old] for /*insert, */ update not for replication as
set nocount on

Update BidItems
   set DateUpdated = getdate()
  from BidItems with (nolock)
  join inserted on inserted.BidItemId = BidItems.BidItemId

/*
if update(ItemId) or update(Price) or update(AwardId) or update(VendorItemCode)
begin
  Update Detail
     set Reproc = 1
    from Inserted with (nolock)
    join BidItems on BidItems.BidItemId = Inserted.BidItemId
    join Detail on Detail.ItemId = BidItems.ItemId
    join Bids on Bids.BidId = BidItems.BidId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join District on District.DistrictId = Budgets.DistrictId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
    join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                   and BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                   and BidHeaders.UpdateHold is null
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
end

*/
set nocount off
```

### `dbo.BidResults` &mdash; `trig_BidResultsUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2025-07-09 &middot; **Modified:** 2025-07-09 &middot; **Also tagged:** cascade

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create TRIGGER trig_BidResultsUpdate 
   ON  dbo.BidResults
   for INSERT,UPDATE not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
	update BidResults
	   set AIDate = null,
	       [HashKey] = h.[HashKey]
	  from BidResults with (updlock,rowlock)
	  join inserted on inserted.BidResultsId = BidResults.BidResultsId
	  left outer join deleted on deleted.BidResultsId = BidResults.BidResultsId
	  outer apply (Select hashbytes('SHA2_512',coalesce(trim(inserted.Alternate),'') + coalesce(trim(inserted.ManufacturerBid),'') + coalesce(trim(inserted.ManufPartNoBid),'') + coalesce(trim(inserted.UNSPSC),'')) [HashKey]) h
	 where coalesce(inserted.Alternate,'') != coalesce(deleted.Alternate,'')
		or coalesce(inserted.ManufacturerBid,'') != coalesce(deleted.ManufacturerBid,'')
		or coalesce(inserted.ManufPartNoBid,'') != coalesce(deleted.ManufPartNoBid,'')
		or coalesce(inserted.UNSPSC,'') != coalesce(deleted.UNSPSC,'')

END
```

### `dbo.Bids` &mdash; `trig_BidsUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-29 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** cascade

```sql
CREATE  trigger [trig_BidsUpdate] on dbo.Bids for insert, update not for replication as
set nocount on

Update Bids
   set DateModified = getdate()
  from Inserted
  join Bids on Bids.BidId = Inserted.BidId


/*
if update(Active) or update(BidDiscountRate)
begin
Update Detail
   set Reproc = 1
  from Inserted with (nolock)
  join Bids on Bids.BidId = Inserted.BidId
  join BidItems on BidItems.BidId = Bids.BidId
  join Detail on Detail.ItemId = BidItems.ItemId
             and Detail.BidHeaderId = Bids.BidHeaderId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and case isnull(detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end = Bids.BidHeaderId
--                   and (select top 1 RequisitionId from PO where PO.RequisitionId = Requisitions.RequisitionId) is null
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
-- where Bids.BidHeaderId = case isnull(detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
 where PO.POId is null
 option (force order)

Update Detail
   set Reproc = 1
  from Inserted with (nolock)
  join Bids on Bids.BidId = Inserted.BidId
  join BidItems on BidItems.BidId = Bids.BidId
  join Detail on Detail.ItemId = BidItems.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                   and Requisitions.BidHeaderId = Bids.BidHeaderId
--                   and (select top 1 RequisitionId from PO where PO.RequisitionId = Requisitions.RequisitionId) is null
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
-- where Bids.BidHeaderId = case isnull(detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
 where PO.POId is null
 option (force order)
end
*/

set nocount off
```

### `dbo.Budgets` &mdash; `trig_BudgetsUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2023-12-13 &middot; **Also tagged:** cascade

```sql
CREATE trigger [dbo].[trig_BudgetsUpdate] on [dbo].[Budgets] for insert, update not for replication as
begin
declare @ShippingId int

 set nocount on
 if update(StartDate)
 begin
   Update Budgets
      set EndDate = dateadd(day,-1,dateadd(year,1,inserted.StartDate))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.EndDate is null) or
          (inserted.EndDate is null and Budgets.EndDate is null)

   Update Budgets
      set VisibleFrom = convert(datetime,'12/01/' + convert(char(4),year(inserted.StartDate)-1))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.VisibleFrom is null) or
          (inserted.VisibleFrom is null and Budgets.VisibleFrom is null)

   Update Budgets
      set VisibleUntil = convert(datetime,'12/01/' + convert(char(4),year(inserted.StartDate)))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.VisibleUntil is null) or
          (inserted.VisibleUntil is null and Budgets.VisibleUntil is null)

   Update Budgets
      set AnnualCutoff = convert(datetime,'10/01/' + convert(char(4),year(inserted.StartDate)))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.AnnualCutoff is null)
 end
 else
 begin
   Update Budgets
      set EndDate = dateadd(day,-1,dateadd(year,1,Budgets.StartDate))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.EndDate is null) or
          (inserted.EndDate is null and Budgets.EndDate is null)

   Update Budgets
      set VisibleFrom = convert(datetime,'12/01/' + convert(char(4),year(Budgets.StartDate)-1))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.VisibleFrom is null) or
          (inserted.VisibleFrom is null and Budgets.VisibleFrom is null)

   Update Budgets
      set VisibleUntil = convert(datetime,'12/01/' + convert(char(4),year(Budgets.StartDate)))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.VisibleUntil is null) or
          (inserted.VisibleUntil is null and Budgets.VisibleUntil is null)

   Update Budgets
      set AnnualCutoff = convert(datetime,'10/01/' + convert(char(4),year(inserted.StartDate)))
     from inserted
     join Budgets on Budgets.BudgetId = inserted.BudgetId
    where (update(BudgetId) and inserted.AnnualCutoff is null)
 end
 Update Budgets
    set EditFrom = case when Budgets.EditFrom is null and inserted.EditFrom is null then isnull(inserted.VisibleFrom,convert(datetime,'12/01/' + convert(char(4),year(Budgets.StartDate)-1))) else inserted.EditFrom end,
        EditUntil = case when Budgets.EditUntil is null and inserted.EditUntil is null then isnull(inserted.VisibleUntil,convert(datetime,'12/01/' + convert(char(4),year(Budgets.StartDate)))) else inserted.EditUntil end,
        AnnualCutoff = isnull(inserted.AnnualCutoff,convert(datetime,'10/01/' + convert(char(4),year(Budgets.StartDate))))
   from inserted
   join Budgets on Budgets.BudgetId = inserted.BudgetId

 insert DistrictContinuances (DistrictId, BudgetId, Email, Status, SavingsBudgetId)
	  select Budgets.DistrictId, Budgets.BudgetId, dc.Email, 'P', sb.BudgetId
	    from inserted
		join Budgets on Budgets.BudgetId = inserted.BudgetId
		outer apply (select top 1 DistrictContacts.Email
		               from DistrictContacts
					  where DistrictContacts.DistrictId = Budgets.DistrictId
					    and DistrictContacts.DistrictContactTypeId in (1,2,5,8)
						and isnull(DistrictContacts.Email,'') != ''
					  order by DistrictContacts.DistrictContactTypeId) dc
		outer apply (select top 1 b.BudgetId
		               from Budgets b
					  where b.DistrictId = Budgets.DistrictId
					    and b.Active = 1
						and year(b.StartDate) = year(Budgets.StartDate) - 2
					  order by b.StartDate) sb
		outer apply (select top 1 DistrictContinuances.Id
		               from DistrictContinuances
					  where DistrictContinuances.BudgetId = Budgets.BudgetId) cont
	   where cont.Id is null
	   group by Budgets.DistrictId, Budgets.BudgetId, dc.Email, sb.BudgetId

 set nocount off
end
```

### `dbo.Catalog` &mdash; `trig_CatalogCreateDate`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-03-05 &middot; **Modified:** 2020-03-05 &middot; **Also tagged:** cascade

```sql
CREATE TRIGGER [dbo].[trig_CatalogCreateDate] ON dbo.Catalog 
FOR INSERT not for replication
AS
BEGIN
set nocount on
    update dbo.Catalog
       --set CreateDate = getdate()   -- changed for clarion10 using only hundredths of secs
       set CreateDate =  CAST(getdate() AS DATETIME2(2)), PostDate = Try_CAST(inserted.PostDate AS DATETIME2(2)) 
      from dbo.Catalog Catalog
      join inserted on inserted.CatalogId = Catalog.CatalogId
set nocount off
END
```

### `dbo.Catalog` &mdash; `trig_CatalogPostDate`

**Events:** UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-03-05 &middot; **Modified:** 2020-03-05 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_CatalogPostDate] on dbo.Catalog 
FOR UPDATE not for replication
AS
BEGIN
set nocount on
  If update(PostDate)
  Begin
    update dbo.Catalog
       --set CreateDate = getdate()   -- changed for clarion10 using only hundredths of secs
       set PostDate = Try_CAST(inserted.PostDate AS DATETIME2(2)) 
      from dbo.Catalog Catalog
      join inserted on inserted.CatalogId = Catalog.CatalogId
  End
set nocount off
END
```

### `dbo.CopyRequests` &mdash; `trig_CopyInsert`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-29 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** cascade

```sql
CREATE trigger trig_CopyInsert on dbo.CopyRequests for insert not for replication as

set nocount on

 update CopyRequests
    set Requested = getdate()
   from inserted
   join CopyRequests on CopyRequests.CopyRequestId = inserted.CopyRequestId

set nocount off
```

### `dbo.CrossRefs` &mdash; `trig_CrossRefs`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2018-03-19 &middot; **Modified:** 2025-08-26 &middot; **Also tagged:** cascade

```sql
CREATE TRIGGER [dbo].[trig_CrossRefs] ON [dbo].[CrossRefs] 
FOR INSERT, UPDATE not for replication 
AS
set nocount on
if update(VendorItemCode)
begin
  update CrossRefs
     set PackedCode = dbo.uf_PackCodeCatalog(inserted.VendorItemCode, inserted.CatalogId),
         MatchKey = isnull(dbo.uf_PackCodeCatalog(inserted.VendorItemCode, inserted.CatalogId),'') + '/' + case isnull(Catalog.ImportFormat,1) when 1 then ISNULL(ltrim(rtrim(inserted.ManufacturorPartNumber)),'') else '' end
    from inserted with (updlock,rowlock)
    join CrossRefs on CrossRefs.CrossRefId = inserted.CrossRefId
    left outer join Catalog on Catalog.CatalogId = inserted.CatalogId
end
-- This code is for forcing an update after one of these fields is updated
if update(HashKey) or update(ShortDescription) or update(FullDescription) or update(Manufacturor) or update(ManufacturorPartNumber) or update(UNSPSC)
begin
	update Crossrefs
	   set AIDate = null,
	       [HashKey] = h.[HashKey]
	  from CrossRefs with (updlock,rowlock)
	  join inserted on inserted.CrossRefId = CrossRefs.CrossRefId
	  left outer join deleted on deleted.CrossRefId = CrossRefs.CrossRefId
	  outer apply (Select hashbytes('SHA2_512',coalesce(trim(inserted.ShortDescription),'') + coalesce(trim(inserted.FullDescription),'') + coalesce(trim(inserted.Manufacturor),'') + coalesce(trim(inserted.ManufacturorPartNumber),'') + coalesce(trim(inserted.UNSPSC),'')) [HashKey]) h
	 where coalesce(inserted.ShortDescription,'') != coalesce(deleted.ShortDescription,'')
		or coalesce(inserted.FullDescription,'') != coalesce(deleted.FullDescription,'')
		or coalesce(inserted.Manufacturor,'') != coalesce(deleted.Manufacturor,'')
		or coalesce(inserted.ManufacturorPartNumber,'') != coalesce(deleted.ManufacturorPartNumber,'')
		or coalesce(inserted.UNSPSC,'') != coalesce(deleted.UNSPSC,'')
end

set nocount off
```

### `dbo.Detail` &mdash; `trig_DetailAuditDelete`

**Events:** DELETE &middot; **Kind:** AFTER &middot; **State:** **disabled** &middot; **Created:** 2015-11-16 &middot; **Modified:** 2018-01-08 &middot; **Also tagged:** audit, cascade

```sql
CREATE   trigger trig_DetailAuditDelete on dbo.Detail
for delete not for replication 
as

set nocount on
  insert DetailChanges (DetailId, ChangeDate, OrigQty, NewQty, RequisitionId, ItemId, BidPrice, BidItemId)
    select Detail.DetailId, getdate(), deleted.Quantity, inserted.Quantity, Detail.RequisitionId, deleted.ItemId, deleted.BidPrice, deleted.BidItemId
      from Detail with (nolock)
      join deleted on deleted.detailId = Detail.DetailId
      left outer join inserted on inserted.DetailId = Detail.DetailId
set nocount off
```

### `dbo.Detail` &mdash; `trig_DetailAuditUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** **disabled** &middot; **Created:** 2015-11-16 &middot; **Modified:** 2018-01-08 &middot; **Also tagged:** audit, cascade

```sql
CREATE  trigger [dbo].[trig_DetailAuditUpdate] on dbo.Detail
for insert, update not for replication 
as

set nocount on
if update(Quantity)
begin
  insert DetailChanges (DetailId, ChangeDate, OrigQty, NewQty, RequisitionId, ItemId, BidPrice, BidItemId)
    select Detail.DetailId, getdate(), deleted.Quantity, inserted.Quantity, Detail.RequisitionId, inserted.ItemId, inserted.BidPrice, inserted.BidItemId
      from Detail with (nolock)
      join inserted on inserted.DetailId = Detail.DetailId
      left outer join deleted on deleted.detailId = Detail.DetailId
     where isnull(deleted.Quantity,0) != isnull(inserted.Quantity,0)
end
set nocount off
```

### `dbo.Detail` &mdash; `trig_DetailUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-11-16 &middot; **Modified:** 2026-04-14 &middot; **Also tagged:** cascade

```sql
CREATE TRIGGER [dbo].[trig_DetailUpdate] on [dbo].[Detail] 
after INSERT, UPDATE not for replication
AS
set nocount on
declare @BidsList table (RequisitionId int, BidHeaderId int null)
declare @CatPrices table (sysid int identity(1,1) not null primary key, DetailId int, BidHeaderId int, BidId int, CrossRefId int, CatalogYear char(4), NetPrice money, DiscountRate decimal(9,5))
declare @FrozenReqs table (RequisitionId int not null primary key)

if update(LastAlteredSessionId) or update(SessionId)
begin
  Update Detail
     set SessionId = case when inserted.SessionId is null then inserted.LastAlteredSessionId else inserted.SessionId end,
         LastAlteredSessionId = case when inserted.LastAlteredSessionId is null then inserted.SessionId else inserted.LastAlteredSessionId end
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
end

if update(ItemId) or update(BidHeaderId) or update(Reproc)
begin
  -- Build Base List of Bids for each Requisition
  insert @BidsList (RequisitionId, BidHeaderId)
    select Requisitions.RequisitionId, Requisitions.BidHeaderId
      from inserted
      join Detail on Detail.DetailId = inserted.DetailId
      join Requisitions on Requisitions.RequisitionId = isnull(inserted.RequisitionId, Detail.RequisitionId)
     group by Requisitions.RequisitionId, Requisitions.BidHeaderId
   
  -- Add All other bids needed to list
  while @@rowcount != 0
  begin
	-- Add Parent PreBids
	insert @BidsList (RequisitionId, BidHeaderId)
	  select Requisitions.RequisitionId, BidHeaders.BidHeaderId
		from Requisitions with (nolock)
		join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
		join Budgets on Budgets.BudgetId = Requisitions.BudgetId
		join Category on Category.CategoryId = Requisitions.CategoryId
		join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
		               and BidHeaders.Active = 1
		               and BidHeaders.ParentBidHeaderId = bl.BidHeaderId
 		               and isnull(BidHeaders.DistrictId,0) = case isnull(BidHeaders.BidType,1) when 2 then Budgets.DistrictId else isnull(BidHeaders.DistrictId,0) end
					   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
				       and PPCategory.CategoryId = BidHeaders.CategoryId
		join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
					   and DistrictPP.DistrictId = Budgets.DistrictId
		left outer join @BidsList ble on ble.RequisitionId = Requisitions.RequisitionId
		                             and ble.BidHeaderId = BidHeaders.BidHeaderId
	   where BidHeaders.PricePlanId = DistrictPP.PricePlanId
	     and ble.BidHeaderId is null
	   group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
  end

  -- Build List of Frozen Reqs
  insert @FrozenReqs (RequisitionId)
	select Requisitions.RequisitionId
	  from inserted
      join Detail on Detail.DetailId = inserted.DetailId
      join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
	  outer apply (Select top 1 PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId) p
	  outer apply (Select top 1 Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45,49)) ap
	 where p.POId is not null
	    or ap.ApprovalId is not null
	 group by Requisitions.RequisitionId

  -- Remap items with new Id's
  Update Detail
     set ItemId = MappedItems.NewItemId,
         OriginalItemId = coalesce(Detail.OriginalItemId,MappedItems.OrigItemId),
         Modified = getdate()
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join MappedItems on MappedItems.OrigItemId = coalesce(inserted.ItemId, Detail.ItemId)
                    and MappedItems.NewItemId != coalesce(inserted.ItemId, Detail.ItemId)
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
/*
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
*/
  -- Bid specific Remap items with new Id's
/* Disabled to 9/6/2018 to allow new lookup code to work correctly
  Update Detail
     set ItemId = BidMappedItems.NewItemId,
         OriginalItemId = coalesce(Detail.OriginalItemId,BidMappedItems.OrigItemId),
         Modified = getdate()
    from inserted
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join BidHeaders on BidHeaders.BidHeaderId in (select case coalesce(Detail.BidHeaderId,0) when 0 then bl.BidHeaderId else Detail.BidHeaderId end from @BidsList bl where bl.RequisitionId = Requisitions.RequisitionId group by case coalesce(Detail.BidHeaderId,0) when 0 then bl.BidHeaderId else Detail.BidHeaderId end)
    join BidMappedItems on BidMappedItems.OrigItemId = Detail.ItemId
                       and BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
                       and BidMappedItems.NewItemId != coalesce(inserted.ItemId, Detail.ItemId)
   where not exists(select PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId)
*/
/*
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
*/
  -- Reset info for All Items
  Update Detail
     set CatalogId = null,
         BidPrice = null,
         CatalogPrice = null,
         GrossPrice = null,
         DiscountRate = null,
         CatalogPage = null,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = null,
         CrossRefId = null,
         AdditionalShipping = null,
         Reproc = null
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
/*
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
*/
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  -- Set Bid Item info if valid and no other prices are set
  Update Detail
     set CatalogId = BestBid.CatalogId,
         BidPrice = BestBid.BidPrice,
         CatalogPrice = BestBid.CatalogPrice,
         GrossPrice = BestBid.GrossPrice,
         DiscountRate = BestBid.DiscountRate,
         CatalogPage = BestBid.Page,
         PricePlanId = BestBid.PricePlanId,
         AwardId = BestBid.AwardId,
         VendorId = BestBid.VendorId,
         VendorItemCode = BestBid.VendorItemCode,
         Alternate = BestBid.Alternate,
         BidItemId = BestBid.BidItemId,
         CrossRefId = BestBid.CrossRefId,
         ItemMustBeBid = 0
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Category on Category.CategoryId = Requisitions.CategoryId
                 and Category.Type in (1,2,4)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	outer apply (select top 1 CrossRefs.CatalogId, 
	                    round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2) BidPrice, 
						CrossRefs.CatalogPrice, 
						round(BidItems.Price,2) GrossPrice, 
						isnull(Bids.BidDiscountRate,0) DiscountRate,
						CrossRefs.Page,
						BidHeaders.PricePlanId,
						Awards.AwardId,
						Bids.VendorId,
						BidItems.VendorItemCode,
						BidItems.Alternate,
						BidItems.BidItemId,
						BidItems.CrossRefId
				   from BidItems
				   join Bids on Bids.BidId = BidItems.BidId
				            and Bids.Active = 1
				   join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
				                  and BidHeaders.BidHeaderId = Bids.BidHeaderId
								  and BidHeaders.BidHeaderId in (select case coalesce(Detail.BidHeaderId,0) 
				                                                          when 0 then bl.BidHeaderId 
																		  else Detail.BidHeaderId 
																		end 
																   from @BidsList bl 
																  where bl.RequisitionId = Requisitions.RequisitionId 
																  group by case coalesce(Detail.BidHeaderId,0) 
																             when 0 then bl.BidHeaderId 
																			 else Detail.BidHeaderId 
																		   end)
				   join Awards on Awards.BidId = Bids.BidId
			       left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
				  where BidItems.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
				  order by case when isnull(Bids.VendorId,0) in (0,7691) then 1 else 0 end, round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2)) BestBid
   where Detail.ItemMustBeBid is null
     and BestBid.BidItemId is not null
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)

  -- Set Catalog Prices for Catalog Items
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update Detail
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(case isnull(Crossrefs.DoNotDiscount,0) when 0 then CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * isnull(BidsCatalogList.DiscountRate,0) / 100,2) else Crossrefs.GrossPrice end,2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(CrossRefs.GrossPrice,2),
         DiscountRate = case isnull(Crossrefs.DoNotDiscount,0) when 0 then isnull(BidsCatalogList.DiscountRate,0) else 0 end,
         CatalogPage = CrossRefs.Page,
         PricePlanId = BidHeaders.PricePlanId,
         AwardId = Awards.AwardId,
         VendorId = Bids.VendorId,
         VendorItemCode = CrossRefs.VendorItemCode,
         Alternate = null,
         BidItemId = null,
         CrossRefId = CrossRefs.CrossRefId,
         AdditionalShipping = isnull(CrossRefs.AdditionalShipping,0),
         ItemMustBeBid = 0,
		 BidHeaderId = case when BidHeaders.BidHeaderId != Requisitions.BidHeaderId then BidHeaders.BidHeaderId else null end
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join Category on Category.CategoryId = Requisitions.CategoryId
                 and Category.Type in (1,2,4)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join CrossRefs on CrossRefs.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
                  and CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = Cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
         join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
                          and bl.BidHeaderId = bh.BidHeaderId
        where xr.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join BidsCatalogList on BidsCatalogList.BidCatalogId = 
      (select top 1 bcl.BidCatalogId
         from CrossRefs xr with (nolock)
         join Catalog cat on cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
         join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
                          and bl.BidHeaderId = bh.BidHeaderId
        where xr.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join Bids on Bids.BidId = BidsCatalogList.BidId
    join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
    join Awards on Awards.BidId = Bids.BidId
   where Detail.ItemMustBeBid is null
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
     
  -- Set MSRP Pricing 
  Update Detail
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = coalesce(round(Items.ListPrice - round(Items.ListPrice * isnull(BidManufacturers.DiscountRate,0) / 100,2),2),0),
         CatalogPrice = coalesce(Items.ListPrice,0),
         GrossPrice = coalesce(Items.ListPrice,0),
         DiscountRate = isnull(BidManufacturers.DiscountRate,0),
         CatalogPage = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = Bids.VendorId,
         VendorItemCode = case coalesce(rtrim(Items.VendorPartNumber),'') when '' then 'N/A' else Items.VendorPartNumber end,
         Alternate = null,
         BidItemId = null,
         CrossRefId = CrossRefs.CrossRefId,
         AdditionalShipping = isnull(CrossRefs.AdditionalShipping,0),
         ItemMustBeBid = 0
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Category on Category.CategoryId = Requisitions.CategoryId
                 and Category.Type = 5
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join Items on Items.ItemId = Detail.ItemId
    join BidHeaders on BidHeaders.BidHeaderId in (select case coalesce(Detail.BidHeaderId,0) when 0 then bl.BidHeaderId else Detail.BidHeaderId end from @BidsList bl where bl.RequisitionId = Requisitions.RequisitionId group by case coalesce(Detail.BidHeaderId,0) when 0 then bl.BidHeaderId else Detail.BidHeaderId end)
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidManufacturers on BidManufacturers.BidId = Bids.BidId
                         and BidManufacturers.ManufacturerId = Items.ManufacturerId
    left outer join CrossRefs on CrossRefs.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
                             and CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
                         and Cat.Active = 1
                         and Cat.CategoryId = Requisitions.CategoryId
        where xr.ItemId = Detail.ItemId
          and xr.Active = 1
        order by case isnull(xr.GrossPrice,0) when 0 then 0 else 1 end desc, xr.CatalogYear desc, isnull(xr.GrossPrice,0), xr.CrossRefId desc) 
   where Detail.ItemMustBeBid is null
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)

  -- Set Addenda item info if valid and no other prices are set
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update Detail
     set CatalogId = xr.CatalogId,
         BidPrice = round(coalesce(Items.ListPrice, xr.CatalogPrice, xr.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         CatalogPrice = round(coalesce(Items.ListPrice, xr.CatalogPrice, xr.GrossPrice / .85,0),2),--case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice) else Items.ListPrice end,
         GrossPrice = round(coalesce(Items.ListPrice, xr.CatalogPrice, xr.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         DiscountRate = null,
         CatalogPage = xr.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         CrossRefId = null,
         AdditionalShipping = null,
         ItemMustBeBid = 1
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Items on Items.ItemId = Detail.ItemId
--	          and coalesce(Items.DistrictId,0) != 0
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
                           and DistrictCategories.AllowAddenda = 1
	outer apply (Select top 1 CrossRefs.CrossRefId, Crossrefs.CatalogId, CrossRefs.CatalogPrice, CrossRefs.GrossPrice, CrossRefs.Page
	               from CrossRefs
				   join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				               and Catalog.Name = 'EDS'
							   and Catalog.Active = 1
				  where CrossRefs.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
				    and CrossRefs.Active = 1
				  order by case isnull(CrossRefs.GrossPrice,0) when 0 then 0 else 1 end desc, CrossRefs.CatalogYear desc, isnull(CrossRefs.GrossPrice,0), CrossRefs.CrossRefId desc) xr
	outer apply (Select top 1 CrossRefs.CrossRefId
	               from CrossRefs
				   join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				               and Catalog.Name != 'EDS'
							   and Catalog.Active = 1
							   and Catalog.CatalogYear > year(getdate()) - 2000 - 3
				  where CrossRefs.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
				    and CrossRefs.Active = 1) CatCheck
   where Detail.ItemMustBeBid is null
	 and CatCheck.CrossRefId is null
     and (coalesce(Requisitions.BidHeaderId,0) = 0 or coalesce(Items.DistrictId,0) != 0)
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
/*
  Update Detail
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         CatalogPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice) else Items.ListPrice end,
         GrossPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         DiscountRate = null,
         CatalogPage = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         CrossRefId = null,
         AdditionalShipping = null,
         ItemMustBeBid = 1
    from inserted
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
                           and DistrictCategories.AllowAddenda = 1
    join Items on Items.ItemId = Detail.ItemId
    left outer join CrossRefs on CrossRefs.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
                             and CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
                         and Cat.Active = 1
                         and Cat.CategoryId = Requisitions.CategoryId
        where xr.ItemId = Detail.ItemId
          and xr.Active = 1
        order by case isnull(xr.GrossPrice,0) when 0 then 0 else 1 end desc, xr.CatalogYear desc, isnull(xr.GrossPrice,0), xr.CrossRefId desc) 
--    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where Detail.ItemMustBeBid is null
     and not exists(select PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId)
--     and PO.POId is null
*/
  -- Mark items which did not fall into any of the previous updates as NoBid items
  Update Detail
     set CatalogId = null,
         BidPrice = null,
         CatalogPrice = null,
         GrossPrice = null,
         DiscountRate = null,
         CatalogPage = null,
         PricePlanId = null,
         AwardId = null,
         VendorId = 7691,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = 0,
         CrossRefId = null,
         AdditionalShipping = null,
         Reproc = null
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where Detail.ItemMustBeBid is null
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
   
  --Update Common Information 
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update Detail
     set ItemCode = Items.ItemCode,
         Description = case when datalength(dd.ItemDescription) > 1024 then left(dd.ItemDescription,1021) + '...' else dd.ItemDescription end,
         UnitId = Items.UnitId,
         UnitCode = Units.Code,
         HeadingId = Items.HeadingId,
         KeywordId = Items.KeywordId,
         HeadingTitle = Headings.Title,
         Keyword = Keywords.Keyword,
         SortSeq = Items.SortSeq
    from inserted with (updlock,rowlock)
    join Detail on Detail.DetailId = inserted.DetailId
    join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
    join vw_DetailDescription dd on dd.DetailId = inserted.DetailId
    join Items on Items.ItemId = coalesce(Detail.ItemId, inserted.ItemId)
    left outer join Units on Units.UnitId = Items.UnitId
    left outer join Headings on Headings.HeadingId = Items.HeadingId
    left outer join Keywords on Keywords.KeywordId = Items.KeywordId
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)

--Special Price Freeze Logic for Items already in system for items that were incorrectly priced 4/14/2010 dch
  update Detail
     set BidPrice = fi.OrigBidPrice,
         VendorId = fi.OrigVendorId,
         CatalogId = fi.OrigCatalogId,
         CatalogPrice = fi.OrigCatalogPrice,
         VendorItemCode = fi.OrigVendorItemCode,
         AwardId = fi.OrigAwardId,
		 GrossPrice = fi.OrigBidPrice,
		 DiscountRate = 0,
		 CrossRefId = xr.CrossRefId
    from Detail with (updlock,rowlock)
    join FreezeItems2015 fi on fi.DetailId = Detail.DetailId
    join inserted on inserted.DetailId = Detail.DetailId
	outer apply (select top 1 CrossRefs.CrossRefId from CrossRefs where CrossRefs.CatalogId = fi.CatalogId and CrossRefs.ItemId = Detail.ItemId and CrossRefs.VendorItemCode = fi.VendorItemCode order by CrossRefs.GrossPrice) xr
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Detail.RequisitionId)

-- Price freeze for WB Mason Items 2016
  update Detail
     set BidPrice = fi.GrossPrice,
         VendorItemCode = fi.VendorItemCode,
		 GrossPrice = fi.GrossPrice,
		 DiscountRate = 0,
		 VendorId = fi.VendorId,
		 CatalogPrice = CrossRefs.CatalogPrice,
		 CrossRefId = fi.CrossRefId
    from Detail with (updlock,rowlock)
    join Requisitions on Requisitions.REquisitionId = Detail.RequisitionId
    join FreezeItems fi on fi.ItemId = Detail.ItemId
                       and fi.BidHeaderId = Requisitions.BidHeaderId
                       and fi.VendorId = Detail.VendorId
    join inserted on inserted.DetailId = Detail.DetailId
	left outer join CrossRefs on CrossRefs.CrossRefId = fi.CrossRefId
   where Detail.BidItemId is null
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
   
end

-- Create Notifications if needed
insert DetailNotifications (DetailId, OrigItemId, NewItemId, OrigVendorId, NewVendorId, OrigBidPrice, NewBidPrice)
  select Detail.DetailId, deleted.ItemId, Detail.ItemId, deleted.VendorId, Detail.VendorId, deleted.BidPrice, Detail.BidPrice
    from inserted
	join Detail on Detail.DetailId = inserted.DetailId
	join deleted on deleted.DetailId = inserted.DetailId
   where coalesce(deleted.ItemMustBeBid,0) = 0
     and coalesce(Detail.ItemMustBeBid,0) = 0
     and (   (coalesce(deleted.ItemId,0) != coalesce(Detail.ItemId,0))
          or (coalesce(deleted.VendorId,7691) != coalesce(Detail.VendorId,7691))
	      or (coalesce(deleted.BidPrice,0) != coalesce(Detail.BidPrice,0)))
     and not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Detail.RequisitionId)
   group by Detail.DetailId, deleted.ItemId, Detail.ItemId, deleted.VendorId, Detail.VendorId, deleted.BidPrice, Detail.BidPrice

if update(Quantity) or update(BidPrice) or update(ItemId) or update(BidHeaderId) or update(Reproc) or update(ShippingCost)
begin
 -- Bad trick but only way to solve right now should be fixed correctly dch 11/14/2012
  set Ansi_warnings off
  update Requisitions
     set TotalItemsCost = coalesce((select sum(coalesce(Detail.Quantity,0) * round(coalesce(Detail.BidPrice,0),2)) 
                                    from Detail with (nolock) 
                                    join Requisitions r1 on r1.RequisitionId = Detail.RequisitionId
                                                        and r1.RequisitionId = Requisitions.RequisitionId
--                                    left outer join BidHeaders on BidHeaders.BidHeaderId = case coalesce(Detail.BidHeaderId,0) when 0 then R1.BidHeaderId else Detail.BidHeaderId end
                                   where Detail.RequisitionId = Requisitions.RequisitionId
--                                     and coalesce(Detail.ItemMustBeBid,0) = 0
/*                                   and (   Detail.AddedFromAddenda is not null
                                          or coalesce(BidHeaders.BidType,2) = 1)*/),0)
/* DCH Removed 1/20/2023 and moved to Requisitions trigger
         ShippingCost = (select sum(coalesce(rsc.ShippingCost,0)) 
                           from vw_RequisitionShippingCosts rsc with (nolock) 
                          where rsc.RequisitionId = Requisitions.RequisitionId)
*/
    from Requisitions with (updlock,rowlock)
    join (
      select RequisitionId 
        from inserted 
       union (
         select RequisitionId 
           from deleted)
          ) ss on ss.RequisitionId = Requisitions.RequisitionId
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
  set Ansi_warnings on
end
set nocount off
```

### `dbo.District` &mdash; `TRIG_DistrictCategories`

**Events:** DELETE, INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-10-17 &middot; **Modified:** 2019-08-01 &middot; **Also tagged:** cascade

```sql
CREATE trigger [dbo].[TRIG_DistrictCategories] on [dbo].[District]
after insert, delete not for replication 
as
set nocount on

insert DistrictCategories (Active, AllowAddenda, CategoryId, DistrictId, AllowIncidentals)
  select max(isnull(cc.Active,0)), max(case isnull(cc.AllowAddenda,0) when 1 then 1 else 0 end), Category.CategoryId, inserted.DistrictId, 1
    from inserted
    join Category on Category.Active = 1
	outer apply ( select 1 Active, case when isnull(BidHeaders.BidType,1) = 1 then 0 else 1 end AllowAddenda
					from BidHeaders
					where getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
					  and BidHeaders.CategoryId = Category.CategoryId
					group by case when isnull(BidHeaders.BidType,1) = 1 then 0 else 1 end) cc
    group by Category.CategoryId, inserted.DistrictId
    order by inserted.DistrictId, Category.CategoryId

delete DistrictCategories
  from DistrictCategories
  join deleted on deleted.DistrictId = DistrictCategories.DistrictId

set nocount off
```

### `dbo.DistrictCategories` &mdash; `trig_DCUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2016-08-16 &middot; **Modified:** 2017-02-22 &middot; **Also tagged:** cascade

```sql
CREATE trigger [dbo].[trig_DCUpdate] on [dbo].[DistrictCategories] after insert,update not for replication
as
	
	insert DistrictNotifications (DistrictId, NotificationType, CategoryId, NotifyList, OtherNotify, Modified)
		select inserted.DistrictId, 'BidTabReady', inserted.CategoryId, '{User},{Approver},{BA},{Primary}' + case inserted.CategoryId when 12 then ',{BG}' when 44 then ',{AD}' else '' end, null, getdate()
		  from inserted
		  left outer join DistrictNotifications on DistrictNotifications.DistrictId = inserted.DistrictId
		                                       and DistrictNotifications.CategoryId = inserted.CategoryId
		 where DistrictNotifications.DistrictNotificationId is null
		   and inserted.AllowAddenda = 1
```

### `dbo.DistrictNotes` &mdash; `trig_DistrictNotes`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2007-07-11 &middot; **Modified:** 2018-05-30 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_DistrictNotes] ON [dbo].[DistrictNotes] 
FOR INSERT, UPDATE not for replication
AS
set nocount on

update DistrictNotes
   --set DateOfNote = getdate()            -- changed for clarion10 using only hundredths of secs
   set DateOfNote = CAST(getdate() AS DATETIME2(2))
   from DistrictNotes
   join Inserted on DistrictNotes.DistrictNotesId = Inserted.DistrictNotesId

set nocount off
```

### `dbo.DistrictProposedCharges` &mdash; `trig_DistrictProposedCharges`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2019-09-23 &middot; **Modified:** 2023-11-13 &middot; **Also tagged:** cascade

```sql
--select * from ChargeTypes
--select * from DistrictContacttypes
CREATE   trigger [dbo].[trig_DistrictProposedCharges] on [dbo].[DistrictProposedCharges]
for insert,update,delete not for replication
as
begin
	set nocount on
	-- Create Contiuance if not existing already
	insert DistrictContinuances(DistrictId, BudgetId, Email, Status, SavingsBudgetId)
	  select Budgets.DistrictId, Budgets.BudgetId, dc.Email, 'P', sb.BudgetId
	    from inserted
		join Budgets on Budgets.BudgetId = inserted.BudgetId
		outer apply (select top 1 DistrictContacts.Email
		               from DistrictContacts
					  where DistrictContacts.DistrictId = Budgets.DistrictId
					    and DistrictContacts.DistrictContactTypeId in (1,2,5,8)
						and isnull(DistrictContacts.Email,'') != ''
					  order by DistrictContacts.DistrictContactTypeId) dc
		outer apply (select top 1 b.BudgetId
		               from Budgets b
					  where b.DistrictId = Budgets.DistrictId
					    and b.Active = 1
						and year(b.StartDate) = year(Budgets.StartDate) - 2
					  order by b.StartDate) sb
		outer apply (select top 1 DistrictContinuances.Id
		               from DistrictContinuances
					  where DistrictContinuances.BudgetId = Budgets.BudgetId) cont
	   where cont.Id is null
	   group by Budgets.DistrictId, Budgets.BudgetId, dc.Email, sb.BudgetId

	-- Update Previous Budget, Previous Amount and ChangedPercentage columns
	update DistrictProposedCharges
	   set PreviousBudgetId = pc.BudgetId,
	       PreviousAmount = pc.Amount,
		   ChangePercentage = case when isnull(pc.Amount,0) = 0 then 0 else (DistrictProposedCharges.Amount - pc.Amount) / pc.Amount end,
		   DateUpdated = getdate()
	  from inserted
	  join DistrictProposedCharges on DistrictProposedCharges.Id = inserted.Id
	  join Budgets on Budgets.BudgetId = DistrictProposedCharges.BudgetId
	  outer apply (select top 1 b.BudgetId, dc.Amount
	                 from Budgets b
					 join DistrictCharges dc on dc.BudgetId = b.BudgetId
					                        and dc.ChargeTypeId = DistrictProposedCharges.ChargeTypeId
											and dc.Active = 1
					where b.DistrictId = Budgets.DistrictId
					  and year(b.StartDate) = year(Budgets.StartDate) - 1) pc

/*
	-- Remove Old Charge if these charges are NOT the ones that appear on the DistrictContinuance
	delete DistrictCharges
	  from deleted
	  join DistrictProposedCharges on DistrictProposedCharges.Id = deleted.Id
	  join DistrictCharges on DistrictCharges.BudgetId = DistrictProposedCharges.BudgetId
	                      and DistrictCharges.ChargeTypeId = deleted.ChargeTypeId
    where deleted.ChargeTypeId not in (select ChargeTypeId from ChargeTypes where isnull(ChargeTypes.LM,0) = 1 or isnull(ChargeTypes.RTK,0) = 1 )

3	-- Add new DistrictCharges if these charges are NOT the ones that appear on the DistrictContinuance
	insert DistrictCharges (DistrictId, BudgetId, Active, ChargeDate, ChargeTypeId, Amount, DateUpdated, Frequency, FrequencyData)
	select inserted.DistrictId, inserted.BudgetId, 1, getdate(), inserted.ChargeTypeId, inserted.Amount, getdate(), inserted.Frequency, inserted.FrequencyData
	  from inserted
	  join DistrictProposedCharges on DistrictProposedCharges.Id = inserted.Id
	  left outer join DistrictCharges on DistrictCharges.BudgetId = DistrictProposedCharges.BudgetId
	                                 and DistrictCharges.ChargeTypeId = inserted.ChargeTypeId
    where inserted.ChargeTypeId not in (select ChargeTypeId from ChargeTypes where isnull(ChargeTypes.LM,0) = 1 or isnull(ChargeTypes.RTK,0) = 1)
	  and DistrictCharges.DistrictChargeId is null
	group by inserted.DistrictId, inserted.BudgetId, inserted.ChargeTypeId, inserted.Amount, inserted.Frequency, inserted.FrequencyData
*/
	-- Remove Continuances that have no Charges
	delete DistrictContinuances
	  from deleted
	  join Budgets on Budgets.BudgetId = deleted.BudgetId
	  join DistrictContinuances on DistrictContinuances.BudgetId = Budgets.BudgetId
	  left outer join inserted on inserted.Id = deleted.Id
	  outer apply (select top 1 DistrictProposedCharges.Id
	                 from DistrictProposedCharges
					where DistrictProposedCharges.BudgetId = Budgets.BudgetId
					  and DistrictProposedCharges.Id != deleted.Id) dpc
	 where inserted.Id is null
	   and dpc.Id is null

	set nocount off
end
```

### `dbo.DMSVendorBidDocuments` &mdash; `trig_DMSVendorBidDocuments`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-10-20 &middot; **Modified:** 2026-05-04 &middot; **Also tagged:** cascade

```sql
CREATE   trigger [dbo].[trig_DMSVendorBidDocuments] on [dbo].[DMSVendorBidDocuments]
for insert,update not for replication
as
begin
	if update(ExpirationDate) 
	begin
		-- If Existing Data is present, Mark it Deleted
		Update fd
		   set deletedAt = getdate()
		  from inserted
 		  join DMSVendorBidDocuments vbd on vbd.Id = inserted.Id
		  join documents.dbo.DocumentFiles df on df.Id = vbd.DocId
		  join Documents.dbo.Fields f on f.Name = 'Expiration Date'
									 and f.deletedAt is null
		  join Documents.dbo.FieldData fd on fd.DocumentId = df.DocumentId
										 and fd.FieldId = f.Id
										 and fd.deletedAt is null

		-- Insert New data - This keeps a historical record
		insert Documents.dbo.FieldData (DocumentId, FieldId, FieldValue)
		   select df.DocumentId, f.Id, inserted.ExpirationDate
			 from inserted
			 join DMSVendorBidDocuments vbd on vbd.Id = inserted.Id
		     join documents.dbo.DocumentFiles df on df.Id = vbd.DocId
			 join Documents.dbo.Fields f on f.Name = 'Expiration Date'
										and f.deletedAt is null
			group by df.DocumentId, f.Id, inserted.ExpirationDate
	end
	if update(DocumentNumber) 
	begin
		-- If Existing Data is present, Mark it Deleted
		Update fd
		   set deletedAt = getdate()
		  from inserted
 		  join DMSVendorBidDocuments vbd on vbd.Id = inserted.Id
		  join documents.dbo.DocumentFiles df on df.Id = vbd.DocId
		  join Documents.dbo.Fields f on f.Name = 'Document Number'
									 and f.deletedAt is null
		  join Documents.dbo.FieldData fd on fd.DocumentId = df.DocumentId
										 and fd.FieldId = f.Id
										 and fd.deletedAt is null

		-- Insert New data - This keeps a historical record
		insert Documents.dbo.FieldData (DocumentId, FieldId, FieldValue)
		   select df.DocumentId, f.Id, inserted.DocumentNumber
			 from inserted
 		     join DMSVendorBidDocuments vbd on vbd.Id = inserted.Id
		     join documents.dbo.DocumentFiles df on df.Id = vbd.DocId
			 join Documents.dbo.Fields f on f.Name = 'Document Number'
										and f.deletedAt is null
			group by df.DocumentId, f.Id, inserted.DocumentNumber
	end
end
```

### `dbo.DMSVendorDocuments` &mdash; `trig_DMSVendorDocuments`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-10-20 &middot; **Modified:** 2026-05-04 &middot; **Also tagged:** cascade

```sql
create   trigger [dbo].[trig_DMSVendorDocuments] on dbo.DMSVendorDocuments
for insert,update not for replication
as
begin
	if update(ExpirationDate) 
	begin
		-- If Existing Data is present, Mark it Deleted
		Update fd
		   set deletedAt = getdate()
		  from inserted
		  join Documents.dbo.FieldData fd on fd.DocumentId = inserted.DocId
		  join Documents.dbo.Fields f on f.Id = fd.FieldId
		                             and f.Name = 'Expiration Date'
									 and f.deletedAt is null

		-- Insert New data - This keeps a historical record
		insert Documents.dbo.FieldData (DocumentId, FieldId, FieldValue)
		   select inserted.DocId, f.Id, inserted.ExpirationDate
			 from inserted
			 join Documents.dbo.Fields f on f.Name = 'Expiration Date'
										and f.deletedAt is null
			group by inserted.DocId, f.Id, inserted.ExpirationDate
	end
	if update(DocumentNumber) 
	begin
		-- If Existing Data is present, Mark it Deleted
		Update fd
		   set deletedAt = getdate()
		  from inserted
		  join Documents.dbo.FieldData fd on fd.DocumentId = inserted.DocId
		  join Documents.dbo.Fields f on f.Id = fd.FieldId
		                             and f.Name = 'Document Number'
									 and f.deletedAt is null

		-- Insert New data - This keeps a historical record
		insert Documents.dbo.FieldData (DocumentId, FieldId, FieldValue)
		   select inserted.DocId, f.Id, inserted.DocumentNumber
			 from inserted
			 join Documents.dbo.Fields f on f.Name = 'Document Number'
										and f.deletedAt is null
			group by inserted.DocId, f.Id, inserted.DocumentNumber
	end
end
```

### `dbo.Headings` &mdash; `trig_Headings`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2009-11-17 &middot; **Modified:** 2019-08-03 &middot; **Also tagged:** cascade

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[trig_Headings] 
   ON  [dbo].[Headings] 
   AFTER INSERT,UPDATE not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    Update Headings
       set Title = replace(inserted.Title,'\','')
	      ,DateUpdated = getdate()	
      from Headings
      join inserted on inserted.HeadingId = Headings.HeadingId
      
END
```

### `dbo.Items` &mdash; `trig_Items`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-29 &middot; **Modified:** 2021-03-09 &middot; **Also tagged:** cascade

```sql
CREATE   TRIGGER [dbo].[trig_Items] ON [dbo].[Items] 
FOR INSERT, UPDATE not for replication 
AS
set nocount on
if update(ItemCode)
begin
  update Items
     set SortSeq = dbo.uf_SetSortSeq(inserted.ItemCode),
         PackedCode = dbo.uf_PackCode(inserted.ItemCode),
		 HeadingKeywordId = (cast(isnull(inserted.keywordId,0) as bigint) * cast(0x100000000 as bigint)) + cast(isnull(inserted.HeadingId,0) as bigint)
    from Items, [inserted]
   where Items.ItemId = inserted.ItemId
end

if update(ItemCode) or update(Description) or update(UnitId)
begin
Update Detail
   set ItemCode = Items.ItemCode,
       UnitId = Items.UnitId,
       UnitCode = Units.Code
  from Detail
  join Items on Items.ItemId = Detail.ItemId
  join Inserted on Inserted.ItemId = Items.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.EndDate > getdate()
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where PO.POId is null
end

if update(ListPrice)
begin
  Update CrossRefs
     set GrossPrice = inserted.ListPrice,
         CatalogPrice = inserted.ListPrice
    from inserted
    join Items on Items.ItemId = inserted.ItemId
    join Category on Category.CategoryId = Items.CategoryId
                 and Category.Type = 2
    join CrossRefs on CrossRefs.ItemId = Items.ItemId
                  and CrossRefs.Active = 1
    join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                and Catalog.Active = 1
   where CrossRefs.GrossPrice != inserted.ListPrice
end
set nocount off
```

### `dbo.Keywords` &mdash; `trig_Keywords`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2009-11-17 &middot; **Modified:** 2019-08-03 &middot; **Also tagged:** cascade

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[trig_Keywords] 
   ON  [dbo].[Keywords] 
   AFTER INSERT,UPDATE not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    Update Keywords
       set Keyword = replace(inserted.Keyword,'\','')
	      ,DateUpdated = getdate()	
      from Keywords
      join inserted on inserted.KeywordId = Keywords.KeywordId
      
END
```

### `dbo.OrderBooks` &mdash; `trig_OrderBookCreate`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-29 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** cascade

```sql
CREATE trigger trig_OrderBookCreate on dbo.OrderBooks 
for insert not for replication as
set nocount on
update OrderBooks
   set OrderBookCreated = getdate()
  from OrderBooks
  join inserted on inserted.OrderBookId = OrderBooks.OrderBookId
set nocount off
```

### `dbo.Requisitions` &mdash; `trig_RequisitionsUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-11-16 &middot; **Modified:** 2025-06-26 &middot; **Also tagged:** validation, cascade

```sql
CREATE TRIGGER [dbo].[trig_RequisitionsUpdate] on [dbo].[Requisitions] 
for INSERT, UPDATE not for replication 
AS

declare @StatusId int,
	@DetailLines int,
	@POCount int

set nocount on

if Update(CategoryId)
begin
  select @DetailLines = count(*)
    from Inserted
    join Requisitions on Requisitions.RequisitionId = Inserted.RequisitionId
    join Detail on Detail.RequisitionId = Requisitions.RequisitionId
--               and Detail.Active = 1

  if @DetailLines != 0
  begin
    raiserror('You cannot change a Requisitions Category with Detail Attached.',16,1)
--    rollback
    return
  end
end

if Update(CategoryId) or Update(BudgetId)
begin
  select @POCount = count(*)
    from Inserted
    join Requisitions on Requisitions.RequisitionId = Inserted.RequisitionId
    join PO on PO.RequisitionId = Requisitions.RequisitionId

  if @POCount != 0
  begin
    raiserror('You cannot change a Requisition after PO''s have been created.',16,1)
--    rollback
    return
  end
    
  -- Check for Req Locked
  update Requisitions
     set BidHeaderId = (select top 1 bh.BidHeaderId
                          from BidHeaders bh with (nolock)
                          join Bids on Bids.BidHeaderId = bh.BidHeaderId
                                   and Bids.Active = 1
                          join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                                                 and DistrictCategories.CategoryId = bh.CategoryId
                                                 and DistrictCategories.Active = 1
--                                                 and isnull(DistrictCategories.AllowAddenda,0) = case Requisitions.CategoryId when 12 then isnull(DistrictCategories.AllowAddenda,0) when 15 then isnull(DistrictCategories.AllowAddenda,0) when 44 then isnull(DistrictCategories.AllowAddenda,0) when 47 then isnull(DistrictCategories.AllowAddenda,0) when 48 then isnull(DistrictCategories.AllowAddenda,0) when 51 then isnull(DistrictCategories.AllowAddenda,0) when 54 then isnull(DistrictCategories.AllowAddenda,0) when 59 then isnull(DistrictCategories.AllowAddenda,0) when 74 then isnull(DistrictCategories.AllowAddenda,0) when 76 then isnull(DistrictCategories.AllowAddenda,0) when 77 then isnull(DistrictCategories.AllowAddenda,0) when 80 then isnull(DistrictCategories.AllowAddenda,0) when 91 then isnull(DistrictCategories.AllowAddenda,0) else 0 end
--                                                 and isnull(DistrictCategories.AllowAddenda,0) = case when Requisitions.CategoryId in (12, 15, 44, 47, 48, 51, 54, 55, 59, 74, 76, 77, 80, 91) then isnull(DistrictCategories.AllowAddenda,0) else 0 end
                          join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
                                         and PPCategory.CategoryId = bh.CategoryId
                          join Category on Category.CategoryId = bh.CategoryId
                          join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
                                         and DistrictPP.DistrictId = Budgets.DistrictId
                         where bh.CategoryId = Requisitions.CategoryId
                           and bh.Active = 1 
                           and bh.BidType = 1
                           and isnull(bh.ParentBidHeaderId,0) = 0 -- 7/9/14 DCH Added to correctly assign Multiple PreBids
--                           and bh.BidAwardDate between dateadd(year,-1,Budgets.StartDate) and dateadd(year,-1,Budgets.EndDate)
/* DCH Change 10/6/14 Early Access                           and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil */
                           and getdate() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or Users.ApprovalLevel > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
        and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
                           and isnull(bh.DistrictId,0) = case isnull(Category.Type,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
                         order by bh.BidHeaderId desc),
         OrderType = case when getdate() > Budgets.AnnualCutoff then 2 else 1 end
    from Budgets with (updlock,rowlock)
    join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
    join Inserted on Inserted.RequisitionId = Requisitions.RequisitionId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
                           and DistrictCategories.Active = 1
    left outer join Deleted on Deleted.RequisitionId = Requisitions.RequisitionId
    left outer join Users on Users.UserId = Requisitions.UserId
   where isnull(Requisitions.CategoryId,0) != isnull((select top 1 CategoryId
                                                        from BidHeaders bh1
                                                       where bh1.BidHeaderId = deleted.BidHeaderId),0)
      or (isnull(DistrictCategories.AllowAddenda,0) = case Requisitions.CategoryId when 12 then isnull(DistrictCategories.AllowAddenda,0) when 15 then isnull(DistrictCategories.AllowAddenda,0) when 44 then isnull(DistrictCategories.AllowAddenda,0) when 47 then isnull(DistrictCategories.AllowAddenda,0) when 48 then isnull(DistrictCategories.AllowAddenda,0) when 51 then isnull(DistrictCategories.AllowAddenda,0) when 54 then isnull(DistrictCategories.AllowAddenda,0) when 59 then isnull(DistrictCategories.AllowAddenda,0) when 74 then isnull(DistrictCategories.AllowAddenda,0) when 76 then isnull(DistrictCategories.AllowAddenda,0) when 77 then isnull(DistrictCategories.AllowAddenda,0) when 80 then isnull(DistrictCategories.AllowAddenda,0) when 91 then isnull(DistrictCategories.AllowAddenda,0) else 0 end)
end

if update(BidHeaderId)
begin
  Update Detail
     set ReProc = 1
    from Detail with (updlock,rowlock) /*with (nolock)*/
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join Inserted on Inserted.RequisitionId = Requisitions.RequisitionId
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null

  -- Update Req Costs
  update Requisitions
     set TotalItemsCost = isnull((select sum(isnull(Quantity,0) * round(isnull(BidPrice,0),2)) from Detail with (nolock) where Detail.RequisitionId = Requisitions.RequisitionId),0),
         DateUpdated = getdate()
    from Requisitions with (updlock,rowlock) /*with (nolock)*/
    join (
      select RequisitionId 
        from inserted 
       union (
         select RequisitionId 
           from deleted)
          ) ss on ss.RequisitionId = Requisitions.RequisitionId
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where PO.POId is null
end

if update(TotalItemsCost) or update(ShippingCost) or Update(ShippingPercent) or Update(BudgetAccountId) or Update(UserAccountId) or Update(OrderType) or Update(AdditionalShippingCost)
begin
-- Update Total Requisition Cost
  update Requisitions
     set TotalRequisitionCost = isnull(inserted.TotalItemsCost,0) + coalesce(sc.ShippingCost,inserted.ShippingCost,0) + isnull(det.ShippingCost,0) + (isnull(inserted.ShippingPercent,0) * isnull(inserted.TotalItemsCost,0)),
         DateUpdated = getdate(),
         AddendaTotal =isnull((select sum(isnull(Detail.Quantity,0) * round(isnull(Detail.BidPrice,0),2)) 
                                 from Detail with (nolock) 
                                 left outer join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691)
                                 left outer join BidHeaders bh on bh.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end 
                                where Detail.RequisitionId = Requisitions.RequisitionId 
                                  and case 
                                        when isnull(Detail.ItemMustBeBid,0) = 0
                                         and ISNULL(Vendors.Code,'0000') = '0000' then 'NoBid'
                                        when isnull(Detail.ItemMustBeBid,0) = 0
                                         and (   (ISNULL(Detail.BidItemId,0) != 0
                                         and (   ISNULL(bh.BidType,2) = 1
                                              or Detail.AddedFromAddenda is not null))
                                              or (ISNULL(Detail.BidItemId,0) = 0)) then 'Main'
                                        else 'Addenda' 
                                      end = 'Addenda'),0),
        ShippingCost = sc.ShippingCost,
		AdditionalFreight = det.AdditionalFreight,
		AdditionalShippingCost = det.ShippingCost,
	    LowPOCount = (select COUNT(*) 
					    from (
						  select VendorId
						    from Detail 
						   where Detail.RequisitionId = Requisitions.RequisitionId
							 and isnull(Detail.ItemMustBeBid,0) = 0
							 and ISNULL(District.MinimumPOAmount,0) > 0
							 and Detail.VendorId != 7691
						    group by VendorId
						    having sum(Detail.Quantity * Detail.BidPrice) < District.MinimumPOAmount) spoc)
    from inserted with (updlock,rowlock)
    join Requisitions on Requisitions.RequisitionId = inserted.RequisitionId
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join District on District.DistrictId = Budgets.DistrictId
	outer apply (select sum(coalesce(rsc.ShippingCost,0)) ShippingCost
                          from vw_RequisitionShippingCosts rsc with (nolock) 
                         where rsc.RequisitionId = Requisitions.RequisitionId) sc
	outer apply (select max(case 
	                          when Detail.AdditionalShipping = 1 then 
							  case 
							    when Detail.ShippingUpdated is null or coalesce(Detail.ShippingQuantity,0) != coalesce(Detail.Quantity,0) or coalesce(Detail.ShippingCost,0) = 0 then 2 
								else 1
							  end 
							else 0 
						  end) AdditionalFreight,
						sum(case when Detail.AdditionalShipping = 1 then isnull(Detail.ShippingCost,0) else 0 end) ShippingCost
				   from Detail 
				  where Detail.RequisitionId = Requisitions.RequisitionId 
				    and Detail.AdditionalShipping = 1) det
-- Process Requisitions and Update their Budget Account Records 
  update BudgetAccounts
     set AmountAvailable = isnull(AmountAvailable,0) + 1
    from BudgetAccounts with (updlock,rowlock) 
    join (select BudgetAccountId 
            from inserted 
          union (
            select BudgetAccountId 
              from deleted)
          ) ss on ss.BudgetAccountId = BudgetAccounts.BudgetAccountId
   where BudgetAccounts.UseAllocations = 1

-- Process Updated Requisitions and Update their User Account Records but the BudgetAccountId did not change
  update UserAccounts
     set AllocationAvailable = isnull(AllocationAvailable,0) + 1
    from UserAccounts with (updlock,rowlock) 
    join (select UserAccountId 
            from inserted 
          union (
            select UserAccountId 
              from deleted)
          ) ss on ss.UserAccountId = UserAccounts.UserAccountId
   where UserAccounts.UseAllocations = 1
end

set nocount off
```

### `dbo.TMSurvey` &mdash; `TMSurvey_Trig`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2011-10-19 &middot; **Modified:** 2018-07-27 &middot; **Also tagged:** cascade

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[TMSurvey_Trig] 
   ON  [dbo].[TMSurvey] 
   AFTER INSERT not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    Update TMSurvey
       set CountyId = Counties.CountyId,
           Started = getdate()
      from TMSurvey
      join inserted on inserted.TMSurveyId = TMSurvey.TMSurveyId
      join District on District.DistrictId = inserted.DistrictId
      join Counties on Counties.State = District.State
                   and Counties.Name = District.County

    insert TMSurveyResults (TMSurveyId, BidTradeCountyId, TMVendorId)
      select TMSurvey.TMSurveyId, av.BidTradeCountyId, av.VendorId
	    from BidTrades with (nolock)
	    join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
	    join Counties on Counties.CountyId = BidTradeCounties.CountyId
	    join TMSurvey on TMSurvey.CountyId = Counties.CountyId
	    join BidHeaders on BidHeaders.BidHeaderId = BidTrades.BidHeaderId
					   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
        join inserted on inserted.TMSurveyId = TMSurvey.TMSurveyId
        left outer join vw_TMTradesAwardedVendors av on av.BidHeaderId = BidHeaders.BidHeaderId
		                                            and av.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
	  where not exists(select TMSurveyResults.TMSurveyResultId from TMSurveyResults where TMSurveyResults.TMSurveyId = TMSurvey.TMSurveyId and TMSurveyResults.TMVendorId = av.VendorId)
	    and av.VendorId is not null
END
```

### `dbo.Users` &mdash; `trig_UsersUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2019-12-22 &middot; **Modified:** 2019-12-22 &middot; **Also tagged:** cascade

```sql
CREATE trigger [dbo].[trig_UsersUpdate] on dbo.Users for insert, update not for replication as
begin
declare @ShippingId int

 set nocount on
   Update Users
      set ShippingId = coalesce(inserted.ShippingId,School.ShippingId),
          NewRequisitionButton = coalesce(inserted.NewRequisitionButton,1),
          CometId = case 
                      when coalesce(inserted.CometId,0) = 0 then
                        cast(NextUser.UserNumber as int)
                      else
                        inserted.CometId
                    end,
          Password = case 
                      when isnull(inserted.Password,'') = '' then
                        NextUser.UserNumber
                      else
                        inserted.Password
                    end,
          UserName = case 
                      when isnull(inserted.UserName,'') = '' then
                        NextUser.UserNumber
                      else
                        inserted.UserName
                    end,
          UseCF = 1,--case isnull(Deleted.UserId,0) when 0 then 1 else inserted.UseCF end
		  AllowIncidentals = coalesce(inserted.AllowIncidentals,1)
     from inserted
     join Users on Users.UserId = inserted.UserId
               and (isnull(Users.ShippingId,0) = 0 or isnull(Users.CometId,0) = 0)
     join School on School.SchoolId = Users.SchoolId
     left outer join deleted on deleted.UserId = inserted.UserId
	 outer apply (select right('00000' + cast(ISNULL(
                          (SELECT top 1 isnull(s1.CometId,0) + 1
                             FROM Users s1
                             LEFT JOIN Users s2 ON s2.DistrictId = s1.DistrictId 
                                               and s2.CometId - 1 = s1.CometId 
                            WHERE s1.CometId >= 10000
                              and s1.CometId is not null
                              and s1.DistrictId = inserted.DistrictId
                              and s2.CometId IS NULL
                            order by s1.CometId),
                          (select ((isnull(inserted.SchoolId,0) & 0x3f) + 10) * 1000 )) as varchar),5) UserNumber) NextUser

Update SecurityRoleUsers
   set SecurityRoleId = case 
                          when isnull(Users.ApprovalLevel,0) = 0 then 1
                          when isnull(Users.ApprovalLevel,0) = 1 then 2
                          when isnull(Users.ApprovalLevel,0) = 2 then 4
                          when isnull(Users.ApprovalLevel,0) > 2 then 3
                        end
  from SecurityRoleUsers
  join Users on Users.UserId = SecurityRoleUsers.UserId
  join inserted on inserted.userid = Users.UserId
 where SecurityRoleUsers.SecurityRoleId != case 
                          when isnull(Users.ApprovalLevel,0) = 0 then 1
                          when isnull(Users.ApprovalLevel,0) = 1 then 2
                          when isnull(Users.ApprovalLevel,0) = 2 then 4
                          when isnull(Users.ApprovalLevel,0) > 2 then 3
                        end
                        
insert SecurityRoleUsers (SecurityRoleId, UserId)
  select case 
           when isnull(Users.ApprovalLevel,0) = 0 then 1
           when isnull(Users.ApprovalLevel,0) = 1 then 2
           when isnull(Users.ApprovalLevel,0) = 2 then 4
           when isnull(Users.ApprovalLevel,0) > 2 then 3
         end, Users.UserId
    from Users
    join inserted on inserted.userid = Users.UserId
    join District on District.DistrictId = Users.DistrictId
                 and District.Active = 1
    left outer join SecurityRoleUsers sru on sru.UserId = Users.UserId
   where Users.Active = 1
     and sru.SecurityRoleUserId is null

Update Users
   set SecurityRoleId = sru.SecurityRoleId
  from Users
  join inserted on inserted.userid = Users.UserId
  join SecurityRoleUsers sru on sru.UserId = Users.UserId

if update(SchoolId)
begin
  Update Users
     set ShippingId = School.ShippingId
    from inserted
    join Users on Users.UserId = inserted.UserId
    join School on School.SchoolId = Users.SchoolId
    join deleted on deleted.UserId = inserted.UserId
   where inserted.SchoolId != deleted.SchoolId
 /* Below Added by DCH on 6/8/15 to solve moving Reqs by District Interface */  
  Update Requisitions
     set ShippingId = coalesce(inserted.ShippingId, Users.ShippingId)
    from inserted
    join Users on Users.UserId = inserted.UserId
    join Requisitions on Requisitions.UserId = Users.UserId
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                and getdate() between Budgets.EditFrom and Budgets.EditUntil
    join deleted on deleted.UserId = inserted.UserId
   where Requisitions.ShippingId = coalesce(deleted.ShippingId,Requisitions.ShippingId)
end

set nocount off
end
```

## Audit / history (1)

> Writes to an audit, history, or log table, or is explicitly named as an audit trigger.

### `dbo.Category` &mdash; `TRIG_CategoryCode`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2009-09-09 &middot; **Also tagged:** cascade

```sql
CREATE trigger [dbo].[TRIG_CategoryCode] on [dbo].[Category]
after insert, update not for replication 
as

set nocount on

/*
if Update(Code) and not Update(EDSId)
begin
  update Category
     set EDSId = ascii(inserted.Code)
    from Category
    join inserted on inserted.CategoryId = Category.CategoryId
end

if Update(EDSId) and not Update(Code)
begin
  update Category
     set Code = char(inserted.EDSId)
    from Category
    join inserted on inserted.CategoryId = Category.CategoryId
end
*/
/* Add Catalog 'EDS' for Category */
insert Catalog (Active, CategoryId, VendorId, Name)
select 1, Category.CategoryId, 7853, 'EDS'
  from Category with (nolock)
  join inserted on inserted.CategoryId = Category.CategoryId
  left outer join Catalog on Catalog.CategoryId = Category.CategoryId
                         and Catalog.Name = 'EDS'
                         and Catalog.Active = 1
 where Category.Active = 1
   and Catalog.CatalogId is null

set nocount off
```

## Cascade / derived data (23)

> Propagates changes to related tables — inserts child rows, updates denormalised counts, or synchronises derived columns.

### `dbo.Approvals` &mdash; `trig_Approvals`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-09-13 &middot; **Modified:** 2015-12-23 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [trig_Approvals] 
   ON  [Approvals] 
   AFTER INSERT,DELETE,UPDATE not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    update r
       set ApprovalCount = isnull(s1.ApprovalsCount,0)
      from Requisitions r
      left outer join (
        select ss.RequisitionId, count(*) ApprovalsCount
          from (
	        select ap.RequisitionId, ap.ApprovalId
		      from Approvals ap with (nolock)
			  left outer join deleted on deleted.ApprovalId = ap.ApprovalId
	          left outer join inserted on inserted.ApprovalId = ap.ApprovalId
			 where (   deleted.ApprovalId is null
				    or (    deleted.ApprovalId is not null
					    and inserted.ApprovalId is not null))
			union (
	          select inserted.RequisitionId, inserted.ApprovalId
		        from inserted
			   where inserted.ApprovalId is null)
				) ss 
		 group by ss.RequisitionId
		 ) s1 on s1.RequisitionId = r.RequisitionId
	 where r.RequisitionId in (select inserted.RequisitionId from inserted union (select deleted.RequisitionId from deleted))
END
```

### `dbo.AwardsCatalogList` &mdash; `trig_AwardsCatalogListUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** —

```sql
CREATE trigger trig_AwardsCatalogListUpdate on dbo.AwardsCatalogList for insert, update not for replication as

set nocount on

if update(CatalogId) or update(DiscountRate)
begin
  if update(CatalogId)
  begin
    Update Awards
       set CatalogId = (select top 1 inserted.CatalogId from AwardsCatalogList with (nolock) join inserted on inserted.AwardCatalogId = AwardsCatalogList.AwardCatalogId where AwardsCatalogList.AwardId = Awards.AwardId order by inserted.CatalogId desc)
      from AwardsCatalogList
      join inserted on inserted.AwardCatalogId = AwardsCatalogList.AwardCatalogId
      join Awards on Awards.AwardId = AwardsCatalogList.AwardId
  end
  if update(DiscountRate)
  begin
    Update Awards
       set DiscountRate = (select top 1 inserted.DiscountRate from AwardsCatalogList with (nolock) join inserted on inserted.AwardCatalogId = AwardsCatalogList.AwardCatalogId where AwardsCatalogList.AwardId = Awards.AwardId order by inserted.CatalogId desc)
      from AwardsCatalogList
      join inserted on inserted.AwardCatalogId = AwardsCatalogList.AwardCatalogId
      join Awards on Awards.AwardId = AwardsCatalogList.AwardId
  end
/*
Update Detail
   set Reproc = 1
  from Inserted with (nolock)
  join AwardsCatalogList on AwardsCatalogList.AwardCatalogId = Inserted.AwardCatalogId
  join Awards on Awards.AwardId = AwardsCatalogList.AwardId 
  join Bids on Bids.BidId = Awards.BidId
  join BidItems on BidItems.BidId = Bids.BidId
  join Detail on Detail.ItemId = BidItems.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                 and BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                 and BidHeaders.UpdateHold is null
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where PO.POId is null
*/
end

set nocount off
```

### `dbo.BidAnswers` &mdash; `BidAnswers_trig`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[BidAnswers_trig]
   ON  dbo.BidAnswers
   AFTER INSERT NOT for Replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    insert BidImportCounties (BidImportId, BidTradeCountyId, Active)
      select BidImports.BidImportId, BidTradeCounties.BidTradeCountyId, 1
        from inserted
        join BidAnswers on BidAnswers.BidAnswerId = inserted.BidAnswerId
        join BidImports on BidImports.BidImportId = BidAnswers.BidImportId
        join BidTradeCounties on BidTradeCounties.CountyId = BidAnswers.CountyId
                             and BidTradeCounties.BidTradeId = BidAnswers.BidTradeId
        left outer join BidImportCounties on BidImportCounties.BidImportId = BidImports.BidImportId
                                         and BidImportCounties.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
       where BidImportCounties.BidImportCountyId is null
       group by BidImports.BidImportId, BidTradeCounties.BidTradeCountyId

END
```

### `dbo.BidMSRPResults` &mdash; `trig_BidMSRPResults`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
CREATE  trigger [dbo].[trig_BidMSRPResults] on dbo.BidMSRPResults
for insert, update not for replication 
as

set nocount on

update BidMSRPResults
   set BidHeaderKey = IsNull(BidMSRPResults.BidHeaderKey,(Select BidHeaderKey From BidHeaders Where BidHeaders.BidHeaderId = BidMSRPResults.BidHeaderID))
  from Inserted
  join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = Inserted.BidMSRPResultsId

/*
if update(ManufacturerId)
begin
  update BidMSRPResults
     set WriteInFlag = case 
                         when BidRequestManufacturer.ManufacturerId is null then 1 
                         else 0 
                       end, 
         BidRequestManufacturerId = isnull(BidRequestManufacturer.BidRequestManufacturerId,0)
    from Inserted
    left outer join BidRequestManufacturer on BidRequestManufacturer.BidRequestManufacturerId =
      (select top 1 BidRequestManufacturerId
         from BidRequestManufacturer brm
        where brm.Active = 1
          and brm.BidHeaderId = inserted.BidHeaderId
          and brm.ManufacturerId = inserted.ManufacturerId
        order by BidRequestManufacturerId
      ) 
     where BidMSRPResults.BidMSRPResultsId = Inserted.BidMSRPResultsId
end
*/

set nocount off
```

### `dbo.BidRequestItems_Orig` &mdash; `trig_BidRequestItems`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2021-08-14 &middot; **Modified:** 2021-08-14 &middot; **Also tagged:** —

```sql
CREATE trigger [dbo].[trig_BidRequestItems] On dbo.BidRequestItems
for insert, update not for replication 
as

set nocount on

if update(BidHeaderId)
begin
update BidRequestItems
   set BidHeaderKey = IsNull(BidRequestItems.BidHeaderKey,(Select BidHeaderKey From BidHeaders Where BidHeaders.BidHeaderId = BidRequestItems.BidHeaderID))
  from Inserted
  join BidRequestItems on BidRequestItems.BidRequestItemId = Inserted.BidRequestItemId
end
```

### `dbo.BidRequestManufacturer` &mdash; `trig_BidRequestManufacturer`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
CREATE trigger [dbo].[trig_BidRequestManufacturer] on dbo.BidRequestManufacturer
for insert, update not for replication 
as

set nocount on

update BidRequestManufacturer
   set BidHeaderKey = IsNull(BidRequestManufacturer.BidHeaderKey,(Select BidHeaderKey From BidHeaders Where BidHeaders.BidHeaderId = BidRequestManufacturer.BidHeaderID))
  from Inserted
  join BidRequestManufacturer on BidRequestManufacturer.BidRequestManufacturerId = Inserted.BidRequestManufacturerId
```

### `dbo.BidsCatalogList` &mdash; `trig_BCLUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** —

```sql
CREATE trigger trig_BCLUpdate on dbo.BidsCatalogList for insert, update not for replication as
set nocount on

Update Bids
   set CatalogId = (select top 1 CatalogId from inserted with (nolock) where inserted.BidId = Bids.BidId order by inserted.CatalogId desc)
  from inserted
  join Bids on Bids.BidId = inserted.BidId
           and Bids.Active = 1

set nocount off
```

### `dbo.BudgetAccounts` &mdash; `trig_BudgetAccountUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2025-06-26 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_BudgetAccountUpdate] ON [dbo].[BudgetAccounts] 
for INSERT, UPDATE not for replication 
AS
set nocount on
if update(UseAllocations) or update(BudgetAmount) or Update(AmountAvailable)
begin
-- Process Requisitions and Update their Budget Account Records 
  update BudgetAccounts
     set AmountAvailable = isnull(BudgetAmount,0) - isnull((select sum(isnull(TotalRequisitionCost,0)) from Requisitions where Requisitions.BudgetAccountId = BudgetAccounts.BudgetAccountId),0)
    from BudgetAccounts with (updlock,rowlock) 
    join (select BudgetAccountId 
            from inserted 
          union (
            select BudgetAccountId 
              from deleted)
          ) ss on ss.BudgetAccountId = BudgetAccounts.BudgetAccountId
   where BudgetAccounts.UseAllocations = 1
end

set nocount off
```

### `dbo.Category` &mdash; `TRIG_DistrictCategoriesCategory`

**Events:** DELETE, INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2009-03-25 &middot; **Also tagged:** —

```sql
CREATE trigger dbo.TRIG_DistrictCategoriesCategory on dbo.Category
after insert, delete not for replication 
as

set nocount on

insert DistrictCategories (Active, CategoryId, DistrictId)
  select case isnull(inserted.AllowAddenda,0) when 0 then 1 else 0 end, inserted.CategoryId, District.DistrictId
    from inserted with (nolock)
    join District on District.Active = 1
 order by inserted.CategoryId, District.DistrictId

delete DistrictCategories
  from DistrictCategories
  join deleted on deleted.CategoryId = DistrictCategories.CategoryId

set nocount off
```

### `dbo.Detail` &mdash; `trig_DetailDelete`

**Events:** DELETE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-11-16 &middot; **Modified:** 2025-06-26 &middot; **Also tagged:** —

```sql
CREATE   TRIGGER [dbo].[trig_DetailDelete] ON [dbo].[Detail] 
after DELETE not for replication 
AS
set nocount on
declare @FrozenReqs table (RequisitionId int not null primary key)

  -- Build List of Frozen Reqs
  insert @FrozenReqs (RequisitionId)
	select Requisitions.RequisitionId
	  from inserted
      join Detail on Detail.DetailId = inserted.DetailId
      join Requisitions on Requisitions.RequisitionId = coalesce(inserted.RequisitionId, Detail.RequisitionId)
	  outer apply (Select top 1 PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId) p
	  outer apply (Select top 1 Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45,49)) ap
	 where p.POId is not null
	    or ap.ApprovalId is not null
	 group by Requisitions.RequisitionId

  update Requisitions
     set TotalItemsCost = isnull((select sum(isnull(Quantity,0) * round(isnull(BidPrice,0),2)) 
                             from Detail with (nolock) 
                             join Requisitions r1 on r1.RequisitionId = Detail.RequisitionId
--                             left outer join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                            where Detail.RequisitionId = Requisitions.RequisitionId
--                              and isnull(Detail.ItemMustBeBid,0) = 0
--                              and (   Detail.AddedFromAddenda is not null
--                                   or isnull(BidHeaders.BidType,2) = 1)
							),0),
         ShippingCost = (select sum(ShippingCost) 
                           from vw_RequisitionShippingCosts rsc with (nolock)
                          where rsc.RequisitionId = Requisitions.RequisitionId)
    from Requisitions with (updlock,rowlock)
    join (
      select RequisitionId 
        from deleted
          ) ss on ss.RequisitionId = Requisitions.RequisitionId
   where not exists(select RequisitionId from @FrozenReqs f where f.RequisitionId = Requisitions.RequisitionId)
set nocount off
```

### `dbo.District` &mdash; `TRIG_District`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2019-08-23 &middot; **Modified:** 2019-08-23 &middot; **Also tagged:** —

```sql
CREATE trigger [dbo].[TRIG_District] on [dbo].[District]
for insert, update not for replication 
as
set nocount on

if update(MinimumPOAmount)
begin
	update District
	   set MinimumPOAmount = coalesce(inserted.MinimumPOAmount,15.00)
	  from inserted
	  join District on District.DistrictId = inserted.DistrictId
end

set nocount off
```

### `dbo.DistrictCharges` &mdash; `trig_DistrictCharges`

**Events:** UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2018-05-10 &middot; **Modified:** 2023-11-27 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE   TRIGGER [dbo].[trig_DistrictCharges]
   ON  [dbo].[DistrictCharges] 
   AFTER update
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
/*
    -- Insert statements for trigger here
update DistrictProposedCharges
   set Amount = DistrictCharges.Amount
--select *
  from DistrictCharges
  join inserted on inserted.DistrictChargeId = DistrictCharges.DistrictChargeId
  join DistrictProposedCharges on DistrictProposedCharges.BudgetId = DistrictCharges.BudgetId
                                         and DistrictProposedCharges.ChargeTypeId = DistrictCharges.ChargeTypeId
 where coalesce(DistrictCharges.Amount,0) != coalesce(DistrictProposedCharges.Amount,0)
*/
END
```

### `dbo.MSDS` &mdash; `trig_MSDSInserted`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2013-07-16 &middot; **Modified:** 2013-07-30 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_MSDSInserted] ON [dbo].[MSDS]
for insert not for replication
AS 

set nocount on

update MSDS
   set CurrentVersionMSDSId = MSDS.MSDSId
  from Inserted
  join MSDS on MSDS.MSDSId = Inserted.MSDSId
  where Isnull(Inserted.CurrentVersionMSDSId,0)=0
  
set nocount off
```

### `dbo.PricingAddenda` &mdash; `trig_PricingAddenda`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2020-02-28 &middot; **Modified:** 2020-02-28 &middot; **Also tagged:** —

```sql
create trigger trig_PricingAddenda on PricingAddenda for insert, update as
	update PricingAddenda
	   set AllStringFields = coalesce(trim(inserted.FullDescription),'') + ' '
							+coalesce(trim(inserted.ItemCode),'') + ' '
							+coalesce(trim(inserted.VendorItemCode),'') + ' '
							+coalesce(trim(inserted.Manufacturer),'') + ' '
							+coalesce(trim(inserted.ManufacturerPartNumber),'') + ' '
							+coalesce(trim(inserted.ItemHeading),'') + ' '
							+coalesce(trim(inserted.ItemKeyword),'') + ' '
		from inserted
		join PricingAddenda on PricingAddenda.PricingAddendaId = inserted.PricingAddendaId
```

### `dbo.RequisitionNotes` &mdash; `trig_RequisitionNotes`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-09-12 &middot; **Modified:** 2015-12-23 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [trig_RequisitionNotes] 
   ON  [RequisitionNotes]
   AFTER INSERT,DELETE,UPDATE not for replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    update r
       set NotesCount = isnull(s1.NoteCount,0)
      from Requisitions r
      left outer join (
        select ss.RequisitionId, count(*) NoteCount
          from (
	        select rn.RequisitionId, rn.RequisitionNoteID 
		      from RequisitionNotes rn with (nolock)
			  left outer join deleted on deleted.RequisitionNoteID = rn.RequisitionNoteID
	          left outer join inserted on inserted.RequisitionNoteId = rn.RequisitionNoteID
			 where (   deleted.RequisitionNoteID is null
				    or (    deleted.RequisitionNoteId is not null
					    and inserted.RequisitionNoteId is not null))
			union (
	          select inserted.RequisitionId, inserted.RequisitionNoteId
		        from inserted
			   where inserted.RequisitionNoteId is null)
				) ss 
		 group by ss.RequisitionId
		 ) s1 on s1.RequisitionId = r.RequisitionId
     where r.RequisitionId in (select inserted.RequisitionId from inserted union (select deleted.RequisitionId from deleted))
END
```

### `dbo.Requisitions` &mdash; `trig_RequisitionsDelete`

**Events:** DELETE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-11-16 &middot; **Modified:** 2025-06-26 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_RequisitionsDelete] ON [dbo].[Requisitions] 
for DELETE not for replication 
AS
set nocount on
-- Process Deleted Requisitions and Update their Budget Account Records
Update BudgetAccounts
   set AmountAvailable = AmountAvailable - 1
  from BudgetAccounts with (updlock,rowlock)
  join deleted on deleted.BudgetAccountId = BudgetAccounts.BudgetAccountId
 where BudgetAccounts.UseAllocations = 1

-- Process Deleted Requisitions and Update their User Account Records
Update UserAccounts
   set AllocationAvailable = AllocationAvailable - 1
  from UserAccounts with (updlock,rowlock)
  join deleted on deleted.UserAccountId = UserAccounts.UserAccountId
 where UserAccounts.UseAllocations = 1

set nocount off
```

### `dbo.RTK_CASFile` &mdash; `trig_SetSpecialHealthHazard`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-05-16 &middot; **Modified:** 2012-05-16 &middot; **Also tagged:** —

```sql
CREATE Trigger trig_SetSpecialHealthHazard
On dbo.RTK_CASFile
after Insert, Update not for replication 
As
set nocount on

if Update(Carcinogen) or Update(Mutagen) or Update(Teratogen) or Update(Corrosive) or
   Update(F4_Flammable4th) or Update(F3_Flammable3rd) or Update(R4_Reactive4th) or Update(R3_Reactive3rd) or Update(R2_Reactive2nd)
begin
  update RTK_CASFile
     set SpecialHealthHazard = case isnull(RTK_CASFile.Carcinogen,0) + isnull(RTK_CASFile.Mutagen,0) + isnull(RTK_CASFile.Teratogen,0) + isnull(RTK_CASFile.Corrosive,0) 
          + isnull(RTK_CASFile.F4_Flammable4th,0)  + isnull(RTK_CASFile.F3_Flammable3rd,0)  + isnull(RTK_CASFile.R4_Reactive4th,0)  + isnull(RTK_CASFile.R3_Reactive3rd,0)  + isnull(RTK_CASFile.R2_Reactive2nd,0) when 0 then 0 else 1 end,
         SpecialHealthHazardCodes = case isnull(RTK_CASFile.Carcinogen,0) when 0 then '' else 'CA ' end
                                  + case isnull(RTK_CASFile.Mutagen,0) when 0 then '' else 'MU ' end 
                                  + case isnull(RTK_CASFile.Teratogen,0) when 0 then '' else 'TE ' end 
                                  + case isnull(RTK_CASFile.Corrosive,0) when 0 then '' else 'CO ' end 
                                  + case isnull(RTK_CASFile.F4_Flammable4th,0) when 0 then '' else 'F4 ' end 
                                  + case isnull(RTK_CASFile.F3_Flammable3rd,0) when 0 then '' else 'F3 ' end 
                                  + case isnull(RTK_CASFile.R4_Reactive4th,0) when 0 then '' else 'R4 ' end 
                                  + case isnull(RTK_CASFile.R3_Reactive3rd,0) when 0 then '' else 'R3 ' end 
                                  + case isnull(RTK_CASFile.R2_Reactive2nd,0) when 0 then '' else 'R2 ' end 
    from RTK_CASFile
    join inserted on inserted.RTK_CASFileId = RTK_CASFile.RTK_CASFileId
end

set nocount off
```

### `dbo.RTK_Items` &mdash; `trig_MSDS`

**Events:** INSERT &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [trig_MSDS] ON dbo.RTK_Items 
FOR INSERT not for replication 
AS
set nocount on

update Items
Set RTK=1
from Items
join inserted on inserted.itemid=items.itemid
where isnull(items.RTK,0) != 1

set nocount off
```

### `dbo.RTK_Items` &mdash; `trig_RTK_Items_ReportItems`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2015-12-21 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_RTK_Items_ReportItems] ON dbo.RTK_Items 
FOR INSERT, UPDATE, DELETE not for replication 
AS
set nocount on

-- NOTE: For this to work, do not allow duplicates in the RTK_Items table based on CategoryId and ItemId

-- clear existing links on an update or delete
if not update(ItemId) and not update(CategoryId)
begin
update RTK_ReportItems
   set RTK_ItemsId = Null
  from RTK_ReportItems
  join Deleted on Deleted.RTK_ItemsId = RTK_ReportItems.RTK_ItemsId
end

if update(ItemId) or update(CategoryId)
begin
  -- set links based on update or insert
  update RTK_ReportItems
     set RTK_ItemsId = Inserted.RTK_ItemsId
    from RTK_ReportItems
    join Inserted on Inserted.ItemId = RTK_ReportItems.ItemId   
                 and Inserted.CategoryId = RTK_ReportItems.CategoryId 
   where isnull(Inserted.ItemId,0) != 0  -- do no include items that are NOT mapped to an edsiq item            
end  

set nocount off
```

### `dbo.RTK_ReportItems` &mdash; `trig_RTK_ReportItems`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2013-08-13 &middot; **Modified:** 2013-08-13 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[trig_RTK_ReportItems] ON [dbo].[RTK_ReportItems]
for insert, update not for replication
AS 

set nocount on

update RTK_ReportItems
   set RTK_ItemsId = RTK_Items.RTK_ItemsId
  from Inserted
  join RTK_Items on RTK_Items.ItemId = Inserted.ItemId          -- Note: data exists where the current categoryId has changed
                and RTK_Items.CategoryId = Inserted.CategoryId  --       and does not match old data.
 where RTK_ReportItems.RTK_ReportItemsId = Inserted.RTK_ReportItemsId
       and IsNull(Inserted.ItemId,0)!=0
          
set nocount off
```

### `dbo.UserAccounts` &mdash; `trig_UserAccountUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2006-08-30 &middot; **Modified:** 2025-06-26 &middot; **Also tagged:** —

```sql
CREATE TRIGGER [dbo].[trig_UserAccountUpdate] ON [dbo].[UserAccounts] 
for INSERT, UPDATE not for replication 
AS
set nocount on
if update(BudgetAccountId)
begin
  Update UserAccounts
     set AccountId = BudgetAccounts.AccountId
    from UserAccounts with (updlock,rowlock)
    join inserted on inserted.UserAccountId = UserAccounts.UserAccountId
    join BudgetAccounts on BudgetAccounts.BudgetAccountId = inserted.BudgetAccountId
end

if update(UseAllocations) or update(AllocationAmount) or Update(AllocationAvailable)
begin
-- Process Updated Requisitions and Update their User Account Records 
  update UserAccounts
     set AllocationAvailable = isnull(AllocationAmount,0) - isnull((select sum(isnull(TotalRequisitionCost,0)) from Requisitions where Requisitions.UserAccountId = UserAccounts.UserAccountId),0)
    from UserAccounts with (updlock,rowlock)
    join (select UserAccountId 
            from inserted 
          union (
            select UserAccountId 
              from deleted)
          ) ss on ss.UserAccountId = UserAccounts.UserAccountId
   where UserAccounts.UseAllocations = 1
end

set nocount off
```

### `dbo.VendorContacts` &mdash; `trig_Update`

**Events:** DELETE, INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2012-05-17 &middot; **Modified:** 2015-12-21 &middot; **Also tagged:** —

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[trig_Update] 
   ON  [dbo].[VendorContacts] 
   AFTER INSERT,DELETE,UPDATE
   NOT for Replication
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here
    if update(FirstName) or Update(LastName)
    begin
      update VendorContacts
         set FullName = case isnull(inserted.FirstName,'') when '' then '' else rtrim(inserted.FirstName) + ' ' end + isnull(rtrim(inserted.LastName),'')
        from VendorContacts
        join inserted on inserted.vendorcontactid = VendorContacts.VendorContactId
    end
    
	update Vendors
	   set Address1 = ISNULL(VendorContacts.Address1,''),
		   Address2 = ISNULL(VendorContacts.Address2,''),
		   City = ISNULL(VendorContacts.City,''),
		   State = ISNULL(VendorContacts.State,''),
		   ZipCode = ISNULL(VendorContacts.ZipCode,''),
		   Phone = left(ISNULL(VendorContacts.Phone,''),20),
		   Fax = ISNULL(VendorContacts.Fax,''),
		   Email = ISNULL(VendorContacts.EMail,'')
	  from Vendors
	  join inserted on inserted.VendorId = Vendors.VendorId
	  left outer join VendorContacts on VendorContacts.VendorContactId =
		(select Top 1 vc.vendorContactId
		   from VendorContacts vc with (nolock)
		  where vc.VendorId = Vendors.VendorId
			and vc.Active = 1
		  order by case isnull(rtrim(vc.Address1),'') when '' then 9 else 0 end, isnull(vc.BidContact,0), ISNULL(vc.POContact,0), vc.VendorContactId)
	 where Vendors.Active = 1
	   and isnull(VendorContacts.Address1,'') != ''
	   and (   isnull(Vendors.Address1,'') != ISNULL(VendorContacts.Address1,'')
			or ISNULL(Vendors.Address2,'') != ISNULL(VendorContacts.Address2,'')
			or ISNULL(Vendors.City,'') != ISNULL(VendorContacts.City,'')
			or ISNULL(Vendors.State,'') != ISNULL(VendorContacts.State,'')
			or ISNULL(Vendors.ZipCode,'') != ISNULL(VendorContacts.ZipCode,'')
			or ISNULL(Vendors.Phone,'') != ISNULL(VendorContacts.Phone,'')
			or ISNULL(Vendors.Fax,'') != ISNULL(VendorContacts.Fax,'')
			or ISNULL(Vendors.Email,'') != ISNULL(VendorContacts.EMail,''))
       
END
```

### `dbo.Vendors` &mdash; `trig_VendorUpdate`

**Events:** INSERT, UPDATE &middot; **Kind:** AFTER &middot; **State:** enabled &middot; **Created:** 2026-01-22 &middot; **Modified:** 2026-01-22 &middot; **Also tagged:** —

```sql
CREATE trigger trig_VendorUpdate on dbo.Vendors
for insert, update not for replication 
as
set nocount on

if update(Code)
begin
  insert VendorCategory (VendorId, CategoryId)
    select Vendors.VendorId, Category.CategoryId
      from Vendors with (nolock)
      join Inserted on Inserted.VendorId = Vendors.VendorId
      join Category on Category.Type = 2
                   and Category.Code = substring(Vendors.Code,1,1)
      left outer join VendorCategory vc on vc.VendorId = Vendors.VendorId
                                       and vc.CategoryId = Category.CategoryId
     where vc.VCId is null
end

set nocount off
```
