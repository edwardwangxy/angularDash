import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import * as CryptoJS from 'crypto-js';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  passwordCrypto(password: string){
    //noinspection TypeScriptUnresolvedVariable
      const key = CryptoJS.enc.Base64.parse('uwwxy');
    //noinspection TypeScriptUnresolvedVariable
      const iv  = CryptoJS.enc.Base64.parse('#base64IV#');
    //noinspection TypeScriptUnresolvedVariable
      const encrypted = CryptoJS.AES.encrypt(password, key, {iv: iv});
    const newpass = encrypted.toString();
    return newpass;
  }

    tokenCheck(url, token) {
        const headers = new Headers({ "authorization":'Bearer '+token});
        const options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((response: Response) => {
            const result = response.json();
            if ( result && result.response && result.response === "success") {
                return {'response':true, 'error':''};
            } else {
                return {'response':false, 'error':response};
            }
        });
    }

    postReturnToken(url, value){
       return this.http.post(url, JSON.stringify(value)).map(response => {
            const result = response.json();
            if ( result && result.token ) {
                localStorage.setItem('token', result.token);
                return true;
            } else {
                return false;
            }
        });
    }

    postReturnResponse(url, value){
        return this.http.post(url, JSON.stringify(value)).map(response => {
            const result = response.json();
            console.log(result.response);
            if ( result && result.response && result.response === "success" ) {
                return true;
            } else {
                return false;
            }
        });
    }

  logout() {
    try{
        localStorage.removeItem("token");
    }
    catch (e){}
  }

  uniqueCheck(key: string, value: string) {
      return this.http.get(environment.unique_check+"?"+key+"="+value).map(response=>{
          const result = response.json();
          console.log(result.response);
          if ( result && result.response && result.response === "success" ) {
              return true;
          } else {
              return false;
          }
      });
  }

}
