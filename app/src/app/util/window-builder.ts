import { Webview } from "@tauri-apps/api/webview";
import { Window as TauriWindow, WindowOptions } from "@tauri-apps/api/window";

type WindowSize = Required<Pick<WindowOptions, "width" | "height">>;

// Allow all the properties of Tauri's WindowOptions but enfore width and height
type AppWindowOptions = Partial<WindowOptions> & Required<WindowSize>;

// Arbitrary defaults
const DEFAULT_SIZE: WindowSize = {
  width: 200,
  height: 300,
};

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
  static build(
    tauriLabel: string,
    url: string,
    buildOptions: AppWindowOptions = DEFAULT_SIZE,
  ): Promise<TauriWindow> {
    const win = new TauriWindow(tauriLabel, {
      ...CORE_WINDOW_OPTIONS,
      ...buildOptions,
    });

    return new Promise((resolve, reject) => {
      win.once("tauri://created", () => {
        const wv = new Webview(win, `${tauriLabel}WebView`, {
          url: url,
          x: 0,
          y: 0,
          width: buildOptions.width,
          height: buildOptions.height,
          acceptFirstMouse: true,
        });

        wv.once("tauri://created", () =>
          wv.setAutoResize(true).then(() => resolve(win)),
        );

        wv.once("tauri://error", (err) => {
          console.warn("Error creating webview", err);
          reject(err);
        });
      });

      win.once("tauri://error", reject);
    });
  }
}
