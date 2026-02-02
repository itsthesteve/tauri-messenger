import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { signalState } from "@ngrx/signals";
import { XpTitleBar } from "../../components/xp-title-bar/xp-title-bar";
import { XpWindow } from "../../components/xp-window/xp-window";
import { SquareHero } from "../../components/square-hero/square-hero";
import { XpStatusBar } from "../../components/xp-status-bar/xp-status-bar";

type FormError = {
  key: string;
  reason: string;
};

type SignInState = {
  profiles: string[];
  selectedProfile: string | null;
  errors: FormError[];
};

@Component({
  selector: "aim-sign-in",
  imports: [XpWindow, XpTitleBar, XpStatusBar, ReactiveFormsModule, SquareHero],
  templateUrl: "./sign-in.html",
  styleUrl: "./sign-in.css",
  host: {
    class: "contents",
  },
})
export class SignIn {
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
}
