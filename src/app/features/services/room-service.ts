import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RoomRequest } from '../models/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private api = inject(ApiService);

  getRooms(): Observable<RoomRequest[]> {
    return this.api.get('/room/list');
    
  }
}
