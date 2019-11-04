abstract class BasePalindrome {
  protected reverse(text: string): string {
    if (!text) {
      return text;
    }

    return text.charAt(text.length - 1) + this.reverse(text.substring(0, text.length - 1));
  }

  protected reverseBySplit(text: string): string {
    if (!text) { return text; }

    const textToArray = text.split('');

    return textToArray.reverse().join('');
  }

  protected reverseBySpread(text: string): string {
    return [...text].reverse().join('');
  }

  protected reverseByFor(text: string): string {
    let reverse = '';

    for (let i = text.length - 1; i >= 0; i--) {
      reverse += text[i];
    }
    return reverse;
  }

  protected reverseNumber(toReverseNumber: number): number {
    const palindrome = toReverseNumber.toString();

    if (!palindrome) { return toReverseNumber; }

    const palindromeToArray = palindrome.split('');
    const palindromeReverseJoin = palindromeToArray.reverse().join('');

    return parseInt(palindromeReverseJoin, 10);
  }
}
