import { Duplicates } from './duplicates';

describe('Duplicates', () => {
  let duplicates: Duplicates;

  beforeEach(() => {
    duplicates = new Duplicates();
  });

  it('should be defined', () => {
    expect(duplicates).toBeDefined();
  });

  it('should be success remove duplicate from array string', () => {
    const withOutDuplicates = duplicates.removeDuplicates('a', 'a', 'b', 'c', 'd');
    expect(withOutDuplicates).toEqual(['a', 'b', 'c', 'd']);
  });

  it('shoud be success remove duplicates names from array string', () => {
    const withOutDuplicatesNames = duplicates.removeDuplicates('psalguero', 'psalguero', 'crossmind', 'patrick', 'psalguerodev', 'psalguero');
    const withOutDuplicatesNamesForeach = duplicates.removeDuplicatesByForeach('psalguero', 'psalguero', 'crossmind', 'patrick', 'psalguerodev', 'psalguero');
    expect(withOutDuplicatesNames).toEqual(['psalguero', 'crossmind', 'patrick', 'psalguerodev']);
    expect(withOutDuplicatesNamesForeach).toEqual(['psalguero', 'crossmind', 'patrick', 'psalguerodev']);
    expect(withOutDuplicatesNames).toContain('psalguerodev');
  });
});
