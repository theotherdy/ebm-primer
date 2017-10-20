import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { CatesComponent } from './cates.component';

@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatIconModule
    ],
  declarations: [CatesComponent],
    exports:      [ CatesComponent ],
})
export class CatesModule { }
