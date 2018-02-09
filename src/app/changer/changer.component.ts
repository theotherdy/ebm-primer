import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'changer-component',
    templateUrl: './changer.component.html',
    styleUrls: ['./changer.component.css']
})
export class ChangerComponent {
    @Input() value: number;
    
    valueChanged: boolean = false;

    constructor() { }
    
    ngOnChanges(changes: SimpleChanges) {
        if(changes.value.currentValue != changes.value.previousValue) {
            //apply throb style
            this.valueChanged = true;
            //wait then remove it
            setTimeout(()=> {
                this.valueChanged = false;
            }, 1000);
        }
    }

}
