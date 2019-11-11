export class Duplicates {

  removeDuplicates(...toRemove: string[]): string[] {
    return [...new Set(toRemove)];
  }

  removeDuplicatesByForeach(...toRemove: string[]): string[] {
    const unique = {};
    toRemove.forEach((item) => {
      if (!unique[item]) {
        unique[item] = true;
      }
    });

    return Object.keys(unique);
  }

  removeDuplicatesOfArrayNumber(...numbers: number[]): number[] {
    let tmpArray = [];
    let indexJ = 0;

    for (let indexI = 0; indexI < numbers.length -1; indexI++) {
      let currentElement = numbers[indexI];

      if (currentElement !== numbers[indexI + 1]) {
        tmpArray[indexJ++] = currentElement;
      }
    }

    tmpArray[indexJ++] = numbers[numbers.length - 1];

    return tmpArray;
  }

  isLeapYear(year: number): boolean {
    return  new Date(year, 1, 29).getDate() === 29;
  }

}
