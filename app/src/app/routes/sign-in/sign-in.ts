import { AfterViewInit, Component, isDevMode } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { signalState } from "@ngrx/signals";
import {
  AimIconButton,
  SquareHero,
  XpStatusBar,
  XpTitleBar,
  XpWindow,
} from "../../components";
import { SignInState } from "./types";
import { WindowBuilder } from "../../window-builder";

@Component({
  selector: "aim-sign-in",
  imports: [
    XpWindow,
    XpTitleBar,
    XpStatusBar,
    AimIconButton,
    SquareHero,
    ReactiveFormsModule,
  ],
  templateUrl: "./sign-in.html",
  styleUrl: "./sign-in.css",
  host: {
    class: "contents",
  },
})
export class SignIn implements AfterViewInit {
  private chatWindow = new WindowBuilder("debugViewer", "/debug", {
    width: 500,
    height: 300,
  });

  signInState = signalState<SignInState>({
    profiles: [],
    selectedProfile: null,
    errors: [],
  });

  form = new FormGroup({
    screenName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    savePassword: new FormControl(true),
    autoLogin: new FormControl(true),
    useDialup: new FormControl(true),
  });

  ngAfterViewInit() {}

  showDebug() {
    if (!isDevMode())
      return console.warn("Cannot open debug outside of dev mode");

    this.chatWindow
      .build()
      .then((window) => {
        window.show();
      })
      .catch(console.warn);
  }
}
