import { Anomalies } from "./anomalies";

export interface Runs {
  "id":string,
  "date": string,
  "startClock": string,
  "endClock": string,
  "description": string,
  anomalies: Anomalies[]
}
