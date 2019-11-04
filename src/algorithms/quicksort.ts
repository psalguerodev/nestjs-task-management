export class Quicksort {

  private input: number[];
  private length: number;

  sort(numbers: number[]): void {
    if (!numbers) { return; }

    this.input = numbers;
    this.length = numbers.length;
    this.quickSort(0, this.length - 1);
  }

  private quickSort(low: number = 0, high: number = 0): void {
    let i = low;
    let j = high;

    const middleIndex = Math.floor((low + high) / 2);
    const pivot = this.input[middleIndex];

    while (i <= j) {
      while (this.input[i] < pivot) {
        i++;
      }
      while (this.input[j] > pivot) {
        j--;
      }

      if (i <= j) {
        this.swap(i, j);
        // move index to next position on both sides
        i++;
        j--;
      }
    }

    if (low < j) {
      this.quickSort(low, j);
    }

    if (i < high) {
      this.quickSort(i, high);
    }

  }

  private swap(i: number, j: number): void {
    const tmp = this.input[i];
    this.input[i] = this.input[j];
    this.input[j] = tmp;
  }
}
