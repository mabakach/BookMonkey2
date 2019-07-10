import { BookFactory } from './book-factory';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { Book } from './book';
import { BookRaw } from './book-raw';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  books: Book[];
  private api = 'http://localhost:3000';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  getAll(): Observable<Array<Book>> {
    return this.httpClient
      .get<BookRaw[]>(`${this.api}/books`)
      .pipe(
        retry(3),
        map(rawBooks => rawBooks
          .map(rawBook => BookFactory.fromObject(rawBook)),
        ),
        catchError(this.errorHandler)
      );
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.httpClient
    .get<BookRaw[]>(`${this.api}/books/search/${searchTerm}`)
    .pipe(
      retry(3),
      map(rawBooks => rawBooks
        .map(rawBook => BookFactory.fromObject(rawBook)),
      ),
      catchError(this.errorHandler)
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.httpClient
      .get<BookRaw>(`${this.api}/book/${isbn}`)
      .pipe(
        retry(3),
        map(rawBook => BookFactory.fromObject(rawBook)),
        catchError(this.errorHandler)
      );
  }

  create(book: Book): Observable<any> {
    return this.httpClient
      .post(`${this.api}/book`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(book: Book): Observable<any> {
    return this.httpClient
      .put(`${this.api}/book/${book.isbn}`, book, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  remove(isbn: string): Observable<any> {
    return this.httpClient
      .delete(`${this.api}/book/${isbn}`, { responseType: 'text' })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: Error | any): Observable<any> {
    return observableThrowError(error);
  }
}
