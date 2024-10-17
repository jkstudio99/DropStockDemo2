import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink } from "@angular/router";
import { CustomizerSettingsService } from "../../customizer-settings/customizer-settings.service";
import { ChatMessage, ChatService } from "../../services/chat.service";
import { Subscription } from "rxjs";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  messageContent: string = "";
  userName: string = "User"; // คุณอาจต้องการเชื่อมต่อกับระบบ auth เพื่อดึงชื่อผู้ใช้
  private messagesSubscription: Subscription | undefined;

  constructor(
    private chatService: ChatService,
    public themeService: CustomizerSettingsService
  ) {}

  ngOnInit() {
    this.chatService.startConnection();
    this.messagesSubscription = this.chatService.messages$.subscribe(
      (messages) => {
        this.messages = messages;
        this.scrollToBottom();
      }
    );
  }

  sendMessage() {
    if (this.messageContent.trim() !== "") {
      this.chatService.sendMessage(this.userName, this.messageContent)
        .then(() => {
          this.messageContent = "";
        })
        .catch(err => console.error('Error sending message:', err));
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatBody = document.querySelector(".chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
