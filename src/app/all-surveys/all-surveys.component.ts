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
    var response;
    this.surveyService.getSurveySummary(this.ssn).subscribe(result => {
      console.log(result);
      this.viewSurveys = result.SummaryItems;
      console.log('response is',response);
    });

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
