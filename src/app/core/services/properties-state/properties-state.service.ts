import { Injectable, inject } from '@angular/core';
import { Property } from '../../../shared/interfaces/property.interface';
import { PropertiesState } from '../../../shared/interfaces/properties-state.interfaces';
import { signalSlice } from 'ngxtension/signal-slice';
import { PropertiesService } from '../properties/properties.service'
import { Subject, catchError, map, of, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PropertiesStateService {
  
  constructor() { }

  private propertiesService = inject(PropertiesService);

  private initialState: PropertiesState = {
    properties: [],
    status: 'loading' as const,
    page: 1,
  };

  changePage$ = new Subject<number>();

  loadProperties$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) => this.propertiesService.getPropertiesByPage(page, 10)),
    map((properties) => ({ properties, status: 'success' as const })),
    catchError(() => {
      return of({
        properties: [],
        status: 'error' as const,
      });
    }),
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.changePage$.pipe(
        map((page) => ({ page, status: 'loading' as const })),
      ),
      this.loadProperties$,
    ],
  });
}
