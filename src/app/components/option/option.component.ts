import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type TOption = 'scissors' | 'rock' | 'paper';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent implements AfterViewInit {
  /**
   * Stores options
   */
  type = input<TOption>();

  /**
   * If it's true then the component will be bigger on desktop
   */
  isSelected = input<boolean>(false);

  /**
   * If it's true then there is an empty circle
   */
  isFilled = input<boolean>(false);

  /**
   * It adds an animation around the component
   */
  isPulsing = input<boolean>(false);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  //Logic to trigger the animation automatically when the component is initialised. No need to hover or click on it.
  ngAfterViewInit(): void {
    if (this.isPulsing() && this.isSelected()) {
      //Find the container where the pulsing elements should be placed
      const optionElement =
        this.el.nativeElement.querySelector('.option--pulsing');

      if (optionElement) {
        // Wait 50ms and then add the pulsing elements
        setTimeout(() => {
          this.createPulse(optionElement);
        }, 50);
      }
    }
  }

  private createPulse(container: HTMLElement): void {
    for (let i = 0; i < 3; i++) {
      const pulse = this.renderer.createElement('div');
      this.renderer.addClass(pulse, 'option__pulse');
      this.renderer.appendChild(container, pulse);
    }
    this.cdr.detectChanges();
  }

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
