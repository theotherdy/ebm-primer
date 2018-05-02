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
    lastStudy: Study;
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
    
    adjustPrevalenceBy: number = 100;  //for this 100 = normal
    maxAdjustPrevalenceBy: number = 0;
    
    calculated: boolean = false; //tracking whether calculate button has been pressed
    simulated: boolean = false; //tracking whether simulation sliders have ben used
    
    eventIndivControlChanged:boolean = false;
    eventIndivIntervChanged:boolean = false;
    
    constructor() { }

    ngOnInit() {
        this.study = new Study();
        this.lastStudy = new Study();
        
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
        this.study.eventIndivControl = formModel.eventIndivControl  //CE
        this.study.noEventIndivControl = formModel.noEventIndivControl  //CNoE
        this.study.eventIndivInterv = formModel.eventIndivInterv  //EE
        this.study.noEventIndivInterv = formModel.noEventIndivInterv  //ENoE
        this.study.calculate();
        this.calculated = true;
        this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        
        this.updateValuesForCates();
        
        this.lastStudy.eventIndivControl = this.study.eventIndivControl;
        this.lastStudy.noEventIndivControl = this.study.noEventIndivControl;
        this.lastStudy.eventIndivInterv = this.study.eventIndivInterv;
        this.lastStudy.noEventIndivInterv = this.study.noEventIndivInterv;
        this.lastStudy.eventRateControl = this.study.eventRateControl;
        this.lastStudy.eventRateInterv = this.study.eventRateInterv;
        
        //console.log(this.study.eventRateControl);
        //console.log(this.study.eventRateInterv);
        
        //now need to calculate maximum values for the prevalence slider
        //as neither eventRateControl nor eventRateInterv can be allowed to be > 1
        let reciprocalEventRateControl = 1/this.study.eventRateControl;
        let reciprocalEventRateInterv = 1/this.study.eventRateInterv;
        
        //console.log(reciprocalEventRateControl);
        //console.log(reciprocalEventRateInterv);
        
        this.maxAdjustPrevalenceBy = (Math.floor(Math.min(reciprocalEventRateControl,reciprocalEventRateInterv)*10)/10)*100;
        this.maxAdjustPrevalenceBy = Math.min(1000,this.maxAdjustPrevalenceBy)
        
        //console.log(this.maxAdjustPrevalenceBy);
    }
    
    onAdjustPrevalence() {
        let adjustPrevalenceByMultiplier: number = this.adjustPrevalenceBy/100;
        
        /*this.study.eventIndivControl; //CE
        this.study.noEventIndivControl; //CNoE
        this.study.eventIndivInterv; //EE
        this.study.noEventIndivInterv; //ENoE
        
        this.study.eventRateControl;  //CER
        this.study.eventRateInterv;  //EER*/
        
        this.study.eventRateControl = adjustPrevalenceByMultiplier * this.lastStudy.eventRateControl;
        this.study.eventRateInterv = adjustPrevalenceByMultiplier * this.lastStudy.eventRateInterv;
        
        console.log(adjustPrevalenceByMultiplier);
        console.log(this.study.eventRateControl);
        console.log(this.study.eventRateInterv);
        
        //allowing non-integer values whe simulating
        this.study.eventIndivControl = (this.study.eventRateControl * this.lastStudy.noEventIndivControl)/(1-this.study.eventRateControl);
        this.study.eventIndivInterv = (this.study.eventRateInterv * this.lastStudy.noEventIndivInterv)/(1-this.study.eventRateInterv);
        //this.study.eventIndivControl = Math.round((this.study.eventRateControl * this.lastStudy.noEventIndivControl)/(1-this.study.eventRateControl));
        //this.study.eventIndivInterv = Math.round((this.study.eventRateInterv * this.lastStudy.noEventIndivInterv)/(1-this.study.eventRateInterv));
                
        this.upDate2x2();
        
        /* making inputs pulse */
        this.eventIndivControlChanged = true;
        this.eventIndivIntervChanged = true;
        
        setTimeout(()=> {
            this.eventIndivControlChanged = false;
            this.eventIndivIntervChanged = false;
        }, 1000);
        
        this.updateValuesForCates();
        
        this.study.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onReset() {
        this.adjustPrevalenceBy = 100;
        //this.diagnosis = Object.assign({}, this.lastDiagnosis); 
        this.study.eventIndivControl = this.lastStudy.eventIndivControl;
        this.study.noEventIndivControl = this.lastStudy.noEventIndivControl;
        this.study.eventIndivInterv = this.lastStudy.eventIndivInterv;
        this.study.noEventIndivInterv = this.lastStudy.noEventIndivInterv;
        this.study.eventRateControl = this.lastStudy.eventRateControl;
        this.study.eventRateInterv = this.lastStudy.eventRateInterv;
        
        this.upDate2x2();
        this.updateValuesForCates();
        
        this.study.calculate();
        this.calculated = true;
        this.simulated = false;
        
    }
    
    upDate2x2() {
        this.studyForm.patchValue({
            eventIndivControl: this.study.eventIndivControl,
            eventIndivInterv: this.study.eventIndivInterv,
        });
    }
    
    updateValuesForCates() {
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
