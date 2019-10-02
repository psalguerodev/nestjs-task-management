import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {

  readonly allowedStatuses = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
    TaskStatus.OPEN,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`The status "${value}" is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
