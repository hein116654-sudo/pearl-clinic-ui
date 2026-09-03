import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CreatePractitionerInput, Practitioner, UpdatePractitionerInput } from '../models/practitioner';



@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  private api =inject(ApiService);


  constructor(
    private http: HttpClient
  ) {}


  getAll(): Observable<Practitioner[]> {

    return this.api.get('/practitioners/list');

  }


  getById(id: number):Observable<Practitioner> {

  return this.api.get(`/practitioners/${id}`);

  }

  create(
    practitioner: CreatePractitionerInput
  ): Observable<Practitioner> {

    return this.api.post('/practitioners/create',practitioner);
    

  }

  update(
    id: number,
    practitioner: UpdatePractitionerInput
  ): Observable<Practitioner> {

    return this.api.put(`/practitioners/update/${id}`,
      practitioner
    );

  }

  delete(
    id: number
  ): Observable<void> {

    return this.api.delete(`/practitioners/delete/${id}`);

  }

}