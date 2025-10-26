export interface PagedApiResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  page: number; // Current page
  size: number;
  // ...you can add more pagination properties if needed
}