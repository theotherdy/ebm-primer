import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { FlexLayoutModule } from "@angular/flex-layout";

import { NnttModule } from './nntt/nntt.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    NnttModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
