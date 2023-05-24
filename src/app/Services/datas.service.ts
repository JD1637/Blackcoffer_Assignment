import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any[]>(this.apiUrl);
  }

}
