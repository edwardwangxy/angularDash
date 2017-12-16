import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-joinclass',
  templateUrl: './joinclass.component.html',
  styleUrls: ['./joinclass.component.css']
})
export class JoinclassComponent implements OnInit {
  logoUrl= environment.logo_url;
  login_url = environment.auth_url;
  focusoutCheck = SelfDefinedValidators.focusoutCheck;

  invalidCode;
  validCode;
  addClassForm = new FormGroup({
    classcode: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  joinClass(){
    this.auth.postReturnToken(this.login_url, this.classcode.value).subscribe(result => {
      if (result){
        this.invalidCode = false;
        this.validCode = true;
        this.addClassForm.reset();
      }
    }, error=>{
      this.invalidCode = true;
      this.validCode = false;
    });
  }

  get classcode(){
    return this.addClassForm.get("classcode");
  }

}
