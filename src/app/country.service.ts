import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // getting base api from environment variables
  private baseApi = environment.baseApi;

  // injecting http client
  constructor( private http: HttpClient ) { }

  // send get request to backend end point to retrive all countries
  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseApi}/rest/v2/all`);
  }

  // send post request with payload insert new country record
  public addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${this.baseApi}/rest/v2/add`, country);
  }

  // send put request to update existing record
  public updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.baseApi}/rest/v2/update`, country);
  }

  // send delete request to delete a country record
  public deleteCountry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApi}/rest/v2/delete/${id}`);
  }

    // send delete request to delete all the country records
    public deleteAllCountries(): Observable<void> {
      return this.http.delete<void>(`${this.baseApi}/rest/v2/deleteall`);
    }

}
