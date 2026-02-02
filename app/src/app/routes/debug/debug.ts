import { Component, inject } from "@angular/core";
import { XpWindow, XpTitleBar } from "../../components";
import { WindowService } from "../../services/window/window-service";

@Component({
  selector: "aim-debug",
  imports: [XpWindow, XpTitleBar],
  templateUrl: "./debug.html",
  styleUrl: "./debug.css",
  host: {
    class: "contents",
  },
})
export class Debug {
  protected windowService = inject(WindowService);
}
