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
    
    public relativeRisk?: number;
    
    private noOfSEsFor95CI?:number = 1.96;
    
    public riskDiff?: number;
    private riskDiffStdErrControlTerm?: number;
    private riskDiffStdErrIntervTerm?: number;
    private riskDiffStdErr?: number;
    public riskDiffLL95CI?: number;
    public riskDiffUL95CI?: number;
    
    public relativeRiskReduction?: number;
    
    public numberNtt?: number;
    public numberNttLL95CI?: number;
    public numberNttUL95CI?: number;
    
    public updated: boolean = false;
    
    public calculate() {
        //console.log('calculating');
        
        this.totalIndivControl = this.eventIndivControl + this.noEventIndivControl;
        this.totalIndivInterv = this.eventIndivInterv + this.noEventIndivInterv;
        
        //console.log(this.totalIndivControl + ' ' +this.totalIndivInterv);
        
        if(this.totalIndivControl && this.totalIndivControl>0) {
            this.eventRateControl = this.eventIndivControl/this.totalIndivControl;
        }
        if(this.totalIndivInterv && this.totalIndivInterv>0) {
            this.eventRateInterv = this.eventIndivInterv/this.totalIndivInterv;
        }
        
        if(this.eventRateControl && this.eventRateControl>0) {
            this.relativeRisk = this.eventRateInterv/this.eventRateControl;
            //console.log('calculating more');
        }
        
        this.riskDiff = this.eventRateControl-this.eventRateInterv;
        
        if(this.totalIndivControl && this.totalIndivControl>0) {
            this.riskDiffStdErrControlTerm = (this.eventRateControl * (1-this.eventRateControl)) / this.totalIndivControl;
        }
        if(this.totalIndivInterv && this.totalIndivInterv>0) {
            this.riskDiffStdErrIntervTerm = (this.eventRateInterv * (1-this.eventRateInterv)) / this.totalIndivInterv;
        }
        if(this.riskDiffStdErrControlTerm + this.riskDiffStdErrIntervTerm > 0) {
            this.riskDiffStdErr = Math.sqrt(this.riskDiffStdErrControlTerm + this.riskDiffStdErrIntervTerm);
        }
        
        this.riskDiffLL95CI = this.riskDiff - (this.noOfSEsFor95CI * this.riskDiffStdErr);
        this.riskDiffUL95CI = this.riskDiff + (this.noOfSEsFor95CI * this.riskDiffStdErr);
        
        if(this.eventRateControl && this.eventRateControl > 0) {
            this.relativeRiskReduction = this.riskDiff/this.eventRateControl;
        }
        
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
