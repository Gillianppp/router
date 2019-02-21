import { Component, OnInit } from '@angular/core';
import { ViewSurvey } from '../survey-center/viewSurvey';
import {surveyService} from '../survey-center/survey.service';
import { commonAnswer, allAnswer } from '../survey-center/commonAnswer';
import { QuestionAnswer } from '../survey-center/questionAnswer';
import { Survey } from '../survey-center/Survey';
import { compareAnswer } from '../survey-center/CompareAnswers';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

@Component({
  selector: 'app-all-surveys',
  templateUrl: './all-surveys.component.html',
  styleUrls: ['./all-surveys.component.css'],
  animations: [
    trigger('myAwesomeAnimation', [
        state('small', style({
            transform: 'translateY(20px) translateX(-100px)',
        })),
        state('large', style({
          transform: 'scale(1.3) translateY(100px) translateX(130px)',
        
        
        })),
        transition('small <=> large', animate('300ms ease-in', keyframes([

        ]))),
    ]),
  ]
})
export class AllSurveysComponent implements OnInit {
  viewSurveys : ViewSurvey[];
  state: string = 'large';
  ssn : number;
  patientName:string;
  commonAnswer:commonAnswer;
  allAnswer:allAnswer;
  answers:QuestionAnswer[];
  compareAnswerShow:boolean;
  specificAnswerShow:boolean;
  showTable:boolean;
  allQuestions:Survey[];
  currentSurveyId:number;
  currentInterviewId:number;
  comparedAnswers:compareAnswer[];
  constructor(private surveyService: surveyService) { }

  ngOnInit() {
  }

  getSurveysBySSN(){
    var response;
    this.surveyService.getSurveySummary(this.ssn).subscribe(result => {
      console.log(result);
      this.viewSurveys = result.SummaryItems;
      this.patientName = result.PatientName;
      console.log('response is',response);
    });

    console.log(this.ssn);
    this.showTable=true;
    this.state = 'small';
    console.log("scale");
  }

  getSpecificSurveyAnswers(surveyId:number,interviewId:number){
    this.currentSurveyId = surveyId;
    this.currentInterviewId = interviewId;
    this.getAnswersBySurvey(surveyId,interviewId);
  }

  getAnswersBySurvey(surveyId:number,interviewId:number){
      this.surveyService.getAnswersBySurvey(surveyId,interviewId).subscribe(result => {
      this.allAnswer = result;
      this.answers = this.allAnswer.Controls;
      console.log("get answers by survey",result);
      
      this.getAllSurveys();
      this.specificAnswerShow = true;
      this.compareAnswerShow = false;
    });
    return this.allAnswer;
  }

  getAllSurveys(){
    this.surveyService.getnoSurveys().subscribe(result => {
      console.log('all survey',result);
      this.allQuestions = result;
    });
  }
  showCompareAnswer(){
    this.compareAnswerShow= true;
    this.specificAnswerShow = false;
    this.getComparedAnswersBySSN();
  }



  getComparedAnswersBySSN(){
    console.log("getCompared answer");
    console.log("view surveys",this.viewSurveys);
    var interviewIds =[];
    for(var i=0;i<this.viewSurveys.length;i++){
      interviewIds.push(this.viewSurveys[i].InterviewId);
    }
    this.surveyService.getComparedAnswersBySSN(interviewIds).subscribe(result => {
      console.log(result);

      this.comparedAnswers = result;
    });
  }

}
