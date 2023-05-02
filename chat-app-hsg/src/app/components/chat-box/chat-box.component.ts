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
  private isFirstMessage = true;

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

    const timestamp = new Date().toLocaleTimeString('de', { hour: 'numeric', minute: 'numeric' }); // format time to show only hours and minutes
    let messageToSend = '';
    if (this.isFirstMessage) {
      const date = new Date().toLocaleDateString('de');
      messageToSend = `${date}<br><strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // append date to the first message
      this.isFirstMessage = false;
    } else {
      messageToSend = `<strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // skip date for subsequent messages
    }

    this.submitMessage.emit(messageToSend);
    this.chatMessage = '';
    this.errorMessage = '';

  }
}
