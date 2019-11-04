export class Duplicates {

  removeDuplicates(...toRemove: string[]): string[] {
    return [...new Set(toRemove)];
  }

  removeDuplicatesByForeach(...toRemove: string[]): string[] {
    let unique = {};
    toRemove.forEach((item) => {
      if (!unique[item]) {
        unique[item] = true;
      }
    });

    return Object.keys(unique);
  }

  isLeapYear(year: number): boolean {
    return  new Date(year, 1, 29).getDate() === 29;
  }

}
