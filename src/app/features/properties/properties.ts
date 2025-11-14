import { Component } from '@angular/core';

import { CapsuleButton } from '../../shared/components/capsule-button/capsule-button';
import { PropertiesList } from '../../shared/components/properties-list/properties-list';
import { PropertyDetail } from '../../shared/components/property-detail/property-detail';
import { SearchInput } from '../../shared/components/search-input/search-input';

@Component({
  selector: 'app-properties',
  imports: [CapsuleButton, PropertyDetail, PropertiesList, SearchInput],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})

export class Properties {
  selectedProperty: any = null;
  showDetail = false;
  userLoggedIn = false; //true

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

  filteredProperties = [...this.properties];

  onSearch(query: string) {
    const term = query.toLowerCase().trim();
    this.filteredProperties = this.properties.filter(property =>
      property.name.toLowerCase().includes(term) ||
      property.address.toLowerCase().includes(term)
    );
  }

  onPropertyClick(property: any) {
    this.selectedProperty = property;
    this.showDetail = true;
    console.log('Propiedad seleccionada:', property);
  }
}
