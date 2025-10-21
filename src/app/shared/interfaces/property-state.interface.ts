import { Property } from './property.interface';

export interface PropertyState {
  property: Property | null;
  status: 'loading' | 'success' | 'error';
}