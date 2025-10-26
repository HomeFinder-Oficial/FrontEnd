import { PropertyLocation } from './property-location.interface';
import { PropertyType } from './property-type.interface';
import { PropertyPhoto } from './property-photo.interface';

export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    area_m2: number;
    rooms: number;
    bathrooms: number;
    active: boolean;

    // TASK: Necesary user interface to replace this FK
    id_owner: string;

    // --- OBJETOS ANIDADOS ---
    // Reemplazamos los FKs por los objetos completos
    propertyLocation: PropertyLocation;
    propertyType: PropertyType;
    photos: PropertyPhoto[];

    // This field is useful for PREVIEW in the dialog.
    // Is better to have it if the API doesn't provide a 'mainPhotoUrl'.
    // We make it optional.
    url?: string;
}