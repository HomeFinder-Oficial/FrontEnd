import { Component, Input, Output, OnInit, inject, HostListener, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesService } from '../../../core/services/properties/properties.service';
import { PagedApiResponse } from '../../../shared/interfaces/paged-api-response.interface';

import { Property } from '../../../shared/interfaces/property.interface';
import { PropertyCard } from '../property-card/property-card';

@Component({
  standalone: true,
  selector: 'app-properties-list',
  imports: [PropertyCard, CommonModule],
  templateUrl: './properties-list.html',
  styleUrl: './properties-list.css',
})

export class PropertiesList implements OnInit {
  //NEW: Personalizable by Inputs
  @Input() properties: any[] = [];
  @Input() selfFetch = false;// If true, component fetches its own data
  @Input() initialRowsShown: number = 2;// Number of rows initially visible
  @Input() columnsPerRow: number = 3;// Number of cards per row
  @Input() showLoadMoreButton: boolean = true;// Whether to show the "Load more" button
  @Input() infiniteScroll = false;// Enable infinite scroll

  @Output() propertyClick = new EventEmitter<Property>();

  //NEW: Internal State
  visibleProperties: Property[] = [];
  visibleCount = 0;
  allLoaded = false;
  isLoading = false;

  // For pagination (keep but commented)
  // currentPage = 1;
  // totalPages = 1;

  // Puedes usar el servicio de estado o el servicio normal
  private propertiesService = inject(PropertiesService);

  ngOnInit(): void {
    // No cargamos nada aquí, el 'p-infiniteScroller' lo hará por nosotros.
    //NEW:
    this.visibleCount = this.initialRowsShown * this.columnsPerRow;

    if (this.selfFetch) {
      this.fetchInitialProperties(); // Get from API
    } else {
      this.updateVisibleProperties(); // Use input data
    }
  }

  onCardClick(property: Property) { // 👈 handler called from HTML
    this.propertyClick.emit(property);
  }

  private fetchInitialProperties(): void {
    this.isLoading = true;

    this.propertiesService.getPropertiesByPage(1, this.initialRowsShown * this.columnsPerRow).subscribe({
      next: (response: PagedApiResponse<Property>) => {
        this.properties = response.content;
        // this.totalPages = response.totalPages;
        // this.currentPage = 2;
        this.isLoading = false;
        this.updateVisibleProperties();
      },
      error: (err) => {
        console.error('Error fetching properties', err);
        this.isLoading = false;
      },
    });
  }

  //NEW:
  loadMoreByXRows() { //SIN USO
    const currentLength = this.visibleProperties.length;
    const nextLength = currentLength + this.initialRowsShown * this.columnsPerRow;

    if (nextLength >= this.properties.length) {
      this.visibleProperties = this.properties;
      this.allLoaded = true;
    } else {
      this.visibleProperties = this.properties.slice(0, nextLength);
    }
  }

  //NEW: USE THIS
  // ──────────────────────────────
  // ⬇️ LOAD MORE BUTTON
  // ──────────────────────────────
  loadMore(): void {
    if (this.allLoaded) return;
    this.visibleCount += this.columnsPerRow; // Add one more row
    this.updateVisibleProperties();
  }

  //NEW: 
  private updateVisibleProperties(): void {
    const count = this.visibleCount;
    this.visibleProperties = this.properties.slice(0, count);
    this.allLoaded = this.visibleProperties.length >= this.properties.length;
  }

  // Optional: auto-load when scrolled to bottom
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.infiniteScroll || this.allLoaded || this.isLoading) return;

    const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;//-2 o - 2
    if (nearBottom) {
      this.loadMore();
    }
  }

    /**
   * 5. (LA CLAVE) Esta función es llamada por p-infiniteScroller
   * cuando el usuario se acerca al final de la página.
   */
  /*
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
  */
}
