import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Importa el módulo de InfiniteScroll
import { Scroller } from 'primeng/scroller';

// 2. Importa tu servicio de estado (o el servicio normal)
import { PropertiesStateService } from '../../../core/services/properties-state/properties-state.service';
import { PropertiesService } from '../../../core/services/properties/properties.service';
import { PagedApiResponse } from '../../../shared/interfaces/paged-api-response.interface';

// 3. Importa el componente hijo

import { PropertyCard } from '../property-card/property-card';


import { Property } from '../../../shared/interfaces/property.interface';
import { of } from 'rxjs'; // Para simular

@Component({
  selector: 'app-properties-list',
  imports: [PropertyCard, Scroller, CommonModule],
  templateUrl: './properties-list.html',
  styleUrl: './properties-list.css',
})

export class PropertiesList implements OnInit {
  // Puedes usar el servicio de estado o el servicio normal
  private propertiesService = inject(PropertiesService);

  properties: Property[] = [];
  currentPage = 1; // El paginador de la API (1-based)
  totalPages = 1; // Para saber cuándo parar
  isLoading = false; // Para evitar cargas múltiples

  constructor() {}

  ngOnInit(): void {
    // No cargamos nada aquí, el 'p-infiniteScroller' lo hará por nosotros.
  }

  /**
   * 5. (LA CLAVE) Esta función es llamada por p-infiniteScroller
   * cuando el usuario se acerca al final de la página.
   */
  loadMoreProperties(event: any): void {
    // Si ya está cargando o ya se cargaron todas las páginas, no hagas nada
    if (this.isLoading || this.currentPage > this.totalPages) {
      return;
    }

    this.isLoading = true;

    // Llama al servicio pidiendo la página 'currentPage'
    this.propertiesService.getPropertiesByPage(this.currentPage, 8).subscribe({
      next: (response: PagedApiResponse<Property>) => {
        
        // 6. (IMPORTANTE) Añade las nuevas propiedades al array existente
        this.properties = [...this.properties, ...response.content];
        
        // 7. Actualiza los contadores
        this.totalPages = response.totalPages;
        this.currentPage++; // Prepara para la siguiente llamada
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error cargando más propiedades", err);
        this.isLoading = false;
      }
    });
  }
}
