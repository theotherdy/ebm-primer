import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from './shared/shared.module';

import { NnttModule } from './nntt/nntt.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { CatesModule } from './cates/cates.module';
//import { NavbarModule } from './navbar/navbar.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        FlexLayoutModule,
        SharedModule,
        NnttModule,
        DiagnosisModule,
        CatesModule,
        //NavbarModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

