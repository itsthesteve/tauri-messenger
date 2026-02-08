import { KeyValuePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { flattenError } from "zod";
import {
  SquareHero,
  XpStatusBar,
  XpTitleBar,
  XpWindow,
} from "../../components";
import {
  PASS_MAX_LEN,
  PASS_MIN_LEN,
  SCREEN_NAME_MAX_LEN,
  SCREEN_NAME_MIN_LEN,
  ScreenNameSchema,
} from "../../schemas/screen-name";
import { InvokeService } from "../../services/invoke-service";
import { RootBase } from "../root/root";

@Component({
  selector: "aim-get-screen-name",
  imports: [
    XpStatusBar,
    XpWindow,
    XpTitleBar,
    KeyValuePipe,
    SquareHero,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./get-screen-name.html",
  styleUrl: "./get-screen-name.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
  },
})
export class GetScreenName extends RootBase {
  private router = inject(Router);
  private invokeService = inject(InvokeService);
  // private dbService = inject(LocalDbService);

  protected errors = signal({} as Record<string, any>);
  protected hasErrors = computed(() => {
    return Object.keys(this.errors()).length;
  });

  protected form = new FormGroup({
    screenName: new FormControl("", [
      Validators.required,
      Validators.minLength(SCREEN_NAME_MIN_LEN),
      Validators.maxLength(SCREEN_NAME_MAX_LEN),
    ]),
    confirmScreenName: new FormControl("", [
      Validators.required,
      Validators.minLength(SCREEN_NAME_MIN_LEN),
      Validators.maxLength(SCREEN_NAME_MAX_LEN),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(PASS_MIN_LEN),
      Validators.maxLength(PASS_MAX_LEN),
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(PASS_MIN_LEN),
      Validators.maxLength(PASS_MAX_LEN),
    ]),
  });

  async onSubmit() {
    const result = ScreenNameSchema.safeParse(this.form.value);

    if (result.error) {
      this.errors.set(flattenError(result.error).fieldErrors);
      return false;
    }

    // No validation errors, invoke and continue
    this.errors.set({});

    try {
      const result = await this.invokeService.send("create_screen_name", {
        screenName: this.form.get("screenName")!.value,
        password: this.form.get("password")!.value,
      });

      console.log({ result });

      // TODO: Better handling, ensure the result type is what is expected
      // and some unexpected response won't skip this block
      if (result.status_code >= 300) {
        console.warn("Invocation returned with non OK status", result);
        throw result;
      }

      console.log(result);

      // this.router.navigate([""], {
      //   queryParams: { sn: result.body },
      // });
    } catch (e) {
      // Should only happen when the go API server is down/not responding.
      // TODO: Have rust handle this
      this.errors.set({
        general: e,
      });
    }

    return true;
  }
}
