import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedLocation: string = '';
  propertyType: string | null = 'rent';
  ownerEmail: string = ''; 

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


  searchProperties() {
    console.log('Buscando propiedades en:', this.selectedLocation);
  }

  subscribeOwner() {
    if (this.ownerEmail) {
      console.log('Suscripción de propietario:', this.ownerEmail);
      // Aquí puedes agregar la lógica para enviar el email a tu backend
      alert(`¡Gracias por suscribirte! Email: ${this.ownerEmail}`);
      this.ownerEmail = ''; // Limpiar el input
    } else {
      alert('Por favor ingresa un correo electrónico válido');
    }
  }
  
}
