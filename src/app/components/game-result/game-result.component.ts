import {Component, input} from '@angular/core';

@Component({
  selector: 'app-game-result',
  standalone: true,
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent {
  /**
   * Stores game result
   */
  result  = input<string>();

  /**
   * Play the game again
   */
  playAgain(): void {
    //logic to be added later
  }
}
