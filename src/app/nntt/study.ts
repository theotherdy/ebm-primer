export class Study {
    //Input
    public eventIndivControl: number = 30; //four mandatory values
    public noEventIndivControl: number = 80;
    public eventIndivInterv: number = 10;
    public noEventIndivInterv: number = 90;
    //Calculated
    public totalIndivControl?: number; //? = optional
    public totalIndivInterv?: number;
    
    public eventRateControl?: number;
    public eventRateInterv?: number;
    
    private noOfSEsFor95CI?:number = 1.96;
    
    public oddsControl?: number;
    public oddsInterv?: number;
    
    public oddsRatio?: number;
    public oddsRatioLL95CI?: number;
    public oddsRatioUL95CI?: number;
    
    public relativeRisk?: number;
    
    public riskDiff?: number;
    public riskDiffLL95CI?: number;
    public riskDiffUL95CI?: number;
    
    public relativeRiskReduction?: number;
    
    public numberNtt?: number;
    public numberNttLL95CI?: number;
    public numberNttUL95CI?: number;
    
    public updated: boolean = false;
    
    public calculate() {
        
        this.totalIndivControl = this.eventIndivControl + this.noEventIndivControl;
        this.totalIndivInterv = this.eventIndivInterv + this.noEventIndivInterv;
        
        
        if(this.totalIndivControl && this.totalIndivControl>0) {
            this.eventRateControl = this.eventIndivControl/this.totalIndivControl;
        } else {
            this.eventRateControl = 1;
        }
        if(this.totalIndivInterv && this.totalIndivInterv>0) {
            this.eventRateInterv = this.eventIndivInterv/this.totalIndivInterv;
        } else {
            this.eventRateInterv = 1;
        }
        
        if(this.eventRateControl && this.eventRateControl>0) {
            this.relativeRisk = this.eventRateInterv/this.eventRateControl;
            //console.log('calculating more');
        }
        
        /* Odds */
        if(this.noEventIndivControl && this.noEventIndivControl>0) {
            this.oddsControl = this.eventIndivControl/this.noEventIndivControl;
        } else {
            this.oddsControl = this.eventIndivControl;
        }
        if(this.noEventIndivInterv && this.noEventIndivInterv>0) {
            this.oddsInterv = this.eventIndivInterv/this.noEventIndivInterv;
        } else {
            this.oddsInterv = this.eventIndivInterv;
        }
        
        if(this.oddsControl && this.oddsControl>0) {
            this.oddsRatio = this.oddsInterv/this.oddsControl
        }
        
        let oddsRatioNatLog: number = Math.log(this.oddsRatio);
        
        let eventIndivIntervTerm: number;
        let eventIndivControlTerm: number;
        let noEventIndivIntervTerm: number;
        let noEventIndivControlTerm: number;
        if(this.eventIndivInterv && this.eventIndivInterv > 0) {
            eventIndivIntervTerm = 1/this.eventIndivInterv;
        } else {
            eventIndivIntervTerm = 1;
        }
        if(this.eventIndivControl && this.eventIndivControl > 0) {
            eventIndivControlTerm = 1/this.eventIndivControl;
        } else {
            eventIndivControlTerm = 1;
        }
        if(this.noEventIndivInterv && this.noEventIndivInterv > 0) {
            noEventIndivIntervTerm = 1/this.noEventIndivInterv;
        } else {
            noEventIndivIntervTerm = 1;
        }
        if(this.noEventIndivControl && this.noEventIndivControl > 0) {
            noEventIndivControlTerm = 1/this.noEventIndivControl;
        } else {
            noEventIndivControlTerm = 1;
        }
        let oddsRatioStdErrNatLog:number = Math.sqrt(eventIndivIntervTerm+eventIndivControlTerm+noEventIndivIntervTerm+noEventIndivControlTerm);
        this.oddsRatioLL95CI = Math.exp(oddsRatioNatLog-this.noOfSEsFor95CI*oddsRatioStdErrNatLog);
        this.oddsRatioUL95CI = Math.exp(oddsRatioNatLog+this.noOfSEsFor95CI*oddsRatioStdErrNatLog);
                        
        /* Risk */
        this.riskDiff = this.eventRateControl-this.eventRateInterv;
        
        let riskDiffStdErrControlTerm: number;
        let riskDiffStdErrIntervTerm: number;
        if(this.totalIndivControl && this.totalIndivControl>0) {
            riskDiffStdErrControlTerm = (this.eventRateControl * (1-this.eventRateControl)) / this.totalIndivControl;
        }
        if(this.totalIndivInterv && this.totalIndivInterv>0) {
            riskDiffStdErrIntervTerm = (this.eventRateInterv * (1-this.eventRateInterv)) / this.totalIndivInterv;
        }
        let riskDiffStdErr: number;
        if(riskDiffStdErrControlTerm + riskDiffStdErrIntervTerm > 0) {
            riskDiffStdErr = Math.sqrt(riskDiffStdErrControlTerm + riskDiffStdErrIntervTerm);
        } else {
            riskDiffStdErr = 0;
        }
        
        this.riskDiffLL95CI = this.riskDiff - (this.noOfSEsFor95CI * riskDiffStdErr);
        this.riskDiffUL95CI = this.riskDiff + (this.noOfSEsFor95CI * riskDiffStdErr);
        
        if(this.eventRateControl && this.eventRateControl > 0) {
            this.relativeRiskReduction = this.riskDiff/this.eventRateControl;
        }
                
        /* Number needed to treat (based on risk) */
        if(this.riskDiff && this.riskDiff!==0) {
            this.numberNtt = 1/this.riskDiff;
            this.numberNttLL95CI = 1/this.riskDiffUL95CI;
            this.numberNttUL95CI = 1/this.riskDiffLL95CI;
        } else if (this.riskDiff && this.riskDiff===0) {
            this.numberNtt = 0;
            this.numberNttLL95CI = 0;
            this.numberNttUL95CI = 0;
        }
        
        this.updated=true;
    }
}
