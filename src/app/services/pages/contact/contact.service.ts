import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  // Rota da API
  private url_base: string = 'http://localhost:8000/api/v1';
  // sub-dominio da rota
  private url_route: string = '/contact';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  /**
   * Busca dados para alimentar a tela principal
   * @returns Json
   */
  public index(): Observable<any>{
    return this.http.get(`${this.url_base+this.url_route}`).pipe(
      map((res) => {
        return res;

      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }
  
  /**
   * Resposável por enviar os dados para salvar no banco
   * 
   * @param payload 
   * @returns Boolean
   */
  public create(payload: {name: string, email: string,telephone: string, cell_phone: string, additional_contacts: any}): Observable<any>{
    return this.http.post(`${this.url_base+this.url_route}/new`, payload).pipe(
      map((res) => {
        return this.router.navigate(['admin/contacts']);
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
    )
  }

  /**
   * Responsável por Exibir os dados do id selecionado
   * 
   * @param payload 
   * @returns Json
   */
  public show(payload: {id: any}): Observable<any>{
    return this.http.get(`${this.url_base+this.url_route}/${payload.id}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message); 
        return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
      })
      )
    }
    
    /**
     * Faz update dos dados do id vinculado
     * 
     * @param payload 
     * @returns Boolean
     */
    public edit(payload: {id: any, name: string, email: string,telephone: string, cell_phone: string, additional_contacts: any}): Observable<any>{
      return this.http.put(`${this.url_base+this.url_route}/edit/${payload.id}`, payload).pipe(
        map((res) => {
          return this.router.navigate(['admin/contacts']);
        }),
        catchError((err) => {
          if(err.error.message) return throwError(() => err.error.message); 
          return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
        })
      )
    }
    
    /**
     * Remove os dados do id vinculado
     * 
     * @param payload 
     * @returns Boolean
     */
    public delete(payload: {id: any}): Observable<any>{
      return this.http.delete(`${this.url_base+this.url_route}/delete/${payload.id}`).pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => {
          if(err.error.message) return throwError(() => err.error.message); 
          return throwError(() => "No Momento não estamos conseguindo validar estes dados, tente novamente mais tarde");
        })
      )
    }

    /**
     * Busca o total de Contatos ja adicionados
     * 
     * @returns Json
     */
    public getCountContacts(): Observable<any>{
      return this.http.get(`${this.url_base+this.url_route}/get-count-contacts`).pipe(
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
