import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  private apiUrlBase = 'https://verbose-halibut-5g5x755pg776hpx6p-5011.app.github.dev';
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
        //conversacion api
        messages: `${this.apiUrlBase}/api/conversation/messages`,
        contacts: `${this.apiUrlBase}/api/conversation/contacts`,
        conversation: `${this.apiUrlBase}/api/conversation/ByConversationId`,
        //mensaje api
        createMessage: `${this.apiUrlBase}/api/messages/create`,
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
