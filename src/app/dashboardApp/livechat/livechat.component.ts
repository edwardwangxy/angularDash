import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  chatWith = "Student1";
  showTextBody = false;
  notiNum = 3;
  currentChat = true;

  constructor() { }

  ngOnInit() {
  }

  showBody(){
    this.showTextBody=!this.showTextBody;
    this.notiNum = 0;
  }

  closeTextBody(){
    this.showTextBody = false;
  }
  closeCurrentChat(){
    this.currentChat = false;
  }
}
