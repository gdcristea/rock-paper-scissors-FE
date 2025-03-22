import { Component, inject, WritableSignal } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rules-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rules-modal.component.html',
  styleUrl: './rules-modal.component.scss',
})
export class RulesModalComponent {
  modalService = inject(ModalService);

  /**
   * Stores if the modal is visible
   */
  isModalVisible: WritableSignal<boolean> = this.modalService.modalVisible;

  closeRulesModal(): void {
    this.modalService.toggleModal();
  }
}
