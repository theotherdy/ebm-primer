import { RouterModule, Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { NnttComponent } from './nntt/nntt.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';

const indexRoute: Route = {
    path: '',
    component: NnttComponent
}

const fallbackRoute: Route = {
    path: '**',
    component: NnttComponent
}

const appRoutes: Routes = [
    { path: 'nntt', component: NnttComponent },
    { path: 'diagnosis', component: DiagnosisComponent },
    indexRoute,
    fallbackRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes//,
            //{ enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }