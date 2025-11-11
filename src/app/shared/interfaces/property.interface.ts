import { PropertyLocation } from './property-location.interface';
import { PropertyType } from './property-type.interface';
import { PropertyPhoto } from './property-photo.interface';

export interface Property {
  id: number;
  value: string;
  name: string;
  address: string;
  image: string;
  rooms: number;
  baths: number;
  area: number;
  isPopular?: boolean;
  isFavorite?: boolean;

  // TASK: Necessary user interface to replace this FK
  id_owner: string;

  // --- NESTED OBJECTS ---
  // Replace foreign keys (FKs) with complete objects
  propertyLocation: PropertyLocation;
  propertyType: PropertyType;
  photos: PropertyPhoto[];

  // This field is useful for PREVIEW in the dialog.
  // It's better to have it if the API doesn't provide a 'mainPhotoUrl'.
  // Optional.
  url?: string;
}
