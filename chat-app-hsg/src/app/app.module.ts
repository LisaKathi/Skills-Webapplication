import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { NicknameComponent } from './components/nickname/nickname.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatBoxComponent,
    NicknameComponent,
    LandingPageComponent,
    HomePageComponent,
    ChatPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
