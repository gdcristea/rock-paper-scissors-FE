import {
  Component,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RulesButtonComponent } from './components/rules-button/rules-button.component';
import { RulesModalComponent } from './components/rules-modal/rules-modal.component';
import { ScoreComponent } from './components/score/score.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { OptionComponent } from './components/option/option.component';
import { TOption } from './models/option.type';
import { TGameResult } from './models/game-result.type';

/**
 * Interface representing an option for the game.
 */
interface IOption {
  /**
   * Indicates if the option circle is filled.
   */
  isFilled: boolean;
  /**
   * Indicates if the option should display a pulsing animation.
   */
  isPulsing: boolean;
  /**
   * The type of option (rock, paper or scissors).
   */
  type: TOption;
}

/**
 * Type representing the winner of the game.
 */
type TWinner = 'user' | 'computer' | 'tie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RulesButtonComponent,
    RulesModalComponent,
    ScoreComponent,
    GameResultComponent,
    OptionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  /**
   * Holds the current score of the user.
   */
  score: WritableSignal<number> = signal(0);

  /**
   * Array of available game options.
   */
  options: Signal<TOption[]> = signal(['paper', 'scissors', 'rock']);

  /**
   * Stores the option chosen by the user.
   * Initially null, until the user makes a selection.
   */
  userPickedOption: WritableSignal<IOption> = signal(null);

  /**
   * Stores the option randomly picked by the computer.
   * Initially null, until the game round starts.
   */
  computerPickedOption: WritableSignal<IOption> = signal(null);

  /**
   * Stores if the game ended
   */
  isEndOfGame: WritableSignal<boolean> = signal(false);

  /**
   * Stores the result of the game
   */
  winner: WritableSignal<TGameResult> = signal(null);

  /**
   * If the user played in the past, then start from the previous score
   */
  ngOnInit(): void {
    const pastScore: string = localStorage.getItem('score');
    if (pastScore) {
      this.score.set(+pastScore);
    }
  }

  /**
   * Determines the winner of the game round based on the user's choice.
   * It first sets the selected options for both user and computer,
   * then uses two delayed steps:
   *   - After 1.5 seconds, it reveals the computer's selected option.
   *   - After an additional 0.5 seconds, it evaluates the winner and activates
   *     the pulsing animation on the winning option.
   *
   * @param userOption - The option selected by the user.
   */
  determineTheWinner(userOption: TOption): void {
    this.getSelectedOptions(userOption);

    // Delay of 1.5s until the computer option is revealed
    setTimeout((): void => {
      const compOption = this.computerPickedOption();
      this.computerPickedOption.set({ ...compOption, isFilled: true });

      setTimeout((): void => {
        const winner = this.whoWon(
          userOption,
          this.computerPickedOption().type
        );

        this.isEndOfGame.set(true); //the game is over

        if (winner === 'user') {
          const userOptionObj = this.userPickedOption();
          this.userPickedOption.set({ ...userOptionObj, isPulsing: true });
          this.score.update((score) => score + 1); //update score
          localStorage.setItem('score', this.score().toString()); //update score in local storage
          this.winner.set('user-wins'); //update the winner
        } else if (winner === 'computer') {
          const compOptionUpdated = this.computerPickedOption();
          this.computerPickedOption.set({
            ...compOptionUpdated,
            isPulsing: true,
          });
          this.score.update((score) => score - 1); //update score
          localStorage.setItem('score', this.score().toString()); //update score in local storage
          this.winner.set('computer-wins'); //update the winner
        } else {
          this.winner.set('tie'); //update the winner
        }
      }, 500); // Activate animation 0.5s later
    }, 1500);
  }

  /**
   * Initializes the selected options for the current game round.
   * Sets the user's option as filled and resets its pulsing state,
   * and sets the computer's option as unfilled with a randomly selected type.
   *
   * @param option - The option selected by the user.
   */
  private getSelectedOptions(option: TOption): void {
    this.userPickedOption.set({
      isFilled: true,
      isPulsing: false,
      type: option,
    });
    this.computerPickedOption.set({
      isFilled: false,
      isPulsing: false,
      type: this.randomComputerOption(),
    });
  }

  /**
   * Returns a random option for the computer based on the available options.
   *
   * @returns A randomly chosen TOption.
   */
  private randomComputerOption(): TOption {
    const randomNumber: number = Math.floor(
      Math.random() * this.options().length
    );
    return this.options()[randomNumber];
  }

  /**
   * Determines the winner of the game round based on the user's and computer's options.
   * If both options are the same, the result is a tie.
   * Otherwise, applies the rules:
   * - Rock beats Scissors
   * - Scissors beats Paper
   * - Paper beats Rock
   *
   * @param userOption - The user's selected option.
   * @param computerOption - The computer's selected option.
   * @returns 'user' if the user wins, 'computer' if the computer wins, or 'tie' if it's a draw.
   */
  private whoWon(userOption: TOption, computerOption: TOption): TWinner {
    // If both options are identical, it's a tie.
    if (userOption === computerOption) {
      return 'tie';
    }

    if (
      (userOption === 'rock' && computerOption === 'scissors') ||
      (userOption === 'scissors' && computerOption === 'paper') ||
      (userOption === 'paper' && computerOption === 'rock')
    ) {
      return 'user';
    } else {
      return 'computer';
    }
  }

  /**
   * Play the game again.
   * Reset some properties.
   */
  playAgain(): void {
    this.userPickedOption.set(null);
    this.computerPickedOption.set(null);
    this.winner.set(null);
    this.isEndOfGame.set(false);
  }
}
