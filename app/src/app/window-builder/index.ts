import { Webview } from "@tauri-apps/api/webview";
import { Window as TauriWindow, WindowOptions } from "@tauri-apps/api/window";

// Allow all the properties of Tauri's WindowOptions but enfore width and height
type AppWindowOptions = Partial<WindowOptions> &
  Required<{ width: number; height: number }>;

const CORE_WINDOW_OPTIONS: Partial<WindowOptions> = {
  /* The component sets visibility when ready to render to prevent flashbang */
  visible: false,
  /* No default system window trim */
  decorations: false,
};

/**
 * Helper class to open new Tauri windows.
 */
export class WindowBuilder {
  constructor(
    private tauriLabel: string,
    private url: string,
    private buildOptions: AppWindowOptions = { width: 200, height: 200 },
  ) {}

  build(): Promise<TauriWindow> {
    const win = new TauriWindow(this.tauriLabel, {
      ...CORE_WINDOW_OPTIONS,
      ...this.buildOptions,
    });

    return new Promise((resolve, reject) => {
      win.once("tauri://created", () => {
        const wv = new Webview(win, `${this.tauriLabel}WebView`, {
          url: this.url,
          x: 0,
          y: 0,
          width: this.buildOptions.width,
          height: this.buildOptions.height,
          acceptFirstMouse: true,
        });

        wv.once("tauri://created", () => resolve(win));
        wv.once("tauri://error", (err) => {
          console.warn("Error creating chat webview", err);
          reject(err);
        });
      });

      win.once("tauri://error", reject);
    });
  }
}
