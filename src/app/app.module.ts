import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { Router } from '@angular/router';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { ComposeMessageComponent } from './compose-message.component';
import { LoginRoutingModule }      from './login-routing.module';
import { LoginComponent }          from './login.component';
import { PageNotFoundComponent }   from './not-found.component';


import { DialogService }           from './dialog.service';
import { surveyDetailComponent } from './survey-center/survey-detail.component';
import { CommonModule } from '@angular/common';
import { AddRiscComponent } from './add-risc/add-risc.component';
import { AllSurveysComponent } from './all-surveys/all-surveys.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    LoginComponent,
    PageNotFoundComponent,
    AddRiscComponent,
    AllSurveysComponent,

  ],
  providers: [
    DialogService
  ],

  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
