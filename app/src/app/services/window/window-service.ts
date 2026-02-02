import { Injectable } from "@angular/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

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

  close() {
    getCurrentWindow().close().catch(console.warn);
  }

  minimize() {}
  maximize() {}
  restore() {}
}
