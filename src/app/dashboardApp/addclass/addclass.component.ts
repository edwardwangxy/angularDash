import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent implements OnInit {

  logoUrl= environment.logo_url;
  focusoutCheck = SelfDefinedValidators.focusoutCheck;
  login_url = environment.auth_url;
  invalidCode;
  validCode;

  addClassForm = new FormGroup({
    classname: new FormControl('', Validators.required),
    numstudent: new FormControl('', Validators.required),
    classDetail: new FormControl('', Validators.required)
  });

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  createClass(form: FormGroup){
    console.log(form);
    this.auth.postReturnToken(this.login_url, form.value).subscribe(result => {
      if (result){
        this.invalidCode = false;
        this.validCode = true;
        form.reset();
      }
    }, error=>{
      this.invalidCode = true;
      this.validCode = false;
    });
  }

  get classname(){
    return this.addClassForm.get("classname");
  }

  get numstudent(){
    return this.addClassForm.get("numstudent");
  }

  get classDetail(){
    return this.addClassForm.get("classDetail");
  }

}
