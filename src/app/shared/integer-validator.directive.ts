import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS,Validator,
         Validators,AbstractControl,ValidatorFn } from '@angular/forms';

export function isIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const isInteger = control.value % 1 == 0;
        return isInteger ? null : {'nonInteger': {value: control.value}};
    };
}

@Directive({
    selector: '[validateInteger]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: IntegerValidator, multi: true }
    ]
})

export class IntegerValidator implements Validator {
    @Input() validateInteger: string;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.validateInteger ? isIntegerValidator()(control)
                              : null;
    }
}
