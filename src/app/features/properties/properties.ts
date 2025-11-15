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
  searchText: string = '';
  isValid: boolean = true;

  // How many properties to show initially
  visibleCount = 6;

  // How many to add each time
  loadStep = 6;

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
    },
    {
      value: '$1,900/month',
      name: 'Urban Loft',
      address: '221 Central Ave, Metropolis',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 2,
      baths: 1,
      area: 620,
      isPopular: false,
      isFavorite: false
    },
    {
      value: '$3,450/month',
      name: 'Lakeview Residence',
      address: '45 Shoreline Dr, Silverlake',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 3,
      baths: 2,
      area: 950,
      isPopular: true,
      isFavorite: true
    },
    {
      value: '$2,300/month',
      name: 'Cityscape Apartment',
      address: '12 Horizon St, Downtown',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 1,
      baths: 1,
      area: 540,
      isPopular: false,
      isFavorite: false
    },
    {
      value: '$4,200/month',
      name: 'Luxury Penthouse',
      address: '800 Skyline Blvd, Uptown',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 4,
      baths: 3,
      area: 1200,
      isPopular: true,
      isFavorite: true
    },
    {
      value: '$1,550/month',
      name: 'Cozy Suburban Home',
      address: '33 Maple Dr, Brookfield',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 2,
      baths: 2,
      area: 705,
      isPopular: false,
      isFavorite: false
    },
    {
      value: '$2,900/month',
      name: 'Downtown Duplex',
      address: '17 Oak Lane, Midtown',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 3,
      baths: 2,
      area: 890,
      isPopular: true,
      isFavorite: false
    },
    {
      value: '$1,320/month',
      name: 'Studio Haven',
      address: '102 Blossom St, Riverside',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 1,
      baths: 1,
      area: 480,
      isPopular: false,
      isFavorite: false
    },
    {
      value: '$2,650/month',
      name: 'Garden View House',
      address: '501 Greenway Rd, Meadowville',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 3,
      baths: 2,
      area: 820,
      isPopular: false,
      isFavorite: true
    },
    {
      value: '$3,800/month',
      name: 'Oceanfront Villa',
      address: '8 Waveside Ave, Coastland',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 4,
      baths: 3,
      area: 1100,
      isPopular: true,
      isFavorite: false
    },
    {
      value: '$1,780/month',
      name: 'Modern Micro Loft',
      address: '57 Tech Park St, Innovation City',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 1,
      baths: 1,
      area: 560,
      isPopular: false,
      isFavorite: false
    },
    {
      value: '$2,450/month',
      name: 'Suburban Family Suite',
      address: '90 Pinecrest St, Grand Oaks',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 3,
      baths: 2,
      area: 780,
      isPopular: false,
      isFavorite: true
    },
    {
      value: '$3,150/month',
      name: 'Clifftop Residence',
      address: '301 Edgeview Rd, Highland Ridge',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 3,
      baths: 2,
      area: 900,
      isPopular: true,
      isFavorite: false
    },
    {
      value: '$1,600/month',
      name: 'Rustic Cabin',
      address: '244 Forest Trail, Woodlands',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 2,
      baths: 1,
      area: 650,
      isPopular: false,
      isFavorite: true
    },
    {
      value: '$2,880/month',
      name: 'Skyline Condo',
      address: '78 Aurora Tower, Downtown Heights',
      image: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      rooms: 2,
      baths: 2,
      area: 830,
      isPopular: true,
      isFavorite: false
    }
  ];

  validateInput() {
    this.isValid = this.searchText.trim().length > 0;
  }

  onSearchChange(value: string) {
    this.searchText = value;
    this.validateInput(); // keep validation working
  }

  get filteredProperties() {
    const term = this.searchText.toLowerCase().trim();
    if (!term) return this.properties; // Muestra todas si no se busca nada

    return this.properties.filter((p) =>
      p.name.toLowerCase().includes(term)
    );
  }

  onPropertyClick(property: any) {
    this.selectedProperty = property;
    this.showDetail = true;
    console.log('Propiedad seleccionada:', property);
  }
}
