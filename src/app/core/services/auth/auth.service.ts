import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from '../../../shared/interfaces/auth.interface';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../token/token.service';
import { User } from '../../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticatedSubject!: BehaviorSubject<boolean>;
  public isAuthenticated$!: Observable<boolean>;

  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser$!: Observable<User | null>;

  private readonly API = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User | null>(this.tokenService.getUser());
    this.currentUser$ = this.currentUserSubject.asObservable();

    if (this.tokenService.hasToken() && this.tokenService.isTokenExpired()) {
      this.logout();
    }
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/auth/login`, payload).pipe(
      tap((response) => {
        this.setSession(response.access_token, response.user);
      })
    );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API}/auth/register`, payload);
  }

  private setSession(token: string, user: User): void {
    this.tokenService.setToken(token);
    this.tokenService.setUser(user);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.tokenService.clear();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken() && !this.tokenService.isTokenExpired();
  }

  getCurrentUser(): User | null {
    return this.tokenService.getUser();
  }
}
