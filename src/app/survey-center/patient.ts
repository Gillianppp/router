export class Patient
{
    Id: number;
    FirstName:string;
    LastName:string;
    DateOfBirth:string;
    Gender:string;
    Grade:string;
    MRN:string;
    constructor( Id: number,FirstName:string,
    LastName:string,Gender:string,Grade:string, DateOfBirth:string,MRN:string){
            this.Id = Id;
            this.FirstName= FirstName;
            this.LastName = LastName;
            this.DateOfBirth = DateOfBirth;
            this.Gender = Gender;
            this.Grade = Grade;
            this.MRN = MRN;
        }
}