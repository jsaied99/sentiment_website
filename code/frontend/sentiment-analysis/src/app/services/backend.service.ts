import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  public getHistory(){

    console.log("Get all queries in service ts");

      return this.http.get(
        'https://jamalsaied.net:8888/all_queries'
      );
  }

  public getSentimentAnalysis(uid: string, hashtag: string, limit: number){
    return this.http.get(
      'https://jamalsaied.net:8888/twitter_api?uid=' + uid + '&topic=' + hashtag + '&limit=' + limit
    );
  }

}
