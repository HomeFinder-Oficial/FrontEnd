import { Injectable, inject } from '@angular/core';
import { Property } from '../../../shared/interfaces/property.interface';
import { PropertyState } from '../../../shared/interfaces/property-state.interface';
import { PropertiesService } from '../properties/properties.service'
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PropertiesDetailService {
  constructor() { }

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
          map((data) => ({ product: data, status: 'success' as const })),
        ),
    },
  });
}
