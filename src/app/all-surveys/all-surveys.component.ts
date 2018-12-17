import { Component, OnInit } from '@angular/core';
import { ViewSurvey } from '../survey-center/viewSurvey';
import {surveyService} from '../survey-center/survey.service';
import { commonAnswer } from '../survey-center/commonAnswer';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css']
})
export class AllSurveysComponent implements OnInit {
  viewSurveys : ViewSurvey[];
  ssn : number;
  patientName:string;
  commonAnswer:commonAnswer;
  compareAnswerShow:boolean;
  specificAnswerShow:boolean;
  showTable:boolean;
  constructor(private surveyService: surveyService) { }

  ngOnInit() {
  }

  getSurveysBySSN(){
    this.viewSurveys = [
      new ViewSurvey(20001,"Patient's survey","10/23/2018","John Doe",true),
      new ViewSurvey(20002,"Guardian's survey","10/25/2018","Tom Doe",true),
      new ViewSurvey(20003,"Physician's survey","11/25/2018","Doc White",true),
    ];

    console.log(this.ssn);
    this.showTable=true;
    this.patientName = "John Doe";

  }

  getSpecificSurveyAnswers(id:number,ssn:number){
    var an= this.getAllAnswerBySSN(ssn).filter(obj => {
      return obj.SurveyId === id;
    });
    console.log("survey is",an[0]);
    this.commonAnswer= an[0];
    this.specificAnswerShow = true;
    this.compareAnswerShow = false;
  }

  getAllAnswerBySSN(ssn:number){
    return this.surveyService.getAnswersBySSN(ssn);
  }

  showCompareAnswer(){
    this.compareAnswerShow= true;
    this.specificAnswerShow = false;
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
