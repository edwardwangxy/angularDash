import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-detaction',
  templateUrl: './login-detaction.component.html',
  styleUrls: ['./login-detaction.component.css']
})
export class LoginDetactionComponent implements OnInit {

  constructor(private route:Router) {
  }

  ngOnInit() {
    try{
      let token = localStorage.getItem("token");
      if(token){
        this.route.navigate(['dashboard']);
      } else {
        this.route.navigate(['login']);
      }

    } catch (e) {
      this.route.navigate(['login']);
    }
  }

}
