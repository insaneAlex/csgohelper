import {storage, MemoryStorage} from '../storage';

describe('storage', () => {
  describe('localStorage', () => {
    let localStorageMock: MemoryStorage;
    beforeEach(() => {
      localStorageMock = new MemoryStorage();
      jest.spyOn(window as any, 'localStorage', 'get').mockImplementation(() => localStorageMock);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should set and get items in localStorage', () => {
      const key = 'testKey';
      const item = 'testItem';
      storage.localStorage.set(key, item);
      expect(storage.localStorage.get(key)).toEqual(item);
    });
    it('should set and get objects in localStorage', () => {
      const key = 'testKey';
      const item = {prop: 'value'};
      storage.localStorage.set(key, item);
      expect(storage.localStorage.get(key)).toEqual(JSON.stringify(item));
    });
  });
  describe('MemoryStorage', () => {
    it('should set and get items in MemoryStorage', () => {
      const key = 'testKey';
      const item = 'testItem';
      const memoryStorage = new MemoryStorage();
      memoryStorage.setItem(key, item);
      expect(memoryStorage.getItem(key)).toEqual(item);
    });
    it('should set and get objects in MemoryStorage', () => {
      const key = 'testKey';
      const item = {prop: 'value'};
      const memoryStorage = new MemoryStorage();
      memoryStorage.setItem(key, JSON.stringify(item));
      expect(memoryStorage.getItem(key)).toEqual(JSON.stringify(item));
    });
  });
});
