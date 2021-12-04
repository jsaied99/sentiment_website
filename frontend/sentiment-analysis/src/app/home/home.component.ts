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
  rawData!: any[];

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

    let response = {
      "data": [
        {
          "interpretation": "Positive",
          "score": 0.7922,
          "tweet": "@Saber_Of_Truth If you cheat in a game you effecting others experience, if you cheat in your programming job you got da same application made! Doesn’t negatively impact anyone you just looked it up on da job"
        },
        {
          "interpretation": "Negative",
          "score": -0.7424,
          "tweet": "RT @JobPreference: NEED a JOB?\nSign up now https://t.co/rMErDJMv4h\nFREE. NO MIDDLEMEN\n#Job #WomenWhoCode #Programming #Coding #gamers #indi…"
        },
        {
          "interpretation": "Neutral",
          "score": 0.2732,
          "tweet": "RT @argburbot: We are sorry to interrupt your regularly scheduled programming for a spot of boring ARG work"
        },
        {
          "interpretation": "Negative",
          "score": -0.6124,
          "tweet": "@LOUD_besos yeah. I've recently started Java and Kotlin. I regret taking so long to muster the courage of learning programming"
        },
        {
          "interpretation": "Somewhat Positive",
          "score": 0.3818,
          "tweet": "THIS WEEK @ DCC:\n\nWE’VE GOT @ianbagg FRI &amp; SAT!!! Get your tix NOW👇\nhttps://t.co/Hd45YPbzWn\n\nCheck out all of our weekly programming at \nhttps://t.co/J4vf8W03ud\n\nWant to take a class?? We’ve got the best! Register at \nhttps://t.co/m8yB0yFixD\n\n#dallascomedyclub #funnyhappenshere https://t.co/lXr0347srH"
        },
        {
          "interpretation": "Positive",
          "score": 0.6369,
          "tweet": "RT @Verinite: #Usecases of #ArtificialIntelligence in #banking\nhttps://t.co/NGM1sVUWrS \n\nv/ @danieluriol\n\n#AI #MachineLearning #ML #DeepLea…"
        },
        {
          "interpretation": "Somewhat Positive",
          "score": 0.4019,
          "tweet": "RT @Sheraj99: Best of SQLMap Cheatsheet #MachineLearning #DataScience #BigData #Analytics #AI #IIoT #PyTorch #Python #RStats #TensorFlow #J…"
        },
        {
          "interpretation": "Somewhat Positive",
          "score": 0.5106,
          "tweet": "RT @jordanbelford43: if you want to start online business and build website than click here :)\nhttps://t.co/MeeAleFqHZ\n\n#minecraftmanhunt #…"
        },
        {
          "interpretation": "Neutral",
          "score": 0,
          "tweet": "RT @TPNChicago: Today is the last day to donate to TPN to support programming for #Tigray communities in North America. For every $25 donat…"
        },
        {
          "interpretation": "Somewhat Positive",
          "score": 0.541,
          "tweet": "@MajorsWork @BabaSnaker @SilebaD @saviomartin7 I don't think that's enough to be an accurate definition for \"programming language\". For one, both markup and programming languages are data structures. And XSLT is written in XML, so clearly one CAN use XML to \"manipulate structures\"."
        }
      ],
      "execution_time": 1.7748019695281982,
      "success": 1
    }

    this.rawData = response['data'];
    this.averageSentiment

    this.numberOfTweets = this.rawData.length;

    this.averageSentiment = this.getAverageSentimentScoreOfTweets(this.rawData, this.numberOfTweets);
    this.averageSentimentInterpretation = this.getAverageSentimentScoreInterpretation(parseFloat(this.averageSentiment));

  }

  public analyzeTweets(){

    if(this.hashtagSentimentForm.valid){

      const formValues = this.hashtagSentimentForm.value;
      this.hashTagSearchValue = formValues.hashtag;
      let tweetsNum = formValues.tweetsNum;



      let uid: string | null = this.getUid();
      if(uid && this.hashTagSearchValue && tweetsNum){
        this.api.getSentimentAnalysis(uid, this.hashTagSearchValue, tweetsNum).subscribe((response: any) => {

          console.log(uid);
          console.log(this.hashTagSearchValue);
          console.log(tweetsNum);

          console.log(response);

          if(response['success'] == 1){

            this.rawData = response['data'];;

            this.numberOfTweets = this.rawData.length;

            this.averageSentiment = this.getAverageSentimentScoreOfTweets(this.rawData, this.numberOfTweets);
            this.averageSentimentInterpretation = this.getAverageSentimentScoreInterpretation(parseFloat(this.averageSentiment));

            this.dataLoaded = true;
          }
          else {
            console.log(response['error']);
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
