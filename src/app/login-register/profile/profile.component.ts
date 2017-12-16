import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";
import {AuthService} from "../../services/auth.service";
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {JwtHelper} from "angular2-jwt";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  personProfilePictureUrl = "https://dummyimage.com/600x600/b6bbbf/fff";
  resetPassUrl = environment.auth_url;
  focusoutCheck = SelfDefinedValidators.focusoutCheck;
  rePassCheck = SelfDefinedValidators.rePassCheck;

  invalidReset;
  fileNotImage=true;
  resetSuccess;
  private token = localStorage.getItem("token");
  emailPattern= '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)';

  constructor(private auth: AuthService, private router: Router, private jwthelper: JwtHelper, private route: ActivatedRoute) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  resetForm = new FormGroup({
    profilePic: new FormControl(),
    username: new FormControl({value: '', disabled: true}, [
      Validators.required,
      SelfDefinedValidators.noSpaces,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    email: new FormControl({value: '', disabled: true}, [
      Validators.required,
      SelfDefinedValidators.noSpaces,
      Validators.pattern(this.emailPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    repass: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ])
  });

  get username(){
    return this.resetForm.get('username');
  }

  get password(){
    return this.resetForm.get('password');
  }

  get email(){
    return this.resetForm.get('email');
  }

  get repass(){
    return this.resetForm.get('repass');
  }

  get profilePic() {
    return this.resetForm.get("profilePic");
  }

  ngOnInit() {
    try{
      const user = new JwtHelper().decodeToken(this.token);
      this.username.setValue(user.name);
      this.email.setValue(user.email);
    }
    catch (e){
      console.log(e);
    }
  }

  resetPassword(formValue: FormGroup){
    const password = formValue.value.password;
    const newpass = this.auth.passwordCrypto(password);
    formValue.value.password = newpass;
    formValue.value.repass = newpass;
    formValue.value["token"] = this.token;
    this.auth.postReturnResponse(this.resetPassUrl, formValue.value).subscribe(result => {
      if (result) {
        this.resetSuccess = true;
      }
    }, error=>{this.invalidReset = true;});
  }

  inputFileCheck(input, err_span: HTMLSpanElement) {
    err_span.textContent = "";
    try {
      let fileName = input.target.files[0].name;
      let idxDot = fileName.lastIndexOf(".") + 1;
      let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
        this.fileNotImage = false;
      }else{
        this.fileNotImage = true;
        err_span.textContent += "Only Accept Image"
      }
    } catch (e) {
      this.fileNotImage = false;
    }

  }

}
