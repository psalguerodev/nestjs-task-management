import { BasePalindrome } from './palindrome.base';

export class Palindrome extends BasePalindrome {

  isPalindromeByString(possibleString: string): boolean {
    const reverse = this.reverseBySplit(possibleString);
    return (reverse === possibleString);
  }

  isPalindromeByNumber(possibleNumber: number): boolean {
    const reverse = this.reverseNumber(possibleNumber);
    return (reverse === possibleNumber);
  }

}
