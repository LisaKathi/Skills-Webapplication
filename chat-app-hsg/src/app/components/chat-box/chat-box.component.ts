import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent {
  @Input() nickname = '';
  @Output() submitMessage = new EventEmitter<string>();
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  public chatMessage = '';
  public messages: string[] = []; 
  public errorMessage = '';
  private isFirstMessage = true;

  public characterCount = 0;
  public maxCharacterLimit = 1000;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nickname = params['nickname'];
    });
  }

  public onTextInput(event: any): void {
    this.characterCount = this.chatMessage.length;

    if (this.characterCount >= this.maxCharacterLimit) {
      event.target.value = event.target.value.slice(0, this.maxCharacterLimit);
      this.characterCount = this.maxCharacterLimit;
    }
  }

  public addMessage(message: string): void {
    // Just for testing
    console.log('button send works');

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

    // create a new message object (for Database)
    const newMessage = {
      message: message,
      nickname: this.nickname,
      createdAt: new Date().toISOString(), // convert date to ISO string
    };

    // send a POST request to the server
    this.http.post('http://localhost:3000/history', newMessage).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );

    const timestamp = new Date().toLocaleTimeString('de', {
      hour: 'numeric',
      minute: 'numeric',
    }); // format time to show only hours and minutes
    let messageToSend = '';
    if (this.isFirstMessage) {
      const date = new Date().toLocaleDateString('de');
      messageToSend = `${date}<br><strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // append date to the first message
      this.isFirstMessage = false;
    } else {
      messageToSend = `<strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // skip date for subsequent messages
    }

    this.addMessageToDisplay(messageToSend);

    this.chatMessage = '';
    this.errorMessage = '';
  }
  private addMessageToDisplay(message: string): void {
    this.messages.push(message); // Add the message to the messages array
  }
}
