import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { CatesComponent } from './cates.component';

@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ],
    declarations: [CatesComponent],
    exports:      [ CatesComponent ],
})
export class CatesModule { }
