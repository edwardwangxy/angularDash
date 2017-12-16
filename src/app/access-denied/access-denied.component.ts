import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  logoUrl= environment.logo_url;
  err_reason= false;
  error_code;
  error_text;
  constructor(private router: Router, private  route: ActivatedRoute) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get("reason")){
        this.err_reason = true;
        const decode_reason = decodeURI(params.get("reason"));
        try{
          const reason_obj = JSON.parse(decode_reason);
          this.error_code = reason_obj.code;
          this.error_text = reason_obj.text;
        }
        catch (e){
          this.router.navigate(['/denied', encodeURI('{"code":0, "text":"Unknow Error"}')]);
        }
      }
    });
  }
  returnHome(){
    this.router.navigate(['login']);
  }
}
