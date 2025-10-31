/**
* Defines and centralizes the names of the roles used in the application.
* Using 'as const' ensures that the values ​​are immutable and strongly typed.
*/
export const AppRoles = {
  ADMIN: 'ADMIN',
  //ADMINISTRATOR: 'ADMINISTRATOR',
  OWNER: 'OWNER',
  USER: 'USER',
 
  // If your backend uses different numbers or strings, you map it here:
  // CLIENT: 'ROLE_CLIENT'
} as const;

// We export a Typeof to type functions that accept roles
export type AppRoleKey = keyof typeof AppRoles;