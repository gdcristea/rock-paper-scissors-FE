import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  InputSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type TOption = 'scissors' | 'rock' | 'paper';

/**
 * OptionComponent renders a game option (rock, paper, or scissors)
 * and handles its display, selection, and pulsing animation.
 *
 * The component uses Angular signals as inputs to control its state.
 */
@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent implements AfterViewInit, OnChanges {
  /**
   * The type of option (scissors, rock, or paper).
   * This input controls which option icon is displayed.
   */
  type: InputSignal<TOption> = input();

  /**
   * If true, the component is rendered in a "selected" state,
   * usually meaning it appears larger on desktop.
   */
  isSelected: InputSignal<boolean> = input(false);

  /**
   * If true, the option circle is filled.
   * When false, an empty circle is displayed.
   */
  isFilled: InputSignal<boolean> = input(false);

  /**
   * If true, a pulsing animation is added around the component.
   * This is typically used to indicate the winning option.
   */
  isPulsing: InputSignal<boolean> = input(false);

  /**
   * @param el Reference to the host element.
   * @param renderer Angular Renderer2 used for DOM manipulations.
   * @param cdr ChangeDetectorRef to trigger change detection manually.
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * If the component is marked as pulsing and is selected, trigger the pulsing animation.
   */
  ngAfterViewInit(): void {
    if (this.isPulsing() && this.isSelected()) {
      this.triggerPulse();
    }
  }

  /**
   * Lifecycle hook that is called when any data-bound property changes.
   * Detects changes in the 'isPulsing' input and triggers the pulsing animation
   * if the new value is true and the option is selected.
   *
   * @param changes An object of SimpleChanges that holds the changed inputs.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isPulsing'] &&
      changes['isPulsing'].currentValue === true &&
      this.isSelected()
    ) {
      this.triggerPulse();
    }
  }

  /**
   * Triggers the pulsing animation by first waiting for a short delay
   * to ensure that the DOM has been updated, then finding the container element
   * with the class '.option--pulsing' and invoking the createPulse method.
   */
  private triggerPulse(): void {
    setTimeout(() => {
      const optionElement =
        this.el.nativeElement.querySelector('.option--pulsing');
      if (optionElement) {
        setTimeout(() => {
          this.createPulse(optionElement);
        }, 50);
      }
    }, 100); // Delay to allow DOM updates to complete
  }

  /**
   * Creates the pulsing effect by appending three pulse elements to the provided container.
   * Each pulse element will animate using CSS defined in the component's stylesheet.
   *
   * @param container The DOM element to which the pulse elements will be appended.
   */
  private createPulse(container: HTMLElement): void {
    for (let i = 0; i < 3; i++) {
      const pulse = this.renderer.createElement('div');
      this.renderer.addClass(pulse, 'option__pulse');
      this.renderer.appendChild(container, pulse);
    }
    // Trigger change detection to update the view after DOM manipulation.
    this.cdr.detectChanges();
  }

  /**
   * Event emitter that notifies the parent component when an option is selected.
   */
  @Output()
  selectedOption: EventEmitter<TOption> = new EventEmitter();

  /**
   * Emits the selected option to the parent component.
   * If the option is already in a selected state, the event is not emitted.
   */
  emitSelectedOption(): void {
    if (this.isSelected()) {
      return;
    }
    this.selectedOption.emit(this.type());
  }
}
