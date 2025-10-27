import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { User } from '../../../shared/interfaces/user.interface';
import { PagedApiUserResponse } from '../../../shared/interfaces/paged-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZDdlOTc4YS05OWQwLTRiODktOTQyOC1mYWY1NWI4Y2NmNzIiLCJlbWFpbCI6ImNpZnVlbnRlc0BleGFtcGxlLmNvbSIsImlkX3JvbCI6IjkwMzczZjhiLWIyYjMtMTFmMC1hNTY1LTg2MmNjZmIwMzg2NCIsImlhdCI6MTc2MTUxNDU5NCwiZXhwIjoxNzYxNjAwOTk0fQ.WfzsGpVFfx5aK2ZQS8n_he7TKr_tLVsoEL0HKfjSRds`,
    });
  }

  createUser(userData: FormData): Observable<User> {
    return this.http.post<User>(environment.API_URL_USER_CREATE, userData,
      { headers: this.getAuthHeaders() }
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL_USER_READBYID}${userId}`, { headers: this.getAuthHeaders() });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL_USER_READALL, { headers: this.getAuthHeaders() });
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.API_URL_USER_UPDATE}${userId}`, userData, { headers: this.getAuthHeaders() });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL_USER_DELETE}${userId}`, { headers: this.getAuthHeaders() });
  }

  getUsersByPage(page: number, size: number): Observable<PagedApiUserResponse<User>> {
    let params = new HttpParams().set('page', page.toString()).set('limit', size.toString());

    const url = `${environment.API_URL_USER_READALL}`;

    return this.http.get<PagedApiUserResponse<User>>(url, { params, headers: this.getAuthHeaders() });
  }
}
