import { AsyncPipe } from "@angular/common";
import { Component, inject, input, output } from "@angular/core";
import { WindowService } from "../../services/window/window-service";

@Component({
  selector: "aim-xp-title-bar",
  imports: [AsyncPipe],
  templateUrl: "./xp-title-bar.html",
  styleUrl: "./xp-title-bar.css",
})
export class XpTitleBar {
  windowTitle = input<string>("AIM");
  minimize = input<boolean>(true);
  maximize = input<boolean>(false);
  showHelp = input<boolean>(false);

  close = output();
  help = output();

  protected windowService = inject(WindowService);

  protected onClose() {
    this.close.emit();
  }
}
