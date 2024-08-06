import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  updateItem<T>(key: string, updateFn: (data: T) => T): void {
    const item = this.getItem<T>(key);
    if (item !== null) {
      const updatedItem = updateFn(item);
      this.setItem(key, updatedItem);
    } else {
      console.warn(`No item found in sessionStorage with key: ${key}`);
    }
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
