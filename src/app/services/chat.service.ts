import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject, Observable } from "rxjs";

export interface ChatMessage {
  user: string;
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private hubConnection: signalR.HubConnection | undefined;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/chathub") // Update with your API URL
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.error("Error while starting connection: " + err));

    this.hubConnection.on(
      "ReceiveMessage",
      (user: string, message: string, timestamp: string) => {
        const chatMessage: ChatMessage = {
          user,
          message,
          timestamp: new Date(timestamp),
        };
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, chatMessage]);
      }
    );
  };

  public sendMessage = (user: string, message: string) => {
    const chatMessage: ChatMessage = { user, message, timestamp: new Date() };
    return this.http
      .post("https://localhost:5001/api/chat/send", chatMessage)
      .toPromise();
  };
}
