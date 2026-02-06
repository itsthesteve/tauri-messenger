import { Injectable } from "@angular/core";

export type InvocationResponse<T> = {
  status_code: number;
  body: T;
};

@Injectable({
  providedIn: "root",
})
export class InvokeService {
  async send<T>(cmd: string, ...args: any[]): Promise<InvocationResponse<T>> {
    return {
      status_code: 200,
      body: "OK" as T,
    };
  }
}
