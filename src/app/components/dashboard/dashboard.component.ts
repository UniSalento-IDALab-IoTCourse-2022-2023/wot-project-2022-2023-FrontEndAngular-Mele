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
      }, 3000);
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

    if (this.visibility.temperature > 0) {
      setTimeout(() => {
        const temperatureChart = new Chart("temperatureChart", {
          type: 'line',
          data: {
            labels: this.storico.anomalies.find(obj => obj.type == "temperature")?.time!,
            datasets: [
              {
                type: "scatter",
                label: 'Temperature',
                data: this.storico.anomalies.find(obj => obj.type == "temperature")?.value.map(str => parseInt(str))!,
                backgroundColor: "#ff7f50",
                pointRadius: 6,
              },
              {
                label: 'Max Temperature',
                data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "temperature")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "temperature")?.maxValue),
                borderColor: "	#7fff00",
                borderWidth: 1,
                backgroundColor: 'transparent'
              },
              {
                label: 'Min Temperature',
                data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "temperature")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "temperature")?.minValue),
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
      });
    }


    if(this.visibility.pressure > 0){
      setTimeout(() => {
        const pressureChart = new Chart("pressureChart", {
          type: 'line',
          data: {
              labels: this.storico.anomalies.find(obj => obj.type == "pressure")?.time!,
              datasets: [
              {
                type: "scatter",
                label: 'Pressure',
                data: this.storico.anomalies.find(obj => obj.type == "pressure")?.value.map(str => parseInt(str))!,
                pointRadius: 6,
                backgroundColor:"#0000ff",
            },
            {
              label: 'Max Pressure',
              data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "pressure")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "pressure")?.maxValue),
              borderColor: "	#7fff00",
              borderWidth: 1,
              backgroundColor: 'transparent'
            },
            {
              label: 'Min Pressure',
              data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "pressure")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "pressure")?.minValue),
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
      });
    }

    if(this.visibility.co2 > 0){
      setTimeout(() => {
        const co2Chart = new Chart("co2Chart", {
        type: 'line',
        data: {
            labels: this.storico.anomalies.find(obj => obj.type == "co2")?.time!,
            datasets: [
            {
              type: "scatter",
              label: 'CO2',
              data: this.storico.anomalies.find(obj => obj.type == "co2")?.value.map(str => parseInt(str))!,
              pointRadius: 6,
              backgroundColor:"#008000",
          },
          {
            label: 'Max CO2',
            data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "co2")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "co2")?.maxValue),
            borderColor: "	#7fff00",
            borderWidth: 1,
            backgroundColor: 'transparent'
          },
          {
            label: 'Min CO2',
            data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "co2")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "co2")?.minValue),
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
      })
    }

    if(this.visibility.humidity > 0){
      setTimeout(() => {
        const humidityChart = new Chart("humidityChart", {
          type: 'line',
          data: {
              labels: this.storico.anomalies.find(obj => obj.type == "humidity")?.time!,
              datasets: [
              {
                type: "scatter",
                label: 'Humidity',
                data: this.storico.anomalies.find(obj => obj.type == "humidity")?.value.map(str => parseInt(str))!,
                pointRadius: 6,
                backgroundColor:"#000000",
            },
            {
              label: 'Max Humidity',
              data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "humidity")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "humidity")?.maxValue),
              borderColor: "#7fff00",
              borderWidth: 1,
              backgroundColor: 'transparent'
            },
            {
              label: 'Min Humidity',
              data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "humidity")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "humidity")?.minValue),
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
      })
    }

    if(this.visibility.horizontal > 0){
      setTimeout(() => {
        const horizontalChart = new Chart("horizontalChart", {
          type: 'line',
          data: {
              labels: this.storico.anomalies.find(obj => obj.type == "horizontal")?.time!,
              datasets: [
              {
                type: "scatter",
                label: 'Horizontal',
                data: this.storico.anomalies.find(obj => obj.type == "horizontal")?.value.map(str => parseInt(str))!,
                pointRadius: 6,
                backgroundColor:"#ff0000",
              },
              {
                type: "line",
                label: 'Horizontal Value',
                data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "horizontal")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "horizontal")?.maxValue),
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
      })
    }

    if(this.visibility.light >0){
      setTimeout(() => {
        const darknessChart = new Chart("darknessChart", {
        type: 'line',
        data: {
            labels: this.storico.anomalies.find(obj => obj.type == "light")?.time!,
            datasets: [
            {
              type: "scatter",
              label: 'Light',
              data: this.storico.anomalies.find(obj => obj.type == "light")?.value.map(str => parseInt(str))!,
              pointRadius: 6,
              backgroundColor:"#800000",
          },
          {
            type: "line",
            label: 'Light Value',
            data: Array.from({length: this.storico.anomalies.find(obj => obj.type == "light")?.time.length!}, () => this.storico.anomalies.find(obj => obj.type == "light")?.maxValue),
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
      });
    }

  }


  
}
