import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from './shared/shared.module';

import { NnttModule } from './nntt/nntt.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { CatesModule } from './cates/cates.module';
//import { NavbarModule } from './navbar/navbar.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ChangerModule } from './changer/changer.module';
import { EmbeddedComponent } from './embedded/embedded.component';
import { StandaloneComponent } from './standalone/standalone.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        EmbeddedComponent,
        StandaloneComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        FlexLayoutModule,
        SharedModule,
        NnttModule,
        DiagnosisModule,
        CatesModule,
        ChangerModule,
        //NavbarModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

