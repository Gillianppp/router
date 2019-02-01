import { Component, OnInit } from '@angular/core';
import { Patient } from '../survey-center/patient';
import {PatientResponse} from '../survey-center/patientResponse';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {surveyService} from '../survey-center/survey.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-risc',
  templateUrl: './add-risc.component.html',
  styleUrls: ['./add-risc.component.css'],
  providers: [surveyService]
})


export class AddRiscComponent implements OnInit {
  patient:Patient;

  constructor(private service: surveyService,private router: Router) { }

  ngOnInit() {
    this.patient = new Patient(0,"","","","","","");
  }

  savePatient(patient:Patient){
    this.service.savePatient(this.patient)
    .subscribe((response) => { 
      console.log('result',response);
      console.log(response.UserData);
      let id = response.UserData;
    this.router.navigate(['/survey-center', { id: id,recId:this.patient.MRN}]);
  });
    
   // console.log(response.UserData);
    
  }

  
}
