import { Component, EventEmitter, Output,  ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.css'],
})

export class NicknameComponent {
  @Output() public nicknameCreate = new EventEmitter<string>();

  public nickname = '';
  public message = '';
  public characterCount = 0;
  public maxCharacterLimit = 15;

  public createNickname(nickname: string): void {

    if (!nickname) {
      this.message = 'Bitte geben Sie einen Nickname ein.';
      return; // Exit the method if the nickname is empty
    }

    const regex = /^[a-zA-Z0-9]+$/; // Regular expression for alphanumeric characters

  if (!regex.test(nickname)) {
    this.message = 'Nur alphanumerische Zeichen sind erlaubt.';
    this.nickname = '';
    return; // Exit the method if invalid characters are found
  }

      this.nicknameCreate.emit(nickname);
      setTimeout(() => {
        this.message = `Herzlich willkommen, ${nickname}!`;
    }, 2150);
  }

  public onNicknameInput(event: any): void {
    this.nickname = event.target.value;
    this.characterCount = this.nickname.length;

    if (this.characterCount >= this.maxCharacterLimit) {
      event.target.value = event.target.value.slice(0, this.maxCharacterLimit);
      this.characterCount = this.maxCharacterLimit;
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  animateButton(nickname: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(nickname)) {
    const button = this.el.nativeElement.querySelector('.erstellen');
    //this.preventDefault()
    this.renderer.removeClass(button, 'animate');
    this.renderer.addClass(button, 'animate');
    this.renderer.addClass(button, 'animate');

    setTimeout(() => {
      this.renderer.removeClass(button, 'animate');
    }, 6000);
  }
  }
  redirectToStart(nickname: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(nickname)) {
    const button = this.el.nativeElement.querySelector('.erstellen');

    setTimeout(() => {
     
      this.router.navigate(['/start'], { queryParams: { nickname: this.nickname } });
    }, 3000);
  }
  
  }
  }