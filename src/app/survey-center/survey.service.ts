import { BehaviorSubject } from 'rxjs';
import {SurveyAnswer} from './SurveyAnswer';
import {SectionAnswer} from './SectionAnswer';
import {Answer} from './Answer';
import{Control} from './Control';
import {Patient} from './patient';
import {PatientResponse} from './patientResponse';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {CreateSurveyResponse} from './CreateSurveyResponse';

export class Response{
  constructor(public Label:string, public Type:string,public Id:number,public UserName:string){}
}
export class Prompt{
  constructor(public PromptText:string, public ResponseSet:Response[],public Id:number,public UserName:string){}
}
export class Section{
  constructor(public Title:string,public Description:string,public SubTitle:string,public Order:number,public Prompts:Prompt[]){}
}
export class Survey {
  constructor( public SurveyName: string, public SurveyTitle :string, public Sections:Section[],public Id: number,public UserName:string) { }
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const surveys =[];
const patientResponse = new PatientResponse(false,"",0);


const Answers =[];
const createSurveyResponse = new CreateSurveyResponse(false);

import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class surveyService {
  private surveyUrl = 'api/surveys';  // URL to web api
  private riscUrl = 'http://risc-api20180802104103.azurewebsites.net/api/Survey/';
  
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
      map(data => data.find(survey => survey.Id === +id))
    );
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


