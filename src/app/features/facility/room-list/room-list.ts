import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RoomService } from '../../services/room-service';
import { RoomRequest } from '../../models/room';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css',
})
export class RoomList {
  private roomService = inject(RoomService);
  private messgaeService = inject(MessageService);
  
  rooms = signal<RoomRequest[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.fetchRooms();
  }
  fetchRooms() {
    this.isLoading.set(true);
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rooms.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
      },
    });
  }
}
