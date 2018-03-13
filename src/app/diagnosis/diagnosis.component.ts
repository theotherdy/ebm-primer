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
    
    positiveIndivDiseaseChanged:boolean = false;
    negativeIndivDiseaseChanged:boolean = false;
    negativeIndivNoDiseaseChanged:boolean = false;
    positiveIndivNoDiseaseChanged:boolean = false;

    diagnosis: Diagnosis;
    lastDiagnosis: Diagnosis;
    diagnosisForm: FormGroup;
    
    /* Cates numbers */
    noOfGood: number;
    noOfLetDown: number;
    noOfOK: number;
    noOfBad: number;
    textGood: string = 'Negative test, condition absent';
    textLetDown: string = 'Negative test, condition present';
    textOK: string = 'Positive test, condition absent';
    textBad: string = 'Positive test, condition present';
    denominator: number = 100;
    noOfRowsAndColumns: number;
    
    adjustPrevalenceBy: number = 0;
    adjustSensitivityBy: number = 0;
    adjustSpecificityBy: number = 0;
    
    calculated: boolean = false; //tracking whether calculate button has been pressed
    simulated: boolean = false; //tracking whether simulation sliders have ben used
    
    //formModel: any;

    constructor() { }

    ngOnInit() {
        this.diagnosis = new Diagnosis();
        this.lastDiagnosis = new Diagnosis();
        
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
        this.diagnosis.positiveIndivNoDisease = formModel.positiveIndivNoDisease;
        this.diagnosis.negativeIndivNoDisease = formModel.negativeIndivNoDisease;
        this.diagnosis.positiveIndivDisease = formModel.positiveIndivDisease;
        this.diagnosis.negativeIndivDisease = formModel.negativeIndivDisease;
        this.diagnosis.calculate();
        /* Calculate Cates numbers*/
        this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        //let total = this.diagnosis.positiveIndivNoDisease + this.diagnosis.negativeIndivNoDisease + this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease;
        
        this.calculated = true;
        
        this.updateValuesForCates();
        
        //this.lastDiagnosis = this.diagnosis; 
        //this.lastDiagnosis. = Object.assign({}, this.diagnosis); //take a copy (not just a reference) that we can reset to
        this.lastDiagnosis.positiveIndivNoDisease = this.diagnosis.positiveIndivNoDisease;
        this.lastDiagnosis.negativeIndivNoDisease = this.diagnosis.negativeIndivNoDisease;
        this.lastDiagnosis.positiveIndivDisease = this.diagnosis.positiveIndivDisease;
        this.lastDiagnosis.negativeIndivDisease = this.diagnosis.negativeIndivDisease;
        this.lastDiagnosis.specificity = this.diagnosis.specificity;
        this.lastDiagnosis.totalIndiv = this.diagnosis.totalIndiv;
    }
    
    onAdjustPrevalence() {
        //first reset other two sliders
        this.diagnosis.specificity = this.lastDiagnosis.specificity;
        this.diagnosis.sensitivity = this.lastDiagnosis.sensitivity;
        
        let adjustPrevalenceByMultiplier: number = this.adjustPrevalenceBy/100;
        //change formModel.positiveIndivDisease
        this.diagnosis.positiveIndivDisease = Math.round(this.lastDiagnosis.positiveIndivDisease + (adjustPrevalenceByMultiplier * this.lastDiagnosis.positiveIndivDisease));
        if(this.lastDiagnosis.positiveIndivDisease > 0) {
            this.diagnosis.negativeIndivDisease = Math.round((this.lastDiagnosis.negativeIndivDisease/this.lastDiagnosis.positiveIndivDisease) * this.diagnosis.positiveIndivDisease);
        } else {
            this.diagnosis.negativeIndivDisease = this.lastDiagnosis.negativeIndivDisease;
        }
        
        this.diagnosis.negativeIndivNoDisease = Math.round(this.lastDiagnosis.specificity * (this.lastDiagnosis.totalIndiv - (this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease)));
        this.diagnosis.positiveIndivNoDisease = this.lastDiagnosis.totalIndiv - (this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease + this.diagnosis.negativeIndivNoDisease);
        
        this.upDate2x2();
        
        /* making inputs pulse */
        this.positiveIndivDiseaseChanged = true;
        this.negativeIndivDiseaseChanged = true;
        this.negativeIndivNoDiseaseChanged = true;
        this.positiveIndivNoDiseaseChanged = true;
        
        setTimeout(()=> {
            this.positiveIndivDiseaseChanged = false;
            this.negativeIndivDiseaseChanged = false;
            this.negativeIndivNoDiseaseChanged = false;
            this.positiveIndivNoDiseaseChanged = false;
        }, 1000);
        
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onAdjustSensitivity() {
        //first reset other two sliders
        this.diagnosis.specificity = this.lastDiagnosis.specificity;
        this.adjustPrevalenceBy = 0;
        
        this.diagnosis.positiveIndivDisease = Math.round((this.lastDiagnosis.positiveIndivDisease + this.lastDiagnosis.negativeIndivDisease) * this.diagnosis.sensitivity);
        console.log(this.lastDiagnosis.positiveIndivDisease);
        console.log(this.lastDiagnosis.negativeIndivDisease);
        console.log(this.diagnosis.sensitivity);
        
        this.diagnosis.negativeIndivDisease = (this.lastDiagnosis.positiveIndivDisease + this.lastDiagnosis.negativeIndivDisease)-this.diagnosis.positiveIndivDisease;
        this.diagnosis.negativeIndivNoDisease = this.lastDiagnosis.negativeIndivNoDisease;
        this.diagnosis.positiveIndivNoDisease = this.lastDiagnosis.positiveIndivNoDisease;
        
        this.upDate2x2();
        
        /* making inputs pulse */
        this.positiveIndivDiseaseChanged = true;
        this.negativeIndivDiseaseChanged = true;
        
        setTimeout(()=> {
            this.positiveIndivDiseaseChanged = false;
            this.negativeIndivDiseaseChanged = false;
        }, 1000);
        
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onAdjustSpecificity() {
        //first reset other two sliders
        this.adjustPrevalenceBy = 0;
        this.diagnosis.sensitivity = this.lastDiagnosis.sensitivity;
        
        this.diagnosis.positiveIndivDisease = this.lastDiagnosis.positiveIndivDisease;
        this.diagnosis.negativeIndivDisease = this.lastDiagnosis.negativeIndivDisease;
        this.diagnosis.negativeIndivNoDisease = Math.round((this.lastDiagnosis.negativeIndivNoDisease + this.lastDiagnosis.positiveIndivNoDisease) * this.diagnosis.specificity);
        this.diagnosis.positiveIndivNoDisease = (this.lastDiagnosis.negativeIndivNoDisease + this.lastDiagnosis.positiveIndivNoDisease)-this.diagnosis.negativeIndivNoDisease;
        
        this.upDate2x2();
        
        /* making inputs pulse */
        this.negativeIndivNoDiseaseChanged = true;
        this.positiveIndivNoDiseaseChanged = true;
        
        setTimeout(()=> {
            this.negativeIndivNoDiseaseChanged = false;
            this.positiveIndivNoDiseaseChanged = false;
        }, 1000);
        
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onReset() {
        this.adjustPrevalenceBy = 0;
        this.adjustSensitivityBy = 0;
        this.adjustSpecificityBy = 0;
        //this.diagnosis = Object.assign({}, this.lastDiagnosis); 
        this.diagnosis.positiveIndivNoDisease = this.lastDiagnosis.positiveIndivNoDisease;
        this.diagnosis.negativeIndivNoDisease = this.lastDiagnosis.negativeIndivNoDisease;
        this.diagnosis.positiveIndivDisease = this.lastDiagnosis.positiveIndivDisease;
        this.diagnosis.negativeIndivDisease = this.lastDiagnosis.negativeIndivDisease;
        
        this.upDate2x2();
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = false;
        
    }
    
    upDate2x2() {
        this.diagnosisForm.patchValue({
            positiveIndivDisease: this.diagnosis.positiveIndivDisease,
            negativeIndivDisease: this.diagnosis.negativeIndivDisease,
            negativeIndivNoDisease: this.diagnosis.negativeIndivNoDisease,
            positiveIndivNoDisease: this.diagnosis.positiveIndivNoDisease
        });
    }
    
    updateValuesForCates() {
        this.noOfBad = Math.round(this.diagnosis.positiveIndivDisease/this.diagnosis.totalIndiv * this.denominator);
        this.noOfOK = Math.round(this.diagnosis.positiveIndivNoDisease/this.diagnosis.totalIndiv * this.denominator);
        this.noOfLetDown = Math.round(this.diagnosis.negativeIndivDisease/this.diagnosis.totalIndiv * this.denominator);
        this.noOfGood = this.denominator - (this.noOfBad + this.noOfOK + this.noOfLetDown);
    }
}
