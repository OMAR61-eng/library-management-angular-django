import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookGridComponent } from '../../components/book-grid/book-grid.component';
import { AddBookFormComponent } from '../../components/add-book-form/add-book-form.component';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';
import { StatusFilterComponent } from '../../components/status-filter/status-filter.component';
import { ProfitBarChartComponent } from '../../components/profit-bar-chart/profit-bar-chart.component';
import { StatusPieChartComponent } from '../../components/status-pie-chart/status-pie-chart.component';

import { BooksService } from '../../core/services/books.service';
import { Book } from '../../core/types/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookGridComponent,
    AddBookFormComponent,
    CategoryFilterComponent,
    StatusFilterComponent,
    ProfitBarChartComponent,
    StatusPieChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);
  categories = signal<any[]>([]);
  search = signal<string>('');
  activeCategory = signal<number | null>(null);
  activeStatus = signal<string>('all'); // دايمًا string مش null

  allCount = computed(() => this.books().length);
  availableCount = computed(() => this.books().filter(b => b.status === 'available').length);
  soldCount = computed(() => this.books().filter(b => b.status === 'sold').length);
  rentalCount = computed(() => this.books().filter(b => b.status === 'rentaled').length);

  soldTotal = computed(() =>
    this.books()
      .filter(b => b.status === 'sold')
      .reduce((sum, b) => sum + (b.price || 0), 0)
  );

  rentalTotal = computed(() =>
    this.books()
      .filter(b => b.status === 'rentaled')
      .reduce((sum, b) => sum + (b.total_rental_price || b.retal_price_day || 0), 0)
  );

  constructor(private booksService: BooksService) {
    effect(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.list().subscribe({
      next: (data) => this.books.set(data),
      error: (err) => console.error('فشل تحميل الكتب', err)
    });
  }

  onBookAdded(newBook: Book): void {
    this.books.update(books => [newBook, ...books]);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
  }

  onCategoryChange(categoryId: number | null): void {
    this.activeCategory.set(categoryId);
  }

  onStatusChange(status: string | null): void {
  this.activeStatus.set(status ?? 'all');
}

  private applyFilters(): void {
    let result = this.books();

    if (this.search()) {
      const term = this.search().toLowerCase();
      result = result.filter(book =>
        (book.title || '').toLowerCase().includes(term) ||
        (book.author || '').toLowerCase().includes(term)
      );
    }

    if (this.activeCategory() !== null) {
      result = result.filter(book => book.category_id === this.activeCategory());
    }

    if (this.activeStatus() !== 'all') {
      result = result.filter(book => book.status === this.activeStatus());
    }

    this.filteredBooks.set(result);
  }
}