import { Component, EventEmitter, Output,  ElementRef, Renderer2 } from '@angular/core';

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
      setTimeout(() => {
        this.message = `Herzlich willkommen ${nickname}!`;
    }, 2150);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  animateButton() {
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




