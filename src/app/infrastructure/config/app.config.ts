import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    private config = {
        apiUrl: 'https://api.example.com',
        timeoutDuration: 30000,
        cacheTime: 3600,
        maxRetries: 3
    };

    get<T extends keyof typeof this.config>(key: T): typeof this.config[T] {
        return this.config[key];
    }
}
