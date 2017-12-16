import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormsModule, Form, FormGroup, FormControl, AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logoUrl= environment.logo_url;
  login_url = environment.auth_url;
  focusoutCheck = SelfDefinedValidators.focusoutCheck;

  invalidLogin;

  constructor(private auth: AuthService, private router: Router) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  loginform = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      SelfDefinedValidators.noSpaces
    ]),
    password: new FormControl('', Validators.required)
  });

  get username(){
    return this.loginform.get('username');
  }
  get password(){
    return this.loginform.get('password');
  }

  ngOnInit() {
  }

  login(formValue: FormGroup) {
    if(formValue.value.password.length<8 || formValue.value.username.length<5){
      this.invalidLogin = true;
      return;
    }
    const password = formValue.value.password;
    const newpass = this.auth.passwordCrypto(password);
    formValue.value.password = newpass;
    this.auth.postReturnToken(this.login_url, formValue.value).subscribe(result => {
      if (result){
        this.invalidLogin = false;
        this.router.navigate(['dashboard']);
      }
    }, error=>{this.invalidLogin = true;});
  }


}
