import { Component, OnInit } from '@angular/core';
import { ViewSurvey } from '../survey-center/viewSurvey';
import {surveyService} from '../survey-center/survey.service';
import { commonAnswer, allAnswer } from '../survey-center/commonAnswer';
import { QuestionAnswer } from '../survey-center/questionAnswer';

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
  allAnswer:allAnswer;
  answers:QuestionAnswer[];
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

  getSpecificSurveyAnswers(surveyId:number,interviewId:number){
    this.getAnswersBySurvey(surveyId,interviewId);
  }

  getAnswersBySurvey(surveyId:number,interviewId:number){
      this.surveyService.getAnswersBySurvey(surveyId,interviewId).subscribe(result => {
      this.allAnswer = result;
      this.answers = this.allAnswer.Controls;
      console.log("get answers by survey",result);
      
      this.specificAnswerShow = true;
      this.compareAnswerShow = false;
    });
    return this.allAnswer;
  }

  showCompareAnswer(){
    this.compareAnswerShow= true;
    this.specificAnswerShow = false;
  }



  getComparedAnswersBySSN(ssn:number){
    console.log("getCompared answer");
    return this.surveyService.getComparedAnswersBySSN(ssn);
  }

}
