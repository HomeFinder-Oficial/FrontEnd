/* Property interface based on MER BD */
export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    area_m2: number;
    rooms: number;
    bathrooms: number;
    active: boolean;
    id_owner?: number;
    id_type_property?: number;
    id_location?: number;
}