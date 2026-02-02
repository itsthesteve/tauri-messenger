import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WindowService {
  // TODO: Stubbed to prevent errors in consumer components
  public viewState = "";

  minimize() {}
  maximize() {}
  restore() {}
}
