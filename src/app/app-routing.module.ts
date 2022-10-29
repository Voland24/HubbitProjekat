import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatpageComponent } from './components/chat/chatpage/chatpage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchComponent } from './components/search/search.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'main',
        component: MainPageComponent,
      },
      {
        path: 'chat',
        component: ChatpageComponent,
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'view',
        component: UserViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
