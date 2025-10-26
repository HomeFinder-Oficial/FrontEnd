export interface PropertyPhoto {
  id: string;
  url: string;
  number: number;
  id_property: string; // El FK, por si la API lo envía
}