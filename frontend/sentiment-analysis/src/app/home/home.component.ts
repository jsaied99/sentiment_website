import { Component, OnInit } from '@angular/core';
import {BackendService} from "../services/backend.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { getAuth } from "firebase/auth";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataLoaded: boolean = false;
  averageSentiment: number | string = "No Data";
  numberOfTweets: number = 0;
  averageSentimentInterpretation: string = "No Data";

  hashtagSentimentForm!: FormGroup;

  hashTagSearchValue: string | null = null;

  constructor(private api: BackendService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.hashtagSentimentForm = this.fb.group({
      hashtag: new FormControl('', Validators.required),
      tweetsNum: new FormControl('', Validators.required)
    });
  }

  public analyzeTweets(){

    if(this.hashtagSentimentForm.valid){

      const formValues = this.hashtagSentimentForm.value;
      this.hashTagSearchValue = formValues.hashtag;
      let tweetsNum = formValues.tweetsNum;

      let uid: string | null = this.getUid();
      if(uid && this.hashTagSearchValue && tweetsNum){
        this.api.getSentimentAnalysis(uid, this.hashTagSearchValue, tweetsNum).subscribe((response: any) => {

          if(response['success'] == 1){
            let data = response['data'];

            this.numberOfTweets = data.length;

            this.averageSentiment = this.getAverageSentimentScoreOfTweets(data, this.numberOfTweets);
            this.averageSentimentInterpretation = this.getAverageSentimentScoreInterpretation(parseFloat(this.averageSentiment));

            this.dataLoaded = true;
          }
          else {
            console.log("Not a hashtag");
          }
        });
      }
      else {
        console.log("One of the fields is not initialized");
      }
    }
    else {
      console.log("Invalid form");
    }
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

  public getAverageSentimentScoreOfTweets(jsonDataList: any, numberOfTweets: number){

    let total: number = 0;

    for(let i = 0; i < numberOfTweets; i++){
      total+= jsonDataList[i]['score'];
    }

    let average: number = total / numberOfTweets;

    let roundedAverage: string = average.toFixed(4);

    return roundedAverage;
  }

  public getAverageSentimentScoreInterpretation(averageSentimentScore: number): string {

    if(averageSentimentScore >= 0.6){
      return 'Positive';
    }
    else if(averageSentimentScore > 0.33 && averageSentimentScore < 0.6){
      return 'Somewhat Positive';
    }
    else if(averageSentimentScore < -0.33){
      return 'Negative';
    }
    else if(averageSentimentScore >= -0.33 && averageSentimentScore <= 0.33){
      return 'Neutral';
    }
    else {
      return 'Error';
    }
  }
}
