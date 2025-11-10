import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { PropertyCard } from '../../shared/components/property-card/property-card';
import { PropertyDetail } from '../../shared/components/Property-detail/property-detail';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonModule, 
    InputTextModule,
    DialogModule, 
    ToastModule, 
    ConfirmDialogModule, 
    PropertyCard, 
    PropertyDetail
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  selectedLocation: string = '';
  propertyType: string | null = 'rent';
  ownerEmail: string = ''; 
  searchText: string = ''; 
  isValid: boolean = true; 
  isFavorite: boolean = false; 
  displayDialog: boolean = false;
  selectedProperty: any = null;
  showDetail: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

  properties = [
    {
      name: 'Palm Harbor',
      location: '2699 Green Valley, Highland Lake, FL',
      price: '$2,095 /month',
      image: 'https://picsum.photos/400/250?random=1',
      rooms: 3,
      baths: 2,
      size: '57.7',
      isFavorite: false
    },
    {
      name: 'Beverly Springfield',
      location: '2821 Lake Sevilla, Palm Harbor, TX',
      price: '$2,700 /month',
      image: 'https://picsum.photos/400/250?random=2',
      rooms: 4,
      baths: 2,
      size: '67.5',
      isFavorite: false
    },
    {
      name: 'Faulkner Ave',
      location: '909 Woodland St, Michigan, IN',
      price: '$4,550 /month',
      image: 'https://picsum.photos/400/250?random=3',
      rooms: 4,
      baths: 3,
      size: '81.0',
      isFavorite: false
    }
  ];

  // =========================
  // Funciones existentes
  // =========================

  showConfirm(property: any) { 
    this.confirmationService.confirm({
      message: '¿Quieres agregar esta propiedad a favoritos?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sí',   
      rejectLabel: 'No',   
      accept: () => {
        property.isFavorite = true; 
        this.messageService.add({
          key: 'confirm',
          severity: 'success',
          summary: 'Propiedad agregada a favoritos',
          detail: `¡${property.name} ahora está en tus favoritos!`,
          life: 3000
        });
        this.confirmationService.close(); 
      },
      reject: () => {
        property.isFavorite = false; 
        this.confirmationService.close(); 
      }
    });
  }

  searchProperties() {
    if (!this.selectedLocation.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Campo requerido',
        detail: 'Debes ingresar una ubicación para poder buscar propiedades.',
        life: 4000, 
        styleClass: 'custom-toast-error' 
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Búsqueda exitosa',
      detail: `Se muestran los resultados de propiedades disponibles en: ${this.selectedLocation}`,
      life: 3000
    });
    this.selectedLocation = '';
  }

  validateInput() {
    this.isValid = this.searchText.trim().length > 0;
  }

  onPropertyClick(property: any) {
    this.selectedProperty = property;
    this.showDetail = true;
    console.log('Propiedad seleccionada:', property);
  }

  subscribeOwner() {
    if (!this.ownerEmail.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo requerido',
        detail: 'Por favor ingresa una dirección de correo electrónico válida.',
        life: 4000,
        styleClass: 'custom-toast-warn'
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.ownerEmail)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Correo inválido',
        detail: 'El formato del correo electrónico no es válido.',
        life: 4000,
        styleClass: 'custom-toast-error'
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Suscripción exitosa',
      detail: `Gracias por suscribirte con: ${this.ownerEmail}`,
      life: 4000,
      styleClass: 'custom-toast-success'
    });

    this.ownerEmail = ''; 
  }

get filteredProperties() {
  const term = this.searchText.toLowerCase().trim();
  if (!term) return this.properties; // Muestra todas si no se busca nada

  return this.properties.filter((p) =>
    p.name.toLowerCase().includes(term)
  );
}


  // Método para cerrar el detalle desde PropertyDetail
  closePropertyDetail() {
    this.showDetail = false;
    this.selectedProperty = null;
  }
}
