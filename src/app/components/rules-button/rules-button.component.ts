import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-rules-button',
  standalone: true,
  templateUrl: './rules-button.component.html',
  styleUrl: './rules-button.component.scss',
})
export class RulesButtonComponent {
  modalService = inject(ModalService);

  openRulesModal(): void {
    this.modalService.toggleModal();
  }
}
