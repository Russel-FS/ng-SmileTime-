import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageInitializerService {
  initialize() {
    if (typeof window === 'undefined') {
      (global as any).localStorage = {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
        clear: () => null,
        key: () => null,
        length: 0,
      };
    }
    return Promise.resolve();
  }
}
