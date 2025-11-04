import { Component, input, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Property } from '../../../shared/interfaces/property.interface';

@Component({
  selector: 'app-property-card',
  imports: [CardModule, ButtonModule, DividerModule],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css'
})

export class PropertyCard {

  @Input({ required: true }) property!: Property;

  valorProps = input<string>('Beautiful House');
  nombreProps = input<string>('A beautiful house in the city');
  direccionProps = input<string>('123 Main St, Cityville');
  imageProps = input<string>('https://primefaces.org/cdn/primeng/images/card-ng.jpg');
  habitacionesProps = input<number>(3);
  banosProps = input<number>(2);
  areaProps = input<number>(1500);
  isPopular = input<boolean>(true);
  isFavorite = input<boolean>(false);

}
