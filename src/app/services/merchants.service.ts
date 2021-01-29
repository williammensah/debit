import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { filter } from 'minimatch';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Merchant } from '../model/merchants';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService {
  private url = 'http://localhost:8000/api/v1/merchants';
  // = 'test';
  constructor(private http: HttpClient) {}


  getMerchants(page?,): Observable<Merchant[]> {
    let headers = new HttpHeaders();
    headers = headers.append('API-KEY', '2enop2f8ty45susjtz');
    return this.http
      .get(`${this.url}?page=${page}&merchant_name=${}`, { headers: headers })
      .pipe(map(res => res['data']
    ) );
  }


}
