/*
  * For easier debugging in development mode, you can import the following file
  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
  *
  * This import should be commented out in production mode because it will have a negative impact
  * on performance if an error is thrown.
  *
*/
/*
NOTE: This file is for the development environment. If you want to change the API URL, you can do so here.
You can change the API URL in the environment.ts file for production once we have the backend endpoints.
*/

const API_URL_BASE = 'http://localhost:3000/api/v1'; // URL where the backend API is hosted

export const environment = {
  production: false,
  API_URL: API_URL_BASE,

  // Properties
  API_URL_PROPERTIES_CREATE: `${API_URL_BASE}api/properties`,
  API_URL_PROPERTIES_UPDATE: `${API_URL_BASE}api/properties/`, //NOTE: It needs to have the slash at the end because the property ID is concatenated
  API_URL_PROPERTIES_DELETELOGICALLY: `${API_URL_BASE}api/properties/`, //NOTE: It needs to have the slash at the end because the property ID is concatenated
  API_URL_PROPERTIES_READALL: `${API_URL_BASE}api/properties`,

  API_URL_PROPERTIES_READBYID: `${API_URL_BASE}api/properties/`, //NOTE: It needs to have the slash at the end because the property ID is concatenated
  API_URL_PROPERTIES_READBYTYPE: `${API_URL_BASE}api/properties/type/`, //NOTE: It needs to have the slash at the end because the property ID is concatenated
  API_URL_PROPERTIES_RANDOM: `${API_URL_BASE}api/properties/random/`, //NOTE: It needs to have the slash at the end because the property ID is concatenated

  // Authentication (login and signup)
  API_URL_USER_LOGIN: `${API_URL_BASE}/auth/login`,
  API_URL_USER_REGISTER: `${API_URL_BASE}/auth/register`,

  // User management
  API_URL_USER_UPDATE: `${API_URL_BASE}/users`,
  API_URL_USER_READALL: `${API_URL_BASE}/users`,
  API_URL_USER_READBYID: `${API_URL_BASE}/users/`,
  API_URL_USER_DELETE: `${API_URL_BASE}/users/`,
  API_URL_USER_CREATE: `${API_URL_BASE}/users`,

  // Roles
  API_URL_ROLES_READALL: `${API_URL_BASE}api/roles`,

  // Notifications
  API_URL_NOTIFICACIONES: `${API_URL_BASE}api/notifications`

};
