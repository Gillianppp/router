import { BehaviorSubject } from 'rxjs';
import {SurveyAnswer} from './SurveyAnswer';
import {SectionAnswer} from './SectionAnswer';
import {Answer} from './Answer';
import{Control} from './Control';
import {Patient} from './patient';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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


const Answers =[];

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
      map(crises => crises.find(survey => survey.Id === +id))
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

  savePatient(patient:Patient):Observable<Patient>{
    return this.http.post<Patient>(this.riscUrl+'CreatPatient', patient, httpOptions)
    .pipe(
      catchError(this.handleError('savePatient',patient))
    );
  }

  saveAnswer (surveyAnswer:SurveyAnswer){
    console.log(surveyAnswer);
    Answers.push(surveyAnswer);

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


