import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseApi = environment.baseApi;

  constructor( private http: HttpClient ) { }

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseApi}/rest/v2/all`);
  }

  public addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.baseApi}/rest/v2/add`, country);
  }

  public updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.baseApi}/rest/v2/update`, country);
  }

  public deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApi}/rest/v2/delete/${id}`);
  }

}
