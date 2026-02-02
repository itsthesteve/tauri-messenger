import { Component, inject } from "@angular/core";
import { WindowService } from "../../services/window/window-service";

@Component({
  selector: "aim-xp-window",
  imports: [],
  templateUrl: "./xp-window.html",
  host: {
    class: "window grid min-h-full",
  },
})
export class XpWindow {
  protected windowService = inject(WindowService);
}
