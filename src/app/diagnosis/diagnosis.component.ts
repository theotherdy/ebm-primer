import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";

import { Diagnosis } from './diagnosis';

import { isIntegerValidator } from '../shared/integer-validator.directive';

import {MatTableDataSource} from '@angular/material';

import * as d3 from 'd3';

export interface LikelihoodRatio {
    position: number;
    value: string;
    probability: string;
    interpretation: string;
}

const POSITIVE_RATIO_DATA: LikelihoodRatio[] = [
    {position: 1, value: '10', probability: '45%', interpretation: 'Large increase in the likelihood of disease'},
    {position: 2, value: '5', probability: '30%', interpretation: 'Moderate increase in the likelihood of disease'},
    {position: 3, value: '2', probability: '15%', interpretation: 'Slight increase in the likelihood of disease'},
    {position: 5, value: '1', probability: '0%', interpretation: 'No change in the likelihood of disease'},
    {position: 6, value: '0.5', probability: '-15%', interpretation: 'Slight decrease in the likelihood of disease'},
    {position: 7, value: '0.2', probability: '-30%', interpretation: 'Moderate decrease in the likelihood of disease'},
    {position: 8, value: '0.1', probability: '-45%', interpretation: 'Large decrease in the likelihood of disease'},
];

const NEGATIVE_RATIO_DATA: LikelihoodRatio[] = [
    {position: 1, value: '10', probability: '-45%', interpretation: 'Large decrease in the likelihood of disease'},
    {position: 2, value: '5', probability: '-30%', interpretation: 'Moderate decrease in the likelihood of disease'},
    {position: 3, value: '2', probability: '-15%', interpretation: 'Slight decrease in the likelihood of disease'},
    {position: 5, value: '1', probability: '0%', interpretation: 'No change in the likelihood of disease'},
    {position: 6, value: '0.5', probability: '15%', interpretation: 'Slight increase in the likelihood of disease'},
    {position: 7, value: '0.2', probability: '30%', interpretation: 'Moderate increase in the likelihood of disease'},
    {position: 8, value: '0.1', probability: '45%', interpretation: 'Large increase in the likelihood of disease'},
];


@Component({
    selector: 'diagnosis-component',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit, AfterContentInit {
    
    /*positiveIndivDiseaseChanged:boolean = false;
    negativeIndivDiseaseChanged:boolean = false;
    negativeIndivNoDiseaseChanged:boolean = false;
    positiveIndivNoDiseaseChanged:boolean = false;*/

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
    //adjustSensitivityBy: number = 0;
    //adjustSpecificityBy: number = 0;
    
    calculated: boolean = false; //tracking whether calculate button has been pressed
    simulated: boolean = false; //tracking whether simulation sliders have ben used
    
    negativeDataSource = NEGATIVE_RATIO_DATA;
    positiveDataSource = POSITIVE_RATIO_DATA;
    displayedColumns = ['value', 'probability', 'interpretation'];
    
    isMobileView: boolean = false;
    subscriptionMedia: any;
    sliderVertical: boolean = true;
    
    svgWidth: number = 200;
    svgHeight: number = 100;
    //svgPadding: number = 20;
    //simulation: any;
    svgContainer: any;
    circles: any;
    jsonCircles: any;
    
    showWhatinSVG: string = "0";
    
    label1: string;
    label2: string;
    
    //formModel: any;

    constructor(
        public media: ObservableMedia
    ) { }

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
        
        //checking whether on mobile or desktop 
        this.isMobileView = this.media.isActive('xs');
        this.subscriptionMedia = this.media.subscribe((change:MediaChange) => {
            this.isMobileView = change.mqAlias === 'xs';
            if(this.isMobileView) {
                this.sliderVertical = false;
            } else {
                this.sliderVertical = true;
            }
        }); 
    }
    
    ngAfterContentInit() {
        let parentDiv = document.getElementById("d3Graph");
        this.svgContainer = d3.select(parentDiv)
                                .append("div")
                                .classed("svg-container", true) //container class to make it responsive
                                .append("svg")
                                //responsive SVG needs these 2 attributes and no width and height attr
                                .attr("preserveAspectRatio", "xMinYMin meet")
                                .attr("viewBox", "0 0 "+this.svgWidth+" "+this.svgHeight)
                                //class to make it responsive
                                .classed("svg-content-responsive", true);
        /*this.simulation = d3.forceSimulation()
            .force("forceX", d3.forceX().strength(.1).x(this.svgWidth * .5))
            .force("forceY", d3.forceY().strength(.1).y(this.svgHeight * .5))
            .force("center", d3.forceCenter().x(this.svgWidth * .5).y(this.svgHeight * .5))
            .force("charge", d3.forceManyBody().strength(-15));
        this.simulation
          .force("collide", d3.forceCollide().strength(.5).radius((d)=>{ return d.radius + this.svgPadding; }).iterations(1))
          .on("tick", (d)=>{
            this.circles
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
          });
        
        this.circles = this.svgContainer.selectAll("circle");//svg.append("g")
            //.attr("class", "node")
            //.selectAll("circle");*/
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
        this.lastDiagnosis.sensitivity = this.diagnosis.sensitivity;
        this.lastDiagnosis.totalIndiv = this.diagnosis.totalIndiv;
    }
    
    onAdjustPrevalence() {
        //first reset other two sliders
        this.diagnosis.specificity = this.lastDiagnosis.specificity;
        this.diagnosis.sensitivity = this.lastDiagnosis.sensitivity;
        
        let adjustPrevalenceByMultiplier: number = this.adjustPrevalenceBy/100;
        //change formModel.positiveIndivDisease
        //this.diagnosis.positiveIndivDisease = Math.round(this.lastDiagnosis.positiveIndivDisease + (adjustPrevalenceByMultiplier * this.lastDiagnosis.positiveIndivDisease));
        this.diagnosis.positiveIndivDisease = this.lastDiagnosis.positiveIndivDisease + (adjustPrevalenceByMultiplier * this.lastDiagnosis.positiveIndivDisease);
        if(this.lastDiagnosis.positiveIndivDisease > 0) {
            //this.diagnosis.negativeIndivDisease = Math.round((this.lastDiagnosis.negativeIndivDisease/this.lastDiagnosis.positiveIndivDisease) * this.diagnosis.positiveIndivDisease);
            this.diagnosis.negativeIndivDisease = (this.lastDiagnosis.negativeIndivDisease/this.lastDiagnosis.positiveIndivDisease) * this.diagnosis.positiveIndivDisease;
        } else {
            this.diagnosis.negativeIndivDisease = this.lastDiagnosis.negativeIndivDisease;
        }
        
        //this.diagnosis.negativeIndivNoDisease = Math.round(this.lastDiagnosis.specificity * (this.lastDiagnosis.totalIndiv - (this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease)));
        this.diagnosis.negativeIndivNoDisease = this.lastDiagnosis.specificity * (this.lastDiagnosis.totalIndiv - (this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease));
        this.diagnosis.positiveIndivNoDisease = this.lastDiagnosis.totalIndiv - (this.diagnosis.positiveIndivDisease + this.diagnosis.negativeIndivDisease + this.diagnosis.negativeIndivNoDisease);
        
        this.upDate2x2();
        
        /* making inputs pulse */
        //this.positiveIndivDiseaseChanged = true;
        //this.negativeIndivDiseaseChanged = true;
        //this.negativeIndivNoDiseaseChanged = true;
        //this.positiveIndivNoDiseaseChanged = true;
        
        //setTimeout(()=> {
        //    this.positiveIndivDiseaseChanged = false;
        //    this.negativeIndivDiseaseChanged = false;
        //    this.negativeIndivNoDiseaseChanged = false;
        //    this.positiveIndivNoDiseaseChanged = false;
        //}, 1000);
        
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onAdjustSensitivity() {
        //first reset other two sliders
        this.diagnosis.specificity = this.lastDiagnosis.specificity;
        this.adjustPrevalenceBy = 0;
        
        //this.diagnosis.positiveIndivDisease = Math.round((this.lastDiagnosis.positiveIndivDisease + this.lastDiagnosis.negativeIndivDisease) * this.diagnosis.sensitivity);
        this.diagnosis.positiveIndivDisease = (this.lastDiagnosis.positiveIndivDisease + this.lastDiagnosis.negativeIndivDisease) * this.diagnosis.sensitivity;
        //console.log(this.lastDiagnosis.positiveIndivDisease);
        //console.log(this.lastDiagnosis.negativeIndivDisease);
        //console.log(this.diagnosis.sensitivity);
        
        this.diagnosis.negativeIndivDisease = (this.lastDiagnosis.positiveIndivDisease + this.lastDiagnosis.negativeIndivDisease)-this.diagnosis.positiveIndivDisease;
        this.diagnosis.negativeIndivNoDisease = this.lastDiagnosis.negativeIndivNoDisease;
        this.diagnosis.positiveIndivNoDisease = this.lastDiagnosis.positiveIndivNoDisease;
        
        this.upDate2x2();
        
        /* making inputs pulse */
        //this.positiveIndivDiseaseChanged = true;
        //this.negativeIndivDiseaseChanged = true;
        
        //setTimeout(()=> {
        //    this.positiveIndivDiseaseChanged = false;
        //    this.negativeIndivDiseaseChanged = false;
        //}, 1000);
        
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
        //this.diagnosis.negativeIndivNoDisease = Math.round((this.lastDiagnosis.negativeIndivNoDisease + this.lastDiagnosis.positiveIndivNoDisease) * this.diagnosis.specificity);
        this.diagnosis.negativeIndivNoDisease = (this.lastDiagnosis.negativeIndivNoDisease + this.lastDiagnosis.positiveIndivNoDisease) * this.diagnosis.specificity;
        this.diagnosis.positiveIndivNoDisease = (this.lastDiagnosis.negativeIndivNoDisease + this.lastDiagnosis.positiveIndivNoDisease)-this.diagnosis.negativeIndivNoDisease;
        
        this.upDate2x2();
        
        /* making inputs pulse */
        //this.negativeIndivNoDiseaseChanged = true;
        //this.positiveIndivNoDiseaseChanged = true;
        
        //setTimeout(()=> {
        //    this.negativeIndivNoDiseaseChanged = false;
        //    this.positiveIndivNoDiseaseChanged = false;
        //}, 1000);
        
        this.updateValuesForCates();
        
        this.diagnosis.calculate();
        this.calculated = true;
        this.simulated = true;
    }
    
    onReset() {
        this.adjustPrevalenceBy = 0;
        //this.adjustSensitivityBy = 0;
        //this.adjustSpecificityBy = 0;
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
    
    onShowWhatChange() {
        this.updateValuesForCates();
    }
    
    updateValuesForCates() {
        this.noOfBad = Math.round((this.diagnosis.positiveIndivDisease/this.diagnosis.totalIndiv) * this.denominator);
        this.noOfOK = Math.round((this.diagnosis.positiveIndivNoDisease/this.diagnosis.totalIndiv) * this.denominator);
        //console.log(this.diagnosis.positiveIndivNoDisease + " " + this.diagnosis.totalIndiv + " " this.denominator + " " + this.noOfOK);
        this.noOfLetDown = Math.round((this.diagnosis.negativeIndivDisease/this.diagnosis.totalIndiv) * this.denominator);
        this.noOfGood = this.denominator - (this.noOfBad + this.noOfOK + this.noOfLetDown);
        
        let radius1: number;
        let radius2: number;
        let label1: string;
        let label2: string;
        
    console.log(this.showWhatinSVG);
        
        //react to button group for what to show        
        if(this.showWhatinSVG=="0"){
            //+ve test
            radius1 = this.noOfOK/2;  //false positive
            radius2 = this.noOfBad/2; //true positive
            this.label1 = "false positive";
            this.label2 = "true positive";
        } else if(this.showWhatinSVG=="1"){
            //-ve test
            radius1 = this.noOfLetDown/2; //false negative
            radius2 = this.noOfGood/2;  //true negative
            this.label1 = "false negative";
            this.label2 = "true negative";
        } else if(this.showWhatinSVG=="2"){
            //+ve likelihood
            radius1 = this.diagnosis.sensitivity * 50; //sensitivity
            radius2 = (1-this.diagnosis.specificity) * 50;  //1 - specificity
            this.label1 = "sensitivity";
            this.label2 = "1-specificity";
        } else if(this.showWhatinSVG=="3"){
            //ive likelihood
            radius1 = (1-this.diagnosis.sensitivity) * 50; //1 - sensitivity
            radius2 = this.diagnosis.specificity * 50;  //specificity
            this.label1 = "1-sensitivity";
            this.label2 = "specificity";
        }
        
        console.log(this.showWhatinSVG);
        console.log(radius1 + " " + radius2);
        
        this.jsonCircles = [
            { "cx": 50, "cy": 50, "radius": radius1, "color" : "#e8ab1e", "label": this.label1 },
            { "cx": 150, "cy": 50, "radius": radius2, "color" : "#002147", "label": this.label2 },
        ];
        
        this.circles = this.svgContainer.selectAll("circle")
                          .data(this.jsonCircles);
        
        this.updateSvg();
        
    }
    
    updateSvg(){
        
        var elemEnter = this.circles.enter()
            .append("g")
            .attr("class", "node-group");
        
        var circle = elemEnter.append("circle")
                //.append("circle")
                .attr("cx", function (d) { return d.cx; })
                .attr("cy", function (d) { return d.cy; })
                .attr("r", function (d) { return d.radius; })
                .style("fill", function(d) { return d.color; })
                .style("fill-opacity", .3)
                .style("fill", function(d) { return d.color; })
                .style("stroke-opacity", 0.8)
                .style("stroke-width", 0.3)
                .style("stroke", function(d) { return d.color; });
                
        let circleAttributes = this.circles
            .attr("cx", function (d) { return d.cx; })
            .attr("cy", function (d) { return d.cy; })
            .attr("r", function (d) { return d.radius; })
            .style("fill", function(d) { return d.color; })
            .style("fill-opacity", .3)
            .style("fill", function(d) { return d.color; })
            .style("stroke-opacity", 0.8)
            .style("stroke-width", 0.3)
            .style("stroke", function(d) { return d.color; });
        
        this.circles
            .exit()
            .remove();
        
    }
}
