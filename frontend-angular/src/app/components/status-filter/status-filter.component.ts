import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-filter.component.html',
  styleUrl: './status-filter.component.scss',
})
export class StatusFilterComponent {
  @Input() activeStatus: string | null = null;
  @Output() statusChange = new EventEmitter<string | null>();

  select(status: string | null) {
    this.statusChange.emit(status);
  }
}

