import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "aim-square-hero",
  imports: [],
  templateUrl: "./square-hero.html",
  styleUrl: "./square-hero.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareHero {
  // Purely a decorative component
}
