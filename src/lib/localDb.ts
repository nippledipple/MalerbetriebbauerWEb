export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'open' | 'done';
  created_at: string;
  updated_at: string;
}

export interface VisitorStat {
  id: string;
  page_url: string;
  referrer?: string;
  user_agent?: string;
  session_id: string;
  visited_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  description?: string;
}

export interface AdminUser {
  email: string;
  passwordHash: string;
  name: string;
}

export interface PageContent {
  id: string;
  page: string;
  section: string;
  type: 'text' | 'image' | 'html';
  content: string;
  updated_at: string;
}

const DB_VERSION = 2;
const DB_NAME = 'MalerbetriebBauerDB';

class LocalDatabase {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('contact_requests')) {
          db.createObjectStore('contact_requests', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('visitor_stats')) {
          db.createObjectStore('visitor_stats', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('site_settings')) {
          db.createObjectStore('site_settings', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('admin_users')) {
          db.createObjectStore('admin_users', { keyPath: 'email' });
        }

        if (!db.objectStoreNames.contains('page_content')) {
          db.createObjectStore('page_content', { keyPath: 'id' });
        }
      };
    });
  }

  private async getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    if (!this.db) await this.init();
    const transaction = this.db!.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  async addContactRequest(request: Omit<ContactRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ContactRequest> {
    const store = await this.getStore('contact_requests', 'readwrite');
    const newRequest: ContactRequest = {
      ...request,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const req = store.add(newRequest);
      req.onsuccess = () => resolve(newRequest);
      req.onerror = () => reject(req.error);
    });
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    const store = await this.getStore('contact_requests');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async updateContactRequest(id: string, updates: Partial<ContactRequest>): Promise<void> {
    const store = await this.getStore('contact_requests', 'readwrite');
    return new Promise((resolve, reject) => {
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const request = getReq.result;
        if (!request) {
          reject(new Error('Contact request not found'));
          return;
        }
        const updated = { ...request, ...updates, updated_at: new Date().toISOString() };
        const putReq = store.put(updated);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  }

  async addVisitorStat(stat: Omit<VisitorStat, 'id' | 'visited_at'>): Promise<void> {
    const store = await this.getStore('visitor_stats', 'readwrite');
    const newStat: VisitorStat = {
      ...stat,
      id: crypto.randomUUID(),
      visited_at: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const req = store.add(newStat);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getVisitorStats(limit?: number): Promise<VisitorStat[]> {
    const store = await this.getStore('visitor_stats');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        let results = req.result || [];
        results.sort((a, b) => new Date(b.visited_at).getTime() - new Date(a.visited_at).getTime());
        if (limit) results = results.slice(0, limit);
        resolve(results);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getSetting(key: string): Promise<string | null> {
    const store = await this.getStore('site_settings');
    return new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result?.value || null);
      req.onerror = () => reject(req.error);
    });
  }

  async setSetting(key: string, value: string, description?: string): Promise<void> {
    const store = await this.getStore('site_settings', 'readwrite');
    const setting: SiteSetting = { key, value, description };
    return new Promise((resolve, reject) => {
      const req = store.put(setting);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async getAdminUser(email: string): Promise<AdminUser | null> {
    const store = await this.getStore('admin_users');
    return new Promise((resolve, reject) => {
      const req = store.get(email);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async createAdminUser(user: AdminUser): Promise<void> {
    const store = await this.getStore('admin_users', 'readwrite');
    return new Promise((resolve, reject) => {
      const req = store.add(user);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async initializeDefaultAdmin(): Promise<void> {
    const existingAdmin = await this.getAdminUser('admin@malerbetriebbauer.com');
    if (!existingAdmin) {
      const passwordHash = await this.hashPassword('admin123');
      await this.createAdminUser({
        email: 'admin@malerbetriebbauer.com',
        passwordHash,
        name: 'Administrator',
      });
      console.log('Default admin user created: admin@malerbetriebbauer.com / admin123');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === hash;
  }

  async getPageContent(page: string, section: string): Promise<PageContent | null> {
    const store = await this.getStore('page_content');
    return new Promise((resolve, reject) => {
      const req = store.get(`${page}_${section}`);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async getAllPageContent(page: string): Promise<PageContent[]> {
    const store = await this.getStore('page_content');
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => {
        const results = req.result || [];
        resolve(results.filter((item: PageContent) => item.page === page));
      };
      req.onerror = () => reject(req.error);
    });
  }

  async setPageContent(page: string, section: string, type: 'text' | 'image' | 'html', content: string): Promise<void> {
    const store = await this.getStore('page_content', 'readwrite');
    const pageContent: PageContent = {
      id: `${page}_${section}`,
      page,
      section,
      type,
      content,
      updated_at: new Date().toISOString(),
    };
    return new Promise((resolve, reject) => {
      const req = store.put(pageContent);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export const localDb = new LocalDatabase();
