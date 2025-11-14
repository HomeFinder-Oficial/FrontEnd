import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capsule-button',
  imports: [CommonModule],
  templateUrl: './capsule-button.html',
  styleUrl: './capsule-button.css',
})

export class CapsuleButton {
  @Input() isLoggedIn = false;

  @Output() selectionChange = new EventEmitter<string | null>();
  
  buttons = [
    { label: 'Comprar', active: false },
    { label: 'Alquilar', active: false },
    { label: 'Mis favoritos', active: false },
  ];

  toggleActive(index: number) {
    const selected = this.buttons[index].active;

    // If the selected one is already active → deselect it
    if (selected) {
      this.buttons[index].active = false;
      return;
    }

    // Otherwise select it and deactivate all others
    this.buttons.forEach((btn, i) => {
      btn.active = i === index;
    });
  }
}
