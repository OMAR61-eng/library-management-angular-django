import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../types/category';

const API_BASE = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_BASE}/categories/`);
  }

  create(payload: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${API_BASE}/categories/`, payload);
  }
}

