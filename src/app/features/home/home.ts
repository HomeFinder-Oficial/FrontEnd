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
    value: '$2,400/month',
    name: 'St. Crystal',
    address: '123 Main St, Cityville',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 3,
    baths: 2,
    area: 500,
    isPopular: false,
    isFavorite: false
  },
  {
    value: '$3,000/month',
    name: 'Ocean View',
    address: '456 Beach Ave, Seaside',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 4,
    baths: 3,
    area: 750,
    isPopular: true,
    isFavorite: false
  },
  {
    value: '$1,800/month',
    name: 'Sunny Loft',
    address: '789 Sun Blvd, Downtown',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 2,
    baths: 1,
    area: 400,
    isPopular: false,
    isFavorite: true
  },
  {
    value: '$2,900/month',
    name: 'Green Villa',
    address: '321 Garden St, Suburbia',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 5,
    baths: 3,
    area: 900,
    isPopular: true,
    isFavorite: false
  },
  {
    value: '$2,100/month',
    name: 'Downtown Flat',
    address: '654 Center Rd, Cityville',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 3,
    baths: 2,
    area: 600,
    isPopular: false,
    isFavorite: false
  },
  {
    value: '$2,750/month',
    name: 'Mountain Retreat',
    address: '987 Hilltop Rd, Highland',
    image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
    rooms: 4,
    baths: 2,
    area: 800,
    isPopular: true,
    isFavorite: false
  }
];


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
