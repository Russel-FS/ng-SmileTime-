import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { OnlineUser } from '../../domain/entities/signalR/OnlineUser';

@Injectable({
    providedIn: 'root'
})
export class ManageOnlineUserUseCase {
    constructor(private realTimeComunication: IRealTimeComunication) { }

    getOnlineUsers(): void {
        this.realTimeComunication.getOnlineUsers();
    }

    listenForOnlineUsers(): Observable<OnlineUser[]> {
        return this.realTimeComunication.onOnlineUsers();
    }

    listenForUserConnected(): Observable<OnlineUser> {
        return this.realTimeComunication.onUserConnected();
    }

    listenForUserDisconnected(): Observable<OnlineUser> {
        return this.realTimeComunication.onUserDisconnected();
    }
}
