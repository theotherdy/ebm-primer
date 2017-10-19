import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Study } from './study';

import { isIntegerValidator } from '../shared/integer-validator.directive';


@Component({
    selector: 'nntt-component',
    templateUrl: './nntt.component.html',
    styleUrls: ['./nntt.component.css']
})
export class NnttComponent implements OnInit {

    study: Study;
    studyForm: FormGroup;

    constructor() { }

    ngOnInit() {
        this.study = new Study();
        
        this.studyForm = new FormGroup({
            'eventIndivControl': new FormControl(this.study.eventIndivControl, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'noEventIndivControl': new FormControl(this.study.noEventIndivControl, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'eventIndivInterv': new FormControl(this.study.eventIndivInterv, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'noEventIndivInterv': new FormControl(this.study.noEventIndivInterv, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            )
        });
    }
    
    onSubmit() {
        const formModel = this.studyForm.value;
        this.study.eventIndivControl = formModel.eventIndivControl
        this.study.noEventIndivControl = formModel.noEventIndivControl
        this.study.eventIndivInterv = formModel.eventIndivInterv
        this.study.noEventIndivInterv = formModel.noEventIndivInterv
        this.study.calculate();
    }
}
