import { UsersService } from './../../../core/services/users/users.service';
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
  selector: 'app-admin-dashboard',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CommonModule,
    DialogModule,
    FileUploadModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  constructor(private usersService: UsersService, private cd: ChangeDetectorRef) {}



  @ViewChild('fu') fu!: any;

  value: string = '';
  visible: boolean = false;
  dialogType: string = '';
  users: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalUsers: number = 0;
  size: number = 10;
  page: number = 1;
  first: number = 0;

  ngOnInit() {
    this.obtenerUsuarios(this.page, this.size);
    console.log(this.totalUsers, 'totalUsers');
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
    this.obtenerUsuarios(this.page, this.size);
  }

  obtenerUsuarios(page: number, size: number) {
    this.loading = true;
    this.usersService.getUsersByPage(page, size).subscribe({
      next: (response) => {
        this.users = response.data;
        this.dataTable = response.data.map((user) => ({
          id: user.id,
          nombre: user.nombre + ' ' + user.apellidos,
          email: user.email,
          telefono: user.telefono,
          rol: user.rol?.nombre?.toUpperCase(),
          activo: user.activo,
          foto: user.foto,
        }));
        this.totalUsers = response.meta.total;
        this.loading = false;
        console.log(this.dataTable, 'dataTable');
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      },
    });
  }
}
