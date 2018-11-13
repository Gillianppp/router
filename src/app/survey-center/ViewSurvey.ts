export class ViewSurvey{
    Id:number;
    SurveyName:string;
    InterviewDate:string;
    Interviewee:string;
    HasAccessed:boolean;

    constructor(Id: number,SurveyName: string, InterviewDate:string, Interviewee:string,HasAccessed:boolean) { 
        this.Id = Id;
        this.SurveyName = SurveyName;
        this.InterviewDate = InterviewDate;
        this.Interviewee = Interviewee;
        this.HasAccessed = HasAccessed;
    }
  
}