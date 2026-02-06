import { Component } from "@angular/core";
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
import { WindowBuilder } from "../../util";
import { RootBase } from "../root/root";
import { SignInState } from "./types";
import { RouterLink } from "@angular/router";

@Component({
  selector: "aim-sign-in",
  imports: [
    RouterLink,
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
export class SignIn extends RootBase {
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

  showDebug() {
    // TODO: Figure a way to do this without angular isDevMode, as a debug build is helpful
    // if (!isDevMode())
    //   return console.warn("Cannot open debug outside of dev mode");

    WindowBuilder.build("debugViewer", "/debug", {
      width: 350,
      height: 200,
      x: 0,
      y: 0,
    }).catch(console.warn);
  }
}
