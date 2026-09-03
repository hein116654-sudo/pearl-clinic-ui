import { Component, inject, OnInit, signal } from '@angular/core';
import { SpecializationService } from '../../services/specialization.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { Specialization, UpdateSpecializationInput } from '../../models/specialization';

@Component({
  selector: 'app-specialization.page',
  imports: [TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, AvatarModule],
  templateUrl: './specialization.page.html',
  styleUrl: './specialization.page.css',
})
export class SpecializationPage implements OnInit {

  private specializationService = inject(SpecializationService);

  specializations = signal<Specialization[]>([]);

  specialization: Specialization = this.emptySpecialization();

  isLoading = signal<boolean>(false);

  dialogVisible = signal<boolean>(false);

  isEditMode = signal<boolean>(false);

  selectedId = signal<number | null>(null);


  ngOnInit() {
    this.fetchSpecializations();
  }


  fetchSpecializations() {
    this.isLoading.set(true);
    this.specializationService.getAll().subscribe({
      next: (data) => {
        this.specializations.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.log('Failed to fetch specializations:', error);
      },
    });
  }



  emptySpecialization(): Specialization {
    return {
      name: '',
      description: '',
      status: ''
    }
  }

  editSpecialization(item: Specialization) {
    this.isEditMode.set(true);
    this.selectedId.set(item.id ?? null);
    this.specialization = { ...item };
    this.dialogVisible.set(true);
  }
  openCreateDialog() {

    this.dialogVisible.set(true);
    this.isEditMode.set(false);
    this.selectedId.set(null);
    this.specialization = this.emptySpecialization();
  }

  saveSpecialization():void{
    // Validation
    if(
    !this.specialization.name ||
    !this.specialization.description ||
    !this.specialization.status
    ){
      console.warn('All fields are required.');
      return;
    }

    // Update

    const id=this.selectedId();

    if(this.isEditMode() && id){
      const updatedSpecialization: UpdateSpecializationInput = {
        name: this.specialization.name,
        description: this.specialization.description,
        status: this.specialization.status
      };
      this.specialization = updatedSpecialization;
      this.specializationService.update(id, this.specialization).subscribe({
        next: (updated) => {
         this.specializations.update(current => current.map(spec => spec.id === updated.id ? updated : spec));
          this.dialogVisible.set(false);
        },
        error: (error) => {
          console.error('Failed to update specialization:', error);
        }  
      });
    } else {
      this.specializationService.create(this.specialization).subscribe({
        next: (created) => {
          this.specializations.update(current => [...current, created]);
          this.dialogVisible.set(false);
        },
        error: (error) => {
          console.error('Failed to create specialization:', error);
        }
      }) ;
    }
  }




  deleteSpecialization(item: Specialization): void {
    if (!item.id) return;
    if (confirm(`Are you sure you want to delete specialization "${item.name}"?`)) {

      this.specializationService.delete(item.id).subscribe({
        next: () => {
          this.specializations.update((current) => current.filter(spec => spec.id !== item.id));
        },
        error: (error) => {
          console.error('Failed to delete specialization:', error);
        }
      });
    }
  }


}
