import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})

export class SearchInput {
  // The visual variant: 'home' | 'default'
  @Input() variant: 'home' | 'default' = 'default';

  // Placeholder text
  @Input() placeholder = 'Buscar...';

  @Input() isEmpty: boolean = true;

  // Emit search value
  @Output() search = new EventEmitter<string>();

  value = '';

  onSearch(value: string) {
    this.value = value;
    this.search.emit(value);
  }
}
