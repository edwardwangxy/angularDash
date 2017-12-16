import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SelfDefinedValidators} from "../../common/selfDefinedValidators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    logoUrl= environment.logo_url;
    regi_url = environment.auth_url;
    focusoutCheck = SelfDefinedValidators.focusoutCheck;

    invalidRegi;
    emailPattern= '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)';

    constructor(private auth: AuthService) {
        document.body.style.backgroundColor = 'rgba(182,187,191,0.7)';
    }

    regiForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            SelfDefinedValidators.noSpaces
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(this.emailPattern),
            SelfDefinedValidators.noSpaces,
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
        ]),
    });

    get username(){
        return this.regiForm.get('username');
    }

    get password(){
        return this.regiForm.get('password');
    }

    get repass(){
        return this.regiForm.get('repass');
    }

    get email(){
        return this.regiForm.get('email');
    }


    ngOnInit() {
    }

    rePassCheck(input: AbstractControl, err_span: HTMLSpanElement, compareWith) {
        SelfDefinedValidators.rePassCheck(input, err_span, compareWith);
    }

    usernameFocusOut(input: AbstractControl, err_span: HTMLSpanElement){
        SelfDefinedValidators.focusoutCheck(input, err_span);
        if(input.valid){
            this.auth.uniqueCheck("username", input.value).subscribe(response=>{},error=>{
               err_span.textContent+="Username was taken!!";
            });
        }
    }

    emailFocusOut(input, err_span: HTMLSpanElement){
        SelfDefinedValidators.focusoutCheck(input, err_span);
        if(input.valid){
            this.auth.uniqueCheck("email", input.value).subscribe(response=>{},error=>{
                err_span.textContent+="Email was used!!";
            });
        }
    }

    register(formValue: FormGroup) {
        const password = formValue.value.password;
        const newpass = this.auth.passwordCrypto(password);
        formValue.value.password = newpass;
        formValue.value.repass = newpass;
        this.auth.postReturnToken(this.regi_url, formValue.value).subscribe(result => {
            if (result) {
                this.invalidRegi = false;
            }
        }, error=>{this.invalidRegi = true;});
    }

}
