/**
 * @fileoverview
 * The root component for routes that are rendered in a new window.
 * When new windows are created, they are created with the tauri "visible"
 * property set to false.
 *
 * When the OnInit lifecyle is hit and everything is more or less ready to
 * show, call the "show()" method for it's current window.
 */
import { Component, inject, OnInit } from "@angular/core";
import { WindowService } from "../../services/window/window-service";

@Component({
  selector: "aim-base",
  imports: [],
  template: "<ng-content></ng-content>",
  styles: ``,
})
export class RootBase implements OnInit {
  private windowService = inject(WindowService);

  ngOnInit(): void {
    this.windowService.show().catch(console.warn);
  }

  protected closeWindow() {
    this.windowService.close().catch(console.warn);
  }
}
