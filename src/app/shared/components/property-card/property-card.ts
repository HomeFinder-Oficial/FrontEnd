
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, DividerModule, CardModule, ToastModule],
  providers: [MessageService],
  templateUrl: './property-card.html',
  styleUrls: ['./property-card.css']
})
export class PropertyCard {
  @Input() property!: {
    value: string;
    name: string;
    address: string;
    image: string;
    rooms: number;
    baths: number;
    area: number;
    isPopular?: boolean;
    isFavorite?: boolean;
  };

   @Output() propertyClick = new EventEmitter<any>();

  constructor(private messageService: MessageService) {}

   onCardClick() {
    this.propertyClick.emit(this.property);
  }
  toggleFavorite() {
    this.property.isFavorite = !this.property.isFavorite;

    if (this.property.isFavorite) {
      this.messageService.add({
        severity: 'success',
        summary: 'Añadido a favoritos',
        detail: `${this.property.name} se ha agregado a tu lista.`,
        life: 2500
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Eliminado de favoritos',
        detail: `${this.property.name} se ha eliminado de tu lista.`,
        life: 2500
      });
    }
  }
}
