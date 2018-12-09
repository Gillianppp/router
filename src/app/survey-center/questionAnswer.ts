export class QuestionAnswer
{
    controlId:number; 
    type:string;
    text:string;
    value:string;
    constructor(controlId:number,type:string,text:string,value:string){
            this.controlId= controlId;
            this.type=type;
            this.text = text;
            this.value = value;
        }
}
