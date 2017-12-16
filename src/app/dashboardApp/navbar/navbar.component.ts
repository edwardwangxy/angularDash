import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logoUrl= environment.logo_url;
  logoUrlInverse = environment.logo_url_inverse;

  navBarDisplay = true;
  constructor(private auth:AuthService, private router: Router) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  ngOnInit() {
  }

  navBarToggle(toggle: HTMLDivElement){
    console.log("test");
    this.navBarDisplay = !this.navBarDisplay;
    if(!this.navBarDisplay){
      toggle.style.backgroundColor = 'rgba(255,255,255,0)';
      (toggle.children[0] as HTMLImageElement).src = this.logoUrlInverse;
      toggle.style.transform = 'scale(0.5)';
      toggle.style.marginLeft = '-30px';
    } else {
      toggle.style.backgroundColor = 'rgba(69,73,84,1)';
      (toggle.children[0] as HTMLImageElement).src = this.logoUrl;
      toggle.style.transform = 'scale(1)';
      toggle.style.marginLeft = '50px';
    }
    console.log(toggle);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
