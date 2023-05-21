import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface ChatMessage {
  id: number;
  message: string;
  nickname: string;
  createdAt: string;
}

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent {
  @Input() nickname = '';
  @Output() submitMessage = new EventEmitter<string>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public chatMessage = '';
  public messages: { message: string, class: string }[] = [];
  public oldMessages: ChatMessage[] = [];
  public errorMessage = '';
  private isFirstMessage = true;
  private currentDay = '';

  public characterCount = 0;
  public maxCharacterLimit = 1000;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nickname = params['nickname'];
    });

    //load messages for user
    this.http
      .get<ChatMessage[]>('https://us-central1-chatapp-51171.cloudfunctions.net/getChatHistory')
      .subscribe(
        (data: ChatMessage[]) => {
          this.oldMessages = data;
          this.displayOldMessages();
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

  public onTextInput(event: any): void {
    this.characterCount = this.chatMessage.length;

    if (this.characterCount >= this.maxCharacterLimit) {
      event.target.value = event.target.value.slice(0, this.maxCharacterLimit);
      this.characterCount = this.maxCharacterLimit;
    }
  }

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

    // create a new message object (for Database)
    const newMessage = {
      message: message,
      nickname: this.nickname,
      createdAt: new Date().toISOString(), // convert date to ISO string
    };

    // send a POST request to the server
    this.http.post('https://us-central1-chatapp-51171.cloudfunctions.net/addChatMessage', newMessage).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );

    // timestamp for display purposes
    const timestamp = new Date().toLocaleTimeString('de', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const day = new Date().toLocaleDateString('de');

    let messageToSend = '';

    if (day !== this.currentDay) {
      messageToSend = `${day}<br><strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // append date to the first message
      this.currentDay = day;
    } else {
      messageToSend = `<strong>${this.nickname}:</strong> ${message} - <small>${timestamp}</small><br>`; // skip date for subsequent messages
    }

    this.addMessageToDisplay(messageToSend, this.nickname);

    this.chatMessage = '';
    this.errorMessage = '';
  }

  public displayOldMessages(): void {
    this.oldMessages.forEach((oldMessage: ChatMessage) => {
      const createdAtDate = new Date(oldMessage.createdAt);
  
      const day = createdAtDate.toLocaleDateString('de');
      const timestamp = createdAtDate.toLocaleTimeString('de', {
        hour: 'numeric',
        minute: 'numeric',
      });
  
      let message = `<strong>${oldMessage.nickname}:</strong> ${oldMessage.message} - <small>${timestamp}</small><br>`;
  
      // If the day has changed, include the date in the message
      if (day !== this.currentDay) {
        message = `${day}<br>${message}`;
        this.currentDay = day;
      }
  
      // Use the nickname of the old message as the sender
      this.addMessageToDisplay(message, oldMessage.nickname);
    });
  }

  private addMessageToDisplay(message: string, sender: string): void {
    // Add a class to the message based on the sender
  const messageClass = sender === this.nickname ? 'current-user' : 'other-user';

  // Add the message to the messages array with its class
  this.messages.push({ message: message, class: messageClass });
  }
}
