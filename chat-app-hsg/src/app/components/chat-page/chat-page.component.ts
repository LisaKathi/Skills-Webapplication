import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})

export class ChatPageComponent {
  public nn!: string;

constructor(private route: ActivatedRoute) { }

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.nn = params['nickname'];
  });
}

}
  


