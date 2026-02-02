import { Routes } from "@angular/router";
import { SignIn } from "./routes/sign-in/sign-in";
import { ChatWindow } from "./routes/chat/chat";
import { Debug } from "./routes/debug/debug";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: SignIn,
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
