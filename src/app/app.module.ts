import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { ForgetComponent } from './login-register/forget/forget.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthService} from './services/auth.service';
import { ResetComponent } from './login-register/reset/reset.component';
import {JwtHelper, AUTH_PROVIDERS, AuthHttp} from 'angular2-jwt';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {SelfDefinedValidators} from "./common/selfDefinedValidators";
import { HomeComponent } from './dashboardApp/home/home.component';
import { NavbarComponent } from './dashboardApp/navbar/navbar.component';
import { NotificationComponent } from './dashboardApp/notification/notification.component';
import { LivechatComponent } from './dashboardApp/livechat/livechat.component';
import { MailComponent } from './dashboardApp/mail/mail.component';
import { ProfileComponent } from './login-register/profile/profile.component';
import { BoardComponent } from './dashboardApp/board/board.component';
import { FriendsComponent } from './dashboardApp/friends/friends.component';
import { JoinclassComponent } from './dashboardApp/joinclass/joinclass.component';
import { AddclassComponent } from './dashboardApp/addclass/addclass.component';
import { ClassComponent } from './dashboardApp/class/class.component';
import { LoginDetactionComponent } from './login-detaction/login-detaction.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    NotFoundComponent,
    ResetComponent,
    AccessDeniedComponent,
    HomeComponent,
    NavbarComponent,
    NotificationComponent,
    LivechatComponent,
    MailComponent,
    ProfileComponent,
    BoardComponent,
    FriendsComponent,
    JoinclassComponent,
    AddclassComponent,
    ClassComponent,
    LoginDetactionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: LoginDetactionComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'forget', component: ForgetComponent},
      { path: 'reset/:token', component: ResetComponent},
      { path: 'denied', component: AccessDeniedComponent},
      { path: 'denied/:reason', component: AccessDeniedComponent},
      { path: 'dashboard',
        component: BoardComponent,
        children:[
          {
            path:'',
            component: HomeComponent
          },
          {
            path:'profile',
            component: ProfileComponent
          },
          {
            path:'mail',
            component: MailComponent
          },
          {
            path:'friends',
            component: FriendsComponent
          },
          {
            path:'joinclass',
            component: JoinclassComponent
          },
          {
            path:'addclass',
            component: AddclassComponent
          },
          {
            path:'class/:classid',
            component: ClassComponent
          }
        ]
      },
      { path: '**', component: NotFoundComponent}
    ])
  ],
  providers: [
      AuthService,
      SelfDefinedValidators,
      JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
