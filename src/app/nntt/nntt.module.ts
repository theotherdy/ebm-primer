import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from "../shared/shared.module";

import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';

import { NnttComponent } from './nntt.component';

import { CatesModule } from '../cates/cates.module';
import { ChangerModule } from '../changer/changer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        MatCardModule,
        MatSliderModule,
        MatTooltipModule,
        CatesModule,
        ChangerModule
    ],
    declarations: [ NnttComponent ],
    exports:      [ NnttComponent ],
    providers:    []
})
export class NnttModule { }
