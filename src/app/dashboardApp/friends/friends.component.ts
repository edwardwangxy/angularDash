import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  searchForm = new FormGroup({
    searchFriends: new FormControl()
  });


  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  onSearchChange(){
    console.log(this.searchForm.get("searchFriends").value);
  }

}
