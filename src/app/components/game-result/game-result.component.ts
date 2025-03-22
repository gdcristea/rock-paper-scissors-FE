import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-game-result',
  standalone: true,
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent {
  /**
   * Stores game result
   */
  result: InputSignal<string> = input();

  /**
   * Play the game again
   */
  playAgain(): void {
    //logic to be added later
  }
}
