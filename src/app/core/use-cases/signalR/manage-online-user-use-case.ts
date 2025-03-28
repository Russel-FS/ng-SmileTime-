import { Injectable } from "@angular/core";
import { IRealTimeComunication } from "../../interfaces/signalR/i-real-time-comunication";

@Injectable()
export class ManageOnlineUserUseCase {
    constructor(
        private realTimeCommunication: IRealTimeComunication,
    ) { }

    /**
     * Establece el listener para los usuarios en línea.
     * @returns Observable que emite la lista de usuarios en línea.
     */
    listenForOnlineUsers() {
        return this.realTimeCommunication.onOnlineUsers();
    }

    /**
     * Solicita la lista de usuarios en línea.
     */
    getOnlineUsers(): void {
        this.realTimeCommunication.getOnlineUsers();
    }
}
