import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

import { ValidatorFn } from '@angular/forms';
import { IntegerValidator }  from './integer-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatToolbarModule,
        MatMenuModule
    ],
    declarations: [
        IntegerValidator
    ],
    exports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatToolbarModule,
        MatMenuModule
    ]
})
export class SharedModule { }
