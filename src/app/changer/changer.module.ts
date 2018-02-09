import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangerComponent } from './changer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ChangerComponent],
    exports:      [ ChangerComponent ],
})
export class ChangerModule { }
