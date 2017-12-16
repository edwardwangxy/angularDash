import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  logoUrl= environment.logo_url;
  forget_url = environment.auth_url;
  emailPattern= '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)';
  focusoutCheck = SelfDefinedValidators.focusoutCheck;

  invalidEmail;
  resetSuccess;

  constructor(private auth: AuthService) {
    document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
  }

  forgetForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
 //     SelfDefinedValidators.noSpaces,
      Validators.pattern(this.emailPattern)
    ]),
  });

  get email(){
    return this.forgetForm.get('email');
  }

  ngOnInit() {
  }

    forget(formValue: FormGroup) {
        this.auth.postReturnResponse(this.forget_url, formValue.value).subscribe(result => {
            if (result) {
                this.resetSuccess = false;
            }
        }, error=>{this.invalidEmail = true;});
    }

}
