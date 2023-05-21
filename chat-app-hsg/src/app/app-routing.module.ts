import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NicknameComponent } from './components/nickname/nickname.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';



const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'start', component: ChatPageComponent},
  {path: '**', component: PageNotFoundComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



