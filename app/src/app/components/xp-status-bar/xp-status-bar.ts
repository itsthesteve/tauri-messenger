import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "aim-status-bar",
  imports: [],
  templateUrl: "./xp-status-bar.html",
  styleUrl: "./xp-status-bar.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XpStatusBar {
  hideTopBorder = input<boolean>(true);
}
