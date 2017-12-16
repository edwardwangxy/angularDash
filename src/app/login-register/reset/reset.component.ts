import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {JwtHelper, AuthHttp} from "angular2-jwt";
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent implements OnInit {
  logoUrl= environment.logo_url;
  resetPassUrl = environment.auth_url;
  focusoutCheck = SelfDefinedValidators.focusoutCheck;
  rePassCheck = SelfDefinedValidators.rePassCheck;

  invalidReset;
  resetSuccess;
  private token;
  emailPattern= '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)';

  constructor(private auth: AuthService, private router: Router, private jwthelper: JwtHelper, private route: ActivatedRoute) {
        document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  resetForm = new FormGroup({
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

  ngOnInit() {
      const jwtTool = new JwtHelper();
      this.token = this.route.snapshot.paramMap.get("token");
      try {
          jwtTool.isTokenExpired(this.token);
      } catch (e){
          this.deniedWithReason(401, "Unauthorized (Token Invalid)");
      }
      if (jwtTool.isTokenExpired(this.token)) {
          this.deniedWithReason(401, "Unauthorized (Token Expired)");
      }
      localStorage.setItem("token", this.token);
      this.auth.tokenCheck(environment.auth_url, this.token)
          .subscribe(response=>{
      }, error=>{
              this.deniedWithReason(error.status, error.statusText);
          });
      const user = new JwtHelper().decodeToken(this.token);
      this.username.setValue(user.name);
      this.email.setValue(user.email);
  }

  deniedWithReason(code: number, text: string) {
      const err_obj = {"code":code, "text":text};
      this.router.navigate(['/denied', encodeURI(JSON.stringify(err_obj))]);
  }

  resetPassword(formValue: AbstractControl){
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
}
