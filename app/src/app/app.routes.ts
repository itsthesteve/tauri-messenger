import { Routes } from "@angular/router";
import { ChatWindow } from "./routes/chat/chat";
import { Debug } from "./routes/debug/debug";
import { GetScreenName } from "./routes/get-screen-name/get-screen-name";
import { SignIn } from "./routes/sign-in/sign-in";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: SignIn,
  },
  {
    path: "get-screen-name",
    component: GetScreenName,
  },
  {
    path: "chat",
    component: ChatWindow,
  },
  {
    path: "debug",
    component: Debug,
  },
];
