
interface Rol {
  id: string;
  nombre: string;
}
export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  activo: boolean;
  telefono?: string | null;
  id_rol?: string | null;
  rol?: Rol;
  foto?: string | null;

}
