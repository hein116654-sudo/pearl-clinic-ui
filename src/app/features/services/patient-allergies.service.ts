import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CreatePatientAllergens, PatientAllergens } from '../models/patientAllergens';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientAllergiesService {
  private api = inject(ApiService);
  constructor(
    private http:HttpClient
  ){}

  getAll():Observable<PatientAllergens[]>{
    return this.api.get(`/patientAllergies/getAll`);
  }

  create(allergen:CreatePatientAllergens):Observable<PatientAllergens>{
    return this.api.post(`/patientAllergies/create`,allergen)
  }

  update(id:number,allergen:CreatePatientAllergens):Observable<PatientAllergens>{
    return this.api.put(`/patientAllergies/update/${id}`,allergen)
  }

  getById(id:number):Observable<PatientAllergens>{
    return this.api.get(`/patientAllergies/getById/${id}`);
  }
  delete(id:number):Observable<void>{
    return this.api.delete(`/patientAllergies/delete/${id}`)
  }
  
}
