import { Book } from './../shared/book';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  foundBooks: Book[] = [];
  isLoading = false;
  constructor(private bs: BookStoreService) { }

  @Output() bookSelected = new EventEmitter<Book>();
  keyup = new EventEmitter<string>();
  ngOnInit() {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap( () => this.isLoading = true ),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap( () => this.isLoading = false )
      )
      .subscribe( books => this.foundBooks = books );
  }
}
