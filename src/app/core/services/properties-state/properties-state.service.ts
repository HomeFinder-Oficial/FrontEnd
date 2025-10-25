import { Injectable, inject } from '@angular/core';
import { Property } from '../../../shared/interfaces/property.interface';
import { PropertiesState } from '../../../shared/interfaces/properties-state.interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { PropertiesService } from '../properties/properties.service'
import { Observable, catchError, map, of, startWith, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PropertiesStateService {

  private propertiesService = inject(PropertiesService);

  private initialState: PropertiesState = {
    properties: [],
    status: 'loading' as const,
    page: 1, // Default initial page number
  };

  private initialLoad$ = of(1).pipe( 
    switchMap((page) => this.propertiesService.getPropertiesByPage(page, 10)),
    map((properties) => ({ properties, status: 'success' as const, page: 1 })),
    catchError(() => {
      return of({
        properties: [],
        status: 'error' as const,
        page: 1, // Keep the first page on error cases
      });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    // Initial charge of the state with data
    sources: [this.initialLoad$],

    // Changing page action is handled here
    actionSources: {
      changePage: (_state, $: Observable<number>) => $.pipe(
        switchMap((page) => 
          this.propertiesService.getPropertiesByPage(page, 10).pipe(
            // If the API responds successfully
            map((properties) => ({ properties, status: 'success' as const, page })),
            
            // Emit this object FIRST
            startWith({ status: 'loading' as const, page }),

            // if the API fails
            catchError(() => of({ properties: [], status: 'error' as const, page }))
          )
        )
      ),
    },
  });
}
