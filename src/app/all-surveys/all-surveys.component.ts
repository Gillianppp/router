import { Component, OnInit } from '@angular/core';
import { ViewSurvey } from '../survey-center/viewSurvey';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent implements OnInit {
  viewSurveys : ViewSurvey[];
  ssn : number;
  constructor() { }

  ngOnInit() {
  }

  getSurveysBySSN(){
    this.viewSurveys = [
      new ViewSurvey(33,"Patient's survey","10/23/2018","John Doe",true),
      new ViewSurvey(34,"Parent's survey","10/25/2018","John Doe 2",true),

    ];
    console.log(this.ssn);
  }

}
