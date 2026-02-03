import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from "@angular/cdk/scrolling";
import { AsyncPipe } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  viewChild,
} from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";
import { XpTitleBar, XpWindow } from "../../components";
import { ChatForm } from "../../components/chat-form/chat-form";
import { randLipsum } from "../../util";
import { RootBase } from "../root/root";

@Component({
  selector: "aim-chat-window",
  imports: [
    ExperimentalScrollingModule,
    ScrollingModule,
    XpWindow,
    XpTitleBar,
    AsyncPipe,
    ChatForm,
  ],
  templateUrl: "./chat.html",
  styleUrl: "./chat.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
  },
})
export class ChatWindow extends RootBase implements AfterViewInit {
  private viewport = viewChild(CdkVirtualScrollViewport);

  itemsSrc$ = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSrc$.asObservable();

  protected trackFn(_: number, item: any) {
    return item.id;
  }

  ngAfterViewInit() {
    // Uncomment to stream fake messages
    // this.simulateMessages();
  }

  private simulateMessages() {
    interval(1000).subscribe(() => {
      const current = this.itemsSrc$.getValue();
      const rand = Math.random();
      const isMe = rand < 0.5;
      const updated = current.concat([
        {
          id: Math.round(Math.random() * 10000),
          user: isMe ? "xXSlayerXx" : "uWu420",
          text: `${isMe ? `[me] ${randLipsum(200)}` : `[them] ${randLipsum(200)}`}`,
          isMine: isMe,
        },
      ]);

      this.itemsSrc$.next(updated);

      // Pin the messages window to the bottom
      // TODO: Only when a new message comes in. request scheduler?
      // https://rxjs.dev/api/index/const/animationFrameScheduler
      requestAnimationFrame(() => {
        this.viewport()?.scrollTo({
          bottom: 0,
        });
      });
    });
  }
}
