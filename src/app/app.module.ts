import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatpageComponent } from './components/chat/chatpage/chatpage.component';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { ChatUsersListComponent } from './components/chat/chat-users-list/chat-users-list.component';
import { MessageComponent } from './components/chat/message/message.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { SearchComponent } from './components/search/search.component';
import { ChatThumbComponent } from './components/chat/chat-thumb/chat-thumb.component';

import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrderByPipe } from './pipes/order-by.pipe';
import { AgePipe } from './pipes/age.pipe';
import { UserViewComponent } from './components/user-view/user-view.component';
import { GenderPipe } from './pipes/gender.pipe';
import { ModalModule } from './components/_modal';

const socketConfig: SocketIoConfig = {
  url: environment.socketURL,
  options: {},
};
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    FooterComponent,
    ChatpageComponent,
    ChatBoxComponent,
    ChatListComponent,
    ChatUsersListComponent,
    UserSettingsComponent,
    ChatThumbComponent,
    MessageComponent,
    MainPageComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    OrderByPipe,
    AgePipe,
    UserViewComponent,
    GenderPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ColorPickerModule,
    ModalModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
