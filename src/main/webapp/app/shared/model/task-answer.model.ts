import { IStudyUsers } from '@/shared/model/study-users.model';

export interface ITaskAnswer {
  id?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  studyUsers?: IStudyUsers[] | null;
}

export class TaskAnswer implements ITaskAnswer {
  constructor(
    public id?: number,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public studyUsers?: IStudyUsers[] | null
  ) {}
}
