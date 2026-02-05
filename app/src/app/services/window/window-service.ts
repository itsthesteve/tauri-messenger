import { Injectable } from "@angular/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { exit } from "@tauri-apps/plugin-process";

/**
 * The tests wherever the window service is being injected need to be updated
 * when public methods or properties are added or created here.
 * Ideally that's not the case so some investigation is needed.
 */
@Injectable({
  providedIn: "root",
})
export class WindowService {
  // TODO: Stubbed to prevent errors in consumer components
  public viewState = "";

  async show() {
    return await getCurrentWindow().show();
  }

  async close(doExit: boolean = false) {
    // TODO: Confirm with dialog, but this has potentially been buggy with the window drag API
    if (doExit) {
      await exit().catch(console.warn);
    }

    return await getCurrentWindow().close();
  }

  minimize() {}
  maximize() {}
  restore() {}
}
