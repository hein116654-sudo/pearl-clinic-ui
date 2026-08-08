import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            @for (item of model; track item.label) {
                @if (!item.separator) {
                    <li app-menuitem [item]="item" [root]="true"></li>
                } @else {
                    <li class="menu-separator"></li>
                }
            }
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-home',
                        routerLink: ['/']
                    }
                ]
            },

            {
                label: 'Patient Management',
                items: [
                    {
                        label: 'Patients',
                        icon: 'pi pi-users',
                        routerLink: ['/patients']
                    },
                    {
                        label: 'Appointments',
                        icon: 'pi pi-calendar',
                        routerLink: ['/appointments']
                    },
                    {
                        label: 'Medical Encounters',
                        icon: 'pi pi-file',
                        routerLink: ['/medical-encounters']
                    },
                    {
                        label: 'Patient Medications',
                        icon: 'pi pi-heart',
                        routerLink: ['/patient-medications']
                    },
                    {
                        label: 'Patient Allergies',
                        icon: 'pi pi-exclamation-triangle',
                        routerLink: ['/patient-allergies']
                    }
                ]
            },

            {
                label: 'Clinical',
                items: [
                    {
                        label: 'Prescriptions',
                        icon: 'pi pi-pencil',
                        routerLink: ['/prescriptions']
                    },
                    {
                        label: 'Medication Orders',
                        icon: 'pi pi-shopping-cart',
                        routerLink: ['/medication-orders']
                    }
                ]
            },

            {
                label: 'Staff',
                items: [
                    {
                        label: 'Practitioners',
                        icon: 'pi pi-user',
                        routerLink: ['/practitioners']
                    },
                    {
                        label: 'Specializations',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/specializations']
                    },
                    {
                        label: 'Schedules',
                        icon: 'pi pi-clock',
                        routerLink: ['/schedules']
                    }
                ]
            },

            {
                label: 'Facility',
                items: [
                    {
                        label: 'Rooms',
                        icon: 'pi pi-building',
                        routerLink: ['/rooms']
                    }
                ]
            }
        ];
    }
}