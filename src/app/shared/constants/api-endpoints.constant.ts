// Define the API version in a single place
const API_V1 = '/api/v1';

// Export an object with all the endpoints
export const ApiEndpoints = {
  PROPERTIES: `${API_V1}/properties`, // -> '/api/v1/properties'
  USERS: `${API_V1}/users`, // -> '/api/v1/users'
  PROPERTY_TYPES: `${API_V1}/property-types`,

  // You can be as specific as you want
  // PROPERTIES_BY_TYPE: `${API_V1}/properties/type` // -> '/api/v1/properties/type'
};