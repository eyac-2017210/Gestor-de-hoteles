import { SearchHotelByNamePipe } from './search-hotel-by-name.pipe';

describe('SearchHotelByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchHotelByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
