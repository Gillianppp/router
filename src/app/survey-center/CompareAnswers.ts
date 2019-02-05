import { QuestionAnswer } from "./questionAnswer";

export class compareAnswer
{
    QuestionId:number;
    Question:string;
    Answers:QuestionAnswer[]

    constructor(QuestionId:number,Question:string,Answers:QuestionAnswer[]){
            this.QuestionId = QuestionId;
            this.Question = Question;
            this.Answers = Answers;
        }
}