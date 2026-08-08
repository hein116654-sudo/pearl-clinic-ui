import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(`${this.baseUrl}${url}`, { params });
  }

  post<T>(url: string, body: any, options?: { withCredentials?: boolean }) {
    return this.http.post<T>(this.baseUrl + url, body, {
      withCredentials: options?.withCredentials || false
    });
  }

  patch<T>(url: string, body: any, params?: HttpParams) {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, { params });
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.baseUrl}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.baseUrl}${url}`);
  }

  getBlob(url: string, params?: HttpParams): Observable<Blob> {
    return this.http.get(`${this.baseUrl}${url}`, {
      params,
      responseType: 'blob'
    });
  }
  postBlob(url: string, body: any): Observable<Blob> {
    return this.http.post(`${this.baseUrl}${url}`, body, {
      responseType: 'blob'
    });
  }
}