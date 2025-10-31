import { PropertiesService } from '../../../core/services/properties/properties.service';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CommonModule,
    DialogModule,
    FileUploadModule,
  ],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})

export class UserDashboard {
  constructor(private propertiesService: PropertiesService, private cd: ChangeDetectorRef) {}

  @ViewChild('fu') fu!: any;

  value: string = '';
  visible: boolean = false;
  dialogType: string = '';
  properties: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalProperties: number = 0;
  size: number = 10;
  page: number = 1;
  first: number = 0;

  ngOnInit() {
    this.obtenerPropiedades(this.page, this.size);
    console.log(this.totalProperties, 'totalProperties');
  }

  showDialog(type: string) {
    this.visible = true;
    this.dialogType = type;
  }

  dataTable: any[] = [];

  uploadedFiles: any[] = [];

  submitUpdate() {
    const archivos = this.fu.files;
    // Procesa archivos como desees
    console.log('uploadedFiles actualizar:', archivos);
  }

  submitCreate() {
    const archivos = this.fu.files;
    // Procesa archivos como desees
    console.log('uploadedFiles crear :', archivos);
  }

  onPageChange(event: any) {
    console.log(event, 'sakjdskd');
    this.page = event.first / event.rows + 1;
    this.size = event.rows;
    this.obtenerPropiedades(this.page, this.size);
  }

  obtenerPropiedades(page: number, size: number) {
    this.loading = true;
    this.propertiesService.getPropertiesByPage(page, size).subscribe({
      next: (response) => {
        this.properties = response.data;
        this.dataTable = response.data.map((property) => ({
          id: property.id,
          title: property.title,
          description: property.description,
          price: property.price,
          area_m2: property.area_m2,
          rooms: property.rooms,
          bathrooms: property.bathrooms,
          active: property.active,
        }));
        this.totalProperties = response.meta.total;
        this.loading = false;
        console.log(this.dataTable, 'dataTable');
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar propiedades';
        this.loading = false;
      },
    });
  }
}
