import { Component, inject, OnInit } from "@angular/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { XpTitleBar, XpWindow } from "../../components";
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
export class Debug implements OnInit {
  protected windowService = inject(WindowService);

  ngOnInit(): void {
    // TODO: Figure out a good way to apply this to all windows
    getCurrentWindow().show().catch(console.warn);
  }
}
