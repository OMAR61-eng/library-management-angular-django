import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/book';

const API_BASE = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly http = inject(HttpClient);

  list(filters?: { category?: number; status?: string; search?: string }): Observable<Book[]> {
    let params = new HttpParams();
    if (filters?.category) params = params.set('category', String(filters.category));
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.search) params = params.set('search', filters.search);
    return this.http.get<Book[]>(`${API_BASE}/books/`, { params });
  }

  create(payload: FormData): Observable<Book> {
    return this.http.post<Book>(`${API_BASE}/books/`, payload);
  }

  update(id: number, payload: FormData | Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${API_BASE}/books/${id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/books/${id}/`);
  }
}

