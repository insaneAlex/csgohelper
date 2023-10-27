class MemoryStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
}
const createStorage = (storage: Storage | MemoryStorage) => {
  return {
    set: (key: string, item: unknown) => {
      try {
        if (typeof item === 'object') {
          storage.setItem(key, JSON.stringify(item));
        } else {
          storage.setItem(key, String(item));
        }
      } catch (e) {
        return null;
      }
    },
    get: (key: string) => {
      return storage.getItem(key);
    }
  };
};

const localStorage = typeof window !== 'undefined' ? window.localStorage : new MemoryStorage();

export const storage = {
  localStorage: createStorage(localStorage)
};
