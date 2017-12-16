import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  logoUrl= environment.logo_url;

  constructor(private router: Router) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  ngOnInit() {
  }
  returnHome(){
    this.router.navigate(['login']);
  }

}
