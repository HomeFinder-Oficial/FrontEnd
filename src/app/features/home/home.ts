import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule],
  providers: [MessageService],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {
  selectedLocation: string = '';
  propertyType: string | null = 'rent';
  ownerEmail: string = ''; 
  searchText: string = ''; 
  isValid: boolean = true; 

  constructor(private messageService: MessageService) {}

 properties = [
  {
    name: 'Palm Harbor',
    location: '2699 Green Valley, Highland Lake, FL',
    price: '$2,095 /month',
    image: 'https://picsum.photos/400/250?random=1',
    rooms: 3,
    baths: 2,
    size: '57.7'
  },
  {
    name: 'Beverly Springfield',
    location: '2821 Lake Sevilla, Palm Harbor, TX',
    price: '$2,700 /month',
    image: 'https://picsum.photos/400/250?random=2',
    rooms: 4,
    baths: 2,
    size: '67.5'
  },
  {
    name: 'Faulkner Ave',
    location: '909 Woodland St, Michigan, IN',
    price: '$4,550 /month',
    image: 'https://picsum.photos/400/250?random=3',
    rooms: 4,
    baths: 3,
    size: '81.0'
  }
];

// Método con validación usando MessageService
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
    // Valida cuando el usuario sale del input o lo deja vacío
     this.isValid = this.searchText.trim().length > 0;
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

    // Validación de email
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
}
