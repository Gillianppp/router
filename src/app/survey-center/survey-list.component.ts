import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { surveyService } from './survey.service';
import {Survey} from './survey';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';

@Component({
  template: `
  <div style="padding:20px;">
    <nav class="sub-menu" >
      <a *ngFor="let survey of surveys$ | async" [routerLink]="[survey.Id]" [queryParams]="{patientId: selectedId}" [class.selected]="survey.Id === selectedId" routerLinkActive="active">{{survey.SurveyName}}</a>
    </nav>

    <router-outlet></router-outlet>
    </div>
  `
})
export class surveyListComponent implements OnInit {
  surveys$: Observable<Survey[]>;
  selectedId: number;
  recId:number;

  constructor(
    private service: surveyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("survey list is initaited");
    this.surveys$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        this.recId = +params.get('recId');
        this.service.savePatientId(this.selectedId);
        this.service.saveRecId(this.recId);
        console.log("This is the patientId:",this.selectedId);
        console.log("this is recId",this.recId);
        return this.service.getnoSurveys();
      })
    );
  }
}
