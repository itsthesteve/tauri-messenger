import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { AimIconButton } from "../icon-button/icon-button";

@Component({
  selector: "aim-chat-footer",
  imports: [AimIconButton],
  templateUrl: "./chat-footer.html",
  styleUrl: "./chat-footer.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFooter {
  disabled = input<boolean>(true);
}
