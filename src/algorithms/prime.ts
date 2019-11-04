export class Prime {

  isPrime(possibleNumber: number): boolean {
    const sqrt = Math.sqrt(possibleNumber) + 1;

    for (let index = 2; index < sqrt; index++) {
      if (possibleNumber % index === 0) {
        return false;
      }
    }

    return true;
  }

  isPrimeNumber(possibleNumber: number): boolean {
    if (possibleNumber === 2 || possibleNumber === 3) {
      return true;
    }

    if (possibleNumber % 2 === 0) {
      return false;
    }

    const sqrt = Math.sqrt(possibleNumber) + 1;

    for(let index = 3; index < sqrt; index++) {
      if (possibleNumber % index === 0) {
        return false;
      }
    }
    return true;
  }
}
