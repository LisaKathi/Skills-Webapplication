import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent {
  @Input() nickname = '';
  @Output() submitMessage = new EventEmitter<string>();

  public chatMessage = '';
  public errorMessage = '';

  public addMessage(message: string): void {
    if (!message.trim()) {
      this.errorMessage = 'Bitte schreiben Sie eine Nachricht!';
      this.chatMessage = '';

      return;
    }

    if (!this.nickname) {
      this.errorMessage = 'Bitte erstellen Sie einen Nickname!';
      this.chatMessage = '';

      return;
    }

    const timestamp = new Date().toLocaleString('de');
    const messageToSend = `${timestamp}<br><strong>${this.nickname}:</strong> ${message}<br>`;

    this.submitMessage.emit(messageToSend);
    this.chatMessage = '';
    this.errorMessage = '';
  }
}
