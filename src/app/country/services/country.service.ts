import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country-interface';
import { CountryMapper } from '../mapper/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private http = inject(HttpClient)

  searchByCapital(query: string): Observable<Country[]>{
    query = query.toLowerCase()
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( resp => CountryMapper.restCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log('Error fetching', error)

        return throwError(() => new Error(`No se obtuvieron países con ese query ${query}`))
      })
    )
  }

  searchByCountry(query: string):Observable<Country[]>{
    query = query.toLocaleLowerCase()

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(resp => CountryMapper.restCountryArrayToCountryArray(resp)),
      delay(3000),
      catchError(error => {
        console.log('Error de fetching', error)
        return throwError(() => new Error(`No se encontraron países con el query ${query}`))
      })
    )
  }

  searchCountryByAlphaCode(code: string){
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map( resp => CountryMapper.restCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.log('Error fetching', error)

        return throwError(() => new Error(`No se encontró el país con el codigo ${code}`))
      })
    )
  }


}
