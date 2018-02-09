import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FlexLayoutModule } from "@angular/flex-layout";

import { SharedModule } from "../shared/shared.module";

import { DiagnosisComponent } from './diagnosis.component';

import { CatesModule } from '../cates/cates.module';
import { ChangerModule } from '../changer/changer.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        CatesModule,
        MatSliderModule,
        MatCardModule,
        MatTooltipModule,
        ChangerModule
    ],
    declarations: [ DiagnosisComponent ],
    exports:      [ DiagnosisComponent ],
    providers:    []
})
export class DiagnosisModule { }
