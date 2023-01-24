import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8000/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public sing(payload: {email: string, password: string}): Observable<any>{
    // return this.http.post(`${this.url}/auth/sing`, payload).pipe(
    return this.http.post<{ token: string}>(`${this.url}/auth/sing`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token)
        return this.router.navigate(['admin']);
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }

  public logout(){
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token');

    if(!token) return false;

    const jwtHelper = new JwtHelperService()
    return !jwtHelper.isTokenExpired(token);

  }
}
