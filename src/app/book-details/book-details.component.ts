import { BookFactory } from './../shared/book-factory';
import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  isbn: string;
  book: Book;

  constructor(
    private bookStoreService: BookStoreService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isbn = this.route.snapshot.params.isbn;
    this.book = BookFactory.empty();
    this.bookStoreService.getSingle(this.isbn).subscribe(res => this.book = res);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bookStoreService.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }
}
