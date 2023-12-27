import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //need to run server first,otherwise the request will fail 
  private apiUrl = 'http://localhost:5214/api/';

  constructor(private httpClient: HttpClient) { }

  get(endpoint: string, params?: any): Promise<any> {
    const options = {
      params: new HttpParams({ fromObject: params })
    };

    return this.httpClient.get<any>(this.apiUrl + endpoint, options)
      .toPromise();
  }

  post(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<any>(this.apiUrl + endpoint, data, { headers })
      .toPromise();
  }

  put(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.put(this.apiUrl + endpoint, data, { headers })
      .toPromise();
  }

  delete(endpoint: string): Promise<any> {
    return this.httpClient.delete<any>(this.apiUrl + endpoint)
      .toPromise();
  }

  patch(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.patch(this.apiUrl + endpoint, data, { headers })
      .toPromise();
  }
}