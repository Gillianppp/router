export class QuestionAnswer
{
    QuestionId:number;
    ControlId:number; 
    Value:string;
    ControlType:string;
    ControlText:string;
    constructor(QuestionId:number,ControlId:number,ControlType:string,ControlText:string,Value:string){
            this.QuestionId = QuestionId;
            this.ControlId= ControlId;
            this.Value = Value;
            this.ControlType=ControlType;
            this.ControlText = ControlText;
            
        }
}
