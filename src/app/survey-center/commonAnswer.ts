import {QuestionAnswer} from './questionAnswer';
export class allAnswer{
    QuestionId:number;
    Controls:QuestionAnswer[];
    constructor(QuestionId:number,Controls:QuestionAnswer[]){
        this.QuestionId = QuestionId;
        this.Controls = Controls;
    }
}
export class commonAnswer
{
    SurveyId:number;
    Answers:allAnswer[];

    constructor(SurveyId:number,Answers:allAnswer[]){
            this.SurveyId = SurveyId;
            this.Answers = Answers;
        }
}