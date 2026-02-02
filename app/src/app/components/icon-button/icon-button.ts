import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from "@angular/core";
import { outputFromObservable } from "@angular/core/rxjs-interop";
import { fromEvent, skipWhile } from "rxjs";

@Component({
  selector: "aim-icon-button",
  imports: [],
  templateUrl: "./icon-button.html",
  styleUrl: "./icon-button.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.disabled]": "disabled()",
  },
})
export class AimIconButton {
  private ref = inject(ElementRef);

  disabled = input<boolean>(false);

  actionClick = outputFromObservable(
    fromEvent(this.ref.nativeElement, "click").pipe(
      skipWhile(() => this.disabled()),
    ),
  );
}
