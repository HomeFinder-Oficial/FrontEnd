import { Component } from '@angular/core';

import { CapsuleButton } from '../../shared/components/capsule-button/capsule-button';
import { PropertiesList } from '../../shared/components/properties-list/properties-list';
import { PropertyDetail } from '../../shared/components/property-detail/property-detail';
import { SearchInput } from '../../shared/components/search-input/search-input';

@Component({
  selector: 'app-properties',
  imports: [CapsuleButton, PropertyDetail, SearchInput],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})

export class Properties {
  properties = [
    { id: 1, name: 'Apartamento Centro', city: 'Bogotá' },
    { id: 2, name: 'Casa Familiar', city: 'Medellín' },
    { id: 3, name: 'Oficina Moderna', city: 'Cali' },
  ];

  filteredProperties = [...this.properties];
  
  onSearch(query: string) {
    const term = query.toLowerCase().trim();
    this.filteredProperties = this.properties.filter(property =>
      property.name.toLowerCase().includes(term) ||
      property.city.toLowerCase().includes(term)
    );
  }
}
