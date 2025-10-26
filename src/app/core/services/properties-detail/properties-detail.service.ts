import { Injectable, inject } from '@angular/core';
import { Property } from '../../../shared/interfaces/property.interface';
import { PropertyState } from '../../../shared/interfaces/property-state.interface';
import { PropertiesService } from '../properties/properties.service'
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map, switchMap, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PropertiesDetailService {

  private propertiesService = inject(PropertiesService);

  private initialState: PropertyState = {
    property: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.propertiesService.getPropertyById(+id)),
          map((data) => ({ property: data, status: 'success' as const })),

          // Handle errors
          catchError((err: HttpErrorResponse) => {
            console.error('Error loading property:', err);

            // Return a state indicating an error occurred to update the signal
            return of({ property: null, status: 'error' as const });
          })
        ),
    },
  });
}
