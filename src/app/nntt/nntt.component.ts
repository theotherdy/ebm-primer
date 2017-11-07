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
    
    /* Cates numbers */
    noOfGood: number;
    noOfLetDown: number;
    noOfOK: number;
    noOfBad: number;
    textGood: string = 'Good outcome';
    textLetDown: string = 'Better without treatment';
    textOK: string = 'Better with treatment';
    textBad: string = 'Bad outcome';
    denominator: number = 100;
    noOfRowsAndColumns: number;

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
        
        /* Calculate Cates numbers*/
        this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        this.noOfBad = Math.round(this.study.eventRateInterv * this.denominator);
        this.noOfOK = 0; 
        this.noOfLetDown = 0; 
        if(this.study.riskDiff > 0) {
            this.noOfOK = Math.round(this.study.riskDiff * this.denominator);
            this.noOfGood = this.denominator - (this.noOfOK + this.noOfBad);
        } else if (this.study.riskDiff < 0) {
            this.noOfLetDown = Math.abs(Math.round(this.study.riskDiff * this.denominator));//make positive as riskDiff is -ve
            this.noOfGood = this.denominator - this.noOfBad;
            this.noOfBad = this.noOfBad - this.noOfLetDown; //ie better with control includes those who would have been better with control
        } 
        
    }
}
