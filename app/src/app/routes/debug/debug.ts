import { Component } from "@angular/core";
import { XpTitleBar, XpWindow } from "../../components";
import { WindowBuilder } from "../../util";
import { RootBase } from "../root/root";

@Component({
  selector: "aim-debug",
  imports: [XpWindow, XpTitleBar],
  templateUrl: "./debug.html",
  styleUrl: "./debug.css",
  host: {
    class: "contents",
  },
})
export class Debug extends RootBase {
  openChatWindow() {
    WindowBuilder.build("chatWindow", "/chat", {
      width: 700,
      height: 500,
    }).catch(console.warn);
  }

  openRegistration() {
    WindowBuilder.build("getScreenName", "/get-screen-name", {
      width: 220,
      height: 400,
    });
  }
}
