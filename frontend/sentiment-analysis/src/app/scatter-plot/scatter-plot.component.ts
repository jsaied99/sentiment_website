import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements AfterViewInit {


  @ViewChild('scatterCanvas') public scatterCanvas!: ElementRef;

  @Input() data!: any[] | undefined;
  @Input() hashtag!: string | null;

  scatterChart: any;

  scatterPlotBubbleRadius: number = 5;
  scatterPlotBubbleColor: string = 'rgb(199,0,252)';

  constructor() {
  }

  ngAfterViewInit(): void {
    this.addScatterChart();
  }

  getPlotPoints(){

    if(this.data){
      let plotPoints = [];
      for(let i = 0; i < this.data.length; i++){
        plotPoints.push({x: i+1, y: this.data[i]['score'], r: this.scatterPlotBubbleRadius});
      }
      return plotPoints;

    }
    else {
      return []
    }
  }

  addScatterChart(): void {

    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: this.getPlotPoints(),
        backgroundColor: this.scatterPlotBubbleColor
      }],
    };

    this.scatterChart = new Chart(this.scatterCanvas.nativeElement, {
      type: 'bubble',
      data: data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 1
            }
          },
          y: {
            max: 1.1,
            min: -1.1,
            ticks: {
              stepSize: 0.05
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Sentiment Scores for ' + this.hashtag + ' Tweets'
          }
        }
      }
    });
  }
}



