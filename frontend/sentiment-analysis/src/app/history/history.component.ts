import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAuth } from "firebase/auth";

export interface tweet_data{
  tweet: string,
  score: number,
  interpretation: string
}

export interface api_response{
  texts: tweet_data[],
  topic: string
}

export interface response{
  data: api_response[],
  status: string
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  myTest: response = {data: [{texts: [], topic: "blank topic"}], status: "undefined status"};
  selected_api_response?: api_response;
  // otherTest: any = [];
  constructor(private historyService: HistoryService, private http: HttpClient,) { }

  ngOnInit(): void {
  //  get cookie for userId to be passed to getHistory
   let uid: string | null= this.getUid();
   this.historyService.getHistory(uid).subscribe(data => {
        console.log(data['data'][0]['texts']);
        console.log("score is " + data);
        this.myTest = data;
    }) 
    
    console.log("this.mytest = " + this.myTest);
  }

  onSelect(this_response: api_response): void {
    this.selected_api_response= this_response;
  }

  public getUid(): string | null{
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return user.uid;
    } else {
      console.log("Not logged in so can't get uid");
      return null;
    }
  }

}
