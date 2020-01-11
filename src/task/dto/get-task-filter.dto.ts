import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  @ApiModelProperty({ enum: ['OPEN', 'IN_PROGRESS', 'DONE'], required: false })
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @ApiModelProperty({ required: false })
  search: string;
}
