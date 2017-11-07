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

    //@Input() riskDiff: number; //no who will see a difference ie %OK
    //@Input() eventRateInterv: number;  //no who wil get/have it anyway ie %Bad
    //@Input() denominator: number; //size of graph - eventually check for a square number?
    
    @Input() noOfGood: number; 
    @Input() noOfLetDown: number;  
    @Input() noOfOK: number;
    @Input() noOfBad: number;
    @Input() noOfRowsAndColumns: number;
    
    //noOfRowsAndColumns: number;
    
    catesPeople: CatesPerson[];
    
    constructor() { }

    ngOnInit() {
        this.createPeople();    
    }
    
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.createPeople();
    }
    
    createPeople() {
        //this.noOfRowsAndColumns = Math.sqrt(this.denominator);
        //this.noOfBad = Math.round(this.eventRateInterv * this.denominator);
        //this.noOfOK = 0; 
        //this.noOfLetDown = 0; 
        //if(this.riskDiff > 0) {
        //    this.noOfOK = Math.round(this.riskDiff * this.denominator);
        //    this.noOfGood = this.denominator - (this.noOfOK + this.noOfBad);
        //} else if (this.riskDiff < 0) {
        //    this.noOfBetterWithControl = Math.abs(Math.round(this.riskDiff * this.denominator));//make positive as riskDiff is -ve
        //    this.noOfGood = this.denominator - this.noOfBad;
        //    this.noOfBad = this.noOfBad - this.noOfLetDown; //ie better with control includes those who would have been better with control
        //} 
        this.catesPeople = [];
        /* Create the 'people' based on the above */
        for(let i = 0;i<this.noOfGood;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 0; //Good outcome
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfOK;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 1; //Better with treatment
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfLetDown;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 3; //Better with control
            this.catesPeople.push(thisCatesPerson);
        }
        for(let i = 0;i<this.noOfBad;i++) {
            let thisCatesPerson = new CatesPerson();
            thisCatesPerson.type = 2; //Bad outcome
            this.catesPeople.push(thisCatesPerson);
        }
    }
    
}
