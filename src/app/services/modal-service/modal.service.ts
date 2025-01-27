import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /**
   * Stores if the modal is visible
   */
  modalVisible = signal<boolean>(false);

  /**
   * Handles modal visibility changes
   */
  toggleModal(): void {
    this.modalVisible.update(current => !current);
  }
}
