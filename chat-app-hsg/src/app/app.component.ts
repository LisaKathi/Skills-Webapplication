import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'ChatAppStep';
  public messageHistory = '';
  public nickname = '';

  public nicknameCreated(nickname: string): void {
    this.nickname = nickname;
  }

  public messageSubmitted(message: string): void {
    this.messageHistory += message;
  }
}