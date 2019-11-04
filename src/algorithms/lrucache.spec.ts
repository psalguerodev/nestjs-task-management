import { Lrucache } from './lrucache';

describe('Lrucache Test', () => {
  let lruCache: Lrucache<string>;

  beforeEach(() => {
    lruCache = new Lrucache<string>(30);
  });

  it('should be defined', () => {
    expect(lruCache).toBeDefined();
    expect(lruCache.capacity).toEqual(30);
  });

  it('should be null or undefined of key [key_01]', () => {
    expect(lruCache.get('key_1')).toBeUndefined();
  });

  it('should be psalguerodev of key [key1] ', () => {
    setDefaultData(lruCache);
    expect(lruCache.get('key1')).toEqual('psalguerodev');
  });

  it('should be crossmind of key [key_02]', () => {
    setDefaultData(lruCache);
    const result = lruCache.get('key2');
    expect(result).toEqual('crossmind')
    expect(result).toHaveLength(9);
  });

  it('should return engineer2019 with key [key3] and size 2 of capacity', () => {
    lruCache.capacity = 2;
    lruCache.set('key1', 'psalguerodev');
    lruCache.set('key2', 'crossmind');
    lruCache.set('key3', 'engineer2019');
    expect(lruCache.get('key3')).toBe('engineer2019');
    expect(lruCache.get('key1')).toBeUndefined();
    expect(lruCache.capacity).toEqual(2);
  });

  it('should return undefined with key [key1] and size 1 of capacity', () => {
    lruCache.capacity = 1;
    lruCache.set('key1', 'iamone');
    lruCache.set('key2', 'iamtwo');
    expect(lruCache.capacity).toEqual(1);
    expect(lruCache.get('key1')).toBeUndefined();
  });


});

const setDefaultData = (cache: Lrucache<string>): void => {
  cache.set('key1', 'psalguerodev');
  cache.set('key2', 'crossmind');
  cache.set('key3', 'developer');
  cache.set('key4', 'engineer2019');
  cache.set('key5', 'tutukansito');
  cache.set('key6', 'spider2019');
  cache.set('key7', 'crossorigin');
}