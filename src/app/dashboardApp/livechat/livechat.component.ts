import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  currentChatList;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.chatList.subscribe(list => this.currentChatList = list);
  }

  showBody(currentChat) {
    currentChat.showTextBody = !currentChat.showTextBody;
    currentChat.new_message_num = 0;
  }

  closeTextBody(currentChat){
    currentChat.showTextBody = false;
  }
  closeCurrentChat(currentChat){
    currentChat.currentChat = false;
  }
}
