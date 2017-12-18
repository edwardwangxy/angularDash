import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {LivechatComponent} from '../livechat/livechat.component';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    @Output() chatListChange = new EventEmitter<object>();

  searchForm = new FormGroup({
    searchFriends: new FormControl()
  });

  friendsList = [
      {profileURL: "http://via.placeholder.com/600X600", name: "Apple", fromClass: "Physics"},
      {profileURL: "http://via.placeholder.com/600X600", name: "Orange", fromClass: "Chemistry"},
      {profileURL: "http://via.placeholder.com/600X600", name: "Cherry", fromClass: "Computer Science"}
  ]
  constructor(private auth: AuthService, private router: Router, private data: DataService) {

  }

  ngOnInit() {
  }

  onSearchChange(){
    console.log(this.searchForm.get("searchFriends").value);
  }

  activeChat(eachfriend) {
    this.data.changeChatList(eachfriend);
  }


}
