import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
  inputText: string = '';
  copiedText: string = '';
  messageHistory: string[] = [];

  copyText() {
    if (this.inputText) {
      this.messageHistory.push(this.inputText);
      this.copiedText = this.inputText;
      this.inputText = '';
    }
  }

  showHistory() {
    this.copiedText = this.messageHistory.join('\n');
  }
  
}
