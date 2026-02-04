import { Injectable } from "@angular/core";
import { getCurrentWindow, LogicalSize, Window } from "@tauri-apps/api/window";
import { ask } from "@tauri-apps/plugin-dialog";
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
  private get cw(): Window {
    return getCurrentWindow();
  }

  async show() {
    return this.cw.show();
  }

  async close() {
    return await this.cw.close();
  }

  async minimize() {
    return await this.cw.minimize();
  }

  async maximize() {
    return await this.cw.maximize();
  }

  async isMaximized() {
    return await this.cw.isMaximized();
  }

  async restore() {
    const isMaxed = await this.isMaximized();
    await this.cw.setSize(
      // TODO: Track window sizes and restore back to what it was before maximizing
      new LogicalSize({
        width: 500,
        height: 250,
      }),
    );
    await this.cw.center();
  }

  async exit(askFirst?: boolean) {
    if (askFirst) {
      const answer = await ask("Are you sure you want to quit?", {
        kind: "warning",
        title: "Confirm quit",
      });

      if (!answer) return;
    }

    await exit().catch(console.warn);
  }
}
