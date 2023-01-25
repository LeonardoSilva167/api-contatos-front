import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

// Services
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:8000/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public index(): Observable<any>{
    return this.http.get<{ token: string}>(`${this.url}/user`).pipe(
      map((res) => {
        return res;

      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }

  public create(payload: {name: string, email: string,telefone: string, celular: string}): Observable<any>{
    return this.http.post<{ token: string}>(`${this.url}/user/new`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token)
        return this.router.navigate(['admin/pessoas']);
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }
  
  public show(payload: {id: any}): Observable<any>{
    return this.http.get<{ token: string}>(`${this.url}/user/${payload.id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
      )
    }
    
    public edit(payload: {id: any, name: string, email: string,telefone: string, celular: string}): Observable<any>{
      return this.http.put<{ token: string}>(`${this.url}/user/edit/${payload.id}`, payload).pipe(
        map((res) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', res.token)
          return this.router.navigate(['admin/pessoas']);
        }),
        catchError((err) => {
          if(err.error.message) return throwError(() => err.error.message); 
          return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
        })
      )
    }
}
