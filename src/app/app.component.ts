import {
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RulesButtonComponent } from './components/rules-button/rules-button.component';
import { RulesModalComponent } from './components/rules-modal/rules-modal.component';
import { ScoreComponent } from './components/score/score.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { OptionComponent } from './components/option/option.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RulesButtonComponent,
    RulesModalComponent,
    ScoreComponent,
    GameResultComponent,
    OptionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {}
