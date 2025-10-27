export interface PagedApiResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  page: number; // Current page
  size: number;
  // ...you can add more pagination properties if needed
}

export interface PagedApiUserResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    [key: string]: any;
  };
}
