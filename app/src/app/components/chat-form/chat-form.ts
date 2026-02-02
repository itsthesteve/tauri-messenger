import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import Quill from "quill";

@Component({
  selector: "aim-chat-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./chat-form.html",
  styleUrl: "./chat-form.css",
})
export class ChatForm implements AfterViewInit, OnDestroy {
  private q!: Quill | null;

  protected quillRef = viewChild<ElementRef>("quill");

  /** generic error that prevents the app from working (WS error etc.) */
  protected blockAsError = signal<boolean>(false);

  ngAfterViewInit(): void {
    const el = this.quillRef()?.nativeElement as HTMLElement | null;

    if (!el) {
      // Shouldn't happen
      console.warn("quill viewChild is null");
      return;
    }

    this.q = new Quill(el, {
      theme: "snow",
      modules: {
        toolbar: false,
      },
    });

    // Force the quill contenteditable to not change size
    const size = el.getBoundingClientRect();
    el.style.height = size.height + "px";
  }

  checkKeyPress(e: KeyboardEvent) {
    if (!this.q) {
      return console.warn("Quill not initialized.");
    }

    if (e.key === "Enter" && !e.shiftKey) {
      try {
        console.log("Sending", this.q.getText().trimEnd());
        // Send more complicated stuff once that's figured out
        // this.messageService.sendMessage("testRoom", {
        //   message: this.q.getContents(),
        // });

        // Clear the textbox and reset the cursor
        this.q?.setContents([{ insert: "\n" }], "user");
      } catch (e) {
        console.warn("Cannot send message!:", e);
      }
    }
  }

  // Seems to help with hot reloading causing it to break
  ngOnDestroy(): void {
    this.q = null;
  }
}
