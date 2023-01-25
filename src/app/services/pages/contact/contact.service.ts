import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  
  private url: string = 'http://localhost:8000/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public index(): Observable<any>{
    return this.http.get(`${this.url}/contact`).pipe(
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
    return this.http.post(`${this.url}/contact/new`, payload).pipe(
      map((res) => {
        return this.router.navigate(['admin/contatos']);
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }
  
  public show(payload: {id: any}): Observable<any>{
    return this.http.get(`${this.url}/contact/${payload.id}`).pipe(
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
      return this.http.put(`${this.url}/contact/edit/${payload.id}`, payload).pipe(
        map((res) => {
          return this.router.navigate(['admin/contatos']);
        }),
        catchError((err) => {
          if(err.error.message) return throwError(() => err.error.message); 
          return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
        })
      )
    }
    
    public delete(payload: {id: any}): Observable<any>{
      return this.http.delete(`${this.url}/contact/delete/${payload.id}`).pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          if(err.error.message) return throwError(() => err.error.message); 
          return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
        })
      )
    }
}
