import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Style } from '../interfaces/Style';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
    console.log("Service is working!");
  }

  getBusinessStyle(id: number){
    return this.http.get<Style>('http://localhost:8080/business/' + id + '/getStyle');
  }
}
