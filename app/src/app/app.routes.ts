import { Routes } from "@angular/router";
import { SignIn } from "./routes/sign-in/sign-in";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: SignIn,
  },
];
