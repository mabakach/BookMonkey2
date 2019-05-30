import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book, Thumbnail } from '../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})

export class BookListComponent implements OnInit {

  @Output() showDetailsEvent = new EventEmitter<Book>();

  books: Book[];

  constructor(private bookStoreService: BookStoreService) {

  }

  ngOnInit() {
    this.books = this.bookStoreService.getAll();
  }

  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }
}
