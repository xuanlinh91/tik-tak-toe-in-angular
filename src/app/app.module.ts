import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TiktaktoeComponent } from './tiktaktoe/tiktaktoe.component';

@NgModule({
  declarations: [
    AppComponent,
    TiktaktoeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
