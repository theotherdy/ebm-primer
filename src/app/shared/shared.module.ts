import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorFn } from '@angular/forms';

import { IntegerValidator }  from './integer-validator.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        IntegerValidator
    ],
    exports: [
        
    ]
})
export class SharedModule { }
