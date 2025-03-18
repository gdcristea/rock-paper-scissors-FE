import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type TOption = 'scissors' | 'rock' | 'paper';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent {
  /**
   * Stores options
   */
  type = input<TOption>();

  /**
   * If it's true then the component will be bigger on desktop
   * It's a different state for this component
   */
  isSelected = input<boolean>(false);

  /**
   * If it's true then there is an empty circle
   * It's a different state for this component
   */
  isFilled = input<boolean>(false);

  /**
   * It adds an animation around the component
   */
  isPulsing = input<boolean>(false);

  /**
   * Event emitter to emit the selected option to the parent component
   */
  @Output()
  selectedOption = new EventEmitter<TOption>();

  /**
   * Emits selected option by the user
   * It does not emit when the state of the component is 'selected'
   */
  emitSelectedOption(): void {
    if (this.isSelected()) {
      return;
    }
    this.selectedOption.emit(this.type());
  }
}
