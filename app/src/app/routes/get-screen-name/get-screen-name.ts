import { KeyValuePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { flattenError } from "zod";
import {
  XpStatusBar,
  XpWindow,
  XpTitleBar,
  SquareHero,
} from "../../components";
import { RootBase } from "../root/root";
import { ScreenNameSchema } from "../../schemas/screen-name";
import { InvokeService } from "../../services/invoke-service";

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

  // No ng validators as zod is taking care of it
  protected createForm = new FormGroup({
    screenName: new FormControl(""),
    confirmScreenName: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  async onSubmit() {
    const result = ScreenNameSchema.safeParse(this.createForm.value);

    if (result.error) {
      this.errors.set(flattenError(result.error).fieldErrors);
      return false;
    }

    // No validation errors, invoke and continue
    this.errors.set({});

    try {
      const result = await this.invokeService.send("create_screen_name", {
        screenName: this.createForm.get("screenName")!.value,
        password: this.createForm.get("password")!.value,
      });

      // TODO: Better handling, ensure the result type is what is expected
      if (result.status_code >= 300) {
        console.warn("Invocation returned with non OK status", result);
        throw result;
      }

      this.router.navigate([""], {
        queryParams: { sn: result.body },
      });
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
