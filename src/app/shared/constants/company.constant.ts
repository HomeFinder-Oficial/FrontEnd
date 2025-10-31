/**
* Defines and centralizes the company information used in the application.
* Using 'as const' ensures that the values ​​are immutable and strongly typed.
*/
export const CompanyInfo = {
  NAME: 'Inmobiliaria El Buen Vecino S.A.S.',
  NIT: '900.123.456-7',
  REPORT_FOOTER_TEXT: 'Generado por el sistema de gestión - Confidencial',
  DEFAULT_CURRENCY: 'COP',
  // Static path to the company logo (if the logo is stored locally)
  LOGO_URL: '/assets/logos/logo.png'
} as const;