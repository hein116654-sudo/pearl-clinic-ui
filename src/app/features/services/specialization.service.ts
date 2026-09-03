import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from './api.service';
import { Specialization } from '../models/specialization';


@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  private api=inject(ApiService);

  constructor(private http:HttpClient) {} 

  getAll(): Observable<Specialization[]> {
    return this.api.get(`/specializations/list`);
  }

  create(specialization:Specialization):Observable<Specialization>{
    return this.api.post(`/specializations/save`,specialization);
  }

  update(id:number,data:Specialization):Observable<Specialization>{
    return this.api.put<Specialization>(`/specializations/update/${id}`,data);
  }

  delete(id:number):Observable<void>{
    return this.api.delete<void>(`/specializations/delete/${id}`);
    };
  }
 
 
  



