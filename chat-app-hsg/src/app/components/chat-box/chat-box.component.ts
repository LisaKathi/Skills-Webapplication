import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent {
  @Output() submitMessage = new EventEmitter<string>();

  public chatMessage = '';
  public errorMessage = '';

  public addMessage(message: string): void {
    if (!message.trim()) {
      this.errorMessage = 'Please add text!';
      this.chatMessage = '';

      return;
    }

    const timestamp = new Date().toLocaleString('de');
    const messageToSend = `${timestamp} - ${message}<br>`;

    this.submitMessage.emit(messageToSend);
    this.chatMessage = '';
    this.errorMessage = '';
  }
}