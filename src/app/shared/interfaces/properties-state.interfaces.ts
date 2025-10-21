import { Property } from './property.interface';

export interface PropertiesState {
  properties: Property[];
  status: 'loading' | 'success' | 'error';
  page: number;
}