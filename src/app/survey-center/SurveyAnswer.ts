import {SectionAnswer} from './SectionAnswer';
import { Patient } from './patient';
import {User} from './User';

export class SurveyAnswer
{
    SurveyId:number;
    User:User;
    InterviewDate:Date;
    RecId:number;
    SectionAnswers:SectionAnswer[];
    constructor(SurveyId:number,
        User:User,InterviewDate:Date,RecId:number,
        SectionAnswers:SectionAnswer[]){
            this.SurveyId = SurveyId;
            this.SectionAnswers = SectionAnswers;
            this.User = User;
            this.InterviewDate = InterviewDate;
            this.RecId = RecId;
        }
}