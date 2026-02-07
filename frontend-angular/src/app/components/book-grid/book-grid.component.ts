import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../core/types/book';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.scss',
})
export class BookGridComponent {
  @Input({ required: true }) books: Book[] = [];
}

