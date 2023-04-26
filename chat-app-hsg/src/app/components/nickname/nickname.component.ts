import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.css'],
})
export class NicknameComponent {
  @Output() public nicknameCreate = new EventEmitter<string>();

  public nickname = '';
  public message = '';

  public createNickname(nickname: string): void {
    // Person.Nickname = nickname;
    this.nicknameCreate.emit(nickname);
    this.message = `Nickname: '${nickname}' erstellt`;
  }
}