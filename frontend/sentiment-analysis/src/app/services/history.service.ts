import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyUrl = 'https://jamalsaied.net:8888/all_queries?uid=test3';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  // add parameter for current userId
  getHistory() { 
    return this.http.get<any>(this.historyUrl);
  }
}