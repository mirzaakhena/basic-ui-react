import { makeAutoObservable } from "mobx";
import { HTTPData } from "../model/http_data";

export default class ApplicationState {
  //

  httpData: HTTPData | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export const applicationState = new ApplicationState();
