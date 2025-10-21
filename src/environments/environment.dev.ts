/*
  * For easier debugging in development mode, you can import the following file
  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
  *
  * This import should be commented out in production mode because it will have a negative impact
  * on performance if an error is thrown.
  *
*/
/*
NOTA: Este archivo es para el entorno de desarrollo. Si quieres cambiar la URL de la API, puedes hacerlo aquí.
Puedes cambiar la URL de la API en el archivo environment.ts para producción cuando tengamos los endpoints del backend.
*/

const API_URL_BASE = 'https://......../'; // URL donde está alojada la API backend

export const environment = {
  production: false,
  API_URL: API_URL_BASE,

  // Propiedades
  API_URL_PROPERTIES_CREATE: `${API_URL_BASE}api/properties`,
  API_URL_PROPERTIES_UPDATE: `${API_URL_BASE}api/properties/`, //NOTA: Necesita tener el slash al final porque se concatena el ID de la propiedad
  API_URL_PROPERTIES_DELETELOGICALLY: `${API_URL_BASE}api/properties`,
  API_URL_PROPERTIES_READALL: `${API_URL_BASE}api/properties`,

  // Autenticación (login y registro)
  API_URL_USER_LOGIN: `${API_URL_BASE}rest/auth/login`,
  API_URL_USER_SIGNUP: `${API_URL_BASE}api/users`,
  
  // Usuarios
  API_URL_USER_UPDATE: `${API_URL_BASE}api/users/`,
  API_URL_USER_READALL: `${API_URL_BASE}api/users`,

  //roles
  API_URL_ROLES_READALL: `${API_URL_BASE}api/roles`,

  // Notificaciones
  API_URL_NOTIFICACIONES: `${API_URL_BASE}api/notifications`

};
