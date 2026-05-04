# Procedure: `dbo.sp_CopyMSRPVers3Bid`

_Generated on 2026-05-04T14:49:07.238Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyMSRPVers3Bid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2020-08-07 14:35:27 |
| Modified | 2022-09-01 11:46:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOldBidHeaderId` | IN | varchar(50) |  |
| 2 | `@pNewBidHeaderId` | IN | varchar(50) |  |
| 3 | `@ExcludeManufWithBids` | IN | tinyint |  |
| 4 | `@IncludeWriteInManuf` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidMSRPResults` | USER_TABLE |  |
| `BidRequestManufacturer` | USER_TABLE |  |
| `BidRequestOptions` | USER_TABLE |  |
| `BidRequestPriceRanges` | USER_TABLE |  |
| `BidRequestProductLines` | USER_TABLE |  |
| `ManufacturerProductLines` | USER_TABLE |  |
| `Manufacturers` | USER_TABLE |  |
| `vw_BidMSRPRankedManufacturerProductLinesOrdered` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		Kevin / David
-- Create date: 1-17-2014, updated 8/7/2020 
-- Description:	Copy MSRP (Version 3) Bid
-- =============================================
CREATE procedure [dbo].[sp_CopyMSRPVers3Bid] @pOldBidHeaderId  varchar(50), @pNewBidHeaderId  varchar(50), @ExcludeManufWithBids  tinyint = 1, @IncludeWriteInManuf  tinyint = 1
AS
BEGIN

set nocount on

declare @CopyFromBidHeaderId int, @CopyToBidHeaderId int

Select @CopyFromBidHeaderId=CAST(@pOldBidHeaderId as int)
Select @CopyToBidHeaderId=CAST(@pNewBidHeaderId as int)

IF @ExcludeManufWithBids = 1
BEGIN
  INSERT INTO BidRequestManufacturer
    (Active, BidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
  SELECT BidRequestManufacturer.Active, @CopyToBidHeaderId, BidRequestManufacturer.ManufacturerId, BidRequestManufacturer.SequenceNumber, BidRequestManufacturer.AllowAdditionalProductLines, BidRequestManufacturer.UseOptions
  FROM BidRequestManufacturer
  left outer join BidRequestManufacturer brm on brm.BidHeaderId = @CopyToBidHeaderId -- Added DCH 8/4/20
                                            and brm.ManufacturerId = BidRequestManufacturer.ManufacturerId -- Added DCH 8/4/20
  WHERE BidRequestManufacturer.BidHeaderId=@CopyFromBidHeaderId
    	and brm.BidRequestManufacturerId is null
        and BidRequestManufacturer.BidRequestManufacturerId NOT IN
            ( SELECT BidRequestManufacturerId FROM BidMSRPResults WHERE BidHeaderId = @CopyFromBidHeaderId and Isnull(Active,0)=1 )
            --( SELECT BidRequestManufacturerId FROM BidMSRPResults WHERE BidHeaderId = @CopyFromBidHeaderId )
END
ELSE          
BEGIN
  INSERT INTO BidRequestManufacturer
    (Active, BidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
  SELECT BidRequestManufacturer.Active, @CopyToBidHeaderId, BidRequestManufacturer.ManufacturerId, BidRequestManufacturer.SequenceNumber, BidRequestManufacturer.AllowAdditionalProductLines, BidRequestManufacturer.UseOptions
  FROM BidRequestManufacturer
  left outer join BidRequestManufacturer brm on brm.BidHeaderId = @CopyToBidHeaderId -- Added DCH 8/4/20
                                            and brm.ManufacturerId = BidRequestManufacturer.ManufacturerId -- Added DCH 8/4/20
  WHERE BidRequestManufacturer.BidHeaderId=@CopyFromBidHeaderId
    and BidRequestManufacturer.Active = 1 -- Added DCH 8/4/20
	and brm.BidRequestManufacturerId is null
END

          
INSERT INTO BidRequestProductLines
  (Active, BidRequestManufacturerId, ManufacturerProductLineId, UseOptions)
SELECT OldBRPL.Active, NewBRM.BidRequestManufacturerId, OldBRPL.ManufacturerProductLineId, OldBRPL.UseOptions
FROM BidRequestProductLines OldBRPL
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
left outer join BidRequestProductLines NewBRPL on NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId -- Added DCH 8/4/20
                                           and NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId -- Added DCH 8/4/20
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId 
  and NewBRM.BidHeaderId = @CopyToBidHeaderId
  and OldBRPL.Active = 1 -- Added DCH 8/4/20
  and NewBRPL.BidRequestProductLineId is null -- Added DCH 8/4/20

INSERT INTO BidRequestOptions
  (BidHeaderId, ManufacturerId, ManufacturerProductLineId, OptionId, BidRequestManufacturerId, BidRequestProductLineId, [Name], [Weight])
SELECT @CopyToBidHeaderId, OldBROpt.ManufacturerId, OldBROpt.ManufacturerProductLineId, OldBROpt.OptionId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBROpt.[Name], OldBROpt.[Weight]
FROM BidRequestOptions OldBROpt
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBROpt.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
left outer join BidRequestOptions NewBROpt on NewBROpt.BidRequestProductLineId = NewBRPL.BidRequestProductLineId -- Added DCH 8/4/20
                                          and NewBROpt.OptionId = OldBROpt.OptionId -- Added DCH 8/4/20
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId 
  and NewBRM.BidHeaderId = @CopyToBidHeaderId
  and NewBROpt.BidRequestOptionId is null -- Added DCH 8/4/20


INSERT INTO BidRequestPriceRanges
  (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, RangeBase, RangeWeight, BidRequestMSRPOptionId)
SELECT @CopyToBidHeaderId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBRPR.RangeBase, OldBRPR.RangeWeight, NewBRO.BidRequestOptionId
FROM BidRequestPriceRanges OldBRPR 
join BidRequestOptions OldBRO ON OldBRO.BidRequestOptionId = OldBRPR.BidRequestMSRPOptionId      
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBRPR.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
join BidRequestOptions NewBRO ON NewBRO.OptionId = OldBRO.OptionId                                 
                             and NewBRO.BidRequestProductLineId = NewBRPL.BidRequestProductLineId  
                             and NewBRO.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId 
left outer join BidRequestPriceRanges NewBRPR on NewBRPR.BidRequestMSRPOptionId = NewBRO.BidRequestOptionId -- Added DCH 8/4/20
                                             and NewBRPR.RangeBase = OldBRPR.RangeBase -- Added DCH 8/4/20
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId 
  and NewBRM.BidHeaderId = @CopyToBidHeaderId
  and NewBRPR.BidRequestPriceRangeId is null -- Added DCH 8/4/20


-- note: the following is to allow conversion of bids created before the added field: BidRequestPriceRanges.BidRequestMSRPOptionId
--       for these type records, the above insert will return no records (and vice-versa)
INSERT INTO BidRequestPriceRanges
  (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, RangeBase, RangeWeight, BidRequestMSRPOptionId)
SELECT @CopyToBidHeaderId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBRPR.RangeBase, OldBRPR.RangeWeight, NewBRO.BidRequestOptionId
FROM BidRequestPriceRanges OldBRPR 
join BidRequestOptions OldBRO ON isnull(OldBRPR.BidRequestMSRPOptionId,0)=0 AND OldBRO.BidRequestProductLineId = OldBRPR.BidRequestProductLineId
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBRPR.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
join BidRequestOptions NewBRO ON NewBRO.OptionId = OldBRO.OptionId                                  
                             and NewBRO.BidRequestProductLineId = NewBRPL.BidRequestProductLineId   
                             and NewBRO.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId  
left outer join BidRequestPriceRanges NewBRPR on NewBRPR.BidRequestMSRPOptionId = NewBRO.BidRequestOptionId -- Added DCH 8/4/20
                                             and NewBRPR.RangeBase = OldBRPR.RangeBase -- Added DCH 8/4/20
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId 
  and NewBRM.BidHeaderId = @CopyToBidHeaderId
  and NewBRPR.BidRequestPriceRangeId is null -- Added DCH 8/4/20

/*  this is an alternative to the two inserts above
INSERT INTO BidRequestPriceRanges
  (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, RangeBase, RangeWeight, BidRequestMSRPOptionId)
SELECT @CopyToBidHeaderId, NewBRM.BidRequestManufacturerId, NewBRPL.BidRequestProductLineId, OldBRPR.RangeBase, OldBRPR.RangeWeight, NewBRO.BidRequestOptionId
FROM BidRequestPriceRanges OldBRPR 
left join BidRequestOptions OldBRO ON OldBRO.BidRequestOptionId = OldBRPR.BidRequestMSRPOptionId      
left join BidRequestOptions OldBROAlt ON isnull(OldBRPR.BidRequestMSRPOptionId,0)=0 AND OldBROAlt.BidRequestProductLineId = OldBRPR.BidRequestProductLineId 
JOIN BidRequestProductLines OldBRPL ON OldBRPL.BidRequestProductLineId = OldBRPR.BidRequestProductLineId
JOIN BidRequestManufacturer OldBRM ON OldBRM.BidRequestManufacturerId = OldBRPL.BidRequestManufacturerId
JOIN BidRequestManufacturer NewBRM ON NewBRM.ManufacturerId = OldBRM.ManufacturerId
JOIN BidRequestProductLines NewBRPL ON NewBRPL.ManufacturerProductLineId = OldBRPL.ManufacturerProductLineId
                                   and NewBRPL.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId
join BidRequestOptions NewBRO ON NewBRO.OptionId = case when isnull(OldBRPR.BidRequestMSRPOptionId,0)=0 then OldBROAlt.OptionId else OldBRO.OptionId end 
                             and NewBRO.BidRequestProductLineId = NewBRPL.BidRequestProductLineId  
                             and NewBRO.BidRequestManufacturerId = NewBRM.BidRequestManufacturerId 
WHERE OldBRM.BidHeaderId = @CopyFromBidHeaderId and NewBRM.BidHeaderId = @CopyToBidHeaderId
*/

IF @IncludeWriteInManuf = 1
BEGIN

  -- Insert any Write-In Manufacturors - only incuded those that had active bids per vw_BidMSRPRankedManufacturerProductLinesOrdered 
  INSERT INTO BidRequestManufacturer
    (Active, BidHeaderId, ManufacturerId, SequenceNumber, AllowAdditionalProductLines, UseOptions)
  SELECT 1 Active, @CopyToBidHeaderId, VBRM.ManufacturerId, 0 SequenceNumber, 0 AllowAdditionalProductLines, 0 UseOptions 
  FROM vw_BidMSRPRankedManufacturerProductLinesOrdered VBRM
  LEFT OUTER JOIN BidRequestManufacturer BRM ON BRM.BidHeaderId = @CopyToBidHeaderId 
                                            and BRM.ManufacturerId = VBRM.ManufacturerId 
  WHERE VBRM.bidHeaderid=@CopyFromBidHeaderId 
    AND VBRM.AllActive = 1
    AND VBRM.WriteInFlag = 1 
    AND BRM.BidRequestManufacturerId is null
  GROUP BY VBRM.ManufacturerId

  -- Insert the Product Lines for the Write-In Manufacturors
  INSERT INTO BidRequestProductLines
    (Active, BidRequestManufacturerId, ManufacturerProductLineId, UseOptions)
  SELECT 1, BRM.BidRequestManufacturerId, VBRM.ManufacturerProductLineId, 0
  FROM vw_BidMSRPRankedManufacturerProductLinesOrdered VBRM
  JOIN BidRequestManufacturer BRM ON BRM.BidHeaderId = @CopyToBidHeaderId 
                                 and BRM.ManufacturerId = VBRM.ManufacturerId 
  LEFT OUTER JOIN BidRequestProductLines NewBRPL ON NewBRPL.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                                and NewBRPL.ManufacturerProductLineId = VBRM.ManufacturerProductLineId
                                                                                  and NewBRPL.Active = 1
  WHERE VBRM.BidHeaderId = @CopyFromBidHeaderId 
    AND VBRM.AllActive = 1
    AND VBRM.WriteInFlag = 1 
    -- only populate records where no product line set yet  
    and NewBRPL.BidRequestProductLineId is null  
  GROUP BY BRM.BidRequestManufacturerId, VBRM.ManufacturerProductLineId

  -- Insert the OPTIONS for the Write-In Manufacturors
  INSERT INTO BidRequestOptions
    (BidHeaderId, ManufacturerId, ManufacturerProductLineId, OptionId, BidRequestManufacturerId, BidRequestProductLineId, [Name], [Weight])
  SELECT @CopyToBidHeaderId, VBRM.ManufacturerId, VBRM.ManufacturerProductLineId, VBRM.MSRPOptionId, BRM.BidRequestManufacturerId, BRPL.BidRequestProductLineId, VBRM.OptionName, OABRO.Weight
  FROM vw_BidMSRPRankedManufacturerProductLinesOrdered VBRM
  JOIN BidRequestManufacturer BRM ON BRM.BidHeaderId = @CopyToBidHeaderId 
                                 and BRM.ManufacturerId = VBRM.ManufacturerId 
  JOIN BidRequestProductLines BRPL ON BRPL.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                  and BRPL.ManufacturerProductLineId = VBRM.ManufacturerProductLineId
                                                         and BRPL.Active = 1
  left outer join BidRequestOptions BRO on BRO.BidHeaderId = BRM.BidHeaderId
                                       and BRO.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                                                 and BRO.BidRequestProductLineId = BRPL.BidRequestProductLineId
                                                                 and BRO.OptionId = VBRM.MSRPOptionId
  -- This code gets the BidRequestOption of the Source Writeins Bid Request Entry
  outer apply (select top 1 BidRequestOptions.Weight 
                 from BidRequestOptions 
                            join Manufacturers on Manufacturers.ManufacturerId = BidRequestOptions.ManufacturerId
                                              and Manufacturers.Name = '(WRITEINS)'
                           join ManufacturerProductLines on ManufacturerProductLines.ManufacturerId = Manufacturers.ManufacturerId
                                                         and ManufacturerProductLines.ManufacturerProductLineId = BidRequestOptions.ManufacturerProductLineId
                           where BidRequestOptions.BidHeaderId = @CopyFromBidHeaderId
                             and BidRequestOptions.OptionId = VBRM.MSRPOptionId
                           order by BidRequestOptions.BidRequestOptionId) OABRO
  WHERE VBRM.BidHeaderId = @CopyFromBidHeaderId 
    AND VBRM.AllActive = 1
    AND VBRM.WriteInFlag = 1 
    -- only populate records where no product line set yet  
    and BRO.BidRequestOptionId is null  
  group by VBRM.ManufacturerId, VBRM.ManufacturerProductLineId, VBRM.MSRPOptionId, BRM.BidRequestManufacturerId, BRPL.BidRequestProductLineId, VBRM.OptionName, OABRO.Weight

  -- Insert the PRICE RANGES for the Write-In Manufacturors
  INSERT INTO BidRequestPriceRanges
    (BidHeaderId, BidRequestManufacturerId, BidRequestProductLineId, RangeBase, RangeWeight, BidRequestMSRPOptionId)
  SELECT @CopyToBidHeaderId, BRM.BidRequestManufacturerId, BRPL.BidRequestProductLineId, OABRPR.RangeBase, OABRPR.RangeWeight, BRO.BidRequestOptionId
  FROM vw_BidMSRPRankedManufacturerProductLinesOrdered VBRM
  JOIN BidRequestManufacturer BRM ON BRM.BidHeaderId = @CopyToBidHeaderId 
                                 and BRM.ManufacturerId = VBRM.ManufacturerId 
  JOIN BidRequestProductLines BRPL ON BRPL.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                  and BRPL.ManufacturerProductLineId = VBRM.ManufacturerProductLineId
                                                         and BRPL.Active = 1
  join BidRequestOptions BRO on BRO.BidHeaderId = BRM.BidHeaderId
                            and BRO.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                                and BRO.BidRequestProductLineId = BRPL.BidRequestProductLineId
                                                and BRO.OptionId = VBRM.MSRPOptionId
  -- This code gets the BidRequestPriceRanges of the Source Writeins Bid Request Entry
  outer apply (select BidRequestPriceRanges.RangeBase, BidRequestPriceRanges.RangeWeight
                 from BidRequestPriceRanges
                           join BidRequestOptions on BidRequestOptions.BidHeaderId = BidRequestPriceRanges.BidHeaderId
                                                  and BidRequestOptions.BidRequestManufacturerId = BidRequestPriceRanges.BidRequestManufacturerId
                                                                 and BidRequestOptions.BidRequestProductLineId = BidRequestPriceRanges.BidRequestProductLineId
                                                                 and BidRequestOptions.BidRequestOptionId = BidRequestPriceRanges.BidRequestMSRPOptionId
                           join Manufacturers on Manufacturers.ManufacturerId = BidRequestOptions.ManufacturerId
                                              and Manufacturers.Name = '(WRITEINS)'
                           join ManufacturerProductLines on ManufacturerProductLines.ManufacturerId = Manufacturers.ManufacturerId
                                                         and ManufacturerProductLines.ManufacturerProductLineId = BidRequestOptions.ManufacturerProductLineId
                           where BidRequestOptions.BidHeaderId = @CopyFromBidHeaderId
                             and BidRequestOptions.OptionId = VBRM.MSRPOptionId) OABRPR
   left outer join BidRequestPriceRanges BRPR on BRPR.BidHeaderId = BRM.BidHeaderId
                                             and BRPR.BidRequestManufacturerId = BRM.BidRequestManufacturerId
                                                                           and BRPR.BidRequestProductLineId = BRPL.BidRequestProductLineId
                                                                           and BRPR.BidRequestMSRPOptionId = BRO.BidRequestOptionId
                                                                           and BRPR.RangeBase = OABRPR.RangeBase
--                                                                         and BRPR.RangeWeight = OABRPR.RangeWeight
  WHERE VBRM.BidHeaderId = @CopyFromBidHeaderId 
    AND VBRM.AllActive = 1
    AND VBRM.WriteInFlag = 1 
    -- only populate records where no product line set yet  
    and BRPR.BidRequestPriceRangeId is null  
  group by BRM.BidRequestManufacturerId, BRPL.BidRequestProductLineId, OABRPR.RangeBase, OABRPR.RangeWeight, BRO.BidRequestOptionId
END  


set nocount off

END
```
