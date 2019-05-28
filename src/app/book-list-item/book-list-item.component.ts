import { Book } from './../shared/book';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'a.bm-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})

export class BookListItemComponent {
  @Input() book: Book;
}
