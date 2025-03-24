import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  private apiUrlBase = 'https://verbose-guacamole-wrxv5x4qwp773546g-5011.app.github.dev';
  private config = {
    apiUrl: this.apiUrlBase,
    timeoutDuration: 30000,
    cacheTime: 3600,
    maxRetries: 3,
    endpoints: {
      signalR: {
        chatHub: `${this.apiUrlBase}/chathub`,
      },
      auth: {
        login: `${this.apiUrlBase}/api/Auth/login`,
        register: `${this.apiUrlBase}/api/Auth/register`,
      },
      chat: {
        messages: `${this.apiUrlBase}/api/messages`,
        contacts: `${this.apiUrlBase}/api/contacts`,
        user: `${this.apiUrlBase}/api/user`,
      }
    },
  };

  get<T extends keyof typeof this.config>(key: T): (typeof this.config)[T] {
    return this.config[key];
  }
  getEndpoint<T extends keyof typeof this.config.endpoints>(endpoint: T, type: keyof typeof this.config.endpoints[T]): string {
    const endpointConfig = this.config.endpoints[endpoint];
    if (endpointConfig && type in endpointConfig) {
      return endpointConfig[type] as string;
    }
    return "";
  }
}
