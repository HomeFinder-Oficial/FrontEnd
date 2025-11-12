import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capsule-button',
  imports: [CommonModule],
  templateUrl: './capsule-button.html',
  styleUrl: './capsule-button.css',
})

export class CapsuleButton {
  @Input() isLoggedIn = false;
  
  buttons = [
    { label: 'Option 1', active: false },
    { label: 'Option 2', active: false },
    { label: 'Option 3', active: false },
  ];

  toggleActive(index: number) {
    this.buttons[index].active = !this.buttons[index].active;
  }
}
