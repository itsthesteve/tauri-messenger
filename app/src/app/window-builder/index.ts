import { Webview } from "@tauri-apps/api/webview";
import { Window as TauriWindow, WindowOptions } from "@tauri-apps/api/window";

type AppWindowOptions = Partial<WindowOptions> &
  Pick<WindowOptions, "width" | "height">;

const CORE_WINDOW_OPTIONS: Partial<WindowOptions> = {
  /* The component sets visibility when ready to render to prevent flashbang */
  visible: false,
  /* No default system window trim */
  decorations: false,
};

export class WindowBuilder {
  constructor(
    private tauriLabel: string,
    private url: string,
    private buildOptions: AppWindowOptions = {},
  ) {}

  build(): Promise<TauriWindow> {
    const { width, height } = this.buildOptions;
    if (!width || !height) {
      throw new Error("Width and height must be specified");
    }

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
          width: this.buildOptions.width!,
          height: this.buildOptions.height!,
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
