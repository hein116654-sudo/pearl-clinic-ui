import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Practitioner {

  id?: number;

  name: string;

  licenseNumber: string;

  email: string;

  phone: string;

  status: string;

  specializationName: string;

  createdAt?: string;

}
export interface CreatePractitionerInput {

  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  status: string;
  specializationId: number;

}
export interface UpdatePractitionerInput {

  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  status: string;
  specializationId: number;

}

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  private apiUrl =
    'http://localhost:8090/practitioners';


  constructor(
    private http: HttpClient
  ) {}


  getAll(): Observable<Practitioner[]> {

    return this.http.get<Practitioner[]>(
      `${this.apiUrl}/list`
    );

  }


  getById(
    id: number
  ): Observable<Practitioner> {

    return this.http.get<Practitioner>(
      `${this.apiUrl}/${id}`
    );

  }

  create(
    practitioner: CreatePractitionerInput
  ): Observable<Practitioner> {

    return this.http.post<Practitioner>(
      `${this.apiUrl}/create`,
      practitioner
    );

  }

  update(
    id: number,
    practitioner: UpdatePractitionerInput
  ): Observable<Practitioner> {

    return this.http.put<Practitioner>(
      `${this.apiUrl}/update/${id}`,
      practitioner
    );

  }

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/delete/${id}`
    );

  }

}