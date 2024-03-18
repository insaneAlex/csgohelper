import {InventoryGlobalType, InventoryItemType, TagsTypeIndex} from '@/src/services/steam-inventory';
import {calculateInventoryWithPrices} from '../calculate-inventory-with-prices';
import {minimizeInventory} from '../minimize-inventory';
import {getFormattedDate} from '../get-formatted-date';
import {getByTagName} from '../get-by-tag-name';
import {NoPriceInventory} from '@/src/services';
import {PricesType} from '@/src/services/aws';

describe('helpers', () => {
  describe('getByTagName', () => {
    const tags = [{category: 'Type'}, {category: 'Weapon'}, {category: 'Quality'}] as TagsTypeIndex[];
    it("should get item by it's tag name", () => {
      const tagName = 'Type';
      expect(getByTagName({tags, tagName})).toEqual(tags[0]);
    });
    describe('when tagname doesnt exist in tags', () => {
      it('should return empty object', () => {
        const tagName = 'Container';
        expect(getByTagName({tags, tagName})).toEqual({});
      });
    });
  });
  describe('calculateInventoryWithPrices', () => {
    const HASH_MOCK = 'pistol';
    const inventoryMock = [{market_hash_name: HASH_MOCK}] as NoPriceInventory;
    const pricesMock = {[HASH_MOCK]: {price: {}}} as unknown as PricesType;
    it('should add price object to item', () => {
      const result = calculateInventoryWithPrices(inventoryMock, pricesMock);
      const modifiedItem = result?.find((item) => item.market_hash_name === HASH_MOCK) as InventoryItemType;
      expect('prices' in modifiedItem).toBeTruthy();
    });
  });
  describe('minimizeInventory', () => {
    const ID_PROP = 'id';
    const inventoryMock = [{[ID_PROP]: 'idVal', tags: []}] as unknown as InventoryGlobalType[];
    it('should remove unnesessary props', () => {
      const result = minimizeInventory(inventoryMock);
      expect(result.some((item) => ID_PROP in item)).toBeFalsy();
    });
  });
  describe('getFormattedDate function', () => {
    test('returns a formatted date string', () => {
      const mockDate = new Date(2023, 0, 1, 12, 30, 45);
      const expectedFormattedDate = '1 January 2023 at 12:30:45';
      expect(getFormattedDate(mockDate)).toBe(expectedFormattedDate);
    });
  });
});
