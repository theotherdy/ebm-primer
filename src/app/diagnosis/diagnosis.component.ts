import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Diagnosis } from './diagnosis';

import { isIntegerValidator } from '../shared/integer-validator.directive';


@Component({
    selector: 'diagnosis-component',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

    diagnosis: Diagnosis;
    diagnosisForm: FormGroup;
    
    /* Cates numbers */
    noOfGood: number;
    noOfLetDown: number;
    noOfOK: number;
    noOfBad: number;
    denominator: number = 100;
    noOfRowsAndColumns: number;

    constructor() { }

    ngOnInit() {
        this.diagnosis = new Diagnosis();
        
        this.diagnosisForm = new FormGroup({
            'positiveIndivNoDisease': new FormControl(this.diagnosis.positiveIndivNoDisease, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'negativeIndivNoDisease': new FormControl(this.diagnosis.negativeIndivNoDisease, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'positiveIndivDisease': new FormControl(this.diagnosis.positiveIndivDisease, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            ),
            'negativeIndivDisease': new FormControl(this.diagnosis.negativeIndivDisease, [
                    Validators.required,
                    Validators.min(0),
                    isIntegerValidator()
                ]
            )
        });
    }
    
    onSubmit() {
        const formModel = this.diagnosisForm.value;
        this.diagnosis.positiveIndivNoDisease = formModel.positiveIndivNoDisease
        this.diagnosis.negativeIndivNoDisease = formModel.negativeIndivNoDisease
        this.diagnosis.positiveIndivDisease = formModel.positiveIndivDisease
        this.diagnosis.negativeIndivDisease = formModel.negativeIndivDisease
        this.diagnosis.calculate();
        /* Calculate Cates numbers*/
        this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        let total = this.diagnosis.positiveIndivNoDisease + this.diagnosis.negativeIndivNoDisease + this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease;
        
        
        this.noOfBad = Math.round(this.diagnosis.positiveIndivDisease/total * this.denominator);
        this.noOfOK = Math.round(this.diagnosis.positiveIndivNoDisease/total * this.denominator);
        this.noOfLetDown = Math.round(this.diagnosis.negativeIndivDisease/total * this.denominator);
        this.noOfGood = this.denominator - (this.noOfBad + this.noOfOK + this.noOfLetDown);
        
        /*this.noOfOK = 0; 
        this.noOfLetDown = 0; 
        let riskDiffEquivalent = this.diagnosis.specificity-this.diagnosis.sensitivity
        if(riskDiffEquivalent > 0) {
            this.noOfOK = Math.round(riskDiffEquivalent * this.denominator);
            this.noOfGood = this.denominator - (this.noOfOK + this.noOfBad);
        } else if (riskDiffEquivalent < 0) {
            this.noOfLetDown = Math.abs(Math.round(riskDiffEquivalent * this.denominator)); //make positive as riskDiff is -ve
            this.noOfGood = this.denominator - this.noOfBad;
            this.noOfBad = this.noOfBad - this.noOfLetDown; //ie better with control includes those who would have been better with control
        } */
    }
}
