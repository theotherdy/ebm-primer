import { RouterModule, Routes, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { StandaloneComponent } from './standalone/standalone.component';
import { EmbeddedComponent } from './embedded/embedded.component';
import { NnttComponent } from './nntt/nntt.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';

/*const indexRoute: Route = {
    path: '',
    redirectTo: 'nntt',
    pathMatch: 'full'
}*/

const fallbackRoute: Route = {
    path: '**',
    redirectTo: '/nntt',
    pathMatch: 'full'
}

const appRoutes: Routes = [
    { 
        path: '',
        component: StandaloneComponent,
        children: [
            { path: '', component: NnttComponent },
            { path: 'nntt', component: NnttComponent },
            { path: 'diagnosis', component: DiagnosisComponent }
        ]
    },
    { 
        path: 'embedded',
        component: EmbeddedComponent,
        children: [
            { path: 'nntt', component: NnttComponent },
            { path: 'diagnosis', component: DiagnosisComponent }
        ]
    },
    //{ path: 'nntt', component: NnttComponent },
    //{ path: 'diagnosis', component: DiagnosisComponent },
    //indexRoute,
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