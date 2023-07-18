import { Injectable, OnInit } from '@angular/core';
import { Anomalies } from 'src/app/interfaces/anomalies';
import { Runs } from 'src/app/interfaces/runs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoricoService{

  listaStorico:Runs[] = []
  storico:Runs = {} as Runs
  listaAnomalie:Anomalies[] = []
  anomalia:Anomalies = {} as Anomalies;

  baseUrl:string = "http://3.231.200.225:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http:HttpClient) {

    /*
    //this.listaStorico = this.getRoutes(); //Metodo ufficiale
    this.getRoutes().subscribe(
      data => {
        this.listaStorico = data;
        console.log(this.listaStorico)
      },
      error => {
        console.log("Errore durante la richiesta:", error);
      }
    );
    */




    //--------------------MOCK 1-------------------------------

    this.anomalia.type = "temperature"
    this.anomalia.time = ["14:40","14:45","15:00"]
    this.anomalia.value =  ["110","110","133"]
    this.anomalia.maxValue = 20;
    this.anomalia.minValue = 10;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "humidity"
    this.anomalia.time = ["12:40","13:40"]
    this.anomalia.value =  ["133","33"]
    this.anomalia.maxValue = 25;
    this.anomalia.minValue = 20;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "pressure"
    this.anomalia.time = []
    this.anomalia.value =  []
    this.anomalia.maxValue = 900;
    this.anomalia.minValue = 800;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "co2"
    this.anomalia.time = ["12:20","12:30"]
    this.anomalia.value =  ["500","600"]
    this.anomalia.maxValue = 400;
    this.anomalia.minValue = 200;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "light"
    this.anomalia.time = ["12:25"]
    this.anomalia.value =  ["1"]
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "horizontal"
    this.anomalia.time = []
    this.anomalia.value =  []
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.storico.description = "Delivery of goods to the customer 1"
    this.storico.date =  "11-07-2023"
    this.storico.startClock = "12:20:37"
    this.storico.endClock = "16:28:39"
    this.storico.id = "64ad2cf5f56b987cd53f139a"
    this.storico.anomalies = this.listaAnomalie
    this.listaStorico.push(this.storico);
    this.listaAnomalie = [];
    this.storico = {} as Runs;

    //----------------------MOCK 2-----------------------------

    this.anomalia.type = "temperature"
    this.anomalia.time = ["13:40","13:45","13:00","14:40","14:45","14:50"]
    this.anomalia.value =  ["120","100","80","120","100","80"]
    this.anomalia.maxValue = 20;
    this.anomalia.minValue = 10;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "humidity"
    this.anomalia.time = ["13:40","13:45","13:50","13:55","13:40","13:45"]
    this.anomalia.value =  ["123","33","123","43","113","55"]
    this.anomalia.maxValue = 25;
    this.anomalia.minValue = 20;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "pressure"
    this.anomalia.time = ["13:35","13:45","14:35"]
    this.anomalia.value =  ["1000","1200","1400"]
    this.anomalia.maxValue = 900;
    this.anomalia.minValue = 800;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "co2"
    this.anomalia.time = ["12:20","12:30","13:20","13:30"]
    this.anomalia.value =  ["700","800","900","1000"]
    this.anomalia.maxValue = 400;
    this.anomalia.minValue = 200;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "light"
    this.anomalia.time = ["13:30","13:40","14:30"]
    this.anomalia.value =  ["1","1","1"]
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "horizontal"
    this.anomalia.time = ["13:20","14:20","14:30"]
    this.anomalia.value =  ["1","1","1"]
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.storico.description = "Delivery of goods to the customer 2"
    this.storico.date =  "12-07-2023"
    this.storico.startClock = "10:20:37"
    this.storico.endClock = "16:00:39"
    this.storico.id = "64ad2cf5f56b987cd53f139b"
    this.storico.anomalies = this.listaAnomalie
    this.listaStorico.push(this.storico);
    this.listaAnomalie = [];
    this.storico = {} as Runs;

    //----------------------MOCK 3-----------------------------

    this.anomalia.type = "temperature"
    this.anomalia.time = ["10:40","13:45","13:55","13:59","16:00"]
    this.anomalia.value =  ["120","100","55","25","1"]
    this.anomalia.maxValue = 20;
    this.anomalia.minValue = 10;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "humidity"
    this.anomalia.time = ["13:40","13:45"]
    this.anomalia.value =  ["123","33"]
    this.anomalia.maxValue = 25;
    this.anomalia.minValue = 20;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "pressure"
    this.anomalia.time = ["13:35"]
    this.anomalia.value =  ["1000"]
    this.anomalia.maxValue = 900;
    this.anomalia.minValue = 800;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "co2"
    this.anomalia.time = []
    this.anomalia.value =  []
    this.anomalia.maxValue = 400;
    this.anomalia.minValue = 200;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "light"
    this.anomalia.time = ["13:30"]
    this.anomalia.value =  ["1"]
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.anomalia.type = "horizontal"
    this.anomalia.time = ["13:20","13:25","13:50"]
    this.anomalia.value =  ["1","1","1"]
    this.anomalia.maxValue = 0;
    this.anomalia.minValue = 0;
    this.listaAnomalie.push(this.anomalia)
    this.anomalia = {} as Anomalies

    this.storico.description = "Delivery of goods to the customer 2"
    this.storico.date =  "12-07-2023"
    this.storico.startClock = "10:20:37"
    this.storico.endClock = ""
    this.storico.id = "64ad2cf5f56b987cd53f139c"
    this.storico.anomalies = this.listaAnomalie
    this.listaStorico.push(this.storico);
    this.listaAnomalie = [];
    this.storico = {} as Runs;

    //------------------------------------------------------


  }

   test:boolean = true;
   updateDataset(){

    /*
    //METODO UFFICIALE
    this.getRoutes().subscribe(
      data => {
        this.listaStorico = data;
      },
      error => {
        console.log("Errore durante la richiesta:", error);
      }
    );
    */


    if(this.test){
      this.listaStorico = []
      console.log("Dataset1")
      //--------------------MOCK 1-------------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["14:40","14:45","15:00","15:10","15:30"]
      this.anomalia.value =  ["110","110","133","155","167"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = ["12:40","13:40","13:40"]
      this.anomalia.value =  ["133","33","10"]
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = ["14:20","14.30"]
      this.anomalia.value =  ["1000","1300"]
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = ["12:20","12:30"]
      this.anomalia.value =  ["800","600"]
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["12:25","13:00"]
      this.anomalia.value =  ["1","1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = ["13:00"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 1"
      this.storico.date =  "11-07-2023"
      this.storico.startClock = "12:20:37"
      this.storico.endClock = "16:28:39"
      this.storico.id = "64ad2cf5f56b987cd53f139a"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //----------------------MOCK 2-----------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["13:40","13:45","13:00"]
      this.anomalia.value =  ["120","100","80"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = ["13:40","13:45"]
      this.anomalia.value =  ["123","33"]
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = ["13:35"]
      this.anomalia.value =  ["1000"]
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = ["12:20","12:30"]
      this.anomalia.value =  ["700","800"]
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["13:30"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = ["13:20"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 2"
      this.storico.date =  "12-07-2023"
      this.storico.startClock = "10:20:37"
      this.storico.endClock = "16:00:39"
      this.storico.id = "64ad2cf5f56b987cd53f139b"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //----------------------MOCK 3-----------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["10:40","13:45","13:55","13:59","16:00"]
      this.anomalia.value =  ["120","100","55","25","1"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = []
      this.anomalia.value =  []
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = ["13:35"]
      this.anomalia.value =  ["1000"]
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = []
      this.anomalia.value =  []
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["13:30"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = ["13:20","13:25","13:50"]
      this.anomalia.value =  ["1","1","1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 2"
      this.storico.date =  "12-07-2023"
      this.storico.startClock = "10:20:37"
      this.storico.endClock = ""
      this.storico.id = "64ad2cf5f56b987cd53f139c"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //------------------------------------------------------
      this.test = !this.test
    }else {
      console.log("Dataset2")
      this.listaStorico = []
      //--------------------MOCK 1-------------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["14:40","14:45","15:00"]
      this.anomalia.value =  ["110","110","133"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = ["12:40","13:40"]
      this.anomalia.value =  ["133","33"]
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = []
      this.anomalia.value =  []
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = ["12:20","12:30"]
      this.anomalia.value =  ["500","600"]
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["12:25"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = []
      this.anomalia.value =  []
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 1"
      this.storico.date =  "11-07-2023"
      this.storico.startClock = "12:20:37"
      this.storico.endClock = "16:28:39"
      this.storico.id = "64ad2cf5f56b987cd53f139a"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //----------------------MOCK 2-----------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["13:40","13:45","13:00"]
      this.anomalia.value =  ["120","100","80"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = ["13:40","13:45"]
      this.anomalia.value =  ["123","33"]
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = ["13:35"]
      this.anomalia.value =  ["1000"]
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = ["12:20","12:30"]
      this.anomalia.value =  ["700","800"]
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["13:30"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = ["13:20"]
      this.anomalia.value =  ["1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 2"
      this.storico.date =  "12-07-2023"
      this.storico.startClock = "10:20:37"
      this.storico.endClock = "16:00:39"
      this.storico.id = "64ad2cf5f56b987cd53f139b"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //----------------------MOCK 3-----------------------------

      this.anomalia.type = "temperature"
      this.anomalia.time = ["13:55","13:59","16:00"]
      this.anomalia.value =  ["55","25","1"]
      this.anomalia.maxValue = 20;
      this.anomalia.minValue = 10;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "humidity"
      this.anomalia.time = ["10:30"]
      this.anomalia.value =  ["30"]
      this.anomalia.maxValue = 25;
      this.anomalia.minValue = 20;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "pressure"
      this.anomalia.time = ["13:35"]
      this.anomalia.value =  ["1000"]
      this.anomalia.maxValue = 900;
      this.anomalia.minValue = 800;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "co2"
      this.anomalia.time = ["10:40"]
      this.anomalia.value =  ["500"]
      this.anomalia.maxValue = 400;
      this.anomalia.minValue = 200;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "light"
      this.anomalia.time = ["13:30","13:40"]
      this.anomalia.value =  ["1","1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.anomalia.type = "horizontal"
      this.anomalia.time = ["13:20","13:25","13:50"]
      this.anomalia.value =  ["1","1","1"]
      this.anomalia.maxValue = 0;
      this.anomalia.minValue = 0;
      this.listaAnomalie.push(this.anomalia)
      this.anomalia = {} as Anomalies

      this.storico.description = "Delivery of goods to the customer 2"
      this.storico.date =  "12-07-2023"
      this.storico.startClock = "10:20:37"
      this.storico.endClock = ""
      this.storico.id = "64ad2cf5f56b987cd53f139c"
      this.storico.anomalies = this.listaAnomalie
      this.listaStorico.push(this.storico);
      this.listaAnomalie = [];
      this.storico = {} as Runs;

      //------------------------------------------------------
      this.test = !this.test
    }

  }

  getRoutes(): Observable<Runs[]> {
    return this.http.get<Runs[]>(this.baseUrl + "/api/getRoutes", this.httpOptions);
  }

}
