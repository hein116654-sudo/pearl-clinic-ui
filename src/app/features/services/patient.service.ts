import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateUpdatePatientInput, Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private api = inject(ApiService);

  constructor(private http:HttpClient){}

  getAll():Observable<Patient[]>{
    return this.api.get(`/patients/getAll`);
  }

  create(patient:CreateUpdatePatientInput):Observable<Patient>{
    return this.api.post(`/patients/create`,patient);
  }

  getById(id:number):Observable<Patient>{
    return this.api.get(`/patients/getById/${id}`);
  }
  update(id:number,updatePatient :CreateUpdatePatientInput):Observable<Patient>{
    return this.api.put(`/patients/update/${id}`,updatePatient)
  }

  delete(id:number):Observable<void>{
    return this.api.delete(`/patients/delete/${id}`)
  }

  
}
