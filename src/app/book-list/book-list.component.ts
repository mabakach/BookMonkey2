import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit } from '@angular/core';
import { Book, Thumbnail } from '../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})

export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookStoreService: BookStoreService) {}

  ngOnInit() {
    this.bookStoreService.getAll().subscribe(res => this.books = res);
  }
}
