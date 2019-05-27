import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book('1234', 'Title', ['Maba'], new Date())).toBeTruthy();
  });
});
