import { Injectable } from "@angular/core";
import { invoke, InvokeArgs } from "@tauri-apps/api/core";

export type InvocationResponse = {
  status_code: number;
  body: string;
};

@Injectable({
  providedIn: "root",
})
export class InvokeService {
  async send(cmd: string, args: InvokeArgs): Promise<InvocationResponse> {
    return await invoke(cmd, args);
  }
}
