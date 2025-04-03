import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  private apiUrlBase = 'https://turbo-doodle-q7pw5pwr6jww34rgr-5011.app.github.dev';
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
      },
      carousel: {
        getById: (id: number) => `${this.apiUrlBase}/api/Carousel/${id}`,
        create: `${this.apiUrlBase}/api/Carousel`,
        update: (id: number) => `${this.apiUrlBase}/api/Carousel/${id}`,
        delete: (id: number) => `${this.apiUrlBase}/api/Carousel/${id}`,
        active: `${this.apiUrlBase}/api/Carousel/active`
      },
      dentist: {
        all: `${this.apiUrlBase}/api/DentistManagement/all`,
        getById: (id: number) => `${this.apiUrlBase}/api/DentistManagement/${id}`,
        delete: (id: number) => `${this.apiUrlBase}/api/DentistManagement/${id}`,
        create: `${this.apiUrlBase}/api/DentistManagement/create`,
        assign: (userId: number) => `${this.apiUrlBase}/api/DentistManagement/assign/${userId}`,
        removeRole: (userId: number) => `${this.apiUrlBase}/api/DentistManagement/remove-role/${userId}`,
      },
      admin: {
        all: `${this.apiUrlBase}/api/AdminManagement/all`,
        create: `${this.apiUrlBase}/api/AdminManagement/create`,
        assign: (userId: number) => `${this.apiUrlBase}/api/AdminManagement/assign/${userId}`,
        removeRole: (userId: number) => `${this.apiUrlBase}/api/AdminManagement/remove-role/${userId}`,
      },
      pacient: {
        all: `${this.apiUrlBase}/api/Pacient/all`,
        getById: (id: number | string) => `${this.apiUrlBase}/api/Pacient/${id}`,
        update: (id: number | string) => `${this.apiUrlBase}/api/Pacient/${id}`,
        search: `${this.apiUrlBase}/api/Pacient/search`,
        create: `${this.apiUrlBase}/api/Pacient/create`,
      },
      dentalAppointment: {
        create: `${this.apiUrlBase}/api/DentalAppointment/create`,
      },
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
