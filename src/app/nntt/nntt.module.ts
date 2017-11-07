import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from "../shared/shared.module";

import { NnttComponent } from './nntt.component';

import { CatesModule } from '../cates/cates.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        CatesModule
    ],
    declarations: [ NnttComponent ],
    exports:      [ NnttComponent ],
    providers:    []
})
export class NnttModule { }
