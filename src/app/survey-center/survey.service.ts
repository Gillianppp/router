import { BehaviorSubject } from 'rxjs';
import {SurveyAnswer} from './SurveyAnswer';
import {SectionAnswer} from './SectionAnswer';
import {Answer} from './Answer';
import{Control} from './Control';
import {Patient} from './patient';
import {PatientResponse} from './patientResponse';
import {Survey} from './Survey';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {CreateSurveyResponse} from './CreateSurveyResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const surveys =[];
const patientResponse = new PatientResponse(false,"",0);

const compareAnswers =[
  {
    "QuestionId":40018,
    "Question":"Relationship with Specific Intended Victim(s): How long have you known them? What has happened in the past between you? What do you think they deserve? Do you see any way things could be changed/improved?",
    "Answers":[
    {
      "ControlId":50051,
      "SurveyId":20001,
      "Value":"fsdfsdf"
    },
    {
      "ControlId":50052,
      "SurveyId":20002,
      "Value":"dfsdf"
    },
    {
      "ControlId":50053,
      "SurveyId":20003,
      "Value":"dfsdf"
    }
  ]
  },
  {
    "QuestionId":40019,
    "Question":"Family Support: Who do you live with? Who knows you best? Do people argue a lot at home? What are rules/consequences like at home? How much does your family know about what you do? How does your family respond to your problems/actions?",
    "Answers":[
    {
      "ControlId":50061,
      "SurveyId":20001,
      "Value":"fsdfsdf"
    },
    {
      "ControlId":50062,
      "SurveyId":20002,
      "Value":"dfsdf"
    },
    {
      "ControlId":50063,
      "SurveyId":20003,
      "Value":"dfsdf"
    }
  ]
  },

];

const Answers =[];
const createSurveyResponse = new CreateSurveyResponse(false);

import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { commonAnswer, allAnswer } from './commonAnswer';
import { QuestionAnswer } from './questionAnswer';
import { SurveySummary } from './SurveySummary';


@Injectable()
export class surveyService {
  private baseUrl = 'http://risc-api20180802104103.azurewebsites.net/api/'
  private surveyUrl = 'Survey/';  // URL to web api
  private allSurveysUrl = 'Dashboard/PatientSummary';
  private surveyDetailUrl = 'Dashboard/SurveyDetails';
  private compareSurveyUrl = 'Dashboard/SurveyComparison';
  private riscUrl = this.baseUrl + this.surveyUrl;
  private dashboardUrl = this.baseUrl + this.allSurveysUrl;
  private tempAnswer;
  private patientId;
  private recId;
  private hasSaved = false;
  
  constructor(
    private http: HttpClient, private router: Router) { }
  static nextsurveyId = 100;
  private answers$:BehaviorSubject<SurveyAnswer[]> = new BehaviorSubject<SurveyAnswer[]>(Answers);

  getAnswers() {
    console.log(this.answers$);
    return this.answers$;
  }

  getsurvey(id: number | string) {
    return this.getSurveys().pipe(
      map(crises => crises.find(survey => survey.Id === +id))
    );
  }


  getComparedAnswersBySSN(ssn:number){
    console.log(JSON.stringify(compareAnswers));
    return compareAnswers;
  }
  saveTempAnswer(surveyAnswer: SurveyAnswer):void{
    this.tempAnswer = surveyAnswer;
  }

  savePatientId(id:number):void{
    this.patientId = id;
  }

  saveRecId(recId:number):void{
    this.recId = recId;
  }

  retrievePatientId():number{
    return this.patientId;
  }
  retrieveRecId():number{
    return this.recId;
  }
  retrieveTempAnswer():SurveyAnswer{
    return this.tempAnswer;
  }
  
  getIsSaved():boolean{
    return this.hasSaved;
  }

  updateIsSaved(isSaved:boolean):void{
    this.hasSaved = isSaved;
  }

  getSurveys():Observable<Survey[]>{
    console.log("inside get surveys of servey service");
    return this.http.post<Survey[]>(this.riscUrl+'SurveyConfiguration', {"ProgramId":10001}, httpOptions)
    .pipe(
      catchError(this.handleError('get surveyss',surveys))
    );
  }

  getnoSurveys(){
    console.log("inside no get surveys of servey service");
    return this.http.post<Survey[]>(this.riscUrl+'SurveyConfiguration', {"ProgramId":10001}, httpOptions)
    .pipe(
      catchError(this.handleError('get surveyss',surveys))
    );
  }

  savePatient(patient:Patient):Observable<PatientResponse>{
    return this.http.post<PatientResponse>(this.riscUrl+'CreatePatient', patient, httpOptions)
    .pipe(
      catchError(this.handleError('savePatient',patientResponse))
    );
  }

  saveAnswer (surveyAnswer:SurveyAnswer):Observable<CreateSurveyResponse>{
    console.log(surveyAnswer);
    Answers.push(surveyAnswer);

    return this.http.post<CreateSurveyResponse>(this.riscUrl+'CreateSurvey', surveyAnswer, httpOptions)
    .pipe(
      catchError(this.handleError('createSurvey',createSurveyResponse))
    );

  }

  getSurveySummary(mrn:number):Observable<SurveySummary>{
    var param = {
      Mrn:mrn,
      ProgramId:10001
    }
    return this.http.post<SurveySummary>(this.baseUrl+this.allSurveysUrl,param,httpOptions)
    .pipe(
      catchError(this.handleError('get survey summary',new SurveySummary(undefined,undefined,undefined)))
    );;

  }

  getAnswersBySurvey(surveyId:number,interviewId:number):Observable<allAnswer>{
    var param ={
      SurveyId:surveyId,
      InterviewId:interviewId,
    }
    return this.http.post<allAnswer>(this.baseUrl+this.surveyDetailUrl,param,httpOptions)
    .pipe(
      catchError(this.handleError('get survey answer',new allAnswer(undefined,undefined)))
    );;
  }
  private log(message: string) {
    console.log('${message}');
   // this.messageService.add(`questionnaireService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
}


