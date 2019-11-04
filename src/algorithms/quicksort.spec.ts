import { Quicksort } from './quicksort';

describe('Quicksort', () => {
  let quicksort: Quicksort;

  beforeEach(() => {
    quicksort = new Quicksort();
  });

  it('should be defined', () => {
    expect(quicksort).toBeDefined();
  });

  it('should be [1,2,3,4] from [3,2,1,4]', () => {
    const arrayNumber = [3,2,1,4];
    quicksort.sort(arrayNumber);
    expect(arrayNumber).toEqual([1, 2, 3, 4]);
  });

  it('should be [200, 201, 202, 203, 204, 205] from array not sort', () => {
    const arrayNumber = Array.of(202, 205, 204, 201);
    quicksort.sort(arrayNumber);
    expect(arrayNumber).toEqual([201, 202, 204, 205])
  });
});
