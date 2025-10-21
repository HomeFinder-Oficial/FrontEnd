import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../../shared/interfaces/property.interface';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})

export class PropertiesService {
  
  constructor(private http: HttpClient) {}

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

  updateProperty(propertyId: number, propertyData: any): Observable<Property> {
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
  ): Observable<any> {
    const params: any = {
      page: page.toString(),
      size: size.toString()
    };

    let url = `${environment.API_URL_PROPERTIES_READALL}` + `/${typeId !== undefined && typeId !== null ? typeId : 0}`;

    return this.http.get<any>(url, { params });
  }
}
