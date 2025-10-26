import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-property-filters',
  imports: [
    CommonModule,
    PanelModule, 
    SelectModule, 
    SliderModule, 
    InputNumberModule, 
    FormsModule, 
    ButtonModule, 
    CurrencyPipe
  ],
  templateUrl: './property-filters.component.html',
  styleUrl: './property-filters.component.css'
})

export class PropertyFiltersComponent implements OnInit {
  @Output() filtersApplied = new EventEmitter<any>();
  cities: any[] = [];

  selectedCity: any = null;
  priceRange: number[] = [0, 1500000000];
  minRooms: number | null = null;

  constructor() {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cities = [
      { name: 'Ciudad 1', id: 1 },
      { name: 'Ciudad 2', id: 2 },
      { name: 'Ciudad 3', id: 3 }
    ];
    this.selectedCity = this.cities[0];
  }

  applyFilters(): void {
    const activeFilters = {
      city: this.selectedCity ? this.selectedCity.code : null,
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1],
      minRooms: this.minRooms
    };

    console.log('Filtros aplicados (desde el hijo):', activeFilters);
    this.filtersApplied.emit(activeFilters);
  }

  clearFilters(): void {
    this.selectedCity = this.cities[0];
    this.priceRange = [0, 1500000000];
    this.minRooms = null;

    this.applyFilters();
  }
}
