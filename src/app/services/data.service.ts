import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private currentChatList = [
      {name: "Apple", new_message_num: 3, currentChat: true, showTextBody: false},
      {name: "Orange", new_message_num: 5, currentChat: true, showTextBody: false}
  ];
  private chatListSource = new BehaviorSubject(this.currentChatList);
  chatList = this.chatListSource.asObservable();
  constructor() { }
  changeChatList(newChatList) {

    for (let element of this.currentChatList) {
        if(element.name === newChatList.name) {
          element.showTextBody = true;
          element.currentChat = true;
          this.chatListSource.next(this.currentChatList);
          return;
        }
    }
    const newList = {name: newChatList.name, new_message_num: 0, currentChat: true, showTextBody: true};
    this.currentChatList.push(newList);
    this.chatListSource.next(this.currentChatList);
  }
}
