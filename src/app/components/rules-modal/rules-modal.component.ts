import { Component, inject, WritableSignal } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal.service';


@Component({
  selector: 'app-rules-modal',
  standalone: true,
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
