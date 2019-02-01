import { ViewSurvey } from "./viewSurvey";

export class SurveySummary{
    PatientName:string;
    MrnId:string;
    SummaryItems:ViewSurvey[];

    constructor(PatientName:string,MrnId:string,SummaryItems:ViewSurvey[]) { 
        if(!arguments.length) {
            return;
        }
        this.PatientName = PatientName;
        this.MrnId = MrnId;
        this.SummaryItems = SummaryItems;
    }


  
}