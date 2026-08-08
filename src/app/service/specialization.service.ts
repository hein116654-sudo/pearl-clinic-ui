import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


export class Specialization {
  id?: number;
  name: undefined;
  description: undefined;
  createdAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  private apiUrl = 'http://localhost:8090/specializations';

  constructor(private http:HttpClient) {} 

  getAll(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>('${this.apiUrl}/list');
  }
 
 
  
}


