import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent }  from './compose-message.component';
import { PageNotFoundComponent }    from './not-found.component';
import {AddRiscComponent} from './add-risc/add-risc.component';

import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AllSurveysComponent } from './all-surveys/all-surveys.component';

const appRoutes: Routes = [
  {
    path: 'survey-center',
    loadChildren: 'app/survey-center/survey-center.module#surveyCenterModule',
    data: { preload: true }
  },
  {
    path:'all-surveys',
    component:AllSurveysComponent
  },
  {
    path:'add',
    component:AddRiscComponent
  },
  { path: '',   redirectTo: '/survey-center/10002', pathMatch: 'full' },
 // {path:'survey-center', redirectTo:'survey-center/10002'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
