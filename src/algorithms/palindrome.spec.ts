import { Palindrome } from './palindrome';

describe('Palindrome', () => {
  let palindrome: Palindrome;

  beforeEach(() => {
    palindrome = new Palindrome();
  });

  it('should be defined  ', () => {
    expect(palindrome).toBeDefined();
  });

  it('should be true of string is aba', () => {
    expect(palindrome.isPalindromeByString('aba')).toBeTruthy();
  });

  it('should be false of string is psalguerodev', () => {
    expect(palindrome.isPalindromeByString('psalguerodev')).toBeFalsy();
  });

  it('should be true of number is 121', () => {
    expect(palindrome.isPalindromeByNumber(121)).toBeTruthy();
  });

  it('should be false of number is 433', () => {
    expect(palindrome.isPalindromeByNumber(433)).toBeFalsy();
  });

  it('should false of number POSITIVE_INFINTY and NEGATIVE_INFINITY', () => {
    expect(palindrome.isPalindromeByNumber(Number.POSITIVE_INFINITY)).toBeFalsy();
    expect(palindrome.isPalindromeByNumber(Number.NEGATIVE_INFINITY)).toBeFalsy();
  });

});
