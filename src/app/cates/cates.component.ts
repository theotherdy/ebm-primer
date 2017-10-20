import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

import { CatesPerson } from './cates-person';

@Component({
    selector: 'cates-component',
    templateUrl: './cates.component.html',
    styleUrls: ['./cates.component.css']
})

/* Draws a Cates graph
*  See: http://www.nntonline.net/visualrx/examples/
*/

export class CatesComponent implements OnInit, OnChanges {

    @Input() riskDiff: number; //no who will see a difference
    @Input() eventRateInterv: number;  //no who wil get/have it anyway
    @Input() denominator: number; //size of graph - eventually check for a square number?
    
    noOfGoodOutcome: number;
    noOfBetterWithControl: number;
    noOfBetterWithTreatment: number;
    noOfBadOutcome: number;
    
    noOfRowsAndColumns: number;
    
    catesPeople: CatesPerson[];
    
    constructor() { }

    ngOnInit() {
        this.createPeople();    
    }
    
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.createPeople();
    }
    
    createPeople() {
        this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        this.noOfBadOutcome = Math.round(this.eventRateInterv * this.denominator);
        this.noOfBetterWithTreatment = 0; 
        this.noOfBetterWithControl = 0; 
        if(this.riskDiff > 0) {
            this.noOfBetterWithTreatment = Math.round(this.riskDiff * this.denominator);
            this.noOfGoodOutcome = this.denominator - (this.noOfBetterWithTreatment + this.noOfBadOutcome);
        } else if (this.riskDiff < 0) {
            this.noOfBetterWithControl = Math.abs(Math.round(this.riskDiff * this.denominator));//make positive as riskDiff is -ve
            this.noOfGoodOutcome = this.denominator - this.noOfBadOutcome;
            this.noOfBadOutcome = this.noOfBadOutcome - this.noOfBetterWithControl; //ie better with control includes those who would have been better with control
        } 
        this.catesPeople = [];
        /* Create the 'people' based on the above */
        for(let i = 0;i<this.noOfGoodOutcome;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 0; //Good outcome
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfBetterWithTreatment;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 1; //Better with treatment
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfBetterWithControl;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 3; //Better with control
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfBadOutcome;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 2; //Bad outcome
            this.catesPeople.push(thisCatesPerson);
        }
    }
    
}
