export class ViewSurvey{
    SurveyId:number;
    SurveyName:string;
    ModifiedDate:string;
    IntervieweeName:string;
    InterviewId:number;
    Mrn:string;
    Relationship:string;

    constructor(SurveyName: string,ModifiedDate:string,IntervieweeName:string,Relationship:string,SurveyId: number,  InterviewId:number,Mrn:string) { 
        this.SurveyId = SurveyId;
        this.SurveyName = SurveyName;
        this.ModifiedDate = ModifiedDate;
        this.IntervieweeName = IntervieweeName;
        this.InterviewId = InterviewId;
        this.Mrn = Mrn;
        this.Relationship = Relationship;
    }
  
}