import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  private apiUrlBase = 'https://musical-broccoli-7v56j6q7rg6jfxx-5011.app.github.dev';
  private config = {
    apiUrl: this.apiUrlBase,
    timeoutDuration: 30000,
    cacheTime: 3600,
    maxRetries: 3,
    endpoints: {
      login: `${this.apiUrlBase}/api/Auth/login`,
      register: `${this.apiUrlBase}/api/Auth/register`,
      chatHub: `${this.apiUrlBase}/chathub`,
    },
  };

  get<T extends keyof typeof this.config>(key: T): (typeof this.config)[T] {
    return this.config[key];
  }
  getEndpoint(endpoint: keyof typeof this.config.endpoints): string {
    return this.config.endpoints[endpoint];
  }
}
