import { BookStoreService } from './../shared/book-store.service';
import { Book } from './../shared/book';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  isbn: string;
  book: Book;

  constructor(private bookStoreService: BookStoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isbn = this.route.snapshot.params.isbn;
    this.book = this.bookStoreService.getSingle(this.isbn);
  }

  getRating(num: number) {
    return new Array(num);
  }
}
