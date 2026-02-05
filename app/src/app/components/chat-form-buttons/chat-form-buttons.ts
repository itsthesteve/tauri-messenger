import { Component, input } from "@angular/core";
import { AimIconButton } from "../icon-button/icon-button";

@Component({
  selector: "aim-chat-form-buttons",
  imports: [AimIconButton],
  templateUrl: "./chat-form-buttons.html",
  styleUrl: "./chat-form-buttons.css",
})
export class ChatFormButtons {
  disabled = input<boolean>(true);
}
