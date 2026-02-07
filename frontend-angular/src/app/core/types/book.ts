export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author?: string;
  photo_book_url?: string | null;
  photo_author_url?: string | null;
  pages?: number | null;
  price?: number | null;
  retal_price_day?: number | null;
  retal_period?: number | null;
  total_rental_price?: number | null;
  active: boolean;
  status?: 'available' | 'sold' | 'rentaled' | null;
  category?: Category | null;
  category_id?: number | null;
}

