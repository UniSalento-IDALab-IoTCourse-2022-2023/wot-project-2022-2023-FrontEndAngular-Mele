import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Runs } from 'src/app/interfaces/runs';
import { StoricoService } from 'src/app/services/storico/storico.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  title = 'chartDemo';
  id:string = "";
  storico:Runs = {} as Runs;
  intervalId: any;
  visibility = {
    temperature: 0,
    pressure: 0,
    co2:0,
    humidity:0,
    horizontal:0,
    light:0
  }
  drawed = {
    temperature: 0,
    pressure: 0,
    co2:0,
    humidity:0,
    horizontal:0,
    light:0
  }

  temperatureChart:Chart = {} as Chart
  pressureChart:Chart = {} as Chart
  co2Chart:Chart = {} as Chart
  humidityChart:Chart = {} as Chart
  horizontalChart:Chart = {} as Chart
  darknessChart:Chart = {} as Chart

  constructor(private route: ActivatedRoute, public storicoService:StoricoService, private router: Router) {

    this.id = this.route.snapshot.paramMap.get('id')!;
    this.storico = this.storicoService.listaStorico.find(obj => obj.id === this.id)!;
    console.log(this.storico)
    this.setVisibility()
    this.loadChart()
    console.log(this.visibility)
  }

  ngOnInit(): void {
    if(this.storico.endClock == null || this.storico.endClock == ""){
      this.intervalId = setInterval(() => {
        this.storicoService.updateDataset()
        this.storico = this.storicoService.listaStorico.find(obj => obj.id === this.id)!;
        this.setVisibility()
        this.loadChart()
        console.log(this.storico)
        console.log(this.visibility)
      }, 1000);
    }
  }

  //Setta la visibilità dei chart solo se questi hanno dei valori
  setVisibility() {
    this.visibility.temperature = this.storico.anomalies.find(obj => obj.type == "temperature")!.value.length
    this.visibility.pressure = this.storico.anomalies.find(obj => obj.type == "pressure")!.value.length
    this.visibility.co2 = this.storico.anomalies.find(obj => obj.type == "co2")!.value.length
    this.visibility.humidity = this.storico.anomalies.find(obj => obj.type == "humidity")!.value.length
    this.visibility.horizontal = this.storico.anomalies.find(obj => obj.type == "horizontal")!.value.length
    this.visibility.light = this.storico.anomalies.find(obj => obj.type == "light")!.value.length
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  loadChart(): void {
    setTimeout(() => {
    if (this.visibility.temperature !=  0) {
        if (this.drawed.temperature == 0){
          this.temperatureChart = new Chart("temperatureChart", {
            type: 'line',
            data: {
              labels:  [],
              datasets: [
                {
                  type: "scatter",
                  label: 'Temperature',
                  data: [],
                  backgroundColor: "#ff7f50",
                  pointRadius: 6,
                },
                {
                  label: 'Max Temperature',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
                {
                  label: 'Min Temperature',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ],
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 200,
                    stepSize: 20,
                    maxTicksLimit: 10
                  }
                }]
              },
            }
          });
          this.drawed.temperature = 1;
        }
        console.log(this.temperatureChart.data)
        this.temperatureChart.data.labels = this.storico.anomalies.find(obj => obj.type == "temperature")?.time!;
        if (this.temperatureChart.data.datasets) {
          this.temperatureChart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "temperature")?.value.map(str => parseInt(str))!;
          this.temperatureChart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "temperature")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "temperature")?.maxValue);
          this.temperatureChart.data.datasets[2].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "temperature")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "temperature")?.minValue);
          this.temperatureChart.update();
        }
    }

    if(this.visibility.pressure !=  0){
        if (this.drawed.pressure == 0){
          this.pressureChart = new Chart("pressureChart", {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  type: "scatter",
                  label: 'Pressure',
                  data: [],
                  pointRadius: 6,
                  backgroundColor:"#0000ff",
                },
                {
                  label: 'Max Pressure',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
                {
                  label: 'Min Pressure',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 2000,
                    stepSize: 200,
                    maxTicksLimit: 10
                  }
                }]
              }
            }
          });
          this.drawed.pressure = 1
        }
        console.log(this.pressureChart.data)
        this.pressureChart.data.labels = this.storico.anomalies.find(obj => obj.type == "pressure")?.time!;
        if (this.pressureChart.data.datasets){
          this.pressureChart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "pressure")?.value.map(str => parseInt(str))!;
          this.pressureChart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "pressure")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "pressure")?.maxValue);
          this.pressureChart.data.datasets[2].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "pressure")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "pressure")?.minValue);
          this.pressureChart.update();
        }

    }

    if(this.visibility.co2 != 0){
        if (this.drawed.co2 == 0){
          this.co2Chart = new Chart("co2Chart", {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  type: "scatter",
                  label: 'CO2',
                  data: [],
                  pointRadius: 6,
                  backgroundColor:"#008000",
                },
                {
                  label: 'Max CO2',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
                {
                  label: 'Min CO2',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 2000,
                    stepSize: 200,
                    maxTicksLimit: 10
                  }
                }]
              }
            }
          });
          this.drawed.co2 = 1
        }
        this.co2Chart.data.labels = this.storico.anomalies.find(obj => obj.type == "co2")?.time!;
        if (this.co2Chart.data.datasets){
          this.co2Chart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "co2")?.value.map(str => parseInt(str))!;
          this.co2Chart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "co2")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "co2")?.maxValue);
          this.co2Chart.data.datasets[2].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "co2")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "co2")?.minValue);
          this.co2Chart.update();
        }

    }

    if(this.visibility.humidity !=  0){
        if (this.drawed.humidity == 0){
          this.humidityChart = new Chart("humidityChart", {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  type: "scatter",
                  label: 'Humidity',
                  data:  [],
                  pointRadius: 6,
                  backgroundColor:"#000000",
                },
                {
                  label: 'Max Humidity',
                  data:  [],
                  borderColor: "#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
                {
                  label: 'Min Humidity',
                  data: [],
                  borderColor: "#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 200,
                    stepSize: 30,
                    maxTicksLimit: 10
                  }
                }]
              },
              elements: {
                point: {
                  radius: 4, // Imposta il raggio dei punti
                  borderWidth: 0, // Imposta lo spessore del bordo dei punti a zero
                  //backgroundColor: 'rgba(0, 0, 0, 1)' // Imposta il colore dei punti
                },
                line: {
                  borderWidth: 0 // Imposta lo spessore delle linee a zero
                }
              }
            }
          });
          this.drawed.humidity = 1
        }
        console.log(this.humidityChart.data)
        this.humidityChart.data.labels = this.storico.anomalies.find(obj => obj.type == "humidity")?.time!;
        if (this.humidityChart.data.datasets){
          this.humidityChart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "humidity")?.value.map(str => parseInt(str))!;
          this.humidityChart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "humidity")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "humidity")?.maxValue);
          this.humidityChart.data.datasets[2].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "humidity")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "humidity")?.minValue);
          this.humidityChart.update();
        }

    }

    if(this.visibility.horizontal !=  0){
        if (this.drawed.horizontal == 0){
          this.horizontalChart = new Chart("horizontalChart", {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  type: "scatter",
                  label: 'Horizontal',
                  data: [],
                  pointRadius: 6,
                  backgroundColor:"#ff0000",
                },
                {
                  type: "line",
                  label: 'Horizontal Value',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: -3,
                    max: 3,
                    stepSize: 1,
                    maxTicksLimit: 10
                  }
                }],
              },

            }
          });
          this.drawed.horizontal = 1
        }
        console.log(this.horizontalChart.data)
        this.horizontalChart.data.labels = this.storico.anomalies.find(obj => obj.type == "horizontal")?.time!;
        if (this.horizontalChart.data.datasets){
          this.horizontalChart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "horizontal")?.value.map(str => parseInt(str))!;
          this.horizontalChart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "horizontal")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "horizontal")?.maxValue);
          this.horizontalChart.update();
        }

    }

    if(this.visibility.light !=  0){
        if (this.drawed.light == 0){
          this.darknessChart = new Chart("darknessChart", {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  type: "scatter",
                  label: 'Light',
                  data: [],
                  pointRadius: 6,
                  backgroundColor:"#800000",
                },
                {
                  type: "line",
                  label: 'Light Value',
                  data: [],
                  borderColor: "	#7fff00",
                  borderWidth: 1,
                  backgroundColor: 'transparent'
                },
              ]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'category',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: -3,
                    max: 3,
                    stepSize: 1,
                    maxTicksLimit: 10
                  }
                }],
              },

            }
          });
          this.drawed.light = 1
        }
        console.log(this.darknessChart.data)
        this.darknessChart.data.labels = this.storico.anomalies.find(obj => obj.type == "light")?.time!;
        if (this.darknessChart.data.datasets){
          this.darknessChart.data.datasets[0].data = this.storico.anomalies.find(obj => obj.type == "light")?.value.map(str => parseInt(str))!;
          this.darknessChart.data.datasets[1].data = Array.from({length: this.storico.anomalies.find(obj => obj.type == "light")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "light")?.maxValue);
          this.darknessChart.update();
        }

    }
    });
  }


  
}
