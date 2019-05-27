import { Thumbnail } from './thumbnail';

describe('Thumbnail', () => {
  it('should create an instance', () => {
    expect(new Thumbnail('http://www.example.com/images/thumb1.png', 'Exampl')).toBeTruthy();
  });
});
