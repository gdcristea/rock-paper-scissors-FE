import {Component, input} from '@angular/core';

@Component({
  selector: 'app-score',
  standalone: true,
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  /**
   * Stores the score
   */
  score = input<number>(0);
}
