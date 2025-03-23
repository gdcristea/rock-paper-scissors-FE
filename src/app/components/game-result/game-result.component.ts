import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { TGameResult } from '../../models/game-result.type';

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
  result: InputSignal<TGameResult> = input(null);

  /**
   * Event emitter that notifies the parent component when to start the game again.
   */
  @Output()
  play: EventEmitter<string> = new EventEmitter();

  /**
   * Play the game again
   */
  playAgain(): void {
    this.play.emit();
  }
}
