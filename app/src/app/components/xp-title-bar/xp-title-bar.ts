import { Component, inject, input, output } from "@angular/core";
import { WindowService } from "../../services/window/window-service";

@Component({
  selector: "aim-xp-title-bar",
  imports: [],
  templateUrl: "./xp-title-bar.html",
  styleUrl: "./xp-title-bar.css",
})
export class XpTitleBar {
  windowTitle = input<string>("AIM");
  minimize = input<boolean>(true);
  maximize = input<boolean>(false);
  help = input<boolean>(false);

  close = output();

  protected windowService = inject(WindowService);

  showHelp() {
    console.log("Show help TODO");
  }

  protected onClose() {
    this.close.emit();
  }
}
