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

const surveyAnswers=
[
  {
    "SurveyId":20001,
    "Answers":[
      {
        "QuestionId":40001,
        "Controls":
        [
          {"ControlId":50001,"type":"Textbox","text":"What happened that made others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?","Value":"vxxcv"},
          {"ControlId":50003,"type":"Checkbox","text":"Memory for events?","Value":false},
          {"ControlId":50004,"type":"Checkbox","text":"Consistent report?","Value":true},
          {"ControlId":50005,"type":"Checkbox","text":"Realistic depiction of events?","Value":true},
          {"ControlId":50006,"type":"Checkbox","text":"Was there intent?","Value":true},
          {"ControlId":50002,"type":"Checkbox","text":"Is there a threat?","Value":false}
        ]
        } ]
  },
  {
    "SurveyId":20002,
    "Answers":[
      {
        "QuestionId":40001,
        "Controls":
        [
          {"ControlId":50001,"type":"Textbox","text":"What happened that made others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?","Value":"vxxcv"},
          {"ControlId":50003,"type":"Checkbox","text":"Memory for events?","Value":false},
          {"ControlId":50004,"type":"Checkbox","text":"Consistent report?","Value":true},
          {"ControlId":50005,"type":"Checkbox","text":"Realistic depiction of events?","Value":true},
          {"ControlId":50006,"type":"Checkbox","text":"Was there intent?","Value":true},
          {"ControlId":50002,"type":"Checkbox","text":"Is there a threat?","Value":false}
        ]
        } ]
  },
  {
    "SurveyId":20003,
    "Answers":[
      {
        "QuestionId":40001,
        "Controls":
        [
          {"ControlId":50001,"type":"Textbox","text":"What happened that made others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?","Value":"vxxcv"},
          {"ControlId":50003,"type":"Checkbox","text":"Memory for events?","Value":false},
          {"ControlId":50004,"type":"Checkbox","text":"Consistent report?","Value":true},
          {"ControlId":50005,"type":"Checkbox","text":"Realistic depiction of events?","Value":true},
          {"ControlId":50006,"type":"Checkbox","text":"Was there intent?","Value":true},
          {"ControlId":50002,"type":"Checkbox","text":"Is there a threat?","Value":false}
        ]
        } ]
  }]
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


@Injectable()
export class surveyService {
  private surveyUrl = 'api/surveys';  // URL to web api
  private riscUrl = 'http://risc-api20180802104103.azurewebsites.net/api/Survey/';
  private tempAnswer;
  private patientId;
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
  
  getAnswersBySSN(ssn:number){
    return surveyAnswers;
  }

  getComparedAnswersBySSN(ssn:number){
    return compareAnswers;
  }
  saveTempAnswer(surveyAnswer: SurveyAnswer):void{
    this.tempAnswer = surveyAnswer;
  }

  savePatientId(id:number):void{
    this.patientId = id;
  }

  retrievePatientId():number{
    return this.patientId;
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


