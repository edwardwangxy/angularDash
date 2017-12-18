import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notiTitle="";
  sys_notification = [{"from":"Class 1", "info":"1 dropped"},{"from":"Class 2", "info":"2 dropped"},{"from":"Class 3", "info":"3 dropped"}];
  mail_notification = [{"from":"Professor1", "info":"New..."},{"from":"Classmate1", "info":"Coll..."},{"from":"Student", "info":"Question"}];
  chat_notification = [{"from":"People1", "info":"Hi, Can..."},{"from":"People2", "info":"Ok, No..."},{"from":"Friend1", "info":"Have you..."}];
  notiList;

  sys_noti_num = this.sys_notification.length;
  mail_noti_num = this.mail_notification.length;
  chat_noti_num = this.chat_notification.length;

  notiBodyDisplay = false;

  constructor() { }

  ngOnInit() {
  }

  notiClick(){
    this.notiBodyDisplay = true;
    this.notiTitle = "Notification";
    this.notiList = this.sys_notification;
  }

  mailClick(){
    this.notiBodyDisplay = true;
    this.notiTitle = "New Mail";
    this.notiList = this.mail_notification;
  }

  chatClick(){
    this.notiBodyDisplay = true;
    this.notiTitle = "New Chat";
    this.notiList = this.chat_notification;
  }

  clearNoti() {
    switch (this.notiTitle) {
        case "Notification":
          this.sys_notification = [];
          this.notiList = this.sys_notification;
          this.sys_noti_num = this.sys_notification.length;
          break;
        case "New Mail":
          this.mail_notification = [];
          this.notiList = this.mail_notification;
          this.mail_noti_num = this.mail_notification.length;
          break;
        case "New Chat":
          this.chat_notification = [];
          this.notiList = this.chat_notification;
          this.chat_noti_num = this.chat_notification.length;
          break;
        default:
          break;
    }
  }

  noti_show(num) {
    if (num > 0) {
      return true;
    } else {
      return false;
    }
  }

}
