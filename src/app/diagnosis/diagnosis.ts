export class Diagnosis {
    //Input
    public positiveIndivNoDisease: number = 30; //four mandatory values
    public negativeIndivNoDisease: number = 80;
    public positiveIndivDisease: number = 10;
    public negativeIndivDisease: number = 90;
    //Calculated
    public totalIndivNoDisease?: number;
    public totalIndivDisease?: number;
    
    public totalIndivNegative?: number;
    public totalIndivPositive?: number;
    
    public totalIndiv?: number;
        
    public sensitivity?: number; //? = optional
    public specificity?: number;
    
    public positivePredictiveValue?: number;
    public negativePredictiveValue?: number;
    
    public probDiseaseGivenPositive?: number;  //Post-test probability of disease given a positive test
    public probDiseaseGivenNegative?: number;  //Post-test probability of disease given a negative test
    
    public likelihoodRatioPositive?: number;  //Post-test probability of disease given a positive test
    public likelihoodRatioNegative?: number; 
    
    public updated: boolean = false;
    
    public calculate() {
        
        this.totalIndivNoDisease = this.positiveIndivNoDisease + this.negativeIndivNoDisease;
        this.totalIndivDisease = this.positiveIndivDisease + this.negativeIndivDisease;
        
        this.totalIndiv = this.totalIndivNoDisease + this.totalIndivDisease;
        
        this.totalIndivNegative = this.negativeIndivNoDisease + this.negativeIndivDisease;
        this.totalIndivPositive = this.positiveIndivNoDisease + this.positiveIndivDisease;
        
        if(this.totalIndivDisease && this.totalIndivDisease>0) {
            this.sensitivity = this.positiveIndivDisease/this.totalIndivDisease;
        } 
        
        if(this.totalIndivNoDisease && this.totalIndivNoDisease>0) {
            this.specificity = this.negativeIndivNoDisease/this.totalIndivNoDisease;
        } 
        
        if(this.totalIndivNegative && this.totalIndivNegative>0) {
            this.negativePredictiveValue = this.negativeIndivNoDisease/this.totalIndivNegative;
            this.probDiseaseGivenNegative = this.negativeIndivDisease/this.totalIndivNegative;
        } 
        
        if(this.totalIndivPositive && this.totalIndivPositive>0) {
            this.positivePredictiveValue = this.positiveIndivDisease/this.totalIndivPositive;
            this.probDiseaseGivenPositive = this.positivePredictiveValue;
        } 
        
        this.likelihoodRatioPositive = this.sensitivity/(1-this.specificity);
            
        if(this.specificity && this.specificity>0) {
            this.likelihoodRatioNegative = (1-this.sensitivity)/this.specificity;
        }
        
        this.updated=true;
    }
}
