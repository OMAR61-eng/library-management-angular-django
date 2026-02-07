import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../core/types/category';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss',
})
export class CategoryFilterComponent {
  @Input({ required: true }) categories: Category[] = [];
  @Input() activeCategoryId: number | null = null;
  @Output() categoryChange = new EventEmitter<number | null>();

  select(categoryId: number | null) {
    this.categoryChange.emit(categoryId);
  }
}

