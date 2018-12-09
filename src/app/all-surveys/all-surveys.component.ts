import { Component, OnInit } from '@angular/core';
import { ViewSurvey } from '../survey-center/viewSurvey';
import {surveyService} from '../survey-center/survey.service';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent implements OnInit {
  viewSurveys : ViewSurvey[];
  ssn : number;
  constructor(private surveyService: surveyService) { }

  ngOnInit() {
  }

  getSurveysBySSN(){
    this.viewSurveys = [
      new ViewSurvey(33,"Patient's survey","10/23/2018","John Doe",true),
      new ViewSurvey(34,"Parent's survey","10/25/2018","John Doe 2",true),

    ];
    console.log(this.ssn);
  }

  getAllAnswerBySSN(ssn:number){
    return this.surveyService.getAnswersBySSN(ssn);
  }

  getPatientAnswer(ssn:number){
    var an= this.getAllAnswerBySSN(ssn).filter(obj => {
      return obj.SurveyId === 20001
    });
    console.log("get answr",an);
    return an[0].Answers;
  }

  getParentsAnswer(ssn:number){
    var an= this.getAllAnswerBySSN(ssn).filter(obj => {
      return obj.SurveyId === 20002;
    });
    console.log("get answr",an);
    return an[0].Answers;
  }

  getComparedAnswersBySSN(ssn:number){
    console.log("getCompared answer");
    return this.surveyService.getComparedAnswersBySSN(ssn);
  }

}
