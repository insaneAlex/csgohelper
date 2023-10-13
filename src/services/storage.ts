class MemoryStorage {
  store = {};

  getItem(key: string) {
    // @ts-ignore
    return this.store[key] || null;
  }
  setItem(key: string, value: any) {
    // @ts-ignore
    this.store[key] = value.toString();
  }
  removeItem(key: string) {
    // @ts-ignore
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const createStorage = (storage: any) => {
  return {
    set: (key: string, item: any) => {
      try {
        if (typeof item === 'object') {
          storage.setItem(key, JSON.stringify(item));
        } else {
          storage.setItem(key, item);
        }
      } catch (e) {
        return null;
      }
    },
    get: (key: string) => {
      return storage.getItem(key);
    },
    getJSON: (key: string) => {
      try {
        return JSON.parse(storage.getItem(key));
      } catch (e) {
        return null;
      }
    },
    remove: (key: string) => {
      storage.removeItem(key);
    },
    clear: () => {
      storage.clear();
    }
  };
};

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : new MemoryStorage();
const localStorage = typeof window !== 'undefined' ? window.localStorage : new MemoryStorage();

export const storage = {
  sessionStorage: createStorage(sessionStorage),
  localStorage: createStorage(localStorage)
};
