import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../core/services/books.service';
import { Book } from '../../core/types/book';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book-form.component.html',
  styleUrl: './add-book-form.component.scss'
})
export class AddBookFormComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = []; // لو هتجيبها من API بعدين

  // مهم جدًا عشان HomeComponent يستقبل الكتاب الجديد
  @Output() bookAdded = new EventEmitter<Book>();

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required]],
      pages: [null],
      price: [null, [Validators.min(0)]],
      retal_price_day: [null, [Validators.min(0)]],
      retal_period: [null],
      total_rental_price: [null],
      status: ['available', [Validators.required]],
      category_id: [null, [Validators.required]],
      photo_book: [null],
      photo_author: [null]
    });

    // لو عايز تجيب التصنيفات من API في المستقبل
    // this.categoriesService.getAll().subscribe(...)
  }

  onPhotoBookChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.patchValue({ photo_book: input.files[0] });
    }
  }

  onPhotoAuthorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.patchValue({ photo_author: input.files[0] });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.form.value).forEach(key => {
      const value = this.form.value[key];
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    this.booksService.create(formData).subscribe({
      next: (book) => {
        alert('تم إضافة الكتاب بنجاح!');
        this.form.reset();
        this.form.patchValue({ status: 'available' });
        this.bookAdded.emit(book); // إرسال الكتاب الجديد للـ HomeComponent
      },
      error: (err) => {
        console.error('خطأ في إضافة الكتاب:', err);
        alert('حدث خطأ أثناء إضافة الكتاب');
      }
    });
  }
}