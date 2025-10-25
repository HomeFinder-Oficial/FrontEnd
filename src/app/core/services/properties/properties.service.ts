import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../../shared/interfaces/property.interface';
import { environment } from '../../../../environments/environment.dev';
import { PagedApiResponse } from '../../../shared/interfaces/paged-api-response.interface';

@Injectable({
  providedIn: 'root'
})

export class PropertiesService {
  
  private http = inject(HttpClient);

  createProperty(propertyData: FormData): Observable<Property> {
    return this.http.post<Property>(environment.API_URL_PROPERTIES_CREATE, propertyData);
  }

  getPropertyById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${environment.API_URL_PROPERTIES_READBYID}${propertyId}`);
  }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(environment.API_URL_PROPERTIES_READALL);
  }

  getPropertiesByType(type: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.API_URL_PROPERTIES_READBYTYPE}${type}`);
  }

  // Replacing 'any' with a safer type.
  // Partial<Property> allows sending only the parts of the property that changed.
  updateProperty(propertyId: number, propertyData: Partial<Property>): Observable<Property> {
    return this.http.put<Property>(`${environment.API_URL_PROPERTIES_UPDATE}${propertyId}`, propertyData);
  }

  deleteProperty(propertyId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL_PROPERTIES_DELETELOGICALLY}${propertyId}`);
  }

  getRandomProperties(count: number): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.API_URL_PROPERTIES_RANDOM}${count}`);
  }

  getPropertiesByPage(
    page: number,
    size: number,
    typeId?: number
  ): Observable<PagedApiResponse<Property>> {
    // Using HttpParams to build query params safely
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // This builds the base URL with the typeId path param
    const typeIdPath = (typeId !== undefined && typeId !== null) ? typeId : 0
    let url = `${environment.API_URL_PROPERTIES_READALL}/${typeIdPath}`;

    // Send the params as an option in the GET request
    return this.http.get<PagedApiResponse<Property>>(url, { params });
  }
}
