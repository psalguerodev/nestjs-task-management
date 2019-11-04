import { Prime } from './prime';

describe('Prime Test', () => {

  let prime: Prime;

  beforeEach(() => {
    prime = new Prime();
  });

  it('should be defined', () => {
    expect(prime).toBeDefined();
  });

  it('should return true of number 3 is Prime', () => {
    expect(prime.isPrime(3)).toBeTruthy();
    expect(prime.isPrimeNumber(3)).toBeTruthy();
  });

  it('should return false of number 4 is not Prime', () => {
    expect(prime.isPrime(4)).toBeFalsy();
    expect(prime.isPrimeNumber(4)).toBeFalsy();
  });

  it('should return false of number 4332 is not Prime', () => {
    expect(prime.isPrime(4332)).toBeFalsy();
    expect(prime.isPrimeNumber(4332)).toBeFalsy();
  });

  it('should return true of number 17 is Prime', () => {
    expect(prime.isPrime(17)).toBeTruthy();
    expect(prime.isPrimeNumber(17)).toBeTruthy();
  });

});
